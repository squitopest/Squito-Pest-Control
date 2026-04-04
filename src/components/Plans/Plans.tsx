"use client";

import { useState } from "react";
import { Check, Zap, Shield, Star, FlaskConical, Bug, Droplets, ArrowRight } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Essential Defense",
    price: { monthly: 49.99, yearly: 39.99 },
    initialFee: 199.99,
    id: "essential-defense",
    desc: "Perfect for smaller homes or first-time customers.",
    icon: Shield,
    features: [
      "Quarterly exterior treatments",
      "Common pest coverage",
      "Free re-service if pests return",
      "Digital inspection report",
      "24/7 online account access",
    ],
    notIncluded: ["Termite monitoring", "Mosquito/tick barrier", "Interior treatments"],
    popular: false,
    cta: "Get Basic Shield",
    theme: "border-border bg-card/40 hover:border-green-500/30",
    btnTheme: "bg-transparent border border-border hover:bg-white/5 text-white",
  },
  {
    name: "Premium Shield",
    price: { monthly: 89.99, yearly: 71.99 },
    initialFee: 299.99,
    id: "premium-shield",
    desc: "Most popular — full protection, inside and out.",
    icon: Star,
    features: [
      "Quarterly interior & exterior treatments",
      "30+ pest types covered",
      "Rodent baiting & exclusion",
      "Free re-service guarantee",
      "Free yearly termite inspection",
      "Priority scheduling",
      "Digital inspection report",
    ],
    notIncluded: ["Mosquito/tick barrier"],
    popular: true,
    cta: "Get Protected Now",
    theme: "border-green-500 bg-green-500/5 hover:shadow-[0_0_40px_rgba(34,197,94,0.15)] relative scale-100 lg:scale-[1.02] z-10",
    btnTheme: "btn-primary w-full justify-center",
  },
  {
    name: "Ultimate Fortress",
    price: { monthly: 129.99, yearly: 103.99 },
    initialFee: 399.99,
    id: "ultimate-fortress",
    desc: "Total coverage — yard, interior, and everything in between.",
    icon: Zap,
    features: [
      "Everything in Home Protection",
      "Monthly mosquito & tick yard spray",
      "Termite monitoring included",
      "Bed bug alert service",
      "Seasonal outdoor flea coverage",
      "Dedicated service technician",
      "Same-day guarantee",
    ],
    notIncluded: [],
    popular: false,
    cta: "Go Total Shield",
    theme: "border-amber-500/50 bg-card/40 hover:border-amber-500/80",
    btnTheme: "bg-transparent border border-amber-500/50 hover:bg-amber-500/10 text-amber-500",
  },
];

const oneTimeServices = [
  {
    name: "Termite Inspection",
    price: 149,
    label: "flat rate",
    image: "/termite-inspection.png",
    id: "termite-inspection",
    icon: FlaskConical,
    desc: "Full property inspection for termite activity, damage, and risk areas.",
    includes: [
      "Complete interior & exterior inspection",
      "Digital inspection report with photos",
      "Damage & risk area assessment",
      "Treatment recommendations if needed",
      "Certificate of inspection provided",
      "NPMA-33 for real estate transactions.",
    ],
    theme: "border-zinc-700 bg-card/40 hover:border-zinc-500",
    accentColor: "text-zinc-300",
    gradient: "conic-gradient(from var(--angle, 0deg), #52525b, #3f3f46, #27272a, #71717a, #52525b)",
  },
  {
    name: "Wasp Nest Removal",
    price: 249,
    label: "starting at",
    image: "/hornet-nest.png",
    id: "wasp-removal",
    icon: Bug,
    desc: "Safe, same-day removal of active wasp, hornet, and yellow jacket nests.",
    includes: [
      "On-site nest identification & assessment",
      "Safe chemical-free or treated removal",
      "Entry point sealing recommendations",
      "30-day guarantee — if they return, we do too",
    ],
    theme: "border-amber-500/50 bg-amber-500/5 hover:border-amber-400",
    accentColor: "text-amber-400",
    gradient: "conic-gradient(from var(--angle, 0deg), #f59e0b, #d97706, #b45309, #fbbf24, #f59e0b)",
  },
  {
    name: "Mosquito Event Spray",
    price: 199,
    label: "starting at",
    image: "/backyard-bbq.png",
    id: "mosquito-event-spray",
    icon: Droplets,
    desc: "One-time yard barrier spray — ideal before outdoor events, BBQs, or parties.",
    includes: [
      "Full perimeter & yard spray treatment",
      "Effective within 30 minutes of application",
      "Results last up to 3 weeks",
      "Safe for pets & children after 45-min dry time",
      "Available same-day for bookings before 1 PM",
    ],
    theme: "border-blue-500/40 bg-blue-500/5 hover:border-blue-400/60",
    accentColor: "text-blue-400",
    gradient: "conic-gradient(from var(--angle, 0deg), #3b82f6, #2563eb, #1d4ed8, #60a5fa, #3b82f6)",
  },
];

