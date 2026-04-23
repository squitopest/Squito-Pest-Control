import { TAX_RATE, toCents } from "@/data/plans";

export type SpecialtyCategory = "interior" | "outdoor" | "termite";
export type SpecialtyPricingModel = "flat" | "tiered" | "toggle" | "linear" | "count";

type SpecialtyBase = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  category: SpecialtyCategory;
  teaser: string;
  description: string;
  image: string;
  badge?: string;
  highlights: string[];
  notes?: string[];
  featured?: boolean;
};

type TierOption = {
  id: string;
  label: string;
  details?: string;
  price?: number;
  quoteOnly?: boolean;
};

type FlatPricing = {
  model: "flat";
  price: number;
  label: string;
};

type TieredPricing = {
  model: "tiered";
  inputLabel: string;
  options: TierOption[];
};

type TogglePricing = {
  model: "toggle";
  basePrice: number;
  baseLabel: string;
  surchargeLabel: string;
  surchargeAmount: number;
  surchargeDescription: string;
};

type LinearPricing = {
  model: "linear";
  basePrice: number;
  includedUnits: number;
  additionalUnitPrice: number;
  minUnits: number;
  maxUnits: number;
  unitLabel: string;
};

type CountPricing = {
  model: "count";
  basePrice: number;
  includedCount: number;
  additionalCountPrice: number;
  minCount: number;
  maxCount: number;
  unitLabel: string;
  helperText?: string;
  annualRenewal?: string;
};

type SpecialtyPricing = FlatPricing | TieredPricing | TogglePricing | LinearPricing | CountPricing;

export type SpecialtyService = SpecialtyBase & {
  pricing: SpecialtyPricing;
};

export type SpecialtySelection =
  | { model: "flat" }
  | { model: "tiered"; optionId: string }
  | { model: "toggle"; includeSurcharge: boolean }
  | { model: "linear"; quantity: number }
  | { model: "count"; quantity: number };

type CalculatedSpecialtyQuote = {
  service: SpecialtyService;
  selection: SpecialtySelection;
  subtotal: number;
  subtotalCents: number;
  taxAmount: number;
  taxCents: number;
  totalDue: number;
  totalDueCents: number;
  serviceSummary: string;
  detailSummary: string;
  priceLabel: string;
  quoteOnly: boolean;
};

