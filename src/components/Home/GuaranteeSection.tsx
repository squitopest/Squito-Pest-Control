import Image from "next/image";
import { COMPANY_PHOTOS } from "@/lib/companyPhotos";
import SplitFeatureSection from "@/components/Home/SplitFeatureSection";

export default function GuaranteeSection() {
  return (
    <SplitFeatureSection
      id="guarantee"
      imageSrc={COMPANY_PHOTOS.commercialWarehouseTeam}
      imageAlt="Squito technicians servicing a Long Island commercial property"
      reverse
      panelClassName="bg-muted/30"
    >
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
        We&apos;re so sure you&apos;ll love our service, we guarantee it. If covered pests return
        between scheduled visits, call us. We&apos;ll re-treat at no charge until the problem is
        solved.
      </p>
    </SplitFeatureSection>
  );
}
