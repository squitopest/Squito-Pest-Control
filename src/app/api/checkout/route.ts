import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { propertyType, zipCode, date, time, street, planId, fullName, email, phone } = body;

    if (!zipCode || !date || !time || !street || !fullName || !email || !phone) {
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
              plan_id: planId || "essential-defense",
              full_name: fullName,
              email: email,
              phone: phone
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
    const planName = planId === "premium-shield" ? "Premium Shield Plan" 
                   : planId === "ultimate-fortress" ? "Ultimate Fortress Plan" 
                   : "Essential Defense Plan";

    // --- FREE TEST BYPASS ---
    // If we are testing the UI for free, bypass Stripe completely!
    const isTestDrive = true; // Set this to 'false' later when you revert prices to $100+
    
    let redirectUrl = "";
    
    if (isTestDrive) {
        // Teleport straight to the success page as if they paid!
        redirectUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/success?session_id=free_test_bypass_${bookingId}`;
    } else {
        // Regular Stripe Flow
        const session = await stripe.checkout.sessions.create({
          customer_email: email,
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
          success_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/book?cancel=true`,
          metadata: {
            bookingId: bookingId, // Link Stripe to Supabase
          },
        });
        redirectUrl = session.url || "/book";
        
        // Update Supabase with Session ID securely if real Stripe session
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
    }

    return NextResponse.json({
      success: true,
      checkoutUrl: redirectUrl,
    });
  } catch (error: any) {
    console.error("Checkout POST Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
