---
name: linear-design
description: Design system skill for linear. Activate when building UI components, pages, or any visual elements. Provides exact color tokens, typography scale, spacing grid, component patterns, and craft rules. Read references/DESIGN.md before writing any CSS or JSX. Includes ultra-mode visual journey: read references/ANIMATIONS.md, references/LAYOUT.md, references/COMPONENTS.md, and references/INTERACTIONS.md for full motion and layout details.
---

# linear Design System

You are building UI for **linear**. Light-themed, cool palette, sans-serif typography (Inter Variable), compact density on a 4px grid, expressive motion.

## Visual Reference

**IMPORTANT**: Study ALL screenshots below before writing any UI. Match colors, typography, spacing, layout, and motion exactly as shown.

### Homepage

![linear Homepage](screenshots/homepage.png)

### Scroll Journey (Cinematic Visual States)

> These screenshots capture the website at different scroll depths. The design changes dramatically as you scroll — each frame shows a different cinematic state. Replicate these exact visual transitions.

#### 0% — Hero / Above the fold

![Scroll 0%](screens/scroll/scroll-000.png)

#### 17% — Mid-page at 17% scroll

![Scroll 17%](screens/scroll/scroll-017.png)

#### 33% — Mid-page at 33% scroll

![Scroll 33%](screens/scroll/scroll-033.png)

#### 50% — Mid-page at 50% scroll

![Scroll 50%](screens/scroll/scroll-050.png)

#### 67% — Mid-page at 67% scroll

![Scroll 67%](screens/scroll/scroll-067.png)

#### 83% — Mid-page at 83% scroll

![Scroll 83%](screens/scroll/scroll-083.png)

#### 100% — Footer / End of page

![Scroll 100%](screens/scroll/scroll-100.png)

> Read `references/DESIGN.md` for full token details. Read `references/ANIMATIONS.md` for motion specs. Read `references/LAYOUT.md` for layout structure. Read `references/COMPONENTS.md` for component patterns.

## Ultra Reference Files

This package includes extended documentation. **Read these files before implementing:**

| File | Contents |
|------|----------|
| `references/DESIGN.md` | Full design system tokens, colors, typography, spacing |
| `references/VISUAL_GUIDE.md` | **START HERE** — Master visual guide with all screenshots embedded |
| `references/ANIMATIONS.md` | CSS keyframes, scroll triggers, motion library stack, video specs |
| `references/LAYOUT.md` | Flex/grid containers, page structure, spacing relationships |
| `references/COMPONENTS.md` | DOM component patterns, HTML structure, class fingerprints |
| `references/INTERACTIONS.md` | Hover/focus states with before/after style diffs |
| `screens/scroll/` | 7 scroll journey screenshots showing cinematic states |

### Animation Stack Detected

- **Web Animations API (130 active)** — animation

## Design Philosophy

- **Layered depth** — use shadow tokens to create a sense of physical layering. Each elevation level has a specific shadow.
- **Gradient accents** — gradients are used thoughtfully for emphasis, not decoration.
- **Single typeface** — Inter Variable carries all text. Hierarchy comes from size, weight, and color — never font mixing.
- **compact density** — 4px base grid. Every dimension is a multiple of 4.
- **cool palette** — the color temperature runs cool, matching the sans-serif typography.
- **Restrained accent** — `#55cdff` is the only pop of color. Used exclusively for CTAs, links, focus rings, and active states.
- **Expressive motion** — animations are an integral part of the experience. Use spring physics and layout animations.

## Color System

### Core Palette

| Role | Token | Hex | Use |
|------|-------|-----|-----|
| Background | `--background` | `#ffffff` | Page/app background |
| Surface | `--surface` | `#f4f2f4` | Cards, panels, modals |
| Text Primary | `--text-primary` | `#080808` | Headings, body text |
| Text Muted | `--text-muted` | `#8b8fa3` | Captions, placeholders |
| Accent | `--accent` | `#55cdff` | CTAs, links, focus rings |
| Border | `--border` | `#28282c` | Dividers, card borders |

### Extended Palette

- **color-text-quaternary:** `#62666d`
- **color-button-invert-bg:** `#e2e4e7` — Light surface or highlight color
- `#9c9da1`
- **color-teal:** `#02b8cc`
- **color-indigo:** `#5e6ad2`
- `#f79ce0`
- `#101112` — Deep background layer or shadow color
- `#6366f1`

### CSS Variable Tokens

```css
--layer-popover: 600;
--border-hairline: 1px;
--border-hairline: 0.5px;
--header-border: rgba(255,255,255,0.08);
--color-bg-primary: #08090a;
--color-bg-secondary: #1c1c1f;
--color-border-primary: #23252a;
--color-border-secondary: #34343a;
--color-border-tertiary: #3e3e44;
--color-border-translucent: rgba(255,255,255,0.05);
--color-border-translucent-strong: rgba(255,255,255,0.08);
--color-text-primary: #f7f8f8;
--color-text-secondary: #d0d6e0;
--color-link-primary: #828fff;
--color-overlay-primary: rgba(0,0,0,0.85);
--color-line-primary: #37393a;
--color-line-secondary: #202122;
--color-fg-primary: #f7f8f8;
--color-fg-secondary: #d0d6e0;
--color-accent: #7170ff;
```

## Typography

### Font Stack

- **Inter Variable** — Heading 1, Heading 2, Heading 3, Body, Caption
- **Berkeley Mono** — Code

### Font Sources

```css
@font-face {
  font-family: "Inter Variable";
  src: url("fonts/InterVariable-100.woff2") format("woff2");
  font-weight: 100;
}
@font-face {
  font-family: "Berkeley Mono";
  src: url("fonts/BerkeleyMono-100.woff2") format("woff2");
  font-weight: 100;
}
```

### Type Scale

| Role | Family | Size | Weight |
|------|--------|------|--------|
| Heading 1 | Inter Variable | 128px | 700 |
| Heading 2 | Inter Variable | 80px | 700 |
| Heading 3 | Inter Variable | 72px | 700 |
| Body | Inter Variable | 14px | 400 |
| Caption | Inter Variable | 13px | 400 |
| Code | Berkeley Mono | 14px | 400 |

### Typography Rules

- All text uses **Inter Variable** — never add another font family
- Max 3-4 font sizes per screen
- Headings: weight 600-700, body: weight 400
- Use color and opacity for text hierarchy, not additional font sizes
- Line height: 1.5 for body, 1.2 for headings

## Spacing & Layout

### Base Grid: 4px

Every dimension (margin, padding, gap, width, height) must be a multiple of **4px**.

### Spacing Scale

`2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24` px

### Spacing as Meaning

| Spacing | Use |
|---------|-----|
| 4-8px | Tight: related items (icon + label, avatar + name) |
| 12-16px | Medium: between groups within a section |
| 24-32px | Wide: between distinct sections |
| 48px+ | Vast: major page section breaks |

### Border Radius

Scale: `.2em, .3em, 1px, 2px, 3px, 4px, 5px, 6px, 7px, 8px, 10px, 12px, 12px 12px 0px 0px, 14px, 16px, 20px, 22px, 24px, 72px, inherit, 100%, 400px, clamp(4px,1cqw,8px)`
Default: `12px`

### Container

Max-width: `1280px`, centered with auto margins.

### Breakpoints

| Name | Value |
|------|-------|
| sm | 560px |
| sm | 640px |
| md | 641px |
| md | 700px |
| md | 768px |
| lg | 769px |
| lg | 900px |
| lg | 928px |
| lg | 1024px |
| xl | 1025px |
| xl | 1100px |
| xl | 1140px |
| xl | 1240px |
| xl | 1280px |
| 2xl | 1281px |
| 2xl | 1420px |
| 2xl | 1440px |
| 2xl | 1536px |
| 2xl | 1601px |

Mobile-first: design for small screens, layer on responsive overrides.

## Component Patterns

### Card

```css
.card {
  background: #f4f2f4;
  border: 1px solid #28282c;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 0 4px rgba(0,0,0,.5);
}
```

```html
<div class="card">
  <h3>Card Title</h3>
  <p>Card content goes here.</p>
</div>
```

### Button

```css
/* Primary */
.btn-primary {
  background: #55cdff;
  color: #080808;
  border-radius: 12px;
  padding: 8px 16px;
  font-weight: 500;
  transition: opacity 150ms ease;
}
.btn-primary:hover { opacity: 0.9; }

/* Ghost */
.btn-ghost {
  background: transparent;
  border: 1px solid #28282c;
  color: #080808;
  border-radius: 12px;
  padding: 8px 16px;
}
```

```html
<button class="btn-primary">Get Started</button>
<button class="btn-ghost">Learn More</button>
```

### Input

```css
.input {
  background: #ffffff;
  border: 1px solid #28282c;
  border-radius: 12px;
  padding: 8px 12px;
  color: #080808;
  font-size: 14px;
}
.input:focus { border-color: #55cdff; outline: none; }
```

```html
<input class="input" type="text" placeholder="Search..." />
```

### Badge / Chip

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 500;
  background: #f4f2f4;
  color: #8b8fa3;
}
```

```html
<span class="badge">New</span>
<span class="badge">Beta</span>
```

### Modal / Dialog

```css
.modal-backdrop { background: rgba(0, 0, 0, 0.6); }
.modal {
  background: #f4f2f4;
  border: 1px solid #28282c;
  border-radius: clamp(4px,1cqw,8px);
  padding: 24px;
  max-width: 480px;
  width: 90vw;
  box-shadow: 0 4px 12px rgba(0,0,0,.15);
}
```

```html
<div class="modal-backdrop">
  <div class="modal">
    <h2>Dialog Title</h2>
    <p>Dialog content.</p>
    <button class="btn-primary">Confirm</button>
    <button class="btn-ghost">Cancel</button>
  </div>
</div>
```

### Table

```css
.table { width: 100%; border-collapse: collapse; }
.table th {
  text-align: left;
  padding: 8px 12px;
  font-weight: 500;
  font-size: 12px;
  color: #8b8fa3;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #28282c;
}
.table td {
  padding: 12px;
  border-bottom: 1px solid #28282c;
}
```

```html
<table class="table">
  <thead><tr><th>Name</th><th>Status</th><th>Date</th></tr></thead>
  <tbody>
    <tr><td>Item One</td><td>Active</td><td>Jan 1</td></tr>
    <tr><td>Item Two</td><td>Pending</td><td>Jan 2</td></tr>
  </tbody>
