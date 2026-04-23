"use client";

import Image from "next/image";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";

const footerLinks = {
  Services: [
    { label: "Residential Pest Control", href: "/residential" },
    { label: "Commercial Services", href: "/commercial" },
    { label: "Mosquito & Tick Control", href: "/services/mosquito-tick" },
    { label: "Specialty Services", href: "/services/specialty" },
    { label: "Mosquito Event Spray", href: "/services/specialty/event-mosquito-spray" },
    { label: "Termite Inspection", href: "/services/specialty/termite-inspection" },
    { label: "Bed Bug Treatment", href: "/services/specialty/bed-bug-treatment" },
  ],
  "Pest Library": [
    { label: "Mosquitoes", href: "/pest-library#culex-mosquito" },
    { label: "Cockroaches", href: "/pest-library#german-roach" },
    { label: "Termites", href: "/pest-library#sub-termites" },
    { label: "Rodents", href: "/pest-library#norway-rats" },
    { label: "Bed Bugs", href: "/pest-library#bed-bugs" },
    { label: "View All Pests →", href: "/pest-library" },
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
    <footer className="bg-background border-t border-border pt-16 pb-8 text-muted overflow-hidden relative" id="footer">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-green-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center">
              <Image
                src="/logo.png"
                alt="Squito Pest Control"
                width={140}
                height={93}
                className="h-[60px] w-auto"
              />
            </div>
            <p className="text-sm leading-relaxed max-w-sm mb-8 text-subtle">
              Proudly serving Long Island, New York. We eliminate pests, not peace of mind.
            </p>
            <div className="space-y-4 mb-8">
              <a href="tel:6312031000" className="group relative inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-tint-5 border border-tint-10 overflow-hidden transition-all duration-300 hover:border-green-500/50 hover:bg-green-500/10 w-fit">
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-green-500/10 to-transparent group-hover:translate-x-full transition-transform duration-700" />
                <div className="relative z-10 w-7 h-7 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                  <Phone size={13} className="text-green-600" />
                </div>
                <div className="relative z-10 flex flex-col">
                  <span className="text-[9px] uppercase tracking-widest text-green-600 font-semibold leading-none mb-0.5">Call Us</span>
                  <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">(631) 203-1000</span>
                </div>
              </a>
              <a href="mailto:service@getsquito.com" className="flex items-center gap-3 text-sm hover:text-primary transition-colors w-fit group">
                <div className="w-8 h-8 rounded-full bg-tint-5 border border-tint-10 flex items-center justify-center group-hover:border-green-500/30 group-hover:bg-green-500/10 transition-all">
                  <Mail size={14} className="text-green-600" />
                </div>
                service@getsquito.com
              </a>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-full bg-tint-5 border border-tint-10 flex items-center justify-center">
                  <MapPin size={14} className="text-green-600" />
                </div>
                Long Island, NY
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://www.facebook.com/getsquito/" aria-label="Facebook" className="text-subtle hover:text-foreground hover:scale-110 transition-all" target="_blank" rel="noopener noreferrer"><Facebook size={20} /></a>
              <a href="https://www.instagram.com/getsquito/" aria-label="Instagram" className="text-subtle hover:text-foreground hover:scale-110 transition-all" target="_blank" rel="noopener noreferrer"><Instagram size={20} /></a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="lg:col-span-1">
              <h4 className="font-semibold text-foreground mb-6 uppercase tracking-wider text-sm">{category}</h4>
              <ul className="space-y-4">
                {links.map(link => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm hover:text-primary transition-colors">
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
            <div className="text-xs font-semibold uppercase tracking-wider bg-tint-5 border border-tint-10 px-3 py-1.5 rounded-md text-subtle">✓ Licensed &amp; Insured</div>
            <div className="text-xs font-semibold uppercase tracking-wider bg-tint-5 border border-tint-10 px-3 py-1.5 rounded-md text-subtle">✓ BBB Accredited</div>
            <div className="text-xs font-semibold uppercase tracking-wider bg-tint-5 border border-tint-10 px-3 py-1.5 rounded-md text-subtle">✓ NPMA Member</div>
            <div className="text-xs font-semibold uppercase tracking-wider bg-tint-5 border border-tint-10 px-3 py-1.5 rounded-md text-subtle">✓ Pet-Safe Products</div>
          </div>
          <div className="text-sm text-subtle text-center md:text-right shrink-0">
            © {new Date().getFullYear()} <span className="font-semibold text-foreground">Squito</span> Pest Control. All rights reserved.<br/>
            <a href="/privacy" className="hover:text-foreground transition-colors underline underline-offset-4 decoration-current/30 hover:decoration-current">Privacy Policy</a> · <a href="/terms" className="hover:text-foreground transition-colors underline underline-offset-4 decoration-current/30 hover:decoration-current">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
