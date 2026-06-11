import Image from "next/image";
import { cn } from "@/lib/utils";

type SectionBleedImageProps = {
  src: string;
  alt: string;
  side: "left" | "right";
  variant?: "full" | "accent";
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
};

export default function SectionBleedImage({
  src,
  alt,
  side,
  variant = "full",
  className,
  imageClassName,
  priority = false,
  sizes = "52vw",
}: SectionBleedImageProps) {
  const isAccent = variant === "accent";

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        !isAccent && side === "right" && "rounded-2xl lg:rounded-r-none lg:rounded-l-3xl bleed-right card-border shadow-card",
        !isAccent && side === "left" && "rounded-2xl lg:rounded-l-none lg:rounded-r-2xl bleed-left card-border shadow-card",
        isAccent && side === "left" && "bleed-accent-left hidden lg:block",
        isAccent && side === "right" && "bleed-accent-right hidden lg:block",
        className
      )}
      aria-hidden={isAccent ? true : undefined}
    >
      <Image
        src={src}
        alt={isAccent ? "" : alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn("object-cover", imageClassName)}
      />
      {!isAccent && side === "right" && (
        <div
          className="absolute inset-0 bg-gradient-to-r from-background/50 via-background/15 to-transparent pointer-events-none"
          aria-hidden
        />
      )}
      {!isAccent && side === "left" && (
        <div
          className="absolute inset-0 bg-gradient-to-l from-background/30 via-transparent to-transparent pointer-events-none"
          aria-hidden
        />
      )}
    </div>
  );
}
