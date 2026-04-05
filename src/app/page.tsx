"use client";

import { useEffect } from "react";
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
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

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
