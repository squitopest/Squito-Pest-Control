"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, X, ArrowRight } from "lucide-react";
import { PESTS, RISK_META, type Pest } from "@/data/pests";
import { getPestModalSigns, getPestModalSummary } from "@/lib/pestModalContent";
import { getGetStartedHrefForPest } from "@/lib/pestRouting";
import { useModalDismiss } from "@/lib/useModalDismiss";
import { COMPANY_PHOTOS } from "@/lib/companyPhotos";

const INTENT_SLUGS = [
  "carpenter-ants",
  "german-roach",
  "wolf-spider",
  "norway-rats",
  "deer-tick",
  "culex-mosquito",
  "sub-termites",
  "yellow-jackets",
] as const;

const intentPests = INTENT_SLUGS.map((slug) => PESTS.find((p) => p.slug === slug)!);

export default function PestIntentSection() {
  const [selected, setSelected] = useState("");
  const [activePest, setActivePest] = useState<Pest | null>(null);
  const modalCloseRef = useRef<HTMLButtonElement | null>(null);

  const closeModal = useCallback(() => {
    setActivePest(null);
    setSelected("");
  }, []);

  useModalDismiss(!!activePest, closeModal, modalCloseRef);

  const handlePestSelect = (slug: string) => {
    setSelected(slug);
    if (!slug) {
      setActivePest(null);
      return;
    }
    const pest = PESTS.find((p) => p.slug === slug);
    if (pest) setActivePest(pest);
  };

  return (
    <section className="border-b border-border bg-background overflow-hidden" id="pest-intent">
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] lg:min-h-[520px]">
        <div className="relative aspect-[16/10] sm:aspect-[5/3] lg:aspect-auto lg:min-h-full order-2 lg:order-1">
          <Image
            src={COMPANY_PHOTOS.serviceLawn}
            alt="Squito technician treating a Long Island lawn"
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center px-6 md:px-10 lg:px-14 xl:px-16 py-14 md:py-16 lg:py-20 order-1 lg:order-2">
          <div className="text-center lg:text-left mb-8 md:mb-10">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground tracking-tight mb-4">
              What&apos;s bugging you?
            </h2>
            <p className="text-muted text-lg max-w-xl lg:max-w-none">
              We treat hundreds of pests across Nassau & Suffolk. Select what&apos;s bothering you
              to see how we can help today.
            </p>
          </div>

          <label htmlFor="pest-intent-select" className="sr-only">
            Choose a pest
          </label>
          <div className="relative max-w-md w-full mx-auto lg:mx-0 mb-8">
            <select
              id="pest-intent-select"
              value={selected}
              onChange={(e) => handlePestSelect(e.target.value)}
              className="w-full appearance-none rounded-xl border border-border bg-card px-4 py-3.5 pr-10 text-foreground font-medium text-sm focus:outline-none focus:border-primary/50"
            >
              <option value="">Choose a pest</option>
              {PESTS.map((pest) => (
                <option key={pest.slug} value={pest.slug}>
                  {pest.name}
                </option>
              ))}
            </select>
            <ChevronDown
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4 w-full">
            {intentPests.map((pest) => (
              <Link
                key={pest.slug}
                href={`/pest-library#${pest.slug}`}
                className="group flex flex-col items-center text-center rounded-xl border border-border bg-card p-3 hover:border-primary/40 hover:shadow-card transition-all"
              >
                <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-2">
                  <Image
                    src={pest.image}
                    alt={pest.name}
                    fill
                    sizes="(max-width: 640px) 25vw, 120px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="text-sm font-bold text-primary">{pest.name.split(" ")[0]}</span>
                <span className="text-xs text-muted line-clamp-1">{pest.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {activePest && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="pest-intent-modal-title"
          className="fixed inset-0 z-[9999] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in-up overflow-y-auto"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="bg-card border border-border w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] my-auto">
            <div className="relative flex items-center justify-center bg-muted/40 border-b border-border px-6 py-5 min-h-[9rem]">
              <Image
                src={activePest.image}
                alt={activePest.name}
                width={280}
                height={200}
                className="max-h-28 sm:max-h-32 w-auto object-contain"
                sizes="280px"
              />
              <span
                className={`absolute top-4 left-4 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded border ${RISK_META[activePest.risk].badge}`}
              >
                <span className={`w-2 h-2 rounded-full shrink-0 ${RISK_META[activePest.risk].dot}`} />
                {activePest.risk}
              </span>
              <button
                ref={modalCloseRef}
                type="button"
                onClick={closeModal}
                aria-label="Close pest details"
                className="absolute top-4 right-4 text-muted hover:text-foreground bg-muted/80 hover:bg-muted p-2 rounded-full transition-all"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 flex-1 overflow-y-auto">
              <h3 id="pest-intent-modal-title" className="text-2xl font-display font-bold text-foreground">
                {activePest.name}
              </h3>
              <p className="text-muted text-sm italic mt-0.5">{activePest.scientificName}</p>
              <p className="text-muted text-xs mt-3">
                <span className="font-semibold uppercase tracking-wider text-primary">Active season · </span>
                {activePest.season}
              </p>
              <p className="text-body leading-relaxed text-sm mt-4">{getPestModalSummary(activePest)}</p>
              <div className="mt-5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                  What to watch for
                </h4>
                <ul className="space-y-1.5">
                  {getPestModalSigns(activePest).map((sign, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                      {sign}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 flex flex-col sm:flex-row items-stretch gap-3">
                <Link
                  href={getGetStartedHrefForPest(activePest.slug)}
                  className="gradient-cta flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-sm font-bold"
                >
                  Get Started
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href={`/pest-library#${activePest.slug}`}
                  onClick={closeModal}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 border border-border bg-muted/30 hover:bg-muted/50 text-foreground font-semibold rounded-full transition-all text-sm"
                >
                  Full profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
