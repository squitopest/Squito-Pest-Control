"use client";

import { useEffect, useRef } from "react";
import { Camera } from "lucide-react";
import Image from "next/image";
import DualCta from "@/components/Home/DualCta";
import TrustBand from "@/components/Home/TrustBand";
import TownZipLookup from "@/components/ServiceArea/TownZipLookup";
import { COMPANY_PHOTOS } from "@/lib/companyPhotos";
import { useMediaQuery } from "@/lib/useMediaQuery";

export default function Hero() {
  const isMobile = useMediaQuery("(max-width: 1023px)", true);
  const videoSrc = isMobile ? "/hero_720p_mobile.mp4" : "/hero_1080p.mp4";
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const attempt = v.play();
    if (attempt && typeof attempt.catch === "function") {
      attempt.catch(() => {});
    }
  }, [videoSrc]);

  return (
    <>
      {/* Mobile: full-bleed photo/video hero */}
      <section
        className="on-photo relative min-h-[100svh] overflow-x-hidden lg:hidden"
        id="hero"
      >
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <Image
            src={COMPANY_PHOTOS.heroMobilePoster}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
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
              poster={COMPANY_PHOTOS.heroMobilePoster}
              aria-hidden="true"
              tabIndex={-1}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/75" />
        </div>

        <div className="relative z-10 flex min-h-[100svh] flex-col justify-center px-gutter pt-20 pb-10">
          <div className="container mx-auto max-w-container-max text-center">
            <h1 className="font-display font-bold text-5xl sm:text-6xl text-white leading-tight tracking-tight mb-4 [text-shadow:0_2px_20px_rgba(0,0,0,0.65)]">
              Smart. Safe.{" "}
              <span className="text-primary">Pest Control</span>
            </h1>
            <p className="text-white/90 text-lg max-w-sm mx-auto mb-6 [text-shadow:0_1px_12px_rgba(0,0,0,0.55)]">
              Long Island&apos;s source for pest protection.
            </p>
            <DualCta from="hero" layout="col" theme="light" className="mb-4" />
            <TrustBand theme="light" className="mb-4 max-w-sm mx-auto" />
            <div className="max-w-sm mx-auto mb-4">
              <TownZipLookup variant="compact" theme="on-photo" inputId="hero-town-search-mobile" />
            </div>
            <div className="text-center">
              <button
                type="button"
                onClick={() => document.getElementById("library-pest-camera")?.click()}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/30 bg-black/20 text-white font-bold text-xs uppercase tracking-wider"
              >
                <Camera size={16} />
                Pest Identifier
              </button>
              <p className="mt-2 text-xs text-white/70 max-w-xs mx-auto">
                Upload your pest image to identify the issue
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Desktop: full-bleed video background with copy on the left */}
      <section
        className="on-photo hidden lg:block relative min-h-[88vh] pt-28 pb-section-py-desktop overflow-hidden"
        id="hero-desktop"
      >
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <Image
            src={COMPANY_PHOTOS.heroDesktop}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {videoSrc && (
            <video
              src={videoSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={COMPANY_PHOTOS.heroMobilePoster}
              aria-hidden="true"
              tabIndex={-1}
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/65" />
        </div>

        <div className="container relative z-10 mx-auto px-gutter max-w-container-max flex min-h-[calc(88vh-7rem)] items-center justify-center">
          <div className="max-w-2xl w-full text-center animate-fade-in-up">
            <h1 className="font-display font-bold text-6xl xl:text-7xl 2xl:text-[5.5rem] text-white leading-[1.02] tracking-tight mb-6 [text-shadow:0_2px_24px_rgba(0,0,0,0.55)]">
              Smart. Safe.
              <br />
              <span className="text-primary">Pest Control</span>
            </h1>
            <p className="text-lg text-white/90 max-w-lg mx-auto mb-8 leading-relaxed [text-shadow:0_1px_12px_rgba(0,0,0,0.45)]">
              Mosquito, tick, and pest protection tailored for Long Island neighborhoods.
              Professional care that treats your yard like our own.
            </p>
            <DualCta from="hero" layout="col" theme="light" className="mb-6 max-w-md mx-auto" />
            <TrustBand theme="light" className="mb-6 max-w-lg mx-auto" />
            <TownZipLookup
              variant="compact"
              theme="on-photo"
              className="mb-6 max-w-md mx-auto"
              inputId="hero-town-search-desktop"
            />
            <div className="text-center">
              <button
                type="button"
                onClick={() => document.getElementById("library-pest-camera")?.click()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/30 bg-black/20 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/10 transition-colors"
              >
                <Camera size={16} />
                Pest Identifier
              </button>
              <p className="mt-2 text-xs text-white/70 max-w-xs mx-auto">
                Upload your pest image to identify the issue
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
