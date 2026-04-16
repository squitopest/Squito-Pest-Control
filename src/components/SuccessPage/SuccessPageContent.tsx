"use client";

import { Suspense, useEffect, useState } from "react";
import { CheckCircle2, ShieldCheck, Clock, MapPin, Truck, Check, AlertTriangle } from "lucide-react";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type VerificationState = "loading" | "verified" | "unverified";

function SuccessContent() {
  const [status, setStatus] = useState<VerificationState>("loading");
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    let active = true;

    async function verifySession() {
      if (!sessionId) {
        if (active) setStatus("unverified");
        return;
      }

      try {
        const response = await fetch(`/api/checkout/session?session_id=${encodeURIComponent(sessionId)}`, {
          cache: "no-store",
        });
        const data = await response.json();

        if (!active) return;
        setStatus(response.ok && data.verified ? "verified" : "unverified");
      } catch {
        if (active) setStatus("unverified");
      }
    }

    verifySession();

    return () => {
      active = false;
    };
  }, [sessionId]);

  if (status === "loading") {
    return (
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl flex-grow pt-40 pb-24 relative z-10">
        <div className="glass-card rounded-[2rem] p-8 md:p-16 border-white/10 text-center">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent flex items-center justify-center animate-spin rounded-full mx-auto mb-6"></div>
          <h1 className="text-3xl font-display font-bold text-white mb-3">Verifying your checkout</h1>
          <p className="text-white/60">We’re confirming your Stripe session now.</p>
        </div>
      </div>
    );
  }

  if (status === "unverified") {
    return (
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl flex-grow pt-40 pb-24 relative z-10">
        <div className="glass-card rounded-[2rem] p-8 md:p-16 border-amber-500/20 text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6">
            <AlertTriangle size={36} className="text-amber-400" />
          </div>
          <h1 className="text-4xl font-display font-bold text-white mb-4">We couldn&apos;t verify this payment yet</h1>
          <p className="text-white/60 max-w-xl mx-auto mb-8">
            If you just checked out, give it a moment and refresh this page. If anything looks off, call us and we&apos;ll confirm your booking manually.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:6312031000"
              className="inline-flex items-center justify-center px-8 py-4 rounded-2xl font-bold text-white bg-green-500 hover:bg-green-600 transition-colors"
            >
              Call (631) 203-1000
            </a>
            <Link
              href="/book"
              className="inline-flex items-center justify-center px-8 py-4 rounded-2xl font-bold text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              Back to Booking
            </Link>
          </div>
          {sessionId && (
            <p className="mt-8 text-xs text-white/30 font-mono break-all">Receipt ID: {sessionId}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 max-w-4xl flex-grow pt-40 pb-24 relative z-10">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-2xl aspect-square bg-green-500/20 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="glass-card rounded-[2rem] p-8 md:p-16 border-green-500/30 relative overflow-hidden text-center backdrop-blur-xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-green-500/20 rounded-full animate-[ping_3s_ease-out_infinite]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-green-500/10 rounded-full animate-[ping_4s_ease-out_infinite_animation-delay-500ms]" />

        <div className="relative z-20 w-24 h-24 mx-auto bg-gradient-to-tr from-green-600 to-green-400 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(34,197,94,0.4)] mb-8 transform transition-transform hover:scale-110 duration-500">
          <CheckCircle2 size={48} className="text-white" />
        </div>

        <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">
          Payment <span className="gradient-text">Successful!</span>
        </h1>

        <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] animate-[pulse_3s_ease-in-out_infinite]">
          Welcome to the family! We look forward to keeping you pest-free.
        </h2>

        <div className="w-full max-w-2xl mx-auto aspect-video rounded-xl overflow-hidden bg-black/40 border border-white/10 relative shadow-2xl mt-8 mb-12">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover absolute top-0 left-0 pointer-events-none"
          >
            <source src="/success_video.mp4" type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
        </div>

        <div className="mt-6 text-left bg-background/50 border border-white/5 rounded-3xl p-8 mb-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-green-400/50 via-green-500/20 to-transparent ml-12" />

          <div className="space-y-10 relative z-10">
            <div className="flex gap-6 items-start">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(34,197,94,0.5)]">
                <Check size={16} className="text-white font-bold" />
              </div>
              <div className="-mt-1.5">
                <h3 className="text-lg font-bold text-white">Order Confirmed</h3>
                <p className="text-white/60 text-sm mt-1">Your payment has been securely processed by Stripe.</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(34,197,94,0.5)]">
                <Clock size={14} className="text-white font-bold" />
              </div>
              <div className="-mt-1.5">
                <h3 className="text-lg font-bold text-white">Dispatch</h3>
                <p className="text-white/60 text-sm mt-1">Our dispatcher is currently assigning a specialized technician to your requested date/time slot and will call you within the hour to confirm!</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(34,197,94,0.5)]">
                <Truck size={14} className="text-white font-bold" />
              </div>
              <div className="-mt-1.5">
                <h3 className="text-lg font-bold text-white/80">Arrival</h3>
                <p className="text-white/50 text-sm mt-1">A licensed technician will arrive at the scheduled time to assess your property and thoroughly review the next steps with you.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-16">
          <div className="flex items-center gap-3 text-white/60">
            <ShieldCheck className="text-green-400" size={24} />
            <span className="font-semibold tracking-wide text-sm">100% Guaranteed</span>
          </div>
          <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-white/20" />
          <div className="flex items-center gap-3 text-white/60">
            <MapPin className="text-green-400" size={24} />
            <span className="font-semibold tracking-wide text-sm">Locally Operated</span>
          </div>
        </div>

        <Link
          href="/#reviews"
          className="inline-flex items-center justify-center px-12 py-5 rounded-2xl font-bold text-lg text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-green-500/50 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(34,197,94,0.2)]"
        >
          Return to Dashboard
        </Link>

        {sessionId && (
          <p className="mt-8 text-xs text-white/30 font-mono break-all">Receipt ID: {sessionId}</p>
        )}
      </div>
    </div>
  );
}

export default function SuccessPageContent() {
  return (
    <main className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none mix-blend-overlay z-10"></div>

      <Suspense
        fallback={
          <div className="flex-1 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-green-500 border-t-transparent flex items-center justify-center animate-spin rounded-full"></div>
          </div>
        }
      >
        <SuccessContent />
      </Suspense>
      <Footer />
    </main>
  );
}
