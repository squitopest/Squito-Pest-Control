import { Info } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "About Us | Squito Pest Control",
  description: "Learn about the team behind Squito Pest Control, Long Island's premier modern pest control service.",
};

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
                Modern Defense for <span className="gradient-text">Long Island</span>
              </h1>
              <div className="space-y-6 text-lg text-white/70 leading-relaxed">
                 <p>
                    Squito Pest Control was built on a simple premise: pest control doesn't have to be opaque, dangerous, or outdated. We set out to modernize the industry for Long Island homeowners and businesses.
                 </p>
                 <p>
                    By leveraging cutting-edge, eco-friendly treatment protocols, transparent pricing, and industry-leading customer service, we eliminate the stress of pest management. We treat your property with the exact same care we treat our own.
                 </p>
                 <p>
                    Our technicians are certified, insured, and deeply familiar with the unique ecosystem of Nassau and Suffolk counties. Whether it's the intense summer mosquito seasons or the winter rodent migrations, we have the specialized expertise to stop bugs at the source.
                 </p>
              </div>
              
              <div className="mt-10">
                 <Link href="/book" className="btn-primary">
                    Join the Squito Family
                 </Link>
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
