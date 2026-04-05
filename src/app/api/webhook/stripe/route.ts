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

        // 2. Send Internal Email via Resend
        try {
          await resend.emails.send({
            from: "Squito Pest Control <service@squitopestcontrol.com>",
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
          console.error("Resend Email Error (Internal):", emailError);
        }

        // 3. Send Customer Confirmation Email
        if (booking.email) {
          try {
            const planName = booking.plan_id?.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()) || 'Pest Control Service';
            await resend.emails.send({
              from: "Squito Pest Control <noreply@squitopestcontrol.com>",
              to: [booking.email],
              subject: `Booking Confirmed — ${planName}`,
              html: `
                <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; border-radius: 16px; overflow: hidden;">
                  <!-- Logo Header -->
                  <div style="background: #0a0a0a; padding: 24px 24px 0; text-align: center;">
                    <img src="https://squitopestcontrol.com/logo.png" alt="Squito Pest Control" width="160" style="display: inline-block;" />
                  </div>
                  <!-- Hero Banner -->
                  <div style="position: relative; text-align: center;">
                    <img src="https://squitopestcontrol.com/termite-inspection.png" alt="Professional Inspection" width="600" style="width: 100%; max-height: 200px; object-fit: cover; display: block; opacity: 0.5;" />
                    <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(180deg, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.9) 100%);"></div>
                    <div style="position: absolute; bottom: 20px; left: 0; right: 0; text-align: center;">
                      <h1 style="color: white; margin: 0; font-size: 26px;">✅ Booking Confirmed!</h1>
                      <p style="color: rgba(255,255,255,0.7); margin: 6px 0 0; font-size: 14px;">Thank you for choosing Squito Pest Control</p>
                    </div>
                  </div>
                  <!-- Body -->
                  <div style="padding: 32px 24px; color: #e0e0e0;">
                    <p style="font-size: 16px; line-height: 1.6;">Hi <strong>${booking.full_name?.split(' ')[0] || 'there'}</strong>,</p>
                    <p style="font-size: 15px; line-height: 1.6; color: #b0b0b0;">Your payment has been received and your service is booked! Here are your details:</p>
                    
                    <div style="background: #141414; border: 1px solid #2a2a2a; border-radius: 12px; padding: 20px; margin: 24px 0;">
                      <table style="width: 100%; border-collapse: collapse;">
                        <tr><td style="padding: 8px 0; color: #22c55e; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Service Plan</td></tr>
                        <tr><td style="padding: 0 0 16px; color: white; font-size: 18px; font-weight: 700;">${planName}</td></tr>
                        <tr><td style="padding: 8px 0; color: #22c55e; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Scheduled Date</td></tr>
                        <tr><td style="padding: 0 0 16px; color: white; font-size: 16px;">${booking.service_date} &bull; ${booking.service_time}</td></tr>
                        <tr><td style="padding: 8px 0; color: #22c55e; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Service Address</td></tr>
                        <tr><td style="padding: 0 0 8px; color: white; font-size: 16px;">${booking.street}, ${booking.zip_code}</td></tr>
                      </table>
                    </div>

                    <p style="font-size: 15px; line-height: 1.6; color: #b0b0b0;">Our team will reach out before your appointment to confirm. If you have any questions, don't hesitate to contact us.</p>
                    
                    <div style="text-align: center; margin: 28px 0;">
                      <a href="tel:6312031000" style="display: inline-block; background: #22c55e; color: white; text-decoration: none; padding: 14px 32px; border-radius: 50px; font-weight: 700; font-size: 15px;">Call Us: (631) 203-1000</a>
                    </div>

                    <div style="text-align: center; margin: 16px 0 0;">
                      <a href="https://squitopestcontrol.com" style="color: #22c55e; text-decoration: none; font-size: 13px; font-weight: 600;">Visit Our Website →</a>
                    </div>
                  </div>
                  <!-- Footer -->
                  <div style="padding: 20px 24px; background: #0f0f0f; border-top: 1px solid #1a1a1a; text-align: center;">
                    <p style="color: #666; font-size: 12px; margin: 0;">Squito Pest Control — Smart. Safe. Pest Control.</p>
                    <p style="color: #444; font-size: 11px; margin: 4px 0 0;">Nassau & Suffolk County, Long Island NY</p>
                  </div>
                </div>
              `,
            });
          } catch (custEmailError) {
            console.error("Customer Confirmation Email Error:", custEmailError);
          }
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
