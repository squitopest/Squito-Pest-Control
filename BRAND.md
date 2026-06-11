# Squito Pest Control — Brand Book

> A living reference for how Squito looks, sounds, and shows up.
> When adding a new page or component, check here first.

---

## Who We Are

**Business:** Squito Pest Control — Long Island, NY
**Founded:** 2022 | **Owner experience:** 6+ years in the field
**Service area:** All of Nassau and Suffolk County
**Tagline:** *Smart. Safe. Pest Control.*
**Core headline:** *We Know Your Block.*

---

## Brand Personality

Three words that describe Squito as a person:

| Word | What it means in practice |
|---|---|
| **Trustworthy** | We show up on time, explain what we're doing, and charge what we quoted |
| **Fast** | Same-day service. No 3-week wait windows. |
| **Local** | We know Long Island's seasons, neighborhoods, and pest cycles — not a franchise reading from a script |

---

## Voice & Tone

**Write like this:**
- Short, confident sentences. Say it once, say it well.
- Lead with the customer's problem, not your credentials.
- Reference Long Island specifically — Nassau, Suffolk, the seasons, the neighborhoods.
- Use "I" and "we" freely — this is a real person's business.

**Don't write like this:**
- "Leveraging cutting-edge protocols to modernize the industry" → too corporate
- "Our team of certified technicians" → too generic
- Bullet points that start with "We offer..." → too salesy

**Examples of good Squito copy:**
- *"6 years in the field. Same-day service. No runaround."*
- *"We know how ant pressure spikes in Nassau every April."*
- *"Not a franchise. Not a call center. Just a local expert who shows up."*

---

## Colors

**Production default:** Light theme (`data-theme="light"` in `src/app/layout.tsx`) — warm sand page (`#ece3d2`), white cards, near-black text. Dark theme tokens remain in `globals.css` for hero/video overlays (`.on-photo`) and future use.

| Token | Light (default) | Dark (alternate) | Use |
|---|---|---|---|
| Background | `#ece3d2` | `#0a0a0a` | Page background — neutral, no green tint |
| Surface / Card | `#ffffff` | `#121212` | Cards, panels, sidebars |
| Border | warm gray | `#212121` | All dividers and card borders |
| **Green 500** | `#22c55e` | `#22c55e` | Primary brand accent — buttons, icons, highlights |
| **Green 400** | `#4ade80` | `#4ade80` | Gradient text, hover states |
| Green 600 | `#16a34a` | `#16a34a` | Active/pressed states |
| Off-white | `#f5f5f0` | `#f5f5f0` | Premium text accent on dark overlays |

**Rules:**
- Green is reserved for **accent only** — CTAs, icons, labels. Don't use it as a background fill.
- Background surfaces stay neutral (cream/white on light, near-black on dark). The green pops because everything else doesn't compete.
- Never use a green-tinted background. That's what made the site look "tech AI."
- On photo/video hero sections, use the `.on-photo` wrapper so white text stays legible regardless of theme.

---

## Typography

| Role | Font | Weight | Size range |
|---|---|---|---|
| Headlines | Outfit | 700 (Bold) | 2.5rem – 5.5rem |
| Subheadings | Outfit | 600 (Semibold) | 1.25rem – 1.75rem |
| Body copy | Inter | 400 (Regular) | 1rem – 1.125rem |
| Labels / badges | Inter | 600 (Semibold) | 0.75rem – 0.875rem, uppercase |

**Headline style:** Big, tight, punchy. Line height ~1.05. Think Nike billboards.

---

## Text Opacity Scale

Use these classes consistently — don't improvise new opacity values:

| Class | Opacity | Use for |
|---|---|---|
| `text-white` | 100% | Headlines, CTAs, key numbers |
| `.text-body` | 75% | Main body paragraphs |
| `.text-muted` | 55% | Secondary descriptions, meta info |
| `.text-subtle` | 40% | Labels, captions, timestamps |
| `.text-ghost` | 25% | Disabled states, decorative text |

---

## Buttons

**Primary CTA** (green gradient — "Get Protected", "Book Now"):
```
bg-gradient-to-r from-green-500 to-emerald-400
rounded-full, px-8 py-4
font-bold uppercase tracking-wider
hover:scale-105 hover:shadow-[0_0_40px_rgba(34,197,94,0.6)]
```

**Secondary CTA** (green tint — "Pest Identifier", "Learn More"):
```
border border-green-500/40 bg-green-500/10
rounded-full, px-8 py-4
font-bold uppercase tracking-wider
hover:bg-green-500/20 hover:border-green-500/70
```

**Ghost / Outline** (for low-priority actions):
```
border border-white/10 bg-white/5
rounded-xl
hover:bg-white/10
```

