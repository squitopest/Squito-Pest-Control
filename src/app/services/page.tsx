import { ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Services | Squito Pest Control",
  description: "Comprehensive pest control services for residential and commercial properties across Long Island.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 relative overflow-hidden bg-background">
      <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider uppercase mb-6">
            <ShieldCheck size={14} />
            Our Services
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">
            Comprehensive <br/>
            <span className="gradient-text">Pest Protection</span>
          </h1>
          <p className="text-xl text-white/70 leading-relaxed">
            From seasonal mosquito barriers to critical structural termite defense, we provide Long Island with intelligent, safe, and guaranteed pest management.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <Link href="/residential" className="group glass-card p-10 rounded-3xl border border-border hover:border-green-500/50 transition-all flex flex-col h-full relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mb-8 border border-green-500/20 group-hover:bg-green-500 group-hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all">
                <span className="text-2xl filter group-hover:brightness-0 group-hover:invert transition-all">🏠</span>
             </div>
             <h2 className="text-3xl font-display font-bold text-white mb-4">Residential</h2>
             <p className="text-white/70 mb-8 flex-grow text-lg">
                Protect your home and family with our pet-friendly, guaranteed residential treatment plans. Let us handle the pests so you can enjoy your peace of mind.
             </p>
             <div className="inline-flex items-center gap-2 text-green-400 font-semibold group-hover:translate-x-2 transition-transform">
                Explore Residential <ArrowRight size={18} />
             </div>
          </Link>
          
          <Link href="/commercial" className="group glass-card p-10 rounded-3xl border border-border hover:border-green-500/50 transition-all flex flex-col h-full relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center mb-8 border border-green-500/20 group-hover:bg-green-500 group-hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all">
                <span className="text-2xl filter group-hover:brightness-0 group-hover:invert transition-all">🏢</span>
             </div>
             <h2 className="text-3xl font-display font-bold text-white mb-4">Commercial</h2>
             <p className="text-white/70 mb-8 flex-grow text-lg">
                Discreet, audit-ready commercial pest management designed to protect your brand, employees, and bottom line.
             </p>
             <div className="inline-flex items-center gap-2 text-green-400 font-semibold group-hover:translate-x-2 transition-transform">
                Explore Commercial <ArrowRight size={18} />
             </div>
          </Link>
        </div>

        <div className="text-center">
           <Link href="/book" className="btn-primary inline-flex text-lg px-8 py-4">
              Get Your Free Inspection
           </Link>
        </div>
      </div>
    </main>
  );
}
