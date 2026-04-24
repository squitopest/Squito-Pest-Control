"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Shield, Check, ArrowRight, Sparkles, Clock, ChevronDown } from "lucide-react";
import {
  getMosquitoTickPackage,
  type MosquitoTickYardSizeId,
} from "@/data/mosquitoTickPackages";
import {
  getSubscriptionPricing,
  type PropertySize,
} from "@/data/plans";

type CrossSellType = "mosquito-tick" | "general-pest";

/** Discount percentage applied when bundling M&T with a GPC plan */
const BUNDLE_DISCOUNT_PERCENT = 10;

/**
 * Auto-assigns M&T treatment area based on home sqft.
 *   ≤ 2,000 sqft → 1/4 acre  (small)
 *   2,001–4,000 → 1/2 acre   (medium)
 *   4,001+       → quote      (xl)
 */
function resolveYardSizeFromHomeSqft(
  sqft: number | null
): MosquitoTickYardSizeId {
  if (!sqft || sqft <= 2000) return "small";
  if (sqft <= 4000) return "medium";
  return "xl";
}

type CrossSellModalProps = {
  isOpen: boolean;
  type: CrossSellType;
  propertySize: PropertySize;
  sqft: number | null;
  onAccept: (addOn: {
    type: CrossSellType;
    sizeId: string;
    discountPercent: number;
  }) => void;
  onDecline: () => void;
};

const PREVIEW_PESTS = [
  { name: "Ants", image: "/pests/carpenter-ants.webp" },
  { name: "Spiders", image: "/pests/calm_spider.png" },
  { name: "Earwigs", image: "/pests/earwigs.webp" },
];

const MT_PREVIEW_PESTS = [
  { name: "Mosquitoes", image: "/pests/culex-mosquito.webp" },
  { name: "Deer Ticks", image: "/pests/deer-tick.webp" },
  { name: "Fleas", image: "/pests/fleas.webp" },
];

