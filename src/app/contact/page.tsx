import { Suspense } from "react";
import { Mail } from "lucide-react";
import ContactForm from "@/components/ContactForm/ContactForm";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Contact Us | Squito Pest Control",
  description: "Get in touch with Squito Pest Control for same-day pest control service on Long Island.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-32 pb-12 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10 text-center animate-fade-in-up">
        <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider uppercase mb-6">
          <Mail size={14} />
          Contact Support
        </div>
        <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">
          We're Here to <span className="gradient-text">Help</span>
        </h1>
        <p className="text-xl text-white/70 leading-relaxed max-w-2xl mx-auto mb-12">
          From general inquiries to emergency infestations, our local team is available to assist you. Fill out the form below or call us directly.
        </p>
      </div>
      
      {/* Reusing the ContactForm component natively */}
      <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        <Suspense fallback={<div className="py-16 text-center text-white/50">Loading contact form...</div>}>
          <ContactForm />
        </Suspense>
      </div>
    </main>
  );
}
