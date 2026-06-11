"use client";

import { useScroll, useTransform, motion, type MotionValue } from "framer-motion";
import Image from "next/image";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/lib/useMediaQuery";

export type ParallaxImage = {
  src: string;
  alt: string;
};

type ZoomParallaxProps = {
  images: ParallaxImage[];
  children?: (scrollYProgress: MotionValue<number>) => ReactNode;
  className?: string;
};

/** Flex alignment per slot — keeps images in a scattered collage without negative vw (mobile-safe). */
const MOBILE_WRAPPER_ALIGN = [
  "items-start justify-start pt-[10vh] pl-[5vw]",
  "items-start justify-end pt-[8vh] pr-[4vw]",
  "items-center justify-start pl-[3vw]",
  "items-center justify-end pr-[3vw]",
  "items-end justify-start pl-[5vw] pb-[46vh]",
  "items-end justify-end pr-[5vw] pb-[48vh]",
  "items-center justify-center",
] as const;

/** Desktop — child offsets from flex center; negative vw is fine on wide viewports. */
const DESKTOP_POSITION_CLASSES = [
  "",
  "[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]",
  "[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]",
  "[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]",
  "[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]",
  "[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]",
  "[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]",
] as const;

const MOBILE_INNER_SIZES = [
  "h-32 w-32 sm:h-36 sm:w-36",
  "h-28 w-28 sm:h-32 sm:w-32",
  "h-28 w-28 sm:h-32 sm:w-32",
  "h-28 w-28 sm:h-32 sm:w-32",
  "h-24 w-24 sm:h-28 sm:w-28",
  "h-24 w-24 sm:h-28 sm:w-28",
  "h-52 w-52 sm:h-56 sm:w-56",
] as const;

export function ZoomParallax({ images, children, className }: ZoomParallaxProps) {
  const container = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 1023px)", true);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], isMobile ? [1, 2.2] : [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], isMobile ? [1, 2.5] : [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], isMobile ? [1, 2.8] : [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], isMobile ? [1, 3.2] : [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], isMobile ? [1, 3.6] : [1, 9]);

  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];
  const scrollHeightVh = isMobile ? 380 : 450;

  return (
    <div
      ref={container}
      className={cn("relative w-full max-w-full", className)}
      style={{ height: `${scrollHeightVh}vh` }}
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-background isolate">
        {images.map(({ src, alt }, index) => {
          const scale = scales[index % scales.length];
          const isLast = index === images.length - 1;
          const slot = index % MOBILE_WRAPPER_ALIGN.length;

          return (
            <motion.div
              key={`${src}-${index}`}
              style={{ scale, transformOrigin: "center center", zIndex: isLast ? 10 : slot + 1 }}
              className={cn(
                "absolute inset-0 flex will-change-transform",
                isMobile
                  ? MOBILE_WRAPPER_ALIGN[slot]
                  : cn("items-center justify-center", DESKTOP_POSITION_CLASSES[slot])
              )}
            >
              <div
                className={cn(
                  "relative rounded-2xl overflow-hidden shadow-card card-border",
                  isMobile
                    ? MOBILE_INNER_SIZES[slot]
                    : isLast
                      ? "h-[28vh] w-[28vw] min-h-[160px] min-w-[160px] max-h-[480px] max-w-[480px]"
                      : "h-[25vh] w-[25vw] min-h-[140px] min-w-[140px] max-h-[420px] max-w-[420px]"
                )}
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="(max-width: 1024px) 55vw, 25vw"
                  className="object-cover"
                />
              </div>
            </motion.div>
          );
        })}

        {children && (
          <div className="absolute inset-0 z-20 pointer-events-none">
            {children(scrollYProgress)}
          </div>
        )}
      </div>
    </div>
  );
}
