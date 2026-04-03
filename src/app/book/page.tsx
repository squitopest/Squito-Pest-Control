"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ShieldCheck, Calendar, ArrowRight, CheckCircle, CreditCard, Loader2 } from "lucide-react";
import Link from "next/link";

function WizardContent() {
  const searchParams = useSearchParams();
  const simulateSuccess = searchParams.get("simulateSuccess");
  const sessionId = searchParams.get("session_id");
  const isSetupSuccess = simulateSuccess === "true" || !!sessionId;

  const [step, setStep] = useState(isSetupSuccess ? 4 : 1);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  const [formData, setFormData] = useState({
     propertyType: "",
     pestType: "",
     zipCode: "",
     date: "",
     email: "",
  });

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleCheckout = async () => {
     setLoading(true);
     setErrorMsg("");
     
     try {
       const res = await fetch("/api/checkout", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(formData),
       });
       
       const data = await res.json();
       
       if (!data.success) {
         throw new Error(data.message || data.error || "Failed to initiate checkout");
       }
       
       if (data.checkoutUrl) {
         // Redirect to Stripe or the simulated mock page
         window.location.href = data.checkoutUrl;
       }
     } catch (err: any) {
       console.error("Checkout fail:", err);
       setErrorMsg(err.message || "Something went wrong.");
       setLoading(false);
     }
  };

  return (
    <div className="container mx-auto px-4 max-w-3xl relative z-10">
      
      {/* Progress Bar (hide on final success screen) */}
      {step < 4 && (
        <div className="mb-12 flex items-center justify-between relative">
           <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 w-full bg-surface rounded-full z-0" />
           <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-green-500 rounded-full z-0 transition-all duration-500"
              style={{ width: `${((step - 1) / 2) * 100}%` }}
           />
           {[1, 2, 3].map((num) => (
             <div 
               key={num} 
               className={`w-10 h-10 rounded-full flex items-center justify-center font-bold relative z-10 transition-colors duration-500 ${
                 step >= num ? "bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)] ring-4 ring-background" : "bg-surface text-white/40 ring-4 ring-background"
               }`}
             >
               {step > num ? <CheckCircle size={20} /> : num}
             </div>
           ))}
        </div>
      )}

      <div className="glass-card rounded-3xl border border-border p-6 md:p-12 shadow-2xl relative overflow-hidden min-h-[400px]">
         {/* Step 1: Info */}
         {step === 1 && (
           <div className="animate-fade-in-up">
              <h2 className="text-3xl font-display font-bold text-white mb-2">Let's get you protected.</h2>
              <p className="text-white/60 mb-8">What type of property needs service?</p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                 <button 
                   className={`p-6 rounded-2xl border text-center transition-all ${formData.propertyType === 'residential' ? 'border-green-500 bg-green-500/10' : 'border-white/10 hover:border-white/30 bg-background/50'}`}
                   onClick={() => setFormData({...formData, propertyType: 'residential'})}
                 >
                    <span className="text-4xl block mb-2">🏠</span>
                    <span className="font-semibold text-white">Residential</span>
                 </button>
                 <button 
                   className={`p-6 rounded-2xl border text-center transition-all ${formData.propertyType === 'commercial' ? 'border-green-500 bg-green-500/10' : 'border-white/10 hover:border-white/30 bg-background/50'}`}
                   onClick={() => setFormData({...formData, propertyType: 'commercial'})}
                 >
                    <span className="text-4xl block mb-2">🏢</span>
                    <span className="font-semibold text-white">Commercial</span>
                 </button>
              </div>

              <div className="space-y-4 mb-10">
                 <div>
                    <label className="text-sm font-semibold text-white/80 ml-1">ZIP Code</label>
                    <input 
                       type="text" 
                       className="w-full bg-background border border-border focus:border-green-500/50 rounded-xl px-4 py-3 mt-1 text-white outline-none"
                       placeholder="11501"
                       value={formData.zipCode}
                       onChange={e => setFormData({...formData, zipCode: e.target.value})}
                    />
                 </div>
              </div>

              <button 
                 className="btn-primary w-full justify-center disabled:opacity-50"
                 disabled={!formData.propertyType || formData.zipCode.length < 5}
                 onClick={nextStep}
              >
                 Continue to Details <ArrowRight size={18} />
              </button>
           </div>
         )}

         {/* Step 2: Scheduling */}
         {step === 2 && (
           <div className="animate-fade-in-up">
              <h2 className="text-3xl font-display font-bold text-white mb-2">Schedule your service.</h2>
              <p className="text-white/60 mb-8">Select a priority date.</p>

              <div className="bg-background/50 border border-border rounded-2xl p-6 mb-8 text-center">
                 <Calendar size={32} className="text-green-500 mx-auto mb-4 opacity-50" />
                 
                 <div className="flex gap-2 justify-center flex-wrap">
                    {["ASAP (Today)", "Tomorrow", "In 2 Days", "Next Week"].map((date, i) => (
                       <button 
                          key={i}
                          className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${formData.date === date ? 'border-green-500 bg-green-500/20 text-white' : 'border-border text-white/60 hover:text-white hover:bg-white/5'}`}
                          onClick={() => setFormData({...formData, date})}
                       >
                          {date}
                       </button>
                    ))}
                 </div>
              </div>

              <div className="flex gap-4 mt-auto">
                 <button className="px-6 py-4 rounded-xl border border-border text-white/80 hover:text-white font-bold text-sm tracking-wide uppercase transition-colors" onClick={prevStep}>
                    Back
                 </button>
                 <button 
                    className="btn-primary flex-1 justify-center disabled:opacity-50"
                    disabled={!formData.date}
                    onClick={nextStep}
                 >
                    Next Step <ArrowRight size={18} />
                 </button>
              </div>
           </div>
         )}

         {/* Step 3: Checkout Stripe integration */}
         {step === 3 && (
           <div className="animate-fade-in-up">
              <h2 className="text-3xl font-display font-bold text-white mb-2">Secure your booking.</h2>
              <p className="text-white/60 mb-6">Authorize your preliminary inspection fee.</p>

              <div className="bg-background/80 border border-green-500/20 rounded-2xl p-6 mb-6">
                 <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/10">
                    <span className="text-white/80">Service Call (Basic Inspection)</span>
                    <span className="text-white font-bold">$49.00</span>
                 </div>
                 <div className="flex justify-between items-center text-lg">
                    <span className="text-white font-semibold">Total Due Today</span>
                    <span className="text-green-400 font-bold">$49.00</span>
                 </div>
              </div>

              <div className="bg-surface border border-border rounded-2xl p-6 text-center mb-8 flex flex-col items-center justify-center">
                 <CreditCard size={32} className="text-white/40 mb-3" />
                 <p className="text-white/60 text-sm">You will be securely redirected to Stripe to complete your $49 inspection fee.</p>
              </div>
              
              {errorMsg && (
                 <div className="text-red-400 text-sm text-center mb-4 bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                   {errorMsg}
                 </div>
              )}

              <div className="flex gap-4">
                 <button className="px-6 py-4 rounded-xl border border-border text-white/80 hover:text-white font-bold text-sm tracking-wide uppercase transition-colors" onClick={prevStep} disabled={loading}>
                    Back
                 </button>
                 <button 
                    className="btn-primary flex-1 justify-center shadow-[0_0_20px_rgba(34,197,94,0.3)] disabled:opacity-50"
                    onClick={handleCheckout}
                    disabled={loading}
                 >
                    {loading ? (
                       <Loader2 className="animate-spin text-white w-6 h-6" />
                    ) : (
                       <span className="flex items-center gap-2"><ShieldCheck size={18} /> Proceed to Stripe</span>
                    )}
                 </button>
              </div>
           </div>
         )}

         {/* Step 4: Success Details */}
         {step === 4 && (
           <div className="animate-fade-in-up text-center py-8">
              <div className="w-24 h-24 bg-green-500/20 border border-green-500/50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                 <CheckCircle size={48} />
              </div>
              <h2 className="text-4xl font-display font-bold text-white mb-4">Confirmed!</h2>
              <p className="text-white/70 text-lg mb-8 max-w-sm mx-auto">
                 Your inspection has been successfully booked. You'll receive an email confirmation shortly detailing your technician's ETA.
              </p>
              <div className="p-4 bg-surface rounded-xl border border-border mb-8 text-sm text-white/50 text-left">
                <strong>Debug Info:</strong> {simulateSuccess ? "MOCK Mode Success" : `Stripe Session ID: ${sessionId}`}
              </div>
              <div className="flex justify-center gap-4">
                 <Link href="/" className="btn-primary">
                    Return to Home
                 </Link>
              </div>
           </div>
         )}

      </div>
    </div>
  );
}

export default function BookingPage() {
   return (
      <main className="min-h-screen pt-32 pb-24 relative overflow-hidden bg-background">
         <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none" />
         <Suspense fallback={
            <div className="flex h-64 items-center justify-center relative z-10">
              <Loader2 className="w-8 h-8 animate-spin text-green-500" />
            </div>
         }>
            <WizardContent />
         </Suspense>
      </main>
   );
}
