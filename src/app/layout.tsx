import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor/CustomCursor";
import Navbar from "@/components/Navbar/Navbar";
import ChatWidget from "@/components/ChatWidget/ChatWidget";
import StickyCallBar from "@/components/StickyCallBar/StickyCallBar";

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
  title: "Squito AI | Smart Pest Control in Long Island, NY",
  description:
    "Long Island's premier pest control company. Smart, safe, and effective pest elimination for homes and businesses. No contracts. Same-day service. 100% satisfaction guaranteed.",
  keywords:
    "pest control Long Island, exterminator Nassau County, exterminator Suffolk County, mosquito control, termite control, rodent removal, bed bug treatment",
  openGraph: {
    title: "Squito AI | Smart Pest Control in Long Island, NY",
    description:
      "Smart, safe, and effective pest elimination for homes and businesses across Long Island.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        <CustomCursor />
        <Navbar />
        {children}
        <StickyCallBar />
        <ChatWidget />
      </body>
    </html>
  );
}
