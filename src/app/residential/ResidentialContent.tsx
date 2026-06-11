"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus, Home, ArrowRight, ShieldCheck, Heart, Clock } from "lucide-react";
import { COMPANY_PHOTOS } from "@/lib/companyPhotos";

const faqs = [
  {
    question: "Are your residential treatments safe for children and pets?",
    answer: "Absolutely. We exclusively use pet-safe, family-friendly compounds that target insect biology directly. Once our exterior liquid barriers have dried (typically within 30 minutes), your yard is entirely safe for children and pets to play in."
  },
  {
    question: "How often should my house be treated?",
    answer: "For maximum protection, we highly recommend our Year-Round Home Protection Plan which involves quarterly exterior treatments (4 times a year). This establishes an ongoing barrier that prevents pests from ever breaching your home."
  },
  {
    question: "Do I have to be home for the treatment?",
    answer: "Not necessarily! Because the vast majority of pest invasion originates from the outside, our quarterly preventative treatments are performed entirely on the exterior foundation and yard. We will notify you before we arrive and after we complete the service."
  },
  {
    question: "What if pests get inside between treatments?",
    answer: "That is covered by our 100% Satisfaction Guarantee. If you spot active pests inside your home between your scheduled visits, simply call us. We will come out and treat the interior at no additional cost until the issue is solved."
  }
];

export default function ResidentialContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen pt-24 lg:pt-32 bg-background flex flex-col">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl flex-grow mb-24">
        
        {/* Header section */}
        <div className="flex flex-col items-center text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider uppercase mb-6">
            <Home size={14} />
            Residential Pest Control
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-white tracking-tight">
            Protecting Your <span className="gradient-text">Family's Peace of Mind</span>
          </h1>
          <p className="text-white/70 max-w-3xl text-lg md:text-xl">
            Whether it's a sudden ant invasion in the kitchen or a long-term termite defense, Squito provides the most advanced, family-safe residential pest control in Long Island.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          <div className="glass-card p-8 rounded-2xl flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-6 text-green-400">
              <Heart size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Family & Pet Safe</h3>
            <p className="text-white/60 text-sm">We strictly adhere to organic and pet-safe protocols to ensure your family's safety is never compromised.</p>
          </div>
          <div className="glass-card p-8 rounded-2xl flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-6 text-blue-400">
              <ShieldCheck size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Year-Round Barrier</h3>
            <p className="text-white/60 text-sm">Our quarterly exterior service stops pests where they start: outside. No dangerous broadcast chemicals inside.</p>
          </div>
          <div className="glass-card p-8 rounded-2xl flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center mb-6 text-yellow-400">
              <Clock size={28} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Same-Day Service</h3>
            <p className="text-white/60 text-sm">Pest emergencies don't wait for your schedule. Contact us before noon and we'll be there today.</p>
          </div>
        </div>

        {/* Action Image & Booking */}
        <div className="relative rounded-3xl overflow-hidden glass-card mb-20 min-h-[280px]">
          <Image
            src={COMPANY_PHOTOS.residential}
            alt="Squito technician treating a Long Island home exterior"
            fill
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover object-center opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/30" />
          
          <div className="relative z-10 p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="max-w-xl">
              <h2 className="text-3xl font-display font-bold text-white mb-4">Ready to reclaim your home?</h2>
              <p className="text-white/70 text-lg mb-8">Skip the gimmicks and long-term locked contracts. Get a free inspection tailored perfectly to your property's exact footprint.</p>
            </div>
            <a href="/plans" className="shrink-0 relative overflow-hidden inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white uppercase tracking-wider transition-all duration-300 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full hover:scale-105 hover:shadow-[0_0_40px_rgba(34,197,94,0.6)] group">
              <span className="relative z-10 flex items-center gap-2 shadow-sm">
                View Plans <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 h-full w-[200%] bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] skew-x-12 group-hover:animate-[shimmer_1.5s_infinite]" />
            </a>
          </div>
        </div>

        {/* Residential FAQs */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-white mb-8 text-center">Frequently Asked Residential Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div 
                  key={index} 
                  className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 border ${
                    isOpen ? "border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.15)]" : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <button
                    type="button"
                    className="w-full text-left px-6 py-6 flex items-center justify-between gap-4"
                    onClick={() => toggleOpen(index)}
                    aria-expanded={isOpen}
                  >
                    <span className={`font-display font-semibold text-lg md:text-xl transition-colors ${isOpen ? "text-green-400" : "text-white"}`}>
                      {faq.question}
                    </span>
                    <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${isOpen ? "bg-green-500/20 text-green-400 rotate-180" : "bg-white/5 text-white/60"}`}>
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
