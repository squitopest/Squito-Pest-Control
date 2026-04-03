"use client";

import { ClipboardList, Zap, ShieldCheck, ArrowDown } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    num: "01",
    title: "Free Inspection",
    desc: "A certified technician inspects your home and pinpoints the problem — fast.",
    detail: "No obligation. No pressure.",
  },
  {
    icon: Zap,
    num: "02",
    title: "Custom Treatment",
    desc: "We treat your property using targeted, pet & kid safe methods — built for your specific pest.",
    detail: "Same-day service available.",
  },
  {
    icon: ShieldCheck,
    num: "03",
    title: "Ongoing Protection",
    desc: "We set a protection barrier and return for follow-ups. If pests come back, so do we — free.",
    detail: "Satisfaction guaranteed.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-surface" id="how-it-works">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="flex flex-col items-center text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider uppercase mb-6">
            <Zap size={14} />
            How It Works
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white tracking-tight">
            Three Steps to a{" "}
            <span className="gradient-text">Pest-Free</span> Property
          </h2>
          <p className="text-white/70 max-w-2xl text-lg">
            Simple. Fast. Guaranteed.
          </p>
        </div>

        <div className="max-w-4xl mx-auto flex flex-col items-center relative">
          <div className="hidden md:block absolute left-12 top-10 bottom-10 w-0.5 bg-gradient-to-b from-green-500/50 via-green-500/10 to-transparent z-0" />
          
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col md:flex-row items-center md:items-start gap-8 w-full mb-12 relative z-10 group">
              <div className="relative shrink-0 hidden md:flex items-center justify-center">
                <div className="absolute -top-3 -left-3 text-[10px] font-bold text-green-400 bg-background border border-green-500 rounded-full w-6 h-6 flex items-center justify-center z-20 shadow-lg">
                  {step.num}
                </div>
                <div className="w-24 h-24 rounded-full bg-card border-2 border-green-500 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.3)] group-hover:bg-green-500/10 transition-all duration-300">
                  <step.icon size={40} className="text-green-500" />
                </div>
              </div>
              
              <div className="md:hidden flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-card border-2 border-green-500 flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                  <step.icon size={28} className="text-green-500" />
                </div>
                <h3 className="text-2xl font-display font-bold text-white"><span className="text-green-500 mr-2">{step.num}.</span>{step.title}</h3>
              </div>

              <div className="glass-card p-6 md:p-8 rounded-2xl md:ml-4 flex-1 text-center md:text-left shadow-lg group-hover:border-green-500/30 transition-colors w-full">
                <h3 className="text-2xl font-display font-bold text-white mb-3 hidden md:block">{step.title}</h3>
                <p className="text-white/70 text-lg mb-4 leading-relaxed">
                  {step.desc}
                </p>
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-green-400 bg-green-500/10 px-4 py-2 rounded-lg">
                  <span>→</span> {step.detail}
                </div>
              </div>

              {i < steps.length - 1 && (
                <div className="md:hidden mt-2 text-green-500/50 flex justify-center w-full">
                  <ArrowDown size={32} />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center text-center mt-8 pt-8 border-t border-border w-full max-w-4xl mx-auto">
          <p className="text-white/80 font-medium mb-6 text-lg">Ready to get started?</p>
          <a href="#contact" className="btn-primary">
            Book Your Free Inspection
          </a>
        </div>
      </div>
    </section>
  );
}
