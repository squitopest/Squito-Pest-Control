/** Pests that belong on the Mosquito & Tick funnel instead of general pest control. */
export function isMosquitoTickFleaPest(slug: string): boolean {
  if (slug === "fleas" || slug === "asian-tiger") return true;
  return slug.includes("mosquito") || slug.includes("tick");
}

export function getGetStartedHrefForPest(
  slug: string,
  from = "pest-intent"
): string {
  const params = new URLSearchParams({ from });
  if (isMosquitoTickFleaPest(slug)) {
    params.set("intent", "mt");
  } else {
    params.set("pest", slug);
  }
  return `/get-started?${params}`;
}

export function getMosquitoTickServiceHref(from = "pest-intent"): string {
  return `/services/mosquito-tick?from=${encodeURIComponent(from)}`;
}
