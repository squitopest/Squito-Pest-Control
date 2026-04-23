/**
 * mosquitoTickPackages.ts — Source of truth for standalone mosquito & tick
 * subscription packages.
 *
 * These packages exist alongside the Ultimate Fortress plan (which already
 * bundles mosquito & tick coverage with full pest protection). Standalone
 * packages here are for customers who only want seasonal outdoor coverage.
 *
 * Billing rule: NY State restricts outdoor mosquito & tick treatments to
 * April through October. Customers are billed monthly during those 7 active
 * months only. No initial fees.
 */

export type MosquitoTickYardSizeId = "small" | "medium" | "large" | "xl";

export type MosquitoTickPackage = {
  id: MosquitoTickYardSizeId;
  label: string;
  shortLabel: string;
  sqftRangeLabel: string;
  monthlyPrice: number | null;
  quoteOnly: boolean;
};

export const MOSQUITO_TICK_PACKAGES: MosquitoTickPackage[] = [
  {
    id: "small",
    label: "Up to 1/4 Acre",
    shortLabel: "Starter Yard",
    sqftRangeLabel: "Typical starter lots",
    monthlyPrice: 89.99,
    quoteOnly: false,
  },
  {
    id: "medium",
    label: "Up to 1/2 Acre",
    shortLabel: "Standard Yard",
    sqftRangeLabel: "Common suburban lots",
    monthlyPrice: 109.99,
    quoteOnly: false,
  },
  {
    id: "large",
    label: "Up to 1 Acre",
    shortLabel: "Expanded Yard",
    sqftRangeLabel: "Larger residential properties",
    monthlyPrice: 129.99,
    quoteOnly: false,
  },
  {
    id: "xl",
    label: "Larger than 1 Acre",
    shortLabel: "Custom",
    sqftRangeLabel: "Estates and multi-acre properties",
    monthlyPrice: null,
    quoteOnly: true,
  },
];

/** Active treatment months per NY State: April through October = 7 months */
export const MOSQUITO_TICK_ACTIVE_MONTHS = 7;

export const DEFAULT_MOSQUITO_TICK_SIZE: MosquitoTickYardSizeId = "small";

export function isMosquitoTickYardSize(value: string): value is MosquitoTickYardSizeId {
  return MOSQUITO_TICK_PACKAGES.some((p) => p.id === value);
}

export function resolveMosquitoTickYardSize(
  value: string | null | undefined
): MosquitoTickYardSizeId {
  return value && isMosquitoTickYardSize(value) ? value : DEFAULT_MOSQUITO_TICK_SIZE;
}

export function getMosquitoTickPackage(id: string): MosquitoTickPackage | undefined {
  return MOSQUITO_TICK_PACKAGES.find((p) => p.id === id);
}

export function calculateMosquitoTickSeasonTotal(pkg: MosquitoTickPackage): number | null {
  if (!pkg.monthlyPrice) return null;
  return Math.round(pkg.monthlyPrice * MOSQUITO_TICK_ACTIVE_MONTHS * 100) / 100;
}

export function formatMosquitoTickPackageName(pkg: MosquitoTickPackage): string {
  return `Mosquito & Tick — ${pkg.label}`;
}

export function buildMosquitoTickBookHref(sizeId: string, promo?: string | null): string {
  const pkg = getMosquitoTickPackage(sizeId);
  if (!pkg) return "/services/mosquito-tick";
  if (pkg.quoteOnly) return buildMosquitoTickQuoteHref(sizeId, "mosquito-tick-selector");

  const params = new URLSearchParams();
  params.set("serviceType", "mosquito-tick");
  params.set("size", pkg.id);
  params.set("billing", "monthly");
  if (promo) params.set("promo", promo);

  return `/book?${params.toString()}`;
}

