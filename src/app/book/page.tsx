import type { Metadata } from "next";
import BookContent from "./BookContent";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Book Pest Control Service on Long Island | Squito Pest Control",
  description:
    "Schedule pest control service across Long Island in minutes. Pick a plan, choose a date and arrival window, and we'll call to confirm. Secure Stripe checkout.",
  path: "/book",
  index: false,
});

export default function BookPage() {
  return <BookContent />;
}
