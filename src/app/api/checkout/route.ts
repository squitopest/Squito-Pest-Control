import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { propertyType, zipCode, date, time, street, planId } = body;

    if (!zipCode || !date || !time || !street) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const isMock = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.includes("mock") || !process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

    // 1. Create Supabase Row
    const supabase = createServiceClient();
    let bookingId = "mock-booking-id-" + Math.random().toString(36).slice(2);
    
    if (!isMock) {
        try {
          const { data, error } = await supabase
            .from("bookings")
            .insert([{ 
              property_type: propertyType || "Residential", 
              zip_code: zipCode, 
              service_date: date,
              service_time: time,
              street: street,
              plan_id: planId || "basic-shield"
            }])
            .select()
            .single();
            
          if (error) {
              console.error("Supabase Warning - Booking table may not exist yet, bypassed for Stripe checkout:", error);
          } else if (data) {
              bookingId = data.id;
          }
        } catch (e) {
          console.error("Supabase Client Error:", e);
        }
    }

    if (isMock) {
        return NextResponse.json({
            success: true,
            checkoutUrl: "/book?session_id=mock_success", 
            message: "MOCK MODE: Add real Stripe & Supabase keys to .env.local"
        });
    }

    // Determine Title from ID
    const planName = planId === "home-protection" ? "Home Protection Plan" 
                   : planId === "total-shield" ? "Total Shield Plan" 
                   : "Basic Shield Plan";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Squito AI - ${planName}`,
              description: `Appointment: ${date} at ${time} | Address: ${street}, ${zipCode}`,
              images: ["https://images.unsplash.com/photo-1616421379377-160fa8ccdb5c?auto=format&fit=crop&q=80&w=200"],
            },
            unit_amount: 100, // $1.00 Test Charge
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
    if (!isMock && session.id && !bookingId.includes("mock-booking-id")) {
       try {
         await supabase
           .from("bookings")
           .update({ stripe_session_id: session.id })
           .eq("id", bookingId);
       } catch (e) {
         console.warn("Could not update Supabase with session ID, bypassing.");
       }
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
