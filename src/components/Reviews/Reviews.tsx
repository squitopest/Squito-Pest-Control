"use client";

import Image from "next/image";
import { Star, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/lib/useMediaQuery";
import {
  homepageReviews,
  REVIEW_PLATFORMS,
  type Review,
  type ReviewPlatform,
  type ReviewPlatformId,
} from "@/data/reviews";
import SectionBleedImage from "@/components/Home/SectionBleedImage";
import { COMPANY_PHOTOS } from "@/lib/companyPhotos";

const STATS = [
  { value: "5.0", label: "Google rating" },
  { value: "100+", label: "Reviews" },
  { value: "5+", label: "Years local" },
] as const;

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function YelpIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#FF1A1A"
        d="M12.271 18.715c-.307.665-1.011.96-1.678.707l-2.004-.812a1.087 1.087 0 0 1-.632-1.004V6.394a1.087 1.087 0 0 1 1.632-.942l2.004 1.188c.52.308.787.92.667 1.53l-1.658 10.545zM5.84 5.643c-.48-.48-1.257-.48-1.737 0L2.29 7.456a1.23 1.23 0 0 0 0 1.737l2.813 2.813a1.23 1.23 0 0 0 1.737 0l1.813-1.813a1.23 1.23 0 0 0 0-1.737L5.84 5.643zm12.32 0a1.23 1.23 0 0 0-1.737 0l-1.813 1.813a1.23 1.23 0 0 0 0 1.737l1.813 1.813a1.23 1.23 0 0 0 1.737 0l2.813-2.813a1.23 1.23 0 0 0 0-1.737l-2.813-1.813z"
      />
    </svg>
  );
}

function ThumbtackIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#009FD9"
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"
      />
    </svg>
  );
}

function PlatformIcon({ id, className }: { id: ReviewPlatformId; className?: string }) {
  switch (id) {
    case "google":
      return <GoogleIcon className={className} />;
    case "yelp":
      return <YelpIcon className={className} />;
    case "thumbtack":
      return <ThumbtackIcon className={className} />;
  }
}

function PlatformLink({ platform }: { platform: ReviewPlatform }) {
  return (
    <a
      href={platform.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-border bg-card text-foreground font-bold text-sm hover:border-green-500/40 transition-colors"
    >
      <PlatformIcon id={platform.id} className="w-4 h-4 shrink-0" />
      See on {platform.label}
      <ExternalLink size={14} className="text-muted shrink-0" />
    </a>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-muted/50 border border-border rounded-xl text-center p-4">
      <p className="text-2xl md:text-3xl font-display font-bold text-foreground">{value}</p>
      <p className="text-xs md:text-sm text-muted mt-1">{label}</p>
    </div>
  );
}

function TestimonialCard({
  review,
  sticky = false,
  index = 0,
  stackTopBase = 80,
  stackGap = 28,
}: {
  review: Review;
  sticky?: boolean;
  index?: number;
  stackTopBase?: number;
  stackGap?: number;
}) {
  const quote = review.featured ? review.text : review.excerpt;

  const card = (
    <article className="p-6 rounded-2xl shadow-card flex flex-col w-full bg-card border border-border">
      <div className="mb-3">
        <p className="font-display font-bold text-lg text-foreground">{review.name}</p>
        <p className="text-sm text-muted flex items-center gap-1.5 mt-0.5">
          <GoogleIcon className="w-3 h-3 shrink-0" />
          {review.town}
        </p>
      </div>

      <div className="flex items-center gap-2 my-3">
        <span className="font-bold text-base text-foreground">{review.stars.toFixed(1)}</span>
        <div className="flex" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-4 w-4",
                i < review.stars ? "text-amber-400 fill-amber-400" : "text-muted/30"
              )}
            />
          ))}
        </div>
      </div>

      <p className="text-base text-body leading-relaxed">&ldquo;{quote}&rdquo;</p>
    </article>
  );

  if (!sticky) {
    return card;
  }

  return (
    <div
      className="sticky w-full self-start"
      style={{
        top: `${stackTopBase + index * stackGap}px`,
        zIndex: index + 1,
      }}
    >
      {card}
    </div>
  );
}

export default function Reviews() {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const useStickyStack = !reducedMotion;
  const reviewCount = homepageReviews.length;
  const stackStep = isDesktop ? 72 : 56;
  const stackTopBase = isDesktop ? 96 : 80;
  const stackGap = isDesktop ? 28 : 18;
  const estimatedCardHeight = isDesktop ? 200 : 240;
  const stackScrollDistance = Math.max(0, reviewCount - 1) * stackStep;
  const scrollContainerHeight = useStickyStack
    ? reviewCount * estimatedCardHeight +
      (reviewCount - 1) * 16 +
      stackScrollDistance
    : undefined;

  return (
    <section className="w-full bg-background section-py" id="reviews">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl min-w-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start min-w-0">
          <div className="min-w-0 w-full">
            <div className="flex flex-col gap-6 mb-10 lg:mb-12">
              <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground tracking-tight leading-tight">
                Families love us, pests hate us.
              </h2>
              <p className="text-lg text-muted leading-relaxed">
                Real reviews from Nassau &amp; Suffolk homeowners. The kind of thing your neighbor
                would actually tell you over the fence.
              </p>

              <div className="grid grid-cols-3 gap-3 md:gap-4">
                {STATS.map((stat) => (
                  <StatCard key={stat.label} value={stat.value} label={stat.label} />
                ))}
              </div>

              <div className="flex flex-wrap gap-2.5">
                {REVIEW_PLATFORMS.map((platform) => (
                  <PlatformLink key={platform.id} platform={platform} />
                ))}
              </div>
            </div>

            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden card-border shadow-card lg:hidden my-8">
              <Image
                src={COMPANY_PHOTOS.about}
                alt="Squito technician treating a Long Island home"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div
              className={cn("relative flex flex-col gap-4 min-w-0 w-full", useStickyStack && "pb-4")}
              style={
                scrollContainerHeight
                  ? { minHeight: `${scrollContainerHeight}px` }
                  : undefined
              }
            >
              {homepageReviews.map((review, index) => (
                <TestimonialCard
                  key={review.name}
                  review={review}
                  sticky={useStickyStack}
                  index={index}
                  stackTopBase={stackTopBase}
                  stackGap={stackGap}
                />
              ))}
            </div>
          </div>

          <div className="hidden lg:block lg:sticky lg:top-24 self-start w-full min-w-0">
            <div className="overflow-x-clip rounded-2xl lg:rounded-r-none lg:rounded-l-3xl">
              <SectionBleedImage
              src={COMPANY_PHOTOS.about}
              alt="Squito technician treating a Long Island home"
              side="right"
              sizes="52vw"
              className="min-h-[min(72vh,720px)] w-full"
              imageClassName="object-cover object-[center_35%]"
            />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
