"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Star,
  Zap,
  Check,
  X,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import {
  getSubscriptionPricing,
  getPropertySizeConfig,
  type PropertySize,
} from "@/data/plans";

type PlanStepProps = {
  propertySize: PropertySize;
  sqft: number | null;
  onSelectPlan: (planId: string, billing: "monthly" | "yearly") => void;
  onBack: () => void;
};

const plans = [
  {
    id: "essential-defense",
    tagline: "Great for first-time customers & smaller homes.",
    icon: Shield,
    accentColor: "zinc",
    borderClass: "border-border hover:border-tint-25",
    iconBg: "bg-tint-10",
    popular: false,
    cta: "Select Essential",
    treatment: "Quarterly (4×/year)",
    coverage: "Exterior only",
    pests: "15+ common pests",
    responseTime: "Standard scheduling",
    features: [
      { label: "Quarterly exterior perimeter treatments", included: true },
      { label: "Coverage for 15+ common pest types", included: true },
      { label: "Free re-service if pests return between visits", included: true },
      { label: "Digital inspection report after each visit", included: true },
      { label: "Interior treatments", included: false },
      { label: "Rodent baiting & exclusion", included: false },
      { label: "Mosquito & tick yard spray", included: false },
    ],
  },
  {
    id: "premium-shield",
    tagline: "Full protection, inside and out — our most popular.",
    icon: Star,
    accentColor: "green",
    borderClass: "border-green-500",
    iconBg: "bg-green-500/10",
    popular: true,
    cta: "Select Premium",
    treatment: "Quarterly (4×/year)",
    coverage: "Interior & Exterior",
    pests: "30+ pest types",
    responseTime: "Priority scheduling",
    features: [
      { label: "Quarterly interior & exterior treatments", included: true },
      { label: "Coverage for 30+ pest types", included: true },
      { label: "Rodent baiting & exterior exclusion", included: true },
      { label: "Free yearly termite inspection ($150 value)", included: true },
      { label: "Priority scheduling — skip the queue", included: true },
      { label: "Mosquito & tick yard spray", included: false },
      { label: "Same-day service guarantee", included: false },
    ],
  },
  {
    id: "ultimate-fortress",
    tagline: "Total domination — yard, interior, and everything.",
    icon: Zap,
    accentColor: "amber",
    borderClass: "border-amber-500/70 hover:border-amber-400",
    iconBg: "bg-amber-500/10",
    popular: false,
    cta: "Select Ultimate",
    treatment: "Monthly + Quarterly",
    coverage: "Interior, Exterior & Yard",
    pests: "40+ pest types",
    responseTime: "Same-day guarantee",
    features: [
      { label: "Everything in Premium Shield", included: true },
      { label: "Monthly mosquito & tick yard barrier spray", included: true },
      { label: "Termite monitoring system installed", included: true },
      { label: "Bed bug alert & early detection", included: true },
      { label: "Dedicated personal technician", included: true },
      { label: "Same-day service guarantee (before 2 PM)", included: true },
      { label: "Priority emergency response", included: true },
    ],
  },
] as const;

