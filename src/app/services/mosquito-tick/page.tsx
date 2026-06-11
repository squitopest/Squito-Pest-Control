import { Suspense } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  HelpCircle,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { createPageMetadata } from "@/lib/site";
import { COMPANY_PHOTOS } from "@/lib/companyPhotos";
import MosquitoTickPackageSelector from "@/components/MosquitoTick/MosquitoTickPackageSelector";

export const revalidate = 86400;

export const metadata = createPageMetadata({
  title: "Mosquito & Tick Packages on Long Island | Squito Pest Control",
  description:
    "Season-long mosquito and tick protection for Long Island homes. Monthly billing April through October only. No initial fees and cancel anytime.",
  path: "/services/mosquito-tick",
});

const SEASON_MONTHS = [4, 5, 6, 7, 8, 9, 10] as const;

function isTreatmentSeason(date = new Date()): boolean {
  const month = date.getMonth() + 1;
  return SEASON_MONTHS.includes(month as (typeof SEASON_MONTHS)[number]);
}

function getCurrentSeasonLabel(date = new Date()): string {
  const month = date.getMonth() + 1;
  if (month >= 4 && month <= 10) return "In Season";
  if (month === 11 || month === 12) return `Next Season Opens April ${date.getFullYear() + 1}`;
  return `Next Season Opens April ${date.getFullYear()}`;
}

const whatsIncluded = [
  "Monthly barrier treatment across your yard's active zones",
  "Focused treatment of known tick harborage: woodline, tall grass, leaf litter, stone walls",
  "Pollinator-conscious timing: we avoid flowering plants during active bee hours",
  "Pet-friendly and family-safe once treated areas are dry",
  "Free re-treatment between visits if activity returns",
  "Digital service report delivered after every visit",
];

const whyItMatters = [
  {
    title: "Long Island is tick country",
    body: "Suffolk and Nassau counties sit inside one of the highest Lyme-disease pressure zones in the Northeast. Ticks thrive in wooded edges, tall grass, and leaf piles, exactly the places kids and pets spend their summer.",
  },
  {
    title: "Mosquitoes aren't just annoying",
    body: "Local populations can carry West Nile and EEE. A new generation can hatch from small amounts of standing water every 7–10 days, so consistent treatment matters.",
  },
  {
    title: "Protection takes a whole season",
    body: "One visit isn't enough. Mosquitoes and ticks rebound quickly, which is why effective control means consistent monthly treatments during the active season.",
  },
];

const faqs = [
  {
    q: "How often do you treat?",
    a: "Monthly during the active season (April through October). Each treatment holds for roughly 21–30 days before the next visit.",
  },
  {
    q: "Is it safe for my kids and pets?",
    a: "Yes. Treated areas are safe to use once they're fully dry, typically within 30–45 minutes of application. We also time visits to avoid pollinator activity and we skip open flowers.",
  },
  {
    q: "Why is the season only April–October?",
    a: "New York State regulations restrict outdoor mosquito and tick treatments to the period when pests are actively present, which is April through October. We honor that window strictly.",
  },
  {
    q: "Do I need to be home?",
    a: "No. As long as we have yard access, we can treat. We'll leave a service note and send a digital report after the visit.",
  },
  {
    q: "When am I billed?",
    a: "Only during active months. You'll see 7 monthly charges per season (April through October) and nothing in between. No initial fee and you can cancel anytime.",
  },
  {
    q: "What if my yard is bigger than 1 acre?",
    a: "Request a custom quote and we'll price it based on the actual treatable area. Larger estates often involve more entry points and harborage zones, so a tailored quote keeps pricing fair.",
  },
];

