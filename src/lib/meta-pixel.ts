/**
 * Meta Pixel helper – a thin wrapper around `window.fbq` for type-safe,
 * guarded event calls.  Import wherever you need to fire custom events
 * (Purchase, Lead, etc.).
 *
 * Usage:
 *   import { trackMetaEvent } from "@/lib/meta-pixel";
 *   trackMetaEvent("Purchase", { value: 199.00, currency: "USD" });
 */

// Extend Window so TypeScript knows about fbq.
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Fire a Meta Pixel standard or custom event.
 * Safely no-ops if the pixel script hasn't loaded yet or is blocked.
 */
export function trackMetaEvent(
  eventName: string,
  params?: Record<string, unknown>,
) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    if (params) {
      window.fbq("track", eventName, params);
    } else {
      window.fbq("track", eventName);
    }
  }
}
