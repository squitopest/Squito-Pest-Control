"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Check,
  X,
  Shield,
  Star,
  Zap,
  Phone,
  ArrowRight,
  ChevronDown,
  Bug,
  Leaf,
  Clock,
  BadgeCheck,
  AlertTriangle,
  FlaskConical,
  Droplets,
  MapPin,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";
import {
  DEFAULT_PROPERTY_SIZE,
  buildQuoteRequestHref,
  getPropertySizeConfig,
  getSubscriptionPricing,
  type PropertySize,
} from "@/data/plans";
import { getSpecialtyService } from "@/data/specialtyServices";
import PropertySizeSelector from "@/components/Plans/PropertySizeSelector";

const termiteInspectionService = getSpecialtyService("termite-inspection")!;
const stingingInsectService = getSpecialtyService("stinging-insect-treatment")!;
const eventMosquitoService = getSpecialtyService("event-mosquito-spray")!;

const plans = [
  {
    id: "essential-defense",
    tagline: "Great for first-time customers & smaller homes.",
    icon: Shield,
    accentColor: "zinc",
    borderClass: "border-border hover:border-tint-25",
    iconBg: "bg-tint-10",
    badgeClass: "",
    popular: false,
    cta: "Get Basic Shield",
    treatment: "Quarterly (4x/year)",
    coverage: "Exterior only",
    pests: "15+ common pests",
    responseTime: "Standard scheduling",
    features: [
      { label: "Quarterly exterior perimeter treatments", included: true },
      { label: "Coverage for 15+ common pest types", included: true },
      { label: "Free re-service if pests return between visits", included: true },
      { label: "Digital inspection report after each visit", included: true },
      { label: "24/7 online account & service portal access", included: true },
      { label: "Interior treatments", included: false },
      { label: "Rodent baiting & exclusion", included: false },
      { label: "Termite monitoring", included: false },
      { label: "Mosquito & tick yard barrier spray", included: false },
      { label: "Bed bug alert service", included: false },
      { label: "Dedicated service technician", included: false },
      { label: "Same-day service guarantee", included: false },
    ],
    bestFor: ["Apartments & condos", "Budget-conscious homeowners", "Low-infestation areas", "First-time pest control customers"],
    pestsIncluded: ["Ants", "Spiders", "Stink bugs", "Earwigs", "Centipedes", "Beetles", "Wasps (exterior nests)", "Crickets", "Silverfish"],
  },
  {
    id: "premium-shield",
    tagline: "Our most popular plan — full protection, inside and out.",
    icon: Star,
    accentColor: "green",
    borderClass: "border-green-500",
    iconBg: "bg-green-500/10",
    badgeClass: "most-popular",
    popular: true,
    cta: "Get Protected Now",
    treatment: "Quarterly (4x/year)",
    coverage: "Interior & Exterior",
    pests: "30+ pest types",
    responseTime: "Priority scheduling",
    features: [
      { label: "Quarterly interior & exterior treatments", included: true },
      { label: "Coverage for 30+ pest types", included: true },
      { label: "Free re-service guarantee — unlimited", included: true },
      { label: "Rodent baiting & exterior exclusion", included: true },
      { label: "Free yearly termite inspection ($150 value)", included: true },
      { label: "Priority scheduling — skip the queue", included: true },
      { label: "Digital inspection report after each visit", included: true },
      { label: "24/7 online account & service portal access", included: true },
      { label: "Mosquito & tick yard barrier spray", included: false },
      { label: "Bed bug alert service", included: false },
      { label: "Dedicated service technician", included: false },
      { label: "Same-day service guarantee", included: false },
    ],
    bestFor: ["Single-family homes", "Pet & kid households", "Year-round full coverage", "Anyone who's had rodent issues"],
    pestsIncluded: ["Everything in Essential", "Cockroaches", "Mice & Rats", "Termite inspection", "Fleas (interior)", "Bed bugs (initial check)", "Carpenter ants", "Hornets & yellow jackets"],
  },
  {
    id: "ultimate-fortress",
    tagline: "Total domination — yard, interior, and everything in between.",
    icon: Zap,
    accentColor: "amber",
    borderClass: "border-amber-500/70 hover:border-amber-400",
    iconBg: "bg-amber-500/10",
    badgeClass: "",
    popular: false,
    cta: "Go Total Shield",
    treatment: "Monthly mosquito + Quarterly pest",
    coverage: "Interior, Exterior & Yard",
    pests: "40+ pest types",
    responseTime: "Same-day guarantee",
    features: [
      { label: "Everything in Premium Shield", included: true },
      { label: "Monthly mosquito & tick yard barrier spray", included: true },
      { label: "Termite monitoring system installed", included: true },
      { label: "Bed bug alert & early detection service", included: true },
      { label: "Seasonal outdoor flea & tick coverage", included: true },
      { label: "Dedicated personal service technician", included: true },
      { label: "Same-day service guarantee (before 2 PM)", included: true },
      { label: "Priority emergency response", included: true },
      { label: "Annual whole-home pest audit report", included: true },
      { label: "Coverage for 40+ pest types", included: true },
      { label: "Unlimited interior re-services", included: true },
      { label: "Digital inspection report after each visit", included: true },
    ],
    bestFor: ["Large properties & estates", "Families with young children or pets", "Homeowners near wooded or marshy areas", "Anyone wanting total peace of mind"],
    pestsIncluded: ["Everything in Premium Shield", "Mosquitoes (monthly spray)", "Ticks (monthly spray)", "Fleas (outdoor seasonal)", "Termites (monitoring)", "Bed bugs (full alert service)"],
  },
 ] as const;

