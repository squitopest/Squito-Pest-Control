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
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const closeMobileMenu = () => {
    setMenuOpen(false);
    setMobileServicesOpen(false);
  };

  useEffect(() => {
    let rafId = 0;
    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        setScrolled((prev) => (prev === window.scrollY > 12 ? prev : window.scrollY > 12));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const scrollY = window.scrollY;
    const body = document.body;
    const html = document.documentElement;
    const prevOverflow = body.style.overflow;
    const prevPosition = body.style.position;
    const prevTop = body.style.top;
    const prevWidth = body.style.width;
    const prevHtmlOverflow = html.style.overflow;

    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    html.style.overflow = "hidden";

    return () => {
      body.style.overflow = prevOverflow;
      body.style.position = prevPosition;
      body.style.top = prevTop;
      body.style.width = prevWidth;
      html.style.overflow = prevHtmlOverflow;
      window.scrollTo(0, scrollY);
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 w-full z-50 h-20 border-b transition-shadow duration-300",
          scrolled
            ? "bg-card/95 backdrop-blur-md border-border shadow-sm"
            : "bg-card border-border"
        )}
      >
        <nav className="container mx-auto px-4 lg:px-8 max-w-container-max h-full flex items-center justify-between">
          <Link href="/" className="relative flex items-center shrink-0" aria-label="Squito home">
            <Image
              src="/logo.png"
              alt="Squito"
              width={256}
              height={144}
              priority
              className="h-12 md:h-14 w-auto"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative group"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1 text-sm font-semibold text-foreground/80 hover:text-primary transition-colors py-2"
                >
                  {link.label}
                  {link.dropdown && (
                    <ChevronDown
                      size={14}
                      className="opacity-60 group-hover:rotate-180 transition-transform"
                    />
                  )}
                </Link>

                {link.dropdown && activeDropdown === link.label && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-56 animate-fade-in-up">
                    <div className="glass-card p-2 rounded-xl flex flex-col shadow-card">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="px-4 py-2.5 text-sm rounded-lg text-foreground hover:bg-muted hover:text-primary transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-5">
            <a
              href="tel:6312031000"
              className="text-sm font-bold text-primary hover:text-green-700 transition-colors"
            >
              (631) 203-1000
            </a>
            <Link href="/get-started?from=navbar" className="btn-primary px-6 py-3">
              Get Protected
            </Link>
          </div>

          <div className="flex lg:hidden items-center gap-3">
            <a
              href="tel:6312031000"
              className="text-xs font-bold text-primary"
              aria-label="Call (631) 203-1000"
            >
              Call
            </a>
            <button
              type="button"
              className="p-2 text-foreground"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </nav>
      </header>

      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-[55] bg-black/40 lg:hidden"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
          <aside className="fixed inset-y-0 left-0 z-[60] w-[min(320px,85vw)] bg-card border-r border-border shadow-xl flex flex-col p-6 lg:hidden animate-fade-in-up">
            <div className="flex justify-between items-center mb-8">
              <span className="font-display font-black text-primary uppercase tracking-tight">
                Squito
              </span>
              <button type="button" onClick={closeMobileMenu} aria-label="Close menu">
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-1 flex-1 overflow-y-auto">
              <Link
                href="/"
                className="flex items-center gap-3 p-3 rounded-xl font-semibold text-sm hover:bg-muted transition-colors"
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              {navLinks.map((link) =>
                link.dropdown ? (
                  <div key={link.label}>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between p-3 rounded-xl font-semibold text-sm hover:bg-muted transition-colors"
                      onClick={() => setMobileServicesOpen((open) => !open)}
                      aria-expanded={mobileServicesOpen}
                    >
                      {link.label}
                      <ChevronDown
                        size={18}
                        className={cn("transition-transform", mobileServicesOpen && "rotate-180")}
                      />
                    </button>
                    {mobileServicesOpen && (
                      <div className="ml-3 pl-3 border-l border-border flex flex-col gap-1 mb-2">
                        <Link
                          href={link.href}
                          className="p-2 text-sm text-muted hover:text-primary"
                          onClick={closeMobileMenu}
                        >
                          All Services
                        </Link>
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="p-2 text-sm text-muted hover:text-primary"
                            onClick={closeMobileMenu}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="p-3 rounded-xl font-semibold text-sm hover:bg-muted transition-colors"
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>

            <div className="pt-6 mt-auto border-t border-border flex flex-col gap-3">
              <a
                href="tel:6312031000"
                className="flex items-center gap-3 p-3 font-bold text-primary"
              >
                <Phone size={18} />
                (631) 203-1000
              </a>
              <Link
                href="/get-started?from=navbar"
                className="btn-primary justify-center py-3.5"
                onClick={closeMobileMenu}
              >
                Get Protected
              </Link>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
