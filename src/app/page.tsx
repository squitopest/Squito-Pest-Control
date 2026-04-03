"use client";

import Hero from "@/components/Hero/Hero";
import PestTicker from "@/components/PestTicker/PestTicker";
import Services from "@/components/Services/Services";
import HowItWorks from "@/components/HowItWorks/HowItWorks";
import Stats from "@/components/Stats/Stats";
import PestLibrary from "@/components/PestLibrary/PestLibrary";
import Plans from "@/components/Plans/Plans";
import Reviews from "@/components/Reviews/Reviews";
import ServiceArea from "@/components/ServiceArea/ServiceArea";
import ContactForm from "@/components/ContactForm/ContactForm";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <PestTicker />
      <Services />
      <HowItWorks />
      <Stats />
      <PestLibrary />
      <Plans />
      <Reviews />
      <ServiceArea />
      <ContactForm />
      <Footer />
    </main>
  );
}