</table>
```

### Navigation

```css
.nav {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-bottom: 1px solid #28282c;
}
.nav-link {
  color: #8b8fa3;
  padding: 8px 12px;
  border-radius: 12px;
  transition: color 150ms;
}
.nav-link:hover { color: #080808; }
.nav-link.active { color: #55cdff; }
```

```html
<nav class="nav">
  <a href="/" class="nav-link active">Home</a>
  <a href="/about" class="nav-link">About</a>
  <a href="/pricing" class="nav-link">Pricing</a>
  <button class="btn-primary" style="margin-left: auto">Get Started</button>
</nav>
```

### Extracted Components

These components were found in the codebase:

**Button** (`html`)

**Navigation** (`html`)

## Page Structure

The following page sections were detected:

- **Navigation** — Top navigation bar (11 items)
- **Hero** — Hero section (detected from heading structure)
- **Faq** — FAQ/accordion section
- **Footer** — Page footer with links and info (40 items)

When building pages, follow this section order and structure.

## Animation & Motion

This project uses **expressive motion**. Animations are part of the design language.

### CSS Animations

- `x9xrbjn-B`
- `x18re5ia-B`
- `xekv6nw-B`
- `x4yq7nq-B`
- `x1ph81ge-B`

### Motion Tokens

- **Duration scale:** `0s`, `0ms`, `.15s`, `.2s`, `.7s`, `1s`, `1.8s`, `2.5s`, `80ms`, `100ms`, `120ms`, `150ms`, `160ms`, `180ms`, `200ms`, `220ms`, `250ms`, `300ms`, `400ms`, `480ms`, `500ms`, `600ms`, `1000ms`
- **Easing functions:** `ease-out`, `ease`, `cubic-bezier(.4,0,.2,1)`, `cubic-bezier(.165,.84,.44,1)`, `ease-in-out`, `linear`, `cubic-bezier(.32,.72,0,1)`, `cubic-bezier(.16,1,.3,1)`

### Motion Guidelines

- **Duration:** Use values from the duration scale above. Short (0s) for micro-interactions, long (1000ms) for page transitions
- **Easing:** Use `ease-out` as the default easing curve
- **Direction:** Elements enter from bottom/right, exit to top/left
- **Reduced motion:** Always respect `prefers-reduced-motion` — disable animations when set

## Depth & Elevation

### Shadow Tokens

- Subtle: `var(--shadow-tiny,var(--shadow-none)),0 0 0 1px var(--color-border-tertiary)`
- Subtle: `0 0 0 1px var(--xcx2ark) inset`
- Subtle: `0 0 0 1px var(--xcx2ark)`
- Subtle: `0 1px 2px rgba(0,0,0,.5)`
- Subtle: `0 0 0 1px var(--sx-cx2ark)`
- Subtle: `0 0 0 1px rgba(0,0,0,.08),var(--shadow-low)`

### Z-Index Scale

`0, 1, 2, 3, 5, 10, 706, 1100, 999999999999`

Use these exact values — never invent z-index values.

## Anti-Patterns (Never Do)

- **No blur effects** — no backdrop-blur, no filter: blur()
- **No zebra striping** — tables and lists use borders for separation
- **No invented colors** — every hex value must come from the palette above
- **No arbitrary spacing** — every dimension is a multiple of 4px
- **No extra fonts** — only Inter Variable and Berkeley Mono are allowed
- **No arbitrary border-radius** — use the scale: .2em, .3em, 1px, 2px, 3px, 4px, 5px, 6px, 7px, 8px
- **No opacity for disabled states** — use muted colors instead

## Workflow

1. **Read** `references/DESIGN.md` before writing any UI code
2. **Pick colors** from the Color System section — never invent new ones
3. **Set typography** — Inter Variable, Berkeley Mono only, using the type scale
4. **Build layout** on the 4px grid — check every margin, padding, gap
5. **Match components** to patterns above before creating new ones
6. **Apply elevation** — use shadow tokens
7. **Validate** — every value traces back to a design token. No magic numbers.

## Brand Spec

- **Favicon:** `/favicon.ico`
- **Site URL:** `https://linear.app`
- **Brand color:** `#55cdff`
- **Brand typeface:** Inter Variable

## Quick Reference

```
Background:     #ffffff
Surface:        #f4f2f4
Text:           #080808 / #8b8fa3
Accent:         #55cdff
Border:         #28282c
Font:           Inter Variable
Spacing:        4px grid
Radius:         12px
Components:     7 detected
```

## When to Trigger

Activate this skill when:
- Creating new components, pages, or visual elements for linear
- Writing CSS, Tailwind classes, styled-components, or inline styles
- Building page layouts, templates, or responsive designs
- Reviewing UI code for design consistency
- The user mentions "linear" design, style, UI, or theme
- Generating mockups, wireframes, or visual prototypes

---

# Full Reference Files

> Every output file is embedded below. Claude has full design system context from /skills alone.

## Design System Tokens (DESIGN.md)

# linear DESIGN.md

> Auto-generated design system — reverse-engineered via static analysis by skillui.
> Frameworks: None detected
> Colors: 20 · Fonts: 2 · Components: 7
> Icon library: not detected · State: not detected
> Primary theme: light · Dark mode toggle: no · Motion: expressive

## Visual Reference

**Match this design exactly** — study colors, fonts, spacing, and component shapes before writing any UI code.

![linear Homepage](../screenshots/homepage.png)

---

## 1. Visual Theme & Atmosphere

This is a **light-themed** interface with a cool, approachable feel. The light background emphasizes content clarity. Typography uses **Inter Variable** throughout — a clean, modern choice that maintains consistency. Spacing follows a **4px base grid** (compact density), with scale: 2, 4, 6, 8, 10, 12, 14, 16px. The palette is predominantly monochromatic with **#55cdff** as the single accent color — used sparingly for interactive elements and emphasis. Motion is expressive — spring physics, layout animations, and staggered reveals are part of the visual language.

---

## 2. Color Palette & Roles

| Token | Hex | Role | Use |
|---|---|---|---|
| scrollbar-color | `#ffffff` | background | Page background, darkest surface |
| color-bg-tertiary | `#f4f2f4` | surface | Card and panel backgrounds |
| theme-color | `#080808` | text-primary | Headings and body text |
| color-text-tertiary | `#8b8fa3` | text-muted | Captions, placeholders, secondary info |
| color-text-secondary | `#d0d6e0` | text-muted | Captions, placeholders, secondary info |
| color-bg-secondary | `#191d20` | text-muted | Captions, placeholders, secondary info |
| color-border-secondary | `#383b3f` | text-muted | Captions, placeholders, secondary info |
| color-text-secondary | `#b4bcd0` | text-muted | Captions, placeholders, secondary info |
| color-bg-quaternary | `#28282c` | border | Dividers, card borders, outlines |
| accent | `#55cdff` | accent | CTAs, links, focus rings, active states |
| color-accent | `#7170ff` | accent | CTAs, links, focus rings, active states |
| color-teal | `#02b8cc` | info | Informational highlights |
| color-text-quaternary | `#62666d` | unknown | Palette color |
| color-button-invert-bg | `#e2e4e7` | unknown | Palette color |
| unknown | `#9c9da1` | unknown | Palette color |
| color-indigo | `#5e6ad2` | unknown | Palette color |
| unknown | `#f79ce0` | unknown | Palette color |
| unknown | `#101112` | unknown | Palette color |
| unknown | `#6366f1` | unknown | Palette color |
| color-link-primary | `#828fff` | unknown | Palette color |

### CSS Variable Tokens

```css
--layer-popover: 600;
--border-hairline: 1px;
--border-hairline: 0.5px;
--header-border: rgba(255,255,255,0.08);
--color-bg-primary: #08090a;
--color-bg-secondary: #1c1c1f;
--color-border-primary: #23252a;
--color-border-secondary: #34343a;
--color-border-tertiary: #3e3e44;
--color-border-translucent: rgba(255,255,255,0.05);
--color-border-translucent-strong: rgba(255,255,255,0.08);
--color-text-primary: #f7f8f8;
--color-text-secondary: #d0d6e0;
--color-link-primary: #828fff;
--color-overlay-primary: rgba(0,0,0,0.85);
--color-line-primary: #37393a;
--color-line-secondary: #202122;
--color-fg-primary: #f7f8f8;
--color-fg-secondary: #d0d6e0;
--color-accent: #7170ff;
```


---

## 3. Typography Rules

**Font Stack:**
- **Inter Variable** — Heading 1, Heading 2, Heading 3, Body, Caption
- **Berkeley Mono** — Code

**Font Sources:**

```css
@font-face {
  font-family: "Inter Variable";
  src: url("fonts/InterVariable-100.woff2") format("woff2");
  font-weight: 100;
}
@font-face {
  font-family: "Berkeley Mono";
  src: url("fonts/BerkeleyMono-100.woff2") format("woff2");
  font-weight: 100;
}
```

| Role | Font | Size | Weight |
|---|---|---|---|
| Heading 1 | Inter Variable | 128px | 700 |
| Heading 2 | Inter Variable | 80px | 700 |
| Heading 3 | Inter Variable | 72px | 700 |
| Body | Inter Variable | 14px | 400 |
| Caption | Inter Variable | 13px | 400 |
| Code | Berkeley Mono | 14px | 400 |

**Typographic Rules:**
- Use **Inter Variable** for all text — do not mix font families
- Maintain consistent hierarchy: no more than 3-4 font sizes per screen
- Headings use bold (600-700), body uses regular (400)
- Line height: 1.5 for body text, 1.2 for headings
- Use color and opacity for secondary hierarchy, not additional font sizes


---

## 4. Component Stylings

### Layout (1)

**Footer** — `html`

### Navigation (1)

**Navigation** — `html`

### Data Input (2)

**Button** — `html`
- Animation: 

**Input** — `html`
- State: :focus, :placeholder

### Media (3)

**Image** — `html`

**Icon** — `html`

**Map/Canvas** — `html`



---

## 5. Layout Principles

- **Base spacing unit:** 4px
- **Spacing scale:** 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24
- **Border radius:** .2em, .3em, 1px, 2px, 3px, 4px, 5px, 6px, 7px, 8px, 10px, 12px, 12px 12px 0px 0px, 14px, 16px, 20px, 22px, 24px, 72px, inherit, 100%, 400px, clamp(4px,1cqw,8px)
- **Max content width:** 1280px

**Spacing as Meaning:**
| Spacing | Use |
|---|---|
| 4-8px | Tight: related items within a group |
| 12-16px | Medium: between groups |
| 24-32px | Wide: between sections |
| 48px+ | Vast: major section breaks |


---

## 6. Depth & Elevation

### Flat — subtle depth hints

- `var(--shadow-tiny,var(--shadow-none)),0 0 0 1px var(--color-border-tertiary)`
- `0 0 0 1px var(--xcx2ark) inset`
- `0 0 0 1px var(--xcx2ark)`

### Raised — cards, buttons, interactive elements

- `0 0 4px rgba(0,0,0,.5)`
- `var(--x-boxShadow)`
- `var(--x10lzhmx)`

### Floating — dropdowns, popovers, modals

- `0 4px 12px rgba(0,0,0,.15)`
- `inset 0 0 12px 0 rgba(0,0,0,.2)`
- `0 0 0 1px rgba(0,0,0,.08),0 2px 2px rgba(0,0,0,.04),0 8px 16px -4px rgba(0,0,0,.04)`

### Overlay — full-screen overlays, top-level dialogs

- `0 12px 48px var(--xd1bcc1)`
- `0 8px 32px 0#08090a`
- `0 8px 32px 0 rgba(8,9,10,.05)`

### Z-Index Scale

`0, 1, 2, 3, 5, 10, 706, 1100, 999999999999`



---

## 7. Animation & Motion

This project uses **expressive motion**. Animations are an integral part of the experience.

### CSS Animations

- `@keyframes x9xrbjn-B`
- `@keyframes x18re5ia-B`
- `@keyframes xekv6nw-B`
- `@keyframes x4yq7nq-B`
- `@keyframes x1ph81ge-B`
- `@keyframes sx-hef49w-B`
- `@keyframes Debug_fadeIn__WsYwQ`
- `@keyframes ThemeToggle_fadeIn__76BIZ`

### Animated Components

- **Button**: 

### Motion Guidelines

- Duration: 150-300ms for micro-interactions, 300-500ms for page transitions
- Easing: `ease-out` for enters, `ease-in` for exits
- Always respect `prefers-reduced-motion`


---

## 8. Do's and Don'ts

### Do's

- Use `#55cdff` for interactive elements (buttons, links, focus rings)
- Use `#ffffff` as the primary page background
- Use **Inter Variable** for all UI text
- Follow the **4px** spacing grid for all margins, padding, and gaps
- Use the defined shadow tokens for elevation — see Section 6
- Use border-radius from the scale: .2em, .3em, 1px, 2px, 3px
- Reuse existing components from Section 4 before creating new ones

### Don'ts

- Don't introduce colors outside this palette — extend the design tokens first
- Don't mix font families — use Inter Variable consistently
- Don't use arbitrary spacing values — stick to multiples of 4px
- Don't create custom box-shadow values outside the system tokens
- Don't use arbitrary border-radius values — pick from the defined scale
- Don't duplicate component patterns — check Section 4 first
- Don't use backdrop-blur or blur effects

### Anti-Patterns (detected from codebase)

- No blur or backdrop-blur effects
- No zebra striping on tables/lists


---

## 9. Responsive Behavior

| Name | Value | Source |
|---|---|---|
| sm | 560px | css |
| sm | 640px | css |
| md | 641px | css |
| md | 700px | css |
| md | 768px | css |
| lg | 769px | css |
| lg | 900px | css |
| lg | 928px | css |
| lg | 1024px | css |
| xl | 1025px | css |
| xl | 1100px | css |
| xl | 1140px | css |
| xl | 1240px | css |
| xl | 1280px | css |
| 2xl | 1281px | css |
| 2xl | 1420px | css |
| 2xl | 1440px | css |
| 2xl | 1536px | css |
| 2xl | 1601px | css |

**Approach:** Use `@media (min-width: ...)` queries matching the breakpoints above.


---

## 10. Agent Prompt Guide

Use these as starting points when building new UI:

### Build a Card

```
Background: #f4f2f4
Border: 1px solid #28282c
Radius: 12px
Padding: 16px
Font: Inter Variable
Use shadow tokens from Section 6.
```

### Build a Button

```
Primary: bg #55cdff, text white
Ghost: bg transparent, border #28282c
Padding: 8px 16px
Radius: 12px
Hover: opacity 0.9 or lighter shade
Focus: ring with #55cdff
```

### Build a Page Layout

```
Background: #ffffff
Max-width: 1280px, centered
Grid: 4px base
Responsive: mobile-first, breakpoints from Section 9
```

### Build a Stats Card

```
Surface: #f4f2f4
Label: #8b8fa3 (muted, 12px, uppercase)
Value: #080808 (primary, 24-32px, bold)
Status: use success/warning/danger from Section 2
```

### Build a Form

```
Input bg: #ffffff
Input border: 1px solid #28282c
Focus: border-color #55cdff
Label: #8b8fa3 12px
Spacing: 16px between fields
Radius: 12px
```

### General Component

```
1. Read DESIGN.md Sections 2-6 for tokens
2. Colors: only from palette
3. Font: Inter Variable, type scale from Section 3
4. Spacing: 4px grid
5. Components: match patterns from Section 4
6. Elevation: shadow tokens
```

## Visual Guide — Screenshots (VISUAL_GUIDE.md)

# linear — Visual Guide

> Master visual reference. Study every screenshot carefully before implementing any UI.
> Match colors, layout, typography, spacing, and motion states exactly.

**Motion Stack:** **Web Animations API (130 active)**

## Scroll Journey

The page has cinematic scroll animations. Each screenshot below shows the exact visual state at that scroll depth.
**Replicate these transitions precisely** — the design changes dramatically as you scroll.

### Hero — Above the fold

*Scroll position: 0px of 10781px total*

![Hero — Above the fold](../screens/scroll/scroll-000.png)

### 17% scroll depth

*Scroll position: 1680px of 10781px total*

![17% scroll depth](../screens/scroll/scroll-017.png)

### 33% scroll depth

*Scroll position: 3261px of 10781px total*

![33% scroll depth](../screens/scroll/scroll-033.png)

### 50% scroll depth

*Scroll position: 4941px of 10781px total*

![50% scroll depth](../screens/scroll/scroll-050.png)

### 67% scroll depth

*Scroll position: 6620px of 10781px total*

![67% scroll depth](../screens/scroll/scroll-067.png)

### 83% scroll depth

*Scroll position: 8201px of 10781px total*

![83% scroll depth](../screens/scroll/scroll-083.png)

### Footer — End of page

*Scroll position: 9881px of 10781px total*

![Footer — End of page](../screens/scroll/scroll-100.png)

## Full Page Screenshots

### Linear – The system for product development

*URL: `https://linear.app`*

![Linear – The system for product development](../screens/pages/home.png)

### Linear – The system for product development

*URL: `https://linear.app/homepage`*

![Linear – The system for product development](../screens/pages/homepage.png)

### About – Linear

*URL: `https://linear.app/about`*

![About – Linear](../screens/pages/about.png)

### Linear Customers

*URL: `https://linear.app/customers`*

![Linear Customers](../screens/pages/customers.png)

### Pricing – Linear

*URL: `https://linear.app/pricing`*

![Pricing – Linear](../screens/pages/pricing.png)

## Section Screenshots

Clipped sections showing individual components in context.

### Section 9 — `main > div`

*1436×1200px*

![Section 9](../screens/sections/home-section-9.png)

### Section 9 — `main > div`

*1436×1200px*

![Section 9](../screens/sections/homepage-section-9.png)

### Section 3 — `main > div`

*1436×756px*

![Section 3](../screens/sections/about-section-3.png)

### Section 3 — `main > div`

*1024×376px*

![Section 3](../screens/sections/customers-section-3.png)

### Section 4 — `main > div`

*1024×550px*

![Section 4](../screens/sections/customers-section-4.png)

### Section 3 — `main > div`

*1436×1107px*

![Section 3](../screens/sections/pricing-section-3.png)

## Animations & Motion (ANIMATIONS.md)

# Animation Reference

> Cinematic motion design extracted from live DOM. Follow these specs exactly to recreate the experience.

## Motion Technology Stack

| Library | Type | Notes |
|---------|------|-------|
| **Web Animations API (130 active)** | animation |  |

## Scroll Journey

The page is **10,781px** tall. Each frame below shows what the user sees at that scroll depth.

> **Use these screenshots to understand WHAT animates, WHEN it animates, and HOW it moves.**

### 0% — Top / Hero
Scroll position: 0px

![Scroll 0%](../screens/scroll/scroll-000.png)

### 17% — Opening Section
Scroll position: 1,680px

![Scroll 17%](../screens/scroll/scroll-017.png)

### 33% — First Feature Section
Scroll position: 3,261px

![Scroll 33%](../screens/scroll/scroll-033.png)

### 50% — Mid-Page
Scroll position: 4,941px

![Scroll 50%](../screens/scroll/scroll-050.png)

### 67% — Lower Content
Scroll position: 6,620px

![Scroll 67%](../screens/scroll/scroll-067.png)

### 83% — Near Footer
Scroll position: 8,201px

![Scroll 83%](../screens/scroll/scroll-083.png)

### 100% — Bottom / Footer
Scroll position: 9,881px

![Scroll 100%](../screens/scroll/scroll-100.png)

## CSS Keyframes (607 extracted)

### `@keyframes grid-dot-0-0-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-0-agent`

```css
@keyframes grid-dot-0-0-agent {
  0% {
    opacity: 1;
  }
  6.25% {
    opacity: 1;
  }
  6.25% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-0-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-0-agent`

```css
@keyframes grid-dot-0-0-agent {
  0% {
    opacity: 1;
  }
  6.25% {
    opacity: 1;
  }
  6.25% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-1-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-1-agent`

```css
@keyframes grid-dot-0-1-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-1-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-1-agent`

```css
@keyframes grid-dot-0-1-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-2-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-2-agent`

```css
@keyframes grid-dot-0-2-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-2-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-2-agent`

```css
@keyframes grid-dot-0-2-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-3-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-3-agent`

```css
@keyframes grid-dot-0-3-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-3-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-3-agent`

```css
@keyframes grid-dot-0-3-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-4-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-4-agent`

```css
@keyframes grid-dot-0-4-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-4-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-4-agent`

```css
@keyframes grid-dot-0-4-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-0-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-0-agent`

```css
@keyframes grid-dot-1-0-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-0-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-0-agent`

```css
@keyframes grid-dot-1-0-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-1-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-1-agent`

```css
@keyframes grid-dot-1-1-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-1-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-1-agent`

```css
@keyframes grid-dot-1-1-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-2-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-2-agent`

```css
@keyframes grid-dot-1-2-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-2-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-2-agent`

```css
@keyframes grid-dot-1-2-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-3-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-3-agent`

```css
@keyframes grid-dot-1-3-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-3-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-3-agent`

```css
@keyframes grid-dot-1-3-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-4-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-4-agent`

```css
@keyframes grid-dot-1-4-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-4-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-4-agent`

```css
@keyframes grid-dot-1-4-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-0-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-0-agent`

```css
@keyframes grid-dot-2-0-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-0-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-0-agent`

```css
@keyframes grid-dot-2-0-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-1-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-1-agent`

```css
@keyframes grid-dot-2-1-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-1-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-1-agent`

```css
@keyframes grid-dot-2-1-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-2-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-2-agent`

```css
@keyframes grid-dot-2-2-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-2-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-2-agent`

```css
@keyframes grid-dot-2-2-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-3-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-3-agent`

```css
@keyframes grid-dot-2-3-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-3-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-3-agent`

```css
@keyframes grid-dot-2-3-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-4-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-4-agent`

```css
@keyframes grid-dot-2-4-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-4-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-4-agent`

```css
@keyframes grid-dot-2-4-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-0-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-0-agent`

```css
@keyframes grid-dot-3-0-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-0-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-0-agent`

```css
@keyframes grid-dot-3-0-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-1-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-1-agent`

```css
@keyframes grid-dot-3-1-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-1-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-1-agent`

```css
@keyframes grid-dot-3-1-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-2-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-2-agent`

```css
@keyframes grid-dot-3-2-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-2-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-2-agent`

```css
@keyframes grid-dot-3-2-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-3-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-3-agent`

```css
@keyframes grid-dot-3-3-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-3-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-3-agent`

```css
@keyframes grid-dot-3-3-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-4-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-4-agent`

```css
@keyframes grid-dot-3-4-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-4-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-4-agent`

```css
@keyframes grid-dot-3-4-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-0-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-0-agent`

```css
@keyframes grid-dot-4-0-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-0-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-0-agent`

```css
@keyframes grid-dot-4-0-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-1-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-1-agent`

```css
@keyframes grid-dot-4-1-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-1-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-1-agent`

```css
@keyframes grid-dot-4-1-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-2-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-2-agent`

```css
@keyframes grid-dot-4-2-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-2-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-2-agent`

```css
@keyframes grid-dot-4-2-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-3-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-3-agent`

```css
@keyframes grid-dot-4-3-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-3-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-3-agent`

```css
@keyframes grid-dot-4-3-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-4-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-4-agent`

```css
@keyframes grid-dot-4-4-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-4-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-4-agent`

```css
@keyframes grid-dot-4-4-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-0-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-0-upDown`

```css
@keyframes grid-dot-0-0-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-0-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-0-upDown`

```css
@keyframes grid-dot-0-0-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-1-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-1-upDown`

```css
@keyframes grid-dot-0-1-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 1;
  }
  42.8571% {
    opacity: 1;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 1;
  }
  64.2857% {
    opacity: 1;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-1-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-1-upDown`

```css
@keyframes grid-dot-0-1-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 1;
  }
  42.8571% {
    opacity: 1;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 1;
  }
  64.2857% {
    opacity: 1;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-2-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-2-upDown`

```css
@keyframes grid-dot-0-2-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  42.8571% {
    opacity: 1;
  }
  42.8571% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  57.1429% {
    opacity: 1;
  }
  57.1429% {
    opacity: 1;
  }
  64.2857% {
    opacity: 1;
  }
  64.2857% {
    opacity: 1;
  }
  71.4286% {
    opacity: 1;
  }
  71.4286% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-2-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-2-upDown`

```css
@keyframes grid-dot-0-2-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  42.8571% {
    opacity: 1;
  }
  42.8571% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  57.1429% {
    opacity: 1;
  }
  57.1429% {
    opacity: 1;
  }
  64.2857% {
    opacity: 1;
  }
  64.2857% {
    opacity: 1;
  }
  71.4286% {
    opacity: 1;
  }
  71.4286% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-3-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-3-upDown`

```css
@keyframes grid-dot-0-3-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 1;
  }
  42.8571% {
    opacity: 1;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 1;
  }
  64.2857% {
    opacity: 1;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-3-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-3-upDown`

```css
@keyframes grid-dot-0-3-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 1;
  }
  42.8571% {
    opacity: 1;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 1;
  }
  64.2857% {
    opacity: 1;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-4-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-4-upDown`

```css
@keyframes grid-dot-0-4-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-4-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-4-upDown`

```css
@keyframes grid-dot-0-4-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-0-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-0-upDown`

```css
@keyframes grid-dot-1-0-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-0-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-0-upDown`

```css
@keyframes grid-dot-1-0-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-1-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-1-upDown`

```css
@keyframes grid-dot-1-1-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 1;
  }
  71.4286% {
    opacity: 1;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-1-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-1-upDown`

```css
@keyframes grid-dot-1-1-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 1;
  }
  71.4286% {
    opacity: 1;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-2-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-2-upDown`

```css
@keyframes grid-dot-1-2-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  42.8571% {
    opacity: 1;
  }
  42.8571% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 1;
  }
  64.2857% {
    opacity: 1;
  }
  64.2857% {
    opacity: 1;
  }
  71.4286% {
    opacity: 1;
  }
  71.4286% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-2-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-2-upDown`

```css
@keyframes grid-dot-1-2-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  42.8571% {
    opacity: 1;
  }
  42.8571% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 1;
  }
  64.2857% {
    opacity: 1;
  }
  64.2857% {
    opacity: 1;
  }
  71.4286% {
    opacity: 1;
  }
  71.4286% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-3-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-3-upDown`

```css
@keyframes grid-dot-1-3-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 1;
  }
  71.4286% {
    opacity: 1;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-3-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-3-upDown`

```css
@keyframes grid-dot-1-3-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 1;
  }
  71.4286% {
    opacity: 1;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-4-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-4-upDown`

```css
@keyframes grid-dot-1-4-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-4-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-4-upDown`

```css
@keyframes grid-dot-1-4-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-0-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-0-upDown`

```css
@keyframes grid-dot-2-0-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-0-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-0-upDown`

```css
@keyframes grid-dot-2-0-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-1-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-1-upDown`

```css
@keyframes grid-dot-2-1-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-1-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-1-upDown`

```css
@keyframes grid-dot-2-1-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-2-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-2-upDown`

```css
@keyframes grid-dot-2-2-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 1;
  }
  21.4286% {
    opacity: 1;
  }
  21.4286% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  42.8571% {
    opacity: 1;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 1;
  }
  71.4286% {
    opacity: 1;
  }
  71.4286% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  92.8571% {
    opacity: 1;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-2-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-2-upDown`

```css
@keyframes grid-dot-2-2-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 1;
  }
  21.4286% {
    opacity: 1;
  }
  21.4286% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  42.8571% {
    opacity: 1;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 1;
  }
  71.4286% {
    opacity: 1;
  }
  71.4286% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  92.8571% {
    opacity: 1;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-3-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-3-upDown`

```css
@keyframes grid-dot-2-3-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-3-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-3-upDown`

```css
@keyframes grid-dot-2-3-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-4-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-4-upDown`

```css
@keyframes grid-dot-2-4-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-4-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-4-upDown`

```css
@keyframes grid-dot-2-4-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-0-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-0-upDown`

```css
@keyframes grid-dot-3-0-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-0-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-0-upDown`

```css
@keyframes grid-dot-3-0-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-1-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-1-upDown`

```css
@keyframes grid-dot-3-1-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 1;
  }
  21.4286% {
    opacity: 1;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-1-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-1-upDown`

```css
@keyframes grid-dot-3-1-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 1;
  }
  21.4286% {
    opacity: 1;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-2-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-2-upDown`

```css
@keyframes grid-dot-3-2-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 1;
  }
  14.2857% {
    opacity: 1;
  }
  14.2857% {
    opacity: 1;
  }
  21.4286% {
    opacity: 1;
  }
  21.4286% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  92.8571% {
    opacity: 1;
  }
  92.8571% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-2-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-2-upDown`

```css
@keyframes grid-dot-3-2-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 1;
  }
  14.2857% {
    opacity: 1;
  }
  14.2857% {
    opacity: 1;
  }
  21.4286% {
    opacity: 1;
  }
  21.4286% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  92.8571% {
    opacity: 1;
  }
  92.8571% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-3-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-3-upDown`

```css
@keyframes grid-dot-3-3-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 1;
  }
  21.4286% {
    opacity: 1;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-3-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-3-upDown`

```css
@keyframes grid-dot-3-3-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 1;
  }
  21.4286% {
    opacity: 1;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-4-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-4-upDown`

```css
@keyframes grid-dot-3-4-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-4-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-4-upDown`

```css
@keyframes grid-dot-3-4-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-0-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-0-upDown`

```css
@keyframes grid-dot-4-0-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-0-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-0-upDown`

```css
@keyframes grid-dot-4-0-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-1-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-1-upDown`

```css
@keyframes grid-dot-4-1-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 1;
  }
  14.2857% {
    opacity: 1;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 1;
  }
  92.8571% {
    opacity: 1;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-1-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-1-upDown`

```css
@keyframes grid-dot-4-1-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 1;
  }
  14.2857% {
    opacity: 1;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 1;
  }
  92.8571% {
    opacity: 1;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-2-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-2-upDown`

```css
@keyframes grid-dot-4-2-upDown {
  0% {
    opacity: 1;
  }
  7.14286% {
    opacity: 1;
  }
  7.14286% {
    opacity: 1;
  }
  14.2857% {
    opacity: 1;
  }
  14.2857% {
    opacity: 1;
  }
  21.4286% {
    opacity: 1;
  }
  21.4286% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  92.8571% {
    opacity: 1;
  }
  92.8571% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-2-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-2-upDown`

```css
@keyframes grid-dot-4-2-upDown {
  0% {
    opacity: 1;
  }
  7.14286% {
    opacity: 1;
  }
  7.14286% {
    opacity: 1;
  }
  14.2857% {
    opacity: 1;
  }
  14.2857% {
    opacity: 1;
  }
  21.4286% {
    opacity: 1;
  }
  21.4286% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  92.8571% {
    opacity: 1;
  }
  92.8571% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-3-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-3-upDown`

```css
@keyframes grid-dot-4-3-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 1;
  }
  14.2857% {
    opacity: 1;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 1;
  }
  92.8571% {
    opacity: 1;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-3-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-3-upDown`

```css
@keyframes grid-dot-4-3-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 1;
  }
  14.2857% {
    opacity: 1;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 1;
  }
  92.8571% {
    opacity: 1;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-4-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-4-upDown`

```css
@keyframes grid-dot-4-4-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-4-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-4-upDown`

```css
@keyframes grid-dot-4-4-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-0-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-0-pong`

```css
@keyframes grid-dot-0-0-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-0-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-0-pong`

```css
@keyframes grid-dot-0-0-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-1-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-1-pong`

```css
@keyframes grid-dot-0-1-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-1-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-1-pong`

```css
@keyframes grid-dot-0-1-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-2-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-2-pong`

```css
@keyframes grid-dot-0-2-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-2-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-2-pong`

```css
@keyframes grid-dot-0-2-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-3-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-3-pong`

```css
@keyframes grid-dot-0-3-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-3-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-3-pong`

```css
@keyframes grid-dot-0-3-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-4-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-4-pong`

```css
@keyframes grid-dot-0-4-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-4-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-4-pong`

```css
@keyframes grid-dot-0-4-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-0-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-0-pong`

```css
@keyframes grid-dot-1-0-pong {
  0% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-0-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-0-pong`

```css
@keyframes grid-dot-1-0-pong {
  0% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-1-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-1-pong`

```css
@keyframes grid-dot-1-1-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-1-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-1-pong`

```css
@keyframes grid-dot-1-1-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-2-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-2-pong`

```css
@keyframes grid-dot-1-2-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-2-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-2-pong`

```css
@keyframes grid-dot-1-2-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-3-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-3-pong`

```css
@keyframes grid-dot-1-3-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-3-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-3-pong`

```css
@keyframes grid-dot-1-3-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-4-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-4-pong`

```css
@keyframes grid-dot-1-4-pong {
  0% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-4-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-4-pong`

```css
@keyframes grid-dot-1-4-pong {
  0% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-0-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-0-pong`

```css
@keyframes grid-dot-2-0-pong {
  0% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-0-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-0-pong`

```css
@keyframes grid-dot-2-0-pong {
  0% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-1-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-1-pong`

```css
@keyframes grid-dot-2-1-pong {
  0% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-1-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-1-pong`

```css
@keyframes grid-dot-2-1-pong {
  0% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-2-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-2-pong`

```css
@keyframes grid-dot-2-2-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-2-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-2-pong`

```css
@keyframes grid-dot-2-2-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-3-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-3-pong`

```css
@keyframes grid-dot-2-3-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-3-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-3-pong`

```css
@keyframes grid-dot-2-3-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-4-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-4-pong`

```css
@keyframes grid-dot-2-4-pong {
  0% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-4-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-4-pong`

```css
@keyframes grid-dot-2-4-pong {
  0% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-0-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-0-pong`

```css
@keyframes grid-dot-3-0-pong {
  0% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-0-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-0-pong`

```css
@keyframes grid-dot-3-0-pong {
  0% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-1-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-1-pong`

```css
@keyframes grid-dot-3-1-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-1-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-1-pong`

```css
@keyframes grid-dot-3-1-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-2-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-2-pong`

```css
@keyframes grid-dot-3-2-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-2-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-2-pong`

```css
@keyframes grid-dot-3-2-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-3-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-3-pong`

```css
@keyframes grid-dot-3-3-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-3-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-3-pong`

```css
@keyframes grid-dot-3-3-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-4-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-4-pong`

```css
@keyframes grid-dot-3-4-pong {
  0% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-4-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-4-pong`

```css
@keyframes grid-dot-3-4-pong {
  0% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-0-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-0-pong`

```css
@keyframes grid-dot-4-0-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-0-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-0-pong`

```css
@keyframes grid-dot-4-0-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-1-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-1-pong`

```css
@keyframes grid-dot-4-1-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-1-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-1-pong`

```css
@keyframes grid-dot-4-1-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-2-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-2-pong`

```css
@keyframes grid-dot-4-2-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-2-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-2-pong`

```css
@keyframes grid-dot-4-2-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-3-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-3-pong`

```css
@keyframes grid-dot-4-3-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-3-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-3-pong`

```css
@keyframes grid-dot-4-3-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-4-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-4-pong`

```css
@keyframes grid-dot-4-4-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-4-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-4-pong`

```css
@keyframes grid-dot-4-4-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-0-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-0-agent`

```css
@keyframes grid-dot-0-0-agent {
  0% {
    opacity: 1;
  }
  6.25% {
    opacity: 1;
  }
  6.25% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-0-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-0-agent`

```css
@keyframes grid-dot-0-0-agent {
  0% {
    opacity: 1;
  }
  6.25% {
    opacity: 1;
  }
  6.25% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-1-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-1-agent`

```css
@keyframes grid-dot-0-1-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-1-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-1-agent`

```css
@keyframes grid-dot-0-1-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-2-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-2-agent`

```css
@keyframes grid-dot-0-2-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-2-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-2-agent`

```css
@keyframes grid-dot-0-2-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-3-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-3-agent`

```css
@keyframes grid-dot-0-3-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-3-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-3-agent`

```css
@keyframes grid-dot-0-3-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-4-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-4-agent`

```css
@keyframes grid-dot-0-4-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-4-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-4-agent`

```css
@keyframes grid-dot-0-4-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-0-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-0-agent`

```css
@keyframes grid-dot-1-0-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-0-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-0-agent`

```css
@keyframes grid-dot-1-0-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-1-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-1-agent`

```css
@keyframes grid-dot-1-1-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-1-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-1-agent`

```css
@keyframes grid-dot-1-1-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-2-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-2-agent`

```css
@keyframes grid-dot-1-2-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-2-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-2-agent`

```css
@keyframes grid-dot-1-2-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-3-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-3-agent`

```css
@keyframes grid-dot-1-3-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-3-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-3-agent`

```css
@keyframes grid-dot-1-3-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-4-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-4-agent`

```css
@keyframes grid-dot-1-4-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-4-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-4-agent`

```css
@keyframes grid-dot-1-4-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-0-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-0-agent`

```css
@keyframes grid-dot-2-0-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-0-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-0-agent`

```css
@keyframes grid-dot-2-0-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-1-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-1-agent`

```css
@keyframes grid-dot-2-1-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-1-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-1-agent`

```css
@keyframes grid-dot-2-1-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-2-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-2-agent`

```css
@keyframes grid-dot-2-2-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-2-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-2-agent`

```css
@keyframes grid-dot-2-2-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-3-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-3-agent`

```css
@keyframes grid-dot-2-3-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-3-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-3-agent`

```css
@keyframes grid-dot-2-3-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-4-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-4-agent`

```css
@keyframes grid-dot-2-4-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-4-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-4-agent`

```css
@keyframes grid-dot-2-4-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-0-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-0-agent`

```css
@keyframes grid-dot-3-0-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-0-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-0-agent`

```css
@keyframes grid-dot-3-0-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-1-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-1-agent`

```css
@keyframes grid-dot-3-1-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-1-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-1-agent`

```css
@keyframes grid-dot-3-1-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-2-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-2-agent`

```css
@keyframes grid-dot-3-2-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-2-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-2-agent`

```css
@keyframes grid-dot-3-2-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-3-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-3-agent`

```css
@keyframes grid-dot-3-3-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-3-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-3-agent`

```css
@keyframes grid-dot-3-3-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-4-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-4-agent`

```css
@keyframes grid-dot-3-4-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-4-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-4-agent`

```css
@keyframes grid-dot-3-4-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-0-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-0-agent`

```css
@keyframes grid-dot-4-0-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-0-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-0-agent`

```css
@keyframes grid-dot-4-0-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-1-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-1-agent`

```css
@keyframes grid-dot-4-1-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-1-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-1-agent`

```css
@keyframes grid-dot-4-1-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-2-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-2-agent`

```css
@keyframes grid-dot-4-2-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-2-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-2-agent`

```css
@keyframes grid-dot-4-2-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-3-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-3-agent`

```css
@keyframes grid-dot-4-3-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-3-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-3-agent`

```css
@keyframes grid-dot-4-3-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-4-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-4-agent`

```css
@keyframes grid-dot-4-4-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-4-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-4-agent`

```css
@keyframes grid-dot-4-4-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-0-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-0-upDown`

```css
@keyframes grid-dot-0-0-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-0-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-0-upDown`

```css
@keyframes grid-dot-0-0-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-1-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-1-upDown`

```css
@keyframes grid-dot-0-1-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 1;
  }
  42.8571% {
    opacity: 1;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 1;
  }
  64.2857% {
    opacity: 1;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-1-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-1-upDown`

```css
@keyframes grid-dot-0-1-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 1;
  }
  42.8571% {
    opacity: 1;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 1;
  }
  64.2857% {
    opacity: 1;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-2-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-2-upDown`

```css
@keyframes grid-dot-0-2-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  42.8571% {
    opacity: 1;
  }
  42.8571% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  57.1429% {
    opacity: 1;
  }
  57.1429% {
    opacity: 1;
  }
  64.2857% {
    opacity: 1;
  }
  64.2857% {
    opacity: 1;
  }
  71.4286% {
    opacity: 1;
  }
  71.4286% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-2-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-2-upDown`

```css
@keyframes grid-dot-0-2-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  42.8571% {
    opacity: 1;
  }
  42.8571% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  57.1429% {
    opacity: 1;
  }
  57.1429% {
    opacity: 1;
  }
  64.2857% {
    opacity: 1;
  }
  64.2857% {
    opacity: 1;
  }
  71.4286% {
    opacity: 1;
  }
  71.4286% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-3-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-3-upDown`

```css
@keyframes grid-dot-0-3-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 1;
  }
  42.8571% {
    opacity: 1;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 1;
  }
  64.2857% {
    opacity: 1;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-3-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-3-upDown`

```css
@keyframes grid-dot-0-3-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 1;
  }
  42.8571% {
    opacity: 1;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 1;
  }
  64.2857% {
    opacity: 1;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-4-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-4-upDown`

```css
@keyframes grid-dot-0-4-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-4-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-4-upDown`

```css
@keyframes grid-dot-0-4-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-0-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-0-upDown`

```css
@keyframes grid-dot-1-0-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-0-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-0-upDown`

```css
@keyframes grid-dot-1-0-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-1-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-1-upDown`

```css
@keyframes grid-dot-1-1-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 1;
  }
  71.4286% {
    opacity: 1;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-1-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-1-upDown`

```css
@keyframes grid-dot-1-1-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 1;
  }
  71.4286% {
    opacity: 1;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-2-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-2-upDown`

```css
@keyframes grid-dot-1-2-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  42.8571% {
    opacity: 1;
  }
  42.8571% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 1;
  }
  64.2857% {
    opacity: 1;
  }
  64.2857% {
    opacity: 1;
  }
  71.4286% {
    opacity: 1;
  }
  71.4286% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-2-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-2-upDown`

```css
@keyframes grid-dot-1-2-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  42.8571% {
    opacity: 1;
  }
  42.8571% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 1;
  }
  64.2857% {
    opacity: 1;
  }
  64.2857% {
    opacity: 1;
  }
  71.4286% {
    opacity: 1;
  }
  71.4286% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-3-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-3-upDown`

```css
@keyframes grid-dot-1-3-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 1;
  }
  71.4286% {
    opacity: 1;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-3-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-3-upDown`

```css
@keyframes grid-dot-1-3-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 1;
  }
  71.4286% {
    opacity: 1;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-4-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-4-upDown`

```css
@keyframes grid-dot-1-4-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-4-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-4-upDown`

```css
@keyframes grid-dot-1-4-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-0-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-0-upDown`

```css
@keyframes grid-dot-2-0-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-0-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-0-upDown`

```css
@keyframes grid-dot-2-0-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-1-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-1-upDown`

```css
@keyframes grid-dot-2-1-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-1-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-1-upDown`

```css
@keyframes grid-dot-2-1-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-2-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-2-upDown`

```css
@keyframes grid-dot-2-2-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 1;
  }
  21.4286% {
    opacity: 1;
  }
  21.4286% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  42.8571% {
    opacity: 1;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 1;
  }
  71.4286% {
    opacity: 1;
  }
  71.4286% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  92.8571% {
    opacity: 1;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-2-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-2-upDown`

```css
@keyframes grid-dot-2-2-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 1;
  }
  21.4286% {
    opacity: 1;
  }
  21.4286% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  42.8571% {
    opacity: 1;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 1;
  }
  71.4286% {
    opacity: 1;
  }
  71.4286% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  92.8571% {
    opacity: 1;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-3-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-3-upDown`

```css
@keyframes grid-dot-2-3-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-3-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-3-upDown`

```css
@keyframes grid-dot-2-3-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-4-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-4-upDown`

```css
@keyframes grid-dot-2-4-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-4-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-4-upDown`

```css
@keyframes grid-dot-2-4-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-0-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-0-upDown`

```css
@keyframes grid-dot-3-0-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-0-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-0-upDown`

```css
@keyframes grid-dot-3-0-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-1-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-1-upDown`

```css
@keyframes grid-dot-3-1-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 1;
  }
  21.4286% {
    opacity: 1;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-1-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-1-upDown`

```css
@keyframes grid-dot-3-1-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 1;
  }
  21.4286% {
    opacity: 1;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-2-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-2-upDown`

```css
@keyframes grid-dot-3-2-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 1;
  }
  14.2857% {
    opacity: 1;
  }
  14.2857% {
    opacity: 1;
  }
  21.4286% {
    opacity: 1;
  }
  21.4286% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  92.8571% {
    opacity: 1;
  }
  92.8571% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-2-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-2-upDown`

```css
@keyframes grid-dot-3-2-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 1;
  }
  14.2857% {
    opacity: 1;
  }
  14.2857% {
    opacity: 1;
  }
  21.4286% {
    opacity: 1;
  }
  21.4286% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  92.8571% {
    opacity: 1;
  }
  92.8571% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-3-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-3-upDown`

```css
@keyframes grid-dot-3-3-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 1;
  }
  21.4286% {
    opacity: 1;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-3-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-3-upDown`

```css
@keyframes grid-dot-3-3-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 1;
  }
  21.4286% {
    opacity: 1;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-4-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-4-upDown`

```css
@keyframes grid-dot-3-4-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-4-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-4-upDown`

```css
@keyframes grid-dot-3-4-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-0-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-0-upDown`

```css
@keyframes grid-dot-4-0-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-0-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-0-upDown`

```css
@keyframes grid-dot-4-0-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-1-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-1-upDown`

```css
@keyframes grid-dot-4-1-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 1;
  }
  14.2857% {
    opacity: 1;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 1;
  }
  92.8571% {
    opacity: 1;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-1-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-1-upDown`

```css
@keyframes grid-dot-4-1-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 1;
  }
  14.2857% {
    opacity: 1;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 1;
  }
  92.8571% {
    opacity: 1;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-2-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-2-upDown`

```css
@keyframes grid-dot-4-2-upDown {
  0% {
    opacity: 1;
  }
  7.14286% {
    opacity: 1;
  }
  7.14286% {
    opacity: 1;
  }
  14.2857% {
    opacity: 1;
  }
  14.2857% {
    opacity: 1;
  }
  21.4286% {
    opacity: 1;
  }
  21.4286% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  92.8571% {
    opacity: 1;
  }
  92.8571% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-2-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-2-upDown`

```css
@keyframes grid-dot-4-2-upDown {
  0% {
    opacity: 1;
  }
  7.14286% {
    opacity: 1;
  }
  7.14286% {
    opacity: 1;
  }
  14.2857% {
    opacity: 1;
  }
  14.2857% {
    opacity: 1;
  }
  21.4286% {
    opacity: 1;
  }
  21.4286% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  92.8571% {
    opacity: 1;
  }
  92.8571% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-3-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-3-upDown`

```css
@keyframes grid-dot-4-3-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 1;
  }
  14.2857% {
    opacity: 1;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 1;
  }
  92.8571% {
    opacity: 1;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-3-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-3-upDown`

```css
@keyframes grid-dot-4-3-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 1;
  }
  14.2857% {
    opacity: 1;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 1;
  }
  92.8571% {
    opacity: 1;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-4-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-4-upDown`

```css
@keyframes grid-dot-4-4-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-4-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-4-upDown`

```css
@keyframes grid-dot-4-4-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-0-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-0-pong`

```css
@keyframes grid-dot-0-0-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-0-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-0-pong`

```css
@keyframes grid-dot-0-0-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-1-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-1-pong`

```css
@keyframes grid-dot-0-1-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-1-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-1-pong`

```css
@keyframes grid-dot-0-1-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-2-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-2-pong`

```css
@keyframes grid-dot-0-2-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-2-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-2-pong`

```css
@keyframes grid-dot-0-2-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-3-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-3-pong`

```css
@keyframes grid-dot-0-3-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-3-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-3-pong`

```css
@keyframes grid-dot-0-3-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-4-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-4-pong`

```css
@keyframes grid-dot-0-4-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-4-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-4-pong`

```css
@keyframes grid-dot-0-4-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-0-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-0-pong`

```css
@keyframes grid-dot-1-0-pong {
  0% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-0-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-0-pong`

```css
@keyframes grid-dot-1-0-pong {
  0% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-1-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-1-pong`

```css
@keyframes grid-dot-1-1-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-1-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-1-pong`

```css
@keyframes grid-dot-1-1-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-2-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-2-pong`

```css
@keyframes grid-dot-1-2-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-2-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-2-pong`

```css
@keyframes grid-dot-1-2-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-3-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-3-pong`

```css
@keyframes grid-dot-1-3-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-3-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-3-pong`

```css
@keyframes grid-dot-1-3-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-4-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-4-pong`

```css
@keyframes grid-dot-1-4-pong {
  0% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-4-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-4-pong`

```css
@keyframes grid-dot-1-4-pong {
  0% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-0-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-0-pong`

```css
@keyframes grid-dot-2-0-pong {
  0% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-0-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-0-pong`

```css
@keyframes grid-dot-2-0-pong {
  0% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-1-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-1-pong`

```css
@keyframes grid-dot-2-1-pong {
  0% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-1-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-1-pong`

```css
@keyframes grid-dot-2-1-pong {
  0% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-2-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-2-pong`

```css
@keyframes grid-dot-2-2-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-2-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-2-pong`

```css
@keyframes grid-dot-2-2-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-3-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-3-pong`

```css
@keyframes grid-dot-2-3-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-3-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-3-pong`

```css
@keyframes grid-dot-2-3-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-4-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-4-pong`

```css
@keyframes grid-dot-2-4-pong {
  0% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-4-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-4-pong`

```css
@keyframes grid-dot-2-4-pong {
  0% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-0-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-0-pong`

```css
@keyframes grid-dot-3-0-pong {
  0% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-0-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-0-pong`

```css
@keyframes grid-dot-3-0-pong {
  0% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-1-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-1-pong`

```css
@keyframes grid-dot-3-1-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-1-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-1-pong`

```css
@keyframes grid-dot-3-1-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-2-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-2-pong`

```css
@keyframes grid-dot-3-2-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-2-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-2-pong`

```css
@keyframes grid-dot-3-2-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-3-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-3-pong`

```css
@keyframes grid-dot-3-3-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-3-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-3-pong`

```css
@keyframes grid-dot-3-3-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-4-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-4-pong`

```css
@keyframes grid-dot-3-4-pong {
  0% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-4-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-4-pong`

```css
@keyframes grid-dot-3-4-pong {
  0% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-0-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-0-pong`

```css
@keyframes grid-dot-4-0-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-0-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-0-pong`

```css
@keyframes grid-dot-4-0-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-1-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-1-pong`

```css
@keyframes grid-dot-4-1-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-1-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-1-pong`

```css
@keyframes grid-dot-4-1-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-2-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-2-pong`

```css
@keyframes grid-dot-4-2-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-2-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-2-pong`

```css
@keyframes grid-dot-4-2-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-3-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-3-pong`

```css
@keyframes grid-dot-4-3-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-3-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-3-pong`

```css
@keyframes grid-dot-4-3-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-4-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-4-pong`

```css
@keyframes grid-dot-4-4-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-4-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-4-pong`

```css
@keyframes grid-dot-4-4-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-0-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-0-agent`

```css
@keyframes grid-dot-0-0-agent {
  0% {
    opacity: 1;
  }
  6.25% {
    opacity: 1;
  }
  6.25% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-0-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-0-agent`

```css
@keyframes grid-dot-0-0-agent {
  0% {
    opacity: 1;
  }
  6.25% {
    opacity: 1;
  }
  6.25% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-1-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-1-agent`

```css
@keyframes grid-dot-0-1-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-1-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-1-agent`

```css
@keyframes grid-dot-0-1-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-2-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-2-agent`

```css
@keyframes grid-dot-0-2-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-2-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-2-agent`

```css
@keyframes grid-dot-0-2-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-3-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-3-agent`

```css
@keyframes grid-dot-0-3-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-3-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-3-agent`

```css
@keyframes grid-dot-0-3-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-4-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-4-agent`

```css
@keyframes grid-dot-0-4-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-4-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-4-agent`

```css
@keyframes grid-dot-0-4-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-0-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-0-agent`

```css
@keyframes grid-dot-1-0-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-0-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-0-agent`

```css
@keyframes grid-dot-1-0-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-1-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-1-agent`

```css
@keyframes grid-dot-1-1-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-1-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-1-agent`

```css
@keyframes grid-dot-1-1-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-2-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-2-agent`

```css
@keyframes grid-dot-1-2-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-2-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-2-agent`

```css
@keyframes grid-dot-1-2-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-3-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-3-agent`

```css
@keyframes grid-dot-1-3-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-3-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-3-agent`

```css
@keyframes grid-dot-1-3-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-4-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-4-agent`

```css
@keyframes grid-dot-1-4-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-4-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-4-agent`

```css
@keyframes grid-dot-1-4-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-0-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-0-agent`

```css
@keyframes grid-dot-2-0-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-0-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-0-agent`

```css
@keyframes grid-dot-2-0-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-1-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-1-agent`

```css
@keyframes grid-dot-2-1-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-1-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-1-agent`

```css
@keyframes grid-dot-2-1-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-2-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-2-agent`

```css
@keyframes grid-dot-2-2-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-2-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-2-agent`

```css
@keyframes grid-dot-2-2-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-3-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-3-agent`

```css
@keyframes grid-dot-2-3-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-3-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-3-agent`

```css
@keyframes grid-dot-2-3-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-4-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-4-agent`

```css
@keyframes grid-dot-2-4-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-4-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-4-agent`

```css
@keyframes grid-dot-2-4-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-0-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-0-agent`

```css
@keyframes grid-dot-3-0-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-0-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-0-agent`

```css
@keyframes grid-dot-3-0-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-1-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-1-agent`

```css
@keyframes grid-dot-3-1-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-1-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-1-agent`

```css
@keyframes grid-dot-3-1-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-2-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-2-agent`

```css
@keyframes grid-dot-3-2-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-2-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-2-agent`

```css
@keyframes grid-dot-3-2-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-3-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-3-agent`

```css
@keyframes grid-dot-3-3-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-3-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-3-agent`

```css
@keyframes grid-dot-3-3-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-4-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-4-agent`

```css
@keyframes grid-dot-3-4-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-4-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-4-agent`

```css
@keyframes grid-dot-3-4-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-0-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-0-agent`

```css
@keyframes grid-dot-4-0-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-0-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-0-agent`

```css
@keyframes grid-dot-4-0-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-1-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-1-agent`

```css
@keyframes grid-dot-4-1-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-1-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-1-agent`

```css
@keyframes grid-dot-4-1-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-2-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-2-agent`

```css
@keyframes grid-dot-4-2-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-2-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-2-agent`

```css
@keyframes grid-dot-4-2-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-3-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-3-agent`

```css
@keyframes grid-dot-4-3-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-3-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-3-agent`

```css
@keyframes grid-dot-4-3-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-4-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-4-agent`

```css
@keyframes grid-dot-4-4-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-4-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-4-agent`

```css
@keyframes grid-dot-4-4-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-0-empty-once`

Duration: `200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.grid-dot-0-0-empty-once`

```css
@keyframes grid-dot-0-0-empty-once {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-0-empty-once`

Duration: `200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.grid-dot-0-0-empty-once`

```css
@keyframes grid-dot-0-0-empty-once {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-1-empty-once`

Duration: `200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.grid-dot-0-1-empty-once`

```css
@keyframes grid-dot-0-1-empty-once {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-1-empty-once`

Duration: `200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.grid-dot-0-1-empty-once`

```css
@keyframes grid-dot-0-1-empty-once {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-2-empty-once`

Duration: `200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.grid-dot-0-2-empty-once`

```css
@keyframes grid-dot-0-2-empty-once {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-2-empty-once`

Duration: `200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.grid-dot-0-2-empty-once`

```css
@keyframes grid-dot-0-2-empty-once {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-3-empty-once`

Duration: `200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.grid-dot-0-3-empty-once`

```css
@keyframes grid-dot-0-3-empty-once {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-3-empty-once`

Duration: `200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.grid-dot-0-3-empty-once`

```css
@keyframes grid-dot-0-3-empty-once {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-4-empty-once`

Duration: `200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.grid-dot-0-4-empty-once`

```css
@keyframes grid-dot-0-4-empty-once {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-4-empty-once`

Duration: `200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.grid-dot-0-4-empty-once`

```css
@keyframes grid-dot-0-4-empty-once {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-0-empty-once`

Duration: `200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.grid-dot-1-0-empty-once`

```css
@keyframes grid-dot-1-0-empty-once {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-0-empty-once`

Duration: `200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.grid-dot-1-0-empty-once`

```css
@keyframes grid-dot-1-0-empty-once {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-1-empty-once`

Duration: `200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.grid-dot-1-1-empty-once`

```css
@keyframes grid-dot-1-1-empty-once {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-1-empty-once`

Duration: `200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.grid-dot-1-1-empty-once`

```css
@keyframes grid-dot-1-1-empty-once {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-2-empty-once`

Duration: `200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.grid-dot-1-2-empty-once`

```css
@keyframes grid-dot-1-2-empty-once {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-2-empty-once`

Duration: `200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.grid-dot-1-2-empty-once`

```css
@keyframes grid-dot-1-2-empty-once {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-3-empty-once`

Duration: `200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.grid-dot-1-3-empty-once`

```css
@keyframes grid-dot-1-3-empty-once {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-3-empty-once`

Duration: `200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.grid-dot-1-3-empty-once`

```css
@keyframes grid-dot-1-3-empty-once {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-4-empty-once`

Duration: `200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.grid-dot-1-4-empty-once`

```css
@keyframes grid-dot-1-4-empty-once {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-4-empty-once`

Duration: `200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.grid-dot-1-4-empty-once`

```css
@keyframes grid-dot-1-4-empty-once {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-0-empty-once`

Duration: `200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.grid-dot-2-0-empty-once`

```css
@keyframes grid-dot-2-0-empty-once {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-0-empty-once`

Duration: `200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.grid-dot-2-0-empty-once`

```css
@keyframes grid-dot-2-0-empty-once {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-1-empty-once`

Duration: `200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.grid-dot-2-1-empty-once`

```css
@keyframes grid-dot-2-1-empty-once {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-1-empty-once`

Duration: `200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.grid-dot-2-1-empty-once`

```css
@keyframes grid-dot-2-1-empty-once {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-2-empty-once`

Duration: `200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.grid-dot-2-2-empty-once`

```css
@keyframes grid-dot-2-2-empty-once {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-2-empty-once`

Duration: `200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.grid-dot-2-2-empty-once`

```css
@keyframes grid-dot-2-2-empty-once {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-3-empty-once`

Duration: `200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.grid-dot-2-3-empty-once`

```css
@keyframes grid-dot-2-3-empty-once {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-3-empty-once`

Duration: `200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.grid-dot-2-3-empty-once`

```css
@keyframes grid-dot-2-3-empty-once {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-4-empty-once`

Duration: `200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.grid-dot-2-4-empty-once`

```css
@keyframes grid-dot-2-4-empty-once {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-4-empty-once`

Duration: `200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.grid-dot-2-4-empty-once`

```css
@keyframes grid-dot-2-4-empty-once {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-0-empty-once`

Duration: `200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.grid-dot-3-0-empty-once`

```css
@keyframes grid-dot-3-0-empty-once {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-0-empty-once`

Duration: `200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.grid-dot-3-0-empty-once`

```css
@keyframes grid-dot-3-0-empty-once {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-1-empty-once`

Duration: `200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.grid-dot-3-1-empty-once`

```css
@keyframes grid-dot-3-1-empty-once {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-1-empty-once`

Duration: `200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.grid-dot-3-1-empty-once`

```css
@keyframes grid-dot-3-1-empty-once {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-2-empty-once`

Duration: `200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.grid-dot-3-2-empty-once`

```css
@keyframes grid-dot-3-2-empty-once {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-2-empty-once`

Duration: `200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.grid-dot-3-2-empty-once`

```css
@keyframes grid-dot-3-2-empty-once {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-3-empty-once`

Duration: `200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.grid-dot-3-3-empty-once`

```css
@keyframes grid-dot-3-3-empty-once {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-3-empty-once`

Duration: `200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.grid-dot-3-3-empty-once`

```css
@keyframes grid-dot-3-3-empty-once {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-4-empty-once`

Duration: `200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.grid-dot-3-4-empty-once`

```css
@keyframes grid-dot-3-4-empty-once {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-4-empty-once`

Duration: `200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.grid-dot-3-4-empty-once`

```css
@keyframes grid-dot-3-4-empty-once {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-0-empty-once`

Duration: `200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.grid-dot-4-0-empty-once`

```css
@keyframes grid-dot-4-0-empty-once {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-0-empty-once`

Duration: `200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.grid-dot-4-0-empty-once`

```css
@keyframes grid-dot-4-0-empty-once {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-1-empty-once`

Duration: `200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.grid-dot-4-1-empty-once`

```css
@keyframes grid-dot-4-1-empty-once {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-1-empty-once`

Duration: `200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.grid-dot-4-1-empty-once`

```css
@keyframes grid-dot-4-1-empty-once {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-2-empty-once`

Duration: `200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.grid-dot-4-2-empty-once`

```css
@keyframes grid-dot-4-2-empty-once {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-2-empty-once`

Duration: `200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.grid-dot-4-2-empty-once`

```css
@keyframes grid-dot-4-2-empty-once {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-3-empty-once`

Duration: `200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.grid-dot-4-3-empty-once`

```css
@keyframes grid-dot-4-3-empty-once {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-3-empty-once`

Duration: `200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.grid-dot-4-3-empty-once`

```css
@keyframes grid-dot-4-3-empty-once {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-4-empty-once`

Duration: `200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.grid-dot-4-4-empty-once`

```css
@keyframes grid-dot-4-4-empty-once {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-4-empty-once`

Duration: `200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.grid-dot-4-4-empty-once`

```css
@keyframes grid-dot-4-4-empty-once {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-0-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-0-agent`

```css
@keyframes grid-dot-0-0-agent {
  0% {
    opacity: 1;
  }
  6.25% {
    opacity: 1;
  }
  6.25% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-1-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-1-agent`

```css
@keyframes grid-dot-0-1-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-2-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-2-agent`

```css
@keyframes grid-dot-0-2-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-3-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-3-agent`

```css
@keyframes grid-dot-0-3-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-4-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-4-agent`

```css
@keyframes grid-dot-0-4-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-0-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-0-agent`

```css
@keyframes grid-dot-1-0-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-1-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-1-agent`

```css
@keyframes grid-dot-1-1-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-2-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-2-agent`

```css
@keyframes grid-dot-1-2-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-3-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-3-agent`

```css
@keyframes grid-dot-1-3-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-4-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-4-agent`

```css
@keyframes grid-dot-1-4-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-0-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-0-agent`

```css
@keyframes grid-dot-2-0-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-1-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-1-agent`

```css
@keyframes grid-dot-2-1-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-2-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-2-agent`

```css
@keyframes grid-dot-2-2-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-3-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-3-agent`

```css
@keyframes grid-dot-2-3-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-4-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-4-agent`

```css
@keyframes grid-dot-2-4-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-0-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-0-agent`

```css
@keyframes grid-dot-3-0-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-1-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-1-agent`

```css
@keyframes grid-dot-3-1-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-2-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-2-agent`

```css
@keyframes grid-dot-3-2-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-3-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-3-agent`

```css
@keyframes grid-dot-3-3-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-4-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-4-agent`

```css
@keyframes grid-dot-3-4-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-0-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-0-agent`

```css
@keyframes grid-dot-4-0-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-1-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-1-agent`

```css
@keyframes grid-dot-4-1-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-2-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-2-agent`

```css
@keyframes grid-dot-4-2-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-3-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-3-agent`

```css
@keyframes grid-dot-4-3-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-4-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-4-agent`

```css
@keyframes grid-dot-4-4-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-0-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-0-upDown`

```css
@keyframes grid-dot-0-0-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-1-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-1-upDown`

```css
@keyframes grid-dot-0-1-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 1;
  }
  42.8571% {
    opacity: 1;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 1;
  }
  64.2857% {
    opacity: 1;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-2-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-2-upDown`

```css
@keyframes grid-dot-0-2-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  42.8571% {
    opacity: 1;
  }
  42.8571% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  57.1429% {
    opacity: 1;
  }
  57.1429% {
    opacity: 1;
  }
  64.2857% {
    opacity: 1;
  }
  64.2857% {
    opacity: 1;
  }
  71.4286% {
    opacity: 1;
  }
  71.4286% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-3-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-3-upDown`

```css
@keyframes grid-dot-0-3-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 1;
  }
  42.8571% {
    opacity: 1;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 1;
  }
  64.2857% {
    opacity: 1;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-4-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-4-upDown`

```css
@keyframes grid-dot-0-4-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-0-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-0-upDown`

```css
@keyframes grid-dot-1-0-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-1-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-1-upDown`

```css
@keyframes grid-dot-1-1-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 1;
  }
  71.4286% {
    opacity: 1;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-2-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-2-upDown`

```css
@keyframes grid-dot-1-2-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  42.8571% {
    opacity: 1;
  }
  42.8571% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 1;
  }
  64.2857% {
    opacity: 1;
  }
  64.2857% {
    opacity: 1;
  }
  71.4286% {
    opacity: 1;
  }
  71.4286% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-3-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-3-upDown`

```css
@keyframes grid-dot-1-3-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 1;
  }
  71.4286% {
    opacity: 1;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-4-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-4-upDown`

```css
@keyframes grid-dot-1-4-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-0-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-0-upDown`

```css
@keyframes grid-dot-2-0-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-1-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-1-upDown`

```css
@keyframes grid-dot-2-1-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-2-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-2-upDown`

```css
@keyframes grid-dot-2-2-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 1;
  }
  21.4286% {
    opacity: 1;
  }
  21.4286% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  42.8571% {
    opacity: 1;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 1;
  }
  71.4286% {
    opacity: 1;
  }
  71.4286% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  92.8571% {
    opacity: 1;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-3-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-3-upDown`

```css
@keyframes grid-dot-2-3-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-4-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-4-upDown`

```css
@keyframes grid-dot-2-4-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-0-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-0-upDown`

```css
@keyframes grid-dot-3-0-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-1-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-1-upDown`

```css
@keyframes grid-dot-3-1-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 1;
  }
  21.4286% {
    opacity: 1;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-2-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-2-upDown`

```css
@keyframes grid-dot-3-2-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 1;
  }
  14.2857% {
    opacity: 1;
  }
  14.2857% {
    opacity: 1;
  }
  21.4286% {
    opacity: 1;
  }
  21.4286% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  92.8571% {
    opacity: 1;
  }
  92.8571% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-3-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-3-upDown`

```css
@keyframes grid-dot-3-3-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 1;
  }
  21.4286% {
    opacity: 1;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-4-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-4-upDown`

```css
@keyframes grid-dot-3-4-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-0-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-0-upDown`

```css
@keyframes grid-dot-4-0-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-1-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-1-upDown`

```css
@keyframes grid-dot-4-1-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 1;
  }
  14.2857% {
    opacity: 1;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 1;
  }
  92.8571% {
    opacity: 1;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-2-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-2-upDown`

```css
@keyframes grid-dot-4-2-upDown {
  0% {
    opacity: 1;
  }
  7.14286% {
    opacity: 1;
  }
  7.14286% {
    opacity: 1;
  }
  14.2857% {
    opacity: 1;
  }
  14.2857% {
    opacity: 1;
  }
  21.4286% {
    opacity: 1;
  }
  21.4286% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  92.8571% {
    opacity: 1;
  }
  92.8571% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-3-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-3-upDown`

```css
@keyframes grid-dot-4-3-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 1;
  }
  14.2857% {
    opacity: 1;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 1;
  }
  92.8571% {
    opacity: 1;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-4-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-4-upDown`

```css
@keyframes grid-dot-4-4-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-0-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-0-pong`

```css
@keyframes grid-dot-0-0-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-1-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-1-pong`

```css
@keyframes grid-dot-0-1-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-2-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-2-pong`

```css
@keyframes grid-dot-0-2-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-3-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-3-pong`

```css
@keyframes grid-dot-0-3-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-4-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-4-pong`

```css
@keyframes grid-dot-0-4-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-0-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-0-pong`

```css
@keyframes grid-dot-1-0-pong {
  0% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-1-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-1-pong`

```css
@keyframes grid-dot-1-1-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-2-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-2-pong`

```css
@keyframes grid-dot-1-2-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-3-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-3-pong`

```css
@keyframes grid-dot-1-3-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-4-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-4-pong`

```css
@keyframes grid-dot-1-4-pong {
  0% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-0-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-0-pong`

```css
@keyframes grid-dot-2-0-pong {
  0% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-1-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-1-pong`

```css
@keyframes grid-dot-2-1-pong {
  0% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-2-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-2-pong`

```css
@keyframes grid-dot-2-2-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-3-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-3-pong`

```css
@keyframes grid-dot-2-3-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-4-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-4-pong`

```css
@keyframes grid-dot-2-4-pong {
  0% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-0-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-0-pong`

```css
@keyframes grid-dot-3-0-pong {
  0% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-1-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-1-pong`

```css
@keyframes grid-dot-3-1-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-2-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-2-pong`

```css
@keyframes grid-dot-3-2-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-3-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-3-pong`

```css
@keyframes grid-dot-3-3-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-4-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-4-pong`

```css
@keyframes grid-dot-3-4-pong {
  0% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-0-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-0-pong`

```css
@keyframes grid-dot-4-0-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-1-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-1-pong`

```css
@keyframes grid-dot-4-1-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-2-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-2-pong`

```css
@keyframes grid-dot-4-2-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-3-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-3-pong`

```css
@keyframes grid-dot-4-3-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-4-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-4-pong`

```css
@keyframes grid-dot-4-4-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-0-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-0-agent`

```css
@keyframes grid-dot-0-0-agent {
  0% {
    opacity: 1;
  }
  6.25% {
    opacity: 1;
  }
  6.25% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-1-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-1-agent`

```css
@keyframes grid-dot-0-1-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-2-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-2-agent`

```css
@keyframes grid-dot-0-2-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-3-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-3-agent`

```css
@keyframes grid-dot-0-3-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-4-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-4-agent`

```css
@keyframes grid-dot-0-4-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-0-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-0-agent`

```css
@keyframes grid-dot-1-0-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-1-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-1-agent`

```css
@keyframes grid-dot-1-1-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-2-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-2-agent`

```css
@keyframes grid-dot-1-2-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-3-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-3-agent`

```css
@keyframes grid-dot-1-3-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-4-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-4-agent`

```css
@keyframes grid-dot-1-4-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-0-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-0-agent`

```css
@keyframes grid-dot-2-0-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-1-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-1-agent`

```css
@keyframes grid-dot-2-1-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-2-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-2-agent`

```css
@keyframes grid-dot-2-2-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-3-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-3-agent`

```css
@keyframes grid-dot-2-3-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-4-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-4-agent`

```css
@keyframes grid-dot-2-4-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-0-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-0-agent`

```css
@keyframes grid-dot-3-0-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-1-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-1-agent`

```css
@keyframes grid-dot-3-1-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-2-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-2-agent`

```css
@keyframes grid-dot-3-2-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-3-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-3-agent`

```css
@keyframes grid-dot-3-3-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-4-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-4-agent`

```css
@keyframes grid-dot-3-4-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-0-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-0-agent`

```css
@keyframes grid-dot-4-0-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-1-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-1-agent`

```css
@keyframes grid-dot-4-1-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-2-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-2-agent`

```css
@keyframes grid-dot-4-2-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-3-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-3-agent`

```css
@keyframes grid-dot-4-3-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-4-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-4-agent`

```css
@keyframes grid-dot-4-4-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-0-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-0-upDown`

```css
@keyframes grid-dot-0-0-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-1-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-1-upDown`

```css
@keyframes grid-dot-0-1-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 1;
  }
  42.8571% {
    opacity: 1;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 1;
  }
  64.2857% {
    opacity: 1;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-2-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-2-upDown`

```css
@keyframes grid-dot-0-2-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  42.8571% {
    opacity: 1;
  }
  42.8571% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  57.1429% {
    opacity: 1;
  }
  57.1429% {
    opacity: 1;
  }
  64.2857% {
    opacity: 1;
  }
  64.2857% {
    opacity: 1;
  }
  71.4286% {
    opacity: 1;
  }
  71.4286% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-3-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-3-upDown`

```css
@keyframes grid-dot-0-3-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 1;
  }
  42.8571% {
    opacity: 1;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 1;
  }
  64.2857% {
    opacity: 1;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-4-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-4-upDown`

```css
@keyframes grid-dot-0-4-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-0-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-0-upDown`

```css
@keyframes grid-dot-1-0-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-1-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-1-upDown`

```css
@keyframes grid-dot-1-1-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 1;
  }
  71.4286% {
    opacity: 1;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-2-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-2-upDown`

```css
@keyframes grid-dot-1-2-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  42.8571% {
    opacity: 1;
  }
  42.8571% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 1;
  }
  64.2857% {
    opacity: 1;
  }
  64.2857% {
    opacity: 1;
  }
  71.4286% {
    opacity: 1;
  }
  71.4286% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-3-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-3-upDown`

```css
@keyframes grid-dot-1-3-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 1;
  }
  71.4286% {
    opacity: 1;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-4-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-4-upDown`

```css
@keyframes grid-dot-1-4-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-0-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-0-upDown`

```css
@keyframes grid-dot-2-0-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-1-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-1-upDown`

```css
@keyframes grid-dot-2-1-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-2-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-2-upDown`

```css
@keyframes grid-dot-2-2-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 1;
  }
  21.4286% {
    opacity: 1;
  }
  21.4286% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  42.8571% {
    opacity: 1;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 1;
  }
  71.4286% {
    opacity: 1;
  }
  71.4286% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  92.8571% {
    opacity: 1;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-3-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-3-upDown`

```css
@keyframes grid-dot-2-3-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-4-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-4-upDown`

```css
@keyframes grid-dot-2-4-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-0-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-0-upDown`

```css
@keyframes grid-dot-3-0-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-1-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-1-upDown`

```css
@keyframes grid-dot-3-1-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 1;
  }
  21.4286% {
    opacity: 1;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-2-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-2-upDown`

```css
@keyframes grid-dot-3-2-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 1;
  }
  14.2857% {
    opacity: 1;
  }
  14.2857% {
    opacity: 1;
  }
  21.4286% {
    opacity: 1;
  }
  21.4286% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  35.7143% {
    opacity: 1;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  78.5714% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  92.8571% {
    opacity: 1;
  }
  92.8571% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-3-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-3-upDown`

```css
@keyframes grid-dot-3-3-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 1;
  }
  21.4286% {
    opacity: 1;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-4-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-4-upDown`

```css
@keyframes grid-dot-3-4-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-0-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-0-upDown`

```css
@keyframes grid-dot-4-0-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-1-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-1-upDown`

```css
@keyframes grid-dot-4-1-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 1;
  }
  14.2857% {
    opacity: 1;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 1;
  }
  92.8571% {
    opacity: 1;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-2-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-2-upDown`

```css
@keyframes grid-dot-4-2-upDown {
  0% {
    opacity: 1;
  }
  7.14286% {
    opacity: 1;
  }
  7.14286% {
    opacity: 1;
  }
  14.2857% {
    opacity: 1;
  }
  14.2857% {
    opacity: 1;
  }
  21.4286% {
    opacity: 1;
  }
  21.4286% {
    opacity: 1;
  }
  28.5714% {
    opacity: 1;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  85.7143% {
    opacity: 1;
  }
  92.8571% {
    opacity: 1;
  }
  92.8571% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-3-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-3-upDown`

```css
@keyframes grid-dot-4-3-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 1;
  }
  14.2857% {
    opacity: 1;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 1;
  }
  92.8571% {
    opacity: 1;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-4-upDown`

Duration: `2800ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-4-upDown`

```css
@keyframes grid-dot-4-4-upDown {
  0% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  7.14286% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  14.2857% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  21.4286% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  28.5714% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  35.7143% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  42.8571% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  57.1429% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  64.2857% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  71.4286% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  78.5714% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  85.7143% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  92.8571% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-0-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-0-pong`

```css
@keyframes grid-dot-0-0-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-1-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-1-pong`

```css
@keyframes grid-dot-0-1-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-2-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-2-pong`

```css
@keyframes grid-dot-0-2-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-3-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-3-pong`

```css
@keyframes grid-dot-0-3-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-4-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-4-pong`

```css
@keyframes grid-dot-0-4-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-0-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-0-pong`

```css
@keyframes grid-dot-1-0-pong {
  0% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-1-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-1-pong`

```css
@keyframes grid-dot-1-1-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-2-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-2-pong`

```css
@keyframes grid-dot-1-2-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-3-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-3-pong`

```css
@keyframes grid-dot-1-3-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-4-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-4-pong`

```css
@keyframes grid-dot-1-4-pong {
  0% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-0-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-0-pong`

```css
@keyframes grid-dot-2-0-pong {
  0% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-1-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-1-pong`

```css
@keyframes grid-dot-2-1-pong {
  0% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-2-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-2-pong`

```css
@keyframes grid-dot-2-2-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-3-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-3-pong`

```css
@keyframes grid-dot-2-3-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-4-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-4-pong`

```css
@keyframes grid-dot-2-4-pong {
  0% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-0-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-0-pong`

```css
@keyframes grid-dot-3-0-pong {
  0% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-1-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-1-pong`

```css
@keyframes grid-dot-3-1-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-2-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-2-pong`

```css
@keyframes grid-dot-3-2-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-3-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-3-pong`

```css
@keyframes grid-dot-3-3-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-4-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-4-pong`

```css
@keyframes grid-dot-3-4-pong {
  0% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-0-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-0-pong`

```css
@keyframes grid-dot-4-0-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-1-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-1-pong`

```css
@keyframes grid-dot-4-1-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-2-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-2-pong`

```css
@keyframes grid-dot-4-2-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-3-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-3-pong`

```css
@keyframes grid-dot-4-3-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-4-pong`

Duration: `1600ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-4-pong`

```css
@keyframes grid-dot-4-4-pong {
  0% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-0-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-0-agent`

```css
@keyframes grid-dot-0-0-agent {
  0% {
    opacity: 1;
  }
  6.25% {
    opacity: 1;
  }
  6.25% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-1-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-1-agent`

```css
@keyframes grid-dot-0-1-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-2-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-2-agent`

```css
@keyframes grid-dot-0-2-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-3-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-3-agent`

```css
@keyframes grid-dot-0-3-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-4-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-4-agent`

```css
@keyframes grid-dot-0-4-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-0-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-0-agent`

```css
@keyframes grid-dot-1-0-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-1-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-1-agent`

```css
@keyframes grid-dot-1-1-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-2-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-2-agent`

```css
@keyframes grid-dot-1-2-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-3-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-3-agent`

```css
@keyframes grid-dot-1-3-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-4-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-4-agent`

```css
@keyframes grid-dot-1-4-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-0-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-0-agent`

```css
@keyframes grid-dot-2-0-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-1-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-1-agent`

```css
@keyframes grid-dot-2-1-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-2-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-2-agent`

```css
@keyframes grid-dot-2-2-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-3-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-3-agent`

```css
@keyframes grid-dot-2-3-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-4-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-4-agent`

```css
@keyframes grid-dot-2-4-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-0-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-0-agent`

```css
@keyframes grid-dot-3-0-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-1-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-1-agent`

```css
@keyframes grid-dot-3-1-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-2-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-2-agent`

```css
@keyframes grid-dot-3-2-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-3-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-3-agent`

```css
@keyframes grid-dot-3-3-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-4-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-4-agent`

```css
@keyframes grid-dot-3-4-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-0-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-0-agent`

```css
@keyframes grid-dot-4-0-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-1-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-1-agent`

```css
@keyframes grid-dot-4-1-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-2-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-2-agent`

```css
@keyframes grid-dot-4-2-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-3-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-3-agent`

```css
@keyframes grid-dot-4-3-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-4-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-4-agent`

```css
@keyframes grid-dot-4-4-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-0-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-0-agent`

```css
@keyframes grid-dot-0-0-agent {
  0% {
    opacity: 1;
  }
  6.25% {
    opacity: 1;
  }
  6.25% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-1-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-1-agent`

```css
@keyframes grid-dot-0-1-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  12.5% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-2-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-2-agent`

```css
@keyframes grid-dot-0-2-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  18.75% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-3-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-3-agent`

```css
@keyframes grid-dot-0-3-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-0-4-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-0-4-agent`

```css
@keyframes grid-dot-0-4-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-0-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-0-agent`

```css
@keyframes grid-dot-1-0-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-1-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-1-agent`

```css
@keyframes grid-dot-1-1-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-2-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-2-agent`

```css
@keyframes grid-dot-1-2-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-3-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-3-agent`

```css
@keyframes grid-dot-1-3-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-1-4-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-1-4-agent`

```css
@keyframes grid-dot-1-4-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-0-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-0-agent`

```css
@keyframes grid-dot-2-0-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-1-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-1-agent`

```css
@keyframes grid-dot-2-1-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-2-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-2-agent`

```css
@keyframes grid-dot-2-2-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-3-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-3-agent`

```css
@keyframes grid-dot-2-3-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-2-4-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-2-4-agent`

```css
@keyframes grid-dot-2-4-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-0-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-0-agent`

```css
@keyframes grid-dot-3-0-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-1-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-1-agent`

```css
@keyframes grid-dot-3-1-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-2-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-2-agent`

```css
@keyframes grid-dot-3-2-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-3-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-3-agent`

```css
@keyframes grid-dot-3-3-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-3-4-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-3-4-agent`

```css
@keyframes grid-dot-3-4-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-0-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-0-agent`

```css
@keyframes grid-dot-4-0-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-1-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-1-agent`

```css
@keyframes grid-dot-4-1-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-2-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-2-agent`

```css
@keyframes grid-dot-4-2-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-3-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-3-agent`

```css
@keyframes grid-dot-4-3-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
```

> Opacity fade

### `@keyframes grid-dot-4-4-agent`

Duration: `3200ms` · Easing: `steps(1)` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.grid-dot-4-4-agent`

```css
@keyframes grid-dot-4-4-agent {
  0% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  6.25% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  12.5% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  18.75% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  31.25% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  37.5% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  43.75% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  56.25% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  62.5% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  68.75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  75% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  81.25% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  87.5% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  93.75% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.3;
  }
}
```

> Opacity fade

### `@keyframes swipe-out-left`

Used by: `[data-sonner-toast][data-swipe-out="true"][data-swipe-direction="left"]`

```css
@keyframes swipe-out-left {
  0% {
    transform: var(--y) translateX(var(--swipe-amount-x));
    opacity: 1;
  }
  100% {
    transform: var(--y) translateX(calc(var(--swipe-amount-x) - 100%));
    opacity: 0;
  }
}
```

> Fade + motion enter animation

### `@keyframes swipe-out-right`

Used by: `[data-sonner-toast][data-swipe-out="true"][data-swipe-direction="right"]`

```css
@keyframes swipe-out-right {
  0% {
    transform: var(--y) translateX(var(--swipe-amount-x));
    opacity: 1;
  }
  100% {
    transform: var(--y) translateX(calc(var(--swipe-amount-x) + 100%));
    opacity: 0;
  }
}
```

> Fade + motion enter animation

### `@keyframes swipe-out-up`

Used by: `[data-sonner-toast][data-swipe-out="true"][data-swipe-direction="up"]`

```css
@keyframes swipe-out-up {
  0% {
    transform: var(--y) translateY(var(--swipe-amount-y));
    opacity: 1;
  }
  100% {
    transform: var(--y) translateY(calc(var(--swipe-amount-y) - 100%));
    opacity: 0;
  }
}
```

> Fade + motion enter animation

### `@keyframes swipe-out-down`

Used by: `[data-sonner-toast][data-swipe-out="true"][data-swipe-direction="down"]`

```css
@keyframes swipe-out-down {
  0% {
    transform: var(--y) translateY(var(--swipe-amount-y));
    opacity: 1;
  }
  100% {
    transform: var(--y) translateY(calc(var(--swipe-amount-y) + 100%));
    opacity: 0;
  }
}
```

> Fade + motion enter animation

### `@keyframes sonner-fade-in`

Duration: `0.3s` · Easing: `ease` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `[data-sonner-toast][data-promise="true"] [data-icon] > svg`

```css
@keyframes sonner-fade-in {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
```

> Fade + motion enter animation

### `@keyframes sonner-fade-out`

Duration: `0.2s` · Easing: `ease` · Delay: `0s` · Iteration: `1` · Fill: `forwards`

Used by: `.sonner-loading-wrapper[data-visible="false"]`

```css
@keyframes sonner-fade-out {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.8);
  }
}
```

> Fade + motion enter animation

### `@keyframes sonner-spin`

Duration: `1.2s` · Easing: `linear` · Delay: `0s` · Iteration: `infinite` · Fill: `none`

Used by: `.sonner-loading-bar`

```css
@keyframes sonner-spin {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.15;
  }
}
```

> Opacity fade

## Motion Tokens (CSS Variables)

### Duration Tokens

```css
--speed-highlightFadeOut: 0.15s;
--speed-quickTransition: 0.1s;
--speed-highlightFadeIn: 0s;
--speed-regularTransition: 0.25s;
```

### Easing Tokens

```css
--ease-in-out-quart: cubic-bezier(0.77,0,0.175,1);
--ease-in-out-circ: cubic-bezier(0.785,0.135,0.15,0.86);
--ease-out-circ: cubic-bezier(0.075,0.82,0.165,1);
--ease-out-quint: cubic-bezier(0.23,1,0.32,1);
--ease-in-quint: cubic-bezier(0.755,0.05,0.855,0.06);
--ease-out-expo: cubic-bezier(0.19,1,0.22,1);
--ease-in-out-quad: cubic-bezier(0.455,0.03,0.515,0.955);
--ease-in-expo: cubic-bezier(0.95,0.05,0.795,0.035);
--ease-in-cubic: cubic-bezier(0.55,0.055,0.675,0.19);
--mask-ease: rgba(0,0,0,0.2);
--ease-out-quad: cubic-bezier(0.25,0.46,0.45,0.94);
--ease-out-quart: cubic-bezier(0.165,0.84,0.44,1);
--ease-in-circ: cubic-bezier(0.6,0.04,0.98,0.335);
--ease-in-out-cubic: cubic-bezier(0.645,0.045,0.355,1);
--ease-in-quart: cubic-bezier(0.895,0.03,0.685,0.22);
--ease-in-out-quint: cubic-bezier(0.86,0,0.07,1);
--ease-in-out-expo: cubic-bezier(1,0,0,1);
--ease-in-quad: cubic-bezier(0.55,0.085,0.68,0.53);
--ease-out-cubic: cubic-bezier(0.215,0.61,0.355,1);
```

## Global Transition Declarations

These `transition` values were extracted from CSS rules across the site:

```css
transition: transform 0.4s;
transition: transform 0.4s, opacity 0.4s, height 0.4s, box-shadow 0.2s;
transition: opacity 0.4s, box-shadow 0.2s;
transition: opacity 0.1s, background 0.2s, border-color 0.2s;
transition: opacity 0.4s;
transition: transform 0.5s, opacity 0.2s;
transition: opacity 0.2s, transform 0.2s;
```

## How to Recreate This Motion Design

### Step 1 — Install Dependencies

```bash
```

### Step 2 — Scroll-Reveal Pattern

Elements that animate into view follow this pattern:

```css
/* Initial hidden state */
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.15s cubic-bezier(0.77,0,0.175,1),
              transform 0.15s cubic-bezier(0.77,0,0.175,1);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

