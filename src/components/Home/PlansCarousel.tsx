"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import PlanTeaserCard, { type PlanTeaserPlan } from "@/components/Home/PlanTeaserCard";

type PlansCarouselProps = {
  plans: readonly PlanTeaserPlan[];
};

function getCarouselOffset(index: number, currentIndex: number, total: number) {
  const raw = (index - currentIndex + total) % total;
  return raw > Math.floor(total / 2) ? raw - total : raw;
}

export default function PlansCarousel({ plans }: PlansCarouselProps) {
  const defaultIndex = Math.max(
    0,
    plans.findIndex((p) => p.popular) ?? Math.floor(plans.length / 2)
  );
  const [currentIndex, setCurrentIndex] = useState(defaultIndex);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % plans.length);
  }, [plans.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + plans.length) % plans.length);
  }, [plans.length]);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(handleNext, 5000);
    return () => window.clearInterval(timer);
  }, [handleNext, paused]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
    setPaused(true);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartX.current;
    touchStartX.current = null;
    if (start == null) return;
    const delta = (e.changedTouches[0]?.clientX ?? start) - start;
    if (Math.abs(delta) < 40) return;
    if (delta < 0) handleNext();
    else handlePrev();
  };

  return (
    <div className="relative w-full md:hidden">
      <div
        className="relative w-full min-h-[620px] flex items-center justify-center overflow-visible"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute bottom-0 left-[-15%] h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute top-0 right-[-15%] h-64 w-64 rounded-full bg-green-500/10 blur-3xl" />
        </div>

        <div className="relative w-full h-full min-h-[620px] flex items-center justify-center [perspective:1200px]">
          {plans.map((plan, index) => {
            const pos = getCarouselOffset(index, currentIndex, plans.length);
            const isCenter = pos === 0;
            const isAdjacent = Math.abs(pos) === 1;

            return (
              <div
                key={plan.id}
                className={cn(
                  "absolute w-[82vw] max-w-[340px] transition-all duration-500 ease-in-out",
                  "flex items-stretch justify-center",
                  !isCenter && "pointer-events-none"
                )}
                style={{
                  transform: `
                    translateX(${pos * 52}%)
                    scale(${isCenter ? 1 : isAdjacent ? 0.88 : 0.75})
                    rotateY(${pos * -8}deg)
                  `,
                  zIndex: isCenter ? 10 : isAdjacent ? 5 : 1,
                  opacity: isCenter ? 1 : isAdjacent ? 0.45 : 0,
                  filter: isCenter ? "blur(0px)" : "blur(3px)",
                  visibility: Math.abs(pos) > 1 ? "hidden" : "visible",
                }}
                aria-hidden={!isCenter}
              >
                <PlanTeaserCard
                  plan={plan}
                  index={index}
                  variant="carousel"
                  className="w-full shadow-xl"
                />
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => {
            setPaused(true);
            handlePrev();
          }}
          aria-label="Previous plan"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/90 backdrop-blur-sm text-foreground hover:border-primary/40 hover:bg-muted/80 transition-colors shadow-sm"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => {
            setPaused(true);
            handleNext();
          }}
          aria-label="Next plan"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/90 backdrop-blur-sm text-foreground hover:border-primary/40 hover:bg-muted/80 transition-colors shadow-sm"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-6" role="tablist" aria-label="Protection plans">
        {plans.map((plan, index) => (
          <button
            key={plan.id}
            type="button"
            role="tab"
            aria-selected={index === currentIndex}
            aria-label={`Show ${plan.name}`}
            onClick={() => {
              setPaused(true);
              setCurrentIndex(index);
            }}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              index === currentIndex
                ? "w-6 bg-primary"
                : "w-2 bg-border hover:bg-primary/40"
            )}
          />
        ))}
      </div>
    </div>
  );
}