export default function PlanStep({
  propertySize,
  sqft,
  onSelectPlan,
  onBack,
}: PlanStepProps) {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const sizeConfig = getPropertySizeConfig(propertySize);
  const isQuoteOnly = sizeConfig.quoteOnly;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider uppercase mb-5">
          <Shield size={14} /> Step 2
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
          Pick your protection plan
        </h2>
        <p className="text-white/55 text-lg max-w-2xl mx-auto">
          Every plan includes free re-service and no contracts.
        </p>
      </div>

      {/* Billing toggle */}
      <div className="flex justify-center mb-10">
        <div className="flex p-1.5 gap-1 bg-card/80 border border-border rounded-full backdrop-blur-md">
          <button
            type="button"
            aria-pressed={billing === "monthly"}
            className={`px-6 py-2 rounded-full font-semibold text-sm transition-all flex items-center ${
              billing === "monthly"
                ? "bg-white/10 text-white shadow"
                : "text-white/60 hover:text-white"
            }`}
            onClick={() => setBilling("monthly")}
          >
            Monthly
          </button>
          <button
            type="button"
            aria-pressed={billing === "yearly"}
            className={`px-6 py-2 rounded-full font-semibold text-sm transition-all flex items-center gap-2 ${
              billing === "yearly"
                ? "bg-white/10 text-white shadow"
                : "text-white/60 hover:text-white"
            }`}
            onClick={() => setBilling("yearly")}
          >
            Yearly
            <span className="bg-green-500 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-md">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Plan cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-10">
        {plans.map((plan) => {
          const pricing = getSubscriptionPricing(plan.id, propertySize);
          if (!pricing) return null;

          const Icon = plan.icon;
          const isGreen = plan.accentColor === "green";
          const isAmber = plan.accentColor === "amber";

          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: plans.indexOf(plan) * 0.1 }}
              className={`rounded-3xl border backdrop-blur-xl transition-all duration-300 overflow-hidden ${plan.borderClass} ${
                isGreen
                  ? "bg-green-500/5 shadow-[0_0_60px_rgba(34,197,94,0.08)]"
                  : isAmber
                    ? "bg-amber-500/5"
                    : "bg-card/40"
              } ${plan.popular ? "lg:scale-[1.03] z-10 relative" : ""}`}
            >
              {plan.popular && (
                <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-bold uppercase tracking-widest py-2.5 text-center">
                  Most Popular — Recommended
                </div>
              )}

              <div className="p-8">
                {/* Header */}
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${plan.iconBg} border ${
                    isGreen
                      ? "border-green-500/30 text-green-400"
                      : isAmber
                        ? "border-amber-500/30 text-amber-400"
                        : "border-white/10 text-white"
                  }`}
                >
                  <Icon size={26} />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-1">
                  {pricing.plan.shortName}
                </h3>
                <p className="text-white/50 text-sm mb-6">{plan.tagline}</p>

                {/* Price */}
                {pricing.quoteOnly ? (
                  <>
                    <div className="mb-2">
                      <span className="text-4xl font-display font-bold text-white">
                        Custom quote
                      </span>
                    </div>
                    <p className="text-sm text-amber-300 font-medium mb-6">
                      Larger homes above 4,000 sqft need a review.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="flex items-end gap-1 mb-1">
                      <span className="text-5xl font-display font-bold text-white">
                        $
                        {billing === "yearly"
                          ? pricing.yearlyTotal.toFixed(2)
                          : pricing.monthlyPrice.toFixed(2)}
                      </span>
                      <span className="text-white/40 mb-2">
                        {billing === "yearly" ? "/yr" : "/mo"}
                      </span>
                    </div>
                    {billing === "yearly" ? (
                      <p className="text-sm text-green-400 font-medium mb-3">
                        Save ${pricing.annualSavings.toFixed(2)} vs monthly
                      </p>
                    ) : (
                      <p className="text-sm text-transparent select-none mb-3">
                        &nbsp;
                      </p>
                    )}
                    {billing === "yearly" ? (
                      <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-full mb-6">
                        <span>
                          <span className="line-through opacity-60 mr-1">
                            ${pricing.initialFee.toFixed(2)}
                          </span>
                          Initial fee waived!
                        </span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold px-3 py-1.5 rounded-full mb-6">
                        <span>
                          + ${pricing.initialFee.toFixed(2)} one-time initial fee
                        </span>
                      </div>
                    )}
                  </>
                )}

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3 mb-8 p-4 rounded-2xl bg-white/3 border border-white/5">
                  {[
                    { label: "Treatments", val: plan.treatment },
                    { label: "Coverage", val: plan.coverage },
                    { label: "Pests", val: plan.pests },
                    { label: "Response", val: plan.responseTime },
                  ].map(({ label, val }) => (
                    <div key={label} className="flex flex-col gap-0.5">
                      <span className="text-[10px] uppercase tracking-widest text-white/30 font-semibold">
                        {label}
                      </span>
                      <span className="text-xs font-semibold text-white/80">
                        {val}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  type="button"
                  onClick={() => onSelectPlan(plan.id, billing)}
                  className={`flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-display font-bold text-base mb-6 transition-all duration-300 group ${
                    isGreen
                      ? "bg-green-500 hover:bg-green-400 text-white hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]"
                      : isAmber
                        ? "bg-amber-500/10 border border-amber-500/50 hover:bg-amber-500/20 text-amber-400 hover:border-amber-400"
                        : "bg-white/5 border border-white/10 hover:bg-white/10 text-white"
                  }`}
                >
                  {pricing.quoteOnly ? "Request Custom Quote" : plan.cta}
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>

                {/* Feature list */}
                <div className="border-t border-white/8 pt-6 flex flex-col gap-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-1">
                    What's Included
                  </p>
                  {plan.features.map((f, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-3 ${!f.included ? "opacity-35" : ""}`}
                    >
                      {f.included ? (
                        <Check
                          size={16}
                          className={`flex-shrink-0 mt-0.5 ${
                            isGreen
                              ? "text-green-400"
                              : isAmber
                                ? "text-amber-400"
                                : "text-green-400"
                          }`}
                        />
                      ) : (
                        <X
                          size={16}
                          className="flex-shrink-0 mt-0.5 text-red-400"
                        />
                      )}
                      <span
                        className={`text-sm ${f.included ? "text-white/85" : "text-white/50 line-through"}`}
                      >
                        {f.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Back button */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 font-semibold text-sm transition-colors group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Change my address
        </button>
      </div>
    </motion.div>
  );
}
