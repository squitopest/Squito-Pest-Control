import type { Metadata } from "next";
import FaqContent from "./FaqContent";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Pest Control FAQ | Squito Pest Control",
  description:
    "Answers to the most common questions about Squito Pest Control's services on Long Island: safety, scheduling, pricing, and our satisfaction guarantee.",
  path: "/faq",
});

export default function FaqPage() {
  return <FaqContent />;
}
