import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function checkTables() {
  const sql = `
    SELECT tablename 
    FROM pg_catalog.pg_tables 
    WHERE schemaname = 'public';
  `;

  const sqlRes = await fetch(`${SUPABASE_URL}/pg`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
    },
    body: JSON.stringify({ query: sql })
  });

  if (sqlRes.ok) {
    const data = await sqlRes.json();
    console.log("Tables in public schema:", data);
  } else {
    console.log("Failed to query pg endpoint");
  }
}

checkTables();