function PestPreview() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-6">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/70 hover:text-white/90 transition-colors"
      >
        <span>What we protect against</span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-3 gap-3 pt-3">
              {PREVIEW_PESTS.map((pest) => (
                <div
                  key={pest.name}
                  className="rounded-xl border border-white/10 bg-white/5 overflow-hidden text-center"
                >
                  <div className="relative w-full aspect-square">
                    <Image
                      src={pest.image}
                      alt={pest.name}
                      fill
                      className="object-cover"
                      sizes="120px"
                    />
                  </div>
                  <p className="text-xs font-semibold text-white/70 py-2">{pest.name}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-white/40 mt-2 text-center">
              Plus 12 more common Long Island pests
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MtPestPreview() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-6">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/70 hover:text-white/90 transition-colors"
      >
        <span>What we target</span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-3 gap-3 pt-3">
              {MT_PREVIEW_PESTS.map((pest) => (
                <div
                  key={pest.name}
                  className="rounded-xl border border-white/10 bg-white/5 overflow-hidden text-center"
                >
                  <div className="relative w-full aspect-square">
                    <Image
                      src={pest.image}
                      alt={pest.name}
                      fill
                      className="object-cover"
                      sizes="120px"
                    />
                  </div>
                  <p className="text-xs font-semibold text-white/70 py-2">{pest.name}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-white/40 mt-2 text-center">
              Seasonal barrier protection Apr–Oct
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CrossSellModal({
  isOpen,
  type,
  propertySize,
  sqft,
  onAccept,
  onDecline,
}: CrossSellModalProps) {
  if (!isOpen) return null;

  const isMosquitoTickCrossSell = type === "mosquito-tick";

  // Auto-assign yard size — no picker needed
  const autoYardSize = resolveYardSizeFromHomeSqft(sqft);
  const mtPkg = getMosquitoTickPackage(autoYardSize);
  const mtPrice = mtPkg?.monthlyPrice ?? 0;
  const mtIsQuoteOnly = mtPkg?.quoteOnly ?? false;
  const discountedMtPrice =
    Math.round(mtPrice * (1 - BUNDLE_DISCOUNT_PERCENT / 100) * 100) / 100;
  const mtSavingsPerMonth = Math.round((mtPrice - discountedMtPrice) * 100) / 100;

  // GPC cross-sell (when coming from M&T) — Essential Defense
  const gpcPricing = getSubscriptionPricing("essential-defense", propertySize);
  const gpcPrice =
    gpcPricing && !gpcPricing.quoteOnly ? gpcPricing.monthlyPrice : null;
  const discountedGpcPrice = gpcPrice
    ? Math.round(gpcPrice * (1 - BUNDLE_DISCOUNT_PERCENT / 100) * 100) / 100
    : null;
  const gpcSavingsPerMonth = gpcPrice && discountedGpcPrice
    ? Math.round((gpcPrice - discountedGpcPrice) * 100) / 100
    : 0;

  // Annual savings for impact
  const annualSavings = isMosquitoTickCrossSell
    ? Math.round(mtSavingsPerMonth * 7 * 100) / 100   // 7 active months
    : Math.round(gpcSavingsPerMonth * 12 * 100) / 100; // 12 months

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
            onClick={onDecline}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 22, stiffness: 280 }}
            className="relative w-full max-w-lg rounded-3xl border border-white/15 bg-card/95 backdrop-blur-2xl shadow-[0_0_80px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onDecline}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors z-10"
            >
              <X size={16} />
            </button>

            {/* Animated accent gradient bar */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className={`h-1.5 w-full origin-left ${
                isMosquitoTickCrossSell
                  ? "bg-gradient-to-r from-emerald-500 via-green-400 to-teal-500"
                  : "bg-gradient-to-r from-green-500 via-emerald-400 to-green-500"
              }`}
            />

            <div className="p-8">
              {/* Animated icon */}
              <motion.div
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.15 }}
                className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5 ${
                  isMosquitoTickCrossSell
                    ? "bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30"
                    : "bg-gradient-to-br from-green-500/20 to-emerald-500/10 border border-green-500/30"
                }`}
              >
                <Shield
                  size={28}
                  className={
                    isMosquitoTickCrossSell
                      ? "text-emerald-400"
                      : "text-green-400"
                  }
                />
              </motion.div>

              {/* One-time offer badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
                className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30"
              >
                <Clock size={12} className="text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  One-time offer — only available right now
                </span>
              </motion.div>

              {/* Content */}
              {isMosquitoTickCrossSell ? (
                <>
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl md:text-3xl font-display font-bold text-white mb-3"
                  >
                    Add Mosquito &amp; Tick Protection?
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-white/60 text-sm leading-relaxed mb-5"
                  >
                    Since you&apos;re already getting pest protection, bundle in seasonal
                    mosquito &amp; tick treatments and <strong className="text-white/90">save {BUNDLE_DISCOUNT_PERCENT}% on every monthly treatment</strong>.
                    This discount is only available when you add it now — you won&apos;t see this price again.
                  </motion.p>

                  {/* Savings highlight */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    className="flex items-center gap-3 mb-5 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 to-amber-500/5 border border-amber-500/25"
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                      <Sparkles size={18} className="text-amber-400" />
                    </div>
                    <div>
                      <p className="text-amber-300 font-bold text-sm">
                        You&apos;ll save ${annualSavings.toFixed(2)} this season
                      </p>
                      <p className="text-white/45 text-xs mt-0.5">
                        That&apos;s ${mtSavingsPerMonth.toFixed(2)} off each of your 7 active-month treatments
                      </p>
                    </div>
                  </motion.div>

                  {/* Price display */}
                  {!mtIsQuoteOnly && mtPrice > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 mb-6"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-bold">
                            Mosquito &amp; Tick Protection
                          </p>
                          <p className="text-white/50 text-xs mt-0.5">
                            Monthly during active season (Apr–Oct)
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-white/40 text-sm line-through">
                            ${mtPrice.toFixed(2)}/mo
                          </p>
                          <p className="text-emerald-400 font-display font-bold text-2xl">
                            ${discountedMtPrice.toFixed(2)}
                            <span className="text-sm font-normal text-emerald-400/60">/mo</span>
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Highlights */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.55 }}
                    className="flex flex-col gap-2.5 mb-7"
                  >
                    {[
                      "Targeted barrier spray on patio, perimeter & hot spots",
                      "Mosquito, tick & flea protection",
                      "No charge from November–March",
                      "Cancel anytime — no contracts",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2.5">
                        <Check
                          size={14}
                          className="text-emerald-400 flex-shrink-0"
                        />
                        <span className="text-sm text-white/75">{item}</span>
                      </div>
                    ))}
                  </motion.div>

                  {/* Expandable pest preview */}
                  <MtPestPreview />
                </>
              ) : (
                <>
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl md:text-3xl font-display font-bold text-white mb-3"
                  >
                    Add Year-Round Pest Protection?
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-white/60 text-sm leading-relaxed mb-5"
                  >
                    You&apos;re protecting your yard — why not protect the inside too?
                    Add our Essential Defense plan for quarterly exterior treatments and <strong className="text-white/90">save {BUNDLE_DISCOUNT_PERCENT}% every month when you bundle now</strong>.
                    This discount is only available right now.
                  </motion.p>

                  {/* Savings highlight */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    className="flex items-center gap-3 mb-5 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 to-amber-500/5 border border-amber-500/25"
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                      <Sparkles size={18} className="text-amber-400" />
                    </div>
                    <div>
                      <p className="text-amber-300 font-bold text-sm">
                        You&apos;ll save ${annualSavings.toFixed(2)} per year
                      </p>
                      <p className="text-white/45 text-xs mt-0.5">
                        That&apos;s ${gpcSavingsPerMonth.toFixed(2)} off every single month — locked in forever
                      </p>
                    </div>
                  </motion.div>

                  {/* Price display */}
                  {gpcPrice && discountedGpcPrice && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="rounded-2xl border border-green-500/20 bg-green-500/5 p-5 mb-6"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-bold">Essential Defense</p>
                          <p className="text-white/50 text-xs mt-0.5">
                            Quarterly exterior perimeter protection
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-white/40 text-sm line-through">
                            ${gpcPrice.toFixed(2)}/mo
                          </p>
                          <p className="text-green-400 font-display font-bold text-2xl">
                            ${discountedGpcPrice.toFixed(2)}
                            <span className="text-sm font-normal text-green-400/60">/mo</span>
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.55 }}
                    className="flex flex-col gap-2.5 mb-7"
                  >
                    {[
                      "Quarterly exterior perimeter treatments",
                      "15+ common pest types covered",
                      "Free re-service if pests return",
                      "Digital inspection report each visit",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2.5">
                        <Check
                          size={14}
                          className="text-green-400 flex-shrink-0"
                        />
                        <span className="text-sm text-white/75">{item}</span>
                      </div>
                    ))}
                  </motion.div>

                  {/* Expandable pest preview */}
                  <PestPreview />
                </>
              )}

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col gap-3"
              >
                <button
                  type="button"
                  onClick={() =>
                    onAccept({
                      type,
                      sizeId: isMosquitoTickCrossSell
                        ? autoYardSize
                        : propertySize,
                      discountPercent: BUNDLE_DISCOUNT_PERCENT,
                    })
                  }
                  className={`w-full py-4.5 rounded-2xl font-display font-bold text-lg flex items-center justify-center gap-2.5 transition-all duration-300 group relative overflow-hidden ${
                    isMosquitoTickCrossSell
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_50px_rgba(16,185,129,0.5)]"
                      : "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white shadow-[0_0_30px_rgba(34,197,94,0.3)] hover:shadow-[0_0_50px_rgba(34,197,94,0.5)]"
                  }`}
                >
                  {/* Subtle shimmer effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative flex items-center gap-2.5">
                    <Sparkles size={18} />
                    Yes! Lock in My {BUNDLE_DISCOUNT_PERCENT}% Discount
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </span>
                </button>
                <button
                  type="button"
                  onClick={onDecline}
                  className="w-full py-3 rounded-2xl border border-white/8 text-white/40 font-medium text-sm hover:text-white/60 transition-all"
                >
                  No thanks, I&apos;ll pass on the savings
                </button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
