import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase";

export async function POST(req: Request) {
  const payload = await req.text();
  const signature = req.headers.get("stripe-signature") as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  // 🔒 PRODUCTION GUARD: Never allow unsigned webhook calls in production.
  // If this env var is missing on Vercel, fix it immediately in the dashboard.
  if (!webhookSecret && process.env.NODE_ENV === "production") {
    console.error("FATAL: STRIPE_WEBHOOK_SECRET is not set in production. Rejecting webhook.");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  if (!webhookSecret) {
    console.warn("No Stripe Webhook Secret detected. Bypassing validation (local dev only).");
  }

  let event;

  try {
    if (webhookSecret) {
       event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    } else {
       // Blind parse if no secret is active, useful for local manual testing via postman
       event = JSON.parse(payload);
    }
  } catch (err: any) {
    console.error("Webhook signature verification failed.", err.message);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    const bookingId = session.metadata?.bookingId;

    if (bookingId) {
      // Mark as paid in Database
      const supabase = createServiceClient();
      
      const { error } = await supabase
        .from("bookings")
        .update({ stripe_payment_status: "paid" })
        .eq("id", bookingId);

      if (error) {
        console.error("Failed to update booking status in Supabase", error);
      } else {
        console.log(`Booking ${bookingId} successfully marked as PAID!`);
      }
    }
  } else if (event.type === "checkout.session.expired") {
    const session = event.data.object as any;
    const bookingId = session.metadata?.bookingId;

    if (bookingId) {
      const supabase = createServiceClient();
      await supabase
        .from("bookings")
        .update({ stripe_payment_status: "expired" })
        .eq("id", bookingId);
    }
  }

  return NextResponse.json({ received: true });
}
