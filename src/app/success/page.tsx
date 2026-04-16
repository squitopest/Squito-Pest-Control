import type { Metadata } from "next";
import SuccessPageContent from "@/components/SuccessPage/SuccessPageContent";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Booking Confirmed | Squito Pest Control",
  description: "Your service request and payment were received by Squito Pest Control.",
  path: "/success",
  index: false,
});

export default function SuccessPage() {
  return <SuccessPageContent />;
}
