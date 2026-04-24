/**
 * plans.ts — Single source of truth for all Squito pricing.
 *
 * When you need to change a price, change it HERE.
 * The booking page, checkout API, and Plans display all read from this file.
 */

export const DEFAULT_PROPERTY_SIZE = "small" as const;
export const QUOTE_ONLY_PROPERTY_SIZE = "xl" as const;

export type PropertySize = "small" | "medium" | "large" | "xl";
export type SubscriptionBilling = "monthly" | "yearly";
export type BillingCycle = SubscriptionBilling | "onetime";

type PropertySizeConfig = {
  id: PropertySize;
  label: string;
  shortLabel: string;
  sqftRangeLabel: string;
  quoteOnly: boolean;
};

type PlanTier = {
  monthlyPrice: number;
  initialFee: number;
};

type SubscriptionPlan = {
  id: string;
  name: string;
  shortName: string;
  sizeTiers: Record<Exclude<PropertySize, "xl">, PlanTier>;
};

export const PROPERTY_SIZE_OPTIONS: PropertySizeConfig[] = [
  {
    id: "small",
    label: "Starter",
    shortLabel: "Starter",
    sqftRangeLabel: "Up to 1,500 sqft",
    quoteOnly: false,
  },
  {
    id: "medium",
    label: "Standard",
    shortLabel: "Standard",
    sqftRangeLabel: "1,501 to 2,500 sqft",
    quoteOnly: false,
  },
  {
    id: "large",
    label: "Expanded",
    shortLabel: "Expanded",
    sqftRangeLabel: "2,501 to 4,000 sqft",
    quoteOnly: false,
  },
  {
    id: "xl",
    label: "Custom Quote",
    shortLabel: "Custom",
    sqftRangeLabel: "4,001+ sqft",
    quoteOnly: true,
  },
];

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: "essential-defense",
    name: "Essential Defense Plan",
    shortName: "Essential Defense",
    sizeTiers: {
      small: { monthlyPrice: 49.99, initialFee: 199.99 },
      medium: { monthlyPrice: 64.99, initialFee: 249.99 },
      large: { monthlyPrice: 79.99, initialFee: 299.99 },
    },
  },
  {
    id: "premium-shield",
    name: "Premium Shield Plan",
    shortName: "Premium Shield",
    sizeTiers: {
      small: { monthlyPrice: 89.99, initialFee: 299.99 },
      medium: { monthlyPrice: 109.99, initialFee: 349.99 },
      large: { monthlyPrice: 134.99, initialFee: 399.99 },
    },
  },
  {
    id: "ultimate-fortress",
    name: "Ultimate Fortress Plan",
    shortName: "Ultimate Fortress",
    sizeTiers: {
      small: { monthlyPrice: 129.99, initialFee: 399.99 },
      medium: { monthlyPrice: 154.99, initialFee: 449.99 },
      large: { monthlyPrice: 179.99, initialFee: 499.99 },
    },
  },
];

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

type OneTimeId = (typeof ONE_TIME_SERVICES)[number]["id"];
type NonQuotePropertySize = Exclude<PropertySize, typeof QUOTE_ONLY_PROPERTY_SIZE>;

export function isPropertySize(value: string): value is PropertySize {
  return PROPERTY_SIZE_OPTIONS.some((option) => option.id === value);
}

export function resolvePropertySize(value: string | null | undefined): PropertySize {
  return value && isPropertySize(value) ? value : DEFAULT_PROPERTY_SIZE;
}

export function getPropertySizeConfig(size: PropertySize) {
  return PROPERTY_SIZE_OPTIONS.find((option) => option.id === size) ?? PROPERTY_SIZE_OPTIONS[0];
}

export function formatSizeTierLabel(size: PropertySize) {
  const config = getPropertySizeConfig(size);
  return `${config.label} (${config.sqftRangeLabel})`;
}

export function isQuoteOnlySize(size: PropertySize) {
  return getPropertySizeConfig(size).quoteOnly;
}

/** Returns a subscription plan by ID, or undefined if not found */
export function getSubscriptionPlan(id: string) {
  return SUBSCRIPTION_PLANS.find((p) => p.id === id);
}