### Step 3 — Key Motion Principles

- **Duration scale:** `0.15s` · `0.1s` · `0s` · `0.25s` · `0.4s` · `0.2s` — use these values, never invent new durations
- **Always add** `@media (prefers-reduced-motion: reduce) { * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }`

### Step 4 — Scroll Journey Reference

Match what happens at each scroll position:

- **0%** (`0px`) → `screens/scroll/scroll-000.png`
- **17%** (`1680px`) → `screens/scroll/scroll-017.png`
- **33%** (`3261px`) → `screens/scroll/scroll-033.png`
- **50%** (`4941px`) → `screens/scroll/scroll-050.png`
- **67%** (`6620px`) → `screens/scroll/scroll-067.png`
- **83%** (`8201px`) → `screens/scroll/scroll-083.png`
- **100%** (`9881px`) → `screens/scroll/scroll-100.png`

## Layout & Grid (LAYOUT.md)

# Layout Reference

> Auto-extracted from live DOM. Use this to understand how the site is structured spatially.

## Spacing System

**Base grid:** 4px

**Scale:** `2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30` px

| Spacing | Semantic Use |
|---------|-------------|
| 4px | Tight — within a component |
| 8px | Medium — between sibling items |
| 16px | Wide — between sections |
| 32px | Vast — major section breaks |

