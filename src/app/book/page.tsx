"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Calendar, Clock, MapPin, CreditCard, ShieldCheck, Navigation, Sun, Moon, Map } from "lucide-react";
import Footer from "@/components/Footer/Footer";

function BookingContent() {
  const searchParams = useSearchParams();
  const planId = searchParams.get("plan");
  const billing = searchParams.get("billing") || "monthly";
  const sessionId = searchParams.get("session_id");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [locating, setLocating] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    zipCode: "",
    date: "",
    time: "", 
  });

  // Handle clicking outside suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const ONE_TIME_IDS = ["termite-inspection", "wasp-removal", "mosquito-event-spray"];
  const isOneTimeService = ONE_TIME_IDS.includes(planId ?? "");

  const planTitle = isOneTimeService
    ? planId === "termite-inspection" ? "Termite Inspection"
      : planId === "wasp-removal" ? "Wasp Nest Removal"
      : "Mosquito Event Spray"
    : planId === "premium-shield" ? "Premium Shield Plan"
    : planId === "ultimate-fortress" ? "Ultimate Fortress Plan"
    : "Essential Defense Plan";

  const initialFee = isOneTimeService
    ? planId === "termite-inspection" ? 149
      : planId === "wasp-removal" ? 249
      : 199 // Mosquito Event Spray
    : planId === "premium-shield" ? 299.99
    : planId === "ultimate-fortress" ? 399.99
    : 199.99;

  const isYearly = billing === "yearly";

  const yearlyAmount = isYearly && !isOneTimeService
    ? planId === "premium-shield" ? 863.88
      : planId === "ultimate-fortress" ? 1247.88
      : 479.88
    : 0;

  const activeInitialFee = isYearly ? 0 : initialFee;
  const subtotal = activeInitialFee + yearlyAmount;

  // NY State + Nassau County sales tax (8.625%)
  const NY_TAX_RATE = 0.08625;
  const taxAmount = Math.round(subtotal * NY_TAX_RATE * 100) / 100;
  const totalDue = Math.round((subtotal + taxAmount) * 100) / 100;

  // Geoapify Location Detection
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
          const GEOAPIFY_KEY = process.env.NEXT_PUBLIC_GEOAPIFY_KEY || "fe143800e1084a298fb7fb8e34dab7d2";
          const response = await fetch(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&apiKey=${GEOAPIFY_KEY}`
          );
          const data = await response.json();
          
          if (data && data.features && data.features.length > 0) {
            const result = data.features[0].properties;
            const streetStr = result.housenumber ? `${result.housenumber} ${result.street}` : result.street;
            
            setForm(prev => ({
              ...prev,
              street: streetStr || result.formatted.split(',')[0],
              city: result.city || "",
              zipCode: result.postcode || ""
            }));
            setShowSuggestions(false);
          } else {
            setError("Could not pinpoint exact address. Please enter manually.");
          }
        } catch (err) {
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

  // Geoapify Predictive Autocomplete
  const handleAddressChange = async (val: string) => {
    setForm(prev => ({ ...prev, street: val }));
    
    if (val.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    
    try {
      const GEOAPIFY_KEY = process.env.NEXT_PUBLIC_GEOAPIFY_KEY || "fe143800e1084a298fb7fb8e34dab7d2";
      // Proximity biased towards Islip, NY (approx center of Long Island) to give users hyper-accurate local recommendations
      const res = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(val)}&format=json&filter=countrycode:us&bias=proximity:-73.134960,40.789142&apiKey=${GEOAPIFY_KEY}`);
      const data = await res.json();
      
      if (data && data.results) {
        setSuggestions(data.results.filter((res: any) => res.street || Object.keys(res).length > 0));
        setShowSuggestions(true);
      }
    } catch (e) {
      console.error("Autocomplete Error", e);
    }
  };

  const selectSuggestion = (suggestion: any) => {
    const streetStr = suggestion.housenumber ? `${suggestion.housenumber} ${suggestion.street}` : suggestion.street;
    setForm(prev => ({
      ...prev,
      street: streetStr || suggestion.address_line1 || suggestion.formatted.split(',')[0],
      city: suggestion.city || "",
      zipCode: suggestion.postcode || ""
    }));
    setShowSuggestions(false);
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
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
          planId: planId || "essential-defense",
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
    <div className="container mx-auto px-4 lg:px-8 max-w-6xl flex-grow pt-32 pb-24">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Secure Checkout</h1>
        <p className="text-white/70 text-lg">Schedule your inspection and finalize your protection plan.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Checkout Form */}
        <div className="flex-1 space-y-8">
          
          {/* Contact Block */}
          <div className="glass-card p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/80">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full bg-background/50 border border-white/10 focus:border-green-500/50 rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors"
                  value={form.fullName}
                  onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/80">Email Address (For Receipt)</label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  className="w-full bg-background/50 border border-white/10 focus:border-green-500/50 rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/80">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="(555) 123-4567"
                  className="w-full bg-background/50 border border-white/10 focus:border-green-500/50 rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors"
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                />
              </div>
            </div>
          </div>
          
          {/* Location Block */}
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
                <label className="text-sm font-semibold text-white/80 flex items-center gap-2">
                  <MapPin size={16} className="text-green-400" /> Street Address
                </label>
                <input
                  type="text"
                  required
                  placeholder="123 Main St"
                  className="w-full bg-background/50 border border-white/10 focus:border-green-500/50 rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors"
                  value={form.street}
                  onChange={e => handleAddressChange(e.target.value)}
                  onFocus={() => {
                    if (suggestions.length > 0) setShowSuggestions(true);
                  }}
                />
                
                {/* Geoapify Interactive Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute z-50 w-full mt-2 bg-neutral-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto">
                    {suggestions.map((suggestion, i) => (
                      <div 
                        key={i} 
                        onClick={() => selectSuggestion(suggestion)}
                        className="px-4 py-3 hover:bg-white/5 cursor-pointer border-b border-white/5 last:border-0 transition-colors flex items-center gap-3"
                      >
                        <Map size={16} className="text-white/40 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-white/90">{suggestion.address_line1}</p>
                          <p className="text-xs text-white/50">{suggestion.address_line2}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white/80">City *</label>
                  <input
                    type="text"
                    required
                    placeholder="Islandia"
                    className="w-full bg-background/50 border border-white/10 focus:border-green-500/50 rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors"
                    value={form.city}
                    onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white/80">ZIP Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="11501"
                    className="w-full bg-background/50 border border-white/10 focus:border-green-500/50 rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors"
                    value={form.zipCode}
                    onChange={e => setForm(f => ({ ...f, zipCode: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Scheduling Block */}
          <div className="glass-card p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-white mb-6">Schedule Service</h2>
            
            <div className="space-y-4 mb-8">
              <label className="text-sm font-semibold text-white/80 flex items-center gap-2">
                <Calendar size={16} className="text-green-400" /> Desired Date
              </label>
              <input
                type="date"
                required
                className="w-full bg-white/10 border-2 border-white/20 hover:border-green-500/50 focus:border-green-500 rounded-xl px-4 py-3 md:px-6 md:py-5 text-white text-base md:text-xl font-bold outline-none transition-colors cursor-pointer shadow-lg"
                style={{ colorScheme: "dark" }}
                min={new Date().toISOString().split('T')[0]} 
                value={form.date}
                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
              />
            </div>

            {/* Custom AM/PM Toggle */}
            <div className="space-y-4">
              <label className="text-sm font-semibold text-white/80 flex items-center gap-2">
                <Clock size={16} className="text-green-400" /> Arrival Window
              </label>
              <div className="grid grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => setForm(f => ({ ...f, time: "AM" }))}
                  className={`flex flex-col items-center justify-center gap-2 py-4 rounded-xl border transition-all ${
                    form.time === "AM"
                      ? "bg-blue-500/20 border-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                      : "bg-background/40 border-white/10 text-white/50 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Sun size={24} className={form.time === "AM" ? "text-blue-400 animate-pulse" : ""} />
                  <span className="font-bold">Morning</span>
                  <span className="text-xs opacity-70">8:00 AM - 12:00 PM</span>
                </button>
                
                <button
                  type="button"
                  onClick={() => setForm(f => ({ ...f, time: "PM" }))}
                  className={`flex flex-col items-center justify-center gap-2 py-4 rounded-xl border transition-all ${
                    form.time === "PM"
                      ? "bg-amber-500/20 border-amber-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                      : "bg-background/40 border-white/10 text-white/50 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Moon size={24} className={form.time === "PM" ? "text-amber-400 animate-pulse" : ""} />
                  <span className="font-bold">Afternoon</span>
                  <span className="text-xs opacity-70">12:00 PM - 4:00 PM</span>
                </button>

                <button
                  type="button"
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

              {/* Animated Conclusive Text underneath Time Selection */}
              <div className="mt-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 animate-pulse">
                <p className="text-center font-semibold text-green-400 text-sm flex items-center justify-center gap-2 tracking-wide">
                  <ShieldCheck size={16} /> A team member will reach out to confirm a time with you!
                </p>
              </div>
            </div>

          </div>

          <form onSubmit={handleCheckout}>
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-semibold text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-green-500 hover:bg-green-600 transition-all text-white font-bold text-lg flex items-center justify-center gap-3 disabled:opacity-50 hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]"
            >
              <CreditCard size={20} />
              {loading ? "Connecting to Secure Checkout..." : "Proceed to Checkout"}
            </button>
            <p className="text-center text-white/40 text-xs mt-4 flex items-center justify-center gap-2">
               Safe, secure 256-bit SSL encrypted checkout hosted by Stripe.
            </p>
          </form>
        </div>

        {/* Order Summary Panel */}
        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="glass-card p-8 rounded-3xl sticky top-32">
            <h2 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Order Summary</h2>
            
            {isOneTimeService ? (
              /* ── One-Time Service Summary ── */
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
              /* ── Subscription Summary ── */
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

                {isYearly && !isOneTimeService && (
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
                    {isYearly && !isOneTimeService 
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
                 <span className="text-xs text-white">Geoapify Precision Mapping</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Suspense fallback={<div className="flex-1 flex items-center justify-center"><p className="text-white/50">Loading Checkout...</p></div>}>
        <BookingContent />
      </Suspense>
      <Footer />
    </main>
  );
}
