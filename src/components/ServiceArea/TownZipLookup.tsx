"use client";

import Link from "next/link";
import { MapPin, Search, ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { useTownZipLookup } from "@/hooks/useTownZipLookup";
import { cn } from "@/lib/utils";

type TownZipLookupProps = {
  variant?: "compact" | "full";
  /** Light text for dark/video backgrounds (e.g. mobile hero) */
  theme?: "default" | "on-photo";
  className?: string;
  inputId?: string;
};

export default function TownZipLookup({
  variant = "full",
  theme = "default",
  className,
  inputId = "town-search-input",
}: TownZipLookupProps) {
  const lookup = useTownZipLookup();
  const {
    query,
    suggestions,
    showDropdown,
    setShowDropdown,
    selectedTown,
    notFound,
    loading,
    highlightIdx,
    inputRef,
    dropdownRef,
    handleInputChange,
    handleKeyDown,
    handleGoClick,
    selectTown,
  } = lookup;

  if (variant === "compact") {
    const onPhoto = theme === "on-photo";

    return (
      <div className={cn("w-full relative", className)}>
        <div
          className={cn(
            "flex items-center gap-2 text-sm font-semibold mb-2",
            onPhoto ? "text-white/90" : "text-muted"
          )}
        >
          <MapPin size={14} className={cn("shrink-0", onPhoto ? "text-green-400" : "text-primary")} />
          See if we service your town
        </div>
        <div className="relative flex flex-col sm:flex-row gap-2 sm:items-stretch">
          <div
            className={cn(
              "flex flex-1 items-center gap-2 border rounded-xl px-3 py-2.5 transition-colors bg-card",
              notFound ? "border-red-500/50" : "border-border focus-within:border-primary/50"
            )}
          >
            <Search size={16} className="text-muted shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                if (suggestions.length > 0) setShowDropdown(true);
              }}
              placeholder="Town or ZIP code"
              className="flex-1 bg-transparent text-foreground placeholder:text-muted outline-none text-sm"
              id={inputId}
              autoComplete="off"
            />
          </div>
          <button
            type="button"
            onClick={handleGoClick}
            disabled={loading || !query.trim()}
            className="gradient-cta shrink-0 px-6 py-2.5 rounded-xl text-sm font-bold disabled:opacity-40"
          >
            {loading ? <Loader2 size={16} className="animate-spin mx-auto" /> : "Check"}
          </button>
          {showDropdown && suggestions.length > 0 && (
            <div
              ref={dropdownRef}
              className="absolute z-50 top-full left-0 right-0 sm:right-auto sm:min-w-[280px] mt-1 bg-card border border-border rounded-xl shadow-lg overflow-hidden max-h-48 overflow-y-auto"
            >
              {suggestions.map((town, i) => (
                <button
                  key={town}
                  type="button"
                  onClick={() => selectTown(town)}
                  className={cn(
                    "w-full px-3 py-2.5 text-left text-sm font-medium transition-colors",
                    highlightIdx === i ? "bg-primary/10 text-foreground" : "hover:bg-muted/50"
                  )}
                >
                  {town}
                </button>
              ))}
            </div>
          )}
        </div>
        <Link
          href="#service-area"
          className={cn(
            "inline-block mt-2 text-xs font-semibold hover:underline",
            onPhoto ? "text-green-400" : "text-primary"
          )}
        >
          View full service area
        </Link>
      </div>
    );
  }

  return (
    <div className={cn("w-full max-w-lg", className)}>
      <label
        htmlFor={inputId}
        className="text-sm font-semibold text-muted mb-2 block flex items-center gap-2"
      >
        <Search size={14} className="text-primary" />
        Where do you need service?
      </label>
      <div className="relative">
        <div
          className={cn(
            "flex items-center gap-2 bg-background border rounded-2xl px-4 py-3 transition-all duration-300",
            selectedTown
              ? "border-green-500/60 shadow-[0_0_20px_rgba(34,197,94,0.15)]"
              : notFound
                ? "border-red-500/50"
                : "border-border focus-within:border-green-500/50"
          )}
        >
          <Search
            size={18}
            className={cn("flex-shrink-0 transition-colors", selectedTown ? "text-primary" : "text-subtle")}
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (suggestions.length > 0) setShowDropdown(true);
            }}
            placeholder="Town or ZIP code (e.g. Brentwood, 11717...)"
            className="flex-1 bg-transparent text-foreground placeholder:text-subtle outline-none text-base font-medium"
            id={inputId}
            autoComplete="off"
          />
        </div>

        <button
          type="button"
          onClick={handleGoClick}
          disabled={loading || !query.trim()}
          className={cn(
            "mt-3 w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed",
            selectedTown
              ? "bg-primary hover:bg-green-400 text-primary-foreground shadow-lg hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] hover:scale-[1.02]"
              : "bg-tint-10 text-muted hover:bg-tint-15"
          )}
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <>
              View Plans <ArrowRight size={14} />
            </>
          )}
        </button>

        {showDropdown && suggestions.length > 0 && (
          <div
            ref={dropdownRef}
            className="absolute z-50 w-full mt-2 bg-card backdrop-blur-xl border border-border rounded-2xl shadow-2xl overflow-hidden max-h-72 overflow-y-auto"
          >
            {suggestions.map((town, i) => (
              <button
                key={town}
                type="button"
                onClick={() => selectTown(town)}
                className={cn(
                  "w-full px-4 py-3.5 flex items-center gap-3 text-left transition-colors border-b border-tint-5 last:border-0",
                  highlightIdx === i ? "bg-green-500/15 text-foreground" : "hover:bg-tint-5 text-body"
                )}
              >
                <MapPin
                  size={14}
                  className={cn("flex-shrink-0", highlightIdx === i ? "text-primary" : "text-subtle")}
                />
                <span className="font-semibold text-sm">{town}</span>
                <span className="text-xs text-subtle ml-auto">Long Island, NY</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedTown && !loading && (
        <div className="mt-3 flex items-center gap-2 text-green-600 text-sm font-semibold animate-fade-in-up">
          <ShieldCheck size={16} />
          <span>
            Yes! We service <strong>{selectedTown}</strong>. Click &ldquo;View Plans&rdquo; to see your
            options.
          </span>
        </div>
      )}

      {notFound && !selectedTown && (
        <div className="mt-3 flex items-center gap-2 text-amber-600 text-sm font-medium">
          <span>
            We couldn&apos;t find that town in our Long Island coverage area. Try a nearby town or call
            us. We might still be able to help!
          </span>
        </div>
      )}
    </div>
  );
}
