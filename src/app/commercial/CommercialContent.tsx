"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus, Building2, ArrowRight, BookOpenCheck, EyeOff, Zap } from "lucide-react";
import Link from "next/link";
import { COMPANY_PHOTOS } from "@/lib/companyPhotos";

const faqs = [
  {
    question: "Do you service restaurants and commercial kitchens?",
    answer: "Yes. In fact, commercial kitchens require the absolute highest level of preventative maintenance to remain compliant with strict Board of Health codes. We offer dedicated, intensive monthly or bi-weekly servicing plans to ensure roaches, rodents, and drain flies never establish a foothold in your kitchen."
  },
  {
    question: "Can treatments be done after hours to avoid disrupting business?",
    answer: "Absolutely. We understand that business continuity is paramount. We offer discreet, after-hours and early-morning treatment scheduling to ensure your daily operations, customers, and employees are never interrupted."
  },
  {
    question: "Will you provide logbooks for Health Inspectors?",
    answer: "Yes. Every commercial account receives a dedicated on-site logbook. This book details all Safety Data Sheets (SDS), service dates, pest activity reports, and technician notes. It is exactly what health inspectors look for during a commercial audit."
  },
  {
    question: "What types of businesses do you cover?",
    answer: "We cover a wide spectrum of commercial entities across Long Island including: Hospitals & Medical Facilities, Restaurants & Bars, Hotels & Hospitality, Warehouses & Logistics, Property Management (Multi-Family), and Retail Storefronts."
  },
  {
    question: "Do commercial contracts require a long-term commitment?",
    answer: "No long-term contracts are required. We earn your business every month through results. Most clients choose monthly or bi-monthly service plans because the consistency is what keeps them pest-free and audit-ready, not because we lock them in."
  },
  {
    question: "How much does commercial pest control cost?",
    answer: "Commercial pricing varies by property size, pest pressure, and service frequency. A small retail storefront might start around $75–$125/month, while a full-service restaurant or warehouse will typically range from $150–$400/month depending on scope. We provide detailed quotes after a free on-site evaluation. No guessing."
  },
  {
    question: "What happens if there's a pest sighting between scheduled visits?",
    answer: "Commercial accounts receive priority emergency dispatch. If a pest is spotted between scheduled services, call us and we'll have a technician on-site within 24 hours, often same-day. Your business reputation matters too much to wait."
  },
  {
    question: "Are your products safe for food service environments?",
    answer: "Yes. We exclusively use EPA-registered, food-safe formulations in food service environments. All products used in your facility come with complete Safety Data Sheets (SDS) that are kept in your on-site logbook for health inspector review. We never apply anything near open food prep areas and follow strict HACCP protocols."
  }
];

export default function CommercialContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen pt-24 lg:pt-32 bg-background flex flex-col">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl flex-grow mb-24">
        
        {/* Header section */}
        <div className="flex flex-col items-center text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider uppercase mb-6">
            <Building2 size={14} />
            Commercial Pest Management
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-white tracking-tight">
            Compliance. Discretion. <span className="bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">Zero Downtime.</span>
          </h1>
          <p className="text-white/70 max-w-3xl text-lg md:text-xl">
            A pest sighting can devastate your business's reputation instantly. We provide hyper-focused, logbook-compliant B2B pest management for restaurants, warehouses, and offices across Long Island.
          </p>
        </div>

        <div className="relative rounded-3xl overflow-hidden border border-border mb-16 animate-fade-in-up aspect-[21/9] min-h-[200px] max-h-[320px]">
          <Image
            src={COMPANY_PHOTOS.commercial}
            alt="Squito service truck and equipment at a Long Island property"
            fill
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          <div className="glass-card p-8 rounded-2xl flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center mb-6 text-purple-400">
              <EyeOff size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Discreet Service</h3>
            <p className="text-white/60 text-sm">After-hours and targeted approaches ensure that neither your employees nor your customers ever notice we're there.</p>
          </div>
          <div className="glass-card p-8 rounded-2xl flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-teal-500/10 border border-teal-500/30 flex items-center justify-center mb-6 text-teal-400">
              <BookOpenCheck size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Audit Ready</h3>
            <p className="text-white/60 text-sm">Comprehensive on-site logbooks and SDS tracking ensure you breeze through Health Inspections seamlessly.</p>
          </div>
          <div className="glass-card p-8 rounded-2xl flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mb-6 text-red-400">
              <Zap size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Rapid Mitigation</h3>
            <p className="text-white/60 text-sm">Commercial accounts receive priority routing logic. If there's an emergency, we dispatch instantly.</p>
          </div>
        </div>

        {/* Action Image & Booking */}
        <div className="relative rounded-3xl overflow-hidden glass-card mb-20">
          <div className="absolute inset-0 bg-[url('/services/service_commercial_bg_v2.webp')] bg-cover bg-center opacity-40 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          
          <div className="relative z-10 p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="max-w-xl">
              <h2 className="text-3xl font-display font-bold text-white mb-4">Request a B2B Evaluation</h2>
              <p className="text-white/70 text-lg mb-8">Every business layout is unique. Have one of our commercial supervisors survey your property and build a custom protective matrix.</p>
            </div>
            <Link href="/#contact" className="shrink-0 relative overflow-hidden inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white uppercase tracking-wider transition-all duration-300 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full hover:scale-105 hover:shadow-[0_0_40px_rgba(56,189,248,0.6)] group">
              <span className="relative z-10 flex items-center gap-2 shadow-sm">
                Book Free Inspection <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 h-full w-[200%] bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] skew-x-12 group-hover:animate-[shimmer_1.5s_infinite]" />
            </Link>
          </div>
        </div>

        {/* Commercial FAQs */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-white mb-8 text-center">Frequently Asked Commercial Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div 
                  key={index} 
                  className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 border ${
                    isOpen ? "border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.15)]" : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <button
                    type="button"
                    className="w-full text-left px-6 py-6 flex items-center justify-between gap-4"
                    onClick={() => toggleOpen(index)}
                    aria-expanded={isOpen}
                  >
                    <span className={`font-display font-semibold text-lg md:text-xl transition-colors ${isOpen ? "text-blue-400" : "text-white"}`}>
                      {faq.question}
                    </span>
                    <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${isOpen ? "bg-blue-500/20 text-blue-400 rotate-180" : "bg-white/5 text-white/60"}`}>
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </div>
                  </button>
                  
                  <div 
                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 pb-6 opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <p className="text-white/70 leading-relaxed pt-2 border-t border-white/5">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
