import type { Metadata } from "next";
import PlansContent from "./PlansContent";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Pest Control Plans & Pricing on Long Island | Squito Pest Control",
  description:
    "Transparent monthly and yearly pest control plans for Long Island homes: Essential Defense, Premium Shield, and Ultimate Fortress. 100% satisfaction guarantee, no long-term contracts.",
  path: "/plans",
});

export default function PlansPage() {
  return <PlansContent />;
}
