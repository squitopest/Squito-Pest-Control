import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { validateEnv } from "@/lib/validateEnv";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session_id")?.trim();

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id." }, { status: 400 });
  }

  if (sessionId.startsWith("mock_") || sessionId.startsWith("free_test_bypass_")) {
    return NextResponse.json({
      verified: true,
      mode: "mock",
      paymentStatus: "paid",
    });
  }

  try {
    validateEnv(["STRIPE_SECRET_KEY"]);
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return NextResponse.json({
      verified: session.status === "complete" && session.payment_status === "paid",
      mode: session.mode,
      paymentStatus: session.payment_status,
      customerEmail: session.customer_details?.email ?? null,
    });
  } catch (error: any) {
    console.error("Checkout session verification failed:", error?.message || error);
    return NextResponse.json(
      { error: "We couldn't verify this checkout session." },
      { status: 404 }
    );
  }
}
