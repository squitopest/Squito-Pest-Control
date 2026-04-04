import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor/CustomCursor";
import Navbar from "@/components/Navbar/Navbar";
import ChatWidget from "@/components/ChatWidget/ChatWidget";
import StickyCallBar from "@/components/StickyCallBar/StickyCallBar";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Squito Pest Control- Long Island's Premiere Pest Solutions",
  description:
    "Long Island's premier pest control company. Smart, safe, and effective pest elimination for homes and businesses. No contracts. Same-day service. 100% satisfaction guaranteed.",
  keywords:
    "pest control Long Island, exterminator Nassau County, exterminator Suffolk County, mosquito control, termite control, rodent removal, bed bug treatment",
  openGraph: {
    title: "Squito Pest Control- Long Island's Premiere Pest Solutions",
    description:
      "Smart, safe, and effective pest elimination for homes and businesses across Long Island.",
    url: "https://getsquito.com",
    siteName: "Squito AI",
    images: [{ url: "https://images.unsplash.com/photo-1616421379377-160fa8ccdb5c?auto=format&fit=crop&q=80&w=1200", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PestControl",
    "name": "Squito AI",
    "image": "https://images.unsplash.com/photo-1616421379377-160fa8ccdb5c",
    "telephone": "(800) 555-1234",
    "url": "https://getsquito.com",
    "areaServed": "Long Island, NY",
    "priceRange": "$$",
  };

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <CustomCursor />
        <Navbar />
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <StickyCallBar />
        <ChatWidget />
      </body>
    </html>
  );
}
