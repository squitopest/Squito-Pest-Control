"use client";

import { useRef, useEffect } from "react";

const pests = [
  "Mosquitoes",
  "Cockroaches",
  "Rodents",
  "Spiders",
  "Ants",
  "Termites",
  "Crickets",
  "Flies",
  "Bees & Wasps",
  "Ticks",
  "Bed Bugs",
  "Mice",
  "Stink Bugs",
  "Lanternflies",
  "Centipedes",
];

const SPEED = 0.4;

export default function PestTicker() {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const frameRef = useRef<number>(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;

    const halfWidth = track.scrollWidth / 2;

    let isVisible = false;
    let isPageVisible = true;

    const animate = () => {
      if (!isVisible || !isPageVisible) return; // Don't schedule if off-screen or tab hidden

      posRef.current += SPEED;
      if (posRef.current >= halfWidth) {
        posRef.current = 0;
      }
      track.style.transform = `translateX(-${posRef.current}px)`;
      frameRef.current = requestAnimationFrame(animate);
    };

    // Only animate when the ticker is visible in the viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && isPageVisible) {
          cancelAnimationFrame(frameRef.current);
          frameRef.current = requestAnimationFrame(animate);
        }
      },
      { threshold: 0 }
    );
    observer.observe(section);

    // Pause when tab is hidden
    const onVisibilityChange = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible && isVisible) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      cancelAnimationFrame(frameRef.current);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  const items = [...pests, ...pests, ...pests];

  return (
    <div
      ref={sectionRef}
      className="bg-green-500 text-white font-semibold py-3 overflow-hidden whitespace-nowrap flex isolate border-y border-green-600/50 shadow-lg"
    >
      <div className="flex w-max will-change-transform pr-10" ref={trackRef}>
        {items.map((pest, i) => (
          <span key={i} className="flex items-center text-sm md:text-base tracking-wide px-4 uppercase shrink-0 hover:text-green-900 transition-colors cursor-default">
            {pest}
            <span className="mx-6 text-green-900/40">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
