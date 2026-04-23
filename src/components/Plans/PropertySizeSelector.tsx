"use client";

import { PROPERTY_SIZE_OPTIONS, type PropertySize } from "@/data/plans";

type PropertySizeSelectorProps = {
  value: PropertySize;
  onChange: (size: PropertySize) => void;
  className?: string;
};

export default function PropertySizeSelector({
  value,
  onChange,
  className = "",
}: PropertySizeSelectorProps) {
  const selectedOption = PROPERTY_SIZE_OPTIONS.find((option) => option.id === value) ?? PROPERTY_SIZE_OPTIONS[0];

  return (
    <div className={`w-full ${className}`}>
      <div className="flex flex-col items-center text-center mb-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/45 mb-2">
          Home Fit
        </p>
        <p className="font-display text-xl md:text-2xl font-semibold tracking-tight text-white mb-2">
          Choose the fit that matches your home.
        </p>
        <p className="text-sm text-white/60 max-w-2xl leading-relaxed">
          Pick the option that feels closest to your home size. Larger properties move into a tailored quote.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        {PROPERTY_SIZE_OPTIONS.map((option) => {
          const selected = value === option.id;

          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(option.id)}
              className={`cursor-pointer rounded-2xl border px-4 py-4 text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 ${
                selected
                  ? "border-green-500 bg-green-500/10 shadow-[0_0_20px_rgba(34,197,94,0.12)]"
                  : "border-white/10 bg-card/40 hover:border-white/20 hover:bg-white/5"
              }`}
            >
              <div className="flex items-center justify-between gap-3 mb-2">
                <span className={`font-display text-lg font-bold tracking-tight ${selected ? "text-white" : "text-white/85"}`}>
                  {option.label}
                </span>
                {option.quoteOnly && (
                  <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-700">
                    Quote
                  </span>
                )}
              </div>
              <p className={`text-sm font-medium ${selected ? "text-white/80" : "text-white/60"}`}>
                {option.sqftRangeLabel}
              </p>
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-center text-xs uppercase tracking-[0.18em] text-white/35">
        Current selection: {selectedOption.label}
      </p>
    </div>
  );
}
