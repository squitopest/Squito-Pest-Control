"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, CheckCircle, Star, Phone, Camera } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const rotatingWords = ["Mosquitoes", "Termites", "Rodents", "Bed Bugs", "Cockroaches", "Spiders"];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  // Pick the right video file per viewport at mount time. The `media`
  // attribute on <source> inside <video> was removed from the HTML spec
  // (whatwg/html#2955) — modern Chrome/Safari/Firefox ignore it, which
  // broke the responsive source selection and caused the video to not
  // play at all. Doing it in JS with matchMedia is the supported path.
  // Starts as `null` so SSR emits no <video> and mobile never accidentally
  // fetches the full desktop master before the hydration check runs.
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const wordInterval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setWordIndex(i => (i + 1) % rotatingWords.length);
        setAnimating(false);
      }, 400);
    }, 2800);

    return () => clearInterval(wordInterval);
  }, []);

  useEffect(() => {
    // Desktop gets full 1080p for crisp quality on large screens (~3–4 MB).
    // Mobile (≤ 767px) gets a 720p re-encode for bandwidth savings (~1.2 MB).
    // With preload="metadata" the browser fetches only headers on mount,
    // then streams the video on autoplay — so the 1080p file does NOT
    // increase initial page-load weight.
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    setVideoSrc(isMobile ? "/hero_720p_mobile.mp4" : "/hero_1080p.mp4");
  }, []);

  // Some browsers (iOS Safari in particular) are finicky about the
  // `autoplay` attribute on a <video> that was added to the DOM after
  // mount. They respect it on initial render but sometimes skip it when
  // React inserts the element in a second pass. Calling .play() manually
  // after the element mounts is the escape hatch — it's allowed because
  // the video is muted + playsInline, so no user-gesture policy is
  // violated. We swallow the rejection silently because a blocked play
  // just means the poster stays up, which is an acceptable fallback.
  useEffect(() => {
    if (!videoSrc) return;
    const v = videoRef.current;
    if (!v) return;
    const attempt = v.play();
    if (attempt && typeof attempt.catch === "function") {
      attempt.catch(() => { /* autoplay blocked — poster is the fallback */ });
    }
  }, [videoSrc]);

  return (
    <section className="relative min-h-[90svh] lg:min-h-screen flex items-center pt-36 lg:pt-44 pb-16 overflow-hidden" id="hero">

      {/* Ambient glow orbs — desktop only. The 800/600px blur-[120px] orbs
          cost real paint/composite time on mobile Safari and you can't see
          them through the video anyway. */}
      <div className="hidden md:block glow-orb-green w-[800px] h-[800px] -top-60 -left-60 z-0 opacity-50" />
      <div className="hidden md:block glow-orb-teal w-[600px] h-[600px] bottom-0 right-0 translate-x-1/4 translate-y-1/4 z-0 opacity-40" />

      {/* Hero backdrop. Poster image paints first for instant LCP, video
          layers on top with native autoplay once the client picks the right
          source. Mobile gets a ~1.2MB 720p re-encode, desktop (≥768px) gets
          the full 1080p master (~3–4MB, streamed). The video element is only
          rendered after `videoSrc` resolves (after mount), so we never
          download the wrong file on either form factor. `motion-reduce:hidden`
          respects the OS "Reduce Motion" setting and falls back to the poster. */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <Image
          src="/hero-poster.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {videoSrc && (
          <video
            ref={videoRef}
            key={videoSrc}
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/hero-poster.jpg"
            aria-hidden="true"
            tabIndex={-1}
            onError={(e) => {
              // Surface any load failure (missing file, codec issue) into
              // the console so "video is frozen" bug reports are easy to
              // diagnose. The poster image remains as the fallback.
              // eslint-disable-next-line no-console
              console.warn("[Hero] video failed to load:", videoSrc, e);
            }}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        )}
        {/* Hero bleeds directly into the next section. We used to render a
            h-24 gradient fading to `background` here to soften the edge,
            but on the light theme `background` is cream and that fade read
            as a white shadow bleeding over the pest-name ticker right
            below. Removed entirely — the hard edge is cleaner. */}
      </div>

      {/* Content — full width, left-aligned. `on-photo` keeps text-white
          classes actually white in light theme (the global safety net
          otherwise flips them to dark, which would disappear on the
          video). */}
      <div className="container relative z-20 mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="on-photo max-w-4xl flex flex-col items-start gap-7 animate-fade-in-up">

          {/* Primary CTA — lifted to the top so the first clickable thing on
              the page is the one we actually want visitors to convert on.
              The two secondary CTAs (Pest Identifier, Call Now) stay in their
              original position below the body copy so users keep the message
              context before choosing a non-conversion action. */}
          <Link
            href="/plans"
            className="relative overflow-hidden inline-flex items-center justify-center px-10 py-4 text-base font-bold text-white uppercase tracking-wider transition-all duration-300 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full hover:scale-105 hover:shadow-[0_0_40px_rgba(34,197,94,0.6)] group"
          >
            <span className="relative z-10 flex items-center gap-2">
              Get Protected <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 h-full w-[200%] bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-[150%] skew-x-12 group-hover:animate-[shimmer_1.5s_infinite]" />
          </Link>

          {/* Headline — white on video with a dark drop-shadow so letters
              stay legible on bright video frames. Gradient "Pest Control."
              line is left untouched. */}
          <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-[6.5rem] leading-[1.0] tracking-tight">
            <span className="block text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.55),0_1px_3px_rgba(0,0,0,0.45)]">Smart. Safe.</span>
            <span className="block gradient-text">Pest Control.</span>
          </h1>

          {/* Rotating subline */}
          <div className="text-2xl md:text-3xl font-display font-semibold text-white leading-snug [text-shadow:0_2px_8px_rgba(0,0,0,0.55),0_1px_2px_rgba(0,0,0,0.45)]">
            <span>Eliminating </span>
            <span
              className={`text-primary transition-opacity duration-300 ${
                animating ? 'opacity-0' : 'opacity-100'
              }`}
            >
              {rotatingWords[wordIndex]}
            </span>
            <span className="block text-white/85 text-xl md:text-2xl mt-1">on Long Island.</span>
          </div>

          {/* Body copy */}
          <p className="text-lg text-white/90 max-w-xl leading-relaxed font-medium [text-shadow:0_2px_8px_rgba(0,0,0,0.6),0_1px_2px_rgba(0,0,0,0.4)]">
            10+ years in the field. NO contracts. NO gimmicks. Just local experts who show up and get it done.
          </p>

          {/* Secondary CTAs — solid white pill chips with a real shadow so they
              read as physical buttons over the video, not glass panels. */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mt-2">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('library-pest-camera');
                if (el) el.click();
              }}
              className="group relative overflow-hidden inline-flex items-center justify-center px-10 py-4 rounded-full border border-border bg-card text-foreground font-bold text-base uppercase tracking-wider shadow-lg hover:border-green-500/60 hover:shadow-[0_6px_24px_-4px_rgba(34,197,94,0.35)] transition-all"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-green-500/15 to-transparent group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10 flex items-center gap-2">
                <Camera size={18} className="text-primary group-hover:scale-110 transition-transform" />
                Pest Identifier
              </span>
            </button>

            <a
              href="tel:6312031000"
              className="group relative inline-flex items-center justify-center gap-3 py-4 px-8 rounded-full bg-card border border-border shadow-lg overflow-hidden transition-all duration-300 hover:border-green-500/60 hover:shadow-[0_6px_24px_-4px_rgba(34,197,94,0.35)]"
            >
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-green-500/10 to-transparent group-hover:translate-x-full transition-transform duration-700" />
              <div className="relative z-10 w-7 h-7 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center group-hover:bg-green-500 transition-colors duration-300">
                <Phone size={14} className="text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <div className="relative z-10 flex flex-col items-start leading-none">
                <span className="text-[9px] uppercase tracking-widest text-green-700 font-semibold mb-0.5">Call Now</span>
                <span className="text-base font-display font-bold text-foreground">(631) 203-1000</span>
              </div>
            </a>
          </div>

          {/* Rating pill — solid card chip so the stars + copy read cleanly
              on the video-adjacent area. */}
          <div className="flex items-center gap-2 bg-card border border-border shadow-md px-4 py-2 rounded-full">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={13} fill="#fbbf24" color="#fbbf24" />
              ))}
            </div>
            <span className="text-sm font-semibold text-foreground">5-Star Rated · Nassau &amp; Suffolk County</span>
          </div>

          {/* Trust badges — white with a dark shadow so they sit on top of
              the video cleanly. */}
          <div className="flex flex-wrap items-center gap-6 pt-2">
            {["No contracts", "Same-day service", "Pet & family safe"].map((text) => (
              <div key={text} className="flex items-center gap-2 text-sm font-semibold text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.55)]">
                <CheckCircle size={15} className="text-primary shrink-0" />
                {text}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
