# Premium Luxury UI Redesign — Design Document

**Date:** 2026-02-28
**Approach:** Editorial Luxury (Apple-inspired)
**Core principle:** Restraint = luxury. Fewer elements, more space, less color, bigger type.
**No animations.** All improvements are static visual design.

## Design Rules

1. **Spacing:** Generous dark space between everything. Minimum py-20 sm:py-32 between sections.
2. **Typography:** Extreme contrast — massive extrabold headings, whisper-thin light body text.
3. **Color:** Amber ONLY on primary CTA buttons and hero serif accent. Everything else monochrome.
4. **Cards:** Image-forward, minimal text, no badges/labels/dots. Show: image, name, tagline, price.
5. **Borders:** Invisible by default, subtle on hover only.
6. **Layout:** Let each element breathe. Remove anything that doesn't serve conversion.

## Changes by Section

### 1. Spacing (HomeClient.tsx + products/[slug]/page.tsx)
- Hero: pt-20 sm:pt-32 pb-16 sm:pb-24
- Sections: py-20 sm:py-32
- Product grid gap: gap-6 sm:gap-8
- Featured section: pb-16 sm:pb-24
- Footer: py-20 sm:py-24
- Product detail hero: pt-16 sm:pt-24 pb-20 sm:pb-28
- Product detail final CTA: py-24 sm:py-32

### 2. Typography (HomeClient.tsx + products/[slug]/page.tsx)
- Hero heading: text-4xl sm:text-6xl lg:text-8xl
- Hero tagline: text-base sm:text-xl font-light text-white/35 (was text-sm sm:text-lg text-white/40)
- Remove "Creative Software Studio" badge entirely
- "by Amlolife": text-white/25 font-display (was text-amber-300)
- Section headers: text-3xl sm:text-4xl (was text-2xl sm:text-3xl)
- Product detail name: text-3xl sm:text-5xl lg:text-6xl
- Product detail tagline: font-light text-white/35
- Product detail short description: text-white/25

### 3. Color Discipline (HomeClient.tsx + products/[slug]/page.tsx + globals.css)
- Prices: text-white (was text-amber-400 on featured)
- Section dividers: from-white/[0.08] (was from-amber-500/10 in footer)
- Featured card border: border-white/[0.12] (was featured-accent amber)
- Card "View" hover: border-white/30 text-white (was amber)
- Scroll indicator: text-white/15 (was text-white/20)
- Product detail price: text-white (keep as-is, already white)
- Product detail feature icons: text-white/40 on transparent bg (was text-amber-400 on bg-amber-500/10)
- Product detail first feature card: no amber accent (same as other cards)
- Product detail final CTA: remove amber gradient overlay
- Final CTA price: text-white (was text-amber-400)
- Keep amber ONLY on: CTA buttons, hero "by Amlolife" serif text

### 4. Product Cards (HomeClient.tsx)
- Image aspect: aspect-[4/3] (was aspect-[16/10])
- Remove category label from cards
- Remove badge overlay on card images
- Remove featured amber dot
- Card content: name → tagline → price only
- Default border: border-transparent (was border-white/[0.07])
- Hover border: border-white/[0.06]
- Image area bg: bg-[#0a0a0a]

### 5. Featured Products (HomeClient.tsx)
- Single featured: full-width 2-column layout (image right, text left) like product detail hero
- Multiple featured: keep 2-column grid but taller
- Image: full quality in rounded container (not 30% opacity background)
- Text: name text-3xl sm:text-4xl, tagline font-light text-white/35, price text-xl text-white
- Remove: shimmer border, featured-accent class, badge pill, card background
- Proper amber CTA button on featured card
- bg-transparent — floats in dark space

### 6. Footer (HomeClient.tsx)
- Remove category quick-links row
- Center-align everything vertically stacked
- Logo + "Pixelas" centered
- Tagline: single line, text-sm text-white/25 font-light
- Email: text-white/20 hover:text-white/40
- Copyright + location: one centered line
- Generous spacing between elements

### 7. Product Detail Page (products/[slug]/page.tsx)
- Hero spacing: pt-16 sm:pt-24 pb-20 sm:pb-28
- Product name: text-3xl sm:text-5xl lg:text-6xl
- Tagline: font-light text-white/35
- Short description: text-white/25
- Price: text-3xl font-extrabold text-white
- Remove badge pill
- Features: remove "What's included" micro-label, just "Features" at text-3xl sm:text-4xl
- Feature icons: text-white/40 on transparent (no amber bg)
- All feature cards equal (no first-card amber accent)
- Feature icon container: remove bg, keep w-10 h-10
- Final CTA: py-24 sm:py-32, remove amber gradient overlay, price in text-white

## Files Modified

1. `app/(frontend)/HomeClient.tsx` — Sections 1-6
2. `app/(frontend)/products/[slug]/page.tsx` — Section 7
3. `app/(frontend)/globals.css` — Remove featured-accent class (no longer used)