const specialtyServices: SpecialtyService[] = [
  {
    id: "bed-bug-treatment",
    slug: "bed-bug-treatment",
    name: "Bed Bug Treatment",
    shortName: "Bed Bug Treatment",
    category: "interior",
    teaser: "Two weekly visits are already included, so you can book with confidence.",
    description:
      "Careful bed bug treatment priced by treated square footage, with both weekly visits already included in each bookable option.",
    image: "/services/service_bedbug_bg_v2.webp",
    badge: "Popular Choice",
    featured: true,
    highlights: [
      "Two weekly treatments are included in the price",
      "A comfortable fit for bedrooms, apartments, and whole-home treatment plans",
      "Simple one-time booking",
    ],
    notes: [
      "Homes above 3,000 sqft may need a custom quote so we can price them accurately.",
      "Your technician may adjust the approach on site based on prep, access, and room conditions.",
    ],
    pricing: {
      model: "tiered",
      inputLabel: "Treated area",
      options: [
        { id: "up-to-1200", label: "Up to 1,200 sqft", price: 799 },
        { id: "1201-1500", label: "1,201 to 1,500 sqft", price: 999 },
        { id: "1501-2000", label: "1,501 to 2,000 sqft", price: 1199 },
        { id: "2001-2500", label: "2,001 to 2,500 sqft", price: 1499 },
        { id: "2501-3000", label: "2,501 to 3,000 sqft", price: 1799 },
        { id: "3001-plus", label: "3,001+ sqft", quoteOnly: true, details: "We’ll put together a custom quote for larger spaces" },
      ],
    },
  },
  {
    id: "flea-treatment",
    slug: "flea-treatment",
    name: "Flea Treatment",
    shortName: "Flea Treatment",
    category: "interior",
    teaser: "We usually recommend treating the whole home for the best results.",
    description:
      "A two-visit flea treatment priced by treated interior square footage and built to feel simple for pet-friendly homes.",
    image: "/services/service_residential_bg_v5.webp",
    featured: true,
    highlights: [
      "Two weekly treatments are included",
      "Whole-home treatment usually gives the strongest results",
      "Simple one-time booking",
    ],
    notes: [
      "For the best outcome, pets should be treated by a licensed veterinarian before or during service.",
    ],
    pricing: {
      model: "tiered",
      inputLabel: "Treated area",
      options: [
        { id: "300", label: "Up to 300 sqft", price: 349 },
        { id: "600", label: "Up to 600 sqft", price: 399 },
        { id: "900", label: "Up to 900 sqft", price: 449 },
        { id: "1200", label: "Up to 1,200 sqft", price: 499 },
        { id: "1500", label: "Up to 1,500 sqft", price: 549 },
        { id: "2000", label: "Up to 2,000 sqft", price: 649 },
        { id: "2500", label: "Up to 2,500 sqft", price: 749 },
        { id: "3000", label: "Up to 3,000 sqft", price: 849 },
      ],
    },
  },
  {
    id: "event-mosquito-spray",
    slug: "event-mosquito-spray",
    name: "Event Mosquito Spray",
    shortName: "Event Mosquito Spray",
    category: "outdoor",
    teaser: "A simple one-time yard spray to help everyone enjoy the outdoors a little more.",
    description:
      "A one-time mosquito barrier treatment priced by the part of the yard being protected, ideal before parties, BBQs, and outdoor gatherings.",
    image: "/backyard-bbq.webp",
    featured: true,
    highlights: [
      "Great for parties, backyard dinners, and outdoor gatherings",
      "Sized around the part of the yard you want your guests to enjoy",
      "Simple one-time booking",
    ],
    pricing: {
      model: "tiered",
      inputLabel: "Treatable yard size",
      options: [
        { id: "small-yard", label: "Small yard / patio", price: 199 },
        { id: "quarter-acre", label: "1/4 acre", price: 199 },
        { id: "third-acre", label: "1/3 acre", price: 249 },
        { id: "half-acre", label: "1/2 acre", price: 249 },
        { id: "three-quarter-acre", label: "3/4 acre", price: 249 },
        { id: "one-acre", label: "1 acre", price: 299 },
      ],
    },
  },
  {
    id: "carpenter-bee-treatment",
    slug: "carpenter-bee-treatment",
    name: "Carpenter Bee Treatment",
    shortName: "Carpenter Bee Treatment",
    category: "outdoor",
    teaser: "Straightforward pricing with a small add-on only when a taller area needs care.",
    description:
      "Exterior carpenter bee treatment for active galleries and repeat activity around fascia, trim, soffits, and outdoor structures.",
    image: "/services/service_termite_bg_v3.webp",
    highlights: [
      "Standard pricing covers the main treatment area",
      "A small add-on only applies when activity is above 20 feet",
      "Includes a 30-day warranty",
    ],
    pricing: {
      model: "toggle",
      basePrice: 299,
      baseLabel: "Main area",
      surchargeLabel: "Taller area (above 20 ft)",
      surchargeAmount: 49.99,
      surchargeDescription: "A small add-on that covers the extra setup for activity above 20 feet.",
    },
  },
  {
    id: "stinging-insect-treatment",
    slug: "stinging-insect-treatment",
    name: "Stinging Insect Nest Treatment",
    shortName: "Stinging Insect Treatment",
    category: "outdoor",
    teaser: "A reliable fit for yellow jackets, wasps, hornets, paper wasps, bald-faced hornets, and cicada killers.",
    description:
      "A one-time nest treatment for active stinging insect activity, with a simple high-access add-on only when the nest sits above 20 feet.",
    image: "/hornet-nest.webp",
    badge: "Popular",
    featured: true,
    highlights: [
      "Backed by our 100% kill guarantee",
      "Includes a 30-day warranty",
      "A strong fit for yellow jackets, hornets, wasps, paper wasps, and similar nest calls",
    ],
    pricing: {
      model: "toggle",
      basePrice: 299,
      baseLabel: "Main area",
      surchargeLabel: "Taller area (above 20 ft)",
      surchargeAmount: 49.99,
      surchargeDescription: "A small add-on that covers the extra setup for nests above 20 feet.",
    },
  },
  {
    id: "cicada-killer-treatment",
    slug: "cicada-killer-treatment",
    name: "Cicada Killer Treatment",
    shortName: "Cicada Killer Treatment",
    category: "outdoor",
    teaser: "Simple pricing that grows in easy steps for larger yards.",
    description:
      "Ground-burrow treatment for cicada killer activity, priced from a base treatment scope with quarter-acre expansions for larger infested areas.",
    image: "/services/service_mosquito_bg_v2.webp",
    highlights: [
      "Standard pricing covers the first treatment zone",
      "Each added quarter-acre is priced simply and clearly",
      "A helpful fit for sandy lawns and burrow-heavy areas",
    ],
    pricing: {
      model: "count",
      basePrice: 299,
      includedCount: 1,
      additionalCountPrice: 50,
      minCount: 1,
      maxCount: 8,
      unitLabel: "quarter-acre zones",
      helperText: "The starting price includes the first quarter-acre, and you can add more if the activity stretches farther.",
    },
  },
  {
    id: "termite-inspection",
    slug: "termite-inspection",
    name: "Termite Inspection",
    shortName: "Termite Inspection",
    category: "termite",
    teaser: "Includes a written report — a great fit for real estate transactions and peace of mind.",
    description:
      "A one-time termite inspection with a written report, ideal for early detection, real estate transactions, home-buying due diligence, and peace of mind.",
    image: "/termite-inspection.webp",
    featured: true,
    highlights: [
      "Simple flat-rate pricing",
      "Written inspection report included",
      "A great fit for real estate transactions and home-buying due diligence",
      "Easy one-time booking",
    ],
    pricing: {
      model: "flat",
      price: 199,
      label: "Simple flat rate",
    },
  },
  {
    id: "termite-spot-treatment",
    slug: "termite-spot-treatment",
    name: "Termite Spot Treatment",
    shortName: "Termite Spot Treatment",
    category: "termite",
    teaser: "A helpful option when swarmers are emerging from a wall or another contained area.",
    description:
      "A targeted termite spot treatment for visible activity coming from a localized wall, trim, or enclosed-space area — often requested during real estate transactions.",
    image: "/services/service_termite_bg_v3.webp",
    highlights: [
      "Straightforward flat-rate treatment",
      "Best when termite activity is clearly coming from one contained area",
      "A reliable option when spot treatment is needed during a real estate transaction",
      "A quick and simple termite service to book",
    ],
    pricing: {
      model: "flat",
      price: 350,
      label: "Simple flat rate",
    },
  },
  {
    id: "termite-wood-treatment",
    slug: "termite-wood-treatment",
    name: "Termite Wood Treatment",
    shortName: "Termite Wood Treatment",
    category: "termite",
    teaser: "Simple pricing that starts with the first foot and scales clearly from there.",
    description:
      "A wood-focused termite treatment priced by the number of linear feet needing care, ideal for localized damage, exposed treatment zones, and real estate transactions.",
    image: "/services/service_termite_bg_v3.webp",
    highlights: [
      "Pricing starts at $350 for the first foot",
      "Each additional foot adds $50",
      "A clear, itemized option when real estate transactions call for localized wood treatment",
      "Pricing updates as the treatment area changes",
    ],
    pricing: {
      model: "linear",
      basePrice: 350,
      includedUnits: 1,
      additionalUnitPrice: 50,
      minUnits: 1,
      maxUnits: 20,
      unitLabel: "linear feet",
    },
  },
  {
    id: "advance-termite-bait-stations",
    slug: "advance-termite-bait-stations",
    name: "Advance Termite Bait Stations",
    shortName: "Advance Bait Stations",
    category: "termite",
    teaser: "Your install price already includes the first year of Spring and Fall service.",
    description:
      "Advance termite bait station installation priced by station count, with first-year monitoring included and renewal pricing shared clearly up front — often requested during real estate transactions for long-term protection.",
    image: "/services/service_termite_bg_v3.webp",
    badge: "Loved by Homeowners",
    highlights: [
      "Installation starts at $399 for 10 stations",
      "Extra stations are priced clearly as you scale up",
      "The first year of Spring and Fall service is included",
      "Often requested during real estate transactions for long-term termite protection",
    ],
    notes: [
      "Renewal pricing begins after the included first year of service.",
      "We install Advance stations as part of this service.",
    ],
    pricing: {
      model: "count",
      basePrice: 399,
      includedCount: 10,
      additionalCountPrice: 40,
      minCount: 10,
      maxCount: 23,
      unitLabel: "stations",
      helperText: "Your install price includes the first 10 stations plus the first year of Spring and Fall service.",
      annualRenewal:
        "After the first year, renewal pricing starts at $299 per year for 10 stations and increases with station count.",
    },
  },
];

