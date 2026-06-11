"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { X, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/bodyScrollLock";
import { COMPANY_PHOTOS } from "@/lib/companyPhotos";
import { BUNDLE_DISCOUNT_PERCENT } from "@/lib/bundleOffers";
import { useModalDismiss } from "@/lib/useModalDismiss";

const STORAGE_KEY = "squito_promo_seen";
const EMAIL_KEY = "squito_promo_email";
const EXIT_MS = 300;

const TRUST_AVATARS = [
  { src: "/team/team-portrait-1.png", alt: "Squito customer" },
  { src: "/team/team-portrait-2.png", alt: "Squito customer" },
  { src: "/team/team-portrait-3.png", alt: "Squito customer" },
] as const;

export default function PromoPopup() {
  const [visible, setVisible] = useState(false);
  const [animatingOut, setAnimatingOut] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const firedRef = useRef(false);
  const scrollLockedRef = useRef(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isOpen = visible || animatingOut;

  useEffect(() => {
    if (!isHome) return;
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const onScroll = () => {
      if (firedRef.current) return;
      const scrollPct =
        window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrollPct >= 0.3) {
        firedRef.current = true;
        window.removeEventListener("scroll", onScroll);
        setTimeout(() => setVisible(true), 4000);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    if (isOpen && !scrollLockedRef.current) {
      lockBodyScroll();
      scrollLockedRef.current = true;
      return;
    }

    if (!isOpen && scrollLockedRef.current) {
      unlockBodyScroll();
      scrollLockedRef.current = false;
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      if (scrollLockedRef.current) {
        unlockBodyScroll();
        scrollLockedRef.current = false;
      }
    };
  }, []);

  const finishClose = useCallback(() => {
    setVisible(false);
    setAnimatingOut(false);
    setEmailError("");
  }, []);

  const dismiss = useCallback(() => {
    if (animatingOut) return;
    setAnimatingOut(true);
    sessionStorage.setItem(STORAGE_KEY, "1");
    window.setTimeout(finishClose, EXIT_MS);
  }, [animatingOut, finishClose]);

  useModalDismiss(isOpen && !animatingOut, dismiss, closeRef);

  const goToOffer = useCallback(
    (submittedEmail?: string) => {
      if (submittedEmail) {
        sessionStorage.setItem(EMAIL_KEY, submittedEmail);
      }
      sessionStorage.setItem(STORAGE_KEY, "1");
      setAnimatingOut(true);
      window.setTimeout(() => {
        finishClose();
        router.push("/get-started?from=promo&intent=bundle");
      }, EXIT_MS);
    },
    [finishClose, router]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      setEmailError("Enter your email to continue.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    goToOffer(trimmed);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 transition-opacity duration-300 overscroll-none ${
        animatingOut ? "opacity-0" : "opacity-100"
      }`}
      onClick={dismiss}
      role="dialog"
      aria-modal="true"
      aria-labelledby="promo-popup-title"
    >
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" />

      <div
        className={`relative bg-card w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border border-border flex flex-col md:flex-row transition-all duration-300 ${
          animatingOut
            ? "scale-95 translate-y-4 opacity-0"
            : "scale-100 translate-y-0 opacity-100 animate-fade-in-up"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={dismiss}
          aria-label="Close offer"
          className="absolute top-3 right-3 md:top-4 md:right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-muted hover:bg-muted/80 transition-colors text-muted hover:text-foreground"
        >
          <X size={18} />
        </button>

        {/* Visual panel — desktop only */}
        <div className="hidden md:block w-full md:w-5/12 relative bg-muted min-h-[420px] overflow-hidden">
          <Image
            src={COMPANY_PHOTOS.heroMobilePoster}
            alt="Long Island neighborhood protected by Squito"
            fill
            sizes="320px"
            className="object-cover grayscale-[15%]"
            priority
          />
          <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
          <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-center bg-gradient-to-t from-black/65 via-black/20 to-transparent">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4 shadow-lg border-4 border-card">
              <ShieldCheck size={32} className="text-primary-foreground" strokeWidth={2.25} />
            </div>
            <p className="font-display font-bold text-lg text-white">100% Local Protection</p>
            <p className="text-white/75 text-sm mt-1">Nassau &amp; Suffolk County</p>
          </div>
        </div>

        {/* Content */}
        <div className="w-full md:w-7/12 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 mb-5 text-green-700">
            <Sparkles size={16} className="text-primary" aria-hidden />
            <span className="text-xs font-bold uppercase tracking-widest">
              Exclusive Local Offer
            </span>
          </div>

          <h2
            id="promo-popup-title"
            className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-foreground leading-tight tracking-tight mb-3"
          >
            Save {BUNDLE_DISCOUNT_PERCENT}% When You Bundle
          </h2>

          <p className="text-muted text-sm sm:text-base leading-relaxed mb-6">
            Join Long Island homeowners who trust Squito for year-round protection. Add
            Mosquito &amp; Tick to any pest plan and save{" "}
            <strong className="text-green-700">{BUNDLE_DISCOUNT_PERCENT}%</strong> automatically
            at checkout — no code needed.
          </p>

          <form className="space-y-3" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="promo-email" className="sr-only">
                Email address
              </label>
              <input
                id="promo-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError("");
                }}
                placeholder="Enter your email address"
                autoComplete="email"
                className="w-full px-5 py-3.5 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-foreground placeholder:text-muted text-sm"
              />
              {emailError ? (
                <p className="mt-1.5 text-xs text-red-600 font-medium">{emailError}</p>
              ) : null}
            </div>

            <button
              type="submit"
              className="w-full gradient-cta flex items-center justify-center gap-2 py-4 rounded-full text-sm sm:text-base font-bold shadow-lg shadow-green-500/20 hover:shadow-green-500/35 active:scale-[0.98] transition-all"
            >
              Get Protected &amp; Save
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-6 text-center md:text-left">
            <button
              type="button"
              onClick={dismiss}
              className="text-xs font-semibold uppercase tracking-widest text-muted hover:text-green-700 transition-colors hover:underline underline-offset-2"
            >
              No thanks, I&apos;ll pass on the bundle discount
            </button>
          </div>

          <div className="mt-6 pt-5 border-t border-border flex items-center gap-3">
            <div className="flex -space-x-2 shrink-0">
              {TRUST_AVATARS.map((avatar) => (
                <Image
                  key={avatar.src}
                  src={avatar.src}
                  alt={avatar.alt}
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full border-2 border-card object-cover"
                />
              ))}
            </div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted">
              Trusted by Long Island homeowners
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
