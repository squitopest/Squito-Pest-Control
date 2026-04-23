import Link from "next/link";
import { ArrowRight, HelpCircle, ShieldCheck, Sparkles } from "lucide-react";
import { createPageMetadata } from "@/lib/site";
import {
  buildSpecialtyHelpHref,
  getBookableSpecialtyServices,
  getSpecialtyDisplayPrice,
  isPremiumSpecialtyService,
  SPECIALTY_CATEGORY_LABELS,
  type SpecialtyCategory,
} from "@/data/specialtyServices";

export const metadata = createPageMetadata({
  title: "Specialty Pest Control Services on Long Island | Squito Pest Control",
  description:
    "Browse specialty pest control services across Long Island, including bed bug treatments, flea control, event mosquito sprays, termite services, bait stations, and more.",
  path: "/services/specialty",
});

const categories: SpecialtyCategory[] = ["interior", "outdoor", "termite"];

export default function SpecialtyServicesPage() {
  const services = getBookableSpecialtyServices();

  return (
    <main className="min-h-screen pt-32 pb-24 relative overflow-hidden bg-background">
      <div className="absolute top-0 right-0 h-[620px] w-[820px] rounded-full bg-green-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-[480px] w-[520px] rounded-full bg-green-500/5 blur-[110px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-green-400 mb-6">
            <ShieldCheck size={14} />
            Specialty Services
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-bold text-white tracking-tight mb-6">
            One-Time Services for<br />
            <span className="gradient-text">Specialty Pest Problems</span>
          </h1>
          <p className="text-xl text-white/65 leading-relaxed">
            Clear pricing, focused treatment options, and a booking flow that feels simple from the first click to checkout.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/70">
              <ShieldCheck size={14} className="text-green-300" />
              Simple pricing
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/70">
              <Sparkles size={14} className="text-green-300" />
              Easy to book
            </div>
          </div>
        </div>

        {categories.map((category) => {
          const grouped = services.filter((service) => service.category === category);
          if (!grouped.length) return null;

          return (
            <section key={category} className="mb-20 animate-fade-in-up">
              <div className="flex items-end justify-between gap-6 mb-8">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-green-400 mb-2">
                    {SPECIALTY_CATEGORY_LABELS[category]}
                  </p>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight">
                    {SPECIALTY_CATEGORY_LABELS[category]}
                  </h2>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {grouped.map((service) => {
                  const isPremium = isPremiumSpecialtyService(service);
                  const detailHref = `/services/specialty/${service.slug}`;
                  const helpHref = buildSpecialtyHelpHref(service.id, `specialty-catalog:${service.slug}`);

                  return (
                    <article
                      key={service.id}
                      className={`group relative overflow-hidden rounded-3xl border bg-card/40 transition-all duration-300 hover:-translate-y-1 ${
                        isPremium
                          ? "border-amber-500/25 shadow-[0_0_35px_rgba(245,158,11,0.06)] hover:border-amber-400/45"
                          : "border-white/10 hover:border-green-500/40"
                      }`}
                    >
                      {isPremium && (
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/80 to-transparent" />
                      )}
                      <div
                        className="absolute inset-0 bg-cover bg-center opacity-30 transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url(${service.image})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/10" />

                      <div className="relative z-10 p-7 flex h-full min-h-[320px] flex-col">
                        <div className="flex items-center justify-between gap-3 mb-5">
                          <span
                            className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${
                              isPremium
                                ? "border-amber-500/30 bg-amber-500/10 text-amber-200"
                                : "border-white/10 bg-white/5 text-white/60"
                            }`}
                          >
                            {service.badge ?? (isPremium ? "Simple to Book" : "Specialty Service")}
                          </span>
                          <span className="font-display text-xl font-bold text-green-300">
                            {getSpecialtyDisplayPrice(service)}
                          </span>
                        </div>

                        <h3 className="text-2xl font-display font-bold text-white tracking-tight mb-3">{service.name}</h3>
                        <p className="text-white/60 leading-relaxed mb-4">{service.description}</p>
                        <p className="text-sm font-semibold text-green-300 mb-5">{service.teaser}</p>

                        <ul className="space-y-2 mb-6">
                          {service.highlights.slice(0, 3).map((highlight) => (
                            <li key={highlight} className="text-sm text-white/75">
                              {highlight}
                            </li>
                          ))}
                        </ul>

                        <div className="mt-auto space-y-3">
                          <Link
                            href={detailHref}
                            className="inline-flex items-center gap-2 text-sm font-display font-bold text-green-400 transition-transform group-hover:translate-x-1"
                          >
                            View Service Details <ArrowRight size={16} />
                          </Link>
                          <Link
                            href={helpHref}
                            className="inline-flex items-center gap-2 text-xs font-semibold text-white/55 hover:text-white transition-colors"
                          >
                            <HelpCircle size={13} className="text-green-300" />
                            Not sure about size? Get help choosing
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
