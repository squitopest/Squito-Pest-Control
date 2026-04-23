"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  HelpCircle,
  Lock,
  ShieldCheck,
} from "lucide-react";
import {
  MOSQUITO_TICK_ACTIVE_MONTHS,
  MOSQUITO_TICK_PACKAGES,
  DEFAULT_MOSQUITO_TICK_SIZE,
  buildMosquitoTickBookHref,
  buildMosquitoTickHelpHref,
  buildMosquitoTickQuoteHref,
  calculateMosquitoTickSeasonTotal,
  getMosquitoTickPackage,
  type MosquitoTickYardSizeId,
} from "@/data/mosquitoTickPackages";

export default function MosquitoTickPackageSelector() {
  const searchParams = useSearchParams();
  // Allow campaign landing URLs (`?promo=WELCOMEBACK`) to carry the code
  // through to /book so it auto-applies at Stripe checkout.
  const promo = (searchParams.get("promo") ?? "").trim().toUpperCase().slice(0, 40);
  const [size, setSize] = useState<MosquitoTickYardSizeId>(DEFAULT_MOSQUITO_TICK_SIZE);

  const pkg = useMemo(() => getMosquitoTickPackage(size), [size]);
  const seasonTotal = useMemo(() => (pkg ? calculateMosquitoTickSeasonTotal(pkg) : null), [pkg]);

  if (!pkg) return null;

  const bookHref = buildMosquitoTickBookHref(size, promo || null);
  const quoteHref = buildMosquitoTickQuoteHref(size, "mosquito-tick-selector");
  const helpHref = buildMosquitoTickHelpHref("mosquito-tick-selector");

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
      <div className="glass-card rounded-3xl border border-white/10 p-6 md:p-8">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-green-400 mb-5">
          <ShieldCheck size={14} />
          Choose Your Yard Size
        </div>

        <div className="grid gap-3">
          {MOSQUITO_TICK_PACKAGES.map((option) => {
            const selected = option.id === size;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setSize(option.id)}
                className={`cursor-pointer rounded-2xl border p-5 text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/40 ${
                  selected
                    ? "border-green-500 bg-green-500/10 shadow-[0_0_20px_rgba(34,197,94,0.12)]"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-display text-lg font-bold text-white mb-1">{option.label}</p>
                    <p className="text-sm text-white/55">{option.sqftRangeLabel}</p>
                  </div>
                  {option.quoteOnly ? (
                    <span className="shrink-0 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300">
                      Custom Quote
                    </span>
                  ) : (
                    <div className="shrink-0 text-right">
                      <p className="font-display text-2xl font-bold text-green-300">
                        ${option.monthlyPrice?.toFixed(2)}
                      </p>
                      <p className="text-xs text-white/50">per month</p>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="mb-2 flex items-center gap-2 font-display font-bold text-white">
            <CalendarClock size={16} className="text-green-300" />
            Billing only during active months
          </div>
          <p className="text-sm text-white/65 leading-relaxed">
            You&apos;re billed monthly April through October only — {MOSQUITO_TICK_ACTIVE_MONTHS}{" "}
            treatments per season. No off-season charges, and no initial fee to get started.
          </p>
        </div>

        <div className="mt-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
          <div className="mb-2 flex items-center gap-2 font-display font-bold text-white">
            <ShieldCheck size={16} className="text-amber-300" />
            Looking for full pest + mosquito/tick coverage?
          </div>
          <p className="text-sm text-white/65 leading-relaxed mb-3">
            Ultimate Fortress bundles year-round pest protection with season-long mosquito and tick
            treatments in one plan.
          </p>
          <Link
            href="/plans?plan=ultimate-fortress"
            className="inline-flex items-center gap-2 text-sm font-display font-bold text-amber-300 hover:text-amber-200 transition-colors"
          >
            See Ultimate Fortress
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <div className="glass-card rounded-3xl border border-white/10 p-6 md:p-8 lg:sticky lg:top-28 h-fit">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-green-400 mb-3">
          Your Package
        </p>

        {pkg.quoteOnly ? (
          <>
            <h3 className="font-display text-3xl font-bold text-white mb-1">Custom Quote</h3>
            <p className="text-sm text-white/55 mb-5">
              Properties larger than 1 acre get a tailored quote so pricing stays accurate.
            </p>
          </>
        ) : (
          <>
            <h3 className="font-display text-3xl font-bold text-white mb-1">
              ${pkg.monthlyPrice?.toFixed(2)}
              <span className="text-base font-normal text-white/55"> /month</span>
            </h3>
            <p className="text-sm text-white/55 mb-5">{pkg.label}</p>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 mb-5">
              <div className="flex justify-between text-sm text-white/65 mb-2">
                <span>Monthly price</span>
                <span>${pkg.monthlyPrice?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-white/65 mb-2">
                <span>Active months</span>
                <span>{MOSQUITO_TICK_ACTIVE_MONTHS}</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-3 text-base font-semibold text-white">
                <span>Full season</span>
                <span>${seasonTotal?.toFixed(2)}</span>
              </div>
            </div>

            <ul className="space-y-2 text-sm text-white/70 mb-5">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-green-400" />
                No initial fee
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-green-400" />
                No off-season billing
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-green-400" />
                Cancel anytime
              </li>
            </ul>
          </>
        )}

        <Link
          href={pkg.quoteOnly ? quoteHref : bookHref}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-green-500 px-5 py-4 text-base font-display font-bold text-white transition-colors hover:bg-green-400"
        >
          {pkg.quoteOnly ? "Request Custom Quote" : "Book First Treatment"}
          <ArrowRight size={18} />
        </Link>

        <Link
          href={helpHref}
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-display font-bold text-white/80 transition-colors hover:border-green-500/40 hover:bg-white/10 hover:text-white"
        >
          <HelpCircle size={15} className="text-green-300" />
          Not sure about yard size?
        </Link>

        <div className="mt-4 inline-flex items-center gap-2 text-sm text-white/50">
          <Lock size={14} className="text-green-300" />
          Secure checkout • Cancel anytime
        </div>
      </div>
    </div>
  );
}
