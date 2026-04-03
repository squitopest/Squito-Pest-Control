"use client";

import { MapPin, Phone, CheckCircle } from "lucide-react";

const areas = [
  "Nassau County", "Suffolk County", "Hempstead", "Babylon",
  "Smithtown", "Huntington", "Islip", "Brookhaven",
  "Oyster Bay", "North Hempstead", "Garden City", "Hicksville",
  "Massapequa", "Levittown", "Commack", "Brentwood",
];

export default function ServiceArea() {
  return (
    <section className="py-24 bg-surface border-y border-border overflow-hidden" id="service-area">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20">
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left z-10 w-full animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider uppercase mb-6">
              <MapPin size={14} />
              Service Area
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white tracking-tight">
              Proudly Protecting{" "}
              <span className="gradient-text">All of Long Island</span>
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl">
              From the Nassau County border to the Hamptons — if you live or
              work on Long Island, we've got you covered. Same-day service
              available in most areas.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full mb-10">
              {areas.map((area, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-white/80 bg-white/5 border border-white/5 rounded-lg px-3 py-2">
                  <CheckCircle size={14} className="text-green-500 shrink-0" />
                  <span className="truncate">{area}</span>
                </div>
              ))}
            </div>

            <div>
              <a href="tel:6312031000" className="group relative inline-flex items-center gap-4 w-full sm:w-auto px-8 py-4 rounded-2xl bg-green-500/10 border border-green-500/30 overflow-hidden transition-all duration-500 hover:border-green-500/80 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-green-500/20 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                <div className="relative z-10 w-10 h-10 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center group-hover:bg-green-500 transition-colors duration-300 shrink-0">
                  <Phone size={18} className="text-green-400 group-hover:text-white transition-colors" />
                </div>
                <div className="relative z-10 flex flex-col items-start">
                  <span className="text-[10px] uppercase tracking-widest text-green-500/70 font-semibold leading-none mb-0.5">Call Now</span>
                  <span className="text-xl font-display font-bold text-white tracking-wide">(631) 203-1000</span>
                </div>
              </a>
            </div>
          </div>

          <div className="flex-1 w-full flex justify-center lg:justify-end animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="glass-card p-2 md:p-4 rounded-3xl w-full max-w-lg border border-green-500/20 shadow-2xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-green-500/5 blur-3xl rounded-full" />
              
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 relative z-10">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)] animate-pulse" />
                <span className="font-semibold text-sm text-white/90">Long Island Coverage Area</span>
              </div>
              
              <div className="aspect-[4/3] bg-background/50 rounded-2xl m-2 md:m-4 relative overflow-hidden border border-border group-hover:border-green-500/30 transition-colors">
                <img 
                  src="/long_island_map.png" 
                  alt="Long Island Service Area Map" 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />

                {/* SVG scan line clipped to Long Island shape */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 100 75"
                  preserveAspectRatio="none"
                >
                  <defs>
                    {/*
                      Long Island runs diagonally NE in the image.
                      object-cover on a square image in a 4:3 box crops top+bottom equally,
                      showing ~y 12.5%-87.5% of the 1024px image.
                      Island north shore: ~y 37-45% of orig → y_vb 18-25
                      Island south shore: ~y 62-67% of orig → y_vb 37-43
                      Island x: ~4% to 95% of image width
                    */}
                    <clipPath id="li-clip">
                      <polygon points="
                        4,45   6,43   9,40   12,38
                        16,36  20,35  24,34  28,33
                        33,32  38,31  44,31  50,31
                        56,30  61,29  65,27  68,24
                        72,21  76,19  80,18  84,18
                        88,19  92,20  95,21  97,23
                        95,26  90,28  85,30  80,32
                        75,34  70,36  65,39  60,41
                        55,43  50,45  44,47  38,47
                        32,47  26,47  20,47  14,47
                        9,47   5,48   4,50   3,48
                        3,45
                      " />
                    </clipPath>
                    <linearGradient id="scan-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%"   stopColor="rgba(34,197,94,0)" />
                      <stop offset="25%"  stopColor="rgba(34,197,94,0.2)" />
                      <stop offset="50%"  stopColor="rgba(34,197,94,1)" />
                      <stop offset="75%"  stopColor="rgba(34,197,94,0.2)" />
                      <stop offset="100%" stopColor="rgba(34,197,94,0)" />
                    </linearGradient>
                    <filter id="glow2" x="-400%" y="-100%" width="900%" height="300%">
                      <feGaussianBlur stdDeviation="1.2" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  <g clipPath="url(#li-clip)">
                    <rect x="0" y="0" width="1.2" height="75"
                      fill="url(#scan-grad)"
                      filter="url(#glow2)"
                    >
                      <animate
                        attributeName="x"
                        values="4;95;4"
                        dur="3.5s"
                        repeatCount="indefinite"
                        calcMode="spline"
                        keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
                      />
                    </rect>
                  </g>
                </svg>
              </div>
              
              <div className="grid grid-cols-3 divide-x divide-white/10 relative z-10 border-t border-white/10 pt-4 pb-2">
                <div className="flex flex-col items-center px-2">
                  <span className="font-display font-bold text-xl text-white">230+</span>
                  <span className="text-[10px] uppercase tracking-wider text-green-400 font-semibold text-center mt-1">ZIP Codes</span>
                </div>
                <div className="flex flex-col items-center px-2">
                  <span className="font-display font-bold text-xl text-white">2</span>
                  <span className="text-[10px] uppercase tracking-wider text-green-400 font-semibold text-center mt-1">Counties</span>
                </div>
                <div className="flex flex-col items-center px-2">
                  <span className="font-display font-bold text-xl text-white">&lt;1hr</span>
                  <span className="text-[10px] uppercase tracking-wider text-green-400 font-semibold text-center mt-1">Response Time</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
