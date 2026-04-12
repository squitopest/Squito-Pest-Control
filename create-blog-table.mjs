import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function createTable() {
  console.log("🔧 Creating blog_posts table via REST API...\n");
  
  const sql = `
    CREATE TABLE IF NOT EXISTS blog_posts (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      seo_description TEXT NOT NULL,
      date TEXT NOT NULL,
      category TEXT NOT NULL,
      read_time TEXT NOT NULL,
      image TEXT NOT NULL DEFAULT '/blog-mosquito.png',
      content TEXT NOT NULL,
      published BOOLEAN DEFAULT true,
      created_at TIMESTAMPTZ DEFAULT now()
    );
    CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
    CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published, created_at DESC);
    ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'blog_posts' AND policyname = 'Allow public read access') THEN
        CREATE POLICY "Allow public read access" ON blog_posts FOR SELECT USING (published = true);
      END IF;
    END $$;
  `;

  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
    },
    body: JSON.stringify({})
  });

  // Use the SQL endpoint directly  
  const sqlRes = await fetch(`${SUPABASE_URL}/pg`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
    },
    body: JSON.stringify({ query: sql })
  });

  if (!sqlRes.ok) {
    // Try the management API
    console.log("Trying alternative SQL execution...");
    
    // Use the query endpoint
    const queryRes = await fetch(`${SUPABASE_URL}/rest/v1/`, {
      headers: {
        'apikey': SERVICE_KEY,
        'Authorization': `Bearer ${SERVICE_KEY}`,
      }
    });
    console.log("REST API status:", queryRes.status);
  }

  console.log("SQL execution attempted. Checking if table exists...");

  // Test if table exists by trying to select from it
  const supabase = createClient(SUPABASE_URL, SERVICE_KEY);
  const { data, error } = await supabase.from('blog_posts').select('count').limit(1);
  
  if (error) {
    console.log(`\n❌ Table doesn't exist yet. Error: ${error.message}`);
    console.log("\n📋 You need to run this SQL in Supabase Dashboard → SQL Editor:\n");
    console.log(`CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  seo_description TEXT NOT NULL,
  date TEXT NOT NULL,
  category TEXT NOT NULL,
  read_time TEXT NOT NULL,
  image TEXT NOT NULL DEFAULT '/blog-mosquito.png',
  content TEXT NOT NULL,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published, created_at DESC);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON blog_posts
  FOR SELECT USING (published = true);`);
  } else {
    console.log("✅ Table already exists!");
  }
}

createTable();
