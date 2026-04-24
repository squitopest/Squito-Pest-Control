import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase";
import {
  calculateSpecialtyQuote,
  getSpecialtyService,
  serializeSpecialtySelection,
} from "@/data/specialtyServices";
import {
  getSubscriptionCheckoutBreakdown,
  isOneTimeService,
  getOneTimeService,
  formatSelectedPlanName,
  isQuoteOnlySize,
  resolvePropertySize,
  TAX_RATE,
} from "@/data/plans";
import {
  formatMosquitoTickBillingSummary,
  formatMosquitoTickPackageName,
  getMosquitoTickBillingPlan,
  getMosquitoTickPackage,
  getMosquitoTickReservationPlan,
  isMosquitoTickYardSize,
  type MosquitoTickBillingPlan,
  type MosquitoTickPackage,
} from "@/data/mosquitoTickPackages";
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
    const serviceType = normalizeInput(body.serviceType, 40);
    const serviceId = normalizeInput(body.serviceId, 80);
    const propertySize = resolvePropertySize(normalizeInput(body.propertySize, 20));
    const fullName = normalizeInput(body.fullName, 120);
    const email = normalizeInput(body.email, 160);
    const phone = normalizeInput(body.phone, 30);
    const billing = normalizeInput(body.billing, 20);
    // Promo code flows through as an optional string. We validate with Stripe
    // before applying so bad/expired codes fall back to the manual entry field
    // rather than failing checkout.
    const promoInput = normalizeInput(body.promo, 40).toUpperCase();
    // Optional cross-sell add-on from the 3-step booking wizard.
    // When present, a second recurring line item is appended to the Stripe
    // session so both subscriptions start from the same checkout.
    const addOnRaw = body.addOn as { type?: string; sizeId?: string; discountPercent?: number } | undefined;
    const addOnType = addOnRaw?.type === "mosquito-tick" || addOnRaw?.type === "general-pest" ? addOnRaw.type : null;
    const addOnSizeId = normalizeInput(addOnRaw?.sizeId, 20);
    const addOnDiscountPct = Math.max(0, Math.min(50, Number(addOnRaw?.discountPercent) || 0));
    const isSpecialtyCheckout = serviceType === "specialty";
    const isMosquitoTickCheckout = serviceType === "mosquito-tick";
    const mosquitoTickSizeRaw = normalizeInput(body.mosquitoTickSize ?? serviceId, 20);
    const mosquitoTickIntentRaw = normalizeInput(body.mosquitoTickIntent, 20);
    const mosquitoTickIntent: "current" | "reserve" =
      mosquitoTickIntentRaw === "reserve" ? "reserve" : "current";
    const mosquitoTickPackage: MosquitoTickPackage | null =
      isMosquitoTickCheckout && isMosquitoTickYardSize(mosquitoTickSizeRaw)
        ? getMosquitoTickPackage(mosquitoTickSizeRaw) ?? null
        : null;
    const mosquitoTickBillingPlan: MosquitoTickBillingPlan | null =
      isMosquitoTickCheckout && mosquitoTickPackage && !mosquitoTickPackage.quoteOnly
        ? mosquitoTickIntent === "reserve"
          ? getMosquitoTickReservationPlan(mosquitoTickPackage)
          : getMosquitoTickBillingPlan(mosquitoTickPackage)
        : null;

    const specialtyService = isSpecialtyCheckout ? getSpecialtyService(serviceId) : null;
    const specialtyQuote = isSpecialtyCheckout ? calculateSpecialtyQuote(serviceId, body.selection) : null;

    // Reservation flows don't require a date/time since the team calls in late March.
    const isReservationSignup = Boolean(
      isMosquitoTickCheckout && mosquitoTickBillingPlan?.mode === "off-season-reservation"
    );
    const requiredBaseMissing = !zipCode || !street || !city || !fullName || !email || !phone;
    const requiredScheduleMissing = !isReservationSignup && (!date || !time);

    if (requiredBaseMissing || requiredScheduleMissing) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const digitsOnlyPhone = phone.replace(/\D/g, "");
    const isSupportedPlan =
      isMosquitoTickCheckout
        ? Boolean(mosquitoTickPackage && mosquitoTickBillingPlan && !mosquitoTickPackage.quoteOnly)
        : isSpecialtyCheckout
        ? Boolean(specialtyService && specialtyQuote)
        : isOneTimeService(planId) ||
          Boolean(getSubscriptionCheckoutBreakdown(planId, "small", "monthly"));

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

    if (isSpecialtyCheckout && (!specialtyQuote || specialtyQuote.quoteOnly)) {
      return NextResponse.json(
        { error: "This specialty service requires a custom quote before checkout." },
        { status: 400 }
      );
    }

    if (isMosquitoTickCheckout && (!mosquitoTickPackage || mosquitoTickPackage.quoteOnly || !mosquitoTickBillingPlan)) {
      return NextResponse.json(
        { error: "This yard size requires a custom quote before checkout." },
        { status: 400 }
      );
    }

    if (!isSpecialtyCheckout && !isMosquitoTickCheckout && !isOneTimeService(planId) && isQuoteOnlySize(propertySize)) {
      return NextResponse.json(
        { error: "This home fit requires a custom quote before checkout." },
        { status: 400 }
      );
    }

    const isMock = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.includes("mock") || !process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

    // 1. Create Supabase Row before charging the customer.
    // If we can't persist the booking, we should not accept payment.
    const supabase = createServiceClient();
    let bookingId = "mock-booking-id-" + Math.random().toString(36).slice(2);

    if (!isMock) {
      try {
        const mosquitoTickSummary = isMosquitoTickCheckout && mosquitoTickPackage && mosquitoTickBillingPlan
          ? `${formatMosquitoTickPackageName(mosquitoTickPackage)} — ${formatMosquitoTickBillingSummary(mosquitoTickBillingPlan)}`
          : null;

        const bookingRow: Record<string, unknown> = {
          property_type: propertyType || "Residential",
          zip_code: zipCode,
          service_date: date || (isReservationSignup ? "Reservation — schedule in late March" : ""),
          service_time: time || (isReservationSignup ? "We'll confirm by phone" : ""),
          street: street,
          city: city,
          plan_id: isMosquitoTickCheckout
            ? `mosquito-tick-${mosquitoTickPackage?.id ?? "unknown"}`
            : isSpecialtyCheckout
              ? specialtyService?.id ?? serviceId ?? "specialty-service"
              : planId,
          property_size: isMosquitoTickCheckout
            ? null
            : !isSpecialtyCheckout && isOneTimeService(planId)
              ? null
              : !isSpecialtyCheckout
                ? propertySize
                : null,
          service_type: isMosquitoTickCheckout
            ? "mosquito_tick"
            : isSpecialtyCheckout
              ? "specialty"
              : isOneTimeService(planId)
                ? "one_time"
                : "plan",
          service_id: isMosquitoTickCheckout
            ? mosquitoTickPackage?.id ?? null
            : isSpecialtyCheckout
              ? specialtyService?.id ?? null
              : null,
          pricing_selection: isMosquitoTickCheckout
            ? {
                intent: mosquitoTickIntent,
                mode: mosquitoTickBillingPlan?.mode,
                size: mosquitoTickPackage?.id,
                monthsRemaining: mosquitoTickBillingPlan?.monthsRemaining,
                seasonYear: mosquitoTickBillingPlan?.seasonYear,
              }
            : isSpecialtyCheckout
              ? specialtyQuote?.selection ?? null
              : null,
          quoted_price_cents: isMosquitoTickCheckout
            ? mosquitoTickBillingPlan
              ? Math.round(mosquitoTickBillingPlan.monthlyPrice * 100)
              : null
            : isSpecialtyCheckout
              ? specialtyQuote?.subtotalCents ?? null
              : null,
          service_summary: isMosquitoTickCheckout
            ? mosquitoTickSummary
            : isSpecialtyCheckout
              ? specialtyQuote?.serviceSummary ?? null
              : null,
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
    const isOneTime = !isSpecialtyCheckout && !isMosquitoTickCheckout && isOneTimeService(planId);
    const oneTimePlan = isOneTime ? getOneTimeService(planId) : null;
    const subscriptionBreakdown = !isSpecialtyCheckout && !isMosquitoTickCheckout && !isOneTime
      ? getSubscriptionCheckoutBreakdown(planId, propertySize, billing === "yearly" ? "yearly" : "monthly")
      : null;

    if (!isSpecialtyCheckout && !isMosquitoTickCheckout && !isOneTime && (!subscriptionBreakdown || subscriptionBreakdown.quoteOnly)) {
      return NextResponse.json(
        { error: "This property size requires a custom quote before checkout." },
        { status: 400 }
      );
    }

    const planName = isMosquitoTickCheckout
      ? mosquitoTickPackage
        ? formatMosquitoTickPackageName(mosquitoTickPackage)
        : "Mosquito & Tick Package"
      : isSpecialtyCheckout
      ? specialtyService?.name ?? "Specialty Service"
      : isOneTime
      ? oneTimePlan?.name ?? "Squito Pest Control Service"
      : formatSelectedPlanName(planId, propertySize);

    // All amounts in cents for Stripe
    const initialFee = isMosquitoTickCheckout
      ? 0
      : isSpecialtyCheckout
      ? specialtyQuote!.subtotalCents
      : isOneTime
      ? Math.round(oneTimePlan!.price * 100)
      : subscriptionBreakdown!.initialFeeCents;

    // Advanced line item construction for one-time purchases and subscriptions.
    const isYearly = billing === "yearly";
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    let checkoutMode: "payment" | "subscription" = "payment";
    let mosquitoTickSubscriptionData:
      | Stripe.Checkout.SessionCreateParams.SubscriptionData
      | null = null;

    if (isMosquitoTickCheckout && mosquitoTickPackage && mosquitoTickBillingPlan) {
      checkoutMode = "subscription";
      const monthlyCents = Math.round(mosquitoTickBillingPlan.monthlyPrice * 100);
      const monthlyTaxCents = Math.round(monthlyCents * TAX_RATE);

      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: `Squito Mosquito & Tick Package`,
            description: mosquitoTickBillingPlan.mode === "off-season-reservation"
              ? `Monthly seasonal subscription. Billing begins April 1, ${mosquitoTickBillingPlan.seasonYear}. Auto-cancels October 31, ${mosquitoTickBillingPlan.seasonYear}.`
              : `Monthly seasonal subscription. ${formatMosquitoTickBillingSummary(mosquitoTickBillingPlan)}. Auto-cancels October 31, ${mosquitoTickBillingPlan.seasonYear}.`,
          },
          unit_amount: monthlyCents + monthlyTaxCents,
          recurring: { interval: "month" as const },
        },
        quantity: 1,
      });

      // Stripe Checkout Sessions don't accept `cancel_at` directly in
      // subscription_data — we stash the target cancel timestamp in metadata
      // and the `checkout.session.completed` webhook applies it via
      // `stripe.subscriptions.update({ cancel_at })` once the subscription exists.
      //   - trial_end:   for off-season reservations only — no charge until April 1
      //   - billing_cycle_anchor: unspecified (Stripe uses signup time), so in-season signups renew on the same day each month
      const cancelAtUnix = Math.floor(
        mosquitoTickBillingPlan.subscriptionEndDate.getTime() / 1000
      );
      const subData: Stripe.Checkout.SessionCreateParams.SubscriptionData = {
        metadata: {
          productType: "mosquito-tick",
          yardSize: mosquitoTickPackage.id,
          yardLabel: mosquitoTickPackage.label,
          signupMode: mosquitoTickBillingPlan.mode,
          seasonYear: String(mosquitoTickBillingPlan.seasonYear),
          monthsRemaining: String(mosquitoTickBillingPlan.monthsRemaining),
          cancelAtUnix: String(cancelAtUnix),
          bookingId,
        },
      };
      if (mosquitoTickBillingPlan.mode === "off-season-reservation") {
        subData.trial_end = Math.floor(mosquitoTickBillingPlan.firstChargeDate.getTime() / 1000);
      }
      mosquitoTickSubscriptionData = subData;
    } else if (isSpecialtyCheckout) {
      checkoutMode = "payment";
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: `Squito Pest Control - ${planName}`,
            description: `${specialtyQuote!.detailSummary} | Appointment: ${date} at ${time} | Address: ${street}, ${city} ${zipCode}`,
          },
          unit_amount: specialtyQuote!.totalDueCents,
        },
        quantity: 1,
      });
    } else if (isOneTime) {
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
      checkoutMode = "payment";
      const yearlyCharge = subscriptionBreakdown!.yearlyTotalCents;
      const tax = subscriptionBreakdown!.taxCents;

      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: `Annual Prepay - ${planName}`,
            description: `One-time annual payment. Address: ${street}, ${city} ${zipCode}`,
          },
          unit_amount: yearlyCharge + tax,
        },
        quantity: 1,
      });
    } else {
      checkoutMode = "subscription";
      const monthlyFee = subscriptionBreakdown!.monthlyPriceCents;

      // The Initial Fee covers the first visit flush-out. We split it into:
      // a one-time differential charge today + the first recurring monthly charge today.
      const initialFeeDifferential = initialFee - monthlyFee;

      const setupTax = Math.round(initialFeeDifferential * TAX_RATE);
      const monthlyTax = subscriptionBreakdown!.taxCents - setupTax;

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

    // ─── Cross-sell add-on line item ──────────────────────────────────────
    // If the wizard attached an add-on (mosquito-tick or general-pest),
    // inject a second recurring line item into the session.
    if (addOnType === "mosquito-tick" && isMosquitoTickYardSize(addOnSizeId)) {
      const addOnPkg = getMosquitoTickPackage(addOnSizeId);
      const addOnBilling = addOnPkg && !addOnPkg.quoteOnly ? getMosquitoTickBillingPlan(addOnPkg) : null;
      if (addOnPkg && addOnBilling && addOnBilling.monthlyPrice > 0) {
        checkoutMode = "subscription"; // ensure mode supports recurring
        const fullCents = Math.round(addOnBilling.monthlyPrice * 100);
        const addOnCents = addOnDiscountPct > 0
          ? Math.round(fullCents * (1 - addOnDiscountPct / 100))
          : fullCents;
        const addOnTaxCents = Math.round(addOnCents * TAX_RATE);
        const discLabel = addOnDiscountPct > 0 ? ` (${addOnDiscountPct}% bundle discount)` : "";
        lineItems.push({
          price_data: {
            currency: "usd",
            product_data: {
              name: `Mosquito & Tick Protection${discLabel}`,
              description: `Monthly seasonal subscription (Apr–Oct). Auto-cancels October 31.`,
            },
            unit_amount: addOnCents + addOnTaxCents,
            recurring: { interval: "month" as const },
          },
          quantity: 1,
        });
      }
    } else if (addOnType === "general-pest") {
      const addOnBreakdown = getSubscriptionCheckoutBreakdown("essential-defense", propertySize, "monthly");
      if (addOnBreakdown && !addOnBreakdown.quoteOnly) {
        checkoutMode = "subscription";
        const addOnMonthly = addOnBreakdown.monthlyPriceCents;
        const addOnTax = Math.round(addOnMonthly * TAX_RATE);
        lineItems.push({
          price_data: {
            currency: "usd",
            product_data: {
              name: `General Pest Protection — Essential Defense (${addOnDiscountPct}% bundle discount)`,
              description: `Year-round quarterly exterior treatments. Address: ${street}, ${city} ${zipCode}`,
            },
            unit_amount: addOnMonthly + addOnTax,
            recurring: { interval: "month" as const },
          },
          quantity: 1,
        });
      }
    }

    // isTestDrive = true bypasses Stripe and sends users straight to the success page for free.
    // It is currently OFF (false), meaning real Stripe payments are active.
    // Only set to true temporarily if you need to test the booking flow without charging.
    const isTestDrive = false;


    let redirectUrl = "";

    // Validate and resolve the promo code (if any) up-front so we can both
    // preserve it in the cancel_url AND apply it to the Stripe session.
    // Stripe requires the promotion_code ID (prefix `promo_`), not the
    // customer-facing code string. Silent fallback on lookup failure lets the
    // customer still enter a code at Stripe's payment page.
    let resolvedPromoId: string | null = null;
    let promoLookupFailed = false;
    if (promoInput) {
      try {
        const promoList = await stripe.promotionCodes.list({
          code: promoInput,
          active: true,
          limit: 1,
        });
        if (promoList.data.length > 0) {
          resolvedPromoId = promoList.data[0].id;
        } else {
          promoLookupFailed = true;
          console.warn(`Promo code "${promoInput}" not found or inactive.`);
        }
      } catch (promoErr: any) {
        promoLookupFailed = true;
        console.warn("Promo code lookup failed, falling back to manual entry.", promoErr?.message);
      }
    }

    if (isTestDrive) {
      // Teleport straight to the success page as if they paid!
      redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/success?session_id=free_test_bypass_${bookingId}&booking_id=${bookingId}`;
    } else {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
      const cancelUrl = new URL("/book", appUrl);
      cancelUrl.searchParams.set("canceled", "1");

      if (isMosquitoTickCheckout && mosquitoTickPackage) {
        cancelUrl.searchParams.set("serviceType", "mosquito-tick");
        cancelUrl.searchParams.set("size", mosquitoTickPackage.id);
        cancelUrl.searchParams.set("billing", "monthly");
        cancelUrl.searchParams.set("intent", mosquitoTickIntent);
      } else if (isSpecialtyCheckout) {
        cancelUrl.searchParams.set("serviceType", "specialty");
        cancelUrl.searchParams.set("serviceId", specialtyService?.id ?? serviceId);
        cancelUrl.searchParams.set("billing", "onetime");
        if (specialtyQuote?.selection) {
          cancelUrl.searchParams.set("selection", serializeSpecialtySelection(specialtyQuote.selection));
        }
      } else {
        cancelUrl.searchParams.set("plan", planId);
        cancelUrl.searchParams.set("billing", billing || "monthly");
        if (!isOneTimeService(planId)) {
          cancelUrl.searchParams.set("size", propertySize);
        }
      }

      // Preserve promo through Stripe bounces so the discount chip
      // re-appears on /book if the customer comes back.
      if (promoInput && !promoLookupFailed) {
        cancelUrl.searchParams.set("promo", promoInput);
      }

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
      const sessionParams: Stripe.Checkout.SessionCreateParams = {
        customer: customer.id,
        billing_address_collection: "auto",
        line_items: lineItems,
        mode: checkoutMode,
        success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: cancelUrl.toString(),
        // Mutually exclusive with `discounts` — so only enable the promo field
        // when we DIDN'T auto-apply a code.
        ...(resolvedPromoId
          ? { discounts: [{ promotion_code: resolvedPromoId }] }
          : { allow_promotion_codes: true }),
        metadata: {
          bookingId: bookingId,
          propertySize,
          billing,
          serviceType: isMosquitoTickCheckout
            ? "mosquito-tick"
            : isSpecialtyCheckout
              ? "specialty"
              : "standard",
          serviceId: isMosquitoTickCheckout
            ? mosquitoTickPackage?.id ?? ""
            : isSpecialtyCheckout
              ? specialtyService?.id ?? ""
              : planId,
          serviceSummary: isMosquitoTickCheckout && mosquitoTickPackage && mosquitoTickBillingPlan
            ? `${formatMosquitoTickPackageName(mosquitoTickPackage)} — ${formatMosquitoTickBillingSummary(mosquitoTickBillingPlan)}`
            : isSpecialtyCheckout
              ? specialtyQuote?.serviceSummary ?? ""
              : planName,
          ...(isMosquitoTickCheckout && mosquitoTickBillingPlan
            ? {
                mosquitoTickMode: mosquitoTickBillingPlan.mode,
                mosquitoTickSize: mosquitoTickPackage?.id ?? "",
                mosquitoTickSeasonYear: String(mosquitoTickBillingPlan.seasonYear),
                mosquitoTickMonthsRemaining: String(mosquitoTickBillingPlan.monthsRemaining),
                mosquitoTickCancelAtUnix: String(
                  Math.floor(mosquitoTickBillingPlan.subscriptionEndDate.getTime() / 1000)
                ),
              }
            : {}),
          ...(promoInput
            ? { promoCode: promoInput, promoApplied: resolvedPromoId ? "yes" : "fallback" }
            : {}),
        },
      };
      if (mosquitoTickSubscriptionData) {
        sessionParams.subscription_data = mosquitoTickSubscriptionData;
      }
      const session = await stripe.checkout.sessions.create(sessionParams);
      redirectUrl = session.url || "/book";

      // Update Supabase with Session ID securely if real Stripe session
      if (!isMock && session.id && !bookingId.includes("mock-booking-id")) {
        try {
          await supabase
            .from("bookings")
            .update({ stripe_session_id: session.id })
            .eq("id", bookingId);
        } catch {
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
