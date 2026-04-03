import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { propertyType, zipCode, date } = body;

    if (!propertyType || !zipCode) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const isMock = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.includes("mock") || !process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

    // 1. Create Supabase Row
    const supabase = createServiceClient();
    
    // We insert a row and get the ID back. 
    // If Supabase keys are mock, this will fail unless we wrap in try/catch or bypass.
    let bookingId = "mock-booking-id-" + Math.random().toString(36).slice(2);
    
    if (!isMock) {
        const { data, error } = await supabase
          .from("bookings")
          .insert([{ property_type: propertyType, zip_code: zipCode, service_date: date }])
          .select()
          .single();
          
        if (error) {
            console.error("Supabase Error:", error);
            throw new Error("Failed to create booking record.");
        }
        bookingId = data.id;
    }

    // 2. Generate Stripe Session
    // In Phase 2 requested logic, we charge a $0 authorization, or a flat fee. 
    // Let's do a $49 flat inspection fee as a real-world example.
    
    if (isMock) {
        return NextResponse.json({
            success: true,
            checkoutUrl: "/book?simulateSuccess=true", 
            message: "MOCK MODE: Add real Stripe & Supabase keys to .env.local"
        });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Squito AI Basic Inspection & Service Call",
              description: `Property: ${propertyType} | Date: ${date} | Zip: ${zipCode}`,
              images: ["https://images.unsplash.com/photo-1616421379377-160fa8ccdb5c?auto=format&fit=crop&q=80&w=200"],
            },
            unit_amount: 4900, // $49.00
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/book?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/book?cancel=true`,
      metadata: {
        bookingId: bookingId, // Link Stripe to Supabase
      },
    });

    // 3. Update Supabase with Session ID
    if (!isMock && session.id) {
       await supabase
         .from("bookings")
         .update({ stripe_session_id: session.id })
         .eq("id", bookingId);
    }

    return NextResponse.json({
      success: true,
      checkoutUrl: session.url,
    });
  } catch (error: any) {
    console.error("Checkout POST Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
