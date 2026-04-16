"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error so you can see it in Vercel logs
    console.error("Page error:", error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden px-4">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center animate-fade-in-up max-w-lg mx-auto">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
          <AlertTriangle size={36} className="text-red-400" />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider uppercase mb-6">
          Something went wrong
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-4 tracking-tight">
          Unexpected <span className="text-red-400">Error</span>
        </h1>

        <p className="text-lg text-white/60 leading-relaxed mb-10">
          Something went wrong on our end. You can try again or head back to the home page.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-400 text-white font-bold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-background"
          >
            <RotateCcw size={18} />
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-background"
          >
            <Home size={18} />
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
