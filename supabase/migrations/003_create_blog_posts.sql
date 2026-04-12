-- Create blog_posts table for dynamic blog content
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

-- Create index on slug for fast lookups
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);

-- Create index on published + created_at for listing
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published, created_at DESC);

-- Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published posts
CREATE POLICY "Allow public read access" ON blog_posts
  FOR SELECT USING (published = true);

-- Allow service role full access for CRUD
CREATE POLICY "Allow service role full access" ON blog_posts
  FOR ALL USING (true)
  WITH CHECK (true);
