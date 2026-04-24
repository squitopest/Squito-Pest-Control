"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Navigation,
  Loader2,
  Map,
  Home,
  ArrowRight,
  ChevronDown,
  Check,
  Shield,
} from "lucide-react";
import {
  PROPERTY_SIZE_OPTIONS,
  getPropertySizeConfig,
  type PropertySize,
} from "@/data/plans";

type PropertyData = {
  found: boolean;
  sqft: number | null;
  lotSizeAcres: number | null;
  yearBuilt: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  propertyType: string | null;
  propertySize: PropertySize | null;
  mosquitoTickSize: string | null;
  source: "api" | "db" | "fallback";
};

type AddressStepProps = {
  onComplete: (data: {
    street: string;
    city: string;
    zipCode: string;
    propertySize: PropertySize;
    mosquitoTickSize: string;
    sqft: number | null;
    lotSizeAcres: number | null;
  }) => void;
};

export default function AddressStep({ onComplete }: AddressStepProps) {
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");

  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [autocompleteLoading, setAutocompleteLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const streetInputRef = useRef<HTMLInputElement>(null);
  const autocompleteAbortRef = useRef<AbortController | null>(null);

  const [locating, setLocating] = useState(false);
  const [lookingUp, setLookingUp] = useState(false);
  const [propertyData, setPropertyData] = useState<PropertyData | null>(null);
  const [showManualSelector, setShowManualSelector] = useState(false);
  const [manualSize, setManualSize] = useState<PropertySize>("small");
  const [error, setError] = useState<string | null>(null);
  const [addressSelected, setAddressSelected] = useState(false);

  // Close suggestions on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setHighlightedIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddressChange = async (val: string) => {
    setStreet(val);
    setHighlightedIndex(-1);
    setAddressSelected(false);
    setPropertyData(null);

    if (val.length < 3) {
      autocompleteAbortRef.current?.abort();
      setSuggestions([]);
      setShowSuggestions(false);
      setAutocompleteLoading(false);
      return;
    }

    autocompleteAbortRef.current?.abort();
    const controller = new AbortController();
    autocompleteAbortRef.current = controller;
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
      if (e?.name !== "AbortError") {
        console.error("Autocomplete Error", e);
      }
    } finally {
      if (autocompleteAbortRef.current === controller) {
        setAutocompleteLoading(false);
      }
    }
  };

  const lookupProperty = useCallback(
    async (fullAddress: string, addressOverride?: { street: string; city: string; zipCode: string }) => {
      setLookingUp(true);
      setError(null);
      setShowManualSelector(false);

      // Use the override address if provided (from selectSuggestion where React
      // state may not have flushed yet), otherwise fall back to current state.
      const resolvedStreet = addressOverride?.street ?? street;
      const resolvedCity = addressOverride?.city ?? city;
      const resolvedZip = addressOverride?.zipCode ?? zipCode;

      try {
        const res = await fetch(
          `/api/maps/property?address=${encodeURIComponent(fullAddress)}`
        );
        const data: PropertyData = await res.json();
        console.log("[AddressStep] Property lookup result:", data);
        setPropertyData(data);

        if (data.found && data.sqft && data.propertySize) {
          // Property found in our database — auto-advance after a brief pause
          // so the user sees the "Property Found" confirmation
          setTimeout(() => {
            onComplete({
              street: resolvedStreet,
              city: resolvedCity,
              zipCode: resolvedZip,
              propertySize: data.propertySize!,
              mosquitoTickSize: data.mosquitoTickSize || data.propertySize!,
              sqft: data.sqft,
              lotSizeAcres: data.lotSizeAcres,
            });
          }, 1500);
        } else {
          // API didn't find it — show manual selector
          setShowManualSelector(true);
        }
      } catch (e) {
        console.error("Property lookup error:", e);
        setShowManualSelector(true);
      } finally {
        setLookingUp(false);
      }
    },
    [onComplete, street, city, zipCode]
  );

  const selectSuggestion = useCallback(
    async (suggestion: any) => {
      setShowSuggestions(false);
      setHighlightedIndex(-1);
      setStreet(suggestion.description);
      setAddressSelected(true);

      try {
        const res = await fetch(
          `/api/maps/details?place_id=${encodeURIComponent(suggestion.place_id)}`
        );
        const data = await res.json();
        if (data.street) {
          const resolvedStreet = data.street || suggestion.description;
          const resolvedCity = data.city || "";
          const resolvedZip = data.zipCode || "";

          setStreet(resolvedStreet);
          setCity(resolvedCity);
          setZipCode(resolvedZip);

          // Pass address directly to avoid stale closure values
          const fullAddress = `${resolvedStreet}, ${resolvedCity}, NY ${resolvedZip}`.trim();
          lookupProperty(fullAddress, {
            street: resolvedStreet,
            city: resolvedCity,
            zipCode: resolvedZip,
          });
        }
      } catch (e) {
        console.error(e);
      }
    },
    [lookupProperty]
  );

  const handleAddressKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
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
      setHighlightedIndex((i) =>
        i <= 0 ? suggestions.length - 1 : i - 1
      );
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

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setLocating(true);
    setError(null);

    (async () => {
      try {
        let position: GeolocationPosition;
        try {
          position = await new Promise<GeolocationPosition>(
            (resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
              });
            }
          );
        } catch {
          position = await new Promise<GeolocationPosition>(
            (resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: false,
                timeout: 15000,
                maximumAge: 300000,
              });
            }
          );
        }

        const response = await fetch(
          `/api/maps/reverse?lat=${position.coords.latitude}&lng=${position.coords.longitude}`
        );
        const data = await response.json();

        if (data && (data.street || data.formatted)) {
          setStreet(data.street || data.formatted || "");
          setCity(data.city || "");
          setZipCode(data.zipCode || "");
          setAddressSelected(true);
          setShowSuggestions(false);

          const fullAddress = `${data.street || ""}, ${data.city || ""}, NY ${data.zipCode || ""}`.trim();
          lookupProperty(fullAddress);
        } else {
          setError(
            "We found your location but couldn't match it to a street address. Please enter it manually."
          );
        }
      } catch (rawError: any) {
        if (rawError?.code === 1) {
          setError(
            "Location access was denied. Please allow location access or enter your address manually."
          );
        } else if (rawError?.code === 3) {
          setError(
            "Location lookup timed out. Please try again or enter your address manually."
          );
        } else {
          setError("Failed to fetch address details.");
        }
      } finally {
        setLocating(false);
      }
    })();
  };

  const handleContinue = () => {
    if (!street || !city || !zipCode) {
      setError("Please enter your full address to continue.");
      return;
    }

    const resolvedPropertySize =
      showManualSelector || !propertyData?.propertySize
        ? manualSize
        : propertyData.propertySize;

    const resolvedMosquitoTickSize =
      showManualSelector || !propertyData?.mosquitoTickSize
        ? manualSize
        : propertyData.mosquitoTickSize;

    onComplete({
      street,
      city,
      zipCode,
      propertySize: resolvedPropertySize,
      mosquitoTickSize: resolvedMosquitoTickSize,
      sqft: propertyData?.sqft ?? null,
      lotSizeAcres: propertyData?.lotSizeAcres ?? null,
    });
  };

  const hasPropertyResult =
    propertyData !== null && !lookingUp;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider uppercase mb-5">
          <Home size={14} /> Step 1
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
          Where's your home?
        </h2>
        <p className="text-white/55 text-lg max-w-lg mx-auto">
          We'll look up your property details to show you accurate pricing for
          your home size.
        </p>
      </div>

      {/* Address input card */}
      <div className="rounded-3xl border border-white/10 bg-card/40 backdrop-blur-xl p-6 md:p-8 overflow-visible">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h3 className="text-xl font-bold text-white">Service Location</h3>
          <button
            type="button"
            onClick={handleDetectLocation}
            disabled={locating}
            className="flex items-center gap-2 text-sm font-bold bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/30 px-4 py-2 rounded-lg transition-colors"
          >
            <Navigation
              size={14}
              className={locating ? "animate-spin" : ""}
            />
            {locating ? "Detecting..." : "Use Current Location"}
          </button>
        </div>

        <div className="space-y-4">
          {/* Street */}
          <div className="space-y-2 relative" ref={suggestionsRef}>
            <label
              htmlFor="wizard-street"
              className="text-sm font-semibold text-white/80 flex items-center gap-2"
            >
              <MapPin size={16} className="text-green-400" /> Street Address
            </label>
            <input
              ref={streetInputRef}
              id="wizard-street"
              type="text"
              autoComplete="street-address"
              placeholder="Start typing your address..."
              className="w-full bg-background/50 border border-white/10 focus:border-green-500/50 rounded-xl px-4 py-4 text-white text-lg placeholder:text-white/30 outline-none transition-colors"
              value={street}
              onChange={(e) => handleAddressChange(e.target.value)}
              onKeyDown={handleAddressKeyDown}
              onFocus={() => {
                if (suggestions.length > 0) setShowSuggestions(true);
              }}
              role="combobox"
              aria-autocomplete="list"
              aria-expanded={showSuggestions && suggestions.length > 0}
            />
            {autocompleteLoading && (
              <p className="mt-2 text-xs text-white/40 flex items-center gap-2">
                <Loader2 size={12} className="animate-spin" /> Looking up
                addresses…
              </p>
            )}

            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute z-50 w-full mt-2 bg-card border border-border rounded-xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto">
                {suggestions.map((suggestion, i) => {
                  const highlighted = i === highlightedIndex;
                  return (
                    <li
                      key={suggestion.place_id ?? i}
                      role="option"
                      aria-selected={highlighted}
                      onMouseEnter={() => setHighlightedIndex(i)}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        selectSuggestion(suggestion);
                      }}
                      className={`px-4 py-3 cursor-pointer border-b border-white/5 last:border-0 transition-colors flex items-center gap-3 ${
                        highlighted ? "bg-white/10" : "hover:bg-white/5"
                      }`}
                    >
                      <Map
                        size={16}
                        className="text-white/40 flex-shrink-0"
                      />
                      <div>
                        <p className="text-sm font-semibold text-white/90">
                          {suggestion.structured_formatting?.main_text ||
                            suggestion.description}
                        </p>
                        <p className="text-xs text-white/50">
                          {suggestion.structured_formatting?.secondary_text ||
                            ""}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* City + Zip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="wizard-city"
                className="text-sm font-semibold text-white/80"
              >
                City
              </label>
              <input
                id="wizard-city"
                type="text"
                autoComplete="address-level2"
                placeholder="Islandia"
                className="w-full bg-background/50 border border-white/10 focus:border-green-500/50 rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="wizard-zip"
                className="text-sm font-semibold text-white/80"
              >
                ZIP Code
              </label>
              <input
                id="wizard-zip"
                type="text"
                autoComplete="postal-code"
                inputMode="numeric"
                pattern="\d{5}"
                maxLength={5}
                placeholder="11749"
                className="w-full bg-background/50 border border-white/10 focus:border-green-500/50 rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors"
                value={zipCode}
                onChange={(e) =>
                  setZipCode(e.target.value.replace(/\D/g, "").slice(0, 5))
                }
              />
            </div>
          </div>
        </div>

        {/* Property lookup loading */}
        <AnimatePresence>
          {lookingUp && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 flex items-center gap-3 p-5 rounded-2xl bg-green-500/5 border border-green-500/20"
            >
              <div className="w-10 h-10 rounded-xl bg-green-500/15 flex items-center justify-center flex-shrink-0">
                <Loader2 size={20} className="animate-spin text-green-400" />
              </div>
              <div>
                <p className="text-white font-medium text-sm">Matching your home...</p>
                <p className="text-white/40 text-xs mt-0.5">Checking Suffolk County records</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Property matched — clean confirmation */}
        <AnimatePresence>
          {hasPropertyResult && propertyData.found && propertyData.sqft && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="mt-6"
            >
              <div className="rounded-2xl border border-green-500/25 bg-gradient-to-br from-green-500/10 to-emerald-500/5 p-6 text-center">
                {/* Animated checkmark */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.15 }}
                  className="w-14 h-14 rounded-full bg-green-500/20 border-2 border-green-400/40 flex items-center justify-center mx-auto mb-4"
                >
                  <Check size={28} className="text-green-400" strokeWidth={3} />
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-white font-bold text-lg"
                >
                  We&apos;ve matched your home!
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45 }}
                  className="text-white/50 text-sm mt-1"
                >
                  Loading your personalized plans...
                </motion.p>

                {/* Progress bar */}
                <div className="mt-4 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.3, ease: "easeInOut", delay: 0.3 }}
                    className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-400"
                  />
                </div>

                {/* Subtle override link */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowManualSelector(!showManualSelector);
                  }}
                  className="mt-4 inline-flex items-center gap-1 text-xs text-white/30 hover:text-white/50 transition-colors"
                >
                  Not your home?{" "}
                  <ChevronDown
                    size={12}
                    className={`transition-transform ${showManualSelector ? "rotate-180" : ""}`}
                  />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Property found but no sqft — need manual input */}
        <AnimatePresence>
          {hasPropertyResult && propertyData.found && !propertyData.sqft && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6"
            >
              <div className="rounded-2xl border border-amber-500/25 bg-amber-500/5 p-5">
                <p className="text-amber-300 text-sm font-medium mb-1">
                  We found your property{propertyData.lotSizeAcres ? ` (${propertyData.lotSizeAcres} acre lot)` : ""} but couldn't pull the home's square footage.
                </p>
                <p className="text-white/50 text-sm">
                  Please select your approximate home size below so we can show you accurate pricing.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Property not found at all */}
        <AnimatePresence>
          {hasPropertyResult && !propertyData.found && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6"
            >
              <div className="rounded-2xl border border-amber-500/25 bg-amber-500/5 p-5">
                <p className="text-amber-300 text-sm font-medium mb-1">
                  We couldn't find property details for this address.
                </p>
                <p className="text-white/50 text-sm">
                  No worries — just pick the option that best matches your home size below.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Manual property size selector */}
        <AnimatePresence>
          {(showManualSelector ||
            (hasPropertyResult && !propertyData.found) ||
            (hasPropertyResult && propertyData.found && !propertyData.sqft)) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6"
            >
              <p className="text-sm font-semibold text-white/70 mb-3">
                Select your home size:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {PROPERTY_SIZE_OPTIONS.map((option) => {
                  const selected = manualSize === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setManualSize(option.id)}
                      className={`rounded-xl border px-3 py-3 text-left transition-all ${
                        selected
                          ? "border-green-500 bg-green-500/10"
                          : "border-white/10 bg-card/40 hover:border-white/20"
                      }`}
                    >
                      <span
                        className={`font-bold text-sm ${selected ? "text-white" : "text-white/70"}`}
                      >
                        {option.label}
                      </span>
                      <p
                        className={`text-xs mt-0.5 ${selected ? "text-white/60" : "text-white/40"}`}
                      >
                        {option.sqftRangeLabel}
                      </p>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error */}
        {error && (
          <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        {/* Continue button */}
        <div className="mt-8">
          <button
            type="button"
            onClick={handleContinue}
            disabled={!addressSelected && (!street || !city || !zipCode)}
            className="w-full py-4 rounded-2xl bg-green-500 hover:bg-green-400 text-white font-display font-bold text-lg flex items-center justify-center gap-3 transition-all hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] disabled:opacity-40 disabled:cursor-not-allowed group"
          >
            See My Plans
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
          <p className="text-center text-white/30 text-xs mt-3">
            We use this only to personalize pricing — never shared.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