## Flex Layouts

| Element | Direction | Justify | Align | Gap | Children |
|---------|-----------|---------|-------|-----|----------|
| `div.Layout_container__BVtmP.page_root__EA6JT` | column | — | — | — | 3 |
| `main.Layout_content__PrPCk` | column | — | — | — | 2 |
| `nav.Header_menuRoot__tJRFd` | row | — | center | — | 1 |
| `section.CTA_homepagePrefooter__FWdih` | column | center | center | 40px | 2 |
| `div.Flex_root__DOQCW.Flex_column__eg2kV` | column | — | — | 8px | 2 |
| `div.Flex_root__DOQCW.Flex_column__eg2kV` | column | — | — | 8px | 2 |
| `div.Flex_root__DOQCW.Flex_column__eg2kV` | column | — | — | 8px | 2 |
| `header.Plan_initiativesBoxHeader__BpkZm` | row | — | center | — | 1 |
| `header.SlackIssue_header__NtjDx.utils_bottomGradientBorder__` | row | space-between | center | — | 2 |
| `div.Flex_root__DOQCW.Flex_column__eg2kV` | column | — | — | — | 5 |
| `div.Flex_root__DOQCW.Flex_column__eg2kV` | column | — | — | — | 5 |
| `div.Flex_root__DOQCW.Flex_column__eg2kV` | column | — | — | — | 5 |
| `div.Flex_root__DOQCW.Flex_column__eg2kV` | column | — | — | — | 5 |
| `div.CustomerQuotes_authorInfoDesktop__0fP9Y.Flex_root__DOQCW` | column | — | — | — | 2 |
| `header.Build_header__OAL8V` | row | space-between | center | — | 2 |

