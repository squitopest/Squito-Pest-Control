import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase";
import {
  isOneTimeService,
  getSubscriptionPlan,
  getOneTimeService,
  toCents,
  TAX_RATE,
} from "@/data/plans";
import { rateLimit, getClientIp } from "@/lib/rateLimit";
import { validateEnv } from "@/lib/validateEnv";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeInput(value: unknown, maxLength: number) {
  return String(value ?? "").trim().slice(0, maxLength);
}

export async function POST(req: Request) {
  const ip = getClientIp(req);
  if (!rateLimit(`checkout:${ip}`, 15, 60_000)) {
    return NextResponse.json(
      { error: "Too many checkout attempts. Please wait a moment and try again." },
      { status: 429 }
    );
  }

  try {
    validateEnv([
      "STRIPE_SECRET_KEY",
      "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
      "NEXT_PUBLIC_APP_URL",
      "NEXT_PUBLIC_SUPABASE_URL",
      "SUPABASE_SERVICE_ROLE_KEY",
    ]);

    const body = await req.json();
    const propertyType = normalizeInput(body.propertyType, 60) || "Residential";
    const zipCode = normalizeInput(body.zipCode, 10);
    const date = normalizeInput(body.date, 20);
    const time = normalizeInput(body.time, 20);
    const street = normalizeInput(body.street, 160);
    const city = normalizeInput(body.city, 80);
    const planId = normalizeInput(body.planId, 80) || "essential-defense";
    const fullName = normalizeInput(body.fullName, 120);
    const email = normalizeInput(body.email, 160);
    const phone = normalizeInput(body.phone, 30);
    const billing = normalizeInput(body.billing, 20);

    if (!zipCode || !date || !time || !street || !city || !fullName || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const digitsOnlyPhone = phone.replace(/\D/g, "");
    const isSupportedPlan =
      isOneTimeService(planId) ||
      Boolean(getSubscriptionPlan(planId));

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    if (digitsOnlyPhone.length < 10 || digitsOnlyPhone.length > 15) {
      return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 400 });
    }

    if (!/^\d{5}$/.test(zipCode)) {
      return NextResponse.json({ error: "Please enter a valid 5-digit ZIP code." }, { status: 400 });
    }

    if (!isSupportedPlan) {
      return NextResponse.json({ error: "Invalid plan selected." }, { status: 400 });
    }

    const isMock = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.includes("mock") || !process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

    // 1. Create Supabase Row before charging the customer.
    // If we can't persist the booking, we should not accept payment.
    const supabase = createServiceClient();
    let bookingId = "mock-booking-id-" + Math.random().toString(36).slice(2);

    if (!isMock) {
      try {
        const bookingRow: Record<string, unknown> = {
          property_type: propertyType || "Residential",
          zip_code: zipCode,
          service_date: date,
          service_time: time,
          street: street,
          city: city,
          plan_id: planId,
          full_name: fullName,
          email: email,
          phone: phone,
          stripe_payment_status: "pending",
        };

        const { data, error } = await supabase
          .from("bookings")
          .insert([bookingRow])
          .select()
          .single();

        if (error) {
          // Surface the full Postgres error so schema drift (missing column,
          // rename, RLS rejection, etc.) is immediately obvious in Vercel logs.
          console.error("Supabase booking insert failed", {
            code: (error as any).code,
            message: error.message,
            details: (error as any).details,
            hint: (error as any).hint,
            attemptedColumns: Object.keys(bookingRow),
          });
          return NextResponse.json(
            { error: "We couldn't save your booking details. Please try again in a moment or call us directly." },
            { status: 500 }
          );
        } else if (data) {
          bookingId = data.id;
        }
      } catch (e: any) {
        console.error("Supabase Client Error", {
          name: e?.name,
          message: e?.message,
          stack: e?.stack,
        });
        return NextResponse.json(
          { error: "We couldn't save your booking details. Please try again in a moment or call us directly." },
          { status: 500 }
        );
      }
    }

    if (isMock) {
      return NextResponse.json({
        success: true,
        checkoutUrl: `/success?session_id=mock_success&booking_id=${bookingId}`,
        message: "MOCK MODE: Add real Stripe & Supabase keys to .env.local"
      });
    }

    // Look up plan details from the single source of truth in src/data/plans.ts
    const isOneTime = isOneTimeService(planId);
    const oneTimePlan = isOneTime ? getOneTimeService(planId) : null;
    const subPlan = !isOneTime ? (getSubscriptionPlan(planId) ?? getSubscriptionPlan("essential-defense")!) : null;

    const planName = oneTimePlan?.name ?? subPlan?.name ?? "Essential Defense Plan";

    // All amounts in cents for Stripe
    const initialFee = isOneTime
      ? toCents(oneTimePlan!.price)
      : toCents(subPlan!.initialFee);

    // Advanced Line Item Construction for Subscriptions
    const isYearly = billing === "yearly";
    let lineItems = [];
    let checkoutMode: "payment" | "subscription" = "payment";

    if (isOneTime) {
      checkoutMode = "payment";
      const tax = Math.round(initialFee * TAX_RATE);
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: `Squito Pest Control - ${planName}`,
            description: `Appointment: ${date} at ${time} | Address: ${street}, ${city} ${zipCode}`,
          },
          unit_amount: initialFee + tax,
        },
        quantity: 1,
      });
    } else if (isYearly) {
      checkoutMode = "subscription";
      const yearlyCharge = toCents(subPlan!.yearlyTotal);
      const tax = Math.round(yearlyCharge * TAX_RATE);

      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: `Yearly Subscription - ${planName}`,
            description: `Address: ${street}, ${city} ${zipCode}`,
          },
          unit_amount: yearlyCharge + tax,
          recurring: { interval: 'year' as const },
        },
        quantity: 1,
      });
    } else {
      checkoutMode = "subscription";
      const monthlyFee = toCents(subPlan!.monthlyPrice);

      // The Initial Fee covers the first visit flush-out. We split it into:
      // a one-time differential charge today + the first recurring monthly charge today.
      const initialFeeDifferential = initialFee - monthlyFee;

      const setupTax = Math.round(initialFeeDifferential * TAX_RATE);
      const monthlyTax = Math.round(monthlyFee * TAX_RATE);

      if (initialFeeDifferential > 0) {
        lineItems.push({
          price_data: {
            currency: "usd",
            product_data: {
              name: `Initial Fee - ${planName}`,
              description: `One-time initial service flush-out. Appointment: ${date} at ${time}`,
            },
            unit_amount: initialFeeDifferential + setupTax,
          },
          quantity: 1,
        });
      }

      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: `Monthly Subscription - ${planName}`,
            description: `Starting seamlessly today. Address: ${street}, ${city} ${zipCode}`,
          },
          unit_amount: monthlyFee + monthlyTax,
          recurring: { interval: 'month' as const },
        },
        quantity: 1,
      });
    }

    // isTestDrive = true bypasses Stripe and sends users straight to the success page for free.
    // It is currently OFF (false), meaning real Stripe payments are active.
    // Only set to true temporarily if you need to test the booking flow without charging.
    const isTestDrive = false;


    let redirectUrl = "";

    if (isTestDrive) {
      // Teleport straight to the success page as if they paid!
      redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/success?session_id=free_test_bypass_${bookingId}&booking_id=${bookingId}`;
    } else {
      // Create or retrieve customer to pre-fill billing details
      let customer;
      const existingCustomers = await stripe.customers.list({ email: email, limit: 1 });
      
      if (existingCustomers.data.length > 0) {
        customer = existingCustomers.data[0];
        // Ensure the existing customer has the most up-to-date address
        await stripe.customers.update(customer.id, {
          name: fullName,
          phone: phone,
          address: {
            line1: street,
            city: city,
            state: "NY", // NY Based on localized service area
            postal_code: zipCode,
            country: "US",
          }
        });
      } else {
        customer = await stripe.customers.create({
          email: email,
          name: fullName,
          phone: phone,
          address: {
            line1: street,
            city: city,
            state: "NY", 
            postal_code: zipCode,
            country: "US",
          }
        });
      }

      // Regular Stripe Flow with auto billing (1-click checkout)
      const session = await stripe.checkout.sessions.create({
        customer: customer.id,
        billing_address_collection: "auto",
        line_items: lineItems,
        mode: checkoutMode,
        success_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/book?cancel=true`,
        metadata: {
          bookingId: bookingId,
        },
      });
      redirectUrl = session.url || "/book";

      // Update Supabase with Session ID securely if real Stripe session
      if (!isMock && session.id && !bookingId.includes("mock-booking-id")) {
        try {
          await supabase
            .from("bookings")
            .update({ stripe_session_id: session.id })
            .eq("id", bookingId);
        } catch (e) {
          console.warn("Could not update Supabase with session ID, bypassing.");
        }
      }
    }

    return NextResponse.json({
      success: true,
      checkoutUrl: redirectUrl,
    });
  } catch (error: any) {
    console.error("Checkout POST Error:", error?.message || error);
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
