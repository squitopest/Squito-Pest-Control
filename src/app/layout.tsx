import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import CustomCursor from "@/components/CustomCursor/CustomCursor";
import Navbar from "@/components/Navbar/Navbar";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import ChatWidgetLoader from "@/components/ChatWidget/ChatWidgetLoader";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/site";

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
  metadataBase: new URL(SITE_URL),
  title: `${SITE_NAME} - Long Island's Premier Pest Solutions`,
  description:
    "Long Island's premier pest control company. Smart, safe, and effective pest elimination for homes and businesses. No contracts. Same-day service. 100% satisfaction guaranteed.",
  keywords:
    "pest control Long Island, exterminator Nassau County, exterminator Suffolk County, mosquito control, termite control, rodent removal, bed bug treatment",
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: `${SITE_NAME} - Long Island's Premier Pest Solutions`,
    description:
      "Smart, safe, and effective pest elimination for homes and businesses across Long Island.",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} - Long Island's Premier Pest Solutions`,
    description: "Smart, safe, and effective pest elimination for homes and businesses across Long Island.",
    images: [DEFAULT_OG_IMAGE],
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
    "name": SITE_NAME,
    "image": `${SITE_URL}/og-image.png`,
    "telephone": "(631) 203-1000",
    "url": SITE_URL,
    "areaServed": "Long Island, NY",
    "priceRange": "$$",
  };

  return (
    <html lang="en" data-theme="light" className={`${inter.variable} ${outfit.variable}`}>
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
        <ChatWidgetLoader />
        <Analytics />
      </body>
    </html>
  );
}
