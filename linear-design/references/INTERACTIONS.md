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

