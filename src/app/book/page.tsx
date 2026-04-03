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
    street: "",
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

  const planTitle = planId === "home-protection" ? "Home Protection Plan" 
                  : planId === "total-shield" ? "Total Shield Plan" 
                  : "Basic Shield Plan";

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
        setError("Location access denied or unavailable. Please enter manually.");
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
      const res = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(val)}&format=json&apiKey=${GEOAPIFY_KEY}`);
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
          planId: planId || "basic-shield",
          propertyType: "Residential",
          street: form.street,
          zipCode: form.zipCode,
          date: form.date, 
          time: form.time === "AM" ? "8am - 12pm" : "12pm - 4pm", 
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

              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/80">ZIP Code</label>
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
                className="w-full bg-white/10 border-2 border-white/20 hover:border-green-500/50 focus:border-green-500 rounded-xl px-6 py-5 text-white text-xl font-bold outline-none transition-colors cursor-pointer shadow-lg"
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
              <div className="grid grid-cols-2 gap-4">
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
              {loading ? "Connecting to Secure Test Portal..." : "Proceed to Free Checkout (Test)"}
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
            
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-white font-medium">{planTitle}</p>
                <p className="text-white/50 text-sm">Billed {billing}</p>
              </div>
              <p className="text-white font-bold">$0.00</p>
            </div>
            
            <div className="flex justify-between items-start mb-6 text-sm">
              <p className="text-white/60">Taxes & Fees</p>
              <p className="text-white/60">$0.00</p>
            </div>

            <div className="flex justify-between items-center py-4 border-t border-white/10">
              <p className="text-white font-bold text-lg">Total Due Today</p>
              <p className="text-green-400 font-display font-bold text-2xl">$0.00</p>
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
