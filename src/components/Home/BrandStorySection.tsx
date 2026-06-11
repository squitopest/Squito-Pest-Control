import { COMPANY_PHOTOS } from "@/lib/companyPhotos";
import SplitFeatureSection from "@/components/Home/SplitFeatureSection";

type BrandStorySectionProps = {
  photoSrc?: string;
  photoAlt?: string;
};

export default function BrandStorySection({
  photoSrc = COMPANY_PHOTOS.brandStory,
  photoAlt = "Squito Pest Control team serving Long Island",
}: BrandStorySectionProps) {
  return (
    <SplitFeatureSection
      imageSrc={photoSrc}
      imageAlt={photoAlt}
      panelClassName="bg-card"
    >
      <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground tracking-tight mb-6">
        Our business is pest, our purpose is people.
      </h2>
      <div className="space-y-6 text-body leading-relaxed">
        <div>
          <h3 className="font-bold text-foreground mb-2">Local first.</h3>
          <p className="text-muted">
            Not a franchise. Not a call center. Squito is a Long Island team that knows Nassau and
            Suffolk: the seasons, the neighborhoods, and what actually works here.
          </p>
        </div>
        <div>
          <h3 className="font-bold text-foreground mb-2">Service always.</h3>
          <p className="text-muted">
            Same-day when you need it. Free inspections with no pressure. We explain what we&apos;re
            doing, charge what we quoted, and come back until the job is done.
          </p>
        </div>
      </div>
    </SplitFeatureSection>
  );
}