## Grid Layouts

| Element | Template Columns | Gap | Children |
|---------|-----------------|-----|----------|
| `div.page_panel__h_tIJ.Monitor_grid__a9Cqx` | `680px 680px` | 16px | 3 |

## Structural Containers

### `<main>` (`main.Layout_content__PrPCk`)

```
display:          flex
flex-direction:   column
justify-content:  —
align-items:      —
padding:          72px 0px 0px
children:         2
```

### `<footer>` (`footer.Footer_footer__lJt10`)

```
display:          block
max-width:        100%
children:         1
```

### `<header>` (`header.Header_header__hfMjL`)

```
display:          block
children:         1
```

### `<nav>` (`nav.Header_menuRoot__tJRFd`)

```
display:          flex
flex-direction:   row
justify-content:  —
align-items:      center
children:         1
```

### `<section>` (`section.PageSection_root__kFVv1.PageSection_rootHomepage__2x`)

```
display:          block
padding:          96px 0px 128px
children:         3
```

### `<section>` (`section.PageSection_root__kFVv1.PageSection_rootHomepage__2x`)

```
display:          block
padding:          96px 0px 128px
children:         3
```

### `<section>` (`section.PageSection_root__kFVv1.PageSection_rootHomepage__2x`)

```
display:          block
padding:          96px 0px 128px
children:         3
```