export function buildMosquitoTickQuoteHref(
  sizeId: string,
  source?: string | null
): string {
  const pkg = getMosquitoTickPackage(sizeId);
  const params = new URLSearchParams();

  params.set("type", "residential");
  params.set("service", "Mosquito & Tick Package — Reservation");

  const details = [
    pkg ? `Yard size: ${pkg.label}.` : null,
    pkg?.monthlyPrice
      ? `Monthly price: $${pkg.monthlyPrice.toFixed(2)}/mo during active months (April–October).`
      : "Custom yard size — tailored pricing needed.",
    "Interested in season-long mosquito & tick protection.",
    source ? `Website source: ${source}.` : null,
  ].filter(Boolean);

  params.set("message", details.join(" "));

  return `/contact?${params.toString()}`;
}

export function buildMosquitoTickHelpHref(source?: string | null): string {
  const params = new URLSearchParams();
  params.set("type", "residential");
  params.set("service", "Mosquito & Tick Package — Help Choosing");

  const details = [
    "Interested in season-long mosquito & tick protection.",
    "Unsure about yard size — would like help picking the right package.",
    source ? `Website source: ${source}.` : null,
  ].filter(Boolean);

  params.set("message", details.join(" "));

  return `/contact?${params.toString()}`;
}

// ─── Active-season billing plan helpers ────────────────────────────────────────
//
// NY State restricts outdoor mosquito/tick treatments to April 1 through October
// 31. Our subscriptions auto-cancel at end-of-season via Stripe `cancel_at`.
//
// A signup can be in one of four modes:
//  - "in-season-full"       : signup April 1–Aug 31, 3+ charges remaining
//  - "in-season-partial"    : signup Sep 1–Oct 19, 1–2 charges remaining
//  - "end-of-season-nudge"  : signup Oct 20–Oct 31, < 2 weeks left in season
//  - "off-season-reservation": signup Nov 1–Mar 31, service begins April 1
//
// End-of-season customers see dual CTAs on the booking page: they can book
// whatever is left of the season, OR reserve for April 1. Off-season customers
// see a reservation-only UI (no charge until April).

export type MosquitoTickBillingMode =
  | "in-season-full"
  | "in-season-partial"
  | "end-of-season-nudge"
  | "off-season-reservation";

export type MosquitoTickBillingPlan = {
  mode: MosquitoTickBillingMode;
  monthsRemaining: number; // 0-7, counting current month if before Oct 31
  firstChargeDate: Date; // when Stripe first charges (today for in-season; Apr 1 for off-season)
  firstTreatmentDate: Date; // approximate first treatment (~7 days after firstChargeDate)
  subscriptionEndDate: Date; // Stripe cancel_at timestamp (Oct 31 of relevant year)
  seasonYear: number; // the year this subscription's active season applies to
  monthlyPrice: number; // from the package
  seasonTotalBeforeTax: number; // monthlyPrice × monthsRemaining
};

const SEASON_START_MONTH = 4; // April
const SEASON_END_MONTH = 10; // October
const SEASON_END_DAY = 31;
const END_OF_SEASON_NUDGE_START_DAY = 20; // Oct 20+ shows dual CTA

export function isMosquitoTickActiveSeason(date: Date = new Date()): boolean {
  const month = date.getMonth() + 1;
  return month >= SEASON_START_MONTH && month <= SEASON_END_MONTH;
}

function getSeasonEndDate(year: number): Date {
  // End-of-day UTC on Oct 31 so Stripe cancels after the Oct billing cycle clears.
  return new Date(Date.UTC(year, SEASON_END_MONTH - 1, SEASON_END_DAY, 23, 59, 59));
}

