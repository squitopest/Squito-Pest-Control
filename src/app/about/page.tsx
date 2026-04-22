import { Info, ArrowRight, Shield, Clock, Leaf, Award, MapPin, CheckCircle, Phone } from "lucide-react";
import Link from "next/link";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "About Us | Squito Pest Control",
  description: "Learn about the team behind Squito Pest Control, Long Island's premier modern pest control service.",
  path: "/about",
});

const stats = [
  { value: "6+", label: "Years on Long Island" },
  { value: "1,200+", label: "Homes Protected" },
  { value: "100%", label: "Satisfaction Guarantee" },
  { value: "4.9★", label: "Average Rating" },
];

const values = [
  {
    icon: Leaf,
    title: "Pet & Family Safe",
    description: "We use organic, pet-friendly compounds that target pests where they live — not your living room. Safe for kids and pets within 30 minutes of treatment.",
  },
  {
    icon: Clock,
    title: "Same-Day Response",
    description: "Call before noon and we'll be there today. No automated phone trees — you reach a real local technician who knows your neighborhood.",
  },
  {
    icon: Shield,
    title: "Guaranteed Results",
    description: "If pests return between treatments, so do we — at no extra charge. We stand behind every job until the problem is fully resolved.",
  },
  {
    icon: MapPin,
    title: "Born on Long Island",
    description: "Every technician lives and works here. We know when mosquito pressure peaks in Nassau, when termites swarm in Suffolk, and which ZIP codes have the worst tick pressure.",
  },
];

const certifications = [
  "Licensed & Insured",
  "BBB Accredited",
  "NPMA Member",
  "Pet-Safe Products",
];

const serviceAreas = [
  "Nassau County", "Suffolk County", "Islandia", "Hauppauge",
  "Smithtown", "Commack", "Babylon", "Huntington",
  "Brentwood", "Central Islip", "Bay Shore", "Patchogue",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 relative overflow-hidden bg-background">
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-green-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10 space-y-28">

        {/* Hero */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider uppercase mb-6">
              <Info size={14} />
              About Us
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">
              Built Here.<br /><span className="gradient-text">For Here.</span>
            </h1>
            <div className="space-y-5 text-lg text-white/70 leading-relaxed">
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

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in-up">
          {stats.map((stat) => (
            <div key={stat.label} className="glass-card rounded-2xl p-6 border border-border text-center">
              <div className="text-4xl font-display font-bold text-green-400 mb-2">{stat.value}</div>
              <div className="text-sm text-white/60 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="animate-fade-in-up">
          <div className="flex flex-wrap justify-center gap-4">
            {certifications.map((cert) => (
              <div key={cert} className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-semibold">
                <Award size={14} />
                {cert}
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="animate-fade-in-up">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-white mb-4">
              Why <span className="gradient-text">Squito?</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              We built Squito to fix everything we hated about big-box pest control companies.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="glass-card rounded-2xl p-6 border border-border hover:border-green-500/40 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-5">
                  <v.icon size={22} className="text-green-400" />
                </div>
                <h3 className="text-lg font-display font-bold text-white mb-3">{v.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Service Area */}
        <div className="glass-card rounded-3xl border border-border p-10 md:p-14 animate-fade-in-up">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider uppercase mb-6">
                <MapPin size={14} />
                Service Area
              </div>
              <h2 className="text-4xl font-display font-bold text-white mb-4">
                Proudly Serving <span className="gradient-text">All of Long Island</span>
              </h2>
              <p className="text-white/60 text-lg mb-8 leading-relaxed">
                From the North Shore to the South Shore, Nassau to the Hamptons — if you're on Long Island, we've got you covered. Same-day service available across Nassau and Suffolk County.
              </p>
              <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
                Check Your Area <ArrowRight size={18} />
              </Link>
            </div>
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {serviceAreas.map((area) => (
                  <div key={area} className="flex items-center gap-2 text-sm text-white/70 font-medium">
                    <CheckCircle size={14} className="text-green-500 shrink-0" />
                    {area}
                  </div>
                ))}
              </div>
              <p className="text-xs text-white/40 mt-5">And all surrounding Long Island communities.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center animate-fade-in-up">
          <h2 className="text-4xl font-display font-bold text-white mb-4">
            Ready to get <span className="gradient-text">pest-free?</span>
          </h2>
          <p className="text-white/60 text-lg mb-8">Free inspection. No contracts. Same-day available.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4">
              Get Free Inspection <ArrowRight size={18} />
            </Link>
            <a href="tel:6312031000" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/20 text-white font-semibold text-lg hover:border-green-500/50 hover:bg-green-500/10 transition-all">
              <Phone size={18} className="text-green-400" />
              (631) 203-1000
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}
