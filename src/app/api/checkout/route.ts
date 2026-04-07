import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { propertyType, zipCode, date, time, street, city, planId, fullName, email, phone, billing } = body;

    if (!zipCode || !date || !time || !street || !city || !fullName || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const isMock = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.includes("mock") || !process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

    // 1. Create Supabase Row
    const supabase = createServiceClient();
    let bookingId = "mock-booking-id-" + Math.random().toString(36).slice(2);

    if (!isMock) {
      try {
        const { data, error } = await supabase
          .from("bookings")
          .insert([{
            property_type: propertyType || "Residential",
            zip_code: zipCode,
            service_date: date,
            service_time: time,
            street: `${street}, ${city}`,
            plan_id: planId || "essential-defense",
            full_name: fullName,
            email: email,
            phone: phone
          }])
          .select()
          .single();

        if (error) {
          console.error("Supabase Warning - Booking table may not exist yet, bypassed for Stripe checkout:", error);
        } else if (data) {
          bookingId = data.id;
        }
      } catch (e) {
        console.error("Supabase Client Error:", e);
      }
    }

    if (isMock) {
      return NextResponse.json({
        success: true,
        checkoutUrl: "/book?session_id=mock_success",
        message: "MOCK MODE: Add real Stripe & Supabase keys to .env.local"
      });
    }

    // One-time service IDs
    const ONE_TIME_IDS = ["termite-inspection", "wasp-removal", "mosquito-event-spray"];
    const isOneTime = ONE_TIME_IDS.includes(planId);

    // Determine plan name
    const planName = isOneTime
      ? planId === "termite-inspection" ? "Termite Inspection"
        : planId === "wasp-removal" ? "Wasp Nest Removal"
        : "Mosquito Event Spray"
      : planId === "premium-shield" ? "Premium Shield Plan"
      : planId === "ultimate-fortress" ? "Ultimate Fortress Plan"
      : "Essential Defense Plan";

    // Determine charge amount in cents
    const initialFee = isOneTime
      ? planId === "termite-inspection" ? 14900  // $149
        : planId === "wasp-removal" ? 24900      // $249
        : 19900                                  // $199 — Mosquito Event Spray
      : planId === "premium-shield" ? 29999      // $299.99
      : planId === "ultimate-fortress" ? 39999   // $399.99
      : 19999;                                   // $199.99 — Essential

    // Advanced Line Item Construction for Subscriptions
    const isYearly = billing === "yearly";
    let lineItems = [];
    let checkoutMode: "payment" | "subscription" = "payment";
    const taxRate = 0.08625; // NY State + Nassau County sales tax: 8.625%

    if (isOneTime) {
      checkoutMode = "payment";
      const tax = Math.round(initialFee * taxRate);
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
      const yearlyCharge = planId === "premium-shield" ? 86388
        : planId === "ultimate-fortress" ? 124788
        : 47988;
      const tax = Math.round(yearlyCharge * taxRate);
      
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
      const monthlyFee = planId === "premium-shield" ? 8999
        : planId === "ultimate-fortress" ? 12999
        : 4999;
      
      // Calculate split: The Initial Fee acts as a one-time charge, the monthly charge repeats.
      // We charge the "Initial Fee" today alongside the "First Month" today so it equals the advertised initial fee exactly.
      const initialFeeDifferential = initialFee - monthlyFee; 
      
      const setupTax = Math.round(initialFeeDifferential * taxRate);
      const monthlyTax = Math.round(monthlyFee * taxRate);

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

    // ⚠️ 🚨 PRODUCTION TODO 🚨 ⚠️
    // Set isTestDrive = false before going live!
    // While true, ALL customers bypass Stripe and get the success page for FREE.
    // This means you will collect ZERO payments in production.
    const isTestDrive = false; // <--- CHANGE TO false FOR REAL PAYMENTS


    let redirectUrl = "";

    if (isTestDrive) {
      // Teleport straight to the success page as if they paid!
      redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/success?session_id=free_test_bypass_${bookingId}`;
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
