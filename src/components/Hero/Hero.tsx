"use client";

import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle, Star, Phone, Camera } from "lucide-react";
import Link from "next/link";

const rotatingWords = ["Mosquitoes", "Termites", "Rodents", "Bed Bugs", "Cockroaches", "Spiders"];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setWordIndex(i => (i + 1) % rotatingWords.length);
        setAnimating(false);
      }, 400);
    }, 2800);

    return () => clearInterval(wordInterval);
  }, []);

  return (
    <section className="relative min-h-[90svh] lg:min-h-screen flex items-center pt-32 lg:pt-28 pb-16 overflow-hidden" id="hero">

      {/* Ambient glow orbs */}
      <div className="glow-orb-green w-[800px] h-[800px] -top-60 -left-60 z-0 opacity-50" />
      <div className="glow-orb-teal w-[600px] h-[600px] bottom-0 right-0 translate-x-1/4 translate-y-1/4 z-0 opacity-40" />

      {/* Background Video */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        >
          <source src="/success_video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-background/55 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/40 to-background z-10" />
      </div>

      {/* Content — full width, left-aligned */}
      <div className="container relative z-20 mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="max-w-4xl flex flex-col items-start gap-7 animate-fade-in-up">

          {/* Rating badge */}
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={13} fill="#fbbf24" color="#fbbf24" />
              ))}
            </div>
            <span className="text-sm font-medium text-white/90">5-Star Rated · Nassau & Suffolk County</span>
          </div>

          {/* Headline — big and bold */}
          <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-[6.5rem] leading-[1.0] tracking-tight">
            <span className="block text-white">Smart. Safe.</span>
            <span className="block gradient-text">Pest Control.</span>
          </h1>

          {/* Rotating subline */}
          <div className="text-2xl md:text-3xl font-display font-semibold text-white/80 leading-snug">
            <span>Eliminating </span>
            <span
              className={`text-green-400 transition-opacity duration-300 ${
                animating ? 'opacity-0' : 'opacity-100'
              }`}
            >
              {rotatingWords[wordIndex]}
            </span>
            <span className="block text-white/60 text-xl md:text-2xl mt-1">on Long Island.</span>
          </div>

          {/* Body copy */}
          <p className="text-lg text-white/60 max-w-xl leading-relaxed">
            10+ years in the field. NO contracts. NO gimmicks. Just local experts who show up and get it done.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mt-2">
            <Link
              href="/plans"
              className="relative overflow-hidden inline-flex items-center justify-center px-10 py-4 text-base font-bold text-white uppercase tracking-wider transition-all duration-300 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full hover:scale-105 hover:shadow-[0_0_40px_rgba(34,197,94,0.6)] group"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Protected <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 h-full w-[200%] bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] skew-x-12 group-hover:animate-[shimmer_1.5s_infinite]" />
            </Link>

            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('library-pest-camera');
                if (el) el.click();
              }}
              className="group relative overflow-hidden inline-flex items-center justify-center px-10 py-4 rounded-full border border-green-500/40 bg-green-500/10 text-white font-bold text-base uppercase tracking-wider hover:bg-green-500/20 hover:border-green-500/70 hover:shadow-[0_0_24px_rgba(34,197,94,0.2)] transition-all"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-green-500/15 to-transparent group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10 flex items-center gap-2">
                <Camera size={18} className="text-green-400 group-hover:scale-110 transition-transform" />
                Pest Identifier
              </span>
            </button>

            <a
              href="tel:6312031000"
              className="group relative inline-flex items-center justify-center gap-3 py-4 px-8 rounded-full bg-white/5 border border-white/10 overflow-hidden transition-all duration-300 hover:border-green-500/40 hover:bg-green-500/5"
            >
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-green-500/10 to-transparent group-hover:translate-x-full transition-transform duration-700" />
              <div className="relative z-10 w-7 h-7 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center group-hover:bg-green-500 transition-colors duration-300">
                <Phone size={14} className="text-green-400 group-hover:text-white transition-colors" />
              </div>
              <div className="relative z-10 flex flex-col items-start leading-none">
                <span className="text-[9px] uppercase tracking-widest text-green-500/70 font-semibold mb-0.5">Call Now</span>
                <span className="text-base font-display font-bold text-white">(631) 203-1000</span>
              </div>
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-6 pt-2">
            {["No contracts", "Same-day service", "Pet & family safe"].map((text) => (
              <div key={text} className="flex items-center gap-2 text-sm font-medium text-white/70">
                <CheckCircle size={15} className="text-green-500 shrink-0" />
                {text}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
