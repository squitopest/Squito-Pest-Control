"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CalendarClock,
  Check,
  CheckCircle2,
  HelpCircle,
  Loader2,
  Lock,
  MapPin,
  Search,
  ShieldCheck,
} from "lucide-react";
import {
  MOSQUITO_TICK_ACTIVE_MONTHS,
  MOSQUITO_TICK_PACKAGES,
  buildMosquitoTickBookHref,
  buildMosquitoTickHelpHref,
  buildMosquitoTickQuoteHref,
  calculateMosquitoTickSeasonTotal,
  getMosquitoTickPackage,
  resolveYardSizeFromLotAcres,
  type MosquitoTickYardSizeId,
  type MosquitoTickPackage,
} from "@/data/mosquitoTickPackages";
import CrossSellModal from "@/components/BookingWizard/CrossSellModal";

type PropertyResult = {
  found: boolean;
  lotSizeAcres: number | null;
  sqft: number | null;
  mosquitoTickSize: string | null;
};

export default function MosquitoTickPackageSelector() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const promo = (searchParams.get("promo") ?? "").trim().toUpperCase().slice(0, 40);

  // Address lookup state
  const [addressInput, setAddressInput] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [autocompleteLoading, setAutocompleteLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [lookingUp, setLookingUp] = useState(false);
  const [propertyResult, setPropertyResult] = useState<PropertyResult | null>(null);
  const [addressSelected, setAddressSelected] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Step flow: 1 = address, 2 = quote
  const [step, setStep] = useState(1);
  const abortRef = useRef<AbortController | null>(null);

  // Resolved package
  const [resolvedSize, setResolvedSize] = useState<MosquitoTickYardSizeId | null>(null);
  const [showManualFallback, setShowManualFallback] = useState(false);
  const [manualSize, setManualSize] = useState<MosquitoTickYardSizeId>("small");

  // Cross-sell modal
  const [showCrossSell, setShowCrossSell] = useState(false);

  // Resolved address details (for passing to /book)
  const [resolvedAddress, setResolvedAddress] = useState<{
    street: string; city: string; zipCode: string;
  } | null>(null);

  const activePkg: MosquitoTickPackage | undefined = useMemo(() => {
    const id = resolvedSize ?? manualSize;
    return getMosquitoTickPackage(id);
  }, [resolvedSize, manualSize]);

  const seasonTotal = useMemo(
    () => (activePkg ? calculateMosquitoTickSeasonTotal(activePkg) : null),
    [activePkg]
  );

  // Close suggestions on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
        setHighlightedIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ─── Autocomplete ──────────────────────────────────────
  const handleAddressChange = async (val: string) => {
    setAddressInput(val);
    setHighlightedIndex(-1);
    setAddressSelected(false);
    setPropertyResult(null);
    setResolvedSize(null);
    setShowManualFallback(false);

    if (val.length < 3) {
      abortRef.current?.abort();
      setSuggestions([]);
      setShowSuggestions(false);
      setAutocompleteLoading(false);
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setAutocompleteLoading(true);

    try {
      const res = await fetch(
        `/api/maps/autocomplete?input=${encodeURIComponent(val)}`,
        { signal: controller.signal }
      );
      const data = await res.json();
      if (data.status === "OK" && data.predictions) {
        setSuggestions(data.predictions);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } catch (e: any) {
      if (e?.name !== "AbortError") console.error("Autocomplete Error", e);
    } finally {
      if (abortRef.current === controller) setAutocompleteLoading(false);
    }
  };

  // ─── Property lookup ───────────────────────────────────
  const lookupProperty = useCallback(async (fullAddress: string) => {
    setLookingUp(true);
    try {
      const res = await fetch(`/api/maps/property?address=${encodeURIComponent(fullAddress)}`);
      const data = await res.json();
      setPropertyResult(data);

      if (data.found && data.lotSizeAcres) {
        const resolved = resolveYardSizeFromLotAcres(data.lotSizeAcres);
        setResolvedSize(resolved);
        // Auto-advance to step 2 after showing the confirmation
        setTimeout(() => {
          setStep(2);
          window.scrollTo({ top: 0, behavior: "instant" });
        }, 1500);
      } else {
        // No lot data — show manual fallback then advance
        setShowManualFallback(true);
        setTimeout(() => {
          setStep(2);
          window.scrollTo({ top: 0, behavior: "instant" });
        }, 1500);
      }
    } catch (e) {
      console.error("Property lookup error:", e);
      setShowManualFallback(true);
      setTimeout(() => {
        setStep(2);
        window.scrollTo({ top: 0, behavior: "instant" });
      }, 1500);
    } finally {
      setLookingUp(false);
    }
  }, []);

  // ─── Select suggestion ─────────────────────────────────
  const selectSuggestion = useCallback(
    async (suggestion: any) => {
      setShowSuggestions(false);
      setHighlightedIndex(-1);
      setAddressInput(suggestion.description);
      setAddressSelected(true);

      try {
        const res = await fetch(
          `/api/maps/details?place_id=${encodeURIComponent(suggestion.place_id)}`
        );
        const data = await res.json();
        if (data.street) {
          setAddressInput(data.street);
          // Save address details for passing to /book
          setResolvedAddress({
            street: data.street || "",
            city: data.city || "",
            zipCode: data.zipCode || "",
          });
          const fullAddress = `${data.street || ""}, ${data.city || ""}, NY ${data.zipCode || ""}`.trim();
          lookupProperty(fullAddress);
        }
      } catch (e) {
        console.error(e);
      }
    },
    [lookupProperty]
  );

  // ─── Keyboard nav ──────────────────────────────────────
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) {
      if (e.key === "ArrowDown" && suggestions.length > 0) {
        setShowSuggestions(true);
        setHighlightedIndex(0);
        e.preventDefault();
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((i) => (i + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    } else if (e.key === "Enter") {
      if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
        e.preventDefault();
        selectSuggestion(suggestions[highlightedIndex]);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      setHighlightedIndex(-1);
    }
  };

  // ─── Cross-sell handlers ───────────────────────────────
  const handleBookClick = () => {
    setShowCrossSell(true);
  };

  const handleCrossSellAccept = (addOn: { type: string; sizeId: string; discountPercent: number }) => {
    setShowCrossSell(false);
    const finalSize = resolvedSize ?? manualSize;
    const params = new URLSearchParams();
    params.set("serviceType", "mosquito-tick");
    params.set("size", finalSize);
    params.set("billing", "monthly");
    params.set("addOn", addOn.type);
    params.set("addOnSize", addOn.sizeId);
    params.set("addOnDiscount", String(addOn.discountPercent));
    if (promo) params.set("promo", promo);
    if (resolvedAddress) {
      params.set("street", resolvedAddress.street);
      params.set("city", resolvedAddress.city);
      params.set("zip", resolvedAddress.zipCode);
    }
    router.push(`/book?${params.toString()}`);
  };

  const handleCrossSellDecline = () => {
    setShowCrossSell(false);
    const finalSize = resolvedSize ?? manualSize;
    const params = new URLSearchParams();
    params.set("serviceType", "mosquito-tick");
    params.set("size", finalSize);
    params.set("billing", "monthly");
    if (promo) params.set("promo", promo);
    if (resolvedAddress) {
      params.set("street", resolvedAddress.street);
      params.set("city", resolvedAddress.city);
      params.set("zip", resolvedAddress.zipCode);
    }
    router.push(`/book?${params.toString()}`);
  };

  const hasResult = resolvedSize !== null || showManualFallback;
  const finalPkg = activePkg;
  const finalSize = resolvedSize ?? manualSize;
  const quoteHref = buildMosquitoTickQuoteHref(finalSize, "mosquito-tick-selector");
  const helpHref = buildMosquitoTickHelpHref("mosquito-tick-selector");


  return (
    <>
      <div className="max-w-3xl mx-auto space-y-6">
        <AnimatePresence mode="wait">
          {/* Step 1: Address Lookup */}
          {step === 1 && (
            <motion.div
              key="step-1-address"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative rounded-3xl border-2 border-green-500/30 bg-card p-8 md:p-12 shadow-[0_0_40px_rgba(34,197,94,0.08)]" style={{ boxShadow: "var(--card-shadow), 0 0 40px rgba(34,197,94,0.08)" }}>
                <div className="flex items-center justify-center mb-5">
                  <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider uppercase">
                    <MapPin size={14} />
                    Step 1 — Enter Your Address
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-display font-bold text-white text-center mb-2">
                  Where do you need protection?
                </h3>
                <p className="text-white/50 text-sm text-center mb-6">
                  We&apos;ll match your property and show your personalized price instantly.
                </p>

                <div className="relative" ref={suggestionsRef}>
                  <div className="relative">
                    <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-green-500/50 pointer-events-none" />
                    <input
                      type="text"
                      value={addressInput}
                      onChange={(e) => handleAddressChange(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type your home address..."
                      className="w-full rounded-2xl border-2 border-green-500/20 bg-input py-5 pl-14 pr-5 text-foreground text-lg placeholder:text-muted-foreground/50 focus:border-green-500/50 focus:outline-none focus:ring-4 focus:ring-green-500/10 transition-all"
                      autoComplete="off"
                    />
                    {autocompleteLoading && (
                      <Loader2 size={16} className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-muted-foreground" />
                    )}
                  </div>

                  <AnimatePresence>
                    {showSuggestions && suggestions.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className="absolute z-50 mt-2 w-full rounded-2xl border border-border bg-popover shadow-2xl overflow-hidden"
                      >
                        {suggestions.map((s, i) => (
                          <button
                            key={s.place_id}
                            type="button"
                            className={`w-full text-left px-5 py-3.5 flex items-start gap-3 transition-colors ${
                              i === highlightedIndex
                                ? "bg-green-500/10 text-foreground"
                                : "text-muted-foreground hover:bg-accent hover:text-foreground"
                            }`}
                            onClick={() => selectSuggestion(s)}
                            onMouseEnter={() => setHighlightedIndex(i)}
                          >
                            <MapPin size={16} className="mt-0.5 shrink-0 text-primary" />
                            <span className="text-sm">{s.description}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <AnimatePresence>
                  {lookingUp && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-5 flex items-center gap-3 p-5 rounded-2xl bg-green-500/5 border border-green-500/20"
                    >
                      <div className="w-10 h-10 rounded-xl bg-green-500/15 flex items-center justify-center flex-shrink-0">
                        <Loader2 size={20} className="animate-spin text-green-400" />
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">Matching your property...</p>
                        <p className="text-white/40 text-xs mt-0.5">Checking Long Island property records</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {resolvedSize && propertyResult?.found && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="mt-5"
                    >
                      <div className="rounded-2xl border border-green-500/25 bg-gradient-to-br from-green-500/10 to-emerald-500/5 p-6 text-center">
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.15 }}
                          className="w-14 h-14 rounded-full bg-green-500/20 border-2 border-green-400/40 flex items-center justify-center mx-auto mb-4"
                        >
                          <Check size={28} className="text-green-400" strokeWidth={3} />
                        </motion.div>
                        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-white font-bold text-lg">
                          We&apos;ve matched your property!
                        </motion.p>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="text-white/50 text-sm mt-1">
                          Preparing your personalized quote...
                        </motion.p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {propertyResult && !propertyResult.found && !lookingUp && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-5">
                      <div className="rounded-2xl border border-amber-500/25 bg-amber-500/5 p-5">
                        <p className="text-amber-300 text-sm font-medium mb-1">We couldn&apos;t find your property in our records.</p>
                        <p className="text-white/50 text-sm">No worries — select your yard size below for a quote.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* Step 2: Personalized Quote */}
          {step === 2 && hasResult && finalPkg && (
            <motion.div
              key="step-2-quote"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {showManualFallback && (
                <div className="glass-card rounded-3xl border border-white/10 p-6 md:p-8 mb-6">
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-green-400 mb-5">
                    <ShieldCheck size={14} />
                    Select Your Yard Size
                  </div>
                  <div className="grid gap-3">
                    {MOSQUITO_TICK_PACKAGES.map((option) => {
                      const selected = option.id === manualSize;
                      return (
                        <button key={option.id} type="button" onClick={() => setManualSize(option.id)}
                          className={`cursor-pointer rounded-2xl border p-4 text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/40 ${selected ? "border-green-500 bg-green-500/10" : "border-white/10 bg-white/5 hover:border-white/20"}`}
                        >
                          <div className="flex items-center justify-between gap-4">
                            <div>
                              <p className="font-display text-base font-bold text-white">{option.label}</p>
                              <p className="text-xs text-white/50">{option.sqftRangeLabel}</p>
                            </div>
                            {option.quoteOnly ? (
                              <span className="shrink-0 text-xs font-semibold text-amber-300">Custom Quote</span>
                            ) : (
                              <p className="font-display text-lg font-bold text-green-300">
                                ${option.monthlyPrice?.toFixed(2)}<span className="text-xs font-normal text-white/40">/mo</span>
                              </p>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="glass-card rounded-3xl border border-green-500/20 bg-gradient-to-br from-green-500/5 to-emerald-500/3 p-6 md:p-8">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-green-400 mb-5">
                  <ShieldCheck size={14} />
                  Your Quote
                </div>

                {finalPkg.quoteOnly ? (
                  <>
                    <h3 className="font-display text-3xl font-bold text-white mb-2">Custom Quote Needed</h3>
                    <p className="text-white/55 text-sm leading-relaxed mb-6">
                      Your property is larger than 1 acre. We treat up to 1 acre of active outdoor areas —
                      patio, perimeter, and frequented zones. We&apos;ll put together a custom quote based on
                      your specific treatment areas.
                    </p>
                    <a href={quoteHref} className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-green-500 px-5 py-4 text-base font-display font-bold text-white transition-all hover:bg-green-400 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                      Request Custom Quote
                      <ArrowRight size={18} />
                    </a>
                  </>
                ) : (
                  <>
                    <div className="text-center mb-6">
                      <p className="text-white/50 text-sm mb-2">Mosquito &amp; Tick Package</p>
                      <div className="flex items-end justify-center gap-1">
                        <span className="text-5xl font-display font-bold text-white">
                          ${finalPkg.monthlyPrice?.toFixed(2)}
                        </span>
                        <span className="text-white/40 mb-2 text-lg">/mo</span>
                      </div>
                      <p className="text-white/40 text-sm mt-1">
                        {MOSQUITO_TICK_ACTIVE_MONTHS} active months · ${seasonTotal?.toFixed(2)} full season
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 mb-5">
                      <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-3">What We Treat</p>
                      <ul className="space-y-2 text-sm text-white/70">
                        <li className="flex items-start gap-2.5"><CheckCircle2 size={14} className="mt-0.5 shrink-0 text-green-400" />Exterior perimeter of your home</li>
                        <li className="flex items-start gap-2.5"><CheckCircle2 size={14} className="mt-0.5 shrink-0 text-green-400" />Patio, deck &amp; outdoor living areas</li>
                        <li className="flex items-start gap-2.5"><CheckCircle2 size={14} className="mt-0.5 shrink-0 text-green-400" />High-traffic zones your family frequents</li>
                        <li className="flex items-start gap-2.5"><CheckCircle2 size={14} className="mt-0.5 shrink-0 text-green-400" />Areas of concern flagged by you</li>
                      </ul>
                      <p className="text-xs text-white/35 mt-3">We treat up to 1 acre of active areas. This is mosquito <em>reduction</em> — designed to make your yard enjoyable again.</p>
                    </div>

                    <div className="flex flex-wrap gap-3 mb-6">
                      {["No initial fee", "No off-season billing", "Cancel anytime", "Free re-treatment"].map((item) => (
                        <span key={item} className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/60 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
                          <Check size={10} className="text-green-400" />{item}
                        </span>
                      ))}
                    </div>

                    <button type="button" onClick={handleBookClick} className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-green-500 px-5 py-4 text-base font-display font-bold text-white transition-all hover:bg-green-400 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] group">
                      Book First Treatment
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>

                    <a href={helpHref} className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-display font-bold text-white/60 transition-colors hover:border-green-500/40 hover:bg-white/10 hover:text-white">
                      <HelpCircle size={15} className="text-green-300" />
                      Have questions? Talk to someone
                    </a>

                    <div className="mt-4 flex items-center justify-center gap-2 text-xs text-white/40">
                      <Lock size={12} className="text-green-300" />
                      Secure checkout · Cancel anytime
                    </div>
                  </>
                )}
              </div>

              <div className="mt-6 glass-card rounded-3xl border border-white/10 p-5">
                <div className="flex items-center gap-2 font-display font-bold text-white text-sm mb-2">
                  <CalendarClock size={16} className="text-green-300" />
                  Billed only during active months
                </div>
                <p className="text-xs text-white/55 leading-relaxed">
                  You&apos;re billed monthly April through October — {MOSQUITO_TICK_ACTIVE_MONTHS} treatments
                  per season. No charges November through March. No initial fee to start.
                </p>
              </div>

              <button type="button" onClick={() => { setStep(1); window.scrollTo({ top: 0, behavior: "instant" }); }} className="mt-4 text-sm text-white/40 hover:text-white/70 transition-colors text-center w-full">
                ← Change address
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <CrossSellModal
        isOpen={showCrossSell}
        type="general-pest"
        propertySize={resolvedSize === "xl" ? "large" : resolvedSize === "large" ? "large" : resolvedSize === "medium" ? "medium" : "small"}
        sqft={propertyResult?.sqft ?? null}
        onAccept={handleCrossSellAccept}
        onDecline={handleCrossSellDecline}
      />
    </>
  );
}
