-- Migration: 007_blog_images_bucket.sql
--
-- Creates the `blog-images` Supabase Storage bucket that
-- src/app/api/blog/generate/route.ts writes to when generating AI hero images
-- for blog posts, and ensures the public-read / service-role-write policies
-- the app relies on are in place.
--
-- Previously this bucket was created manually via the Supabase dashboard,
-- which meant any fresh environment (local dev, staging, a new project) would
-- hit `Bucket not found` when generating blog images. This migration fixes
-- that drift and makes the setup reproducible.
--
-- Idempotent: safe to run multiple times.

BEGIN;

-- 1. Create the bucket if it doesn't already exist.
--    public = true so the generated image URLs work without signed tokens.
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO UPDATE SET public = EXCLUDED.public;

-- 2. Policies on storage.objects.
--    We scope each policy to this bucket via `bucket_id = 'blog-images'` so we
--    don't accidentally open up other buckets.

-- Public read of blog images (the site renders these on <img> tags).
DROP POLICY IF EXISTS "Public read blog images" ON storage.objects;
CREATE POLICY "Public read blog images"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'blog-images');

-- Only the service role (used by our server-side API route) can write /
-- overwrite / delete. Anon and authenticated users cannot upload.
DROP POLICY IF EXISTS "Service role write blog images" ON storage.objects;
CREATE POLICY "Service role write blog images"
  ON storage.objects
  FOR ALL
  USING (bucket_id = 'blog-images' AND auth.role() = 'service_role')
  WITH CHECK (bucket_id = 'blog-images' AND auth.role() = 'service_role');

COMMIT;
