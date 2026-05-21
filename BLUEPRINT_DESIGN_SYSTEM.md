# Blueprint Biologics, Design System

A reusable design system for the redesign. This document defines the
visual language. The matching CSS variables live in
`design-system/tokens.css`, and reusable classes live in
`design-system/utilities.css`.

Date: 2026-05-17
Status: Phase 1 baseline, refined during Phases 2 through 8

Visual direction: modern, premium, futuristic, clean, scientific.
Clinical but not cold. High-trust, B2B research biotech.

---

## 1. Color Palette

### Backgrounds
| Token | Hex | Use |
|---|---|---|
| `--bg-base` | `#FFFFFF` | Primary page background |
| `--bg-soft` | `#F7F9FC` | Off-white section background |
| `--bg-muted` | `#EEF2F7` | Subtle gray panels and fills |
| `--bg-grid` | `#E3E9F2` | Blueprint grid line color |

### Text
| Token | Hex | Use |
|---|---|---|
| `--text-strong` | `#0A1A2F` | Headings, near-black navy |
| `--text-body` | `#1F2D3D` | Body copy |
| `--text-muted` | `#5B6B7F` | Secondary text, captions |
| `--text-on-dark` | `#F4F8FF` | Text on dark surfaces |

### Accents
| Token | Hex | Use |
|---|---|---|
| `--accent` | `#1F6FEB` | Electric blue, primary accent and CTAs |
| `--accent-hover` | `#1A5FD0` | Hover state for primary accent |
| `--accent-soft` | `#E8F1FE` | Light accent fill, badges, hovers |
| `--cyan` | `#22B8CF` | Subtle cyan highlight |
| `--teal` | `#0FA3A3` | Subtle teal highlight |

### Lines and feedback
| Token | Hex | Use |
|---|---|---|
| `--border` | `#D9E1EC` | Thin default border |
| `--border-strong` | `#BCC8D8` | Emphasized border |
| `--success` | `#1E9E6A` | Success messaging |
| `--warning` | `#B7791F` | Caution messaging |
| `--danger` | `#C0392B` | Error messaging |

### Dark surface, for footer and accent bands
| Token | Hex | Use |
|---|---|---|
| `--surface-dark` | `#0A1A2F` | Deep navy surface |
| `--surface-dark-2` | `#10243D` | Slightly lighter navy |

Usage rule: backgrounds stay light. Dark navy is reserved for the footer
and occasional accent bands. Electric blue is the only strong color, used
for primary actions and key highlights. Cyan and teal are accents only,
never large fills.

---

## 2. Typography

### Font families
- Primary UI and body: **Inter**
- Optional display, large headings: **Plus Jakarta Sans**
- Mono, technical only: **JetBrains Mono**

Self-host all fonts. Use `font-display: swap`. Load only the weights
listed below.

Weights to load:
- Inter: 400, 500, 600, 700
- Plus Jakarta Sans: 600, 700 (optional)
- JetBrains Mono: 400, 500

Mono is used only for SKUs, dosages, product metadata, and catalog-style
data. Never use mono for body copy or headings.

### Type scale, fluid
Use `clamp()` so headings shrink on mobile and never overflow.

| Token | Mobile to desktop | Use |
|---|---|---|
| `--fs-display` | 2.0rem to 3.5rem | Hero headline |
| `--fs-h1` | 1.75rem to 2.5rem | Page titles |
| `--fs-h2` | 1.4rem to 2.0rem | Section headings |
| `--fs-h3` | 1.15rem to 1.4rem | Card and sub headings |
| `--fs-body` | 1rem to 1.0625rem | Body copy |
| `--fs-small` | 0.875rem | Captions, labels |
| `--fs-mono` | 0.8125rem to 0.875rem | SKUs and data |

### Line height and tracking
- Headings: line-height 1.15, letter-spacing -0.01em
- Body: line-height 1.6
- Eyebrow and labels: uppercase, letter-spacing 0.08em, small size
- Max line length for body text: about 70 characters

---

## 3. Spacing Scale

A single 4px-based scale. Use tokens only, no arbitrary values.

| Token | Value |
|---|---|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 24px |
| `--space-6` | 32px |
| `--space-7` | 48px |
| `--space-8` | 64px |
| `--space-9` | 96px |
| `--space-10` | 128px |

Section vertical padding:
- Mobile: `--space-8` top and bottom
- Desktop: `--space-10` top and bottom

Container:
- Max width 1200px, with a wide variant at 1320px
- Side gutter: 20px mobile, 32px tablet, 48px desktop

---

## 4. Radius, Borders, Shadows

Radius:
| Token | Value | Use |
|---|---|---|
| `--radius-sm` | 6px | Inputs, small chips |
| `--radius-md` | 12px | Buttons, cards |
| `--radius-lg` | 20px | Large panels, hero cards |
| `--radius-pill` | 999px | Pills and tags |

Borders: thin, 1px, `--border`. Use borders rather than heavy shadows to
define structure.

