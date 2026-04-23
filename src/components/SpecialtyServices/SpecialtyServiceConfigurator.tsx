"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calculator, CheckCircle2, HelpCircle, Lock, Minus, Plus } from "lucide-react";
import {
  buildSpecialtyBookHref,
  buildSpecialtyHelpHref,
  buildSpecialtyQuoteHref,
  calculateSpecialtyQuote,
  getDefaultSpecialtySelection,
  isPremiumSpecialtyService,
  type SpecialtySelection,
  type SpecialtyService,
} from "@/data/specialtyServices";

type Props = {
  service: SpecialtyService;
};

export default function SpecialtyServiceConfigurator({ service }: Props) {
  const [selection, setSelection] = useState<SpecialtySelection>(() => getDefaultSpecialtySelection(service));

  const quote = useMemo(() => calculateSpecialtyQuote(service.id, selection), [service.id, selection]);

  if (!quote) {
    return (
      <div className="glass-card rounded-3xl border border-red-500/20 p-6 text-sm text-red-300">
        We couldn&apos;t load pricing for this service right now.
      </div>
    );
  }

  const bookHref = buildSpecialtyBookHref(service.id, selection);
  const quoteHref = buildSpecialtyQuoteHref(service.id, selection, `specialty:${service.slug}`);
  const helpHref = buildSpecialtyHelpHref(service.id, `specialty-configurator:${service.slug}`);
  const isPremium = isPremiumSpecialtyService(service);

  const updateQuantity = (nextQuantity: number) => {
    if (selection.model === "linear" || selection.model === "count") {
      setSelection({ ...selection, quantity: nextQuantity });
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="glass-card rounded-3xl border border-white/10 p-6 md:p-8">
        <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-green-400 mb-5">
          <Calculator size={14} />
          Service Details
        </div>

        {service.pricing.model === "flat" && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/40 mb-2">
              Pricing
            </p>
            <p className="font-display text-3xl font-bold text-white mb-2">${service.pricing.price.toFixed(2)}</p>
            <p className="text-sm text-white/65">Warm, simple pricing with no extra steps.</p>
          </div>
        )}

        {service.pricing.model === "tiered" && selection.model === "tiered" && (
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/40 mb-3">
              {service.pricing.inputLabel}
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {service.pricing.options.map((option) => {
                const selected = option.id === selection.optionId;

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setSelection({ model: "tiered", optionId: option.id })}
                    className={`cursor-pointer rounded-2xl border p-4 text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/40 ${
                      selected
                        ? "border-green-500 bg-green-500/10 shadow-[0_0_20px_rgba(34,197,94,0.12)]"
                        : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <span className="font-display text-lg font-bold tracking-tight text-white">{option.label}</span>
                      {option.quoteOnly ? (
                        <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-amber-300">
                          Tailored
                        </span>
                      ) : (
                        <span className="text-sm font-semibold text-green-300">${option.price?.toFixed(2)}</span>
                      )}
                    </div>
                    {option.details && <p className="text-sm text-white/55">{option.details}</p>}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {service.pricing.model === "toggle" && selection.model === "toggle" && (
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/40 mb-3">
              Access Details
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setSelection({ model: "toggle", includeSurcharge: false })}
                className={`cursor-pointer rounded-2xl border p-4 text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/40 ${
                  !selection.includeSurcharge
                    ? "border-green-500 bg-green-500/10 shadow-[0_0_20px_rgba(34,197,94,0.12)]"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                <p className="font-display text-lg font-bold text-white mb-1">{service.pricing.baseLabel}</p>
                <p className="text-sm text-white/55">Regular area</p>
              </button>
              <button
                type="button"
                onClick={() => setSelection({ model: "toggle", includeSurcharge: true })}
                className={`cursor-pointer rounded-2xl border p-4 text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/40 ${
                  selection.includeSurcharge
                    ? "border-green-500 bg-green-500/10 shadow-[0_0_20px_rgba(34,197,94,0.12)]"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                <p className="font-display text-lg font-bold text-white mb-1">{service.pricing.surchargeLabel}</p>
                <p className="text-sm text-white/55">Tall or harder-to-reach area</p>
              </button>
            </div>
            <p className="mt-3 text-sm text-white/55">{service.pricing.surchargeDescription}</p>
          </div>
        )}

        {(service.pricing.model === "linear" || service.pricing.model === "count") &&
          (selection.model === "linear" || selection.model === "count") && (
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/40 mb-3">
                {service.pricing.model === "linear" ? "Treatment Size" : "Property Size"}
              </p>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => updateQuantity(selection.quantity - 1)}
                    className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-background/60 text-white transition-colors hover:border-white/20 hover:bg-white/5"
                  >
                    <Minus size={18} />
                  </button>
                  <div className="text-center">
                    <p className="font-display text-4xl font-bold text-white">{selection.quantity}</p>
                    <p className="text-sm text-white/55">
                      {selection.model === "linear"
                        ? service.pricing.unitLabel
                        : service.pricing.unitLabel}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => updateQuantity(selection.quantity + 1)}
                    className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-background/60 text-white transition-colors hover:border-white/20 hover:bg-white/5"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                {"helperText" in service.pricing && service.pricing.helperText && (
                  <p className="mt-4 text-sm text-white/55">{service.pricing.helperText}</p>
                )}
              </div>
            </div>
          )}

        {service.notes?.length ? (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/40 mb-3">
              Helpful Notes
            </p>
            <ul className="space-y-2">
              {service.notes.map((note) => (
                <li key={note} className="flex items-start gap-3 text-sm text-white/65">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-green-400" />
                  {note}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <div className={`glass-card rounded-3xl border p-6 md:p-8 lg:sticky lg:top-28 h-fit ${
        isPremium ? "border-amber-500/20 shadow-[0_0_35px_rgba(245,158,11,0.08)]" : "border-white/10"
      }`}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-green-400 mb-3">
          Price Summary
        </p>
        <h2 className="font-display text-3xl font-bold tracking-tight text-white mb-1">
          {quote.quoteOnly ? "Tailored pricing" : `$${quote.totalDue.toFixed(2)}`}
        </h2>
        <p className="text-sm text-white/55 mb-5">
          {quote.quoteOnly ? "A tailored price is available for larger or more custom scopes." : `Includes NY sales tax • ${quote.detailSummary}`}
        </p>

        {!quote.quoteOnly && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 mb-5">
            <div className="flex justify-between text-sm text-white/65 mb-2">
              <span>Service price</span>
              <span>${quote.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-white/65 mb-2">
              <span>NY sales tax</span>
              <span>${quote.taxAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t border-white/10 pt-3 text-base font-semibold text-white">
              <span>Total due today</span>
              <span>${quote.totalDue.toFixed(2)}</span>
            </div>
          </div>
        )}

        {service.pricing.model === "count" && "annualRenewal" in service.pricing && service.pricing.annualRenewal && (
          <p className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-200/90 mb-5">
            {service.pricing.annualRenewal}
          </p>
        )}

        <Link
          href={quote.quoteOnly ? quoteHref : bookHref}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-green-500 px-5 py-4 text-base font-display font-bold text-white transition-colors hover:bg-green-400"
        >
          {quote.quoteOnly ? "Request Tailored Pricing" : "Book Securely"}
          <ArrowRight size={18} />
        </Link>

        <Link
          href={helpHref}
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-display font-bold text-white/80 transition-colors hover:border-green-500/40 hover:bg-white/10 hover:text-white"
        >
          <HelpCircle size={15} className="text-green-300" />
          Not sure about size? Get help choosing
        </Link>

        <div className="mt-4 inline-flex items-center gap-2 text-sm text-white/50">
          <Lock size={14} className="text-green-300" />
          Secure checkout • Payment options shown at checkout
        </div>
      </div>
    </div>
  );
}
