"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { X, Shield, Sparkles, ArrowRight } from "lucide-react";

/* ─── Scroll-triggered Promo Popup ────────────────────────────────────────────
   Shows once per session after the visitor scrolls ~20% of the homepage.
   Light-theme glassmorphic design for readability.

   Rules:
   • Only fires on the homepage ("/")
   • Only once per browser session (sessionStorage)
   • 2-second delay after crossing the scroll threshold
   • Dismissible via X, CTA click, or backdrop click
   • Locks body scroll while open
────────────────────────────────────────────────────────────────────────────── */
const STORAGE_KEY = "squito_promo_seen";

export default function PromoPopup() {
  const [visible, setVisible] = useState(false);
  const [animatingOut, setAnimatingOut] = useState(false);
  const firedRef = useRef(false);
  const router = useRouter();
  const pathname = usePathname();

  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) return;
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const onScroll = () => {
      if (firedRef.current) return;
      const scrollPct =
        window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrollPct >= 0.20) {
        firedRef.current = true;
        window.removeEventListener("scroll", onScroll);
        setTimeout(() => setVisible(true), 2000);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // Lock body scroll while popup is open
  useEffect(() => {
    if (!visible) return;
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      window.scrollTo(0, scrollY);
    };
  }, [visible]);

  const dismiss = () => {
    setAnimatingOut(true);
    sessionStorage.setItem(STORAGE_KEY, "1");
    setTimeout(() => {
      setVisible(false);
      setAnimatingOut(false);
    }, 300);
  };

  const handleCTA = () => {
    sessionStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
    router.push("/plans");
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center px-4 transition-opacity duration-300 ${
        animatingOut ? "opacity-0" : "opacity-100"
      }`}
      onClick={dismiss}
      role="dialog"
      aria-modal="true"
      aria-label="Limited time offer"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />

      {/* Card */}
      <div
        className={`relative w-full max-w-md rounded-3xl overflow-hidden transition-all duration-300 ${
          animatingOut
            ? "scale-95 translate-y-4 opacity-0"
            : "scale-100 translate-y-0 opacity-100 animate-fade-in-up"
        }`}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(24px) saturate(1.8)",
          WebkitBackdropFilter: "blur(24px) saturate(1.8)",
          boxShadow:
            "0 25px 60px rgba(0,0,0,0.15), 0 0 80px rgba(34,197,94,0.08), inset 0 1px 0 rgba(255,255,255,0.6)",
          border: "1px solid rgba(255,255,255,0.5)",
        }}
      >
        {/* Green accent glow behind card */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-green-400/20 rounded-full blur-[60px] pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-emerald-400/15 rounded-full blur-[50px] pointer-events-none" />

        {/* Top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-green-400 via-emerald-500 to-green-600" />

        <div className="relative p-8 md:p-10">
          {/* Dismiss button */}
          <button
            onClick={dismiss}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <X size={16} />
          </button>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-5">
            <Sparkles size={12} />
            Limited Time Offer
          </div>

          {/* Headline */}
          <h3 className="text-2xl md:text-3xl font-display font-extrabold text-gray-900 leading-tight mb-3">
            Bundle &amp; Save{" "}
            <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
              10% Today
            </span>
          </h3>

          <p className="text-gray-600 text-sm md:text-base font-medium leading-relaxed mb-6">
            Protect your home from pests and mosquitoes with one plan.
            Add Mosquito &amp; Tick Protection to any pest plan and
            save <strong className="text-green-700">10% on your seasonal subscription</strong> —
            automatically applied at checkout.
          </p>

          {/* Value props */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {[
              { icon: Shield, text: "Full perimeter defense" },
              { icon: Shield, text: "Seasonal M&T coverage" },
              { icon: Shield, text: "One easy checkout" },
              { icon: Shield, text: "Cancel anytime" },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 text-xs font-semibold text-gray-500"
              >
                <Icon size={12} className="text-green-600 flex-shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={handleCTA}
            className="group w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold text-base shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 hover:scale-[1.02]"
          >
            View Plans &amp; Save
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>

          <p className="text-center text-[11px] font-medium text-gray-400 mt-4">
            No commitment required. See all plans first.
          </p>
        </div>
      </div>
    </div>
  );
}