Shadows, soft and low:
| Token | Value |
|---|---|
| `--shadow-sm` | `0 1px 2px rgba(10,26,47,0.06)` |
| `--shadow-md` | `0 6px 20px rgba(10,26,47,0.08)` |
| `--shadow-lg` | `0 16px 40px rgba(10,26,47,0.10)` |

Keep shadows subtle. Premium feel comes from spacing and borders, not
heavy depth.

---

## 5. Button Styles

Shared: `--radius-md`, font weight 600, comfortable tap target, minimum
44px height, transition 150ms on background and transform.

### Primary
- Background `--accent`, text white
- Hover `--accent-hover`, slight lift, 1px translateY up
- Active, no lift
- Focus, visible 2px focus ring in `--accent`

### Secondary
- Transparent background, 1px `--border-strong`, text `--text-strong`
- Hover, background `--bg-muted`

### Ghost / text
- No border, text `--accent`
- Hover, underline or `--accent-soft` background

### Disabled
- Reduced opacity, no hover, `cursor: not-allowed`

CTA wording follows the Compliance Copy Guide. Use "Request Wholesale
Pricing", "Apply for an Account", "Request a Quote". Never "Buy" or "Shop".

---

## 6. Card Styles

### Standard card
- Background white, 1px `--border`, `--radius-lg`
- Padding `--space-5` to `--space-6`
- `--shadow-sm` at rest, `--shadow-md` on hover
- Hover, subtle 2px lift, 150ms transition

### Glass card
- Use sparingly, hero and feature highlights only
- Background `rgba(255,255,255,0.7)`, `backdrop-filter: blur(10px)`
- 1px border `rgba(255,255,255,0.6)`
- Performance: never stack multiple blurred layers, never use over video,
  provide a solid fallback for browsers without `backdrop-filter`

### Product card, catalog
- White, 1px border, `--radius-md`
- Product name in `--fs-h3`
- SKU, dosage, and pricing in JetBrains Mono, `--text-muted`
- Per-vial and 10-vial pricing clearly separated
- Short research-use disclaimer line at the bottom
- Action: "Request Quote" or "Add to Inquiry"

### Icon for cards
Scientific line icons, 1.5px stroke, consistent 24px grid. No filled or
emoji icons.

---

## 7. Form Styles

- Inputs: white background, 1px `--border`, `--radius-sm`, min height 44px
- Padding 12px horizontal
- Label above input, `--fs-small`, weight 600
- Focus: 2px `--accent` ring, border to `--accent`
- Error: 1px `--danger` border, error text below in `--danger`
- Helper text: `--text-muted`, `--fs-small`
- Required acknowledgment checkbox per the Compliance Copy Guide, never
  pre-checked
- Generous spacing between fields, `--space-5`
- On mobile, full-width fields, no side-by-side pairs below 768px

---

## 8. Section Layout Rules

- One clear idea per section
- Each section: eyebrow label, heading, optional intro, then content
- Alternate `--bg-base` and `--bg-soft` between sections for rhythm
- Blueprint grid pattern used as a light background texture, low contrast,
  never behind body text
- Grid layouts: 4 columns desktop, 2 columns tablet, 1 column mobile
- Consistent container and gutters from the Spacing section
- Compliance strip stays thin and quiet, not a colored alarm bar

---

## 9. Animation Rules

- Subtle and fast, 150ms to 250ms, ease-out
- Allowed: hover lifts, color transitions, fade-and-rise on scroll-in,
  small icon transitions
- Scroll-in reveals: small translate plus opacity, run once, low distance
- Not allowed: parallax-heavy effects, large continuous motion,
  autoplaying video backgrounds, anything that causes layout shift
- Always honor `prefers-reduced-motion`, disable non-essential motion
- Animate only `transform` and `opacity` for performance
- No animation library, CSS only. Use a tiny IntersectionObserver script
  for scroll reveals if needed

---

## 10. Mobile Rules

Target widths: 390px, 768px, 1024px, 1440px. Build mobile-first.

- No horizontal overflow at any width, test with dev tools
- Hero text uses the fluid `clamp()` scale, never fixed large sizes
- No wide data tables on mobile, the catalog stacks into cards
- Buttons and content stay within card padding, never leak out
- Header and logo capped on mobile, logo height around 28px to 32px
- Tap targets minimum 44px by 44px
- Images sized and lazy loaded below the fold, with width and height set
- Reserve space for fonts and media to avoid layout shift
- Off-canvas or accordion mobile nav, no cramped horizontal menu

---

## 11. Accessibility Notes

- Color contrast meets WCAG AA, 4.5:1 for body text, 3:1 for large text
- Do not rely on color alone to convey meaning
- Visible focus states on all interactive elements
- Logical heading order, one h1 per page
- All images have meaningful `alt` text, decorative images use empty alt
- Forms: every input has a linked label, errors announced clearly
- Full keyboard navigation, including the mobile menu and catalog filters
- Respect `prefers-reduced-motion`
- Target Lighthouse accessibility score 90 plus
- Minimum body font size 16px on mobile

---

## 12. Token Reference

All values above are implemented as CSS custom properties in
`design-system/tokens.css`. Components in Phases 2 and later must consume
tokens, not hard-coded values. This keeps the system consistent and easy
to retune.