const faqs = [
  {
    q: "Are there any contracts or cancellation fees?",
    a: "Absolutely not. All Squito Pest Control plans are month-to-month with zero contracts and zero cancellation fees. You can pause or cancel anytime directly from your account portal.",
  },
  {
    q: "What happens if pests come back between visits?",
    a: "We come back — for free. All plans include unlimited re-service calls if covered pests return between your scheduled treatments. Just call or submit a request online.",
  },
  {
    q: "Are your treatments safe for pets and children?",
    a: "Yes. We use EPA-registered, low-toxicity products with dry times under 30 minutes for interior treatments. We'll walk you through any precautions before every service.",
  },
  {
    q: "How quickly can I get my first appointment?",
    a: "We offer same-day service for bookings placed before 2 PM (Ultimate Fortress plan) and next-day availability for all other plans in most Nassau and Suffolk County zip codes.",
  },
  {
    q: "Do you service commercial properties?",
    a: "Yes — all plans are available for both residential and light commercial properties. For larger commercial facilities, contact us for a custom quote.",
  },
  {
    q: "Can I switch plans after signing up?",
    a: "Of course. You can upgrade or downgrade your plan at any time from your account portal or by calling us. Changes take effect at your next service visit.",
  },
];

const oneTimeServices = [
  {
    ...termiteInspectionService,
    label: "flat rate",
    icon: FlaskConical,
    price: termiteInspectionService.pricing.model === "flat" ? termiteInspectionService.pricing.price : 0,
    desc: termiteInspectionService.description,
    includes: termiteInspectionService.highlights,
    theme: "border-border bg-card/40 hover:border-tint-25",
    accentColor: "text-zinc-300",
    gradient: "conic-gradient(from var(--angle, 0deg), #52525b, #3f3f46, #27272a, #71717a, #52525b)",
  },
  {
    ...stingingInsectService,
    label: "starting at",
    icon: Bug,
    price: stingingInsectService.pricing.model === "toggle" ? stingingInsectService.pricing.basePrice : 0,
    desc: stingingInsectService.description,
    includes: stingingInsectService.highlights,
    theme: "border-amber-500/50 bg-amber-500/5 hover:border-amber-400",
    accentColor: "text-amber-400",
    gradient: "conic-gradient(from var(--angle, 0deg), #f59e0b, #d97706, #b45309, #fbbf24, #f59e0b)",
  },
  {
    ...eventMosquitoService,
    label: "starting at",
    icon: Droplets,
    price: 199,
    desc: eventMosquitoService.description,
    includes: eventMosquitoService.highlights,
    theme: "border-blue-500/40 bg-blue-500/5 hover:border-blue-400/60",
    accentColor: "text-blue-400",
    gradient: "conic-gradient(from var(--angle, 0deg), #3b82f6, #2563eb, #1d4ed8, #60a5fa, #3b82f6)",
  },
];

