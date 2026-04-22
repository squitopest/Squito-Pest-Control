#!/usr/bin/env node
/**
 * One-off bootstrap for the `blog-images` Supabase Storage bucket.
 *
 * Migration 007 (supabase/migrations/007_blog_images_bucket.sql) is the
 * source of truth for this bucket, but running it requires the Supabase
 * CLI linked to the project (or dashboard SQL access). When neither is
 * available, this script uses the JS client + service role key to create
 * the bucket directly, which is the only thing /api/blog/generate
 * functionally needs to stop throwing "Bucket not found".
 *
 * The bucket is created with public=true so generated blog hero images
 * are served from the unsigned public URL our route already returns.
 * Service role bypasses RLS, so the policies from the SQL migration
 * aren't required for the current app to work — they are still worth
 * running server-side the next time you have SQL access, because they
 * lock down other roles explicitly.
 *
 * Usage:
 *   node scripts/apply-blog-images-bucket.mjs
 */
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

function loadEnvFile(path) {
  try {
    const raw = readFileSync(path, "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (!match) continue;
      const [, key, rawValue] = match;
      if (process.env[key]) continue;
      let value = rawValue.trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    }
  } catch (err) {
    if (err.code !== "ENOENT") throw err;
  }
}

loadEnvFile(".env.local");
loadEnvFile(".env");

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment.",
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const BUCKET_ID = "blog-images";

const { data: existingBuckets, error: listError } =
  await supabase.storage.listBuckets();

if (listError) {
  console.error("Failed to list buckets:", listError.message);
  process.exit(1);
}

const existing = existingBuckets?.find((b) => b.id === BUCKET_ID);

if (!existing) {
  const { error: createError } = await supabase.storage.createBucket(BUCKET_ID, {
    public: true,
  });
  if (createError) {
    console.error("Failed to create bucket:", createError.message);
    process.exit(1);
  }
  console.log(`Created bucket "${BUCKET_ID}" (public).`);
} else if (!existing.public) {
  const { error: updateError } = await supabase.storage.updateBucket(BUCKET_ID, {
    public: true,
  });
  if (updateError) {
    console.error("Failed to mark bucket public:", updateError.message);
    process.exit(1);
  }
  console.log(`Updated bucket "${BUCKET_ID}" → public.`);
} else {
  console.log(`Bucket "${BUCKET_ID}" already exists and is public. Nothing to do.`);
}