function getSeasonStartDate(year: number): Date {
  // Noon UTC on April 1 to avoid any DST edge cases.
  return new Date(Date.UTC(year, SEASON_START_MONTH - 1, 1, 12, 0, 0));
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

export function getMosquitoTickBillingPlan(
  pkg: MosquitoTickPackage,
  now: Date = new Date()
): MosquitoTickBillingPlan | null {
  if (!pkg.monthlyPrice) return null;

  const month = now.getMonth() + 1;
  const day = now.getDate();
  const year = now.getFullYear();

  // Off-season: Nov 1 – Mar 31. Reservation for next April.
  if (month < SEASON_START_MONTH || month > SEASON_END_MONTH) {
    const reservationYear = month <= 3 ? year : year + 1;
    const firstChargeDate = getSeasonStartDate(reservationYear);
    return {
      mode: "off-season-reservation",
      monthsRemaining: 7,
      firstChargeDate,
      firstTreatmentDate: addDays(firstChargeDate, 7),
      subscriptionEndDate: getSeasonEndDate(reservationYear),
      seasonYear: reservationYear,
      monthlyPrice: pkg.monthlyPrice,
      seasonTotalBeforeTax: Math.round(pkg.monthlyPrice * 7 * 100) / 100,
    };
  }

  // In-season: Apr 1 – Oct 31. Count remaining monthly charges.
  // Each charge corresponds to one treatment month. Signing up in July
  // (month 7) leaves 4 charges: July, August, September, October.
  const monthsRemaining = SEASON_END_MONTH - month + 1;
  const isEndOfSeason =
    month === SEASON_END_MONTH && day >= END_OF_SEASON_NUDGE_START_DAY;

  const firstChargeDate = new Date(now);
  const firstTreatmentDate = addDays(now, 7);
  const subscriptionEndDate = getSeasonEndDate(year);

  let mode: MosquitoTickBillingMode;
  if (isEndOfSeason) {
    mode = "end-of-season-nudge";
  } else if (monthsRemaining >= 3) {
    mode = "in-season-full";
  } else {
    mode = "in-season-partial";
  }

  return {
    mode,
    monthsRemaining,
    firstChargeDate,
    firstTreatmentDate,
    subscriptionEndDate,
    seasonYear: year,
    monthlyPrice: pkg.monthlyPrice,
    seasonTotalBeforeTax: Math.round(pkg.monthlyPrice * monthsRemaining * 100) / 100,
  };
}

/**
 * Returns a billing plan forced into off-season reservation mode, regardless
 * of the current date. Used when a customer in the "end-of-season-nudge"
 * window explicitly chooses to reserve for April instead of booking what's
 * left of the current season.
 */
export function getMosquitoTickReservationPlan(
  pkg: MosquitoTickPackage,
  now: Date = new Date()
): MosquitoTickBillingPlan | null {
  if (!pkg.monthlyPrice) return null;

  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const reservationYear = month >= SEASON_START_MONTH ? year + 1 : year;
  const firstChargeDate = getSeasonStartDate(reservationYear);

  return {
    mode: "off-season-reservation",
    monthsRemaining: 7,
    firstChargeDate,
    firstTreatmentDate: addDays(firstChargeDate, 7),
    subscriptionEndDate: getSeasonEndDate(reservationYear),
    seasonYear: reservationYear,
    monthlyPrice: pkg.monthlyPrice,
    seasonTotalBeforeTax: Math.round(pkg.monthlyPrice * 7 * 100) / 100,
  };
}

export function formatMosquitoTickBillingSummary(plan: MosquitoTickBillingPlan): string {
  const parts: string[] = [];
  switch (plan.mode) {
    case "in-season-full":
    case "in-season-partial":
      parts.push(
        `${plan.monthsRemaining} monthly charge${plan.monthsRemaining === 1 ? "" : "s"} remaining this season`
      );
      break;
    case "end-of-season-nudge":
      parts.push(
        plan.monthsRemaining === 1
          ? "1 charge remaining this season"
          : `${plan.monthsRemaining} charges remaining this season`
      );
      break;
    case "off-season-reservation":
      parts.push(`Reservation for the ${plan.seasonYear} season (7 monthly charges)`);
      break;
  }
  return parts.join(" • ");
}