### `<section>` (`section.PageSection_root__kFVv1.PageSection_rootHomepage__2x`)

```
display:          block
padding:          96px 0px 128px
children:         2
```

### `<section>` (`section.PageSection_root__kFVv1.PageSection_rootHomepage__2x`)

```
display:          block
padding:          96px 0px 128px
children:         3
```

### `<section>` (`section#customers.CustomerQuotes_container__Grlfj.hide-lapto`)

```
display:          block
children:         3
```

### `<section>` (`section.CTA_homepagePrefooter__FWdih`)

```
display:          flex
flex-direction:   column
justify-content:  center
align-items:      center
gap:              40px
children:         2
```

### `<header>` (`header.Plan_initiativesBoxHeader__BpkZm`)

```
display:          flex
flex-direction:   row
justify-content:  —
align-items:      center
padding:          0px 24px
children:         1
```

## Layout Rules

- **Container max-width:** `100%` — always center with `margin: auto`
- Primary layout system: **Flexbox**
- Secondary layout system: **CSS Grid** (used for card grids and multi-column layouts)
- Every spacing value must be a multiple of **4px**
- Never use arbitrary margin/padding values outside the spacing scale

## Component Patterns (COMPONENTS.md)

# Component Reference

> Repeated DOM patterns detected by structural analysis. Each component appeared 3+ times.

## Detected Components

