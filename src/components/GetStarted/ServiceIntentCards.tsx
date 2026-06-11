"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check, Sparkles, Star, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { COMPANY_PHOTOS } from "@/lib/companyPhotos";
import { BUNDLE_DISCOUNT_PERCENT } from "@/lib/bundleOffers";

export type ServiceIntent = "gpc" | "mt" | "bundle";

type IntentCard = {
  id: ServiceIntent;
  title: string;
  headline: string;
  description: string;
  features: string[];
  image: string;
  imageAlt: string;
  isPopular?: boolean;
  savingsLabel?: string;
};

const INTENT_CARDS: IntentCard[] = [
  {
    id: "gpc",
    title: "General Pest Control",
    headline: "All pests. One plan. Year-round.",
    description:
      "Full-home subscription protection for Long Island — ants, rodents, roaches, spiders, wasps, termites, bed bugs, and more.",
    features: [
      "Quarterly interior & exterior treatments",
      "30+ pest types covered",
      "Rodent baiting & exclusion",
      "Free re-service guarantee",
      "No contracts — cancel anytime",
    ],
    image: COMPANY_PHOTOS.getStartedGeneralPest,
    imageAlt: "Squito technician treating a Long Island home perimeter",
  },
  {
    id: "mt",
    title: "Mosquito & Tick",
    headline: "Your yard, protected all season",
    description:
      "Monthly barrier treatments across your yard from April through October. No initial fees.",
    features: [
      "Monthly yard barrier spray April–October",
      "Mosquito, tick & flea yard coverage",
      "Tick harborage: woodline, tall grass & stone walls",
      "Pet & family safe once treated areas are dry",
      "Free re-treatment between visits",
      "Billed only during active season",
    ],
    image: COMPANY_PHOTOS.getStartedMosquitoTick,
    imageAlt: "Squito technician fogging a backyard for mosquito and tick control",
  },
  {
    id: "bundle",
    title: "Complete Protection",
    headline: "Home + yard, one bundle",
    description:
      "The easiest way to cover inside and out — year-round pest control plus seasonal yard protection.",
    features: [
      "Year-round general pest control",
      "Seasonal mosquito & tick yard spray",
      `Save ${BUNDLE_DISCOUNT_PERCENT}% on mosquito & tick when bundled`,
      "Free re-service on both services",
      "No contracts — cancel anytime",
    ],
    image: COMPANY_PHOTOS.getStartedBundle,
    imageAlt: "Squito technician treating a Long Island yard for full-home protection",
    isPopular: true,
    savingsLabel: `Save ${BUNDLE_DISCOUNT_PERCENT}% on mosquito & tick`,
  },
];

type ServiceIntentCardsProps = {
  onSelect: (intent: ServiceIntent) => void;
  highlightedId?: string | null;
};

export default function ServiceIntentCards({
  onSelect,
  highlightedId,
}: ServiceIntentCardsProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
      {INTENT_CARDS.map((card, index) => {
        const isPopular = card.isPopular === true;
        const isHighlighted = highlightedId === card.id;

        return (
          <motion.button
            key={card.id}
            type="button"
            onClick={() => onSelect(card.id)}
            initial={{ y: 50, opacity: 1 }}
            whileInView={
              isDesktop
                ? {
                    y: isPopular ? -20 : 0,
                    opacity: 1,
                    x: index === 2 ? -24 : index === 0 ? 24 : 0,
                    scale: index === 0 || index === 2 ? 0.96 : 1,
                  }
                : {}
            }
            viewport={{ once: true }}
            transition={{
              duration: 1.2,
              type: "spring",
              stiffness: 100,
              damping: 30,
              delay: 0.2,
              opacity: { duration: 0.5 },
            }}
            className={cn(
              "group relative flex flex-col text-left rounded-2xl border bg-card overflow-hidden transition-shadow duration-200",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              "hover:shadow-card hover:border-primary/40",
              isPopular || isHighlighted
                ? "border-primary border-2 z-10"
                : "border-border z-0",
              !isPopular && "md:mt-5",
              index === 0 && "md:origin-right",
              index === 2 && "md:origin-left"
            )}
          >
            {isPopular && (
              <div className="absolute top-0 right-0 z-20 bg-primary py-1 px-2.5 rounded-bl-xl rounded-tr-2xl flex items-center gap-1">
                <Star className="text-primary-foreground h-4 w-4 fill-current" aria-hidden />
                <span className="text-primary-foreground text-xs font-bold uppercase tracking-wide">
                  Best Value
                </span>
              </div>
            )}

            <div className="relative h-36 md:h-40 overflow-hidden shrink-0">
              <Image
                src={card.image}
                alt={card.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
            </div>

            <div className="flex flex-1 flex-col p-6 md:p-7">
              <p className="text-xs font-semibold uppercase tracking-wider text-green-600 mb-1">
                {card.id === "gpc"
                  ? "Year-round"
                  : card.id === "mt"
                    ? "Seasonal"
                    : "Bundle & save"}
              </p>
              <h2 className="font-display font-bold text-xl text-foreground">{card.title}</h2>
              <p className="mt-2 font-display font-semibold text-foreground/90 text-sm leading-snug">
                {card.headline}
              </p>

              <ul className="mt-5 flex flex-col gap-2.5 flex-1">
                {card.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check
                      className="h-4 w-4 text-primary mt-0.5 shrink-0"
                      strokeWidth={2.5}
                      aria-hidden
                    />
                    <span className="text-sm text-muted leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>

              <hr className="w-full my-5 border-border" />

              <div
                className={cn(
                  "inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-bold tracking-tight transition-all duration-300",
                  isPopular
                    ? "gradient-cta text-white group-hover:shadow-[0_0_24px_rgba(34,197,94,0.35)]"
                    : "border border-border bg-muted/30 text-foreground group-hover:border-primary/50 group-hover:bg-primary/10 group-hover:text-green-700"
                )}
              >
                Continue
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </div>

              {card.savingsLabel ? (
                <div className="mt-3 flex justify-center">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-wide border border-primary/20">
                    <Sparkles size={11} aria-hidden />
                    {card.savingsLabel}
                  </span>
                </div>
              ) : null}

              <p className="mt-4 text-xs leading-relaxed text-muted">{card.description}</p>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
