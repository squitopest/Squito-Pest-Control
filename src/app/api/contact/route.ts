import { NextResponse } from "next/server";
import { Resend } from "resend";

// Ensure the code doesn't break if the API key isn't present yet during local build
const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key_123");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, zip, service, message } = body;

    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // You can swap the 'to' email address here once in production!
    const recipientEmail = "service@getsquito.com";

    const { data, error } = await resend.emails.send({
      from: "Squito Website <onboarding@resend.dev>", // Resend's default free testing domain
      to: [recipientEmail],
      subject: `New Lead: ${service || "Pest Control Inquiry"} - ${zip}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #22c55e;">New Squito AI Website Lead!</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
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
      return NextResponse.json({ error: error.message }, { status: 500 });
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
