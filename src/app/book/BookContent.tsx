"use client";

import { Suspense, useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Calendar, Clock, MapPin, CreditCard, ShieldCheck, Navigation, Sun, Moon, Map, Loader2, Bug, CalendarClock, Snowflake, ArrowRight } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer/Footer";
import {
  DEFAULT_PROPERTY_SIZE,
  getOneTimeService,
  getSubscriptionCheckoutBreakdown,
  TAX_RATE,
  buildQuoteRequestHref,
  formatSelectedPlanName,
  getPropertySizeConfig,
  resolvePropertySize,
  type PropertySize,
} from "@/data/plans";
import {
  buildSpecialtyQuoteHref,
  calculateSpecialtyQuote,
  deserializeSpecialtySelection,
  getSpecialtyService,
} from "@/data/specialtyServices";
import {
  DEFAULT_MOSQUITO_TICK_SIZE,
  buildMosquitoTickHelpHref,
  buildMosquitoTickQuoteHref,
  formatMosquitoTickBillingSummary,
  formatMosquitoTickPackageName,
  getMosquitoTickBillingPlan,
  getMosquitoTickPackage,
  getMosquitoTickReservationPlan,
  resolveMosquitoTickYardSize,
} from "@/data/mosquitoTickPackages";
import PropertySizeSelector from "@/components/Plans/PropertySizeSelector";

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

