"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight, Building2 } from "lucide-react";
import { ZoomParallax, type ParallaxImage } from "@/components/Home/ZoomParallax";
import CommercialCrossSell from "@/components/Home/CommercialCrossSell";
import GuaranteeSection from "@/components/Home/GuaranteeSection";
import BrandStorySection from "@/components/Home/BrandStorySection";
import { COMPANY_PHOTOS } from "@/lib/companyPhotos";
import { useMediaQuery } from "@/lib/useMediaQuery";

const PARALLAX_IMAGES: ParallaxImage[] = [
  {
    src: COMPANY_PHOTOS.commercialCrossSell,
    alt: "Squito service truck on a Long Island street",
  },
  {
    src: COMPANY_PHOTOS.commercialWarehouseTeam,
    alt: "Squito technicians servicing a commercial property",
  },
  {
    src: COMPANY_PHOTOS.brandStory,
    alt: "Squito team at a Long Island community event",
  },
  {
    src: COMPANY_PHOTOS.about,
    alt: "Squito technician treating a home eave",
  },
  {
    src: COMPANY_PHOTOS.serviceLawn,
    alt: "Technician treating a Long Island lawn perimeter",
  },
  {
    src: "/team-action.jpg",
    alt: "Squito technician in the field",
  },
  {
    src: COMPANY_PHOTOS.contact,
    alt: "Squito technician giving a thumbs up",
  },
];

function useFadePanel(
  progress: MotionValue<number>,
  start: number,
  peak: number,
  end: number
) {
  return useTransform(progress, [start, peak, end], [0, 1, 0]);
}

function StoryPanels({ progress }: { progress: MotionValue<number> }) {
  const commercialOpacity = useFadePanel(progress, 0, 0.1, 0.3);
  const guaranteeOpacity = useFadePanel(progress, 0.24, 0.4, 0.58);
  const brandOpacity = useFadePanel(progress, 0.52, 0.68, 0.82);

  return (
    <div className="container mx-auto px-4 lg:px-gutter max-w-container-max h-full flex items-end lg:items-center pb-6 lg:pb-0">
      <div className="relative w-full max-w-xl min-h-[280px] sm:min-h-[320px] pointer-events-auto">
        <motion.div
          style={{ opacity: commercialOpacity }}
          className="absolute inset-0 flex flex-col justify-center"
        >
          <div className="rounded-2xl border border-border bg-card/95 backdrop-blur-sm p-6 sm:p-8 md:p-10 shadow-card">
            <div className="inline-flex items-center gap-2 text-primary mb-3">
              <Building2 size={20} />
            </div>
            <h2 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-foreground mb-3 tracking-tight">
              Love us at home? You&apos;ll love us at work, too.
            </h2>
            <p className="text-muted text-base leading-relaxed mb-6">
              Squito also offers commercial services for Long Island businesses. The same trusted
              local team, tailored for your property.
            </p>
            <Link
              href="/commercial"
              className="inline-flex items-center gap-2 font-bold text-sm text-primary hover:underline"
            >
              Learn More
              <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>

        <motion.div
          id="guarantee"
          style={{ opacity: guaranteeOpacity }}
          className="absolute inset-0 flex flex-col justify-center"
        >
          <div className="rounded-2xl border border-border bg-card/95 backdrop-blur-sm p-8 md:p-10 shadow-card">
            <div className="flex items-start gap-4 mb-4">
              <div className="relative h-20 w-20 shrink-0">
                <Image
                  src={COMPANY_PHOTOS.guarantee}
                  alt="100% Squito Guaranteed"
                  fill
                  sizes="80px"
                  className="object-contain"
                />
              </div>
              <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground tracking-tight pt-1">
                Squito Guarantee
              </h2>
            </div>
            <p className="text-muted leading-relaxed">
              We&apos;re so sure you&apos;ll love our service, we guarantee it. If covered pests
              return between scheduled visits, call us. We&apos;ll re-treat at no charge until the
              problem is solved.
            </p>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: brandOpacity }}
          className="absolute inset-0 flex flex-col justify-center"
        >
          <div className="rounded-2xl border border-border bg-card/95 backdrop-blur-sm p-8 md:p-10 shadow-card">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground tracking-tight mb-6">
              Our business is pest, our purpose is people.
            </h2>
            <div className="space-y-5 text-body leading-relaxed">
              <div>
                <h3 className="font-bold text-foreground mb-2">Local first.</h3>
                <p className="text-muted">
                  Not a franchise. Not a call center. Squito is a Long Island team that knows Nassau
                  and Suffolk: the seasons, the neighborhoods, and what actually works here.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">Service always.</h3>
                <p className="text-muted">
                  Same-day when you need it. Free inspections with no pressure. We explain what
                  we&apos;re doing, charge what we quoted, and come back until the job is done.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function HomeParallaxSection() {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  if (reducedMotion) {
    return (
      <section className="border-y border-border">
        <CommercialCrossSell />
        <GuaranteeSection />
        <BrandStorySection />
      </section>
    );
  }

  return (
    <section className="border-y border-border bg-background" aria-label="About Squito">
      <ZoomParallax images={PARALLAX_IMAGES}>
        {(scrollYProgress) => <StoryPanels progress={scrollYProgress} />}
      </ZoomParallax>
    </section>
  );
}
