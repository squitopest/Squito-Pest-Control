"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Star, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type PlanTeaserPlan = {
  id: string;
  name: string;
  tag: string;
  headline: string;
  description: string;
  features: readonly string[];
  popular: boolean;
};

type PlanTeaserCardProps = {
  plan: PlanTeaserPlan;
  index: number;
  variant?: "grid" | "carousel";
  isDesktop?: boolean;
  className?: string;
};

export default function PlanTeaserCard({
  plan,
  index,
  variant = "grid",
  isDesktop = false,
  className,
}: PlanTeaserCardProps) {
  const isPopular = plan.popular;

  const cardClassName = cn(
    "relative flex flex-col rounded-2xl border bg-card overflow-hidden",
    isPopular ? "border-primary border-2 z-10" : "border-border z-0",
    variant === "grid" && !isPopular && "md:mt-5",
    variant === "grid" && index === 0 && "md:origin-right",
    variant === "grid" && index === 2 && "md:origin-left",
    className
  );

  const cardBody = (
    <>
      {isPopular && (
        <div className="absolute top-0 right-0 z-20 bg-primary py-1 px-2.5 rounded-bl-xl rounded-tr-2xl flex items-center gap-1">
          <Star className="text-primary-foreground h-4 w-4 fill-current" aria-hidden />
          <span className="text-primary-foreground text-xs font-bold uppercase tracking-wide">
            Most Popular
          </span>
        </div>
      )}

      <div className="h-20 md:h-24 bg-green-800 shrink-0" aria-hidden />

      <div className="flex flex-1 flex-col p-6 md:p-7 text-left">
        <p className="text-xs font-semibold uppercase tracking-wider text-green-600 mb-1">
          {plan.tag}
        </p>
        <h3 className="font-display font-bold text-xl text-foreground">{plan.name}</h3>
        <p className="mt-2 font-display font-semibold text-foreground/90 text-sm leading-snug mb-5">
          {plan.headline}
        </p>

        <ul className="space-y-2.5 border-t border-border pt-4">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm text-muted">
              <Check
                className="h-4 w-4 text-primary mt-0.5 shrink-0"
                strokeWidth={2.5}
                aria-hidden
              />
              {feature}
            </li>
          ))}
        </ul>

        <p className="mt-4 text-xs leading-relaxed text-muted">{plan.description}</p>

        {isPopular ? (
          <Link
            href="/get-started?from=plans-teaser&plan=premium-shield"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-bold gradient-cta text-white hover:shadow-[0_0_24px_rgba(34,197,94,0.35)] transition-all"
          >
            Start Now
            <ArrowRight size={16} />
          </Link>
        ) : (
          <Link
            href="/plans"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-bold border border-border bg-muted/30 text-foreground hover:border-primary/50 hover:bg-primary/10 hover:text-green-700 transition-all"
          >
            View Plans
            <ArrowRight size={16} />
          </Link>
        )}
      </div>
    </>
  );

  if (variant === "carousel") {
    return <div className={cardClassName}>{cardBody}</div>;
  }

  return (
    <motion.div
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
      className={cardClassName}
    >
      {cardBody}
    </motion.div>
  );
}