/** Returns the selected residential plan tier, or undefined for quote-only sizes */
export function getSubscriptionPlanTier(id: string, size: PropertySize) {
  if (isQuoteOnlySize(size)) return undefined;
  const plan = getSubscriptionPlan(id);
  if (!plan) return undefined;
  return plan.sizeTiers[size as NonQuotePropertySize];
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

function toDollars(cents: number): number {
  return cents / 100;
}

function getYearlyMonthlyCents(monthlyCents: number) {
  return Math.round(monthlyCents * 0.8);
}

function getTaxAmountCents(subtotalCents: number) {
  return Math.round(subtotalCents * TAX_RATE);
}

export function calculateTaxAmount(subtotal: number) {
  return toDollars(getTaxAmountCents(toCents(subtotal)));
}

export function getSubscriptionPricing(id: string, size: PropertySize) {
  const plan = getSubscriptionPlan(id);
  const sizeConfig = getPropertySizeConfig(size);

  if (!plan) return null;

  if (sizeConfig.quoteOnly) {
    return {
      plan,
      size,
      sizeConfig,
      quoteOnly: true as const,
    };
  }

  const tier = getSubscriptionPlanTier(id, size);
  if (!tier) return null;

  const monthlyPriceCents = toCents(tier.monthlyPrice);
  const initialFeeCents = toCents(tier.initialFee);
  const yearlyMonthlyPriceCents = getYearlyMonthlyCents(monthlyPriceCents);
  const yearlyTotalCents = yearlyMonthlyPriceCents * 12;
  const annualSavingsCents = monthlyPriceCents * 12 - yearlyTotalCents;

  return {
    plan,
    tier,
    size,
    sizeConfig,
    quoteOnly: false as const,
    monthlyPrice: tier.monthlyPrice,
    monthlyPriceCents,
    initialFee: tier.initialFee,
    initialFeeCents,
    yearlyMonthlyPrice: toDollars(yearlyMonthlyPriceCents),
    yearlyMonthlyPriceCents,
    yearlyTotal: toDollars(yearlyTotalCents),
    yearlyTotalCents,
    annualSavings: toDollars(annualSavingsCents),
    annualSavingsCents,
  };
}

export function getSubscriptionCheckoutBreakdown(id: string, size: PropertySize, billing: SubscriptionBilling) {
  const pricing = getSubscriptionPricing(id, size);
  if (!pricing || pricing.quoteOnly) return null;

  const subtotalCents = billing === "yearly" ? pricing.yearlyTotalCents : pricing.initialFeeCents;
  const taxCents =
    billing === "yearly"
      ? getTaxAmountCents(subtotalCents)
      : getTaxAmountCents(pricing.initialFeeCents - pricing.monthlyPriceCents) +
        getTaxAmountCents(pricing.monthlyPriceCents);

  return {
    ...pricing,
    billing,
    subtotalCents,
    subtotal: toDollars(subtotalCents),
    taxCents,
    taxAmount: toDollars(taxCents),
    totalDueTodayCents: subtotalCents + taxCents,
    totalDueToday: toDollars(subtotalCents + taxCents),
  };
}

export function formatSelectedPlanName(planId: string, size?: PropertySize | null) {
  const plan = getSubscriptionPlan(planId);
  if (!plan) {
    return getOneTimeService(planId)?.name ?? "Squito Service";
  }

  const resolvedSize = size ? resolvePropertySize(size) : null;
  if (!resolvedSize) return plan.name;

  return `${plan.shortName} - ${getPropertySizeConfig(resolvedSize).label}`;
}

/**
 * Maps a raw square-footage number (from a property data API like RentCast)
 * to the correct PropertySize tier for pricing.
 */
export function resolvePropertySizeFromSqft(sqft: number): PropertySize {
  if (sqft <= 1500) return "small";
  if (sqft <= 2500) return "medium";
  if (sqft <= 4000) return "large";
  return "xl";
}

export function buildQuoteRequestHref({
  planId,
  size,
  billing,
  source,
}: {
  planId?: string | null;
  size?: PropertySize | null;
  billing?: string | null;
  source?: string | null;
}) {
  const resolvedPlan = planId ? getSubscriptionPlan(planId) : null;
  const resolvedSize = resolvePropertySize(size ?? QUOTE_ONLY_PROPERTY_SIZE);
  const params = new URLSearchParams();

  params.set("type", "residential");
  params.set("service", "Custom Residential Quote");

  const details = [
    resolvedPlan ? `Plan requested: ${resolvedPlan.shortName}.` : "Plan requested: Residential protection.",
    `Home size: ${formatSizeTierLabel(resolvedSize)}.`,
    billing ? `Billing preference: ${billing}.` : null,
    source ? `Website source: ${source}.` : null,
  ]
    .filter(Boolean)
    .join(" ");

  params.set("message", details);

  return `/contact?${params.toString()}`;
}
