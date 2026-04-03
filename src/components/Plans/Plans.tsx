"use client";

import { useState } from "react";
import { Check, Zap, Shield, Star } from "lucide-react";

const plans = [
  {
    name: "Basic Shield",
    price: { monthly: 1, yearly: 1 },
    id: "basic-shield",
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
    name: "Home Protection",
    price: { monthly: 1, yearly: 1 },
    id: "home-protection",
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
    name: "Total Shield",
    price: { monthly: 1, yearly: 1 },
    id: "total-shield",
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

export default function Plans() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <section className="py-24 relative" id="plans">
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

          <div className="inline-flex p-1.5 bg-card/80 border border-border rounded-full backdrop-blur-md">
            <button
              className={`px-6 py-2 rounded-full font-semibold text-sm transition-all ${
                billing === "monthly" ? "bg-white/10 text-white shadow" : "text-white/60 hover:text-white"
              }`}
              onClick={() => setBilling("monthly")}
            >
              Monthly
            </button>
            <button
              className={`px-6 py-2 rounded-full font-semibold text-sm transition-all flex items-center gap-2 ${
                billing === "yearly" ? "bg-white/10 text-white shadow" : "text-white/60 hover:text-white"
              }`}
              onClick={() => setBilling("yearly")}
            >
              Yearly
              <span className="bg-green-500 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-md">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`rounded-3xl border p-8 transition-all duration-300 backdrop-blur-xl ${plan.theme}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-green-400 to-green-600 text-white text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full shadow-lg">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8 border-b border-white/10 pb-8">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 text-white border border-white/10">
                  <plan.icon size={24} />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-white/60 text-sm h-10 mb-6">{plan.desc}</p>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-4xl font-display font-bold text-white">${plan.price[billing]}</span>
                  <span className="text-white/50 mb-1">/mo</span>
                </div>
                {billing === "yearly" ? (
                  <p className="text-sm text-green-400 font-medium">Billed ${plan.price.yearly * 12}/year</p>
                ) : (
                  <p className="text-sm text-transparent select-none">&nbsp;</p>
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

              <a
                href={`/book?plan=${plan.id}&billing=${billing}`}
                className="group relative w-full mt-auto block overflow-hidden rounded-xl p-[1px] focus:outline-none focus:ring-2 focus:ring-green-500/50"
              >
                {/* Animated rotating gradient border */}
                <span
                  className="absolute inset-0 rounded-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: plan.id === "home-protection" ? "conic-gradient(from var(--angle, 0deg), #22c55e, #16a34a, #15803d, #4ade80, #22c55e)" : 
                                plan.id === "total-shield" ? "conic-gradient(from var(--angle, 0deg), #f59e0b, #d97706, #b45309, #fbbf24, #f59e0b)" : 
                                "conic-gradient(from var(--angle, 0deg), #52525b, #3f3f46, #27272a, #71717a, #52525b)",
                    animation: "spin-border 3s linear infinite",
                  }}
                />
                
                {/* Fill container */}
                <span className={`relative flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-background/90 backdrop-blur-xl font-display font-bold text-base transition-all duration-500 ${
                  plan.id === "home-protection" ? "group-hover:bg-green-500/10 text-white" : 
                  plan.id === "total-shield" ? "group-hover:bg-amber-500/10 text-amber-500 group-hover:text-amber-400" : 
                  "group-hover:bg-white/5 text-white/90 group-hover:text-white"
                }`}>
                  {/* Inner shimmer sweep */}
                  <span className={`absolute inset-0 rounded-xl -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent to-transparent ${
                    plan.id === "home-protection" ? "via-green-400/20" : 
                    plan.id === "total-shield" ? "via-amber-400/20" : 
                    "via-white/10"
                  }`} />
                  
                  {/* Glow blob */}
                  <span className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    plan.id === "home-protection" ? "shadow-[inset_0_0_20px_rgba(34,197,94,0.1)]" : 
                    plan.id === "total-shield" ? "shadow-[inset_0_0_20px_rgba(245,158,11,0.1)]" : 
                    "shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]"
                  }`} />
                  
                  <span className="relative z-10">{plan.cta}</span>
                </span>
                
                {/* CSS defined per-component for @property fallback */}
                <style>{`
                  @property --angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
                  @keyframes spin-border { to { --angle: 360deg; } }
                `}</style>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
