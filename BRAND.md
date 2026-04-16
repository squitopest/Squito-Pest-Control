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

| Token | Hex | Use |
|---|---|---|
| Background | `#0a0a0a` | Page background — pure near-black, no green tint |
| Surface / Card | `#121212` | Cards, panels, sidebars |
| Border | `#212121` | All dividers and card borders |
| **Green 500** | `#22c55e` | Primary brand accent — buttons, icons, highlights |
| **Green 400** | `#4ade80` | Gradient text, hover states |
| Green 600 | `#16a34a` | Active/pressed states |
| Off-white | `#f5f5f0` | Premium text accent, not used heavily |

**Rules:**
- Green is reserved for **accent only** — CTAs, icons, labels. Don't use it as a background fill.
- Background surfaces stay neutral (black/dark gray). The green pops because everything else doesn't compete.
- Never use a green-tinted background. That's what made the site look "tech AI."

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

**Available real photos:**
- `/public/team-action.jpg` — technician on the job (hero, about)
- `/public/about-us-action.jpg` — technician close-up (about page right panel)
- `/public/reviews_bg.jpg` — background for reviews section

**Rules:**
- Hero section must show a real person or real job site
- Never use stock photos of generic exterminators
- Real photos go with a dark gradient overlay so text stays readable
- Alt text should always describe what's actually happening: "Squito technician treating a Long Island backyard" not "pest control worker"

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

*Last updated: April 2026*