export const SPECIALTY_SERVICES = specialtyServices;

export const SPECIALTY_CATEGORY_LABELS: Record<SpecialtyCategory, string> = {
  interior: "Interior Treatments",
  outdoor: "Outdoor & Seasonal Services",
  termite: "Termite Services",
};

export const PREMIUM_SPECIALTY_THRESHOLD = 349;

function roundMoney(value: number) {
  return Math.round(value * 100) / 100;
}

function pluralize(unit: string, quantity: number) {
  return quantity === 1 ? unit : unit.endsWith("s") ? unit : `${unit}s`;
}

export function getBookableSpecialtyServices() {
  return SPECIALTY_SERVICES;
}

export function getFeaturedSpecialtyServices() {
  return SPECIALTY_SERVICES.filter((service) => service.featured);
}

export function getSpecialtyService(idOrSlug: string) {
  return SPECIALTY_SERVICES.find((service) => service.id === idOrSlug || service.slug === idOrSlug);
}

export function getSpecialtyServiceBySlug(slug: string) {
  return SPECIALTY_SERVICES.find((service) => service.slug === slug);
}

export function getSpecialtyStartingPrice(service: SpecialtyService) {
  switch (service.pricing.model) {
    case "flat":
      return service.pricing.price;
    case "tiered": {
      const firstPricedOption = service.pricing.options.find((option) => typeof option.price === "number");
      return firstPricedOption?.price ?? null;
    }
    case "toggle":
      return service.pricing.basePrice;
    case "linear":
      return service.pricing.basePrice;
    case "count":
      return service.pricing.basePrice;
  }
}