export default function Plans() {
  const [billing, setBilling] = useState<"monthly" | "yearly" | "onetime">("monthly");

  return (
    <section className="py-16 md:py-24 relative" id="plans">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="flex flex-col items-center text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider uppercase mb-6">
            <Shield size={14} />
            Protection Plans
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white tracking-tight">
            Simple Plans.{" "}
            <span className="gradient-text">Real Results.</span>
          </h2>
          <p className="text-white/70 max-w-2xl text-lg mb-8">
            Pick your plan. No contracts. Cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="flex flex-col sm:flex-row p-1.5 gap-1 bg-card/80 border border-border rounded-3xl sm:rounded-full backdrop-blur-md w-full max-w-sm sm:max-w-max mx-auto">
            <button
              className={`w-full sm:w-auto justify-center px-6 py-3 sm:py-2 rounded-2xl sm:rounded-full font-semibold text-sm transition-all ${
                billing === "monthly" ? "bg-white/10 text-white shadow" : "text-white/60 hover:text-white"
              }`}
              onClick={() => setBilling("monthly")}
            >
              Monthly
            </button>
            <button
              className={`w-full sm:w-auto justify-center px-6 py-3 sm:py-2 rounded-2xl sm:rounded-full font-semibold text-sm transition-all flex items-center gap-2 ${
                billing === "yearly" ? "bg-white/10 text-white shadow" : "text-white/60 hover:text-white"
              }`}
              onClick={() => setBilling("yearly")}
            >
              Yearly
              <span className="bg-green-500 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-md">Save 20%</span>
            </button>
            <button
              className={`w-full sm:w-auto justify-center px-6 py-3 sm:py-2 rounded-2xl sm:rounded-full font-semibold text-sm transition-all flex items-center gap-2 ${
                billing === "onetime" ? "bg-white/10 text-white shadow" : "text-white/60 hover:text-white"
              }`}
              onClick={() => setBilling("onetime")}
            >
              One-Time
              <span className="bg-blue-500/80 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-md">No Sub</span>
            </button>
          </div>
        </div>

        {/* ── Subscription Plan Cards ── */}
        {billing !== "onetime" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`rounded-3xl border p-6 md:p-8 transition-all duration-300 backdrop-blur-xl ${plan.theme}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-green-400 to-green-600 text-white text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full shadow-lg">
                    ⭐ Most Popular
                  </div>
                )}
                
                <div className="mb-8 border-b border-white/10 pb-8">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 text-white border border-white/10">
                    <plan.icon size={24} />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-white/60 text-sm h-10 mb-6">{plan.desc}</p>
                  <div className="flex items-end gap-1 mb-2">
                    <span className="text-4xl font-display font-bold text-white">
                      ${billing === "yearly" ? (plan.price.yearly * 12).toFixed(2) : plan.price.monthly}
                    </span>
                    <span className="text-white/50 mb-1">{billing === "yearly" ? "/yr" : "/mo"}</span>
                  </div>
                  {billing === "yearly" ? (
                    <p className="text-sm text-green-400 font-medium">Save ${(plan.price.monthly * 12 - plan.price.yearly * 12).toFixed(2)} vs monthly</p>
                  ) : (
                    <p className="text-sm text-transparent select-none">&nbsp;</p>
                  )}
                  {billing === "yearly" ? (
                    <p className="text-xs text-emerald-400 font-semibold mt-1">
                      <span className="line-through text-emerald-400/50 mr-1">${plan.initialFee.toFixed(2)}</span> Initial fee waived!
                    </p>
                  ) : (
                    <p className="text-xs text-amber-400/90 font-semibold mt-1">
                      + ${plan.initialFee.toFixed(2)} one-time initial service fee
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-4 mb-8">
                  {plan.features.map((f, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <Check size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white/90">{f}</span>
                    </div>
                  ))}
                  {plan.notIncluded.map((f, j) => (
                    <div key={j} className="flex items-start gap-3 opacity-50">
                      <span className="text-red-400 flex-shrink-0 font-bold select-none text-sm mt-0.5">✕</span>
                      <span className="text-sm text-white/70 line-through">{f}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href={`/book?plan=${plan.id}&billing=${billing}`}
                  className="group relative w-full mt-auto block overflow-hidden rounded-xl p-[1px] focus:outline-none focus:ring-2 focus:ring-green-500/50"
                >
                  <span
                    className="absolute inset-0 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: plan.id === "premium-shield" ? "conic-gradient(from var(--angle, 0deg), #22c55e, #16a34a, #15803d, #4ade80, #22c55e)" : 
                                  plan.id === "ultimate-fortress" ? "conic-gradient(from var(--angle, 0deg), #f59e0b, #d97706, #b45309, #fbbf24, #f59e0b)" : 
                                  "conic-gradient(from var(--angle, 0deg), #52525b, #3f3f46, #27272a, #71717a, #52525b)",
                      animation: "spin-border 3s linear infinite",
                    }}
                  />
                  <span className={`relative flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-background/90 backdrop-blur-xl font-display font-bold text-base transition-all duration-500 ${
                    plan.id === "premium-shield" ? "group-hover:bg-green-500/10 text-white" : 
                    plan.id === "ultimate-fortress" ? "group-hover:bg-amber-500/10 text-amber-500 group-hover:text-amber-400" : 
                    "group-hover:bg-white/5 text-white/90 group-hover:text-white"
                  }`}>
                    <span className={`absolute inset-0 rounded-xl -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent to-transparent ${
                      plan.id === "premium-shield" ? "via-green-400/20" : 
                      plan.id === "ultimate-fortress" ? "via-amber-400/20" : 
                      "via-white/10"
                    }`} />
                    <span className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                      plan.id === "premium-shield" ? "shadow-[inset_0_0_20px_rgba(34,197,94,0.1)]" : 
                      plan.id === "ultimate-fortress" ? "shadow-[inset_0_0_20px_rgba(245,158,11,0.1)]" : 
                      "shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]"
                    }`} />
                    <span className="relative z-10">{plan.cta}</span>
                  </span>
                  <style>{`
                    @property --angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
                    @keyframes spin-border { to { --angle: 360deg; } }
                  `}</style>
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* ── One-Time Service Cards ── */}
        {billing === "onetime" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {oneTimeServices.map((svc, i) => (
              <div
                key={i}
                className={`rounded-3xl border overflow-hidden transition-all duration-300 backdrop-blur-xl ${svc.theme}`}
              >
                {/* Hero Image */}
                <div className="relative h-52 w-full overflow-hidden">
                  <img
                    src={svc.image}
                    alt={svc.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <div className="p-6 md:p-8">
                <div className="mb-8 border-b border-white/10 pb-8">
                  <h3 className="text-2xl font-display font-bold text-white mb-2">{svc.name}</h3>
                  <p className="text-white/60 text-sm mb-6">{svc.desc}</p>
                  <div className="flex items-end gap-1 mb-1">
                    <span className="text-4xl font-display font-bold text-white">${svc.price}</span>
                    <span className="text-white/50 mb-1 text-sm">{svc.label}</span>
                  </div>
                  <p className="text-xs text-white/40 font-medium mt-1">No subscription required</p>
                </div>

                <div className="flex flex-col gap-4 mb-8">
                  {svc.includes.map((f, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <Check size={18} className={`flex-shrink-0 mt-0.5 ${svc.accentColor}`} />
                      <span className="text-sm text-white/90">{f}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href={`/book?plan=${svc.id}&billing=onetime`}
                  className="group relative w-full mt-auto block overflow-hidden rounded-xl p-[1px] focus:outline-none"
                >
                  <span
                    className="absolute inset-0 rounded-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: svc.gradient,
                      animation: "spin-border 3s linear infinite",
                    }}
                  />
                  <span className={`relative flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-background/90 backdrop-blur-xl font-display font-bold text-base transition-all duration-500 group-hover:bg-white/5 ${svc.accentColor}`}>
                    <span className="absolute inset-0 rounded-xl -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    <span className="relative z-10 flex items-center gap-2">
                      Book Now <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </span>
                </Link>
                </div>{/* end p-6 md:p-8 */}
              </div>
            ))}

          </div>
        )}
      </div>
    </section>
  );
}
