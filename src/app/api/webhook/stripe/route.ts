import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase";
import { Resend } from "resend";
import { validateEnv } from "@/lib/validateEnv";

const resend = new Resend(process.env.RESEND_API_KEY || "re_build_placeholder");

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export async function POST(req: Request) {
  validateEnv([
    "STRIPE_SECRET_KEY",
    "STRIPE_WEBHOOK_SECRET",
    "NEXT_PUBLIC_SUPABASE_URL",
    "SUPABASE_SERVICE_ROLE_KEY",
    "RESEND_API_KEY",
  ]);

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
    }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    const bookingId = session.metadata?.bookingId;

    if (bookingId) {
      const supabase = createServiceClient();
      const { data: existingBooking, error: fetchError } = await supabase
        .from("bookings")
        .select("id, full_name, email, phone, zip_code, street, city, plan_id, service_date, service_time, stripe_payment_status")
        .eq("id", bookingId)
        .single();

      if (fetchError || !existingBooking) {
        console.error("Failed to load booking for Stripe webhook", {
          bookingId,
          code: (fetchError as any)?.code,
          message: fetchError?.message,
          details: (fetchError as any)?.details,
          hint: (fetchError as any)?.hint,
        });
      } else if (existingBooking.stripe_payment_status === "paid") {
        console.log(`Booking ${bookingId} already marked paid. Skipping duplicate webhook side effects.`);
      } else {
        const { data: booking, error } = await supabase
          .from("bookings")
          .update({ stripe_payment_status: "paid" })
          .eq("id", bookingId)
          .select()
          .single();

        if (error || !booking) {
          console.error("Failed to update booking payment status in Supabase", {
            bookingId,
            code: (error as any)?.code,
            message: error?.message,
            details: (error as any)?.details,
            hint: (error as any)?.hint,
          });
          return NextResponse.json({ received: true });
        }

        console.log(`Booking ${bookingId} successfully marked as PAID!`);
        const safeFullName = escapeHtml(booking.full_name);
        const safeEmail = escapeHtml(booking.email);
        const safePhone = escapeHtml(booking.phone);
        const safeStreet = escapeHtml(booking.street);
        const safeCity = escapeHtml(booking.city);
        const safeZip = escapeHtml(booking.zip_code);
        const safeServiceDate = escapeHtml(booking.service_date);
        const safeServiceTime = escapeHtml(booking.service_time);
        const safePlanId = escapeHtml(booking.plan_id);

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
                city: booking.city,
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
                <h2 style="color: #22c55e;">New Squito Pest Control Purchase!</h2>
                <p><strong>Customer:</strong> ${safeFullName}</p>
                <p><strong>Email:</strong> ${safeEmail}</p>
                <p><strong>Phone:</strong> ${safePhone}</p>
                <p><strong>Address:</strong> ${safeStreet}${safeCity ? `, ${safeCity}` : ""} ${safeZip}</p>
                <p><strong>Plan/Service:</strong> ${safePlanId}</p>
                <p><strong>Requested Date:</strong> ${safeServiceDate} at ${safeServiceTime}</p>
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
            const safePlanName = escapeHtml(planName);
            const safeFirstName = escapeHtml(booking.full_name?.split(' ')[0] || 'there');
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
                    <p style="font-size: 16px; line-height: 1.6;">Hi <strong>${safeFirstName}</strong>,</p>
                    <p style="font-size: 15px; line-height: 1.6; color: #b0b0b0;">Your payment has been received and your service is booked! Here are your details:</p>
                    
                    <div style="background: #141414; border: 1px solid #2a2a2a; border-radius: 12px; padding: 20px; margin: 24px 0;">
                      <table style="width: 100%; border-collapse: collapse;">
                        <tr><td style="padding: 8px 0; color: #22c55e; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Service Plan</td></tr>
                        <tr><td style="padding: 0 0 16px; color: white; font-size: 18px; font-weight: 700;">${safePlanName}</td></tr>
                        <tr><td style="padding: 8px 0; color: #22c55e; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Scheduled Date</td></tr>
                        <tr><td style="padding: 0 0 16px; color: white; font-size: 16px;">${safeServiceDate} &bull; ${safeServiceTime}</td></tr>
                        <tr><td style="padding: 8px 0; color: #22c55e; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Service Address</td></tr>
                        <tr><td style="padding: 0 0 8px; color: white; font-size: 16px;">${safeStreet}${safeCity ? `, ${safeCity}` : ""} ${safeZip}</td></tr>
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
      const { error } = await supabase
        .from("bookings")
        .update({ stripe_payment_status: "expired" })
        .eq("id", bookingId);

      if (error) {
        console.error("Failed to mark booking expired in Supabase", {
          bookingId,
          code: (error as any)?.code,
          message: error.message,
          details: (error as any)?.details,
          hint: (error as any)?.hint,
        });
      }
    }
  }

  return NextResponse.json({ received: true });
}
