import Link from "next/link";
import { Building2, ArrowRight } from "lucide-react";
import { COMPANY_PHOTOS } from "@/lib/companyPhotos";
import SplitFeatureSection from "@/components/Home/SplitFeatureSection";

export default function CommercialCrossSell() {
  return (
    <SplitFeatureSection
      imageSrc={COMPANY_PHOTOS.commercialCrossSell}
      imageAlt="Squito service truck on a Long Island street"
      panelClassName="bg-card"
    >
      <div className="inline-flex items-center gap-2 text-primary mb-3">
        <Building2 size={20} />
      </div>
      <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-3 tracking-tight">
        Love us at home? You&apos;ll love us at work, too.
      </h2>
      <p className="text-muted text-base leading-relaxed mb-6">
        Squito also offers commercial services for Long Island businesses. The same trusted local
        team, tailored for your property.
      </p>
      <Link
        href="/commercial"
        className="inline-flex items-center gap-2 font-bold text-sm text-primary hover:underline"
      >
        Learn More
        <ArrowRight size={16} />
      </Link>
    </SplitFeatureSection>
  );
}
