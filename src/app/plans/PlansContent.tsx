"use client";

import { Suspense, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Shield,
  Star,
  Zap,
  Phone,
  ChevronDown,
  Leaf,
  Clock,
  BadgeCheck,
  AlertTriangle,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import Footer from "@/components/Footer/Footer";
import {
  DEFAULT_PROPERTY_SIZE,
  getPropertySizeConfig,
  getSubscriptionPricing,
  type PropertySize,
} from "@/data/plans";
import BookingWizard from "@/components/BookingWizard/BookingWizard";



const plans = [
  {
    id: "essential-defense",
    icon: Shield,
    accentColor: "zinc",
    bestFor: ["Apartments & condos", "Budget-conscious homeowners", "Low-infestation areas", "First-time pest control customers"],
    pestsIncluded: ["Ants", "Spiders", "Stink bugs", "Earwigs", "Centipedes", "Beetles", "Wasps (exterior nests)", "Crickets", "Silverfish"],
  },
  {
    id: "premium-shield",
    icon: Star,
    accentColor: "green",
    bestFor: ["Single-family homes", "Pet & kid households", "Year-round full coverage", "Anyone who's had rodent issues"],
    pestsIncluded: ["Everything in Essential", "Cockroaches", "Mice & Rats", "Termite inspection", "Fleas (interior)", "Bed bugs (initial check)", "Carpenter ants", "Hornets & yellow jackets"],
  },
  {
    id: "ultimate-fortress",
    icon: Zap,
    accentColor: "amber",
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



function PlansContentInner() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const propertySize: PropertySize = DEFAULT_PROPERTY_SIZE;
  const [wizardStep, setWizardStep] = useState(1);

  const handleStepChange = useCallback((step: number) => {
    setWizardStep(step);
  }, []);

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
      <section
        className="relative overflow-hidden transition-all duration-500 ease-in-out"
        style={{
          paddingTop: wizardStep === 1 ? '10rem' : '6rem',
          paddingBottom: wizardStep === 1 ? '3rem' : '0rem',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl text-center relative z-10">
          <AnimatePresence initial={false}>
            {wizardStep === 1 && (
              <motion.div
                key="hero-content"
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -60 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider uppercase mb-8">
                  <Shield size={14} /> Protection Plans
                </div>
                <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight leading-[1.05]">
                  Get protected in{" "}
                  <span className="inline-flex flex-wrap justify-center gap-x-[0.25em] bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                    {["3", "easy", "steps."].map((word, i) => (
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
                </h1>
                <p className="text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed">
                  Enter your address, pick the plan that fits, and you&apos;re covered.
                  Every plan includes free re-service, no contracts, and the Squito guarantee.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── 3-Step Booking Wizard ── */}
      <section className={wizardStep === 1 ? "pb-24" : "pb-24 pt-0"}>
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <BookingWizard onStepChange={handleStepChange} />
        </div>
      </section>



      {/* ── Best For + Pests Covered ── */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-white mb-4">Plan Deep Dive</h2>
            <p className="text-white/50 text-lg">
              See exactly who each plan is built for and what pests it covers.
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
