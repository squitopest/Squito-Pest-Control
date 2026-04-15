import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor/CustomCursor";
import Navbar from "@/components/Navbar/Navbar";
import ChatWidget from "@/components/ChatWidget/ChatWidget";
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
  metadataBase: new URL("https://squitopestcontrol.com"),
  title: "Squito Pest Control - Long Island's Premier Pest Solutions",
  description:
    "Long Island's premier pest control company. Smart, safe, and effective pest elimination for homes and businesses. No contracts. Same-day service. 100% satisfaction guaranteed.",
  keywords:
    "pest control Long Island, exterminator Nassau County, exterminator Suffolk County, mosquito control, termite control, rodent removal, bed bug treatment",
  openGraph: {
    title: "Squito Pest Control - Long Island's Premier Pest Solutions",
    description:
      "Smart, safe, and effective pest elimination for homes and businesses across Long Island.",
    url: "https://squitopestcontrol.com",
    siteName: "Squito Pest Control",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Squito Pest Control" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Squito Pest Control - Long Island's Premier Pest Solutions",
    description: "Smart, safe, and effective pest elimination for homes and businesses across Long Island.",
    images: ["/og-image.png"],
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
    "name": "Squito Pest Control",
    "image": "https://squitopestcontrol.com/og-image.png",
    "telephone": "(800) 555-1234",
    "url": "https://squitopestcontrol.com",
    "areaServed": "Long Island, NY",
    "priceRange": "$$",
  };

  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <link rel="preconnect" href="https://www.youtube-nocookie.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <CustomCursor />
        <Navbar />
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <ChatWidget />
      </body>
    </html>
  );
}