export function isPremiumSpecialtyService(service: SpecialtyService) {
  const startingPrice = getSpecialtyStartingPrice(service);
  return startingPrice != null && startingPrice >= PREMIUM_SPECIALTY_THRESHOLD;
}

export function getDefaultSpecialtySelection(service: SpecialtyService): SpecialtySelection {
  switch (service.pricing.model) {
    case "flat":
      return { model: "flat" };
    case "tiered":
      return { model: "tiered", optionId: service.pricing.options[0]?.id ?? "" };
    case "toggle":
      return { model: "toggle", includeSurcharge: false };
    case "linear":
      return { model: "linear", quantity: service.pricing.minUnits };
    case "count":
      return { model: "count", quantity: service.pricing.minCount };
  }
}

export function serializeSpecialtySelection(selection: SpecialtySelection) {
  return encodeURIComponent(JSON.stringify(selection));
}

export function deserializeSpecialtySelection(raw: string | null | undefined) {
  if (!raw) return null;
  try {
    return JSON.parse(decodeURIComponent(raw)) as SpecialtySelection;
  } catch {
    return null;
  }
}

export function normalizeSpecialtySelection(
  service: SpecialtyService,
  input: SpecialtySelection | Record<string, unknown> | null | undefined
): SpecialtySelection | null {
  if (!input || typeof input !== "object") {
    return getDefaultSpecialtySelection(service);
  }

  const raw = input as Record<string, unknown>;

  switch (service.pricing.model) {
    case "flat":
      return { model: "flat" };
    case "tiered": {
      const optionId = typeof raw.optionId === "string" ? raw.optionId : service.pricing.options[0]?.id;
      return optionId ? { model: "tiered", optionId } : null;
    }
    case "toggle":
      return {
        model: "toggle",
        includeSurcharge: Boolean(raw.includeSurcharge),
      };
    case "linear": {
      const quantity = Number(raw.quantity ?? service.pricing.minUnits);
      if (!Number.isFinite(quantity)) return null;
      return {
        model: "linear",
        quantity: Math.max(service.pricing.minUnits, Math.min(service.pricing.maxUnits, Math.round(quantity))),
      };
    }
    case "count": {
      const quantity = Number(raw.quantity ?? service.pricing.minCount);
      if (!Number.isFinite(quantity)) return null;
      return {
        model: "count",
        quantity: Math.max(service.pricing.minCount, Math.min(service.pricing.maxCount, Math.round(quantity))),
      };
    }
  }
}

