"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Loader2,
  ArrowLeft,
  X,
} from "lucide-react";
import {
  getSubscriptionCheckoutBreakdown,
  formatSelectedPlanName,
  getPropertySizeConfig,
  TAX_RATE,
  type PropertySize,
} from "@/data/plans";
import {
  getMosquitoTickPackage,
  getMosquitoTickBillingPlan,
  formatMosquitoTickPackageName,
  type MosquitoTickYardSizeId,
} from "@/data/mosquitoTickPackages";

type AddOn = {
  type: "mosquito-tick" | "general-pest";
  sizeId: string;
  discountPercent?: number;
} | null;

type CheckoutStepProps = {
  planId: string;
  billing: "monthly" | "yearly";
  propertySize: PropertySize;
  street: string;
  city: string;
  zipCode: string;
  addOn: AddOn;
  onRemoveAddOn: () => void;
  onBack: () => void;
};

export default function CheckoutStep({
  planId,
  billing,
  propertySize,
  street,
  city,
  zipCode,
  addOn,
  onRemoveAddOn,
  onBack,
}: CheckoutStepProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isYearly = billing === "yearly";
  const sizeConfig = getPropertySizeConfig(propertySize);
  const breakdown = getSubscriptionCheckoutBreakdown(
    planId,
    propertySize,
    billing
  );
  const planTitle = formatSelectedPlanName(planId, propertySize);

  // Add-on pricing
  const hasMTAddOn = addOn?.type === "mosquito-tick";
  const mtPkg = hasMTAddOn
    ? getMosquitoTickPackage(addOn.sizeId as MosquitoTickYardSizeId)
    : null;
  const mtBillingPlan = mtPkg ? getMosquitoTickBillingPlan(mtPkg) : null;
  const mtMonthlyPrice = mtBillingPlan?.monthlyPrice ?? 0;
  const mtDiscount = addOn?.discountPercent ?? 0;
  const mtDiscountedPrice =
    mtDiscount > 0
      ? Math.round(mtMonthlyPrice * (1 - mtDiscount / 100) * 100) / 100
      : mtMonthlyPrice;
  const mtMonthlyTax =
    Math.round(mtDiscountedPrice * TAX_RATE * 100) / 100;

  const hasGPCAddOn = addOn?.type === "general-pest";
  const gpcAddOnBreakdown = hasGPCAddOn
    ? getSubscriptionCheckoutBreakdown("premium-shield", propertySize, "monthly")
    : null;

  // Main plan pricing
  const mainSubtotal =
    breakdown && !breakdown.quoteOnly ? breakdown.subtotal : 0;
  const mainTax =
    breakdown && !breakdown.quoteOnly ? breakdown.taxAmount : 0;
  const mainInitialFee =
    breakdown && !breakdown.quoteOnly ? breakdown.initialFee : 0;
  const mainTotal =
    breakdown && !breakdown.quoteOnly ? breakdown.totalDueToday : 0;
  const taxRateLabel = `${(TAX_RATE * 100).toFixed(3).replace(/0+$/, "").replace(/\.$/, "")}%`;

  // Combined total including add-on first month (what Stripe actually charges today)
  const addOnFirstMonth = hasMTAddOn
    ? mtDiscountedPrice
    : hasGPCAddOn && gpcAddOnBreakdown && !gpcAddOnBreakdown.quoteOnly
    ? gpcAddOnBreakdown.monthlyPrice
    : 0;
  const addOnFirstMonthTax =
    Math.round(addOnFirstMonth * TAX_RATE * 100) / 100;
  const combinedTax = mainTax + addOnFirstMonthTax;
  const combinedTotal = mainTotal + addOnFirstMonth + addOnFirstMonthTax;

  /** Today in YYYY-MM-DD using local time (not UTC) so the cutoff
   *  matches the user's actual calendar day regardless of timezone. */
  const getLocalToday = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  };

  /** iOS Safari's native date picker (scroll wheels) ignores the HTML
   *  `min` attribute entirely, so we must validate in JS. */
  const handleDateChange = (value: string) => {
    if (value < getLocalToday()) {
      setError("Please select today or a future date.");
      return;
    }
    setError(null);
    setDate(value);
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !phone) {
      setError("Please complete all required contact fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (phone.replace(/\D/g, "").length < 10) {
      setError("Please enter a valid phone number.");
      return;
    }
    if (!date || !time) {
      setError("Please select both an appointment date and time window.");
      return;
    }
    if (date < getLocalToday()) {
      setError("The selected date has already passed. Please choose today or a future date.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Store form for cancel recovery
      try {
        window.sessionStorage.setItem(
          "squito:book:form:v1",
          JSON.stringify({ fullName, email, phone, street, city, zipCode, date, time })
        );
      } catch {}

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId,
          propertyType: "Residential",
          fullName,
          email,
          phone,
          street,
          city,
          zipCode,
          date,
          time:
            time === "AM"
              ? "8am - 12pm"
              : time === "PM"
                ? "12pm - 4pm"
                : time === "EVE"
                  ? "4pm - 8pm"
                  : "",
          billing,
          propertySize,
          addOn: addOn || undefined,
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-6xl mx-auto"
    >
      {/* Loading overlay */}
      {loading && (
        <div
          role="status"
          className="fixed inset-0 z-[9999] bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4"
        >
          <div className="w-16 h-16 rounded-full border-2 border-green-500/30 border-t-green-500 animate-spin" />
          <p className="text-white font-display font-bold text-lg">
            Redirecting to secure checkout&hellip;
          </p>
          <p className="text-white/50 text-sm">
            Please don&apos;t close this tab.
          </p>
        </div>
      )}

      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider uppercase mb-5">
          Step 3
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
          Book & pay
        </h2>
        <p className="text-white/55 text-lg">
          Almost done — fill in your contact info and pick a time.
        </p>
      </div>

      <div className="flex flex-col-reverse lg:flex-row gap-12">
        {/* Form */}
        <form
          onSubmit={handleCheckout}
          className={`flex-1 space-y-8 ${loading ? "opacity-60 pointer-events-none" : ""}`}
          noValidate
        >
          {/* Contact Info */}
          <div className="glass-card p-8 rounded-3xl">
            <h3 className="text-2xl font-bold text-white mb-6">
              Contact Information
            </h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="checkout-name"
                  className="text-sm font-semibold text-white/80"
                >
                  Full Name
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="John Doe"
                  className="w-full bg-background/50 border border-white/10 focus:border-green-500/50 rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="checkout-email"
                  className="text-sm font-semibold text-white/80"
                >
                  Email Address
                </label>
                <input
                  id="checkout-email"
                  type="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  placeholder="john@example.com"
                  className="w-full bg-background/50 border border-white/10 focus:border-green-500/50 rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="checkout-phone"
                  className="text-sm font-semibold text-white/80"
                >
                  Phone Number
                </label>
                <input
                  id="checkout-phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="(555) 123-4567"
                  className="w-full bg-background/50 border border-white/10 focus:border-green-500/50 rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Address display */}
          <div className="glass-card p-8 rounded-3xl">
            <h3 className="text-2xl font-bold text-white mb-4">
              Service Location
            </h3>
            <div className="rounded-xl border border-white/10 bg-white/3 p-4 flex items-start gap-3">

              <div>
                <p className="text-white font-medium">{street}</p>
                <p className="text-white/50 text-sm">
                  {city}, NY {zipCode}
                </p>
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="glass-card p-8 rounded-3xl">
            <h3 className="text-2xl font-bold text-white mb-6">
              Schedule Service
            </h3>
            <div className="space-y-4 mb-8">
              <label
                htmlFor="checkout-date"
                className="text-sm font-semibold text-white/80 flex items-center gap-2"
              >
                Desired Date
              </label>
              <input
                id="checkout-date"
                type="date"
                required
                className="w-full max-w-full box-border bg-white/10 border-2 border-white/20 hover:border-green-500/50 focus:border-green-500 rounded-xl px-3 py-3 md:px-6 md:py-5 text-white text-sm md:text-xl font-bold outline-none transition-colors cursor-pointer shadow-lg appearance-none"
                style={{ colorScheme: "dark" }}
                min={getLocalToday()}
                value={date}
                onChange={(e) => handleDateChange(e.target.value)}
              />
            </div>

            <fieldset className="space-y-4">
              <legend className="text-sm font-semibold text-white/80 flex items-center gap-2 mb-4">
                Arrival Window
              </legend>
              <div className="grid grid-cols-3 gap-2 md:gap-4">
                {[
                  {
                    id: "AM",
                    label: "Morning",
                    sub: "8 AM – 12 PM",
                    active: "bg-blue-500/20 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]",
                  },
                  {
                    id: "PM",
                    label: "Afternoon",
                    sub: "12 – 4 PM",
                    active: "bg-amber-500/20 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]",
                  },
                  {
                    id: "EVE",
                    label: "Evening",
                    sub: "4 – 8 PM",
                    active: "bg-violet-500/20 border-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.3)]",
                  },
                ].map((slot) => {
                  const selected = time === slot.id;
                  return (
                    <button
                      key={slot.id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => setTime(slot.id)}
                      className={`flex flex-col items-center justify-center gap-1 md:gap-2 px-1 py-3 md:py-4 rounded-xl border transition-all min-w-0 overflow-hidden ${
                        selected
                          ? `${slot.active} text-white`
                          : "bg-background/40 border-white/10 text-white/50 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <span className="font-bold text-[13px] md:text-base truncate w-full text-center">{slot.label}</span>
                      <span className="text-[10px] md:text-xs opacity-70 truncate w-full text-center">{slot.sub}</span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 animate-pulse">
                <p className="text-center font-semibold text-green-400 text-sm flex items-center justify-center gap-2 tracking-wide">
                  A team member will reach out to
                  confirm a time with you!
                </p>
              </div>
            </fieldset>
          </div>

          {/* Error */}
          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-semibold text-center">
              {error}
            </div>
          )}

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-green-500 hover:bg-green-600 transition-all text-white font-bold text-lg flex items-center justify-center gap-3 disabled:opacity-50 hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]"
            >
              {loading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : null}
              {loading
                ? "Connecting to Secure Checkout..."
                : "Proceed to Checkout"}
            </button>
            <p className="text-center text-white/40 text-xs mt-4 flex items-center justify-center gap-2">
              Safe, secure 256-bit SSL encrypted checkout hosted by Stripe.
            </p>
          </div>

          {/* Back */}
          <div className="flex justify-center pt-2">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 text-white/50 hover:text-white/80 font-semibold text-sm transition-colors group"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Change my plan
            </button>
          </div>
        </form>

        {/* Order Summary Sidebar */}
        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="glass-card p-8 rounded-3xl sticky top-32">
            <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">
              Order Summary
            </h3>

            {/* Main plan */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-white font-medium">{planTitle}</p>
                <p className="text-white/50 text-sm">
                  {isYearly
                    ? "Annual prepay — one-time charge"
                    : "Monthly subscription"}
                </p>
              </div>
              <p className="text-white/40 text-sm">{sizeConfig.label}</p>
            </div>

            {isYearly && breakdown && !breakdown.quoteOnly ? (
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-emerald-400 font-semibold text-sm">
                    Initial Fee Waived
                  </p>
                  <p className="text-emerald-400/70 text-xs">
                    Saved ${mainInitialFee.toFixed(2)} by paying upfront
                  </p>
                </div>
                <p className="text-emerald-400 font-bold line-through opacity-50">
                  ${mainInitialFee.toFixed(2)}
                </p>
              </div>
            ) : (
              breakdown &&
              !breakdown.quoteOnly && (
                <>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-amber-400 font-semibold text-sm">
                        Initial Service Fee
                      </p>
                      <p className="text-white/40 text-xs">
                        Includes first month of service
                      </p>
                    </div>
                    <p className="text-amber-400 font-bold">
                      ${mainInitialFee.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-white/50 font-medium text-sm">
                        Then monthly
                      </p>
                    </div>
                    <p className="text-white/50 text-sm">
                      ${breakdown.monthlyPrice.toFixed(2)}/mo
                    </p>
                  </div>
                </>
              )
            )}

            {isYearly && breakdown && !breakdown.quoteOnly && (
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-emerald-400 font-semibold text-sm">
                    Annual Plan Prepayment
                  </p>
                  <p className="text-white/40 text-xs">12 months upfront</p>
                </div>
                <p className="text-emerald-400 font-bold">
                  ${breakdown.yearlyTotal.toFixed(2)}
                </p>
              </div>
            )}

            {/* Mosquito & Tick add-on */}
            {hasMTAddOn && mtPkg && mtBillingPlan && (
              <div className="mt-4 mb-4 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-3">

                    <div>
                      <p className="text-white font-medium text-sm">
                        Mosquito & Tick Protection
                      </p>
                      <p className="text-white/40 text-xs mt-0.5">
                        Separate seasonal subscription (Apr–Oct)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      {mtDiscount > 0 && (
                        <p className="text-white/30 text-xs line-through">
                          ${mtMonthlyPrice.toFixed(2)}/mo
                        </p>
                      )}
                      <p className="text-emerald-400 font-bold text-sm">
                        +${mtDiscountedPrice.toFixed(2)}/mo
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={onRemoveAddOn}
                      className="w-5 h-5 rounded-full bg-white/5 hover:bg-red-500/20 flex items-center justify-center text-white/30 hover:text-red-400 transition-colors"
                    >
                      <X size={10} />
                    </button>
                  </div>
                </div>
                {mtDiscount > 0 && (
                  <div className="flex items-center gap-1.5 mt-2">

                    <span className="text-xs font-semibold text-amber-300">
                      Bundle discount: {mtDiscount}% off
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* GPC add-on */}
            {hasGPCAddOn && gpcAddOnBreakdown && !gpcAddOnBreakdown.quoteOnly && (
              <div className="mt-4 mb-4 p-4 rounded-xl border border-green-500/20 bg-green-500/5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-3">

                    <div>
                      <p className="text-white font-medium text-sm">
                        Premium Shield (Add-On)
                      </p>
                      <p className="text-white/40 text-xs mt-0.5">
                        Year-round monthly subscription
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-green-400 font-bold text-sm">
                      +${gpcAddOnBreakdown.monthlyPrice.toFixed(2)}/mo
                    </p>
                    <button
                      type="button"
                      onClick={onRemoveAddOn}
                      className="w-5 h-5 rounded-full bg-white/5 hover:bg-red-500/20 flex items-center justify-center text-white/30 hover:text-red-400 transition-colors"
                    >
                      <X size={10} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tax + Total */}
            <div className="flex justify-between items-start mb-6 text-sm">
              <div>
                <p className="text-white/60">
                  NY Sales Tax{" "}
                  <span className="text-white/30">({taxRateLabel})</span>
                </p>
              </div>
              <p className="text-white/60">${combinedTax.toFixed(2)}</p>
            </div>

            <div className="flex justify-between items-center py-4 border-t border-white/10">
              <p className="text-white font-bold text-lg">Total Due Today</p>
              <p className="text-green-400 font-display font-bold text-2xl">
                ${combinedTotal.toFixed(2)}
              </p>
            </div>

            {hasMTAddOn && (
              <p className="text-xs text-emerald-300/60 mt-2 leading-relaxed">
                Mosquito &amp; Tick first month included above. Continues as a
                separate monthly subscription (April–October). Cancel anytime.
              </p>
            )}

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-3">
              <div className="flex items-center gap-2 opacity-60">

                <span className="text-xs text-white">
                  Guaranteed Long Term Protection
                </span>
              </div>
              <div className="flex items-center gap-2 opacity-60">

                <span className="text-xs text-white">
                  Powered by Google Maps
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
