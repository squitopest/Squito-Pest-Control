import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type SplitFeatureSectionProps = {
  id?: string;
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
  panelClassName?: string;
  imageSizes?: string;
  /** Portrait team photos need contain; use cover only for wide landscape assets */
  imageFit?: "contain" | "cover";
  imageClassName?: string;
  children: ReactNode;
};

export default function SplitFeatureSection({
  id,
  imageSrc,
  imageAlt,
  reverse = false,
  panelClassName = "bg-card",
  imageSizes = "(max-width: 1024px) 100vw, 40vw",
  imageFit = "contain",
  imageClassName,
  children,
}: SplitFeatureSectionProps) {
  const useContain = imageFit === "contain";

  return (
    <section id={id} className="border-y border-border">
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] lg:min-h-[520px]">
        <div
          className={cn(
            "relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-auto lg:min-h-full overflow-hidden bg-muted/25",
            reverse && "lg:order-2"
          )}
        >
          <div
            className={cn(
              "absolute inset-0",
              useContain && "lg:inset-4 xl:inset-6"
            )}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes={imageSizes}
              className={cn(
                useContain ? "object-contain object-center" : "object-cover object-center",
                imageClassName
              )}
            />
          </div>
        </div>

        <div
          className={cn(
            "flex items-center px-6 md:px-12 lg:px-14 xl:px-16 py-12 lg:py-16",
            reverse && "lg:order-1",
            panelClassName
          )}
        >
          <div className="max-w-lg w-full">{children}</div>
        </div>
      </div>
    </section>
  );
}
