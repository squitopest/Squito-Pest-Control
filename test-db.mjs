import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function test() {
  console.log("Checking bookings table...");
  const { data, error } = await supabase.from('bookings').select('id, full_name, plan_id').limit(5);
  console.log("Result:", JSON.stringify({ data, error }, null, 2));

  // Also manually test the checkout insert to see if it fails
  const mockInsert = {
    property_type: "Residential",
    zip_code: "11501",
    service_date: "2026-05-01",
    service_time: "Morning",
    street: "123 Test St",
    plan_id: "essential-defense",
    full_name: "Test User",
    email: "test@example.com",
    phone: "555-0000"
  };
  
  console.log("Attempting webhook update...");
  const updateRes = await supabase.from('bookings').update({ stripe_payment_status: "paid" }).eq("id", insertRes.data.id).select().single();
  console.log("Update Result:", JSON.stringify(updateRes, null, 2));
}

test();
