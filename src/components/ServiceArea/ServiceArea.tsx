"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Phone, Search, ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { filterTowns, isTownServiced, zipToTown, ALL_LONG_ISLAND_TOWNS } from "@/data/longIslandTowns";

export default function ServiceArea() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedTown, setSelectedTown] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [highlightIdx, setHighlightIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (val: string) => {
    setQuery(val);
    setSelectedTown(null);
    setNotFound(false);
    setHighlightIdx(-1);

    if (val.trim().length < 1) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    const matches = filterTowns(val, 8);
    setSuggestions(matches);
    setShowDropdown(matches.length > 0);

    // If nothing matched and they typed 3+ chars, show not-found
    if (matches.length === 0 && val.trim().length >= 3) {
      setNotFound(true);
    }
  };

  const selectTown = (town: string) => {
    // Strip ZIP suffix if present, e.g. "Brentwood (11717)" → "Brentwood"
    const cleanTown = town.replace(/\s*\(\d{5}\)$/, "");
    setQuery(cleanTown);
    setSelectedTown(cleanTown);
    setSuggestions([]);
    setShowDropdown(false);
    setNotFound(false);
    setHighlightIdx(-1);
    // Auto-navigate to plans page
    navigateToPlans(cleanTown);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown || suggestions.length === 0) {
      if (e.key === "Enter") {
        e.preventDefault();
        handleGoClick();
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIdx((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIdx((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightIdx >= 0 && highlightIdx < suggestions.length) {
        selectTown(suggestions[highlightIdx]);
      } else {
        handleGoClick();
      }
    } else if (e.key === "Escape") {
      setShowDropdown(false);
    }
  };

  const handleGoClick = () => {
    // If nothing explicitly selected, try exact match
    if (!selectedTown) {
      if (isTownServiced(query)) {
        // Check if it's a ZIP code first
        const resolved = zipToTown(query.trim());
        if (resolved) {
          navigateToPlans(resolved);
          return;
        }
        // Find the properly-cased version
        const match = ALL_LONG_ISLAND_TOWNS.find(
          (t) => t.toLowerCase() === query.trim().toLowerCase()
        );
        if (match) {
          navigateToPlans(match);
          return;
        }
      }
      // Check if we have suggestions and auto-select the first one
      const matches = filterTowns(query, 1);
      if (matches.length > 0) {
        selectTown(matches[0]);
        navigateToPlans(matches[0]);
        return;
      }
      setNotFound(true);
      return;
    }
    navigateToPlans(selectedTown);
  };

  const navigateToPlans = (town: string) => {
    setLoading(true);
    // Small delay for the loading animation
    setTimeout(() => {
      router.push(`/plans?town=${encodeURIComponent(town)}`);
    }, 600);
  };

  return (
    <section className="py-24 border-y border-border overflow-hidden" id="service-area">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20">
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left z-10 w-full animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-600 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider uppercase mb-6">
              <MapPin size={14} />
              Service Area
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-foreground tracking-tight">
              Proudly Protecting{" "}
              <span className="gradient-text">All of Long Island</span>
            </h2>


            {/* ── Town Search Box ── */}
            <div className="w-full max-w-lg mb-10">
              <label className="text-sm font-semibold text-muted mb-2 block flex items-center gap-2">
                <Search size={14} className="text-primary" />
                Where do you need service?
              </label>
              <div className="relative">
                <div className={`flex items-center gap-2 bg-background border rounded-2xl px-4 py-3 transition-all duration-300 ${
                  selectedTown
                    ? "border-green-500/60 shadow-[0_0_20px_rgba(34,197,94,0.15)]"
                    : notFound
                    ? "border-red-500/50"
                    : "border-border focus-within:border-green-500/50"
                }`}>
                  <Search size={18} className={`flex-shrink-0 transition-colors ${selectedTown ? "text-primary" : "text-subtle"}`} />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => {
                      if (suggestions.length > 0) setShowDropdown(true);
                    }}
                    placeholder="Town or ZIP code (e.g. Brentwood, 11717...)"
                    className="flex-1 bg-transparent text-foreground placeholder:text-subtle outline-none text-base font-medium"
                    id="town-search-input"
                    autoComplete="off"
                  />
                </div>

                {/* View Plans Button — below the search bar for mobile visibility */}
                <button
                  type="button"
                  onClick={handleGoClick}
                  disabled={loading || (!query.trim())}
                  className={`mt-3 w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 ${
                    selectedTown
                      ? "bg-primary hover:bg-green-400 text-primary-foreground shadow-lg hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] hover:scale-[1.02]"
                      : "bg-tint-10 text-muted hover:bg-tint-15"
                  } disabled:opacity-40 disabled:cursor-not-allowed`}
                >
                  {loading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <>
                      View Plans <ArrowRight size={14} />
                    </>
                  )}
                </button>

                {/* Autocomplete Dropdown */}
                {showDropdown && suggestions.length > 0 && (
                  <div
                    ref={dropdownRef}
                    className="absolute z-50 w-full mt-2 bg-card backdrop-blur-xl border border-border rounded-2xl shadow-2xl overflow-hidden max-h-72 overflow-y-auto"
                  >
                    {suggestions.map((town, i) => (
                      <button
                        key={town}
                        type="button"
                        onClick={() => selectTown(town)}
                        className={`w-full px-4 py-3.5 flex items-center gap-3 text-left transition-colors border-b border-tint-5 last:border-0 ${
                          highlightIdx === i
                            ? "bg-green-500/15 text-foreground"
                            : "hover:bg-tint-5 text-body"
                        }`}
                      >
                        <MapPin size={14} className={`flex-shrink-0 ${highlightIdx === i ? "text-primary" : "text-subtle"}`} />
                        <span className="font-semibold text-sm">{town}</span>
                        <span className="text-xs text-subtle ml-auto">Long Island, NY</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Confirmation Badge */}
              {selectedTown && !loading && (
                <div className="mt-3 flex items-center gap-2 text-green-600 text-sm font-semibold animate-fade-in-up">
                  <ShieldCheck size={16} />
                  <span>Yes! We service <strong>{selectedTown}</strong>. Click &ldquo;View Plans&rdquo; to see your options.</span>
                </div>
              )}

              {/* Not Found Message */}
              {notFound && !selectedTown && (
                <div className="mt-3 flex items-center gap-2 text-amber-600 text-sm font-medium">
                  <span>We couldn&apos;t find that town in our Long Island coverage area. Try a nearby town or call us — we might still be able to help!</span>
                </div>
              )}
            </div>

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

          <div className="flex-1 w-full flex justify-center lg:justify-end animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="glass-card p-2 md:p-4 rounded-3xl w-full max-w-lg border border-green-500/20 overflow-hidden relative group">
              <div className="absolute inset-0 bg-green-500/5 blur-3xl rounded-full" />

              <div className="flex items-center gap-3 px-4 py-3 border-b border-border relative z-10">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)] animate-pulse" />
                <span className="font-semibold text-sm text-body">Long Island Coverage Area</span>
              </div>

              <div className="aspect-[4/3] bg-background/50 rounded-2xl m-2 md:m-4 relative overflow-hidden border border-border group-hover:border-green-500/30 transition-colors">
                <Image 
                  src="/long_island_map.webp" 
                  alt="Long Island Service Area Map" 
                  fill
                  sizes="(max-width: 1024px) 100vw, 512px"
                  className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 scale-[1.05] translate-x-2"
                />
                {/* Overlay to blur/hide Brooklyn and Queens on the left side */}
                <div className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-background via-background/90 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background/60 via-transparent to-transparent" />

                {/* SVG scan line clipped to Long Island shape */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 100 75"
                  preserveAspectRatio="none"
                >
                  <defs>
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
              
              <div className="grid grid-cols-3 divide-x divide-border relative z-10 border-t border-border pt-4 pb-2">
                <div className="flex flex-col items-center px-2">
                  <span className="font-display font-bold text-xl text-foreground">230+</span>
                  <span className="text-[10px] uppercase tracking-wider text-green-600 font-semibold text-center mt-1">ZIP Codes</span>
                </div>
                <div className="flex flex-col items-center px-2">
                  <span className="font-display font-bold text-xl text-foreground">2</span>
                  <span className="text-[10px] uppercase tracking-wider text-green-600 font-semibold text-center mt-1">Counties</span>
                </div>
                <div className="flex flex-col items-center px-2">
                  <span className="font-display font-bold text-xl text-foreground">&lt;1hr</span>
                  <span className="text-[10px] uppercase tracking-wider text-green-600 font-semibold text-center mt-1">Response Time</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
