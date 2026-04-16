/**
 * validateEnv.ts
 *
 * Checks that all required environment variables are set before the app runs.
 * If any are missing in production, this throws a clear error instead of
 * silently failing in a confusing way later (e.g. payments broken, emails not sending).
 *
 * Import this at the top of any API route that depends on these keys,
 * or call it once in a server-side layout.
 */

const REQUIRED_ENV_VARS = [
  "OPENAI_API_KEY",
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
  "RESEND_API_KEY",
  "NEXT_PUBLIC_APP_URL",
  "GOOGLE_MAPS_API_KEY",
] as const;

function isInvalidEnvValue(value: string | undefined) {
  return !value || value.includes("placeholder") || value.includes("mock");
}

export function validateEnv(requiredKeys: readonly string[] = REQUIRED_ENV_VARS) {
  // Only enforce in production — local dev can use placeholder values
  if (process.env.NODE_ENV !== "production") return;

  const missing = requiredKeys.filter((key) => isInvalidEnvValue(process.env[key]));

  if (missing.length > 0) {
    throw new Error(
      `Missing or invalid environment variables:\n${missing.map((k) => `  - ${k}`).join("\n")}\n\nSet these in your Vercel project settings under Settings → Environment Variables.`
    );
  }
}
