"use client";

import Image from "next/image";
import Link from "next/link";
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
    <footer className="bg-card border-t border-border section-py px-gutter" id="footer">
      <div className="container mx-auto max-w-container-max">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-stack-lg mb-12">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/logo.png"
                alt="Squito Pest Control"
                width={140}
                height={93}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-sm text-muted leading-relaxed max-w-sm mb-6">
              Your local Long Island experts in mosquito, tick, and home pest protection.
              Grounded in service since 2022.
            </p>
            <div className="space-y-3 mb-6">
              <a
                href="tel:6312031000"
                className="flex items-center gap-3 text-sm font-semibold text-foreground hover:text-primary transition-colors"
              >
                <Phone size={16} className="text-primary shrink-0" />
                (631) 203-1000
              </a>
              <a
                href="mailto:service@getsquito.com"
                className="flex items-center gap-3 text-sm text-muted hover:text-primary transition-colors"
              >
                <Mail size={16} className="text-primary shrink-0" />
                service@getsquito.com
              </a>
              <div className="flex items-center gap-3 text-sm text-muted">
                <MapPin size={16} className="text-primary shrink-0" />
                St. James, NY · Serving Nassau & Suffolk
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/getsquito/"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted hover:text-primary hover:border-primary/40 transition-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.instagram.com/getsquito/"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted hover:text-primary hover:border-primary/40 transition-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-foreground mb-4 uppercase tracking-wider text-xs">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted hover:text-primary transition-colors underline-offset-4 hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted">
          <p>
            © {new Date().getFullYear()} Squito Pest Control. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
