import { Suspense } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero/Hero";
import PestIdentifyCapture from "@/components/PestLibrary/PestIdentifyCapture";
import PestIntentSection from "@/components/Home/PestIntentSection";
import CallToActionBand from "@/components/Home/CallToActionBand";
import Reviews from "@/components/Reviews/Reviews";
import PlansTeaser from "@/components/Home/PlansTeaser";
import HomeParallaxSection from "@/components/Home/HomeParallaxSection";
import { COMPANY_PHOTOS } from "@/lib/companyPhotos";
import ScrollReset from "@/components/ScrollReset";

const ServiceArea = dynamic(() => import("@/components/ServiceArea/ServiceArea"));
const ContactForm = dynamic(() => import("@/components/ContactForm/ContactForm"));
const PromoPopup = dynamic(() => import("@/components/PromoPopup/PromoPopup"));

export default function Home() {
  return (
    <main className="w-full min-w-0 max-w-[100vw] overflow-x-clip">
      <ScrollReset />
      <PromoPopup />
      <PestIdentifyCapture />
      <Hero />
      <PestIntentSection />
      <CallToActionBand variant="inspection" />
      <Reviews />
      <PlansTeaser />
      <CallToActionBand variant="get-started" />
      <ServiceArea />
      <HomeParallaxSection />
      <Suspense fallback={<div className="py-16 text-center text-muted">Loading contact form...</div>}>
        <ContactForm teamPhoto={COMPANY_PHOTOS.contact} />
      </Suspense>
    </main>
  );
}
