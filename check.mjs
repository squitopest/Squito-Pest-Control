import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function test() {
  console.log("Fetching latest 3 bookings...");
  const { data, error } = await supabase.from('bookings').select('*').order('created_at', { ascending: false }).limit(3);
  console.log("Result:", JSON.stringify({ data, error }, null, 2));
}

test();
