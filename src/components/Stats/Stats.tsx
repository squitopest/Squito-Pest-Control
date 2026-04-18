"use client";

import { useEffect, useRef, useState } from "react";
import { Home, Star, Clock, Award } from "lucide-react";
import Link from "next/link";

const stats = [
  { icon: Home, num: 1000, suffix: "+", label: "Homes & Businesses Served" },
  { icon: Star, num: 5.0, suffix: "★", label: "Average Customer Rating", isDecimal: true },
  { icon: Clock, num: 10, suffix: "+", label: "Years Serving Long Island" },
];

function CountUp({ target, suffix, decimal }: { target: number; suffix: string; decimal?: boolean }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(decimal ? Math.round(current * 10) / 10 : Math.round(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, decimal]);

  return (
    <span ref={ref}>
      {decimal ? count.toFixed(1) : count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="py-24 border-y border-border bg-gradient-to-r from-background via-surface-2 to-background overflow-hidden relative" id="stats">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-green-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 max-w-5xl relative z-10">
        <div className="hidden md:grid md:grid-cols-3 gap-8 divide-x divide-white/10 mb-16">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center text-center px-4">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-6 border border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.1)]">
                <s.icon size={28} className="text-green-500" />
              </div>
              <div className="text-4xl lg:text-6xl font-display font-bold text-white mb-2 tracking-tight">
                  <CountUp
                    target={s.num}
                    suffix={s.suffix}
                    decimal={s.isDecimal || (s.num % 1 !== 0)}
                  />
              </div>
              <div className="text-sm font-semibold text-green-400 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Mobile styling */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:hidden gap-12 gap-y-12 mb-16">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center mb-4 border border-green-500/20">
                <s.icon size={24} className="text-green-500" />
              </div>
              <div className="text-4xl font-display font-bold text-white mb-1">
                  <CountUp
                    target={s.num}
                    suffix={s.suffix}
                    decimal={s.isDecimal || (s.num % 1 !== 0)}
                  />
              </div>
              <div className="text-xs font-semibold text-green-400 uppercase tracking-wide leading-tight">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Glassmorphic Satisfaction Guarantee */}
        <div className="flex justify-center w-full">
           <Link href="/contact" className="group relative inline-flex items-center gap-4 sm:gap-6 px-8 sm:px-12 py-5 sm:py-6 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden cursor-pointer transition-all duration-500 hover:border-green-500/50 hover:bg-white/10 hover:shadow-[0_0_40px_rgba(34,197,94,0.2)]">
              {/* Shimmer sweep effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[shimmer_2s_infinite]" />
              
              <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-tr from-green-600 to-green-400 flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.4)] group-hover:scale-110 transition-transform duration-500">
                <Award className="text-white" size={24} />
              </div>
              
              <div className="relative z-10 text-xl sm:text-3xl font-display font-bold text-white tracking-wide">
                 100% Satisfaction <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-500">Guaranteed</span>
              </div>
           </Link>
        </div>

      </div>
    </section>
  );
}
