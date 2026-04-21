import type { Metadata } from "next";
import CommercialContent from "./CommercialContent";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Commercial Pest Control for Long Island Businesses | Squito Pest Control",
  description:
    "Discreet, audit-ready commercial pest control for restaurants, offices, warehouses, and multi-family properties across Long Island. Custom IPM programs and detailed service reports.",
  path: "/commercial",
});

export default function CommercialPage() {
  return <CommercialContent />;
}