| Component | Category | Instances | Key Classes |
|-----------|----------|-----------|-------------|
| **Sidebar NavItem  VdR H** | card | 11× | `.Sidebar_navItem__vdR_h` |
| **Flex Root  DOQCW** | unknown | 7× | `.Flex_root__DOQCW` |
| **Grain GrainSubtle  LzX Q** | unknown | 6× | `.Grain_grainSubtle__LzX_q`, `.Grain_grain__0LR5u` |
| **Flex Align Center  OXK9F** | unknown | 6× | `.Flex_align-center__oXK9F`, `.Flex_root__DOQCW` |
| **Logos Item  Pm5vq** | card | 6× | `.Logos_item__pm5vq` |
| **Header Anchor  CTwdv** | unknown | 5× | `.Header_anchor__CTwdv`, `.Link_root__cNtak` |
| **PageSection Header  3JdVh** | unknown | 5× | `.PageSection_header__3JdVh` |
| **PageSection TitleContainer  Jqqcc** | unknown | 5× | `.PageSection_titleContainer__jqqcc`, `.utils_insetLarge__6UCke`, `.utils_inset__Xhl3T` |
| **BHseLi** | unknown | 5× | `.bHseLi`, `.sc-d5151d0-0` |
| **PageSection DescriptionContainer  CUxgQ** | unknown | 5× | `.PageSection_descriptionContainer__cUxgQ`, `.utils_inset__Xhl3T` |
| **Flex Column  Eg2kV** | unknown | 4× | `.Flex_column__eg2kV`, `.Flex_root__DOQCW` |
| **PageSection RootHomepage  2x22W** | unknown | 4× | `.PageSection_rootHomepage__2x22W`, `.PageSection_root__kFVv1` |
| **Header Item  A2E K** | card | 3× | `.Header_item__a2E_K`, `.hide-tablet` |
| **Flex Align Center  OXK9F** | unknown | 3× | `.Flex_align-center__oXK9F`, `.Flex_root__DOQCW` |
| **Flex Align Center  OXK9F** | unknown | 3× | `.Flex_align-center__oXK9F`, `.Flex_root__DOQCW` |
| **Flex Column  Eg2kV** | unknown | 3× | `.Flex_column__eg2kV`, `.Flex_root__DOQCW` |
| **Flex Column  Eg2kV** | unknown | 3× | `.Flex_column__eg2kV`, `.Flex_root__DOQCW` |
| **Flex Align Center  OXK9F** | unknown | 3× | `.Flex_align-center__oXK9F`, `.Flex_root__DOQCW` |
| **JXdnR** | unknown | 3× | `.JXdnR`, `.sc-d5151d0-0` |
| **HkGFXd** | unknown | 3× | `.hkGFXd`, `.sc-d5151d0-0` |

## Cards

### Sidebar NavItem  VdR H

**Instances found:** 11

**CSS classes:** `.Sidebar_navItem__vdR_h`

**HTML structure:**

```html
<button data-active="false" data-interactive="true" class="Sidebar_navItem__vdR_h"><svg class="" width="14" height="14" viewBox="0 0 16 16" fill="#9c9da1" role="img" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" style="--icon-color: #9c9da1;"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.0069 1.00879C12.0235 1.09224 12.8967 1.78967 13.1944 2.78027L14.8907 8.42871C15.0034 8.80411 15.0258 9.20103 14.9571 9.58691L14.5069 12.1143L14.4375 12.4219C14.0542 13.8306 12.8312 14.8559 11.378 14.9863L11.0625 15H4.92875L4.6143 14.9863C3.16087 14.8561 1.93819 13.8307 1.55473 
```

**Base styles (from design tokens):**

```css
.Sidebar_navItem__vdR_h {
  background: #f4f2f4;
  border: 1px solid #28282c;
  border-radius: 12px;
  padding: 8px;
}```

### Logos Item  Pm5vq

**Instances found:** 6

**CSS classes:** `.Logos_item__pm5vq`

**HTML structure:**

```html
<li class="Logos_item__pm5vq"><svg width="101" height="24" viewBox="27 13 126 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg" overflow="visible"><g fill="#fff" clip-path="url(#clip0_3272_13)"><path d="m52.745 20.1-11.988-6.933a1.24 1.24 0 0 0-1.245 0l-11.989 6.934a1.05 1.05 0 0 0-.523.908v13.982c0 .374.2.721.523.909l11.99 6.933c.384.223.86.223 1.244 0L52.746 35.9a1.05 1.05 0 0 0 .523-.909V21.01c0-.374-.2-.721-.523-.908m-.753 1.47L40.42 41.65c-.078.136-.285.08-.285-.076V28.425a.74.74 0 0 0-.367-.638L28.4 21.213c-.135-.078-.08-.285.076-.285h23.147c.329 0 .534.357.37.642M67.66 20.785h5
```

**Base styles (from design tokens):**

```css
.Logos_item__pm5vq {
  background: #f4f2f4;
  border: 1px solid #28282c;
  border-radius: 12px;
  padding: 8px;
}```

### Header Item  A2E K

**Instances found:** 3

**CSS classes:** `.Header_item__a2E_K` `.hide-tablet`

**HTML structure:**

```html
<li class="hide-tablet Header_item__a2E_K"><a data-radix-collection-item="" class="Header_anchor__CTwdv Link_root__cNtak" rel="noopener" href="/customers">Customers</a></li>
```

**Base styles (from design tokens):**

```css
.Header_item__a2E_K {
  background: #f4f2f4;
  border: 1px solid #28282c;
  border-radius: 12px;
  padding: 8px;
}```

## Other Components

### Flex Root  DOQCW

**Instances found:** 7

**CSS classes:** `.Flex_root__DOQCW`

**HTML structure:**

```html
<div class="Flex_root__DOQCW" style="gap: 6px;"><button class="Sidebar_searchButton__I0_9C" aria-label="Search workspace" tabindex="-1"><svg class="" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" role="img" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" style="--icon-color: currentColor;"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 2C9.76142 2 12 4.23858 12 7C12 8.11012 11.6375 9.13519 11.0254 9.96484L13.7803 12.7197L13.832 12.7764C14.0723 13.0709 14.0549 13.5057 13.7803 13.7803C13.5057 14.0549 13.0709 14.0723 12.7764 13.832L12.7197 13.7803L9.9
```

**Base styles (from design tokens):**

```css
.Flex_root__DOQCW {
  background: #f4f2f4;
  padding: 4px;
}```

### Grain GrainSubtle  LzX Q

**Instances found:** 6

**CSS classes:** `.Grain_grainSubtle__LzX_q` `.Grain_grain__0LR5u`

**HTML structure:**

```html
<div class="Grain_grain__0LR5u Grain_grainSubtle__LzX_q" style="inset: 1px;"></div>
```

**Base styles (from design tokens):**

```css
.Grain_grainSubtle__LzX_q {
  background: #f4f2f4;
  padding: 4px;
}```

### Flex Align Center  OXK9F

**Instances found:** 6

**CSS classes:** `.Flex_align-center__oXK9F` `.Flex_root__DOQCW`

**HTML structure:**

```html
<div class="Flex_root__DOQCW Flex_align-center__oXK9F" style="height: 24px; gap: 8px;"><svg class="" width="14" height="14" viewBox="0 0 14 14" role="img" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="12" height="12" rx="6" stroke="var(--color-yellow)" stroke-width="1.5" fill="none"></rect><path fill="var(--color-yellow)" stroke="none" d="M 3.5,3.5 L3.5,0 A3.5,3.5 0 0,1 3.5, 7 z" transform="translate(3.5,3.5)"></path></svg><span class="sc-d5151d0-0 fkFEGF">In Progress</span></div>
```

**Base styles (from design tokens):**

```css
.Flex_align-center__oXK9F {
  background: #f4f2f4;
  padding: 4px;
}```

### Header Anchor  CTwdv

**Instances found:** 5

**CSS classes:** `.Header_anchor__CTwdv` `.Link_root__cNtak`

**HTML structure:**

```html
<a data-radix-collection-item="" class="Header_anchor__CTwdv Link_root__cNtak" rel="noopener" href="/customers">Customers</a>
```

**Base styles (from design tokens):**

```css
.Header_anchor__CTwdv {
  background: #f4f2f4;
  padding: 4px;
}```

### PageSection Header  3JdVh

**Instances found:** 5

**CSS classes:** `.PageSection_header__3JdVh`

**HTML structure:**

```html
<div class="PageSection_header__3JdVh"><div class="utils_inset__Xhl3T utils_insetLarge__6UCke PageSection_titleContainer__jqqcc"><h2 class="sc-d5151d0-0 bHseLi" style="max-width: 18ch;">Make product operations self-driving</h2></div><div class="utils_inset__Xhl3T PageSection_descriptionContainer__cUxgQ"><p class="sc-d5151d0-0 jDutri PageSection_descriptionText__APAbi">Turn conversations and customer feedback…</p><div class="PageSection_actionWrapper__SpZEC"><a class="Link_root__cNtak" rel="noopener" href="/intake" style="display: inline-block;"><div class="PageSection_action__7OSHK Flex_root__
```

**Base styles (from design tokens):**

```css
.PageSection_header__3JdVh {
  background: #f4f2f4;
  padding: 4px;
}```

### PageSection TitleContainer  Jqqcc

**Instances found:** 5

**CSS classes:** `.PageSection_titleContainer__jqqcc` `.utils_insetLarge__6UCke` `.utils_inset__Xhl3T`

**HTML structure:**

```html
<div class="utils_inset__Xhl3T utils_insetLarge__6UCke PageSection_titleContainer__jqqcc"><h2 class="sc-d5151d0-0 bHseLi" style="max-width: 18ch;">Make product operations self-driving</h2></div>
```

**Base styles (from design tokens):**

```css
.PageSection_titleContainer__jqqcc {
  background: #f4f2f4;
  padding: 4px;
}```

### BHseLi

**Instances found:** 5

**CSS classes:** `.bHseLi` `.sc-d5151d0-0`

**HTML structure:**

```html
<h2 class="sc-d5151d0-0 bHseLi" style="max-width: 18ch;">Make product operations self-driving</h2>
```

**Base styles (from design tokens):**

```css
.bHseLi {
  background: #f4f2f4;
  padding: 4px;
}```

### PageSection DescriptionContainer  CUxgQ

**Instances found:** 5

**CSS classes:** `.PageSection_descriptionContainer__cUxgQ` `.utils_inset__Xhl3T`

**HTML structure:**

```html
<div class="utils_inset__Xhl3T PageSection_descriptionContainer__cUxgQ"><p class="sc-d5151d0-0 jDutri PageSection_descriptionText__APAbi">Turn conversations and customer feedback…</p><div class="PageSection_actionWrapper__SpZEC"><a class="Link_root__cNtak" rel="noopener" href="/intake" style="display: inline-block;"><div class="PageSection_action__7OSHK Flex_root__DOQCW Flex_align-center__oXK9F"><span class="sc-d5151d0-0 cRemay utils_slashedZero__RsR0l">1.0</span><span class="sc-d5151d0-0 dhJTq" style="display: inline-block; margin-left: 12px;">Intake</span><span class="sc-d5151d0-0 cpxJeY" st
```

**Base styles (from design tokens):**

```css
.PageSection_descriptionContainer__cUxgQ {
  background: #f4f2f4;
  padding: 4px;
}```

### Flex Column  Eg2kV

**Instances found:** 4

**CSS classes:** `.Flex_column__eg2kV` `.Flex_root__DOQCW`

**HTML structure:**

```html
<div class="Flex_root__DOQCW Flex_column__eg2kV" style="padding-left: 8px; gap: 4px;"><div class="Flex_root__DOQCW" style="gap: 4px;"><span class="sc-d5151d0-0 lcjIWe" style="flex-shrink: 0;">1.</span><span class="sc-d5151d0-0 lcjIWe">I need to understand why iOS launch is blocking on <span class="sc-d5151d0-0 fCeHYh">vehicle_state</span> sync</span></div><div class="Flex_root__DOQCW" style="gap: 4px;"><span class="sc-d5151d0-0 lcjIWe" style="flex-shrink: 0;">2.</span><span class="sc-d5151d0-0 lcjIWe">Find where the app waits on vehicle stat…</span></div></div>
```

**Base styles (from design tokens):**

```css
.Flex_column__eg2kV {
  background: #f4f2f4;
  padding: 4px;
}```

### PageSection RootHomepage  2x22W

**Instances found:** 4

**CSS classes:** `.PageSection_rootHomepage__2x22W` `.PageSection_root__kFVv1`

**HTML structure:**

```html
<section class="PageSection_root__kFVv1 PageSection_rootHomepage__2x22W"><div class="PageSection_header__3JdVh"><div class="utils_inset__Xhl3T utils_insetLarge__6UCke PageSection_titleContainer__jqqcc"><h2 class="sc-d5151d0-0 bHseLi" style="max-width: 18ch;">Make product operations self-driving</h2></div><div class="utils_inset__Xhl3T PageSection_descriptionContainer__cUxgQ"><p class="sc-d5151d0-0 jDutri PageSection_descriptionText__APAbi">Turn conversations and customer feedback…</p><div class="PageSection_actionWrapper__SpZEC"><a class="Link_root__cNtak" rel="noopener" href="/intake" style="
```

**Base styles (from design tokens):**

```css
.PageSection_rootHomepage__2x22W {
  background: #f4f2f4;
  padding: 4px;
}```

### Flex Align Center  OXK9F

**Instances found:** 3

**CSS classes:** `.Flex_align-center__oXK9F` `.Flex_root__DOQCW`

**HTML structure:**

```html
<div class="Flex_root__DOQCW Flex_align-center__oXK9F" style="gap: 12px;"><div class="Hero_pulseDot__oDuNr"></div><span class="sc-d5151d0-0 ha-DKfc">Issue tracking is dead</span><span class="sc-d5151d0-0 eBXKXP">linear.app/next<span style="color: var(--color-text-quaternary);"> →</span></span></div>
```

**Base styles (from design tokens):**

```css
.Flex_align-center__oXK9F {
  background: #f4f2f4;
  padding: 4px;
}```

### Flex Align Center  OXK9F

**Instances found:** 3

**CSS classes:** `.Flex_align-center__oXK9F` `.Flex_root__DOQCW`

**HTML structure:**

```html
<div class="Flex_root__DOQCW Flex_align-center__oXK9F" style="gap: 12px;"><span class="sc-d5151d0-0 fBTzHJ"><div class="Flex_root__DOQCW" style="gap: 4px;"><span class="sc-d5151d0-0 kgndDe">02</span><span>/</span><span>145</span></div></span><div class="Flex_root__DOQCW"><button aria-label="Previous issue" class="SharedViewStyles_buttonBase__MNsrT" tabindex="-1"><svg class="" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" role="img" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" style="--icon-color: currentColor;"><path d="M11.2197 10.7803C11.5126 11.07
```

**Base styles (from design tokens):**

```css
.Flex_align-center__oXK9F {
  background: #f4f2f4;
  padding: 4px;
}```

### Flex Column  Eg2kV

**Instances found:** 3

**CSS classes:** `.Flex_column__eg2kV` `.Flex_root__DOQCW`

**HTML structure:**

```html
<div class="Flex_root__DOQCW Flex_column__eg2kV"><div class="IssueView_activityRow__fW_EG Flex_root__DOQCW Flex_align-center__oXK9F" style="gap: 8px;"><div class="sx-78zum5 sx-1n2onr6 sx-6s0dn4 sx-l56j7k sx-14ju556 sx-2lah0s sx-1y5e3q9 sx-5lhr3w sx-16ye13r" style="--x-width: 14px; --x-height: 14px; height: 14px; width: 14px; transform: translateX(1px);"><img width="14" height="14" alt="Avatar of Karri" class="sx-16rqkct sx-h8yej3 sx-5yr21d sx-47corl sx-l1xv1r" src="https://webassets.linear.app/images/ornj730p/production/f79251b06e9edeeacbf2875384defe629e000b3c-352x352.png?w=72&amp;q=95&amp;aut
```

**Base styles (from design tokens):**

```css
.Flex_column__eg2kV {
  background: #f4f2f4;
  padding: 4px;
}```

### Flex Column  Eg2kV

**Instances found:** 3

**CSS classes:** `.Flex_column__eg2kV` `.Flex_root__DOQCW`

**HTML structure:**

```html
<div class="Flex_root__DOQCW Flex_column__eg2kV" style="gap: 8px;"><span class="sc-d5151d0-0 ieHpLP"><strong style="font-weight: var(--font-weight-medium);">@Cursor</strong> can you take a stab at this?</span><div class="Flex_root__DOQCW Flex_align-center__oXK9F" style="gap: 8px;"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 15 15"><path stroke="var(--color-text-quaternary)" stroke-linecap="round" stroke-linejoin="round" d="M9.375 6.25 12.5 9.375 9.375 12.5"></path><path stroke="var(--color-text-quaternary)" stroke-linecap="round" stroke-linejoin="rou
```

**Base styles (from design tokens):**

```css
.Flex_column__eg2kV {
  background: #f4f2f4;
  padding: 4px;
}```

### Flex Align Center  OXK9F

**Instances found:** 3

**CSS classes:** `.Flex_align-center__oXK9F` `.Flex_root__DOQCW`

**HTML structure:**

```html
<div class="Flex_root__DOQCW Flex_align-center__oXK9F" style="gap: 8px;"><img alt="" data-nosnippet="true" data-loaded="true" loading="lazy" width="16" height="16" decoding="async" data-nimg="1" class="Image_root__UkRqc" src="https://linear.app/cdn-cgi/imagedelivery/fO02fVwohEs9s9UHFwon6A/5a228df7-2423-4807-6105-cd32ddddde00/f=auto,dpr=2,q=95,fit=scale-down,metadata=none" style="color: transparent; border-radius: 50%; transform: translateY(1px);"><span><span class="sc-d5151d0-0 fkFEGF">Cursor</span></span></div>
```

