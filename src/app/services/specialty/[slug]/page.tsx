import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CreditCard, Home, ShieldCheck, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import { DEFAULT_OG_IMAGE, SITE_NAME, absoluteUrl } from "@/lib/site";
import {
  isPremiumSpecialtyService,
  SPECIALTY_CATEGORY_LABELS,
  getBookableSpecialtyServices,
  getSpecialtyDisplayPrice,
  getSpecialtyServiceBySlug,
} from "@/data/specialtyServices";
import SpecialtyServiceConfigurator from "@/components/SpecialtyServices/SpecialtyServiceConfigurator";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getBookableSpecialtyServices().map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getSpecialtyServiceBySlug(slug);

  if (!service) {
    return { title: "Service Not Found | Squito Pest Control" };
  }

  return {
    title: `${service.name} on Long Island | Squito Pest Control`,
    description: service.description,
    alternates: {
      canonical: `/services/specialty/${service.slug}`,
    },
    openGraph: {
      title: service.name,
      description: service.description,
      url: absoluteUrl(`/services/specialty/${service.slug}`),
      siteName: SITE_NAME,
      images: [{ url: service.image || DEFAULT_OG_IMAGE, alt: service.name }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: service.name,
      description: service.description,
      images: [service.image || DEFAULT_OG_IMAGE],
    },
  };
}

export default async function SpecialtyServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getSpecialtyServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const isPremium = isPremiumSpecialtyService(service);

  return (
    <main className="min-h-screen pt-32 pb-24 relative overflow-hidden bg-background">
      <div className="absolute top-0 right-0 h-[620px] w-[820px] rounded-full bg-green-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-[480px] w-[520px] rounded-full bg-green-500/5 blur-[110px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 max-w-6xl relative z-10">
        <Link
          href="/services/specialty"
          className="inline-flex items-center gap-2 text-sm font-semibold text-white/50 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to Specialty Services
        </Link>

        <section
          className={`relative overflow-hidden rounded-[2rem] border mb-10 ${
            isPremium ? "border-amber-500/20 shadow-[0_0_40px_rgba(245,158,11,0.08)]" : "border-white/10"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${service.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
          {isPremium && (
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/80 to-transparent" />
          )}

          <div className="relative z-10 p-8 md:p-12 lg:p-14">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-green-400">
                  <ShieldCheck size={14} />
                  {service.badge ?? "Specialty Service"}
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-semibold text-white/65">
                  <Sparkles size={14} className="text-green-300" />
                  {SPECIALTY_CATEGORY_LABELS[service.category]}
                </div>
              </div>

              <h1 className="text-5xl md:text-6xl font-display font-bold text-white tracking-tight mb-5">
                {service.name}
              </h1>
              <p className="text-xl text-white/70 leading-relaxed mb-8 max-w-2xl">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-3">
                <div className="inline-flex rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-base font-display font-bold text-green-300">
                  {getSpecialtyDisplayPrice(service)}
                </div>
                <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/70">
                  <CreditCard size={16} className="text-green-300" />
                  One-time service
                </div>
                <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/70">
                  <Home size={16} className="text-green-300" />
                  Local Long Island team
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="glass-card rounded-3xl border border-white/10 p-6 md:p-8 mb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-green-400 mb-4">
            What&apos;s Included
          </p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {service.highlights.map((highlight) => (
              <li
                key={highlight}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-base text-white/75 leading-relaxed"
              >
                {highlight}
              </li>
            ))}
          </ul>
        </section>

        <SpecialtyServiceConfigurator service={service} />
      </div>
    </main>
  );
}
