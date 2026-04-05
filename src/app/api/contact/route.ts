import { NextResponse } from "next/server";
import { Resend } from "resend";
import { rateLimit, getClientIp } from "@/lib/rateLimit";

// Fallback sentinel prevents a build-time crash during static analysis.
// In production, RESEND_API_KEY must be set on Vercel or emails will fail.
const resend = new Resend(process.env.RESEND_API_KEY || "re_build_placeholder");


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
    const body = await req.json();
    const { firstName, lastName, email, phone, street, zip, service, message } = body;

    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const recipientEmail = "service@getsquito.com";

    const { data, error } = await resend.emails.send({
      from: "Squito Website <onboarding@resend.dev>",
      to: [recipientEmail],
      subject: `New Lead: ${service || "Pest Control Inquiry"} - ${zip}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #22c55e;">New Squito AI Website Lead!</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Street Address:</strong> ${street}</p>
          <p><strong>Zip Code:</strong> ${zip}</p>
          <p><strong>Requested Service:</strong> ${service || "Not Specified"}</p>
          <br />
          <p><strong>Message / Pest Details:</strong></p>
          <p style="padding: 15px; background: #f5f5f5; border-left: 4px solid #22c55e; border-radius: 4px;">
            ${message || "No additional message provided."}
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
