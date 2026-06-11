"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { trackMetaEvent } from "@/lib/meta-pixel";
import FunnelProgress from "@/components/GetStarted/FunnelProgress";
import ServiceIntentCards, { type ServiceIntent } from "@/components/GetStarted/ServiceIntentCards";
import {
  getMosquitoTickServiceHref,
  isMosquitoTickFleaPest,
} from "@/lib/pestRouting";
import { BUNDLE_DISCOUNT_PERCENT } from "@/lib/bundleOffers";

function buildIntentHref(intent: ServiceIntent, from?: string): string {
  if (intent === "mt") {
    return getMosquitoTickServiceHref(from ?? "get-started");
  }

  const params = new URLSearchParams();
  if (from) params.set("from", from);
  if (intent === "bundle") params.set("intent", "bundle");
  const query = params.toString();
  return query ? `/plans?${query}` : "/plans";
}

export default function ServiceIntentStep() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? undefined;
  const preselected = searchParams.get("intent");
  const pest = searchParams.get("pest");

  useEffect(() => {
    trackMetaEvent("ViewContent", {
      content_name: "Get Started",
      content_category: "service_intent",
      ...(from ? { source: from } : {}),
    });
  }, [from]);

  useEffect(() => {
    if (from !== "pest-intent") return;

    const routeToMosquitoTick =
      preselected === "mt" || (pest != null && isMosquitoTickFleaPest(pest));

    if (!routeToMosquitoTick) return;

    trackMetaEvent("InitiateCheckout", {
      content_name: "Mosquito & Tick",
      content_category: "service_intent",
      intent: "mt",
      source: from,
    });
    router.replace(getMosquitoTickServiceHref(from));
  }, [from, preselected, pest, router]);

  const handleSelect = (intent: ServiceIntent) => {
    const href = buildIntentHref(intent, from);
    const contentName =
      intent === "gpc"
        ? "General Pest Control"
        : intent === "mt"
          ? "Mosquito & Tick"
          : "Complete Protection Bundle";

    trackMetaEvent("InitiateCheckout", {
      content_name: contentName,
      content_category: "service_intent",
      intent,
      ...(from ? { source: from } : {}),
    });
    router.push(href);
  };

  return (
    <div className="animate-fade-in-up max-w-container-max mx-auto">
      <FunnelProgress step={1} />

      <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
        <p className="text-sm font-semibold uppercase tracking-wider text-green-600 mb-3">
          Get Protected
        </p>
        <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground tracking-tight mb-4">
          What&apos;s bugging you?
        </h1>
        <p className="text-muted text-lg max-w-lg mx-auto">
          Pick the path that fits — or bundle home and yard coverage and save{" "}
          {BUNDLE_DISCOUNT_PERCENT}% on mosquito &amp; tick.
        </p>
      </div>

      <ServiceIntentCards onSelect={handleSelect} highlightedId={preselected} />

      <p className="text-center mt-8 text-sm text-muted">
        One-time problem?{" "}
        <Link
          href="/services/specialty"
          className="font-semibold text-green-600 hover:text-green-700 underline-offset-2 hover:underline"
        >
          Browse specialty services
        </Link>
        {" · "}
        <Link
          href="/contact"
          className="font-semibold text-green-600 hover:text-green-700 underline-offset-2 hover:underline"
        >
          Talk to us
        </Link>
      </p>
    </div>
  );
}
