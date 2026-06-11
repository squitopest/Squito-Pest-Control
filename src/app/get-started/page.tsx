import { Suspense } from "react";
import type { Metadata } from "next";
import ServiceIntentStep from "@/components/GetStarted/ServiceIntentStep";

export const metadata: Metadata = {
  title: "Get Started | Squito Pest Control",
  description:
    "Tell us what's bugging you: general pest control or mosquito & tick protection for your Long Island home.",
  robots: { index: false, follow: true },
};

export default function GetStartedPage() {
  return (
    <main className="min-h-screen bg-background pt-28 pb-section-py-desktop px-gutter">
      <div className="container mx-auto max-w-7xl">
        <Suspense
          fallback={
            <div className="text-center py-20 text-muted">Loading...</div>
          }
        >
          <ServiceIntentStep />
        </Suspense>
      </div>
    </main>
  );
}
