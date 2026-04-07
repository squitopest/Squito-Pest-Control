"use client";

import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";

const footerLinks = {
  Services: [
    { label: "Residential Pest Control", href: "/residential" },
    { label: "Commercial Services", href: "/commercial" },
    { label: "Mosquito & Tick Control", href: "/services" },
    { label: "Termite Defense", href: "/services" },
    { label: "Rodent Removal", href: "/services" },
    { label: "Bed Bug Treatment", href: "/services" },
  ],
  "Pest Library": [
    { label: "Mosquitoes", href: "/#mosquitoes" },
    { label: "Cockroaches", href: "/#cockroaches" },
    { label: "Termites", href: "/#termites" },
    { label: "Rodents", href: "/#rats" },
    { label: "Bed Bugs", href: "/#bed-bugs" },
    { label: "View All Pests →", href: "/#pest-library" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Service Area", href: "/#service-area" },
    { label: "Plans & Pricing", href: "/plans" },
    { label: "Reviews", href: "/#reviews" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-16 pb-8 text-white/70 overflow-hidden relative" id="footer">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-green-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6 text-white font-display font-bold text-xl md:text-2xl tracking-tight animate-pulse shrink-0">
              <div className="flex flex-col sm:flex-row sm:gap-1.5">
                <span className="opacity-90">Smart. Safe.</span>
                <span className="text-green-500">Pest Control.</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-sm mb-8 text-white/60">
              Smart. Safe. Pest Control. Proudly serving Long Island, New York. We eliminate pests, not peace of mind.
            </p>
            <div className="space-y-4 mb-8">
              <a href="tel:6312031000" className="group relative inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 overflow-hidden transition-all duration-300 hover:border-green-500/50 hover:bg-green-500/10 w-fit">
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-green-500/10 to-transparent group-hover:translate-x-full transition-transform duration-700" />
                <div className="relative z-10 w-7 h-7 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                  <Phone size={13} className="text-green-500" />
                </div>
                <div className="relative z-10 flex flex-col">
                  <span className="text-[9px] uppercase tracking-widest text-green-500/60 font-semibold leading-none mb-0.5">Call Us</span>
                  <span className="text-sm font-semibold text-white group-hover:text-green-400 transition-colors">(631) 203-1000</span>
                </div>
              </a>
              <a href="mailto:service@getsquito.com" className="flex items-center gap-3 text-sm hover:text-green-400 transition-colors w-fit group">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-green-500/30 group-hover:bg-green-500/10 transition-all">
                  <Mail size={14} className="text-green-500" />
                </div>
                service@getsquito.com
              </a>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <MapPin size={14} className="text-green-500" />
                </div>
                Long Island, NY
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://www.facebook.com/getsquito/" aria-label="Facebook" className="text-white/40 hover:text-white hover:scale-110 transition-all" target="_blank" rel="noopener noreferrer"><Facebook size={20} /></a>
              <a href="https://www.instagram.com/getsquito/" aria-label="Instagram" className="text-white/40 hover:text-white hover:scale-110 transition-all" target="_blank" rel="noopener noreferrer"><Instagram size={20} /></a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="lg:col-span-1">
              <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-sm">{category}</h4>
              <ul className="space-y-4">
                {links.map(link => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm hover:text-green-400 transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6 mt-16">
          <div className="flex flex-wrap justify-center gap-3 md:gap-6">
            <div className="text-xs font-semibold uppercase tracking-wider bg-white/5 border border-white/10 px-3 py-1.5 rounded-md text-white/50">✓ Licensed & Insured</div>
            <div className="text-xs font-semibold uppercase tracking-wider bg-white/5 border border-white/10 px-3 py-1.5 rounded-md text-white/50">✓ BBB Accredited</div>
            <div className="text-xs font-semibold uppercase tracking-wider bg-white/5 border border-white/10 px-3 py-1.5 rounded-md text-white/50">✓ NPMA Member</div>
            <div className="text-xs font-semibold uppercase tracking-wider bg-white/5 border border-white/10 px-3 py-1.5 rounded-md text-white/50">✓ Pet-Safe Products</div>
          </div>
          <div className="text-sm text-white/50 text-center md:text-right shrink-0">
            © {new Date().getFullYear()} <img src="/logo.png" alt="Squito" className="inline-block h-[1.8em] align-middle -translate-y-[0.1em] mx-1 mx-[-1px] brightness-0 invert opacity-80" /> Pest Control. All rights reserved.<br/>
            <a href="/privacy" className="hover:text-white transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-white/60">Privacy Policy</a> · <a href="/terms" className="hover:text-white transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-white/60">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
