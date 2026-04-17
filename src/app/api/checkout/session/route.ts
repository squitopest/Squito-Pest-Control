import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { validateEnv } from "@/lib/validateEnv";
import { createServiceClient } from "@/lib/supabase";
import { rateLimit, getClientIp } from "@/lib/rateLimit";

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

      return NextResponse.json({
        verified: data.stripe_payment_status === "paid",
        mode: "mock",
        paymentStatus: data.stripe_payment_status,
      });
    }

    validateEnv(["STRIPE_SECRET_KEY"]);
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return NextResponse.json({
      verified: session.status === "complete" && session.payment_status === "paid",
      mode: session.mode,
      paymentStatus: session.payment_status,
    });
  } catch (error: any) {
    console.error("Checkout session verification failed:", error?.message || error);
    return NextResponse.json(
      { error: "We couldn't verify this checkout session." },
      { status: 404 }
    );
  }
}
