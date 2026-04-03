"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Calendar, Clock, MapPin, CreditCard, ShieldCheck } from "lucide-react";
import Footer from "@/components/Footer/Footer";

function BookingContent() {
  const searchParams = useSearchParams();
  const planId = searchParams.get("plan");
  const billing = searchParams.get("billing") || "monthly";
  const sessionId = searchParams.get("session_id");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [form, setForm] = useState({
    street: "",
    zipCode: "",
    date: "",
    time: "",
  });

  // Derived Title for Display
  const planTitle = planId === "home-protection" ? "Home Protection Plan" 
                  : planId === "total-shield" ? "Total Shield Plan" 
                  : "Basic Shield Plan";

  if (sessionId) {
    return (
      <div className="flex-1 flex items-center justify-center pt-32 pb-24 px-4">
        <div className="glass-card p-12 rounded-3xl text-center max-w-xl border-green-500/30">
          <div className="w-20 h-20 bg-green-500/20 border border-green-500/40 rounded-full flex items-center justify-center mx-auto mb-6 text-green-400">
            <ShieldCheck size={40} />
          </div>
          <h1 className="text-4xl font-display font-bold text-white mb-4">Payment Successful!</h1>
          <p className="text-white/70 text-lg mb-8">
            Your appointment has been securely locked in. A Squito technician will reach out directly to confirm your arrival window. Welcome to the Squito family!
          </p>
          <a href="/" className="px-8 py-3 rounded-xl bg-green-500 text-white font-bold hover:bg-green-600 transition-colors">
            Return Home
          </a>
        </div>
      </div>
    );
  }

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
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
          time: form.time,
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
        <div className="flex-1">
          <form onSubmit={handleCheckout} className="space-y-8 glass-card p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-white mb-2">Service Details</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/80 flex items-center gap-2">
                  <MapPin size={16} className="text-green-400" /> Street Address
                </label>
                <input
                  type="text"
                  required
                  placeholder="123 Main St"
                  className="w-full bg-background/50 border border-white/10 focus:border-green-500/50 rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none"
                  value={form.street}
                  onChange={e => setForm(f => ({ ...f, street: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/80">ZIP Code</label>
                <input
                  type="text"
                  required
                  placeholder="11501"
                  className="w-full bg-background/50 border border-white/10 focus:border-green-500/50 rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none"
                  value={form.zipCode}
                  onChange={e => setForm(f => ({ ...f, zipCode: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white/80 flex items-center gap-2">
                    <Calendar size={16} className="text-green-400" /> Desired Date
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full bg-background/50 border border-white/10 focus:border-green-500/50 rounded-xl px-4 py-3 text-white outline-none"
                    value={form.date}
                    onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white/80 flex items-center gap-2">
                    <Clock size={16} className="text-green-400" /> Desired Time
                  </label>
                  <input
                    type="time"
                    required
                    className="w-full bg-background/50 border border-white/10 focus:border-green-500/50 rounded-xl px-4 py-3 text-white outline-none"
                    value={form.time}
                    onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-semibold">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-8 py-4 rounded-xl bg-green-500 hover:bg-green-600 transition-colors text-white font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <CreditCard size={20} />
              {loading ? "Connecting to Secure Stripe Portal..." : "Proceed to Payment ($1.00)"}
            </button>
            <p className="text-center text-white/40 text-xs mt-4">Safe, secure 256-bit SSL encrypted checkout hosted by Stripe.</p>
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
              <p className="text-white font-bold">$1.00</p>
            </div>
            
            <div className="flex justify-between items-start mb-6 text-sm">
              <p className="text-white/60">Taxes & Fees</p>
              <p className="text-white/60">$0.00</p>
            </div>

            <div className="flex justify-between items-center py-4 border-t border-white/10">
              <p className="text-white font-bold text-lg">Total Due Today</p>
              <p className="text-green-400 font-display font-bold text-2xl">$1.00</p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-center gap-2 opacity-60">
              <ShieldCheck size={16} className="text-white" />
              <span className="text-xs text-white">Guaranteed Long Term Protection</span>
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
