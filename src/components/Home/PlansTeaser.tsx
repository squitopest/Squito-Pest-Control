"use client";

import { useMediaQuery } from "@/lib/useMediaQuery";
import PlanTeaserCard, { type PlanTeaserPlan } from "@/components/Home/PlanTeaserCard";
import PlansCarousel from "@/components/Home/PlansCarousel";

const PLANS: readonly PlanTeaserPlan[] = [
  {
    id: "essential-defense",
    name: "Essential Defense",
    tag: "Starter coverage",
    headline: "Perfect for smaller homes or first-time customers.",
    description:
      "Quarterly exterior treatments with common pest coverage and free re-service if pests return.",
    features: [
      "Quarterly exterior treatments",
      "Common pest coverage",
      "Free re-service if pests return",
      "Digital inspection report",
      "24/7 online account access",
    ],
    popular: false,
  },
  {
    id: "premium-shield",
    name: "Premium Shield",
    tag: "Most popular",
    headline: "Full protection, inside and out.",
    description:
      "Our most chosen plan for Long Island families who want year-round coverage without gaps.",
    features: [
      "Quarterly interior & exterior treatments",
      "30+ pest types covered",
      "Rodent baiting & exclusion",
      "Free re-service guarantee",
      "Free yearly termite inspection",
      "Priority scheduling",
      "Digital inspection report",
    ],
    popular: true,
  },
  {
    id: "ultimate-fortress",
    name: "Ultimate Fortress",
    tag: "Total coverage",
    headline: "Yard, interior, and everything in between.",
    description:
      "Maximum protection for larger properties, wooded lots, and families who want it all handled.",
    features: [
      "Everything in Premium Shield",
      "Monthly mosquito & tick yard spray",
      "Termite monitoring included",
      "Bed bug alert service",
      "Seasonal outdoor flea coverage",
      "Dedicated service technician",
      "Same-day service guarantee",
    ],
    popular: false,
  },
];

export default function PlansTeaser() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <section className="py-16 md:py-24 bg-muted/30 border-y border-border" id="plans-teaser">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground tracking-tight mb-3">
            Protection Plans
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Simple plans. Cancel anytime.
          </p>
        </div>

        <PlansCarousel plans={PLANS} />

        <div className="hidden md:grid grid-cols-3 gap-4 md:gap-6 xl:gap-8">
          {PLANS.map((plan, index) => (
            <PlanTeaserCard
              key={plan.id}
              plan={plan}
              index={index}
              variant="grid"
              isDesktop={isDesktop}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
