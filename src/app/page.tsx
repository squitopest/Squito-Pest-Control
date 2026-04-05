"use client";

import Hero from "@/components/Hero/Hero";
import PestTicker from "@/components/PestTicker/PestTicker";
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
      <Stats />
      <Reviews />
      <PestLibrary />
      <Plans />
      <ServiceArea />
      <ContactForm />
      <Footer />
    </main>
  );
}
