import DualCta from "@/components/Home/DualCta";
import { cn } from "@/lib/utils";

type Variant = "inspection" | "get-started";

const COPY: Record<Variant, { headline: string; sub?: string; primaryCta?: string }> = {
  inspection: {
    headline: "If you see pest, let Squito do the rest!",
    sub: "Call before 2pm for same-day service across Nassau & Suffolk.",
    primaryCta: "Start Now",
  },
  "get-started": {
    headline: "Ready to get started?",
    sub: "Free inspection. Local technicians who show up.",
  },
};

type CallToActionBandProps = {
  variant: Variant;
  className?: string;
};

export default function CallToActionBand({ variant, className }: CallToActionBandProps) {
  const { headline, sub, primaryCta } = COPY[variant];

  return (
    <section
      className={cn(
        "py-12 md:py-14 bg-primary text-primary-foreground",
        className
      )}
    >
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
        <h2 className="font-display font-bold text-2xl md:text-3xl tracking-tight mb-2">
          {headline}
        </h2>
        {sub && <p className="text-primary-foreground/80 text-sm md:text-base mb-8">{sub}</p>}
        <DualCta
          from={`cta-band-${variant}`}
          primaryLabel={primaryCta}
          className="justify-center max-w-xl mx-auto [&_a:first-child]:bg-white [&_a:first-child]:text-primary [&_a:first-child]:hover:bg-white/90 [&_a:last-child]:border-white/40 [&_a:last-child]:bg-white/10 [&_a:last-child]:text-white [&_a:last-child]:hover:bg-white/20"
        />
      </div>
    </section>
  );
}
