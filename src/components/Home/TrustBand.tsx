import { cn } from "@/lib/utils";

const TRUST_ITEMS = [
  "Same-Day Service",
  "Free Inspection",
  "100% Satisfaction",
] as const;

type TrustBandProps = {
  theme?: "light" | "dark";
  className?: string;
};

export default function TrustBand({ theme = "dark", className }: TrustBandProps) {
  const isLight = theme === "light";

  return (
    <div
      className={cn(
        "w-full py-3 px-4 rounded-xl text-center text-xs sm:text-sm font-semibold tracking-wide",
        isLight
          ? "bg-white/10 border border-white/20 text-white/90"
          : "bg-muted/60 border border-border text-muted",
        className
      )}
    >
      <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
        {TRUST_ITEMS.map((item, i) => (
          <span key={item} className="inline-flex items-center gap-2">
            {i > 0 && (
              <span className={isLight ? "text-white/40" : "text-border"} aria-hidden="true">
                ·
              </span>
            )}
            {item}
          </span>
        ))}
      </p>
    </div>
  );
}
