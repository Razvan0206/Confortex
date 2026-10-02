---
name: Confortex
description: Industrial refrigeration and HVAC supplier from Iași; ink frame, one logo red, sharp corners, hexagon as the only signature.
colors:
  brand-red: "#ff0019"
  brand-red-ui: "#d6001a"
  brand-red-deep: "#b00015"
  ink: "#14171c"
  ink-2: "#1d2229"
  ink-line: "#333b45"
  ink-muted: "#b4bcc6"
  steel: "#566070"
  line: "#d9dee4"
  paper: "#f3f5f7"
  white: "#ffffff"
typography:
  display:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 4.6vw, 3.4rem)"
    fontWeight: 650
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "clamp(1.9rem, 3.6vw, 3rem)"
    fontWeight: 650
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 650
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 600
    lineHeight: 1.2
rounded:
  control: "2px"
  none: "0"
spacing:
  band-sm: "64px"
  band-lg: "96px"
  gutter-sm: "20px"
  gutter-lg: "32px"
  container: "1280px"
components:
  button-primary:
    backgroundColor: "{colors.brand-red-ui}"
    textColor: "{colors.white}"
    rounded: "{rounded.control}"
    padding: "10px 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.brand-red-deep}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
    rounded: "{rounded.control}"
    padding: "10px 24px"
    height: "48px"
  input:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "10px 14px"
    height: "48px"
  hex-badge:
    backgroundColor: "{colors.brand-red-ui}"
    textColor: "{colors.white}"
    size: "52px"
    height: "60px"
  note:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    padding: "12px 16px"
---

# Design System: Confortex

## Overview

**Creative North Star: "The Plant Room Panel"**

A technical supplier's site that reads like a well-labelled control panel: a dark ink frame (header, hero, quote band, footer) around pale working surfaces, one signal red, square corners, hexagon marks and real numbers. The ink frame exists because the client's logo is a white raster; content sits on paper and white. This is a deliberate single-theme deviation, not a dark mode.

Trust comes from proof, not decoration: photos are real, capacities (m³, kW, m³/h, °C) appear as plain figures in the proof line and card texts (a drawn axis was removed: it added nothing next to the numbers), and claims that are not yet confirmed carry a visible disclaimer. Density is medium; sections are separated by generous vertical bands rather than cards or borders.

**Key Characteristics:**
- One accent (logo red), used for actions, marks and the progress line only.
- Ink bands alternate with paper and white bands.
- Geist only; weight and size carry hierarchy, tabular figures for every number.
- Sharp geometry: 2px controls, 0 elsewhere, hexagon as the single signature shape.
- Flat surfaces, no shadows; depth comes from tonal bands.
- Motion is CSS only and always inside `prefers-reduced-motion: no-preference`.

## Colors

A cool graphite and paper neutral set with one red sampled from the client's logo.

