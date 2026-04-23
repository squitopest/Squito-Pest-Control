"use client";

import { useEffect, useRef } from "react";
import { Star, Quote } from "lucide-react";
import { useMediaQuery } from "@/lib/useMediaQuery";

const reviews = [
  {
    name: "Aleksis Knel",
    location: "Google Review",
    stars: 5,
    text: "We called Squito yesterday after spotting a pest in our bathroom, and they were amazing! They came within just a few hours no nonsense, no trying to upsell things we didn't need. Straightforward, professional, and efficient. They took care of everything quickly and cleaned up after. Honestly such a relief and a great experience. Highly recommend! 👏",
    date: "6 months ago",
  },
  {
    name: "james turzer",
    location: "Google Review",
    stars: 5,
    text: "My highest recommendation for Squito. He was fast, reasonably priced, and very professional. A perfect job well done.",
    date: "6 months ago",
  },
  {
    name: "Chris Sweeney",
    location: "Google Review",
    stars: 5,
    text: "We had a hornets nest in a kitchen exhaust vent about 15 ft off the ground. Marc responded promptly and arrived as promised. He treated the exterior and the interior to insure he eliminated the hazard. He did a thorough job at a very reasonable price. Marc also gave us some pointers to keep them out. We would highly recommend him and wouldn't hesitate to use his company again.",
    date: "6 months ago",
  },
  {
    name: "Colleen Mckeever",
    location: "Google Review",
    stars: 5,
    text: "I recently used Squito for a pest issue in my home, and I couldn't be happier with the service. From the first call, the customer service was professional and responsive. The technician, Mark was punctual, knowledgeable, and took the time to explain everything he was doing. What stood out most was that he used pet-safe products, which was a huge relief since I have two dogs at home.",
    date: "10 months ago",
  },
  {
    name: "ChelbyV D",
    location: "Google Review",
    stars: 5,
    text: "We've been using Squito Pest Control for a while now, and we can't recommend Marc enough! Marc is incredibly reliable and always texts me a few minutes before arriving so I can get our two little yappers inside. With our dogs and chickens free-roaming, it's essential that only pet-safe treatments are used. Marc uses organic compounds in our yard, and it's clear he truly cares about the safety of our animals.",
    date: "8 months ago",
  },
  {
    name: "Tesha Dale",
    location: "Google Review",
    stars: 5,
    text: "I had a great experience with Squito. The team was professional, punctual, and very thorough. They communicated clearly, explained what needed to be done, and followed through exactly as promised. What stood out most was the attention to detail and the friendly attitude. Everything was handled quickly and efficiently, and the results were even better than I expected. Pricing was fair and transparent.",
    date: "7 months ago",
  },
];

