import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_build_placeholder");

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
    return NextResponse.json({ 
      error: "Webhook Error", 
      details: err.message,
      prefix: webhookSecret ? webhookSecret.substring(0, 8) : "none"
    }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    const bookingId = session.metadata?.bookingId;

    if (bookingId) {
      // Mark as paid in Database
      const supabase = createServiceClient();
      
      const { data: booking, error } = await supabase
        .from("bookings")
        .update({ status: "paid" })
        .eq("id", bookingId)
        .select()
        .single();

      if (error) {
        console.error("Failed to update booking status in Supabase", error);
      } else if (booking) {
        console.log(`Booking ${bookingId} successfully marked as PAID!`);

        // 1. Send Zapier Webhook
        if (process.env.ZAPIER_WEBHOOK_URL) {
          try {
            await fetch(process.env.ZAPIER_WEBHOOK_URL, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                type: "purchase",
                bookingId: booking.id,
                firstName: booking.full_name?.split(" ")[0] || "",
                lastName: booking.full_name?.split(" ").slice(1).join(" ") || "",
                email: booking.email,
                phone: booking.phone,
                zip: booking.zip_code,
                street: booking.street,
                service: booking.plan_id,
                date: booking.service_date,
                time: booking.service_time,
                timestamp: new Date().toISOString()
              })
            });
          } catch (zapierError) {
            console.error("Zapier Webhook Error (Purchase):", zapierError);
          }
        }

        // 2. Send Email via Resend
        try {
          await resend.emails.send({
            from: "Squito Checkout <onboarding@resend.dev>",
            to: ["service@getsquito.com"],
            subject: `New Booking/Purchase: ${booking.plan_id}`,
            html: `
              <div style="font-family: sans-serif; padding: 20px; color: #333;">
                <h2 style="color: #22c55e;">New Squito AI Purchase!</h2>
                <p><strong>Customer:</strong> ${booking.full_name}</p>
                <p><strong>Email:</strong> ${booking.email}</p>
                <p><strong>Phone:</strong> ${booking.phone}</p>
                <p><strong>Address:</strong> ${booking.street}, ${booking.zip_code}</p>
                <p><strong>Plan/Service:</strong> ${booking.plan_id}</p>
                <p><strong>Requested Date:</strong> ${booking.service_date} at ${booking.service_time}</p>
                <br />
                <p><small>View in Stripe or Supabase for payment confirmation.</small></p>
              </div>
            `,
          });
        } catch (emailError) {
          console.error("Resend Email Error (Purchase):", emailError);
        }
      }
    }
  } else if (event.type === "checkout.session.expired") {
    const session = event.data.object as any;
    const bookingId = session.metadata?.bookingId;

    if (bookingId) {
      const supabase = createServiceClient();
      await supabase
        .from("bookings")
        .update({ status: "expired" })
        .eq("id", bookingId);
    }
  }

  return NextResponse.json({ received: true });
}
