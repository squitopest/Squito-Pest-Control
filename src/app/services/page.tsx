import { ShieldCheck, ArrowRight, Home, Building2, Bug, Rat, BedDouble, Sprout, Phone } from "lucide-react";
import Link from "next/link";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Services | Squito Pest Control",
  description: "Comprehensive pest control services for residential and commercial properties across Long Island.",
  path: "/services",
});

const services = [
  {
    icon: Bug,
    name: "Mosquito & Tick Control",
    tagline: "Reclaim your yard all season long",
    description: "Monthly barrier treatments April through October that target the zones where mosquitoes breed and ticks hide. Built into our Ultimate Fortress plan for season-long Long Island coverage.",
    href: "/services/mosquito-tick",
    badge: "Most Popular",
  },
  {
    icon: ShieldCheck,
    name: "Termite Defense",
    tagline: "Structural protection you can count on",
    description: "Termites cause $5B in damage each year nationwide. Our perimeter treatments and monitoring stations stop colonies before they reach your structure.",
    href: "/services/specialty/termite-inspection",
    badge: null,
  },
  {
    icon: Rat,
    name: "Rodent Removal",
    tagline: "Mice and rats, gone for good",
    description: "We locate entry points, set targeted traps, and seal the gaps. Not just removal — prevention. We block every route so they can't come back.",
    href: "/residential",
    badge: null,
  },
  {
    icon: BedDouble,
    name: "Bed Bug Treatment",
    tagline: "Heat and chemical solutions that work",
    description: "Bed bugs are notoriously hard to eliminate. We use a combination of heat treatment and EPA-registered products to reach every hiding spot in a single visit.",
    href: "/services/specialty/bed-bug-treatment",
    badge: null,
  },
  {
    icon: Sprout,
    name: "General Pest Control",
    tagline: "Year-round perimeter defense",
    description: "Ants, spiders, stinging insects, silverfish, and more. Our quarterly treatments keep the common pests out so you never have to think about them.",
    href: "/residential",
    badge: null,
  },
  {
    icon: Building2,
    name: "Commercial Services",
    tagline: "Audit-ready, discreet, and reliable",
    description: "Restaurants, warehouses, offices, and multi-family units. We build custom IPM programs with documentation for health inspections and compliance audits.",
    href: "/commercial",
    badge: "B2B",
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 relative overflow-hidden bg-background">
      <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-green-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider uppercase mb-6">
            <ShieldCheck size={14} />
            Our Services
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">
            Comprehensive <br />
            <span className="gradient-text">Pest Protection</span>
          </h1>
          <p className="text-xl text-white/70 leading-relaxed">
            From seasonal mosquito barriers to critical structural termite defense, we provide Long Island with intelligent, safe, and guaranteed pest management.
          </p>
        </div>

        {/* Residential / Commercial gateway */}
        <div className="grid md:grid-cols-2 gap-8 mb-20 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <Link href="/residential" className="group glass-card p-10 rounded-3xl border border-border hover:border-green-500/50 transition-all flex flex-col h-full relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mb-8 border border-green-500/20 group-hover:bg-green-500 group-hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all">
              <Home size={28} className="text-green-400 group-hover:text-white transition-colors" />
            </div>
            <h2 className="text-3xl font-display font-bold text-white mb-4">Residential</h2>
            <p className="text-white/70 mb-8 flex-grow text-lg">
              Protect your home and family with our pet-friendly, guaranteed residential treatment plans. Let us handle the pests so you can enjoy your peace of mind.
            </p>
            <div className="inline-flex items-center gap-2 text-green-400 font-semibold group-hover:translate-x-2 transition-transform">
              Explore Residential <ArrowRight size={18} />
            </div>
          </Link>

          <Link href="/commercial" className="group glass-card p-10 rounded-3xl border border-border hover:border-green-500/50 transition-all flex flex-col h-full relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mb-8 border border-green-500/20 group-hover:bg-green-500 group-hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all">
              <Building2 size={28} className="text-green-400 group-hover:text-white transition-colors" />
            </div>
            <h2 className="text-3xl font-display font-bold text-white mb-4">Commercial</h2>
            <p className="text-white/70 mb-8 flex-grow text-lg">
              Discreet, audit-ready commercial pest management designed to protect your brand, employees, and bottom line.
            </p>
            <div className="inline-flex items-center gap-2 text-green-400 font-semibold group-hover:translate-x-2 transition-transform">
              Explore Commercial <ArrowRight size={18} />
            </div>
          </Link>
        </div>

        {/* Individual services */}
        <div className="mb-20 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-white mb-3">
              What We <span className="gradient-text">Treat</span>
            </h2>
            <p className="text-white/60 text-lg">Every treatment is tailored to your property and the season you're in.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc) => (
              <Link
                key={svc.name}
                href={svc.href}
                className="group glass-card rounded-2xl p-7 border border-border hover:border-green-500/40 transition-all relative overflow-hidden flex flex-col"
              >
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                {svc.badge && (
                  <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                    {svc.badge}
                  </span>
                )}
                <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-5 group-hover:bg-green-500/20 transition-colors">
                  <svc.icon size={22} className="text-green-400" />
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-1">{svc.name}</h3>
                <p className="text-green-400 text-sm font-semibold mb-3">{svc.tagline}</p>
                <p className="text-white/60 text-sm leading-relaxed flex-grow">{svc.description}</p>
                <div className="inline-flex items-center gap-1.5 text-green-400 text-sm font-semibold mt-5 group-hover:translate-x-1 transition-transform">
                  Learn More <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mb-20 animate-fade-in-up" style={{ animationDelay: "0.18s" }}>
          <div className="glass-card rounded-3xl border border-white/10 p-10 md:p-12 flex flex-col lg:flex-row lg:items-center gap-8">
            <div className="flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-green-400 mb-3">
                Specialty Catalog
              </p>
              <h2 className="text-4xl font-display font-bold text-white mb-4 tracking-tight">
                Configure one-time specialty services online.
              </h2>
              <p className="text-white/65 text-lg leading-relaxed max-w-2xl">
                Bed bugs, flea programs, termite services, bait stations, event mosquito sprays, carpenter bees,
                stinging insect nests, and more now have their own live pricing and checkout flow.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/services/specialty"
                className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4 justify-center"
              >
                Browse Specialty Services <ArrowRight size={18} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/20 text-white font-semibold text-lg hover:border-green-500/50 hover:bg-green-500/10 transition-all"
              >
                Need a Quote Instead?
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="glass-card rounded-3xl border border-border p-10 md:p-14 text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-4xl font-display font-bold text-white mb-4">
            Not sure what you need? <span className="gradient-text">We'll figure it out.</span>
          </h2>
          <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
            Book a free inspection and a local technician will assess your property and recommend the right plan — no pressure, no obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4">
              Get Free Inspection <ArrowRight size={18} />
            </Link>
            <a href="tel:6312031000" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/20 text-white font-semibold text-lg hover:border-green-500/50 hover:bg-green-500/10 transition-all">
              <Phone size={18} className="text-green-400" />
              (631) 203-1000
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}
