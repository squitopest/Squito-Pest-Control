"use client";

import { Suspense, useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Calendar, Clock, MapPin, CreditCard, ShieldCheck, Navigation, Sun, Moon, Map, Loader2 } from "lucide-react";
import Footer from "@/components/Footer/Footer";
import {
  getOneTimeService,
  getSubscriptionPlan,
  TAX_RATE,
} from "@/data/plans";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  zipCode: string;
  date: string;
  time: string;
};

const EMPTY_FORM: FormState = {
  fullName: "",
  email: "",
  phone: "",
  street: "",
  city: "",
  zipCode: "",
  date: "",
  time: "",
};

const FORM_STORAGE_KEY = "squito:book:form:v1";
const SUGGESTION_LIST_ID = "address-suggestion-list";
const suggestionOptionId = (i: number) => `address-suggestion-${i}`;

function BookingContent() {
  const searchParams = useSearchParams();
  const requestedPlanId = searchParams.get("plan");
  const billing = searchParams.get("billing") || "monthly";
  const wasCancelled = searchParams.get("canceled") === "1" || searchParams.get("cancelled") === "1";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [restoredFromCancel, setRestoredFromCancel] = useState(false);

  const [locating, setLocating] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [autocompleteLoading, setAutocompleteLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const streetInputRef = useRef<HTMLInputElement>(null);
  const autocompleteAbortRef = useRef<AbortController | null>(null);

  const [form, setForm] = useState<FormState>(EMPTY_FORM);

  // Restore any in-progress form if the user was bounced back from Stripe
  // (or just bailed on the tab and came back). Reusing sessionStorage keeps the
  // data on-device and auto-clears when the tab closes.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.sessionStorage.getItem(FORM_STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as Partial<FormState>;
      setForm((prev) => ({ ...prev, ...saved }));
      if (wasCancelled) setRestoredFromCancel(true);
    } catch {
      // ignore malformed storage
    }
  }, [wasCancelled]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.sessionStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(form));
    } catch {
      // storage full or disabled — not critical
    }
  }, [form]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setHighlightedIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const resolvedOneTimePlan = getOneTimeService(requestedPlanId ?? "");
  const resolvedSubscriptionPlan = getSubscriptionPlan(requestedPlanId ?? "");
  const isOneTime = Boolean(resolvedOneTimePlan);
  const oneTimePlan = resolvedOneTimePlan;
  const subPlan = !isOneTime ? (resolvedSubscriptionPlan ?? getSubscriptionPlan("essential-defense")!) : null;
  const effectivePlanId = oneTimePlan?.id ?? subPlan?.id ?? "essential-defense";

  const planTitle = oneTimePlan?.name ?? subPlan?.name ?? "Essential Defense Plan";
  const initialFee = oneTimePlan?.price ?? subPlan?.initialFee ?? 199.99;

  const isYearly = billing === "yearly";
  const yearlyAmount = isYearly && subPlan ? subPlan.yearlyTotal : 0;

  const activeInitialFee = isYearly ? 0 : initialFee;
  const subtotal = activeInitialFee + yearlyAmount;

  const NY_TAX_RATE = TAX_RATE;
  const taxAmount = Math.round(subtotal * NY_TAX_RATE * 100) / 100;
  const totalDue = Math.round((subtotal + taxAmount) * 100) / 100;

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setLocating(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const response = await fetch(
            `/api/maps/reverse?lat=${position.coords.latitude}&lng=${position.coords.longitude}`
          );
          const data = await response.json();

          if (data && data.street) {
            setForm(prev => ({
              ...prev,
              street: data.street || "",
              city: data.city || "",
              zipCode: data.zipCode || ""
            }));
            setShowSuggestions(false);
          } else {
            setError("Could not pinpoint exact address. Please enter manually.");
          }
        } catch {
          setError("Failed to fetch address details.");
        } finally {
          setLocating(false);
        }
      },
      (geoError) => {
        setLocating(false);
        if (geoError.code === 1) {
          setError("Location access was denied. Please allow location access in your browser settings, or enter your address manually.");
        } else if (geoError.code === 2) {
          setError("Location unavailable. Please enter your address manually.");
        } else {
          setError("Location request timed out. Please enter your address manually.");
        }
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleAddressChange = async (val: string) => {
    setForm(prev => ({ ...prev, street: val }));
    setHighlightedIndex(-1);

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
      const res = await fetch(`/api/maps/autocomplete?input=${encodeURIComponent(val)}`, {
        signal: controller.signal,
      });
      const data = await res.json();

      if (data.status === 'OK' && data.predictions) {
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

  const selectSuggestion = useCallback(async (suggestion: any) => {
    setShowSuggestions(false);
    setHighlightedIndex(-1);
    setForm(prev => ({ ...prev, street: suggestion.description }));

    try {
      const res = await fetch(`/api/maps/details?place_id=${encodeURIComponent(suggestion.place_id)}`);
      const data = await res.json();
      if (data.street) {
        setForm(prev => ({
          ...prev,
          street: data.street || suggestion.description,
          city: data.city || "",
          zipCode: data.zipCode || ""
        }));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleAddressKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.phone || !form.street || !form.city || !form.zipCode) {
      setError("Please complete all required contact and address fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (form.phone.replace(/\D/g, "").length < 10) {
      setError("Please enter a valid phone number.");
      return;
    }

    if (!/^\d{5}$/.test(form.zipCode)) {
      setError("Please enter a valid 5-digit ZIP code.");
      return;
    }

    if (!form.date || !form.time) {
      setError("Please select both an appointment date and time window.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: effectivePlanId,
          propertyType: "Residential",
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          street: form.street,
          city: form.city,
          zipCode: form.zipCode,
          date: form.date,
          time: form.time === "AM" ? "8am - 12pm" : form.time === "PM" ? "12pm - 4pm" : "4pm - 8pm",
          billing: billing,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to initialize secure checkout");
      }

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 max-w-6xl flex-grow pt-32 pb-24 relative">
      {loading && (
        <div
          role="status"
          aria-live="polite"
          className="fixed inset-0 z-[9999] bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4 animate-fade-in-up"
        >
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-2 border-green-500/30 border-t-green-500 animate-spin" />
            <CreditCard size={22} className="absolute inset-0 m-auto text-green-400" />
          </div>
          <p className="text-white font-display font-bold text-lg">Redirecting to secure checkout&hellip;</p>
          <p className="text-white/50 text-sm">Please don&apos;t close this tab.</p>
        </div>
      )}

      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Secure Checkout</h1>
        <p className="text-white/70 text-lg">Schedule your inspection and finalize your protection plan.</p>
      </div>

      {restoredFromCancel && (
        <div
          role="status"
          className="mb-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-sm flex items-start gap-3"
        >
          <ShieldCheck size={18} className="text-amber-300 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Checkout was cancelled — no charge was made.</p>
            <p className="text-amber-200/80">We saved your details below so you can finish booking when you&apos;re ready.</p>
          </div>
        </div>
      )}

      <div className="flex flex-col-reverse lg:flex-row gap-12">
        <form onSubmit={handleCheckout} className={`flex-1 space-y-8 ${loading ? "opacity-60 pointer-events-none" : "transition-opacity duration-300"}`} noValidate>

          <div className="glass-card p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="book-fullName" className="text-sm font-semibold text-white/80">Full Name</label>
                <input
                  id="book-fullName"
                  name="fullName"
                  type="text"
                  required
                  disabled={loading}
                  autoComplete="name"
                  placeholder="John Doe"
                  className="w-full bg-background/50 border border-white/10 focus:border-green-500/50 rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors disabled:opacity-50"
                  value={form.fullName}
                  onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="book-email" className="text-sm font-semibold text-white/80">Email Address (For Receipt)</label>
                <input
                  id="book-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  placeholder="john@example.com"
                  className="w-full bg-background/50 border border-white/10 focus:border-green-500/50 rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="book-phone" className="text-sm font-semibold text-white/80">Phone Number</label>
                <input
                  id="book-phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="(555) 123-4567"
                  className="w-full bg-background/50 border border-white/10 focus:border-green-500/50 rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors"
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                />
              </div>
            </div>
          </div>

          <div className="glass-card p-8 rounded-3xl overflow-visible">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <h2 className="text-2xl font-bold text-white">Service Location</h2>
              <button
                type="button"
                onClick={handleDetectLocation}
                disabled={locating}
                className="flex items-center gap-2 text-sm font-bold bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/30 px-4 py-2 rounded-lg transition-colors"
              >
                <Navigation size={14} className={locating ? "animate-spin" : ""} />
                {locating ? "Detecting..." : "Use Current Location"}
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2 relative" ref={suggestionsRef}>
                <label htmlFor="book-street" className="text-sm font-semibold text-white/80 flex items-center gap-2">
                  <MapPin size={16} className="text-green-400" /> Street Address
                </label>
                <input
                  ref={streetInputRef}
                  id="book-street"
                  name="street"
                  type="text"
                  required
                  autoComplete="street-address"
                  placeholder="123 Main St"
                  className="w-full bg-background/50 border border-white/10 focus:border-green-500/50 rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors"
                  value={form.street}
                  onChange={e => handleAddressChange(e.target.value)}
                  onKeyDown={handleAddressKeyDown}
                  onFocus={() => {
                    if (suggestions.length > 0) setShowSuggestions(true);
                  }}
                  role="combobox"
                  aria-autocomplete="list"
                  aria-expanded={showSuggestions && suggestions.length > 0}
                  aria-controls={SUGGESTION_LIST_ID}
                  aria-activedescendant={
                    highlightedIndex >= 0 ? suggestionOptionId(highlightedIndex) : undefined
                  }
                />
                {autocompleteLoading && (
                  <p className="mt-2 text-xs text-white/40 flex items-center gap-2">
                    <Loader2 size={12} className="animate-spin" /> Looking up addresses…
                  </p>
                )}

                {showSuggestions && suggestions.length > 0 && (
                  <ul
                    id={SUGGESTION_LIST_ID}
                    role="listbox"
                    aria-label="Matching addresses"
                    className="absolute z-50 w-full mt-2 bg-neutral-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto"
                  >
                    {suggestions.map((suggestion, i) => {
                      const highlighted = i === highlightedIndex;
                      return (
                        <li
                          key={suggestion.place_id ?? i}
                          id={suggestionOptionId(i)}
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
                          <Map size={16} className="text-white/40 flex-shrink-0" aria-hidden="true" />
                          <div>
                            <p className="text-sm font-semibold text-white/90">{suggestion.structured_formatting?.main_text || suggestion.description}</p>
                            <p className="text-xs text-white/50">{suggestion.structured_formatting?.secondary_text || ""}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="book-city" className="text-sm font-semibold text-white/80">City *</label>
                  <input
                    id="book-city"
                    name="city"
                    type="text"
                    required
                    autoComplete="address-level2"
                    placeholder="Islandia"
                    className="w-full bg-background/50 border border-white/10 focus:border-green-500/50 rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors"
                    value={form.city}
                    onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="book-zip" className="text-sm font-semibold text-white/80">ZIP Code *</label>
                  <input
                    id="book-zip"
                    name="zip"
                    type="text"
                    required
                    autoComplete="postal-code"
                    inputMode="numeric"
                    pattern="\d{5}"
                    maxLength={5}
                    placeholder="11501"
                    className="w-full bg-background/50 border border-white/10 focus:border-green-500/50 rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors"
                    value={form.zipCode}
                    onChange={e => setForm(f => ({ ...f, zipCode: e.target.value.replace(/\D/g, "").slice(0, 5) }))}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-white mb-6">Schedule Service</h2>

            <div className="space-y-4 mb-8">
              <label htmlFor="book-date" className="text-sm font-semibold text-white/80 flex items-center gap-2">
                <Calendar size={16} className="text-green-400" /> Desired Date
              </label>
              <input
                id="book-date"
                name="date"
                type="date"
                required
                className="w-full bg-white/10 border-2 border-white/20 hover:border-green-500/50 focus:border-green-500 rounded-xl px-4 py-3 md:px-6 md:py-5 text-white text-base md:text-xl font-bold outline-none transition-colors cursor-pointer shadow-lg"
                style={{ colorScheme: "dark" }}
                min={new Date().toISOString().split('T')[0]}
                value={form.date}
                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
              />
            </div>

            <fieldset className="space-y-4">
              <legend className="text-sm font-semibold text-white/80 flex items-center gap-2 mb-4">
                <Clock size={16} className="text-green-400" /> Arrival Window
              </legend>
              <div className="grid grid-cols-3 gap-4" role="radiogroup" aria-label="Arrival window">
                <button
                  type="button"
                  role="radio"
                  aria-checked={form.time === "AM"}
                  onClick={() => setForm(f => ({ ...f, time: "AM" }))}
                  className={`flex flex-col items-center justify-center gap-2 py-4 rounded-xl border transition-all ${
                    form.time === "AM"
                      ? "bg-blue-500/20 border-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                      : "bg-background/40 border-white/10 text-white/50 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Sun size={24} aria-hidden="true" className={form.time === "AM" ? "text-blue-400 animate-pulse" : ""} />
                  <span className="font-bold">Morning</span>
                  <span className="text-xs opacity-70">8:00 AM - 12:00 PM</span>
                </button>

                <button
                  type="button"
                  role="radio"
                  aria-checked={form.time === "PM"}
                  onClick={() => setForm(f => ({ ...f, time: "PM" }))}
                  className={`flex flex-col items-center justify-center gap-2 py-4 rounded-xl border transition-all ${
                    form.time === "PM"
                      ? "bg-amber-500/20 border-amber-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                      : "bg-background/40 border-white/10 text-white/50 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Moon size={24} aria-hidden="true" className={form.time === "PM" ? "text-amber-400 animate-pulse" : ""} />
                  <span className="font-bold">Afternoon</span>
                  <span className="text-xs opacity-70">12:00 PM - 4:00 PM</span>
                </button>

                <button
                  type="button"
                  role="radio"
                  aria-checked={form.time === "EVE"}
                  onClick={() => setForm(f => ({ ...f, time: "EVE" }))}
                  className={`flex flex-col items-center justify-center gap-2 py-4 rounded-xl border transition-all ${
                    form.time === "EVE"
                      ? "bg-violet-500/20 border-violet-500 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                      : "bg-background/40 border-white/10 text-white/50 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className={form.time === "EVE" ? "text-violet-400 animate-pulse" : ""}
                  >
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                    <path d="M19 3v4" />
                    <path d="M21 5h-4" />
                  </svg>
                  <span className="font-bold">Evening</span>
                  <span className="text-xs opacity-70">4:00 PM - 8:00 PM</span>
                </button>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 animate-pulse">
                <p className="text-center font-semibold text-green-400 text-sm flex items-center justify-center gap-2 tracking-wide">
                  <ShieldCheck size={16} /> A team member will reach out to confirm a time with you!
                </p>
              </div>
            </fieldset>
          </div>

          {error && (
            <div
              role="alert"
              className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-semibold text-center"
            >
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-green-500 hover:bg-green-600 transition-all text-white font-bold text-lg flex items-center justify-center gap-3 disabled:opacity-50 hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]"
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : <CreditCard size={20} />}
              {loading ? "Connecting to Secure Checkout..." : "Proceed to Checkout"}
            </button>
            <p className="text-center text-white/40 text-xs mt-4 flex items-center justify-center gap-2">
              Safe, secure 256-bit SSL encrypted checkout hosted by Stripe.
            </p>
          </div>
        </form>

        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="glass-card p-8 rounded-3xl sticky top-32">
            <h2 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Order Summary</h2>

            {isOneTime ? (
              <>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-white font-medium">{planTitle}</p>
                    <p className="text-white/50 text-sm">One-time service</p>
                  </div>
                  <p className="text-white font-bold">${initialFee.toFixed(2)}</p>
                </div>

                <div className="mb-4 p-3 rounded-xl bg-blue-500/5 border border-blue-500/20">
                  <p className="text-blue-300/80 text-xs leading-relaxed">
                    No subscription required. This is a single visit — you will only be charged once.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-white font-medium">{planTitle}</p>
                    <p className="text-white/50 text-sm">Billed {billing}</p>
                  </div>
                  <p className="text-white/40 text-sm">Monthly</p>
                </div>

                {isYearly ? (
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-emerald-400 font-semibold text-sm">Initial Service Fee Waived</p>
                      <p className="text-emerald-400/70 text-xs">You saved ${initialFee.toFixed(2)} by paying upfront</p>
                    </div>
                    <p className="text-emerald-400 font-bold line-through opacity-50">${initialFee.toFixed(2)}</p>
                  </div>
                ) : (
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-amber-400 font-semibold text-sm">Initial Service Fee</p>
                      <p className="text-white/40 text-xs">One-time, charged today</p>
                    </div>
                    <p className="text-amber-400 font-bold">${initialFee.toFixed(2)}</p>
                  </div>
                )}

                {isYearly && !isOneTime && (
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-emerald-400 font-semibold text-sm">Annual Plan Prepayment</p>
                      <p className="text-white/40 text-xs">12 months upfront</p>
                    </div>
                    <p className="text-emerald-400 font-bold">${yearlyAmount.toFixed(2)}</p>
                  </div>
                )}

                <div className="mb-4 p-3 rounded-xl bg-amber-500/5 border border-amber-500/20">
                  <p className="text-amber-300/80 text-xs leading-relaxed">
                    {isYearly && !isOneTime
                      ? "All plan benefits unlock immediately. You are fully paid for the next 12 months!"
                      : "All plan benefits unlock immediately once your initial service fee is processed. Your monthly subscription will begin the following month."}
                  </p>
                </div>
              </>
            )}

            <div className="flex justify-between items-start mb-6 text-sm">
              <div>
                <p className="text-white/60">NY Sales Tax <span className="text-white/30">(8.625%)</span></p>
              </div>
              <p className="text-white/60">${taxAmount.toFixed(2)}</p>
            </div>

            <div className="flex justify-between items-center py-4 border-t border-white/10">
              <p className="text-white font-bold text-lg">Total Due Today</p>
              <p className="text-green-400 font-display font-bold text-2xl">${totalDue.toFixed(2)}</p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-3">
              <div className="flex items-center gap-2 opacity-60">
                <ShieldCheck size={16} className="text-white" />
                <span className="text-xs text-white">Guaranteed Long Term Protection</span>
              </div>
              <div className="flex items-center gap-2 opacity-60">
                <Navigation size={16} className="text-white" />
                <span className="text-xs text-white">Powered by Google Maps</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookContent() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Suspense fallback={<div className="flex-1 flex items-center justify-center"><p className="text-white/50">Loading Checkout...</p></div>}>
        <BookingContent />
      </Suspense>
      <Footer />
    </main>
  );
}