export default function MosquitoTickPage() {
  const inSeason = isTreatmentSeason();
  const seasonLabel = getCurrentSeasonLabel();

  return (
    <main className="min-h-screen pt-32 pb-24 relative overflow-hidden bg-background">
      <div className="absolute top-0 right-0 h-[620px] w-[820px] rounded-full bg-green-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-[480px] w-[520px] rounded-full bg-green-500/5 blur-[110px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 max-w-6xl relative z-10">
        {/* 1. HERO */}
        <section className="on-photo relative overflow-hidden rounded-[2rem] border border-white/10 mb-10 min-h-[560px] md:min-h-[620px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${COMPANY_PHOTOS.mosquitoTickHero})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          <div className="relative z-10 p-8 md:p-12 lg:p-16">
            <div className="max-w-3xl">
              <Link
                href="/get-started"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/70 hover:text-white transition-colors mb-6 on-photo"
              >
                ← Change service type
              </Link>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-green-400">
                  <ShieldCheck size={14} />
                  Season-Long Protection
                </div>
                <div
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold ${
                    inSeason
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                      : "border-amber-500/30 bg-amber-500/10 text-amber-200"
                  }`}
                >
                  <CalendarClock size={14} />
                  {seasonLabel}
                </div>
              </div>

              <h1 className="text-5xl md:text-6xl font-display font-bold text-white tracking-tight mb-5">
                Mosquito &amp; Tick Packages
                <br />
                <span className="gradient-text">Built for Long Island</span>
              </h1>
              <p className="text-xl text-white/70 leading-relaxed max-w-2xl">
                Monthly barrier treatments across your yard from April through October. Clear pricing,
                no initial fees, and you&apos;re only billed during active months.
              </p>
            </div>
          </div>
        </section>

        {/* 2. PACKAGE SELECTOR — 3-step flow */}
        <section id="packages" className="mb-12 scroll-mt-24">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-green-400 mb-3">
              3 Easy Steps
            </p>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight mb-4">
              Get your personalized quote
            </h2>
            <p className="text-white/55 leading-relaxed text-lg">
              Enter your address. See your quote. Book your first treatment.
            </p>
          </div>

          <Suspense fallback={<div className="glass-card rounded-3xl border border-white/10 p-6 md:p-8 min-h-[400px]" />}>
            <MosquitoTickPackageSelector />
          </Suspense>
        </section>

        {/* 3. SEASONAL NOTICE — moved below selector */}
        <section className="glass-card rounded-3xl border border-amber-500/25 bg-amber-500/5 p-6 md:p-8 mb-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10">
              <CalendarClock size={20} className="text-amber-300" />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-300 mb-2">
                Season Window
              </p>
              <h2 className="font-display text-2xl font-bold text-white mb-2">
                Available April through October
              </h2>
              <p className="text-white/70 leading-relaxed">
                New York State regulations restrict outdoor mosquito and tick treatments to the active pest season.
                We treat between April and October and only bill during those active months. Off-season
                reservations open any time so service can begin the moment the April window opens.
              </p>
            </div>
          </div>
        </section>

        {/* 4. WHAT'S INCLUDED */}
        <section id="how-it-works" className="glass-card rounded-3xl border border-white/10 p-6 md:p-8 mb-10 scroll-mt-24">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-green-400 mb-4">
            What&apos;s Included Every Visit
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
            A treatment built for real yards
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {whatsIncluded.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-base text-white/75 leading-relaxed"
              >
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-green-400" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-6 inline-flex items-center gap-2 text-sm text-white/55">
            <ShieldCheck size={15} className="text-green-300" />
            Pollinator-conscious and family-safe applications
          </div>
        </section>

        {/* 5. FAQ */}
        <section className="glass-card rounded-3xl border border-white/10 p-6 md:p-8 mb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-green-400 mb-3">
            Common Questions
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight mb-8">
            Good things to know
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <h3 className="font-display text-lg font-bold text-white mb-2">{faq.q}</h3>
                <p className="text-white/65 leading-relaxed text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. WHY IT MATTERS (moved down from position 3) */}
        <section className="mb-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-green-400 mb-3">
              Why This Matters Here
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight mb-4">
              Long Island has its own pest pressure
            </h2>
            <p className="text-white/65 leading-relaxed text-lg">
              Our treatments are tuned for the specific mosquito and tick species that thrive on the South Shore
              and North Shore, not a generic national template.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {whyItMatters.map((item) => (
              <div
                key={item.title}
                className="glass-card rounded-3xl border border-white/10 p-6 md:p-7"
              >
                <h3 className="font-display text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-white/65 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. FINAL CTA */}
        <section className="on-photo relative overflow-hidden rounded-[2rem] border border-green-500/20 min-h-[480px] md:min-h-[540px] flex items-center">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(/services/mosquito-tick-family-bbq.webp)" }}
          />
          {/* Dark readability gradient — no cream wash. Keeps white centered
              headline crisp while the photo remains visible top to bottom. */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-black/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.12),transparent_60%)]" />

          <div className="relative z-10 p-8 md:p-12 w-full">
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-green-400 mb-6">
                <ShieldCheck size={14} />
                The Outcome
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight mb-4">
                {inSeason
                  ? "Ready for a mosquito-free backyard?"
                  : "Lock in your spot for next season"}
              </h2>
              <p className="text-lg text-white/75 leading-relaxed mb-8">
                {inSeason
                  ? "Pick your yard size and the first treatment is just a few steps away. Get your yard back in time for dinner outside."
                  : "Reserve your spot now so service begins the moment the April window opens. Come spring, your yard is already protected."}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="#packages"
                  className="inline-flex items-center gap-2 rounded-2xl bg-green-500 px-6 py-4 text-base font-display font-bold text-white transition-colors hover:bg-green-400"
                >
                  {inSeason ? "See Packages" : "Reserve Your Spot"}
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/contact?type=residential&service=Mosquito%20%26%20Tick%20Package%20%E2%80%94%20Help%20Choosing&message=Interested%20in%20season-long%20mosquito%20and%20tick%20protection%20%E2%80%94%20would%20like%20help%20picking%20the%20right%20package%20for%20my%20property."
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-background/60 backdrop-blur-sm px-6 py-4 text-base font-display font-bold text-white/85 transition-colors hover:border-green-500/40 hover:bg-background/80 hover:text-white"
                >
                  <HelpCircle size={15} className="text-green-300" />
                  Talk to Someone
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