function PlansContentInner() {
  const searchParams = useSearchParams();
  const town = searchParams.get("town");
  const initialSize = searchParams.get("size");
  const [billing, setBilling] = useState<"monthly" | "yearly" | "onetime">("monthly");
  const [propertySize, setPropertySize] = useState<PropertySize>(
    initialSize === "small" || initialSize === "medium" || initialSize === "large" || initialSize === "xl"
      ? initialSize
      : DEFAULT_PROPERTY_SIZE
  );
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");

    try {
      const parts = formData.name.trim().split(" ");
      const firstName = parts[0] || "Unknown";
      const lastName = parts.slice(1).join(" ") || " ";

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email: formData.email,
          phone: "Message sent from Plans Page",
          street: "N/A",
          city: "N/A",
          zip: "N/A",
          service: "Plans Page General Inquiry",
          message: formData.message,
        }),
      });

      if (!res.ok) throw new Error("Failed to send");
      setFormStatus("success");
      setTimeout(() => {
        setFormStatus("idle");
        setShowContactForm(false);
        setFormData({ name: "", email: "", message: "" });
      }, 3000);
    } catch {
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 3000);
    }
  };

  return (
    <main className="min-h-screen bg-background">

      {/* ── Hero ── */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider uppercase mb-8">
            <Shield size={14} /> Protection Plans
          </div>

          {/* Personalized town banner */}
          {town && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-5 py-2 rounded-full text-sm font-bold tracking-wide mb-6"
            >
              <MapPin size={14} />
              Showing plans for {town}, NY
            </motion.div>
          )}

          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight leading-[1.05]">
            {town ? (
              <>
                Protection Plans for<br />
                <span className="inline-flex flex-wrap justify-center gap-x-[0.25em] bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                  {`${town} Residents`.split(" ").map((word, i) => (
                    <motion.span
                      key={word + i}
                      initial={{ opacity: 0, y: 32 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.55,
                        delay: 0.3 + i * 0.12,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="inline-block"
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
              </>
            ) : (
              <>
                Pick your plan.<br />
                <span className="inline-flex flex-wrap justify-center gap-x-[0.25em] bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                  {["We", "handle", "the", "rest."].map((word, i) => (
                    <motion.span
                      key={word}
                      initial={{ opacity: 0, y: 32 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.55,
                        delay: 0.3 + i * 0.12,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="inline-block"
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
              </>
            )}
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            {town
              ? `Squito Pest Control proudly services ${town} and surrounding areas. Every plan includes free re-service, no contracts, and our satisfaction guarantee.`
              : "Every plan includes free re-service, no contracts, and the Squito Pest Control guarantee. Choose the level of coverage that fits your home and lifestyle."
            }
          </p>

          {billing !== "onetime" && (
            <div className="w-full max-w-5xl mx-auto mb-8">
              <PropertySizeSelector value={propertySize} onChange={setPropertySize} />
            </div>
          )}

          {/* Billing toggle */}
          <div className="flex flex-col sm:flex-row p-1.5 gap-1 bg-card/80 border border-border rounded-3xl sm:rounded-full backdrop-blur-md w-full max-w-sm sm:max-w-max mx-auto mb-12">
            <button
              type="button"
              aria-pressed={billing === "monthly"}
              className={`w-full sm:w-auto justify-center px-6 py-3 sm:py-2 rounded-2xl sm:rounded-full font-semibold text-sm transition-all flex items-center ${billing === "monthly" ? "bg-white/10 text-white shadow" : "text-white/60 hover:text-white"}`}
              onClick={() => setBilling("monthly")}
            >
              Monthly
            </button>
            <button
              type="button"
              aria-pressed={billing === "yearly"}
              className={`w-full sm:w-auto justify-center px-6 py-3 sm:py-2 rounded-2xl sm:rounded-full font-semibold text-sm transition-all flex items-center gap-2 ${billing === "yearly" ? "bg-white/10 text-white shadow" : "text-white/60 hover:text-white"}`}
              onClick={() => setBilling("yearly")}
            >
              Yearly
              <span className="bg-green-500 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-md">Save 20%</span>
            </button>
            <button
              type="button"
              aria-pressed={billing === "onetime"}
              className={`w-full sm:w-auto justify-center px-6 py-3 sm:py-2 rounded-2xl sm:rounded-full font-semibold text-sm transition-all flex items-center gap-2 ${billing === "onetime" ? "bg-white/10 text-white shadow" : "text-white/60 hover:text-white"}`}
              onClick={() => setBilling("onetime")}
            >
              Specialty
              <span className="bg-blue-500/80 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-md">One-Time</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── Plan Cards ── */}
      {billing !== "onetime" && (
      <section className="pb-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {plans.map((plan) => {
              const pricing = getSubscriptionPricing(plan.id, propertySize);
              if (!pricing) return null;

              const Icon = plan.icon;
              const isGreen = plan.accentColor === "green";
              const isAmber = plan.accentColor === "amber";
              const quoteHref = buildQuoteRequestHref({
                planId: plan.id,
                size: propertySize,
                billing,
                source: "plans page",
              });
              return (
                <div
                  key={plan.id}
                  className={`rounded-3xl border backdrop-blur-xl transition-all duration-300 overflow-hidden ${plan.borderClass} ${
                    isGreen ? "bg-green-500/5 shadow-[0_0_60px_rgba(34,197,94,0.08)]" :
                    isAmber ? "bg-amber-500/5" : "bg-card/40"
                  } ${plan.popular ? "lg:scale-[1.03] z-10 relative" : ""}`}
                >
                  {plan.popular && (
                    <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-bold uppercase tracking-widest py-2.5 text-center">
                      ⭐ Most Popular — Recommended
                    </div>
                  )}

                  <div className="p-8">
                    {/* Header */}
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${plan.iconBg} border ${isGreen ? "border-green-500/30 text-green-400" : isAmber ? "border-amber-500/30 text-amber-400" : "border-white/10 text-white"}`}>
                      <Icon size={26} />
                    </div>
                    <h2 className="text-2xl font-display font-bold text-white mb-1">{pricing.plan.shortName}</h2>
                    <p className="text-white/50 text-sm mb-6">{plan.tagline}</p>

                    {/* Price */}
                    {pricing.quoteOnly ? (
                      <>
                        <div className="mb-2">
                          <span className="text-4xl font-display font-bold text-white">Custom quote</span>
                        </div>
                        <p className="text-sm text-amber-300 font-medium mb-6">
                          Larger homes above 4,000 sqft need a fast review before we price them accurately.
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="flex items-end gap-1 mb-1">
                          <span className="text-5xl font-display font-bold text-white">
                            ${billing === "yearly" ? pricing.yearlyTotal.toFixed(2) : pricing.monthlyPrice.toFixed(2)}
                          </span>
                          <span className="text-white/40 mb-2">{billing === "yearly" ? "/yr" : "/mo"}</span>
                        </div>
                        {billing === "yearly" ? (
                          <p className="text-sm text-green-400 font-medium mb-3">
                            Save ${pricing.annualSavings.toFixed(2)} vs monthly
                          </p>
                        ) : (
                          <p className="text-sm text-transparent select-none mb-3">&nbsp;</p>
                        )}
                        {billing === "yearly" ? (
                          <div className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-full mb-6">
                            <span>
                              <span className="line-through opacity-60 mr-1">${pricing.initialFee.toFixed(2)}</span>
                              One-time annual payment today. Initial fee waived!
                            </span>
                          </div>
                        ) : (
                          <div className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold px-3 py-1.5 rounded-full mb-6">
                            <span>+ ${pricing.initialFee.toFixed(2)} one-time initial service fee</span>
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
                          <span className="text-[10px] uppercase tracking-widest text-white/30 font-semibold">{label}</span>
                          <span className="text-xs font-semibold text-white/80">{val}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <Link
                      href={
                        pricing.quoteOnly
                          ? quoteHref
                          : `/book?plan=${plan.id}&billing=${billing}&size=${propertySize}`
                      }
                      className={`flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-display font-bold text-base mb-8 transition-all duration-300 group ${
                        isGreen
                          ? "bg-green-500 hover:bg-green-400 text-white hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]"
                          : isAmber
                          ? "bg-amber-500/10 border border-amber-500/50 hover:bg-amber-500/20 text-amber-400 hover:border-amber-400"
                          : "bg-white/5 border border-white/10 hover:bg-white/10 text-white"
                      }`}
                    >
                      {pricing.quoteOnly ? "Request Custom Quote" : plan.cta}
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>

                    {/* Feature list */}
                    <div className="border-t border-white/8 pt-6 flex flex-col gap-3">
                      <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-1">What's Included</p>
                      {plan.features.map((f, i) => (
                        <div key={i} className={`flex items-start gap-3 ${!f.included ? "opacity-35" : ""}`}>
                          {f.included
                            ? <Check size={16} className={`flex-shrink-0 mt-0.5 ${isGreen ? "text-green-400" : isAmber ? "text-amber-400" : "text-green-400"}`} />
                            : <X size={16} className="flex-shrink-0 mt-0.5 text-red-400" />
                          }
                          <span className={`text-sm ${f.included ? "text-white/85" : "text-white/50 line-through"}`}>{f.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {/* ── Specialty Service Cards ── */}
      {billing === "onetime" && (
      <section className="pb-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-300 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider uppercase mb-5">
              <Bug size={14} />
              Specialty Services
            </div>
            <h2 className="text-4xl font-display font-bold text-white mb-4">
              One-time treatments for specific pest issues.
            </h2>
            <p className="text-white/55 text-lg leading-relaxed">
              Use these as quick entry points into the specialty catalog for targeted service pages, live pricing, and one-time checkout.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-10">
            {oneTimeServices.map((svc) => {
              return (
                <div key={svc.id} className={`rounded-3xl border overflow-hidden backdrop-blur-xl transition-all duration-300 ${svc.theme}`}>
                  {/* Hero Image */}
                  <div className="relative h-56 w-full overflow-hidden">
                    <img
                      src={svc.image}
                      alt={svc.name}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                  <div className="p-8">
                  <div className="mb-8 border-b border-white/10 pb-8">
                    <h2 className="text-2xl font-display font-bold text-white mb-2">{svc.name}</h2>
                    <p className="text-white/50 text-sm mb-6">{svc.desc}</p>
                    <div className="flex items-end gap-1 mb-1">
                      <span className="text-5xl font-display font-bold text-white">${svc.price}</span>
                      <span className="text-white/40 mb-2 text-sm">{svc.label}</span>
                    </div>
                    <p className="text-xs text-white/40 mt-1">One-time service</p>
                  </div>
                  <div className="flex flex-col gap-4 mb-8">
                    {svc.includes.map((item, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <Check size={16} className={`flex-shrink-0 mt-0.5 ${svc.accentColor}`} />
                        <span className="text-sm text-white/85">{item}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href={`/services/specialty/${svc.slug}`}
                    className={`group flex items-center justify-center gap-2 w-full py-4 rounded-2xl border font-display font-bold text-base transition-all duration-300 hover:bg-white/5 ${svc.accentColor}`}
                  >
                    View Service
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center">
            <Link
              href="/services/specialty"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-8 py-4 font-display font-bold text-white transition-colors hover:bg-white/10"
            >
              Browse All Specialty Services
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      )}

      {/* ── Best For + Pests Covered ── */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-white mb-4">Plan Deep Dive</h2>
            <p className="text-white/50 text-lg">
              See exactly who each plan is built for and what pests it covers for {getPropertySizeConfig(propertySize).label.toLowerCase()} homes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => {
              const pricing = getSubscriptionPricing(plan.id, propertySize);
              if (!pricing) return null;

              const Icon = plan.icon;
              const isGreen = plan.accentColor === "green";
              const isAmber = plan.accentColor === "amber";
              const accentText = isGreen ? "text-green-400" : isAmber ? "text-amber-400" : "text-zinc-400";
              const accentBg = isGreen ? "bg-green-500/10 border-green-500/20" : isAmber ? "bg-amber-500/10 border-amber-500/20" : "bg-tint-5 border-tint-10";

              return (
                <div key={plan.id} className="rounded-3xl bg-card/30 border border-white/8 p-8 flex flex-col gap-8">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${accentBg} border`}>
                      <Icon size={20} className={accentText} />
                    </div>
                    <h3 className="font-display font-bold text-white text-lg">{pricing.plan.shortName}</h3>
                  </div>

                  <div>
                    <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${accentText}`}>Best For</p>
                    <ul className="flex flex-col gap-2">
                      {plan.bestFor.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-base text-white/75">
                          <Leaf size={14} className={accentText} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${accentText}`}>Pests Covered</p>
                    <div className="flex flex-wrap gap-2">
                      {plan.pestsIncluded.map((pest) => (
                        <span key={pest} className={`text-sm px-3 py-1.5 rounded-full border font-medium ${accentBg} ${accentText}`}>
                          {pest}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={
                      pricing.quoteOnly
                        ? buildQuoteRequestHref({
                            planId: plan.id,
                            size: propertySize,
                            billing: "monthly",
                            source: "plans page deep dive",
                          })
                        : `/book?plan=${plan.id}&billing=monthly&size=${propertySize}`
                    }
                    className={`mt-auto flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all group border ${accentBg} ${accentText} hover:opacity-80`}
                  >
                    {pricing.quoteOnly ? "Request Quote" : "Book This Plan"} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Guarantees Strip ── */}
      <section className="py-16 border-t border-white/5">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: BadgeCheck, title: "100% Satisfaction Guarantee", desc: "If you're not happy after your first service, we'll refund your first month — no questions asked." },
              { icon: AlertTriangle, title: "Free Re-Service Promise", desc: "If covered pests return between scheduled visits, we come back at no charge. Every single time." },
              { icon: Clock, title: "No Contracts. Ever.", desc: "Cancel anytime with zero fees. We earn your business every month through results, not fine print." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-start gap-4 p-6 rounded-2xl bg-green-500/5 border border-green-500/15">
                <div className="w-10 h-10 rounded-xl bg-green-500/15 flex items-center justify-center">
                  <Icon size={20} className="text-green-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">{title}</h3>
                  <p className="text-sm text-white/55 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-display font-bold text-white mb-4">Common Questions</h2>
            <p className="text-white/50">Everything you need to know before you book.</p>
          </div>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/8 bg-card/30 overflow-hidden transition-all duration-300"
              >
                <button
                  type="button"
                  aria-expanded={openFaq === i}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
                >
                  <span className="font-semibold text-white/90 group-hover:text-white transition-colors">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`flex-shrink-0 text-white/40 transition-transform duration-300 ${openFaq === i ? "rotate-180 text-green-400" : ""}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-white/65 text-base leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Not sure which plan?<br />
            <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">Just call us.</span>
          </h2>
          <p className="text-white/55 text-lg mb-10">
            Our team will assess your home and recommend the right plan — always free of charge, never high pressure.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 w-full max-w-lg mx-auto">
            {!showContactForm ? (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                <a
                  href="tel:6312031000"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-green-500 hover:bg-green-400 text-white font-bold text-lg transition-all hover:shadow-[0_0_40px_rgba(34,197,94,0.5)] group"
                >
                  <Phone size={20} />
                  (631) 203-1000
                </a>
                <button
                  type="button"
                  onClick={() => setShowContactForm(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-white font-semibold transition-all group"
                >
                  Or send us a message <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="w-full bg-background border border-border rounded-3xl p-6 shadow-2xl animate-fade-in-up text-left flex flex-col gap-4">
                {formStatus === "success" ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center animate-fade-in-up gap-4">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">
                      <CheckCircle2 size={32} />
                    </div>
                    <span className="font-bold text-white text-lg">Message Sent!</span>
                    <span className="text-white/60 text-sm">We'll get back to you shortly.</span>
                  </div>
                ) : (
                  <>
                    <h4 className="text-xl font-bold text-white mb-2">How can we help?</h4>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-green-500/50"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <input
                      type="email"
                      required
                      placeholder="Your Email Address"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-green-500/50"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <textarea
                      required
                      rows={3}
                      placeholder="Write your message here..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-green-500/50 resize-none"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                    {formStatus === "error" && (
                      <p className="text-red-400 text-sm text-center">There was an issue sending your message. Please call us instead.</p>
                    )}
                    <div className="flex gap-3 mt-2">
                      <button 
                        type="button" 
                        onClick={() => setShowContactForm(false)} 
                        className="flex-1 py-3 rounded-xl border border-white/10 text-white/70 hover:bg-white/5 transition-colors font-semibold"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        disabled={formStatus === "loading"}
                        className="flex-[2] py-3 rounded-xl bg-green-500 text-white font-bold hover:bg-green-400 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {formStatus === "loading" ? <Loader2 size={18} className="animate-spin" /> : "Send Now"}
                      </button>
                    </div>
                  </>
                )}
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function PlansContent() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-white/50">Loading Plans...</p>
      </main>
    }>
      <PlansContentInner />
    </Suspense>
  );
}
