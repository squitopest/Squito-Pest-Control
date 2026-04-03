"use client";

import { useEffect, useState } from "react";
import { Phone, X } from "lucide-react";

export default function StickyCallBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const heroHeight = window.innerHeight * 0.8;
      setVisible(window.scrollY > heroHeight && !dismissed);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  if (!visible || dismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 animate-fade-in-up md:px-4 md:pb-4 pointer-events-none flex justify-center">
      <div className="bg-background/95 backdrop-blur-xl border border-green-500/20 md:rounded-2xl w-full max-w-4xl p-3 md:p-4 shadow-[0_-10px_40px_rgba(34,197,94,0.15)] md:shadow-[0_10px_40px_rgba(34,197,94,0.15)] flex flex-col sm:flex-row items-center justify-between gap-4 pointer-events-auto relative">
        
        <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-start">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
          <span className="font-semibold text-sm md:text-base text-white/90 truncate">
            Same-Day Service Available — Call Before 2pm!
          </span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <a
            href="tel:6312031000"
            className="group flex-1 sm:flex-none relative flex items-center justify-center gap-2.5 bg-green-500/10 border border-green-500/30 hover:bg-green-500 hover:border-green-500 px-5 py-2.5 rounded-xl overflow-hidden transition-all duration-300"
          >
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-500" />
            <Phone size={15} className="relative z-10 text-green-400 group-hover:text-white transition-colors shrink-0" />
            <div className="relative z-10 flex flex-col items-start leading-none">
              <span className="text-[9px] uppercase tracking-widest text-green-500/70 group-hover:text-white/70 font-semibold transition-colors">Call Now</span>
              <span className="text-sm font-bold text-white whitespace-nowrap">(631) 203-1000</span>
            </div>
          </a>
          <a
            href="#contact"
            className="flex-1 sm:flex-none btn-primary px-4 py-2 text-sm justify-center rounded-xl"
          >
            Get Free Quote
          </a>
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="absolute -top-3 -right-3 bg-card border border-border text-white/60 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors shadow-lg hidden md:block"
          aria-label="Dismiss"
        >
          <X size={16} />
        </button>
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-2 right-2 text-white/40 hover:text-white p-1 md:hidden"
          aria-label="Dismiss"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
