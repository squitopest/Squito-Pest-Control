import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const PHONE_HREF = "tel:6312031000";
const PHONE_DISPLAY = "(631) 203-1000";

type DualCtaProps = {
  from?: string;
  className?: string;
  layout?: "row" | "col";
  /** Light buttons for dark hero backgrounds */
  theme?: "light" | "dark";
  primaryLabel?: string;
};

export default function DualCta({
  from = "hero",
  className,
  layout = "row",
  theme = "dark",
  primaryLabel = "Get Protected",
}: DualCtaProps) {
  const isLight = theme === "light";

  return (
    <div
      className={cn(
        "flex gap-3 w-full",
        layout === "col" ? "flex-col max-w-sm mx-auto" : "flex-wrap",
        className
      )}
    >
      <Link
        href={`/get-started?from=${from}`}
        className="gradient-cta inline-flex flex-1 min-w-[160px] items-center justify-center gap-2 px-8 py-4 rounded-full"
      >
        {primaryLabel}
        <ArrowRight size={18} />
      </Link>
      <a
        href={PHONE_HREF}
        className={cn(
          "inline-flex flex-1 min-w-[160px] items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-colors",
          isLight
            ? "border border-white/30 bg-black/30 text-white hover:bg-white/10"
            : "card-border bg-card text-foreground hover:bg-muted/50"
        )}
      >
        <Phone size={18} />
        {PHONE_DISPLAY}
      </a>
    </div>
  );
}

export { PHONE_HREF, PHONE_DISPLAY };
