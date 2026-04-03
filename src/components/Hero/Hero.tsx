"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Camera, CheckCircle, Star, Phone } from "lucide-react";
import PestIdentifierModal from "@/components/PestIdentifierModal/PestIdentifierModal";

const rotatingWords = ["Mosquitoes", "Termites", "Rodents", "Bed Bugs", "Cockroaches", "Spiders"];
const YOUTUBE_VIDEO_ID = "ouaGJXqUaXc";

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [identifierOpen, setIdentifierOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setWordIndex(i => (i + 1) % rotatingWords.length);
        setAnimating(false);
      }, 400);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden" id="hero">
      
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[50%] left-[50%] w-[100vw] h-[100vw] lg:w-[100vw] lg:h-[56.25vw] -translate-x-1/2 -translate-y-1/2 min-h-screen min-w-[177.77vh]">
          <iframe
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&iv_load_policy=3&enablejsapi=1`}
            allow="autoplay; encrypted-media"
            title="Background video"
          />
        </div>
        {/* Dark Overlays */}
        <div className="absolute inset-0 bg-background/80 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/70 to-background/100 z-10" />
      </div>

      <div className="container relative z-20 mx-auto px-4 lg:px-8 max-w-7xl flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Left Content */}
        <div className="flex-1 flex flex-col items-start gap-6 w-full animate-fade-in-up">
          
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="#fbbf24" color="#fbbf24" />
              ))}
            </div>
            <span className="text-sm font-medium text-white/90">5-Star Rated on Long Island</span>
          </div>

          <h1 className="font-display font-bold text-5xl lg:text-7xl leading-[1.1] tracking-tight">
            <span className="block text-white">Smart. Safe.</span>
            <span className="block gradient-text">Pest Control.</span>
          </h1>

          <div className="text-2xl md:text-3xl font-display font-semibold text-white/90 flex items-center flex-wrap">
            <span>We eliminate&nbsp;</span>
            <span className="relative inline-block w-[180px] md:w-[220px] h-[40px] overflow-hidden">
              <span 
                className={`absolute left-0 top-0 text-green-400 transform transition-all duration-400 ${
                  animating ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
                }`}
              >
                {rotatingWords[wordIndex]}
              </span>
            </span>
          </div>

          <p className="text-lg text-white/70 max-w-xl leading-relaxed">
            No contracts. No shortcuts. Just results.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto">
            <a 
              href="#contact" 
              className="relative overflow-hidden inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white uppercase tracking-wider transition-all duration-300 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full hover:scale-105 hover:shadow-[0_0_40px_rgba(34,197,94,0.6)] group w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center gap-2 shadow-sm">
                Get Protected <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 h-full w-[200%] bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] skew-x-12 group-hover:animate-[shimmer_1.5s_infinite]" />
            </a>
            <button
              className="flex items-center justify-center gap-2 px-8 py-[14px] rounded-full border border-white/20 bg-white/5 text-white font-display font-semibold hover:bg-white/10 hover:border-white/30 transition-all w-full sm:w-auto backdrop-blur-md"
              onClick={() => setIdentifierOpen(true)}
            >
              <Camera size={18} />
              Identify a Pest
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-6">
            {["No contracts", "100% satisfaction", "Pet & kid safe"].map((text) => (
              <div key={text} className="flex items-center gap-2 text-sm font-medium text-white/80">
                <CheckCircle size={16} className="text-green-500" />
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Right Stats Card */}
        <div className="flex-1 w-full flex justify-center lg:justify-end">
          <div className="glass-card p-6 md:p-8 rounded-2xl w-full max-w-md animate-fade-in-up shadow-2xl border-green-500/20" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
              <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.8)] animate-pulse" />
              <span className="font-semibold text-white/90">Live Protection Active</span>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              {[
                { num: "1,000+", label: "Homes Protected" },
                { num: "Same Day", label: "Service Available" },
                { num: "6+ Years", label: "Local Experience" },
                { num: "5.0 ★", label: "Average Rating" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-2xl font-display font-bold text-white mb-1">{stat.num}</span>
                  <span className="text-sm text-green-400 font-medium">{stat.label}</span>
                </div>
              ))}
            </div>

            <a 
              href="tel:6312031000" 
              className="group relative flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-green-500/10 border border-green-500/30 overflow-hidden transition-all duration-500 hover:border-green-500/80 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]"
            >
              {/* Animated shimmer */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-green-500/20 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              <div className="relative z-10 w-8 h-8 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center group-hover:bg-green-500 transition-colors duration-300">
                <Phone size={16} className="text-green-400 group-hover:text-white transition-colors" />
              </div>
              <div className="relative z-10 flex flex-col items-start">
                <span className="text-[10px] uppercase tracking-widest text-green-500/70 font-semibold leading-none mb-0.5">Call Now</span>
                <span className="text-lg font-display font-bold text-white tracking-wide">(631) 203-1000</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {identifierOpen && (
        <PestIdentifierModal onClose={() => setIdentifierOpen(false)} />
      )}
    </section>
  );
}
