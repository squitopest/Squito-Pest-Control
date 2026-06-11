"use client";

import { useState } from "react";
import { ArrowRight, Leaf } from "lucide-react";
import useScrollReveal from "@/hooks/useScrollReveal";
import { COMPANY_PHOTOS } from "@/lib/companyPhotos";

const services = [
  {
    title: "Mosquito & Tick Control",
    desc: "Reclaim your outdoor spaces with our seasonal mosquito and tick barrier spray programs.",
    features: ["Monthly treatments", "Yard-wide coverage", "Safe for pets"],
    baseColor: "text-green-500",
    bgHover: "hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)]",
    cta: "Enjoy Your Yard",
    bgImage: COMPANY_PHOTOS.serviceBackyardFogging
  },
  {
    title: "Commercial Services",
    desc: "Tailored pest management programs that protect your business, employees, and reputation.",
    features: ["Customized plans", "Compliance-ready", "Discreet service"],
    baseColor: "text-green-500",
    bgHover: "hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)]",
    cta: "Protect Your Business",
    bgImage: COMPANY_PHOTOS.commercial
  },
  {
    title: "Residential Protection",
    desc: "Comprehensive home protection plans that keep pests out of your family's living space year-round.",
    features: ["Year-round coverage", "Quarterly treatments", "100% satisfaction"],
    baseColor: "text-green-500",
    bgHover: "hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)]",
    cta: "Protect Your Home",
    bgImage: COMPANY_PHOTOS.residential
  },
  {
    title: "Termite Defense",
    desc: "Protect your biggest investment with our advanced termite detection and elimination systems.",
    features: ["Free inspection", "Targeted liquid barriers", "Annual monitoring"],
    baseColor: "text-green-500",
    bgHover: "hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)]",
    cta: "Guard Your Home",
    bgImage: COMPANY_PHOTOS.serviceStoneWall
  },
  {
    title: "Rodent Removal",
    desc: "Fast, humane rodent elimination and exclusion service to keep mice and rats out permanently.",
    features: ["Seal entry points", "Bait stations", "Follow-up visits"],
    baseColor: "text-green-500",
    bgHover: "hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)]",
    cta: "Remove Rodents",
    bgImage: COMPANY_PHOTOS.serviceEaveReach
  },
  {
    title: "Bed Bug Treatment",
    desc: "Targeted deep chemical treatment to eliminate bed bugs at every life stage, guaranteed.",
    features: ["Deep advanced treatment", "Same-day service", "Guaranteed results"],
    baseColor: "text-green-500",
    bgHover: "hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)]",
    cta: "Get Treatment",
    bgImage: COMPANY_PHOTOS.serviceLawn
  },
];

export default function Services() {
  const [, setHovered] = useState<number | null>(null);
  const ref = useScrollReveal();

  return (
    <section className="py-16 md:py-24 relative overflow-hidden" id="services" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="flex flex-col items-center text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider uppercase mb-6">
            <Leaf size={14} />
            Our Services
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white tracking-tight">
            Complete Protection for{" "}
            <span className="gradient-text">Every Pest</span>
          </h2>
          <p className="text-white/70 max-w-2xl text-lg">
            One-time treatments or year-round plans. We handle it all.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <div
              key={i}
              className={`min-h-[350px] md:min-h-[420px] rounded-2xl relative group overflow-hidden transition-all duration-500 hover:-translate-y-2 border border-white/10 ${service.bgHover}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Background Image & Overlay Layer */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                style={{ backgroundImage: `url(${service.bgImage})` }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent group-hover:via-[#0a0a0a]/60 transition-colors duration-500"
              />

              <div className="relative z-10 flex flex-col h-full p-6 md:p-8 pt-8 md:pt-10">
                <h3 className="text-2xl font-display font-semibold mb-3 text-white shadow-sm tracking-wide">{service.title}</h3>
                <p className="text-white/80 font-medium mb-6 flex-grow leading-relaxed max-w-[95%]">{service.desc}</p>
                <ul className="flex flex-col gap-3 mb-8">
                  {service.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm font-semibold text-white/90">
                      <span className={`w-1.5 h-1.5 rounded-full bg-current ${service.baseColor}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className={`mt-auto inline-flex items-center gap-2 font-bold text-sm uppercase tracking-wider transition-colors ${service.baseColor} hover:text-white`}>
                  {service.cta} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