---

## Cards

Default card — solid, grounded (not floaty glass):
```css
.glass-card { bg-card border border-border; }
```

Use `rounded-2xl` or `rounded-3xl` for card corners.
Avoid excessive `backdrop-blur` — it looks AI-generated.

---

## Photography Rules

Real photos are the #1 brand asset. Always prefer a real photo over a gradient or illustration.

**Canonical registry:** `src/lib/companyPhotos.ts` — import `COMPANY_PHOTOS` instead of hardcoding paths.

| Key | Path | Typical use |
|---|---|---|
| `heroDesktop` | `/team/technician-branded.jpg` | Hero video poster (desktop) |
| `heroMobilePoster` | `/team/yard-treatment-wide.jpg` | Hero video poster (mobile) |
| `about` | `/team/eave-treatment.jpg` | About, reviews bleed image |
| `contact` | `/team/technician-thumbs-up.png` | Contact form, promo popup |
| `brandStory` | `/team/community-event.png` | Brand story / parallax |
| `guarantee` | `/company/squito-guarantee-badge.png` | Guarantee panel |
| `commercial` | `/company/truck-driveway-equipment.png` | Commercial pages |
| `commercialCrossSell` | `/company/truck-street.png` | Parallax collage |
| `residential` | `/team/perimeter-door-treatment.jpg` | Residential |
| `mosquitoTickHero` | `/team/backyard-bush-treatment.png` | Mosquito & tick |
| `serviceCobweb` … `serviceEaveReach` | `/team/*` | Pest intent, services |
| `getStartedGeneralPest` / `getStartedMosquitoTick` / `getStartedBundle` | `/team/*` | `/get-started` cards |

**Legacy paths still in use:** `/team-action.jpg` (privacy/terms), `/about-us-action.jpg` (about panel).

**Rules:**
- Hero section must show a real person or real job site
- Never use stock photos of generic exterminators
- On photo/video overlays, use `.on-photo` or a dark gradient so text stays readable
- Alt text should describe what's actually happening: "Squito technician treating a Long Island backyard" not "pest control worker"
- Reproduce assets from source files via `scripts/copy-team-photos.mjs` when adding new team shots

---

## Background Depth

The page background uses a subtle noise grain texture (defined in `globals.css`) for surface texture.

For section depth, use the glow orb utility classes:
```html
<div class="glow-orb-green w-[600px] h-[600px] top-0 left-0" />
<div class="glow-orb-teal w-[400px] h-[400px] bottom-0 right-0" />
```

Keep glow orbs subtle — `opacity-60` or less. They add depth without drama.

---

## Homepage Layout (live)

**Primary CTA path:** `Get Protected` → `/get-started` → user picks General Pest or Mosquito & Tick → existing booking flows (`src/lib/pestRouting.ts`).

**Section order** (`src/app/page.tsx`):
1. Hero — full-bleed video, centered white copy, dual CTAs, trust band, town/zip lookup, Pest Identifier hook
2. Pest Intent — "What's bugging you?" feature grid + lawn photo
3. CTA band — free inspection
4. Reviews — sticky card stack (desktop + mobile), platform links, bleed photo (desktop)
5. Plans teaser — carousel (mobile) / grid (desktop)
6. CTA band — get started
7. Service Area — town/zip lookup
8. Home parallax — zoom collage + Commercial / Guarantee / Brand story panels (`#guarantee`)
9. Contact form

**Footer:** global in `src/app/layout.tsx` (not duplicated on homepage).

**Removed from homepage (anti-template):**
- PestTicker marquee
- Standalone Stats section
- Pest Library teaser (full library remains at `/pest-library`)
- Hero glow orbs

**Promo popup:** scroll-triggered; uses real team portrait photos from `/team/team-portrait-*.png`.

**Local design scratch:** `docs/design/` (gitignored) — Stitch prompts only, not shipped.

---

## Brand Inspirations

| Brand | What we borrow |
|---|---|
| **Nike** | Bold headlines, short copy, confident imagery, action-first |
| **Porsche** | Premium feel, precision, clean layout, nothing wasted |
| **Amazon** | Reliability, speed, customer-first communication, trusted |

---

## What to Avoid

- ❌ Green-tinted backgrounds (makes it look like a cybersecurity startup)
- ❌ Excessive glass morphism / `backdrop-blur` on every element
- ❌ Corporate buzzwords ("leverage", "cutting-edge", "state-of-the-art")
- ❌ Generic stock photography
- ❌ Animations that exist only to look impressive
- ❌ Anything that makes it feel like a tech company, not a local service business

---

*Last updated: June 2026 — light theme is the live production default.*
