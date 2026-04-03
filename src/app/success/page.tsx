"use client";

import { Suspense, useEffect, useState } from "react";
import { CheckCircle2, ShieldCheck, Clock, MapPin, Truck, Check } from "lucide-react";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function SuccessContent() {
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="container mx-auto px-4 lg:px-8 max-w-4xl flex-grow pt-40 pb-24 relative z-10">
      
      {/* Glow Effect Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-2xl aspect-square bg-green-500/20 blur-[150px] rounded-full pointer-events-none -z-10" />

      {/* Main Success Card */}
      <div className="glass-card rounded-[2rem] p-8 md:p-16 border-green-500/30 relative overflow-hidden text-center backdrop-blur-xl">
        
        {/* Animated Rings */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-green-500/20 rounded-full animate-[ping_3s_ease-out_infinite]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-green-500/10 rounded-full animate-[ping_4s_ease-out_infinite_animation-delay-500ms]" />

        {/* Central Icon */}
        <div className="relative z-20 w-24 h-24 mx-auto bg-gradient-to-tr from-green-600 to-green-400 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(34,197,94,0.4)] mb-8 transform transition-transform hover:scale-110 duration-500">
           <CheckCircle2 size={48} className="text-white" />
        </div>

        <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">
          Payment <span className="gradient-text">Successful!</span>
        </h1>
        
        <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-12">
          Welcome to the family. Your protective shield has officially been activated. Our dispatch center has securely received your encrypted billing details and scheduled your appointment.
        </p>

        {/* Next Steps Timeline */}
        <div className="mt-12 text-left bg-background/50 border border-white/5 rounded-3xl p-8 mb-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-green-400/50 via-green-500/20 to-transparent ml-12" />
          
          <h2 className="text-2xl font-bold text-white mb-8 ml-4">What happens next?</h2>

          <div className="space-y-10 relative z-10">
            {/* Step 1 */}
            <div className="flex gap-6 items-start">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(34,197,94,0.5)]">
                <Check size={16} className="text-white font-bold" />
              </div>
              <div className="-mt-1.5">
                <h3 className="text-lg font-bold text-white">Order Confirmed</h3>
                <p className="text-white/60 text-sm mt-1">Your $1.00 USD transaction has been securely processed by Stripe.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-6 items-start">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center flex-shrink-0">
                <Clock size={14} className="text-blue-400" />
              </div>
              <div className="-mt-1.5">
                <h3 className="text-lg font-bold text-white">Dispatch Alignment</h3>
                <p className="text-white/60 text-sm mt-1">A Squito dispatch manager is currently assigning a specialized technician to your requested date/time slot.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-6 items-start">
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/20 flex items-center justify-center flex-shrink-0">
                <Truck size={14} className="text-white/60" />
              </div>
              <div className="-mt-1.5">
                <h3 className="text-lg font-bold text-white/80">Arrival & Shielding</h3>
                <p className="text-white/50 text-sm mt-1">We arrive at your property, perform the entire inspection, and deploy your defensive treatments.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Guarantees */}
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

        {/* Action Button */}
        <Link 
          href="/"
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

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Decorative noise/gradient overlay identical to landing pages */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none mix-blend-overlay z-10"></div>
      
      <Suspense fallback={
        <div className="flex-1 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent flex items-center justify-center animate-spin rounded-full"></div>
        </div>
      }>
        <SuccessContent />
      </Suspense>
      <Footer />
    </main>
  );
}