### Primary
- **Logo Red** (#ff0019): marks only: hexagon bullets, nav underline, scroll progress bar, the "EX" of the logo, large type on ink. Too light for small text or white-text fills.
- **Signal Red** (#d6001a): the UI red: button fills with white text, hexagon badges, selection, focus ring, timeline fill, mobile action-bar CTA. Passes 4.5:1 with white.
- **Pressed Red** (#b00015): hover state of the primary button.

### Neutral
- **Plant Ink** (#14171c): header, hero, scale, quote band, footer; body text on light surfaces.
- **Ink Raised** (#1d2229): proof strip band directly under the hero.
- **Ink Rule** (#333b45): borders on ink.
- **Ink Muted** (#b4bcc6): secondary text on ink.
- **Steel** (#566070): secondary text and helper text on paper and white.
- **Hairline** (#d9dee4): light dividers, timeline track.
- **Paper** (#f3f5f7): page background.
- **White** (#ffffff): alternating bands (`on-white`), fields, notes.

### Named Rules
**The One Red Rule.** Red is the only chromatic color. Use Logo Red for marks and Signal Red wherever text or a fill must meet contrast; never use Logo Red as a white-text button fill.

**The Ink Frame Rule.** Anything that shows the logo or opens the page (header, hero, footer) is ink because the logo is white. Content bands are paper or white.

## Typography

**Display, Body and Label Font:** Geist (variable, latin and latin-ext, with system-ui fallback). No serif, no mono.

**Character:** Neutral, engineered grotesque; authority from size contrast and tight tracking on headings, not from a second face.

### Hierarchy
- **Display** (650, clamp(2.1rem, 4.6vw, 3.4rem), 1.08): home hero h1, line-masked entrance. Inner page heroes go up to clamp(2.1rem, 5vw, 3.75rem).
- **Headline** (650, clamp(1.9rem, 3.6vw, 3rem), 1.08): section h2, the most reused size. Smaller steps in use: clamp(1.7rem, 3vw, 2.5rem) and clamp(1.5rem, 2.6vw, 2rem).
- **Title** (650, 1.5rem or 1.25rem, 1.08): h3 for tiles, services, products.
- **Body** (400, 1.0625rem, 1.6): paragraphs, capped around 36 to 42rem (`max-w-xl` to `max-w-2xl`).
- **Label** (600, 0.95rem to 1rem): form labels, phone number in header, buttons (600).

### Named Rules
**The Tabular Number Rule.** Every figure (phone, capacities, years, badge numbers) uses `.num` (tabular-nums). Headings use `text-wrap: balance`, paragraphs `text-wrap: pretty`.

## Layout

One container: `.wrap`, max 80rem (1280px), horizontal padding 1.25rem under 768px and 2rem above. Sections are `.band`: 4rem vertical padding, 6rem from 768px up. Grids are 12 columns at lg with asymmetric splits (7/5 hero, 7/5 domains, 4/8 sticky heading with numbered list, 5/7 quote band). Header is sticky, 4.25rem high; anchor offset is 5.5rem. Below lg the nav collapses into a right-hand drawer and a fixed two-button action bar (call, quote) sits at the bottom; the action bar hides on pages that carry the form (`#oferta`). Touch targets are at least 44px (controls 48px, action bar 56px).

## Elevation & Depth

Flat. There are no box-shadows anywhere in the build. Depth is tonal: ink bands against paper and white bands, an `ink-2` strip under the hero, 1px ink-rule borders on ink. The only layered effects are the mobile drawer backdrop (60% black) and the photo clip frames.

### Named Rules
**The Flat Rule.** Do not add shadows; separate with band color or a hairline.

## Shapes

Sharp. Controls (buttons, inputs, selects, textareas) have a 2px radius; everything else is 0. The hexagon is the only signature shape: `.hex` clip-path polygon (50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%), used for numbered badges (52x60px, Signal Red, white tabular number), the 0.6rem list-note bullet, and timeline nodes. Photos are rectangular, clipped in `.zoom` frames. Line weights: 1.5px for line buttons and field borders, 2px for nav underline and timeline.

### Named Rules
**The Only Hexagon Rule.** The hexagon is the sole decorative shape; no circles, pills, blobs or rounded cards.

## Components

### Buttons
- **Shape:** 2px radius, 48px minimum height, padding 10px 24px, weight 600, no wrapping.
- **Primary (`btn-red`):** Signal Red fill, white text; hover Pressed Red (mouse only); arrow icon slides 3px.
- **Line (`btn-line`):** 1.5px currentColor border, transparent; hover tints 10% of current color. Used for the phone action on ink.
- **Press:** scale 0.97 over 160ms. Disabled: 55% opacity, not-allowed (quote submit is disabled in the demo).

### Inputs / Fields
- **Style:** 48px high, 1.5px #8a94a3 border, white fill, 2px radius, label above (600, 0.95rem), helper text in Steel. Sits on a paper panel inside the ink quote band.
- **Focus:** border goes ink, 3px Signal Red outline (white on ink surfaces).

### Navigation
- Ink header, logo left, six links, phone, primary CTA. Links get a 2px Logo Red underline: full on the current page, drawn from the left on hover (220ms). Mobile: native `dialog` drawer from the right (26rem max), links rise in sequence.

### Hex Badge and Note
- Numbered hexagon badge for services and a hexagon-bullet `note` row for facts. Substitutes for borders and cards.

### Photo Frames
- Real photographs in clipped rectangles; slow 1.03 zoom on hover (500ms, mouse only). The product photo morphs between list and detail via view transitions.

### Motion
- Curves: ease-out `cubic-bezier(0.23, 1, 0.32, 1)` for entrances, ease-in-out `cubic-bezier(0.77, 0, 0.175, 1)` for on-screen movement, drawer `cubic-bezier(0.32, 0.72, 0, 1)`, linear for scroll-linked. UI transitions 140 to 280ms; hero entrance 640 to 900ms once. Scroll-driven reveals sit behind `@supports (animation-timeline: view())`; content is visible by default. The hero photo is not animated beyond a settle (LCP).

## Do's and Don'ts

### Do:
- **Do** keep logo-bearing surfaces on Plant Ink (#14171c) and content on Paper (#f3f5f7) or White.
- **Do** use Signal Red (#d6001a) for every white-text fill and red text; Logo Red (#ff0019) for marks and large type on ink.
- **Do** end every page with the quote band or the action bar so "Cere ofertă" and the phone number stay one click away.
- **Do** draw figures from `content/site.ts` and set them with `.num`.
- **Do** wrap every animation in `prefers-reduced-motion: no-preference` and keep CSS-only.
- **Do** mark unconfirmed client claims visibly instead of presenting them as fact.

### Don't:
- **Don't** add a second accent color, gradients, or shadows.
- **Don't** round anything beyond the 2px control radius or introduce shapes other than the hexagon.
- **Don't** add a second typeface, serif, or mono.
- **Don't** use side-stripe borders for emphasis; use the hexagon note instead.
- **Don't** add carousels, marquees or animation libraries.

### Logo
Vector redraw of the client's 223x40 px PNG (`scripts/build-logo.py`, `content/logo.json`): six-arm snowflake with V branches, Arimo outlines for CONFORTEX, "EX" in Logo Red. The slogan is real text in the footer. Header uses the compact lockup at 32px; `public/logo.svg` holds the full lockup with slogan.

### Mobile menu
Disclosure panel under the header (clip-path, ease-drawer 340ms), burger bars turn into an X (280ms), links rise in with 45ms stagger, backdrop fades, page scroll locked while open; Escape and any navigation close it.

### Page transitions
`app/template.tsx` wraps every page in a ViewTransition (old page fades out 140ms, new one fades in 260ms with a 0.75rem rise); `<html data-scroll-behavior="smooth">` keeps Next from scrolling visibly to the top or to a hash. Product list to product page morphs the shared photo (450ms ease-in-out).
