import { Info, ArrowRight } from "lucide-react";
import Link from "next/link";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "About Us | Squito Pest Control",
  description: "Learn about the team behind Squito Pest Control, Long Island's premier modern pest control service.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 relative overflow-hidden bg-background">
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
           <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider uppercase mb-6">
                <Info size={14} />
                About Us
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">
                Built Here.<br /><span className="gradient-text">For Here.</span>
              </h1>
              <div className="space-y-6 text-lg text-white/70 leading-relaxed">
                 <p>
                    Squito was started by someone who grew up on Long Island, works on Long Island, and knows exactly what pests show up — and when. With over 6 years of hands-on field experience, I started Squito because I believed homeowners deserved better than long wait times, vague pricing, and technicians who've never seen your neighborhood.
                 </p>
                 <p>
                    We're not a franchise. We don't send a different person every visit. When you call Squito, you get a local expert who knows how ant pressure spikes in Nassau every April, how termite season hits Suffolk hard in the spring, and where mosquitoes breed in your specific zip code.
                 </p>
                 <p>
                    Every treatment is tailored to your property and the season you're in. We use products that are safe for your family and pets — and we don't leave until the job is done right.
                 </p>
              </div>
              
              <div className="mt-10">
                 <Link href="/plans" className="group relative overflow-hidden rounded-2xl p-[1px] focus:outline-none inline-block">
                   <span
                     className="absolute inset-0 rounded-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                     style={{
                       background: "conic-gradient(from var(--angle, 0deg), #22c55e, #16a34a, #15803d, #4ade80, #22c55e)",
                       animation: "spin-border 3s linear infinite",
                     }}
                   />
                   <span className="relative flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-surface/90 backdrop-blur-xl font-bold text-lg text-white transition-all duration-300 group-hover:bg-green-500/10">
                     Join the Squito Family <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                   </span>
                 </Link>
                 <style>{`
                   @property --angle { syntax: '<angle>'; initial-value: 0deg; inherits: false; }
                   @keyframes spin-border { to { --angle: 360deg; } }
                 `}</style>
              </div>
           </div>

           <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="relative w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden glass-card shadow-2xl border border-white/10">
                 <img 
                    src="/about-us-action.jpg" 
                    alt="Squito Pest Control Technician" 
                    className="w-full h-full object-cover object-center"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
              </div>
           </div>
        </div>
      </div>
    </main>
  );
}
