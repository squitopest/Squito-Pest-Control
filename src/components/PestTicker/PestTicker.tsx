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

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const halfWidth = track.scrollWidth / 2;

    const animate = () => {
      posRef.current += SPEED;
      if (posRef.current >= halfWidth) {
        posRef.current = 0;
      }
      track.style.transform = `translateX(-${posRef.current}px)`;
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  const items = [...pests, ...pests, ...pests];

  return (
    <div className="bg-green-500 text-white font-semibold py-3 overflow-hidden whitespace-nowrap flex isolate border-y border-green-600/50 shadow-lg">
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