export default function Reviews() {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const frameRef = useRef<number>(0);
  // Respect OS-level motion preference. Driven by useSyncExternalStore so we
  // don't need to setState from inside the effect below.
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    if (reducedMotion) {
      // Stop the rAF-driven translate and let the user scroll the row manually.
      track.style.transform = "";
      return;
    }

    // We assume items are triplicated: [1, 2, 3] -> [1,2,3, 1,2,3, 1,2,3]
    const oneSetWidth = track.scrollWidth / 3;
    posRef.current = oneSetWidth;

    let isPaused = false;
    const SPEED = 0.5;

    const animate = () => {
      if (!isPaused) {
        posRef.current -= SPEED;
        if (posRef.current <= 0) {
          posRef.current = oneSetWidth;
        }
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    const handleEnter = () => { isPaused = true; };
    const handleLeave = () => { isPaused = false; };

    track.addEventListener("mouseenter", handleEnter);
    track.addEventListener("mouseleave", handleLeave);

    return () => {
      cancelAnimationFrame(frameRef.current);
      track.removeEventListener("mouseenter", handleEnter);
      track.removeEventListener("mouseleave", handleLeave);
    };
  }, [reducedMotion]);

  const items = reducedMotion ? reviews : [...reviews, ...reviews, ...reviews];

  return (
    <section className="py-24 overflow-hidden relative" id="reviews">
      {/* Subtle gradient surface so the band reads distinct from the cream
          page bg and white cards float instead of melting in. Dark-theme
          reviews_bg photo is dimmed way down on light since it was tuned
          for a black backdrop. */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgb(var(--surface-tint)/0.035)] to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/reviews_bg.jpg')] bg-contain md:bg-cover bg-center bg-no-repeat opacity-10 pointer-events-none mix-blend-multiply" />
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <div className="flex flex-col items-center justify-center text-center mb-16 px-4 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider uppercase mb-6">
            <Star size={14} fill="currentColor" />
            Customer Reviews
          </div>

          <div className="flex items-center gap-4 bg-tint-5 border border-tint-10 px-6 py-3 rounded-full flex-wrap justify-center">
            <div className="flex gap-1 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} fill="currentColor" />
              ))}
            </div>
            <span className="font-bold text-lg text-foreground">5 out of 5</span>
            <span className="text-muted">· 100+ reviews</span>
          </div>
        </div>
      </div>

      {/* Full-bleed scroll track — lives outside the container so it touches
          both screen edges. Edge fades were removed: cream gradients over
          white review cards read as a white glow, and the overflow-hidden
          already gives a clean clip at the viewport edge. */}
      <div className={`relative w-full mb-16 ${reducedMotion ? "overflow-x-auto" : "overflow-hidden"}`}>
        <div
          className="flex gap-6 md:gap-8 w-max px-4 will-change-transform"
          ref={trackRef}
        >
          {items.map((r, i) => (
            <a
              href="https://www.google.com/search?sca_esv=38eb6c1b91691d26&sxsrf=ANbL-n5S1kr7QiC9t3VBb1BhoeFbza73Nw:1775109861924&kgmid=/g/11l_8krl_c&q=Squito+-+Smart.+Safe.+Pest+Control&shndl=30&source=sh/x/loc/uni/m1/1&kgs=0a1cd8a9da134b2f&utm_source=sh/x/loc/uni/m1/1#lrd=0x8920f6ac750cdccf:0xf5c5b4451a660a15,1,,,,"
              target="_blank"
              rel="noopener noreferrer"
              key={i}
              className="w-[260px] md:w-[320px] shrink-0 bg-card backdrop-blur-sm border border-border p-5 md:p-6 rounded-2xl flex flex-col hover:border-green-500/30 hover:shadow-lg transition-all group"
            >
              <Quote size={24} className="text-green-500/20 mb-3 group-hover:text-green-500/40 transition-colors" />
              <p className="text-body text-sm mb-5 flex-grow leading-relaxed italic">
                &ldquo;{r.text}&rdquo;
              </p>
              <div className="mt-auto border-t border-border pt-4 flex flex-col">
                <div className="flex gap-1 text-yellow-400 mb-3">
                  {[...Array(r.stars)].map((_, j) => (
                    <Star key={j} size={14} fill="currentColor" />
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-semibold text-foreground">{r.name}</span>
                    <span className="text-xs text-subtle flex items-center gap-1.5 mt-0.5">
                      <svg viewBox="0 0 24 24" className="w-3 h-3 shrink-0">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      {r.location}
                    </span>
                  </div>
                  <span className="text-xs text-subtle">{r.date}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center text-center mt-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <p className="text-foreground text-xl md:text-2xl mb-8 font-display font-bold tracking-wide animate-pulse">
          Join hundreds of happy customers.
        </p>
        <a
          href="#contact"
          className="relative overflow-hidden inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white uppercase tracking-wider transition-all duration-300 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full hover:scale-105 hover:shadow-[0_0_40px_rgba(34,197,94,0.6)] group"
        >
          <span className="relative z-10 flex items-center gap-2 shadow-sm">
            Get Your Free Inspection <span className="group-hover:translate-x-1 transition-transform">→</span>
          </span>
          <div className="absolute inset-0 h-full w-[200%] bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] skew-x-12 group-hover:animate-[shimmer_1.5s_infinite]" />
        </a>
      </div>
    </section>
  );
}
