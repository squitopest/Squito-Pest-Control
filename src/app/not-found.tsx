import Link from "next/link";
import { Bug, Home, Phone } from "lucide-react";

export const metadata = {
  title: "Page Not Found | Squito Pest Control",
  description: "This page doesn't exist. Let us help you find what you're looking for.",
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden px-4">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center animate-fade-in-up max-w-lg mx-auto">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
          <Bug size={36} className="text-green-400" />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider uppercase mb-6">
          Error 404
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-4 tracking-tight">
          Page Not <span className="gradient-text">Found</span>
        </h1>

        <p className="text-lg text-white/60 leading-relaxed mb-10">
          Looks like this page got exterminated. Don't worry — our team is still here to help.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-400 text-white font-bold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-background"
          >
            <Home size={18} />
            Back to Home
          </Link>
          <a
            href="tel:6312031000"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-background"
          >
            <Phone size={18} />
            Call Us
          </a>
        </div>
      </div>
    </main>
  );
}
