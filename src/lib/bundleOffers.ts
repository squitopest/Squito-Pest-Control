import {
  getMosquitoTickPackage,
  type MosquitoTickYardSizeId,
} from "@/data/mosquitoTickPackages";

/** Discount applied when bundling General Pest Control with Mosquito & Tick. */
export const BUNDLE_DISCOUNT_PERCENT = 10;

export function resolveYardSizeFromHomeSqft(
  sqft: number | null
): MosquitoTickYardSizeId {
  if (!sqft || sqft <= 2000) return "small";
  if (sqft <= 4000) return "medium";
  return "xl";
}

export type MosquitoTickBundleAddOn = {
  type: "mosquito-tick";
  sizeId: MosquitoTickYardSizeId;
  discountPercent: number;
};

export function buildMosquitoTickBundleAddOn(
  sqft: number | null
): MosquitoTickBundleAddOn {
  return {
    type: "mosquito-tick",
    sizeId: resolveYardSizeFromHomeSqft(sqft),
    discountPercent: BUNDLE_DISCOUNT_PERCENT,
  };
}

export function canAutoApplyMosquitoTickBundle(sqft: number | null): boolean {
  const addOn = buildMosquitoTickBundleAddOn(sqft);
  const pkg = getMosquitoTickPackage(addOn.sizeId);
  return Boolean(pkg && !pkg.quoteOnly);
}
