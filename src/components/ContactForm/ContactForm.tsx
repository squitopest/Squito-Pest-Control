"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [type, setType] = useState<"residential" | "commercial">("residential");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    zip: "",
    message: "",
    service: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form.");
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden" id="contact">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          <div className="flex-1 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider uppercase mb-6">
              <Mail size={14} />
              Contact Us
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white tracking-tight">
              Get Your{" "}
              <span className="gradient-text">Free Inspection</span>
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-md">
              Fill out the form and a specialist will call you within the hour.
              Same-day service available.
            </p>

            <div className="flex flex-col gap-6 mb-12">
              <a href="tel:6312031000" className="group relative inline-flex items-center gap-4 w-fit px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 overflow-hidden transition-all duration-300 hover:border-green-500/50 hover:bg-green-500/10">
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-green-500/10 to-transparent group-hover:translate-x-full transition-transform duration-700" />
                <div className="relative z-10 w-10 h-10 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center group-hover:bg-green-500/20 transition-colors shrink-0">
                  <Phone size={18} className="text-green-500" />
                </div>
                <div className="relative z-10">
                  <div className="text-[10px] uppercase tracking-widest text-white/40 font-semibold mb-0.5">Call Us</div>
                  <div className="text-lg font-display font-bold text-white group-hover:text-green-400 transition-colors">(631) 203-1000</div>
                </div>
              </a>
              <a href="mailto:Service@getsquito.com" className="flex items-center gap-4 group w-fit">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-green-500/20 group-hover:border-green-500/50 transition-all">
                  <Mail size={20} className="text-green-500" />
             </div>
                <div>
                  <div className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-0.5">Email Us</div>
                  <div className="text-lg font-semibold text-white group-hover:text-green-400 transition-colors">Service@getsquito.com</div>
                </div>
             </a>
              <div className="flex items-center gap-4 w-fit">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <MapPin size={20} className="text-green-500" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-0.5">Service Area</div>
                 <div className="text-lg font-semibold text-white">Nassau & Suffolk County</div>
               </div>
             </div>
           </div>

           <div className="space-y-3">
             {["Free inspection — no obligation", "We call within the hour", "Same-day service available"].map((text, i) => (
                <div key={i} className="flex items-center gap-3 text-sm font-medium text-white/80">
                 <CheckCircle size={18} className="text-green-500 shrink-0" />
                 {text}
               </div>
               ))}
           </div>
         </div>

         <div className="flex-1 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
           <div className="glass-card rounded-3xl p-6 md:p-10 shadow-[0_20px_60px_rgba(34,197,94,0.1)] border-green-500/20">
             {submitted ? (
                <div className="text-center py-8 flex flex-col items-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle size={32} className="text-green-500" />
                 </div>
                 <h3 className="text-3xl font-display font-bold text-white mb-3">We'll be in touch shortly!</h3>
                 <p className="text-white/70 mb-6 max-w-sm mx-auto text-sm">
                   Thanks for reaching out. A Squito specialist will contact you within the hour to schedule your free inspection.
                 </p>
                 <a href="tel:6312031000" className="group relative inline-flex items-center gap-3 mb-8 px-7 py-4 rounded-2xl bg-green-500/10 border border-green-500/30 overflow-hidden transition-all duration-500 hover:border-green-500 hover:shadow-[0_0_25px_rgba(34,197,94,0.3)]">
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-green-500/20 to-transparent group-hover:translate-x-full transition-transform duration-700" />
                    <div className="relative z-10 w-9 h-9 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center group-hover:bg-green-500 transition-colors">
                      <Phone size={18} className="text-green-400 group-hover:text-white transition-colors" />
                    </div>
                    <div className="relative z-10 flex flex-col items-start">
                      <span className="text-[9px] uppercase tracking-widest text-green-500/70 font-semibold leading-none mb-0.5">Faster Service</span>
                      <span className="text-lg font-display font-bold text-white">(631) 203-1000</span>
                    </div>
                 </a>

                 {/* Success Video Section */}
                 <div className="w-full aspect-video rounded-xl overflow-hidden bg-black/40 border border-white/10 relative shadow-2xl">
                    <video 
                      autoPlay 
                      muted 
                      loop 
                      playsInline
                      className="w-full h-full object-cover absolute top-0 left-0 pointer-events-none"
                    >
                      <source src="/success_video.mp4" type="video/mp4" />
                      Your browser does not support HTML5 video.
                    </video>
                 </div>
               </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
                  <div className="flex p-1 bg-white/5 border border-white/10 rounded-xl mb-2">
                    <button
                      type="button"
                     className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all ${type === "residential" ? 'bg-green-500 text-white shadow-lg' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                      onClick={() => setType("residential")}
                    >
                      🏠 Residential
                   </button>
                    <button
                     type="button"
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all ${type === "commercial" ? 'bg-green-500 text-white shadow-lg' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                     onClick={() => setType("commercial")}
                   >
                     🏢 Commercial
                    </button>
                  </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                     <label htmlFor="firstName" className="text-sm font-semibold text-white/80 ml-1">First Name *</label>
                      <input
                        id="firstName"
                       type="text"
                        required
                        placeholder="John"
                        className="w-full bg-background/50 border border-border focus:border-green-500/50 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 outline-none transition-colors"
                        value={form.firstName}
                       onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                      />
                   </div>
                    <div className="space-y-2">
                     <label htmlFor="lastName" className="text-sm font-semibold text-white/80 ml-1">Last Name *</label>
                      <input
                       id="lastName"
                     type="text"
                        required
                       placeholder="Smith"
                        className="w-full bg-background/50 border border-border focus:border-green-500/50 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 outline-none transition-colors"
                       value={form.lastName}
                        onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                      />
                    </div>
                  </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-semibold text-white/80 ml-1">Email *</label>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="john@example.com"
                        className="w-full bg-background/50 border border-border focus:border-green-500/50 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 outline-none transition-colors"
                        value={form.email}
                       onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                     />
                    </div>
                   <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-semibold text-white/80 ml-1">Phone Number *</label>
                     <input
                       id="phone"
                       type="tel"
                        required
                       placeholder="(631) 555-0000"
                        className="w-full bg-background/50 border border-border focus:border-green-500/50 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 outline-none transition-colors"
                        value={form.phone}
                       onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                     />
                    </div>
                  </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label htmlFor="zip" className="text-sm font-semibold text-white/80 ml-1">ZIP Code *</label>
                      <input
                        id="zip"
                       type="text"
                       required
                       placeholder="11501"
                        maxLength={5}
                        className="w-full bg-background/50 border border-border focus:border-green-500/50 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 outline-none transition-colors"
                        value={form.zip}
                       onChange={e => setForm(f => ({ ...f, zip: e.target.value }))}
                      />
                    </div>
                   <div className="space-y-2">
                     <label htmlFor="service" className="text-sm font-semibold text-white/80 ml-1">Pest Problem</label>
                     <select
                        id="service"
                       className="w-full bg-background/50 border border-border focus:border-green-500/50 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 outline-none transition-colors appearance-none cursor-pointer"
                        value={form.service}
                        onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                     >
                        <option value="" disabled className="text-black">Select a service</option>
                       <option className="text-black">Mosquito & Tick Control</option>
                        <option className="text-black">Termite Defense</option>
                       <option className="text-black">Rodent Removal</option>
                       <option className="text-black">Bed Bug Treatment</option>
                       <option className="text-black">General Pest Control</option>
                        <option className="text-black">Commercial Services</option>
                       <option className="text-black">Other</option>
                      </select>
                   </div>
                 </div>

                 <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-semibold text-white/80 ml-1">Tell Us More</label>
                   <textarea
                     id="message"
                     rows={3}
                     placeholder="Describe your pest issue..."
                      className="w-full bg-background/50 border border-border focus:border-green-500/50 rounded-xl px-4 py-3.5 text-white placeholder:text-white/30 outline-none transition-colors resize-none"
                     value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    />
                 </div>

                 <button
                   type="submit"
                   className="group relative w-full mt-2 overflow-hidden rounded-2xl p-[1px] focus:outline-none focus:ring-2 focus:ring-green-500/50"
                 >
                   {/* Animated rotating gradient border */}
                   <span
                     className="absolute inset-0 rounded-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                     style={{
                       background: "conic-gradient(from var(--angle, 0deg), #22c55e, #16a34a, #15803d, #4ade80, #22c55e)",
                       animation: "spin-border 3s linear infinite",
                     }}
                   />
                   {/* Glass fill */}
                   <span className="relative flex items-center justify-center gap-3 w-full px-8 py-4 rounded-2xl bg-background/80 backdrop-blur-xl font-display font-bold text-lg transition-all duration-500 group-hover:bg-green-500/10">
                     {/* Inner shimmer sweep */}
                     <span className="absolute inset-0 rounded-2xl -translate-x-full bg-gradient-to-r from-transparent via-green-400/20 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                     {/* Glow blob */}
                     <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: "inset 0 0 30px rgba(34,197,94,0.15), 0 0 40px rgba(34,197,94,0.25)" }} />
                     <span className="relative z-10 w-8 h-8 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center group-hover:bg-green-500 group-hover:border-green-400 transition-all duration-300 shrink-0">
                       <Send size={15} className="text-green-400 group-hover:text-white transition-colors" />
                     </span>
                     <span className="relative z-10 flex flex-col items-start leading-none text-left">
                       <span className="text-[9px] uppercase tracking-widest text-green-400/70 font-semibold mb-0.5">100% Free</span>
                       <span className="text-lg font-display font-bold text-white tracking-wide">
                         {loading ? "Sending..." : "Request Free Inspection"}
                       </span>
                     </span>
                   </span>
                   <style>{`
                     @property --angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
                     @keyframes spin-border { to { --angle: 360deg; } }
                   `}</style>
                 </button>
                 
                 {error && (
                   <p className="text-sm font-semibold text-red-400 text-center mt-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-xl">
                     {error}
                   </p>
                 )}

                 <p className="text-xs text-center text-white/40 max-w-sm mx-auto leading-relaxed">
                   By submitting, you agree to be contacted by Squito. We never share your data.
                 </p>
               </form>
             )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