type GeolocationRequestOptions = {
  enableHighAccuracy: boolean;
  timeout: number;
  maximumAge?: number;
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
  const requestedServiceType = searchParams.get("serviceType");
  const requestedServiceId = searchParams.get("serviceId");
  const requestedSpecialtySelection = searchParams.get("selection");
  const requestedSize = resolvePropertySize(searchParams.get("size"));
  const wasCancelled = searchParams.get("canceled") === "1" || searchParams.get("cancelled") === "1";
  // Promo code: auto-applied at Stripe checkout when present. Normalized to
  // upper-case + trimmed, max 40 chars (Stripe promotion codes are case-insensitive
  // but Stripe's own dashboard stores them upper-cased).
  const rawPromo = searchParams.get("promo") ?? "";
  const promoCode = rawPromo.trim().toUpperCase().slice(0, 40);

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
  const [propertySize, setPropertySize] = useState<PropertySize>(requestedSize || DEFAULT_PROPERTY_SIZE);

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

  // ─── Mosquito & Tick package resolution ─────────────────────────────────────
  // URL params:
  //   serviceType=mosquito-tick
  //   size=small|medium|large|xl
  //   intent=current|reserve   (only meaningful during end-of-season-nudge)
  const isMosquitoTick = requestedServiceType === "mosquito-tick";
  const mosquitoTickSize = isMosquitoTick
    ? resolveMosquitoTickYardSize(searchParams.get("size") ?? DEFAULT_MOSQUITO_TICK_SIZE)
    : null;
  const mosquitoTickPackage = mosquitoTickSize ? getMosquitoTickPackage(mosquitoTickSize) ?? null : null;
  const urlIntent = searchParams.get("intent");
  const [mosquitoTickIntent, setMosquitoTickIntent] = useState<"current" | "reserve" | null>(
    urlIntent === "current" || urlIntent === "reserve" ? urlIntent : null
  );

  // Compute the billing plan once per render. Recomputed if the user flips
  // between "book what's left" and "reserve for April" from the dual-CTA
  // picker below.
  const mosquitoTickBillingPlan = useMemo(() => {
    if (!mosquitoTickPackage) return null;
    if (mosquitoTickIntent === "reserve") {
      return getMosquitoTickReservationPlan(mosquitoTickPackage);
    }
    return getMosquitoTickBillingPlan(mosquitoTickPackage);
  }, [mosquitoTickPackage, mosquitoTickIntent]);

  const mosquitoTickNeedsChoice =
    isMosquitoTick &&
    mosquitoTickBillingPlan?.mode === "end-of-season-nudge" &&
    mosquitoTickIntent === null;
  const mosquitoTickIsReservation =
    isMosquitoTick && mosquitoTickBillingPlan?.mode === "off-season-reservation";
  const mosquitoTickIsQuoteOnly = isMosquitoTick && mosquitoTickPackage?.quoteOnly === true;

  const specialtyService =
    !isMosquitoTick && requestedServiceType === "specialty"
      ? getSpecialtyService(requestedServiceId ?? "")
      : null;
  const specialtySelection = specialtyService ? deserializeSpecialtySelection(requestedSpecialtySelection) : null;
  const specialtyQuote = specialtyService ? calculateSpecialtyQuote(specialtyService.id, specialtySelection) : null;
  const isSpecialty = Boolean(specialtyService);
  const billing = isMosquitoTick
    ? "monthly"
    : isSpecialty
      ? "onetime"
      : searchParams.get("billing") || "monthly";

  const resolvedOneTimePlan = !isSpecialty && !isMosquitoTick ? getOneTimeService(requestedPlanId ?? "") : undefined;
  const isOneTime = Boolean(resolvedOneTimePlan) || isSpecialty;
  const oneTimePlan = resolvedOneTimePlan;
  const isYearly = billing === "yearly";
  const effectivePlanId = oneTimePlan?.id ?? requestedPlanId ?? "essential-defense";
  const checkoutBreakdown = !isOneTime && !isMosquitoTick
    ? getSubscriptionCheckoutBreakdown(effectivePlanId, propertySize, isYearly ? "yearly" : "monthly")
    : null;
  const isQuoteOnlyPlan = !isOneTime && !isMosquitoTick && propertySize === "xl";
  const quoteHref = buildQuoteRequestHref({
    planId: effectivePlanId,
    size: propertySize,
    billing,
    source: "book page",
  });
  const specialtyQuoteHref = specialtyService
    ? buildSpecialtyQuoteHref(specialtyService.id, specialtySelection ?? undefined, "specialty checkout")
    : "/contact";
  const mosquitoTickQuoteHref = mosquitoTickPackage
    ? buildMosquitoTickQuoteHref(mosquitoTickPackage.id, "mosquito-tick checkout")
    : "/contact";
  const mosquitoTickHelpHref = buildMosquitoTickHelpHref("mosquito-tick checkout");

  // Mosquito & tick monthly pricing (tax is added per monthly charge, same as
  // the existing subscription flow).
  const mosquitoTickMonthlyPrice = mosquitoTickBillingPlan?.monthlyPrice ?? 0;
  const mosquitoTickMonthlyTax = Math.round(mosquitoTickMonthlyPrice * TAX_RATE * 100) / 100;
  const mosquitoTickMonthlyTotal = Math.round((mosquitoTickMonthlyPrice + mosquitoTickMonthlyTax) * 100) / 100;
  const mosquitoTickSeasonSubtotal = mosquitoTickBillingPlan?.seasonTotalBeforeTax ?? 0;
  const mosquitoTickSeasonTax = Math.round(mosquitoTickSeasonSubtotal * TAX_RATE * 100) / 100;
  const mosquitoTickSeasonTotal = Math.round((mosquitoTickSeasonSubtotal + mosquitoTickSeasonTax) * 100) / 100;

  const planTitle = isMosquitoTick
    ? mosquitoTickPackage
      ? formatMosquitoTickPackageName(mosquitoTickPackage)
      : "Mosquito & Tick Package"
    : isSpecialty
    ? specialtyService?.name ?? "Specialty Service"
    : isOneTime
      ? oneTimePlan?.name ?? "Squito Service"
      : formatSelectedPlanName(effectivePlanId, propertySize);
  const initialFee = isMosquitoTick
    ? 0
    : isSpecialty
    ? specialtyQuote?.subtotal ?? 0
    : isOneTime
      ? oneTimePlan?.price ?? 0
    : checkoutBreakdown && !checkoutBreakdown.quoteOnly
      ? checkoutBreakdown.initialFee
      : 0;
  const yearlyAmount = isYearly && checkoutBreakdown && !checkoutBreakdown.quoteOnly ? checkoutBreakdown.yearlyTotal : 0;
  const subtotal = isMosquitoTick
    ? mosquitoTickMonthlyPrice
    : isSpecialty
    ? specialtyQuote?.subtotal ?? 0
    : isOneTime
      ? oneTimePlan?.price ?? 0
    : checkoutBreakdown && !checkoutBreakdown.quoteOnly
      ? checkoutBreakdown.subtotal
      : 0;
  const taxAmount = isMosquitoTick
    ? mosquitoTickMonthlyTax
    : isSpecialty
    ? specialtyQuote?.taxAmount ?? 0
    : isOneTime
      ? Math.round(((oneTimePlan?.price ?? 0) * TAX_RATE) * 100) / 100
    : checkoutBreakdown && !checkoutBreakdown.quoteOnly
      ? checkoutBreakdown.taxAmount
      : 0;
  const totalDue = isMosquitoTick
    ? mosquitoTickIsReservation
      ? 0 // reservation signups aren't charged until April 1
      : mosquitoTickMonthlyTotal
    : isSpecialty
    ? specialtyQuote?.totalDue ?? 0
    : isOneTime
      ? Math.round((subtotal + taxAmount) * 100) / 100
    : checkoutBreakdown && !checkoutBreakdown.quoteOnly
      ? checkoutBreakdown.totalDueToday
      : 0;
  const taxRateLabel = `${(TAX_RATE * 100).toFixed(3).replace(/0+$/, "").replace(/\.$/, "")}%`;
  const specialtySummary = specialtyQuote?.detailSummary ?? null;

  const requestCurrentPosition = useCallback((options: GeolocationRequestOptions) => {
    return new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }, []);

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
          position = await requestCurrentPosition({
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          });
        } catch (highAccuracyError: unknown) {
          const geoError = highAccuracyError as GeolocationPositionError;

          if (geoError.code === 1) {
            throw geoError;
          }

          position = await requestCurrentPosition({
            enableHighAccuracy: false,
            timeout: 15000,
            maximumAge: 300000,
          });
        }

        const response = await fetch(
          `/api/maps/reverse?lat=${position.coords.latitude}&lng=${position.coords.longitude}`
        );
        const data = await response.json();

        if (data && (data.street || data.formatted)) {
          setForm((prev) => ({
            ...prev,
            street: data.street || data.formatted || "",
            city: data.city || "",
            zipCode: data.zipCode || "",
          }));
          setShowSuggestions(false);
        } else {
          setError("We found your location but couldn't match it to a street address. Please enter it manually.");
        }
      } catch (rawError: unknown) {
        const geoError = rawError as GeolocationPositionError;

        if (geoError?.code === 1) {
          setError("Location access was denied. Please allow location access in your browser settings, or enter your address manually.");
        } else if (geoError?.code === 2) {
          setError("We couldn't get a reliable location from your device. Try again on Wi-Fi or enter your address manually.");
        } else if (geoError?.code === 3) {
          setError("Location lookup timed out. Please try once more or enter your address manually.");
        } else {
          setError("Failed to fetch address details.");
        }
      } finally {
        setLocating(false);
      }
    })();
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

    if (isMosquitoTick) {
      if (mosquitoTickIsQuoteOnly || !mosquitoTickPackage || !mosquitoTickBillingPlan) {
        setError("This yard size needs a custom quote. Please use the quote request flow.");
        return;
      }
      if (mosquitoTickNeedsChoice) {
        setError("Please choose whether to start this season or reserve for April 1.");
        return;
      }
    } else if (isSpecialty && (!specialtyQuote || specialtyQuote.quoteOnly)) {
      setError("This specialty service needs a custom quote before checkout.");
      return;
    } else if (!isSpecialty && !isMosquitoTick && (isQuoteOnlyPlan || !checkoutBreakdown || checkoutBreakdown.quoteOnly)) {
      setError("This home fit needs a custom quote. Please use the quote request flow instead.");
      return;
    }

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

    // For in-season mosquito-tick bookings we still collect date/time preferences
    // for the first treatment. For off-season reservations, the team schedules
    // in late March so no date/time is required.
    const requireDateTime = !mosquitoTickIsReservation;
    if (requireDateTime && (!form.date || !form.time)) {
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
          serviceType: isMosquitoTick ? "mosquito-tick" : isSpecialty ? "specialty" : undefined,
          serviceId: isMosquitoTick
            ? mosquitoTickPackage?.id
            : isSpecialty
              ? specialtyService?.id
              : undefined,
          selection: isSpecialty ? specialtyQuote?.selection : undefined,
          mosquitoTickSize: isMosquitoTick ? mosquitoTickPackage?.id : undefined,
          mosquitoTickIntent: isMosquitoTick ? (mosquitoTickIntent ?? "current") : undefined,
          promo: promoCode || undefined,
          propertyType: "Residential",
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          street: form.street,
          city: form.city,
          zipCode: form.zipCode,
          date: form.date || (mosquitoTickIsReservation ? "Schedule in late March" : ""),
          time: form.time === "AM"
            ? "8am - 12pm"
            : form.time === "PM"
              ? "12pm - 4pm"
              : form.time === "EVE"
                ? "4pm - 8pm"
                : mosquitoTickIsReservation
                  ? "We'll confirm by phone"
                  : "",
          billing: billing,
          propertySize,
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

      {!isOneTime && !isMosquitoTick && (
        <div className="mb-10 glass-card p-6 rounded-3xl">
          <PropertySizeSelector value={propertySize} onChange={setPropertySize} />
        </div>
      )}

      {isMosquitoTick && mosquitoTickPackage && !mosquitoTickIsQuoteOnly && mosquitoTickBillingPlan && (
        <div className="mb-10 glass-card p-6 md:p-8 rounded-3xl border border-green-500/20">
          <div className="flex items-start gap-4">
            <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500/15 border border-green-500/30 flex-shrink-0">
              <Bug size={22} className="text-green-300" />
            </div>
            <div className="flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-green-400 mb-1">
                Mosquito &amp; Tick Package
              </p>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-white">
                {mosquitoTickPackage.label}
              </h2>
              <p className="text-white/60 text-sm mt-1">
                {mosquitoTickPackage.sqftRangeLabel}
              </p>
            </div>
            <Link
              href={mosquitoTickHelpHref}
              className="hidden md:inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              Change yard size
            </Link>
          </div>
        </div>
      )}

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

      {requestedServiceType === "specialty" && (!specialtyService || !specialtyQuote) ? (
        <div className="glass-card rounded-3xl border border-amber-500/25 bg-amber-500/5 p-8 md:p-10">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            We couldn&apos;t load that specialty service configuration.
          </h2>
          <p className="text-white/65 text-lg leading-relaxed mb-6">
            Head back to the specialty catalog, reselect the service options you want, and we&apos;ll bring you back here with the correct pricing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/services/specialty"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-500 px-6 py-4 font-bold text-white transition-colors hover:bg-green-400"
            >
              Browse Specialty Services
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-4 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Contact Us
            </Link>
          </div>
        </div>
      ) : isMosquitoTick && mosquitoTickIsQuoteOnly ? (
        <div className="glass-card rounded-3xl border border-amber-500/25 bg-amber-500/5 p-8 md:p-10">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-amber-300 mb-5">
              Custom Quote Needed
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Let&apos;s price your estate with a tailored quote.
            </h2>
            <p className="text-white/65 text-lg leading-relaxed mb-6">
              Yards larger than one acre take a little more coordination &mdash; equipment, timing, and coverage scale differently for bigger properties.
              Send us a quick request and we&apos;ll build a package that fits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={mosquitoTickQuoteHref}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-500 px-6 py-4 font-bold text-white transition-colors hover:bg-green-400"
              >
                Request Custom Quote
              </Link>
              <a
                href="tel:6312031000"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-4 font-semibold text-white transition-colors hover:bg-white/10"
              >
                Call (631) 203-1000
              </a>
            </div>
          </div>
        </div>
      ) : mosquitoTickNeedsChoice && mosquitoTickPackage && mosquitoTickBillingPlan ? (
        <div className="glass-card rounded-3xl border border-white/10 p-8 md:p-10">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-green-300 mb-5">
              Season Almost Over
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              The current mosquito &amp; tick season ends October 31.
            </h2>
            <p className="text-white/65 text-lg leading-relaxed mb-8">
              You can still book for what&apos;s left of this season &mdash; or reserve your spot for April 1 and skip the rush.
              Either way, there&apos;s no initial fee and you can cancel anytime.
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <button
                type="button"
                onClick={() => setMosquitoTickIntent("current")}
                className="text-left rounded-2xl border border-green-500/30 bg-green-500/5 p-6 hover:border-green-500/60 hover:bg-green-500/10 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/20">
                    <CalendarClock size={18} className="text-green-300" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-300">
                    Start This Season
                  </p>
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-2">
                  Book First Treatment
                </h3>
                <p className="text-sm text-white/60 mb-4">
                  {mosquitoTickBillingPlan.monthsRemaining === 1
                    ? "1 charge remaining this season. Treatment scheduled this week."
                    : `${mosquitoTickBillingPlan.monthsRemaining} charges remaining this season. Treatment scheduled this week.`}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-green-400">
                  Continue <ArrowRight size={14} />
                </span>
              </button>

              <button
                type="button"
                onClick={() => setMosquitoTickIntent("reserve")}
                className="text-left rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-white/25 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15">
                    <Snowflake size={18} className="text-blue-300" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">
                    Off-Season Hold
                  </p>
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-2">
                  Reserve for April 1
                </h3>
                <p className="text-sm text-white/60 mb-4">
                  Lock in today&apos;s pricing. We&apos;ll call you in late March to confirm your first visit, then billing starts April 1.
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-bold text-white/70">
                  Continue <ArrowRight size={14} />
                </span>
              </button>
            </div>

            <p className="text-xs text-white/40 mt-6">
              Not sure?{" "}
              <Link href={mosquitoTickHelpHref} className="text-white/70 hover:text-white underline underline-offset-2">
                Get help choosing
              </Link>
              .
            </p>
          </div>
        </div>
      ) : isQuoteOnlyPlan ? (
        <div className="glass-card rounded-3xl border border-amber-500/25 bg-amber-500/5 p-8 md:p-10">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-amber-300 mb-5">
              Custom Quote Needed
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Let’s price your home with a tailored quote.
            </h2>
            <p className="text-white/65 text-lg leading-relaxed mb-6">
              Homes over 4,000 sqft vary too much in layout, pest pressure, and treatment scope to price instantly online.
              Send us a quick request and our team will quote the right plan for your property.
            </p>
            <div className="rounded-2xl border border-white/10 bg-background/30 p-5 mb-6">
              <p className="text-sm font-semibold text-white/80 mb-1">Selected plan</p>
              <p className="text-xl font-display font-bold text-white">{planTitle}</p>
              <p className="text-sm text-white/55 mt-2">{getPropertySizeConfig(propertySize).sqftRangeLabel}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={quoteHref}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-500 px-6 py-4 font-bold text-white transition-colors hover:bg-green-400"
              >
                Request Custom Quote
              </Link>
              <a
                href="tel:6312031000"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-4 font-semibold text-white transition-colors hover:bg-white/10"
              >
                Call (631) 203-1000
              </a>
            </div>
          </div>
        </div>
      ) : (
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
                    className="absolute z-50 w-full mt-2 bg-card border border-border rounded-xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto"
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
            <h2 className="text-2xl font-bold text-white mb-6">
              {mosquitoTickIsReservation ? "Reservation Details" : "Schedule Service"}
            </h2>

            {mosquitoTickIsReservation ? (
              <div className="mb-6 p-5 rounded-2xl bg-blue-500/5 border border-blue-500/25">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 flex-shrink-0">
                    <Snowflake size={18} className="text-blue-300" />
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-1">Service begins April 1</p>
                    <p className="text-white/60 text-sm leading-relaxed">
                      We&apos;ll call you in late March to schedule your first visit.
                      Monthly billing starts April 1 and pauses automatically after October.
                      No charge today &mdash; we just save your card on file to lock in pricing.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
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
            )}

            {!mosquitoTickIsReservation && (
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
            )}
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
              {loading
                ? "Connecting to Secure Checkout..."
                : mosquitoTickIsReservation
                  ? "Reserve My Spot"
                  : "Proceed to Checkout"}
            </button>
            <p className="text-center text-white/40 text-xs mt-4 flex items-center justify-center gap-2">
              Safe, secure 256-bit SSL encrypted checkout hosted by Stripe.
            </p>
          </div>
        </form>

        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="glass-card p-8 rounded-3xl sticky top-32">
            <h2 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Order Summary</h2>

            {promoCode && (
              <div className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-green-500/30 bg-green-500/10 px-3 py-2.5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-green-700">Promo Applied</p>
                  <p className="text-sm font-display font-bold text-foreground">{promoCode}</p>
                </div>
                <p className="text-xs text-green-700/80 text-right leading-tight max-w-[120px]">
                  Discount shown at checkout
                </p>
              </div>
            )}

            {isMosquitoTick && mosquitoTickPackage && mosquitoTickBillingPlan ? (
              <>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-white font-medium">{planTitle}</p>
                    <p className="text-white/50 text-sm">
                      {mosquitoTickIsReservation
                        ? `Reservation — ${mosquitoTickBillingPlan.seasonYear} season`
                        : "Seasonal monthly subscription"}
                    </p>
                  </div>
                  <p className="text-white/40 text-sm">{mosquitoTickPackage.shortLabel}</p>
                </div>

                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-white/80 font-semibold text-sm">Monthly Price</p>
                    <p className="text-white/40 text-xs">During active months only</p>
                  </div>
                  <p className="text-white font-bold">${mosquitoTickMonthlyPrice.toFixed(2)}</p>
                </div>

                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-white/60 text-sm">NY Sales Tax <span className="text-white/30">({taxRateLabel})</span></p>
                  </div>
                  <p className="text-white/60">${mosquitoTickMonthlyTax.toFixed(2)}</p>
                </div>

                <div className="flex justify-between items-center py-3 border-t border-white/10">
                  <p className="text-white font-semibold">Monthly Total</p>
                  <p className="text-white font-display font-bold text-lg">${mosquitoTickMonthlyTotal.toFixed(2)}</p>
                </div>

                <div className="mt-4 p-3 rounded-xl bg-green-500/5 border border-green-500/20">
                  <p className="text-green-300/80 text-xs leading-relaxed">
                    {mosquitoTickIsReservation
                      ? `No charge today. Billing starts April 1, ${mosquitoTickBillingPlan.seasonYear} and runs monthly through October ${mosquitoTickBillingPlan.seasonYear} (7 charges). Cancel anytime.`
                      : `${formatMosquitoTickBillingSummary(mosquitoTickBillingPlan)}. Billing pauses automatically after October 31. No initial fee. Cancel anytime.`}
                  </p>
                </div>
              </>
            ) : isOneTime ? (
              <>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-white font-medium">{planTitle}</p>
                    <p className="text-white/50 text-sm">{isSpecialty ? "Specialty one-time service" : "One-time service"}</p>
                  </div>
                  <p className="text-white font-bold">${initialFee.toFixed(2)}</p>
                </div>

                {specialtySummary && (
                  <div className="mb-4 rounded-xl border border-white/10 bg-white/5 p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35 mb-1">Selected scope</p>
                    <p className="text-sm text-white/75">{specialtySummary}</p>
                  </div>
                )}

                <div className="mb-4 p-3 rounded-xl bg-blue-500/5 border border-blue-500/20">
                  <p className="text-blue-300/80 text-xs leading-relaxed">
                    No subscription required. This is a single purchase charged once at checkout.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-white font-medium">{planTitle}</p>
                    <p className="text-white/50 text-sm">
                      {isYearly ? "Annual prepay - one-time charge" : "Monthly subscription"}
                    </p>
                  </div>
                  <p className="text-white/40 text-sm">{getPropertySizeConfig(propertySize).label} home</p>
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
                      ? "This is a one-time annual payment charged today, so Affirm and other pay-over-time options can recognize it as a purchase."
                  : "All plan benefits unlock immediately once today’s charge is processed. Your next recurring payment will be due next month."}
                  </p>
                </div>
              </>
            )}

            {!isMosquitoTick && (
              <>
                <div className="flex justify-between items-start mb-6 text-sm">
                  <div>
                    <p className="text-white/60">NY Sales Tax <span className="text-white/30">({taxRateLabel})</span></p>
                  </div>
                  <p className="text-white/60">${taxAmount.toFixed(2)}</p>
                </div>

                <div className="flex justify-between items-center py-4 border-t border-white/10">
                  <p className="text-white font-bold text-lg">Total Due Today</p>
                  <p className="text-green-400 font-display font-bold text-2xl">${totalDue.toFixed(2)}</p>
                </div>
              </>
            )}

            {isMosquitoTick && mosquitoTickBillingPlan && !mosquitoTickIsReservation && (
              <div className="flex justify-between items-center py-4 border-t border-white/10 mt-2">
                <div>
                  <p className="text-white font-bold text-lg">Total Due Today</p>
                  <p className="text-white/50 text-xs">First monthly charge</p>
                </div>
                <p className="text-green-400 font-display font-bold text-2xl">${mosquitoTickMonthlyTotal.toFixed(2)}</p>
              </div>
            )}

            {isMosquitoTick && mosquitoTickIsReservation && (
              <div className="flex justify-between items-center py-4 border-t border-white/10 mt-2">
                <div>
                  <p className="text-white font-bold text-lg">Total Due Today</p>
                  <p className="text-white/50 text-xs">No charge until April 1</p>
                </div>
                <p className="text-green-400 font-display font-bold text-2xl">$0.00</p>
              </div>
            )}

            {isMosquitoTick && mosquitoTickBillingPlan && (
              <div className="mt-4 flex justify-between items-center text-sm">
                <p className="text-white/50">Estimated season total</p>
                <p className="text-white/70 font-semibold">
                  ${mosquitoTickSeasonTotal.toFixed(2)}
                </p>
              </div>
            )}

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
      )}
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
