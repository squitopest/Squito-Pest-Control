import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { validateEnv } from "@/lib/validateEnv";
import { createServiceClient } from "@/lib/supabase";
import { rateLimit, getClientIp } from "@/lib/rateLimit";
import { formatSelectedPlanName, getOneTimeService, getSubscriptionPlan, resolvePropertySize } from "@/data/plans";

type BookingSummary = {
  planTitle: string;
  fullName: string | null;
  serviceDate: string | null;
  serviceTime: string | null;
  city: string | null;
  zipCode: string | null;
  amountTotalCents: number | null;
  currency: string | null;
};

function buildPlanTitle(planId: string | null | undefined): string {
  if (!planId) return "Squito Service";
  return (
    getSubscriptionPlan(planId)?.name ??
    getOneTimeService(planId)?.name ??
    "Squito Service"
  );
}

async function loadBookingSummary(bookingId: string): Promise<BookingSummary | null> {
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from("bookings")
      .select("full_name, service_date, service_time, city, zip_code, plan_id, property_size, service_type, service_summary, service_id")
      .eq("id", bookingId)
      .single();

    if (error || !data) return null;

    return {
      planTitle:
        data.service_type === "mosquito_tick"
          ? data.service_summary ?? "Mosquito & Tick Package"
          : data.service_type === "specialty"
          ? data.service_summary ?? data.service_id ?? "Specialty Service"
          : data.property_size
            ? formatSelectedPlanName(data.plan_id, resolvePropertySize(data.property_size))
            : buildPlanTitle(data.plan_id),
      fullName: data.full_name ?? null,
      serviceDate: data.service_date ?? null,
      serviceTime: data.service_time ?? null,
      city: data.city ?? null,
      zipCode: data.zip_code ?? null,
      amountTotalCents: null,
      currency: null,
    };
  } catch (e) {
    console.error("loadBookingSummary failed", e);
    return null;
  }
}

export async function GET(req: Request) {
  const ip = getClientIp(req);
  if (!rateLimit(`checkout-session:${ip}`, 30, 60_000)) {
    return NextResponse.json(
      { error: "Too many requests. Please slow down and try again shortly." },
      { status: 429 }
    );
  }

  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session_id")?.trim();

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id." }, { status: 400 });
  }

  try {
    if (sessionId.startsWith("mock_") || sessionId.startsWith("free_test_bypass_")) {
      const bookingId = searchParams.get("booking_id")?.trim();
      if (!bookingId) {
        return NextResponse.json({ verified: false, paymentStatus: "unverified" }, { status: 400 });
      }

      validateEnv(["NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"]);
      const supabase = createServiceClient();
      const { data, error } = await supabase
        .from("bookings")
        .select("id, stripe_payment_status")
        .eq("id", bookingId)
        .single();

      if (error || !data) {
        return NextResponse.json({ verified: false, paymentStatus: "unverified" }, { status: 404 });
      }

      const verified = data.stripe_payment_status === "paid";
      const summary = verified ? await loadBookingSummary(bookingId) : null;

      return NextResponse.json({
        verified,
        mode: "mock",
        paymentStatus: data.stripe_payment_status,
        booking: summary,
      });
    }

    validateEnv(["STRIPE_SECRET_KEY"]);
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // "no_payment_required" covers mosquito-tick reservations — a subscription
    // with trial_end set, where Stripe saves the card but doesn't charge today.
    const verified =
      session.status === "complete" &&
      (session.payment_status === "paid" || session.payment_status === "no_payment_required");
    const bookingId = (session.metadata?.bookingId || "").trim();

    let booking: BookingSummary | null = null;
    if (verified && bookingId) {
      booking = await loadBookingSummary(bookingId);
      if (booking) {
        booking.amountTotalCents = session.amount_total ?? null;
        booking.currency = session.currency ?? null;
      }
    }

    return NextResponse.json({
      verified,
      mode: session.mode,
      paymentStatus: session.payment_status,
      booking,
    });
  } catch (error: any) {
    console.error("Checkout session verification failed:", error?.message || error);
    return NextResponse.json(
      { error: "We couldn't verify this checkout session." },
      { status: 404 }
    );
  }
}
