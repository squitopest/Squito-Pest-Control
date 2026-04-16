import { NextResponse } from "next/server";
import { Resend } from "resend";
import { rateLimit, getClientIp } from "@/lib/rateLimit";
import { validateEnv } from "@/lib/validateEnv";

// Escapes user-provided text before inserting into HTML email templates.
// Prevents HTML injection (e.g. a user typing <script> in the name field).
function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

// Fallback sentinel prevents a build-time crash during static analysis.
// In production, RESEND_API_KEY must be set on Vercel or emails will fail.
const resend = new Resend(process.env.RESEND_API_KEY || "re_build_placeholder");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeInput(value: unknown, maxLength: number) {
  return String(value ?? "").trim().slice(0, maxLength);
}

export async function POST(req: Request) {
  // Rate limit: 5 contact form submissions per IP per minute
  const ip = getClientIp(req);
  if (!rateLimit(`contact:${ip}`, 5, 60_000)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment before trying again." },
      { status: 429 }
    );
  }

  try {
    validateEnv(["RESEND_API_KEY"]);
    const body = await req.json();
    const firstName = normalizeInput(body.firstName, 80);
    const lastName = normalizeInput(body.lastName, 80);
    const email = normalizeInput(body.email, 160);
    const phone = normalizeInput(body.phone, 30);
    const street = normalizeInput(body.street, 160);
    const city = normalizeInput(body.city, 80);
    const zip = normalizeInput(body.zip, 10);
    const service = normalizeInput(body.service, 120);
    const message = normalizeInput(body.message, 2000);

    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const digitsOnlyPhone = phone.replace(/\D/g, "");
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    if (digitsOnlyPhone.length < 10 || digitsOnlyPhone.length > 15) {
      return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 400 });
    }

    if (zip && !/^\d{5}$/.test(zip)) {
      return NextResponse.json({ error: "Please enter a valid 5-digit ZIP code." }, { status: 400 });
    }

    const recipientEmail = "service@squitopestcontrol.com";

    const safeFirstName = escapeHtml(firstName);
    const safeLastName = escapeHtml(lastName);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeStreet = escapeHtml(street);
    const safeCity = escapeHtml(city);
    const safeZip = escapeHtml(zip);
    const safeService = escapeHtml(service);
    const safeMessage = escapeHtml(message);

    const { data, error } = await resend.emails.send({
      from: "Squito Pest Control <service@squitopestcontrol.com>",
      to: [recipientEmail],
      subject: `New Lead: ${service || "Pest Control Inquiry"} - ${zip}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #22c55e;">New Squito Pest Control Website Lead!</h2>
          <p><strong>Name:</strong> ${safeFirstName} ${safeLastName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Phone:</strong> ${safePhone}</p>
          <p><strong>Service Address:</strong> ${safeStreet}, ${safeCity} ${safeZip}</p>
          <p><strong>Requested Service:</strong> ${safeService || "Not Specified"}</p>
          <br />
          <p><strong>Message / Pest Details:</strong></p>
          <p style="padding: 15px; background: #f5f5f5; border-left: 4px solid #22c55e; border-radius: 4px;">
            ${safeMessage || "No additional message provided."}
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API Error:", error.message);
      return NextResponse.json(
        { error: "Failed to send message. Please try again or call us directly." },
        { status: 502 }
      );
    }

    if (process.env.ZAPIER_WEBHOOK_URL) {
      try {
        await fetch(process.env.ZAPIER_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "lead",
            firstName,
            lastName,
            email,
            phone,
            street,
            city,
            zip,
            service: service || "Not Specified",
            message: message || "No additional message provided.",
            timestamp: new Date().toISOString()
          })
        });
      } catch (zapierError) {
        console.error("Zapier Webhook Error:", zapierError);
      }
    }

    // Send Customer Confirmation Email
    try {
      await resend.emails.send({
        from: "Squito Pest Control <noreply@squitopestcontrol.com>",
        to: [email],
        subject: `We Received Your Request, ${firstName}!`,
        html: `
          <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; border-radius: 16px; overflow: hidden;">
            <!-- Logo Header -->
            <div style="background: #0a0a0a; padding: 24px 24px 0; text-align: center;">
              <img src="https://squitopestcontrol.com/logo.png" alt="Squito Pest Control" width="160" style="display: inline-block;" />
            </div>
            <!-- Hero Banner -->
            <div style="position: relative; text-align: center;">
              <img src="https://squitopestcontrol.com/backyard-bbq.png" alt="Protected Backyard" width="600" style="width: 100%; max-height: 200px; object-fit: cover; display: block; opacity: 0.5;" />
              <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(180deg, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.9) 100%);"></div>
              <div style="position: absolute; bottom: 20px; left: 0; right: 0; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 26px;">📋 Request Received!</h1>
                <p style="color: rgba(255,255,255,0.7); margin: 6px 0 0; font-size: 14px;">We'll be in touch shortly</p>
              </div>
            </div>
            <!-- Body -->
            <div style="padding: 32px 24px; color: #e0e0e0;">
              <p style="font-size: 16px; line-height: 1.6;">Hi <strong>${safeFirstName}</strong>,</p>
              <p style="font-size: 15px; line-height: 1.6; color: #b0b0b0;">Thank you for reaching out to Squito Pest Control! We've received your message and a member of our team will get back to you as soon as possible.</p>

              <div style="background: #141414; border: 1px solid #2a2a2a; border-radius: 12px; padding: 20px; margin: 24px 0;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 8px 0; color: #22c55e; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Your Request</td></tr>
                  <tr><td style="padding: 0 0 16px; color: white; font-size: 16px;">${safeService || 'General Pest Control Inquiry'}</td></tr>
                  <tr><td style="padding: 8px 0; color: #22c55e; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Service Address</td></tr>
                  <tr><td style="padding: 0 0 16px; color: white; font-size: 16px;">${safeStreet || 'Not provided'}${safeCity ? ', ' + safeCity : ''}${safeZip ? ' ' + safeZip : ''}</td></tr>
                  <tr><td style="padding: 8px 0; color: #22c55e; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Contact Info</td></tr>
                  <tr><td style="padding: 0 0 8px; color: white; font-size: 16px;">${safePhone} &bull; ${safeEmail}</td></tr>
                </table>
              </div>

              <p style="font-size: 15px; line-height: 1.6; color: #b0b0b0;">Need immediate assistance? We offer same-day service for calls placed before 2 PM.</p>
              
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

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
