import type { Metadata } from "next";
import ResidentialContent from "./ResidentialContent";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Residential Pest Control on Long Island | Squito Pest Control",
  description:
    "Family- and pet-safe residential pest control across Long Island. Year-round exterior barriers, same-day service, and a 100% satisfaction guarantee.",
  path: "/residential",
});

export default function ResidentialPage() {
  return <ResidentialContent />;
}