export function calculateSpecialtyQuote(
  serviceIdOrSlug: string,
  rawSelection?: SpecialtySelection | Record<string, unknown> | null
): CalculatedSpecialtyQuote | null {
  const service = getSpecialtyService(serviceIdOrSlug);
  if (!service) return null;

  const selection = normalizeSpecialtySelection(service, rawSelection);
  if (!selection) return null;

  let subtotal = 0;
  let detailSummary = "";
  let priceLabel = "";
  let quoteOnly = false;

  switch (service.pricing.model) {
    case "flat":
      subtotal = service.pricing.price;
      detailSummary = service.pricing.label;
      priceLabel = `$${service.pricing.price.toFixed(2)}`;
      break;
    case "tiered": {
      if (selection.model !== "tiered") return null;
      const option = service.pricing.options.find((item) => item.id === selection.optionId);
      if (!option) return null;
      if (option.quoteOnly || option.price == null) {
        quoteOnly = true;
        subtotal = 0;
        detailSummary = option.details ?? option.label;
        priceLabel = "Custom quote";
      } else {
        subtotal = option.price;
        detailSummary = option.label;
        priceLabel = `$${option.price.toFixed(2)}`;
      }
      break;
    }
    case "toggle": {
      if (selection.model !== "toggle") return null;
      subtotal = service.pricing.basePrice + (selection.includeSurcharge ? service.pricing.surchargeAmount : 0);
      detailSummary = selection.includeSurcharge
        ? `${service.pricing.baseLabel} + ${service.pricing.surchargeLabel}`
        : service.pricing.baseLabel;
      priceLabel = selection.includeSurcharge
        ? `$${subtotal.toFixed(2)}`
        : `$${service.pricing.basePrice.toFixed(2)}`;
      break;
    }
    case "linear": {
      if (selection.model !== "linear") return null;
      const extraUnits = Math.max(0, selection.quantity - service.pricing.includedUnits);
      subtotal = service.pricing.basePrice + extraUnits * service.pricing.additionalUnitPrice;
      detailSummary = `${selection.quantity} ${pluralize("foot", selection.quantity)} of treatment`;
      priceLabel = `$${subtotal.toFixed(2)}`;
      break;
    }
    case "count": {
      if (selection.model !== "count") return null;
      const extraCount = Math.max(0, selection.quantity - service.pricing.includedCount);
      subtotal = service.pricing.basePrice + extraCount * service.pricing.additionalCountPrice;
      detailSummary = `${selection.quantity} ${pluralize(service.pricing.unitLabel, selection.quantity)}`;
      priceLabel = `$${subtotal.toFixed(2)}`;
      break;
    }
  }

  const subtotalCents = toCents(subtotal);
  const taxCents = quoteOnly ? 0 : Math.round(subtotalCents * TAX_RATE);
  const totalDueCents = subtotalCents + taxCents;

  return {
    service,
    selection,
    subtotal: roundMoney(subtotal),
    subtotalCents,
    taxAmount: roundMoney(taxCents / 100),
    taxCents,
    totalDue: roundMoney(totalDueCents / 100),
    totalDueCents,
    serviceSummary: `${service.name} - ${detailSummary}`,
    detailSummary,
    priceLabel,
    quoteOnly,
  };
}

