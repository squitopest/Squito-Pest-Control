"use client";

import { useState } from "react";
import { Plus, Minus, HelpCircle, ArrowRight } from "lucide-react";
import Footer from "@/components/Footer/Footer";

const faqs = [
  {
    question: "Are your treatments safe for children and pets?",
    answer: "Absolutely. Safety is our top priority. We use pet-safe, family-friendly organic compounds and target our treatments specifically to where pests live and breed. Once our exterior liquid barriers have dried (typically within 30 minutes), the yard is completely safe for children and pets to resume normal play."
  },
  {
    question: "Do I need to sign a long-term contract?",
    answer: "No, we believe in earning your business through results, not paperwork. We offer completely contract-free services. While we do highly recommend our year-round Home Protection Plan for continuous defense, you are never locked in and can cancel at any time without penalty."
  },
  {
    question: "What is your typical response time?",
    answer: "We understand that pest issues can be stressful. We pride ourselves on rapid response and strive to offer Same-Day or Next-Day service for all urgent calls across Long Island, depending on our daily routing availability."
  },
  {
    question: "Is Squito's work guaranteed?",
    answer: "Yes! We stand behind our work with a 100% Satisfaction Guarantee. If pests return between your scheduled treatments, we will come back and re-treat the affected areas at absolutely no additional cost to you."
  },
  {
    question: "How does the Year-Round Protection Plan work?",
    answer: "Our staple Comprehensive Protection Plan involves four quarterly visits. We perform a robust exterior barrier treatment to stop pests from entering, and treat the interior as needed. This proactive approach stops seasonal bursts of pests before they establish a foothold inside your living space."
  },
  {
    question: "Do you service commercial properties?",
    answer: "Yes, we provide tailored, discreet pest management programs for restaurants, offices, warehouses, and multi-family structures. We ensure compliance with health regulations and work with your schedule to minimize disruption to your business."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen pt-24 lg:pt-32 bg-background flex flex-col">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl flex-grow mb-24 animate-fade-in-up">
        
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider uppercase mb-6">
            <HelpCircle size={14} />
            Frequently Asked Questions
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white tracking-tight">
            We've Got <span className="gradient-text">Answers</span>
          </h1>
          <p className="text-white/70 max-w-2xl text-lg">
            Everything you need to know about our safety standards, guarantees, and service protocols.
          </p>
        </div>

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
                  <p className="text-white/70 leading-relaxed text-base pt-2 border-t border-white/5">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm shadow-xl">
          <h3 className="text-2xl font-display font-bold text-white mb-4">Still have a question?</h3>
          <p className="text-white/60 mb-8 max-w-lg mx-auto">Our local Long Island experts are standing by. Get in touch directly and we'll be happy to clear things up!</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="tel:6312031000" className="w-full sm:w-auto px-8 py-3 rounded-full border border-green-500/30 text-green-400 font-bold hover:bg-green-500/10 transition-colors">
              Call (631) 203-1000
            </a>
            <a href="/#contact" className="w-full sm:w-auto px-8 py-3 rounded-full bg-green-500 text-white font-bold hover:bg-green-400 transition-colors flex items-center justify-center gap-2">
              Send a Message <ArrowRight size={16} />
            </a>
          </div>
        </div>

      </div>
      
      <Footer />
    </main>
  );
}