**Base styles (from design tokens):**

```css
.Flex_align-center__oXK9F {
  background: #f4f2f4;
  padding: 4px;
}```

### JXdnR

**Instances found:** 3

**CSS classes:** `.JXdnR` `.sc-d5151d0-0`

**HTML structure:**

```html
<span class="sc-d5151d0-0 JXdnR">Built for purpose</span>
```

**Base styles (from design tokens):**

```css
.JXdnR {
  background: #f4f2f4;
  padding: 4px;
}```

### HkGFXd

**Instances found:** 3

**CSS classes:** `.hkGFXd` `.sc-d5151d0-0`

**HTML structure:**

```html
<p class="sc-d5151d0-0 hkGFXd">Linear is shaped by the practices and principles of world-class product teams.</p>
```

**Base styles (from design tokens):**

```css
.hkGFXd {
  background: #f4f2f4;
  padding: 4px;
}```

## Component Rules

- Match class names exactly from the patterns above
- Each component instance must be visually identical to others of its type
- Do not add extra wrappers or change the DOM structure
- Use `#28282c` for all dividers within components
- Use `#55cdff` for all interactive/active states

## Interactions & States (INTERACTIONS.md)

# Interaction Reference

> Micro-interactions extracted from live DOM. Recreate these exactly for authentic feel.

## Coverage

| Component Type | Count | States Captured |
|----------------|-------|----------------|
| Button | 3 | default, hover, focus |
| Link | 3 | default, hover, focus |
| Input | 2 | default, hover, focus |

## Transition System

These transition declarations were extracted from interactive elements:

```css
transition: background 0.16s cubic-bezier(0.25, 0.46, 0.45, 0.94);
transition: color;
transition: all;
transition: color 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94), background 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

Apply these to all interactive elements. Never invent new durations or easings.

## Button Interactions

### Button 1 — `Linear`

**States:**

- Default: `../screens/states/button-1-default.png`
- Hover: `../screens/states/button-1-hover.png`
- Focus: `../screens/states/button-1-focus.png`

**On hover:**

```css
/* background-color: rgba(0, 0, 0, 0) → */ background-color: rgba(255, 255, 255, 0.03);
```

**On focus:**

```css
/* outline: rgba(0, 0, 0, 0) none 3px → */ outline: rgb(94, 105, 209) solid 1px;
/* outline-color: rgba(0, 0, 0, 0) → */ outline-color: rgb(94, 105, 209);
```

**Transition:** `background 0.16s cubic-bezier(0.25, 0.46, 0.45, 0.94)`

### Button 2 — `Search workspace`

**States:**

- Default: `../screens/states/button-2-default.png`
- Hover: `../screens/states/button-2-hover.png`
- Focus: `../screens/states/button-2-focus.png`

**On focus:**

```css
/* outline: rgba(0, 0, 0, 0) none 3px → */ outline: rgb(94, 105, 209) solid 1px;
/* outline-color: rgba(0, 0, 0, 0) → */ outline-color: rgb(94, 105, 209);
```

**Transition:** `color`

### Button 3 — `New issue`

**States:**

- Default: `../screens/states/button-3-default.png`
- Hover: `../screens/states/button-3-hover.png`
- Focus: `../screens/states/button-3-focus.png`

**On focus:**

```css
/* outline: rgba(0, 0, 0, 0) none 3px → */ outline: rgb(94, 105, 209) solid 1px;
/* outline-color: rgba(0, 0, 0, 0) → */ outline-color: rgb(94, 105, 209);
```

**Transition:** `all`

## Link Interactions

### Link 1 — `Navigate to home`

**States:**

- Default: `../screens/states/link-1-default.png`
- Hover: `../screens/states/link-1-hover.png`
- Focus: `../screens/states/link-1-focus.png`

**On focus:**

```css
/* outline: rgba(0, 0, 0, 0) none 3px → */ outline: rgb(94, 105, 209) solid 1px;
/* outline-color: rgba(0, 0, 0, 0) → */ outline-color: rgb(94, 105, 209);
```

**Transition:** `all`

### Link 2 — `Product`

**States:**

- Default: `../screens/states/link-2-default.png`
- Hover: `../screens/states/link-2-hover.png`
- Focus: `../screens/states/link-2-focus.png`

**On hover:**

```css
/* background-color: rgba(0, 0, 0, 0) → */ background-color: rgba(255, 255, 255, 0.08);
/* color: rgb(138, 143, 152) → */ color: rgb(247, 248, 248);
/* border-color: rgb(138, 143, 152) → */ border-color: rgb(247, 248, 248);
```

**On focus:**

```css
/* outline: rgba(0, 0, 0, 0) none 3px → */ outline: rgb(94, 105, 209) solid 1px;
/* outline-color: rgba(0, 0, 0, 0) → */ outline-color: rgb(94, 105, 209);
```

**Transition:** `color 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94), background 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)`

### Link 3 — `Resources`

**States:**

- Default: `../screens/states/link-3-default.png`
- Hover: `../screens/states/link-3-hover.png`
- Focus: `../screens/states/link-3-focus.png`

**On hover:**

```css
/* background-color: rgba(0, 0, 0, 0) → */ background-color: rgba(255, 255, 255, 0.08);
/* color: rgb(138, 143, 152) → */ color: rgb(247, 248, 248);
/* border-color: rgb(138, 143, 152) → */ border-color: rgb(247, 248, 248);
```

**On focus:**

```css
/* outline: rgba(0, 0, 0, 0) none 3px → */ outline: rgb(94, 105, 209) solid 1px;
/* outline-color: rgba(0, 0, 0, 0) → */ outline-color: rgb(94, 105, 209);
```

**Transition:** `color 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94), background 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)`

## Input Interactions

### Input 1 — `Assign to…`

**States:**

- Default: `../screens/states/input-1-default.png`
- Hover: `../screens/states/input-1-hover.png`
- Focus: `../screens/states/input-1-focus.png`

**Transition:** `all`

_No visible style changes detected for this element._

### Input 2 — `input`

**States:**

- Default: `../screens/states/input-2-default.png`
- Focus: `../screens/states/input-2-focus.png`

**Transition:** `all`

_No visible style changes detected for this element._

## Interaction Rules

- Accent color `#55cdff` is used for focus rings, active states, and hover highlights
- Hover effects include **color transitions** — use the extracted values, not approximations
- Focus states use **outline** (not box-shadow) — always match the extracted focus ring
- Transition durations in use: `0.16s`, `0.1s`
- Always respect `prefers-reduced-motion` — set all transitions to `0s` when enabled

## Design Tokens — JSON Files

### tokens/colors.json
```json
{
  "$schema": "https://design-tokens.github.io/community-group/format/",
  "core": {
    "background": {
      "value": "#ffffff",
      "role": "background",
      "name": "scrollbar-color"
    },
    "text-muted": {
      "value": "#b4bcd0",
      "role": "text-muted",
      "name": "color-text-secondary"
    },
    "text-primary": {
      "value": "#080808",
      "role": "text-primary",
      "name": "theme-color"
    },
    "border": {
      "value": "#28282c",
      "role": "border",
      "name": "color-bg-quaternary"
    },
    "surface": {
      "value": "#f4f2f4",
      "role": "surface",
      "name": "color-bg-tertiary"
    },
    "accent": {
      "value": "#7170ff",
      "role": "accent",
      "name": "color-accent"
    }
  },
  "status": {},
  "extended": {
    "color-text-quaternary": {
      "value": "#62666d",
      "role": "unknown",
      "name": "color-text-quaternary"
    },
    "color-button-invert-bg": {
      "value": "#e2e4e7",
      "role": "unknown",
      "name": "color-button-invert-bg"
    },
    "color-9c9da1": {
      "value": "#9c9da1",
      "role": "unknown"
    },
    "color-teal": {
      "value": "#02b8cc",
      "role": "info",
      "name": "color-teal"
    },
    "color-indigo": {
      "value": "#5e6ad2",
      "role": "unknown",
      "name": "color-indigo"
    },
    "color-f79ce0": {
      "value": "#f79ce0",
      "role": "unknown"
    },
    "color-101112": {
      "value": "#101112",
      "role": "unknown"
    },
    "color-6366f1": {
      "value": "#6366f1",
      "role": "unknown"
    },
    "color-link-primary": {
      "value": "#828fff",
      "role": "unknown",
      "name": "color-link-primary"
    }
  },
  "meta": {
    "theme": "light",
    "extracted": "2026-04-18"
  }
}
```

### tokens/spacing.json
```json
{
  "base": {
    "value": "4px",
    "description": "Grid unit — all spacing must be multiples of this"
  },
  "unit": "px",
  "scale": {
    "xs": {
      "value": "2px",
      "px": 2
    },
    "sm": {
      "value": "4px",
      "px": 4
    },
    "md": {
      "value": "6px",
      "px": 6
    },
    "lg": {
      "value": "8px",
      "px": 8
    },
    "xl": {
      "value": "10px",
      "px": 10
    },
    "2xl": {
      "value": "12px",
      "px": 12
    },
    "3xl": {
      "value": "14px",
      "px": 14
    },
    "4xl": {
      "value": "16px",
      "px": 16
    },
    "5xl": {
      "value": "18px",
      "px": 18
    },
    "6xl": {
      "value": "20px",
      "px": 20
    }
  },
  "multipliers": {
    "1x": {
      "value": "4px",
      "raw": 4
    },
    "2x": {
      "value": "8px",
      "raw": 8
    },
    "3x": {
      "value": "12px",
      "raw": 12
    },
    "4x": {
      "value": "16px",
      "raw": 16
    },
    "5x": {
      "value": "20px",
      "raw": 20
    },
    "6x": {
      "value": "24px",
      "raw": 24
    },
    "7x": {
      "value": "28px",
      "raw": 28
    },
    "8x": {
      "value": "32px",
      "raw": 32
    },
    "9x": {
      "value": "36px",
      "raw": 36
    },
    "10x": {
      "value": "40px",
      "raw": 40
    },
    "11x": {
      "value": "44px",
      "raw": 44
    },
    "12x": {
      "value": "48px",
      "raw": 48
    },
    "13x": {
      "value": "52px",
      "raw": 52
    },
    "14x": {
      "value": "56px",
      "raw": 56
    },
    "15x": {
      "value": "60px",
      "raw": 60
    },
    "16x": {
      "value": "64px",
      "raw": 64
    }
  },
  "meta": {
    "totalValues": 15,
    "min": 2,
    "max": 30
  }
}
```

### tokens/typography.json
```json
{
  "families": [
    "Inter Variable",
    "Berkeley Mono"
  ],
  "scale": {
    "heading-1": {
      "fontFamily": "Inter Variable",
      "fontSize": "128px",
      "fontWeight": "700",
      "lineHeight": null,
      "source": "css"
    },
    "heading-2": {
      "fontFamily": "Inter Variable",
      "fontSize": "80px",
      "fontWeight": "700",
      "lineHeight": null,
      "source": "css"
    },
    "heading-3": {
      "fontFamily": "Inter Variable",
      "fontSize": "72px",
      "fontWeight": "700",
      "lineHeight": null,
      "source": "css"
    },
    "body": {
      "fontFamily": "Inter Variable",
      "fontSize": "14px",
      "fontWeight": "400",
      "lineHeight": null,
      "source": "css"
    },
    "caption": {
      "fontFamily": "Inter Variable",
      "fontSize": "13px",
      "fontWeight": "400",
      "lineHeight": null,
      "source": "css"
    },
    "code": {
      "fontFamily": "Berkeley Mono",
      "fontSize": "14px",
      "fontWeight": "400",
      "lineHeight": null,
      "source": "css"
    }
  },
  "fontFaces": [
    {
      "family": "Inter Variable",
      "src": "https://static.linear.app/fonts/InterVariable.woff2?v=4.1",
      "format": "woff2",
      "weight": "100"
    },
    {
      "family": "Inter Variable",
      "src": "https://static.linear.app/fonts/InterVariable-Italic.woff2?v=4.1",
      "format": "woff2",
      "weight": "100"
    },
    {
      "family": "Berkeley Mono",
      "src": "https://static.linear.app/fonts/Berkeley-Mono-Variable.woff2?v=3.2",
      "format": "woff2",
      "weight": "100"
    }
  ],
  "rules": {
    "maxSizesPerScreen": 4,
    "headingWeightRange": "600-700",
    "bodyWeight": 400,
    "lineHeightBody": 1.5,
    "lineHeightHeading": 1.2
  }
}
```

## Bundled Fonts (fonts/)

The following font files are bundled in the `fonts/` directory:

- `fonts/BerkeleyMono-100.woff2`
- `fonts/InterVariable-100.woff2`

Use these local font files in `@font-face` declarations instead of fetching from Google Fonts.

## Screenshots Inventory (screens/)

> Study all screenshots carefully before implementing any UI. Match every visual detail exactly.

### Scroll Journey (screens/scroll/)

*Cinematic scroll states — page visual at each scroll depth*

![scroll-000.png](screens/scroll/scroll-000.png)

![scroll-017.png](screens/scroll/scroll-017.png)

![scroll-033.png](screens/scroll/scroll-033.png)

![scroll-050.png](screens/scroll/scroll-050.png)

![scroll-067.png](screens/scroll/scroll-067.png)

![scroll-083.png](screens/scroll/scroll-083.png)

![scroll-100.png](screens/scroll/scroll-100.png)

### Full Page Screenshots (screens/pages/)

*Full-page screenshots of each crawled URL*

![about.png](screens/pages/about.png)

![customers.png](screens/pages/customers.png)

![home.png](screens/pages/home.png)

![homepage.png](screens/pages/homepage.png)

![pricing.png](screens/pages/pricing.png)

### Section Clips (screens/sections/)

*Clipped individual sections and components*

![about-section-3.png](screens/sections/about-section-3.png)

![customers-section-3.png](screens/sections/customers-section-3.png)

![customers-section-4.png](screens/sections/customers-section-4.png)

![home-section-9.png](screens/sections/home-section-9.png)

![homepage-section-9.png](screens/sections/homepage-section-9.png)

![pricing-section-3.png](screens/sections/pricing-section-3.png)

### Interaction States (screens/states/)

*Hover, focus, and active state captures*

![button-1-default.png](screens/states/button-1-default.png)

![button-1-focus.png](screens/states/button-1-focus.png)

![button-1-hover.png](screens/states/button-1-hover.png)

![button-2-default.png](screens/states/button-2-default.png)

![button-2-focus.png](screens/states/button-2-focus.png)

![button-2-hover.png](screens/states/button-2-hover.png)

![button-3-default.png](screens/states/button-3-default.png)

![button-3-focus.png](screens/states/button-3-focus.png)

![button-3-hover.png](screens/states/button-3-hover.png)

![input-1-default.png](screens/states/input-1-default.png)

![input-1-focus.png](screens/states/input-1-focus.png)

![input-1-hover.png](screens/states/input-1-hover.png)

![input-2-default.png](screens/states/input-2-default.png)

![input-2-focus.png](screens/states/input-2-focus.png)

![link-1-default.png](screens/states/link-1-default.png)

![link-1-focus.png](screens/states/link-1-focus.png)

![link-1-hover.png](screens/states/link-1-hover.png)

![link-2-default.png](screens/states/link-2-default.png)

![link-2-focus.png](screens/states/link-2-focus.png)

![link-2-hover.png](screens/states/link-2-hover.png)

![link-3-default.png](screens/states/link-3-default.png)

![link-3-focus.png](screens/states/link-3-focus.png)

![link-3-hover.png](screens/states/link-3-hover.png)

### Screenshot Index (screens/INDEX.md)

# Screenshot Index

## Scroll Journey

> Shows the cinematic state at each point of the page

| Scroll | Y Position | File |
|--------|-----------|------|
| 0% | 0px | `screens/scroll/scroll-000.png` |
| 17% | 1680px | `screens/scroll/scroll-017.png` |
| 33% | 3261px | `screens/scroll/scroll-033.png` |
| 50% | 4941px | `screens/scroll/scroll-050.png` |
| 67% | 6620px | `screens/scroll/scroll-067.png` |
| 83% | 8201px | `screens/scroll/scroll-083.png` |
| 100% | 9881px | `screens/scroll/scroll-100.png` |

## Pages

| Page | URL | File |
|------|-----|------|
| Linear – The system for product development | `https://linear.app` | `screens/pages/home.png` |
| Linear – The system for product development | `https://linear.app/homepage` | `screens/pages/homepage.png` |
| About – Linear | `https://linear.app/about` | `screens/pages/about.png` |
| Linear Customers | `https://linear.app/customers` | `screens/pages/customers.png` |
| Pricing – Linear | `https://linear.app/pricing` | `screens/pages/pricing.png` |

## Sections

| Page | Section | File |
|------|---------|------|
| home | #9 (main > div) | `screens/sections/home-section-9.png` |
| homepage | #9 (main > div) | `screens/sections/homepage-section-9.png` |
| about | #3 (main > div) | `screens/sections/about-section-3.png` |
| customers | #3 (main > div) | `screens/sections/customers-section-3.png` |
| customers | #4 (main > div) | `screens/sections/customers-section-4.png` |
| pricing | #3 (main > div) | `screens/sections/pricing-section-3.png` |

## Homepage Screenshots (screenshots/)

![homepage.png](screenshots/homepage.png)

