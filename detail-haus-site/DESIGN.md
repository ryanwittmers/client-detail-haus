---
name: Detail Haus Design
description: Ultra-minimalist dark editorial — near-monochrome, ink backgrounds, pure white type, zero color accent.

colors:
  ink:       "#1a1917"
  charcoal:  "#2d2b29"
  graphite:  "#6b6865"
  stone:     "#a8a5a0"
  fog:       "#e5e3df"
  bone:      "#f2f0ed"
  white:     "#fdfdfd"
  black:     "#0c0c0b"

typography:
  display:
    fontFamily: "Syne, sans-serif"
    fontWeight: 800
    lineHeight: 1.05
  body:
    fontFamily: "Manrope, sans-serif"
    fontWeight: 400
    lineHeight: 1.65

spacing:
  section-y: "96px"
  container-x: "40px"
  max-width: "1320px"
---

# Detail Haus Design System

## Philosophy

Near-monochrome dark site. Every decision should read as "this operator is precise and unhurried." Nothing competes for attention. Color is not a design tool here — contrast, scale, and whitespace do all the work.

## Color

Single palette: ink → charcoal → graphite → stone → fog → bone → white. No accent color. Where the previous design used burgundy/salmon, use white or stone instead. Highlights use white. Secondary text uses stone. Dividers use charcoal.

## Typography

- Display: Syne, extrabold (800), very large, tight leading (1.05)
- Body: Manrope, light (300–400), 1.65 leading
- Labels: Manrope, semibold (600), uppercase, tracked
- No colored headings — headings are white only

## Spacing

Generous. Sections breathe. The container is max 1320px with 40px horizontal padding. Section vertical padding is 96px.

## Do Not

- Use any non-white/stone/graphite color in the UI
- Use rounded pill buttons (use sharp or very-slightly-rounded edges)
- Use box shadows
- Use gradient fills on text
- Use the `--accent` CSS variable for visual highlights — swap those to white
