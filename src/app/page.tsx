import dynamic from 'next/dynamic';
import Hero from "@/components/Hero/Hero";
import PestTicker from "@/components/PestTicker/PestTicker";
import Stats from "@/components/Stats/Stats";
import Reviews from "@/components/Reviews/Reviews";
import Footer from "@/components/Footer/Footer";
import ScrollReset from "@/components/ScrollReset";

/* Below-fold sections — code-split into separate JS chunks for faster initial load */
const PestLibrary = dynamic(() => import("@/components/PestLibrary/PestLibrary"));
const ServiceArea = dynamic(() => import("@/components/ServiceArea/ServiceArea"));
const ContactForm = dynamic(() => import("@/components/ContactForm/ContactForm"));

export default function Home() {
  return (
    <main>
      <ScrollReset />
      <Hero />
      <PestTicker />
      <Stats />
      <Reviews />
      <PestLibrary />
      <ServiceArea />
      <ContactForm />
      <Footer />
    </main>
  );
}
