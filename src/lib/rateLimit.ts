/**
 * Simple in-memory rate limiter.
 * Works perfectly on Vercel serverless (each function instance is isolated).
 * If you ever move to a multi-instance setup, replace with Upstash Redis.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

/**
 * Returns true if the request should be allowed, false if rate-limited.
 * @param key       Unique identifier (e.g. IP address + route name)
 * @param limit     Max allowed requests per window
 * @param windowMs  Rolling window in milliseconds
 */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= limit) {
    return false;
  }

  entry.count += 1;
  return true;
}

/**
 * Extract the best available IP from a Next.js Request.
 * Handles Vercel's x-forwarded-for header automatically.
 */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "unknown";
}
