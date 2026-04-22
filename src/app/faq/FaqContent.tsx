"use client";

import { useState } from "react";
import { Plus, Minus, HelpCircle, ChevronDown, Loader2, CheckCircle2 } from "lucide-react";
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

export default function FaqContent() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
          phone: "Message sent from FAQ Page",
          street: "N/A",
          city: "N/A",
          zip: "N/A",
          service: "FAQ Page General Inquiry",
          message: formData.message,
        }),
      });

      if (!res.ok) throw new Error("Failed to send");
      setFormStatus("success");
      // Auto close/reset after 3 seconds
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
          <div className="flex flex-col items-center justify-center gap-4 w-full max-w-lg mx-auto">
            {!showContactForm ? (
              <div className="flex flex-col sm:flex-row w-full gap-4">
                <a href="tel:6312031000" className="flex-1 px-8 py-3 text-center rounded-full border border-green-500/30 text-green-400 font-bold hover:bg-green-500/10 transition-colors">
                  Call (631) 203-1000
                </a>
                <button type="button" onClick={() => setShowContactForm(true)} className="flex-1 px-8 py-3 rounded-full bg-green-500 text-white font-bold hover:bg-green-400 transition-colors flex items-center justify-center gap-2">
                  Send a Message <ChevronDown size={18} />
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

      </div>
      
      <Footer />
    </main>
  );
}
