"use client";

import { useRef, useEffect, useCallback } from "react";
import { Phone } from "lucide-react";
import Image from "next/image";
import TownZipLookup from "@/components/ServiceArea/TownZipLookup";

/* ─── Treatment Comparison Slider ─────────────────────────────────────────────
   Interactive before/after slider showing the Squito difference.
   Left = competitors (foundation only), Right = Squito (full perimeter).

   Performance: all drag updates go straight to DOM refs (no React state,
   no re-renders). Native event listeners for lowest-latency touch on iOS.
────────────────────────────────────────────────────────────────────────────── */
function ComparisonSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const labelLeftRef = useRef<HTMLDivElement>(null);
  const labelRightRef = useRef<HTMLDivElement>(null);
  const pillLeftRef = useRef<HTMLDivElement>(null);
  const pillRightRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(50);

  /** Push a percentage (0-100) straight to the DOM — no setState. */
  const applyPosition = useCallback((pct: number) => {
    posRef.current = pct;
    if (clipRef.current) clipRef.current.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    if (lineRef.current) lineRef.current.style.left = `${pct}%`;
    if (labelLeftRef.current) labelLeftRef.current.style.opacity = pct > 15 ? "1" : "0";
    if (labelRightRef.current) labelRightRef.current.style.opacity = pct < 85 ? "1" : "0";
    if (pillLeftRef.current) pillLeftRef.current.style.opacity = pct > 20 ? "1" : "0";
    if (pillRightRef.current) pillRightRef.current.style.opacity = pct < 80 ? "1" : "0";
  }, []);

  /** Convert a clientX to a 0-100 percentage. */
  const toPercent = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return 50;
    return Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
  }, []);

  // ── Drag logic: document listeners attached ONLY during active drag ──
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // --- Mouse ---
    const mouseMove = (e: MouseEvent) => {
      e.preventDefault();
      applyPosition(toPercent(e.clientX));
    };
    const mouseUp = () => {
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseup", mouseUp);
    };
    const mouseDown = (e: MouseEvent) => {
      e.preventDefault();
      applyPosition(toPercent(e.clientX));
      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", mouseUp);
    };

    // --- Touch ---
    const touchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      e.preventDefault(); // only blocks scroll while actively dragging slider
      applyPosition(toPercent(e.touches[0].clientX));
    };
    const touchEnd = () => {
      document.removeEventListener("touchmove", touchMove);
      document.removeEventListener("touchend", touchEnd);
      document.removeEventListener("touchcancel", touchEnd);
    };
    const touchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      applyPosition(toPercent(e.touches[0].clientX));
      document.addEventListener("touchmove", touchMove, { passive: false });
      document.addEventListener("touchend", touchEnd);
      document.addEventListener("touchcancel", touchEnd);
    };

    el.addEventListener("mousedown", mouseDown);
    el.addEventListener("touchstart", touchStart, { passive: true });

    return () => {
      el.removeEventListener("mousedown", mouseDown);
      el.removeEventListener("touchstart", touchStart);
      // Safety cleanup in case component unmounts mid-drag
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseup", mouseUp);
      document.removeEventListener("touchmove", touchMove);
      document.removeEventListener("touchend", touchEnd);
      document.removeEventListener("touchcancel", touchEnd);
    };
  }, [applyPosition, toPercent]);

  // Subtle auto-slide hint on mount
  useEffect(() => {
    let frame: number;
    let start = 0;
    const duration = 1200;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = Math.sin(progress * Math.PI);
      applyPosition(50 - ease * 15);
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    const timeout = setTimeout(() => {
      frame = requestAnimationFrame(animate);
    }, 800);
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, [applyPosition]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden select-none"
      style={{ touchAction: "pan-y", cursor: "none" }}
      data-cursor-hide
      role="slider"
      aria-label="Drag to compare pest control coverage"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={50}
    >
      {/* Squito side — full image, always visible behind */}
      <Image
        src="/compare-squito.png"
        alt="Squito Pest Control full perimeter coverage including foundation, windows, eaves, and yard"
        fill
        sizes="(max-width: 1024px) 100vw, 512px"
        className="object-cover"
        priority
      />

      {/* Others side — clipped by slider position */}
      <div
        ref={clipRef}
        className="absolute inset-0"
        style={{ clipPath: "inset(0 50% 0 0)" }}
      >
        <Image
          src="/compare-others.png"
          alt="Traditional pest control foundation only treatment"
          fill
          sizes="(max-width: 1024px) 100vw, 512px"
          className="object-cover"
        />
      </div>

      {/* Slider line + handle — GPU-accelerated via will-change */}
      <div
        ref={lineRef}
        className="absolute top-0 bottom-0 w-[3px] bg-white/90 shadow-[0_0_12px_rgba(255,255,255,0.5)] z-20 pointer-events-none"
        style={{ left: "50%", transform: "translateX(-50%)", willChange: "left" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-[0_2px_20px_rgba(0,0,0,0.35)] flex items-center justify-center pointer-events-none">
          <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
            <path d="M7 4L3 10L7 16" stroke="#555" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13 4L17 10L13 16" stroke="#555" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div
        ref={labelLeftRef}
        className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-opacity duration-200"
        style={{ backgroundColor: "rgba(239,68,68,0.85)", color: "white" }}
      >
        Others
      </div>
      <div
        ref={labelRightRef}
        className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-opacity duration-200"
        style={{ backgroundColor: "rgba(34,197,94,0.9)", color: "white" }}
      >
        Squito
      </div>

      {/* Bottom legend pills */}
      <div
        ref={pillLeftRef}
        className="absolute bottom-3 left-3 z-10 transition-opacity duration-200"
      >
        <span className="bg-black/60 backdrop-blur-sm text-white/80 text-[10px] px-2 py-0.5 rounded-full font-medium">
          Foundation only
        </span>
      </div>
      <div
        ref={pillRightRef}
        className="absolute bottom-3 right-3 z-10 transition-opacity duration-200"
      >
        <span className="bg-green-600/80 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
          Foundation + Windows + Eaves + Yard
        </span>
      </div>
    </div>
  );
}

/* ─── Main ServiceArea Section ────────────────────────────────────────────── */
export default function ServiceArea() {
  return (
    <section className="py-24 border-y border-border overflow-hidden" id="service-area">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-12 items-start">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left z-10 w-full animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-foreground tracking-tight">
              Proudly Protecting{" "}
              <span className="gradient-text">All of Long Island</span>
            </h2>


            <TownZipLookup variant="full" className="mb-10" />

            <div>
              <a href="tel:6312031000" className="group relative inline-flex items-center gap-4 w-full sm:w-auto px-8 py-4 rounded-2xl bg-green-500/10 border border-green-500/30 overflow-hidden transition-all duration-500 hover:border-green-500/80 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-green-500/20 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                <div className="relative z-10 w-10 h-10 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center group-hover:bg-green-500 transition-colors duration-300 shrink-0">
                  <Phone size={18} className="text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div className="relative z-10 flex flex-col items-start">
                  <span className="text-[10px] uppercase tracking-widest text-green-600 font-semibold leading-none mb-0.5">Call Now</span>
                  <span className="text-xl font-display font-bold text-foreground tracking-wide">(631) 203-1000</span>
                </div>
              </a>
            </div>
          </div>

          {/* ── Right column: Before/After Comparison Slider (bleeds right on desktop) ── */}
          <div className="w-full animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="glass-card p-2 md:p-4 rounded-3xl lg:rounded-r-none lg:rounded-l-3xl bleed-right w-full border border-green-500/20 overflow-hidden relative group">
              <div className="absolute inset-0 bg-green-500/5 blur-3xl rounded-full" />

              <div className="flex items-center gap-3 px-4 py-3 border-b border-border relative z-10">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)] animate-pulse" />
                <span className="font-semibold text-sm text-body">The Squito Difference</span>
              </div>

              <div className="m-2 md:m-4 relative z-10">
                <ComparisonSlider />
              </div>

              <div className="grid grid-cols-3 divide-x divide-border relative z-10 border-t border-border pt-4 pb-2">
                <div className="flex flex-col items-center px-2">
                  <span className="font-display font-bold text-xl text-foreground">6+</span>
                  <span className="text-[10px] uppercase tracking-wider text-green-600 font-semibold text-center mt-1">Treatment Zones</span>
                </div>
                <div className="flex flex-col items-center px-2">
                  <span className="font-display font-bold text-xl text-foreground">360°</span>
                  <span className="text-[10px] uppercase tracking-wider text-green-600 font-semibold text-center mt-1">Perimeter</span>
                </div>
                <div className="flex flex-col items-center px-2">
                  <span className="font-display font-bold text-xl text-foreground">100%</span>
                  <span className="text-[10px] uppercase tracking-wider text-green-600 font-semibold text-center mt-1">Satisfaction</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
