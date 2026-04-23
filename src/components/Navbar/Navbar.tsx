"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const navLinks = [
  {
    label: "Services",
    href: "/services",
    dropdown: [
      { label: "Residential", href: "/residential" },
      { label: "Commercial", href: "/commercial" },
      { label: "Specialty Services", href: "/services/specialty" },
    ],
  },
  { label: "Plans", href: "/plans" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Mosquito & Tick", href: "/services/mosquito-tick" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-transparent",
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-border py-2"
            : "bg-transparent py-4"
        )}
      >
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl flex items-center justify-between">
          {/* Logo — green gradient wordmark asset, reads on both themes. */}
          <Link href="/" className="z-50 relative flex items-center" aria-label="Squito — home">
            <Image
              src="/logo.png"
              alt="Squito"
              width={120}
              height={80}
              priority
              className="h-[60px] md:h-[80px] w-auto"
            />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative group"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <a
                  href={link.href}
                  className="flex items-center gap-1 text-sm font-semibold text-foreground hover:text-primary transition-colors py-2"
                >
                  {link.label}
                  {link.dropdown && <ChevronDown size={14} className="opacity-70 group-hover:rotate-180 transition-transform" />}
                </a>
                
                {/* Dropdown Menu */}
                {link.dropdown && activeDropdown === link.label && (
                  <div className="absolute top-full left-[50%] -translate-x-[50%] pt-4 w-56 animate-fade-in-up">
                    <div className="glass-card p-2 rounded-xl flex flex-col shadow-card">
                      {link.dropdown.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          className="px-4 py-2.5 text-sm rounded-lg text-foreground hover:bg-tint-5 hover:text-primary transition-colors"
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-6">
            <a href="tel:6312031000" className="group relative flex items-center gap-2.5 px-4 py-2 rounded-xl bg-tint-5 border border-tint-10 overflow-hidden transition-all duration-300 hover:border-green-500/50 hover:bg-green-500/10">
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-green-500/10 to-transparent group-hover:translate-x-full transition-transform duration-700" />
              <div className="relative z-10 w-6 h-6 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition-colors shrink-0">
                <Phone size={12} className="text-green-600" />
              </div>
              <div className="relative z-10 flex flex-col leading-none">
                <span className="text-[8px] uppercase tracking-widest text-green-600 font-semibold">Call Now</span>
                <span className="text-sm font-bold text-foreground">(631) 203-1000</span>
              </div>
            </a>
            <Link href="/plans" className="btn-primary">
              Get Protected
            </Link>
          </div>

          {/* Hamburger */}
          <button
            type="button"
            className="lg:hidden relative z-50 p-2 text-foreground/80 hover:text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-2xl flex flex-col pt-28 px-8 animate-fade-in-up pb-8 overflow-y-auto">
          <div className="flex flex-col gap-6 text-2xl font-display font-semibold text-foreground flex-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="border-b border-tint-10 pb-4 hover:text-primary transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="mt-auto flex flex-col gap-4">
            <a href="tel:6312031000" className="group relative flex items-center justify-center gap-4 py-4 px-6 rounded-2xl bg-green-500/10 border border-green-500/30 overflow-hidden transition-all duration-500 hover:border-green-500 hover:shadow-[0_0_25px_rgba(34,197,94,0.2)]">
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-green-500/20 to-transparent group-hover:translate-x-full transition-transform duration-700" />
              <div className="relative z-10 w-12 h-12 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center group-hover:bg-green-500 transition-colors shrink-0">
                <Phone size={24} className="text-green-600 group-hover:text-white transition-colors" />
              </div>
              <div className="relative z-10 flex flex-col items-start">
                <span className="text-[10px] uppercase tracking-widest text-green-600 font-semibold leading-none mb-1">Call Now</span>
                <span className="text-xl font-display font-bold text-foreground">(631) 203-1000</span>
              </div>
            </a>
            <Link href="/plans" className="btn-primary justify-center py-4 text-lg" onClick={() => setMenuOpen(false)}>
              Get Protected
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
