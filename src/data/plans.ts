/**
 * plans.ts — Single source of truth for all Squito pricing.
 *
 * When you need to change a price, change it HERE.
 * The booking page, checkout API, and Plans display all read from this file.
 */

export const SUBSCRIPTION_PLANS = [
  {
    id: "essential-defense",
    name: "Essential Defense Plan",
    shortName: "Essential Defense",
    /** Monthly recurring charge in dollars */
    monthlyPrice: 49.99,
    /** Yearly recurring charge in dollars (per month, billed annually) */
    yearlyMonthlyPrice: 39.99,
    /** Total billed yearly in dollars */
    yearlyTotal: 479.88,
    /** One-time initial service fee in dollars */
    initialFee: 199.99,
  },
  {
    id: "premium-shield",
    name: "Premium Shield Plan",
    shortName: "Premium Shield",
    monthlyPrice: 89.99,
    yearlyMonthlyPrice: 71.99,
    yearlyTotal: 863.88,
    initialFee: 299.99,
  },
  {
    id: "ultimate-fortress",
    name: "Ultimate Fortress Plan",
    shortName: "Ultimate Fortress",
    monthlyPrice: 129.99,
    yearlyMonthlyPrice: 103.99,
    yearlyTotal: 1247.88,
    initialFee: 399.99,
  },
] as const;

export const ONE_TIME_SERVICES = [
  {
    id: "termite-inspection",
    name: "Termite Inspection",
    price: 149,
  },
  {
    id: "wasp-removal",
    name: "Wasp Nest Removal",
    price: 249,
  },
  {
    id: "mosquito-event-spray",
    name: "Mosquito Event Spray",
    price: 199,
  },
] as const;

export const ONE_TIME_IDS = ONE_TIME_SERVICES.map((s) => s.id);

/** NY State + Nassau County combined sales tax rate */
export const TAX_RATE = 0.08625;

// ─── Helper functions ──────────────────────────────────────────────────────────

type PlanId = (typeof SUBSCRIPTION_PLANS)[number]["id"];
type OneTimeId = (typeof ONE_TIME_SERVICES)[number]["id"];

/** Returns a subscription plan by ID, or undefined if not found */
export function getSubscriptionPlan(id: string) {
  return SUBSCRIPTION_PLANS.find((p) => p.id === id);
}

/** Returns a one-time service by ID, or undefined if not found */
export function getOneTimeService(id: string) {
  return ONE_TIME_SERVICES.find((s) => s.id === id);
}

/** Returns true if the given planId is a one-time service */
export function isOneTimeService(id: string): id is OneTimeId {
  return ONE_TIME_IDS.includes(id as OneTimeId);
}

/** Converts a dollar amount to Stripe cents */
export function toCents(dollars: number): number {
  return Math.round(dollars * 100);
}