export function getSpecialtyDisplayPrice(service: SpecialtyService) {
  switch (service.pricing.model) {
    case "flat":
      return `$${service.pricing.price.toFixed(2)}`;
    case "tiered": {
      const firstPricedOption = service.pricing.options.find((option) => typeof option.price === "number");
      return firstPricedOption ? `From $${firstPricedOption.price!.toFixed(2)}` : "Custom quote";
    }
    case "toggle":
      return `From $${service.pricing.basePrice.toFixed(2)}`;
    case "linear":
      return `$${service.pricing.basePrice.toFixed(2)} + $${service.pricing.additionalUnitPrice.toFixed(2)}/ft`;
    case "count":
      return `From $${service.pricing.basePrice.toFixed(2)}`;
  }
}

export function buildSpecialtyBookHref(
  serviceIdOrSlug: string,
  selection: SpecialtySelection | Record<string, unknown>
) {
  const service = getSpecialtyService(serviceIdOrSlug);
  if (!service) return "/services/specialty";

  const normalized = normalizeSpecialtySelection(service, selection);
  if (!normalized) return `/services/specialty/${service.slug}`;

  const params = new URLSearchParams();
  params.set("serviceType", "specialty");
  params.set("serviceId", service.id);
  params.set("selection", serializeSpecialtySelection(normalized));
  params.set("billing", "onetime");

  return `/book?${params.toString()}`;
}

export function buildSpecialtyQuoteHref(
  serviceIdOrSlug: string,
  selection: SpecialtySelection | Record<string, unknown> | null | undefined,
  source?: string | null
) {
  const quote = calculateSpecialtyQuote(serviceIdOrSlug, selection);
  if (!quote) return "/contact";

  const params = new URLSearchParams();
  params.set("type", "residential");
  params.set("service", "Specialty Service Quote");

  const details = [
    `Service requested: ${quote.service.name}.`,
    `Requested scope: ${quote.detailSummary}.`,
    source ? `Website source: ${source}.` : null,
  ]
    .filter(Boolean)
    .join(" ");

  params.set("message", details);

  return `/contact?${params.toString()}`;
}

export function buildSpecialtyHelpHref(
  serviceIdOrSlug: string,
  source?: string | null
) {
  const service = getSpecialtyService(serviceIdOrSlug);
  if (!service) return "/contact";

  const params = new URLSearchParams();
  params.set("type", "residential");
  params.set("service", `${service.name} — Help Choosing`);

  const details = [
    `Service requested: ${service.name}.`,
    "Unsure about property size or how much coverage is needed — would like help picking the right option.",
    source ? `Website source: ${source}.` : null,
  ]
    .filter(Boolean)
    .join(" ");

  params.set("message", details);

  return `/contact?${params.toString()}`;
}
