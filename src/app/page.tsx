import { Suspense } from "react";
import dynamic from 'next/dynamic';
import Hero from "@/components/Hero/Hero";
import PestIdentifyCapture from "@/components/PestLibrary/PestIdentifyCapture";
import PestTicker from "@/components/PestTicker/PestTicker";
import Stats from "@/components/Stats/Stats";
import Reviews from "@/components/Reviews/Reviews";
import Footer from "@/components/Footer/Footer";
import ScrollReset from "@/components/ScrollReset";

/* Below-fold sections — code-split into separate JS chunks for faster initial load */
const PestLibrary = dynamic(() => import("@/components/PestLibrary/PestLibraryTeaser"));
const ServiceArea = dynamic(() => import("@/components/ServiceArea/ServiceArea"));
const ContactForm = dynamic(() => import("@/components/ContactForm/ContactForm"));
const PromoPopup = dynamic(() => import("@/components/PromoPopup/PromoPopup"));

export default function Home() {
  return (
    <main>
      <ScrollReset />
      <PromoPopup />
      {/* Eager mount so Hero "Pest Identifier" finds #library-pest-camera before lazy sections load */}
      <PestIdentifyCapture />
      <Hero />
      <PestTicker />
      <Stats />
      <Reviews />
      <PestLibrary />
      <ServiceArea />
      <Suspense fallback={<div className="py-16 text-center text-white/50">Loading contact form...</div>}>
        <ContactForm />
      </Suspense>
      <Footer />
    </main>
  );
}
