import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase";
import { Resend } from "resend";
import { validateEnv } from "@/lib/validateEnv";
import { formatSelectedPlanName, resolvePropertySize } from "@/data/plans";

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

    // Mosquito & tick subscriptions need Stripe's `cancel_at` set so they
    // auto-cancel on Oct 31. Checkout Session subscription_data doesn't accept
    // cancel_at, so we apply it here the moment the subscription exists.
    const cancelAtMeta = session.metadata?.mosquitoTickCancelAtUnix;
    const subscriptionId = session.subscription;
    if (cancelAtMeta && subscriptionId && typeof subscriptionId === "string") {
      const cancelAtUnix = parseInt(cancelAtMeta, 10);
      if (Number.isFinite(cancelAtUnix) && cancelAtUnix > Math.floor(Date.now() / 1000)) {
        try {
          await stripe.subscriptions.update(subscriptionId, {
            cancel_at: cancelAtUnix,
          });
          console.log(`Applied cancel_at=${cancelAtUnix} to subscription ${subscriptionId}`);
        } catch (cancelErr: any) {
          console.error("Failed to apply cancel_at to mosquito-tick subscription", {
            subscriptionId,
            message: cancelErr?.message,
          });
        }
      }
    }

    // Persist subscription ID on the booking so `customer.subscription.deleted`
    // can map back to the booking for retention emails.
    if (bookingId && subscriptionId && typeof subscriptionId === "string") {
      try {
        const supabase = createServiceClient();
        await supabase
          .from("bookings")
          .update({ stripe_subscription_id: subscriptionId })
          .eq("id", bookingId);
      } catch (subIdErr) {
        console.warn("Failed to persist stripe_subscription_id on booking", subIdErr);
      }
    }

    if (bookingId) {
      const supabase = createServiceClient();
      const { data: existingBooking, error: fetchError } = await supabase
        .from("bookings")
        .select("id, full_name, email, phone, zip_code, street, city, plan_id, property_size, service_type, service_id, service_summary, service_date, service_time, stripe_payment_status, pricing_selection")
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
        const planLabel = booking.service_type === "mosquito_tick"
          ? booking.service_summary || "Mosquito & Tick Package"
          : booking.service_type === "specialty"
          ? booking.service_summary || booking.service_id || "Specialty Service"
          : booking.property_size
            ? formatSelectedPlanName(booking.plan_id, resolvePropertySize(booking.property_size))
            : booking.plan_id?.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()) || "Pest Control Service";
        const safePlanLabel = escapeHtml(planLabel);

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
                service: planLabel,
                date: booking.service_date,
                time: booking.service_time,
                timestamp: new Date().toISOString()
              })
            });
          } catch (zapierError) {
            console.error("Zapier Webhook Error (Purchase):", zapierError);
          }
        }

        const mosquitoTickMeta = booking.service_type === "mosquito_tick"
          ? (booking.pricing_selection as { mode?: string; intent?: string; monthsRemaining?: number; seasonYear?: number } | null)
          : null;
        const isMosquitoTickReservation = mosquitoTickMeta?.mode === "off-season-reservation";

        // 2. Send Internal Email via Resend
        try {
          await resend.emails.send({
            from: "Squito Pest Control <service@squitopestcontrol.com>",
            to: ["service@getsquito.com"],
            subject: isMosquitoTickReservation
              ? `Mosquito & Tick Reservation: ${planLabel} (season ${mosquitoTickMeta?.seasonYear ?? ""})`
              : booking.service_type === "mosquito_tick"
                ? `New Mosquito & Tick Signup: ${planLabel}`
                : `New Booking/Purchase: ${planLabel}`,
            html: `
              <div style="font-family: sans-serif; padding: 20px; color: #333;">
                <h2 style="color: #22c55e;">${
                  isMosquitoTickReservation
                    ? "Mosquito & Tick Reservation Held"
                    : booking.service_type === "mosquito_tick"
                      ? "New Mosquito & Tick Subscription"
                      : "New Squito Pest Control Purchase!"
                }</h2>
                <p><strong>Customer:</strong> ${safeFullName}</p>
                <p><strong>Email:</strong> ${safeEmail}</p>
                <p><strong>Phone:</strong> ${safePhone}</p>
                <p><strong>Address:</strong> ${safeStreet}${safeCity ? `, ${safeCity}` : ""} ${safeZip}</p>
                <p><strong>Plan/Service:</strong> ${safePlanLabel}</p>
                <p><strong>Requested Date:</strong> ${safeServiceDate} at ${safeServiceTime}</p>
                ${isMosquitoTickReservation
                  ? `<p style="background:#fef3c7;padding:10px;border-radius:6px;"><strong>Reservation:</strong> Card saved on file. No charge today. Billing starts April 1, ${escapeHtml(mosquitoTickMeta?.seasonYear ?? "")}. Team should contact customer in late March to schedule first visit.</p>`
                  : booking.service_type === "mosquito_tick"
                    ? `<p style="background:#dcfce7;padding:10px;border-radius:6px;"><strong>Seasonal subscription:</strong> ${escapeHtml(String(mosquitoTickMeta?.monthsRemaining ?? ""))} monthly charge(s) remaining this season. Auto-cancels October 31.</p>`
                    : ""}
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
            const planName = planLabel;
            const safePlanName = escapeHtml(planName);
            const safeFirstName = escapeHtml(booking.full_name?.split(' ')[0] || 'there');
            const confirmationSubject = isMosquitoTickReservation
              ? `Reservation Held — ${planName}`
              : booking.service_type === "mosquito_tick"
                ? `You're In! — ${planName}`
                : `Booking Confirmed — ${planName}`;
            const confirmationHeadline = isMosquitoTickReservation
              ? "Spot Reserved!"
              : booking.service_type === "mosquito_tick"
                ? "You're Protected!"
                : "Booking Confirmed!";
            const confirmationSubline = isMosquitoTickReservation
              ? `We'll call you in late March to schedule your first visit in April.`
              : booking.service_type === "mosquito_tick"
                ? `Season-long mosquito & tick protection. No billing after October 31.`
                : `Your payment has been received and your service is booked! Here are your details:`;
            await resend.emails.send({
              from: "Squito Pest Control <noreply@squitopestcontrol.com>",
              to: [booking.email],
              subject: confirmationSubject,
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
                      <h1 style="color: white; margin: 0; font-size: 26px;">✅ ${confirmationHeadline}</h1>
                      <p style="color: rgba(255,255,255,0.7); margin: 6px 0 0; font-size: 14px;">Thank you for choosing Squito Pest Control</p>
                    </div>
                  </div>
                  <!-- Body -->
                  <div style="padding: 32px 24px; color: #e0e0e0;">
                    <p style="font-size: 16px; line-height: 1.6;">Hi <strong>${safeFirstName}</strong>,</p>
                    <p style="font-size: 15px; line-height: 1.6; color: #b0b0b0;">${escapeHtml(confirmationSubline)}</p>
                    
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
  } else if (event.type === "customer.subscription.deleted") {
    // Fires when a subscription is canceled. For mosquito & tick packages this
    // happens automatically on Oct 31 via the `cancel_at` we apply at signup.
    // We send a "season complete — see you in April" retention email so the
    // customer is primed to re-book and understands they're not being ghosted.
    const subscription = event.data.object as any;
    const subProductType = subscription.metadata?.productType;

    if (subProductType === "mosquito-tick") {
      const subId: string = subscription.id;
      const canceledAtUnix: number | null = subscription.canceled_at ?? subscription.ended_at ?? null;
      const scheduledCancelUnix = parseInt(subscription.metadata?.cancelAtUnix ?? "", 10);

      // Distinguish a scheduled season-end cancel from a manual mid-season
      // cancel. We only send the retention email when the cancel fires near
      // the scheduled date (within 48h). Manual cancels are left silent for
      // now — we can layer on a separate retention flow later if needed.
      const isScheduledCancel =
        Number.isFinite(scheduledCancelUnix) &&
        canceledAtUnix !== null &&
        Math.abs(canceledAtUnix - scheduledCancelUnix) <= 60 * 60 * 48;

      if (!isScheduledCancel) {
        console.log(
          `Mosquito-tick subscription ${subId} canceled outside scheduled window — skipping retention email.`
        );
        return NextResponse.json({ received: true });
      }

      try {
        const supabase = createServiceClient();

        // Idempotency: skip if we've already sent the season-end email for
        // this booking (Stripe can retry webhooks for up to 3 days).
        const { data: booking } = await supabase
          .from("bookings")
          .select("id, full_name, email, service_summary, pricing_selection, season_end_email_sent_at")
          .eq("stripe_subscription_id", subId)
          .maybeSingle();

        if (!booking) {
          console.warn(`No booking found for canceled subscription ${subId}. Skipping retention email.`);
          return NextResponse.json({ received: true });
        }

        if (booking.season_end_email_sent_at) {
          console.log(`Season-end email already sent for booking ${booking.id}. Skipping.`);
          return NextResponse.json({ received: true });
        }

        const meta = (booking.pricing_selection as { seasonYear?: number } | null) ?? null;
        const endedSeasonYear = meta?.seasonYear ?? new Date().getFullYear();
        const nextSeasonYear = endedSeasonYear + 1;
        const yardLabel = subscription.metadata?.yardLabel ?? "your yard";
        const safeFirstName = escapeHtml(booking.full_name?.split(" ")[0] || "there");
        const safeYardLabel = escapeHtml(yardLabel);
        const safeNextYear = escapeHtml(nextSeasonYear);

        // Pre-fill size + source so the re-book link drops the customer back
        // onto the mosquito-tick landing page with their package selected.
        const rebookHref = `https://squitopestcontrol.com/services/mosquito-tick?size=${encodeURIComponent(
          subscription.metadata?.yardSize ?? "small"
        )}&utm_source=season_end_email&utm_medium=email&utm_campaign=mt_${endedSeasonYear}_renewal`;

        if (booking.email) {
          try {
            await resend.emails.send({
              from: "Squito Pest Control <noreply@squitopestcontrol.com>",
              to: [booking.email],
              subject: `Season complete — see you in April ${nextSeasonYear}`,
              html: `
                <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; border-radius: 16px; overflow: hidden;">
                  <div style="background: #0a0a0a; padding: 24px 24px 0; text-align: center;">
                    <img src="https://squitopestcontrol.com/logo.png" alt="Squito Pest Control" width="160" style="display: inline-block;" />
                  </div>
                  <div style="padding: 32px 24px 8px; text-align: center;">
                    <h1 style="color: white; margin: 0 0 8px; font-size: 26px;">Season complete.</h1>
                    <p style="color: rgba(255,255,255,0.7); margin: 0; font-size: 15px;">Your ${safeYardLabel} is protected through the close of the ${escapeHtml(endedSeasonYear)} season.</p>
                  </div>
                  <div style="padding: 16px 24px 32px; color: #e0e0e0;">
                    <p style="font-size: 16px; line-height: 1.6;">Hi <strong>${safeFirstName}</strong>,</p>
                    <p style="font-size: 15px; line-height: 1.6; color: #b0b0b0;">
                      New York State allows mosquito &amp; tick treatments between April and October, so your seasonal plan has paused as scheduled.
                      <strong style="color: white;">You won&apos;t be billed again</strong> unless you reactivate for next season.
                    </p>
                    <div style="background: #141414; border: 1px solid #2a2a2a; border-radius: 12px; padding: 20px; margin: 24px 0;">
                      <p style="margin: 0 0 6px; color: #22c55e; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Ready for April ${safeNextYear}?</p>
                      <p style="margin: 0; color: white; font-size: 16px; line-height: 1.55;">
                        Reserve your spot early and lock in the same pricing. We&apos;ll call you in late March to confirm your first visit.
                      </p>
                    </div>
                    <div style="text-align: center; margin: 28px 0 12px;">
                      <a href="${rebookHref}" style="display: inline-block; background: #22c55e; color: white; text-decoration: none; padding: 14px 32px; border-radius: 50px; font-weight: 700; font-size: 15px;">Reserve for April ${safeNextYear}</a>
                    </div>
                    <div style="text-align: center; margin: 0 0 8px;">
                      <a href="tel:6312031000" style="color: #22c55e; text-decoration: none; font-size: 14px; font-weight: 600;">Or call (631) 203-1000</a>
                    </div>
                  </div>
                  <div style="padding: 20px 24px; background: #0f0f0f; border-top: 1px solid #1a1a1a; text-align: center;">
                    <p style="color: #666; font-size: 12px; margin: 0;">Squito Pest Control — Smart. Safe. Pest Control.</p>
                    <p style="color: #444; font-size: 11px; margin: 4px 0 0;">Nassau &amp; Suffolk County, Long Island NY</p>
                  </div>
                </div>
              `,
            });
          } catch (emailErr) {
            console.error("Season-end retention email failed", emailErr);
          }
        }

        try {
          await resend.emails.send({
            from: "Squito Pest Control <service@squitopestcontrol.com>",
            to: ["service@getsquito.com"],
            subject: `Season ended: ${yardLabel} (${endedSeasonYear}) — ${booking.full_name ?? booking.email}`,
            html: `
              <div style="font-family: sans-serif; padding: 20px; color: #333;">
                <h2 style="color: #22c55e;">Mosquito &amp; Tick Season Ended</h2>
                <p>Subscription <code>${escapeHtml(subId)}</code> auto-canceled as scheduled for the ${escapeHtml(endedSeasonYear)} season.</p>
                <p><strong>Customer:</strong> ${escapeHtml(booking.full_name)} &lt;${escapeHtml(booking.email)}&gt;</p>
                <p><strong>Package:</strong> ${safeYardLabel}</p>
                <p>Customer received the retention email prompting them to reserve for April ${safeNextYear}.</p>
              </div>
            `,
          });
        } catch (internalErr) {
          console.error("Season-end internal notification failed", internalErr);
        }

        // Mark idempotency flag so retries don't re-send.
        try {
          await supabase
            .from("bookings")
            .update({ season_end_email_sent_at: new Date().toISOString() })
            .eq("id", booking.id);
        } catch (flagErr) {
          console.warn("Failed to set season_end_email_sent_at flag", flagErr);
        }
      } catch (handlerErr) {
        console.error("customer.subscription.deleted handler failed", handlerErr);
      }
    }
  }

  return NextResponse.json({ received: true });
}
