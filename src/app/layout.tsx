import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Navbar from "@/components/Navbar/Navbar";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import MetaPixel from "@/components/MetaPixel/MetaPixel";
import Footer from "@/components/Footer/Footer";
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
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

/**
 * Viewport configuration — exported separately per Next.js 16 convention.
 * `viewportFit: "cover"` enables edge-to-edge rendering on notched iPhones
 * (iPhone X+, Dynamic Island). Without it, the browser inserts black bars
 * around the safe area and `env(safe-area-inset-*)` returns 0.
 * `themeColor` tints Safari's address bar to match the page.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#ece3d2" },
  ],
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
        <link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />
        <link rel="preconnect" href="https://www.youtube-nocookie.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <Navbar />
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <Footer />
        <Analytics />
        <MetaPixel />
      </body>
    </html>
  );
}
