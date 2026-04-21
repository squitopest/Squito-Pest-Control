"use client";

import { useRef } from "react";
import { ArrowRight, Shield, ChevronLeft, ChevronRight } from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { PESTS, RISK_META } from "@/data/pests";

// Curated teaser — cross-section of categories and risk types
const TEASER_SLUGS = [
  "deer-tick",        // Arachnid · Severe Disease
  "culex-mosquito",   // Insect   · High Risk
  "sub-termites",     // Insect   · Structural
  "yellow-jackets",   // Insect   · Stinging
  "german-roach",     // Insect   · Sanitary
  "bed-bugs",         // Insect   · High Risk
  "norway-rats",      // Rodent   · High Risk
  "raccoon",          // Wildlife · High Risk
];

const teaserPests = TEASER_SLUGS.map(slug => PESTS.find(p => p.slug === slug)!);

export default function PestLibraryTeaser() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  return (
    <section className="py-10 md:py-14 bg-surface overflow-hidden" id="pest-library">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        {/* ── Header row ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-3">
              <Shield size={12} /> Pest Intelligence
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight">
              Know what&apos;s bugging{" "}
              <span className="gradient-text">Long Island</span>
            </h2>
            <p className="text-white/50 text-sm mt-1">
              {PESTS.length} species documented — click any pest to learn more.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Scroll arrows — visible on larger screens */}
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="hidden sm:flex w-8 h-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 hover:text-white hover:border-white/20 transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="hidden sm:flex w-8 h-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 hover:text-white hover:border-white/20 transition-all"
            >
              <ChevronRight size={16} />
            </button>

            <Link
              href="/pest-library"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-green-500 hover:bg-green-400 text-white font-semibold text-sm rounded-lg transition-all hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] group"
            >
              View All {PESTS.length}
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* ── Carousel ── */}
        <div className="relative">
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />

          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto scroll-smooth pb-2 hide-scrollbar snap-x snap-mandatory"
          >
            {teaserPests.map(pest => {
              const meta = RISK_META[pest.risk];
              return (
                <Link
                  key={pest.slug}
                  href={`/pest-library#${pest.slug}`}
                  className="group relative flex-shrink-0 w-36 sm:w-44 rounded-xl overflow-hidden border border-white/8 hover:border-white/20 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl snap-start aspect-[2/3]"
                >
                  <NextImage
                    src={pest.image}
                    alt={pest.name}
                    fill
                    sizes="176px"
                    className="object-cover transition-all duration-500 group-hover:scale-105 brightness-90 saturate-[0.65] group-hover:brightness-100 group-hover:saturate-100"
                  />
                  <div className="absolute inset-0 mix-blend-multiply pointer-events-none" style={{ backgroundColor: "rgba(5,46,22,0.15)" }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/5" />
                  <div className={`absolute top-2 left-2 flex items-center gap-1 px-1.5 py-0.5 rounded border text-[8px] font-bold uppercase tracking-widest backdrop-blur-sm ${meta.badge}`}>
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${meta.dot}`} />
                    {pest.risk}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-2.5">
                    <h3 className="font-display font-bold text-white text-xs leading-tight mb-0.5">{pest.name}</h3>
                    <p className="text-white/40 text-[9px] italic truncate">{pest.scientificName}</p>
                  </div>
                </Link>
              );
            })}

            {/* "See all" end card */}
            <Link
              href="/pest-library"
              className="group flex-shrink-0 w-36 sm:w-44 rounded-xl border border-white/10 border-dashed hover:border-green-500/40 bg-white/3 hover:bg-green-500/5 transition-all duration-300 snap-start aspect-[2/3] flex flex-col items-center justify-center gap-3 p-4 text-center"
            >
              <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                <ArrowRight size={18} className="text-green-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <div>
                <p className="text-white/70 font-semibold text-xs group-hover:text-white transition-colors">View all</p>
                <p className="text-white/35 text-[10px]">{PESTS.length} pests</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
