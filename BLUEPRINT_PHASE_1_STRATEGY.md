# Blueprint Biologics, Phase 1 Strategy

Project audit, redesign strategy, and foundation planning.
Phase 1 does not redesign the site. It prepares the groundwork for Phases 2 through 10.

Date: 2026-05-17
Status: Phase 1 complete, ready for Phase 2

---

## 1. Project Inspection

### Working directory
`/Users/chrystofferabad/Claud/Website/Blueprint Biologics`

The local project directory was empty at the start of Phase 1. There is no
local source code, no framework config, and no Stitch HTML file present.
The brief referenced an uploaded Stitch HTML inspiration file, but no such
file was found in the project or chat context.

**Assumption made:** The live site at
`https://blueprintbiologics.netlify.app/` is the current source of truth.
The audit below is based on the live deployment. Stitch design intent has
been reconstructed from the brand brief instead of a file.

### Current deployment
- Host: Netlify
- Live URL: `https://blueprintbiologics.netlify.app/`
- Build type: appears to be a static single-page site (HTML, CSS, JS),
  anchor-based navigation (for example `/#catalog`)
- No build framework detected from the public output

### Recommended framework for the redesign
Use a static-first stack so Lighthouse scores stay high and Netlify
deployment stays simple.

Primary recommendation: **Astro**
- Ships zero JavaScript by default, ideal for the performance targets
- Component-based, supports reusable cards, sections, and layouts
- First-class Netlify support, no config friction
- Easy to add small interactive islands later if needed

Fallback: **plain HTML, CSS, and vanilla JS** with a shared component
include pattern. Acceptable if the client prefers no build step.

The Phase 1 design tokens and utility classes are framework-agnostic and
work with either choice.

### Safest way to build future phases without breaking production
1. Keep the current live site untouched until a redesign is approved.
2. Build the redesign in a separate branch or a fresh project folder.
3. Use Netlify Deploy Previews to review each phase before promoting.
4. Promote to production only after QA in Phase 10.
5. Never edit the live build directly.

---

## 2. Current Site Audit

### Sections present on the live site
1. Header and navigation: About, Catalog, Contact, Get Pricing
2. Hero: "Premium Research Peptides at Scale"
3. Disclaimer banner: research use, no human consumption, wholesale only
4. "Who We Are" section: four feature callouts
5. Catalog highlights: 170+ peptides, category list
6. Product catalog: "Full Pricing List, A to Z" with PDF price sheet
7. Contact and CTA: wholesale order request, three contact options
8. Footer: legal disclaimer and copyright

### Audit verdict per section

| Section | Verdict | Notes |
|---|---|---|
| Header / nav | Keep, improve | Good structure. Needs cleaner styling and a sticky, lighter header. |
| Hero | Keep, rewrite | Strong B2B angle. Tighten copy, add a clear qualified-buyer CTA. |
| Disclaimer banner | Keep, improve | Good instinct. Reword and restyle as a clean compliance strip. |
| Who We Are | Keep, improve | Solid four-point structure. Upgrade icons and copy. |
| Catalog highlights | Keep, rewrite | Category names contain compliance risks, see Section 5. |
| Product catalog | Keep, improve | Core of the site. Needs a real catalog UX, not just a PDF. |
| Contact / CTA | Keep, rewrite | Reposition away from clinic language toward qualified buyers. |
| Footer | Keep, improve | Disclaimer should be expanded, see Compliance Copy Guide. |

### What to keep
- Wholesale and B2B positioning
- "For research use only" and "not for human consumption" framing
- The A to Z pricing concept and per-vial / 10-vial structure
- The four-pillar value proposition format
- 24-hour response commitment

### What to improve
- Visual design across the whole site, see Design System
- Catalog experience, move from a static PDF to a searchable catalog
- Header and disclaimer styling
- Iconography, use consistent scientific line icons

### What to rewrite
- All category names with implied human outcomes
- Hero and contact copy that drifts toward clinical or DTC tone
- Footer disclaimer, expand to a full conservative statement

### What to remove or replace
- "Discreet shipping" language, replace with neutral fulfillment language
- "Includes finished product" phrasing tied to custom labels
- Any wording implying products are for clinic or patient use

---

## 3. Brand Direction

Blueprint Biologics is a wholesale and research-focused supply company.
It is not a direct-to-consumer clinic and must not read like one.

Brand attributes:
- Modern, premium, futuristic
- Clean, scientific, clinical but not cold
- High-trust, professional, scalable
- Wholesale and B2B focused
- Research-grade biotech

Tone of voice:
- Professional and precise
- Confident, not hype
- Plain language, no medical promises
- Reassuring on quality and compliance

The site should signal that Blueprint Biologics is a serious supply partner
for qualified buyers, with quality documentation and a clean ordering
process.

---

## 4. Target Audience

Primary buyers:
- Licensed research facilities and laboratories
- Procurement contacts at research organizations
- Qualified wholesale buyers and resellers

Secondary:
- Business buyers evaluating bulk supply and white-label options

What they need from the site:
- Confidence in product quality and consistency
- Clear pricing and order minimums
- Easy catalog browsing and quote requests
- Documentation availability
- A professional, low-friction account setup path

Note: the site should speak to qualified buyers and businesses, not to
individual consumers seeking treatment.

---

## 5. Competitor and Inspiration Notes

### Primary inspiration: Eterna Health (geteternahealth.com)
Use for visual reference only.
- Clean medical aesthetic, white background, navy text, teal accents
- Generous whitespace, modular card grids, soft shadows, rounded corners
- Numbered step sequences for process explanation

Important difference: Eterna is a DTC clinic. It uses before and after
photos, patient imagery, and "delivered to your door" language. Blueprint
Biologics must not adopt that positioning. Take the clean visual polish,
leave the consumer and treatment framing.

### Broader inspiration set
Premium biotech, peptide research, clinical-grade wellness, and research
supply sites. Use for:
- Light clinical biotech aesthetic
- Blueprint grid backgrounds
- Glass card styling
- Scientific product and category cards
- Wholesale CTA patterns
- Catalog preview layouts
- Research-use disclaimer placement

Do not copy wording, claims, code, branding, or layouts directly.

---

## 6. Proposed Sitemap

```
Home
About
Catalog
  Catalog category views
  Product detail (later phase)
Quality and Compliance
Wholesale Accounts
  Account application
Contact
Legal
  Privacy Policy
  Terms of Service
  Research Use Disclaimer
```

Phase 1 plans this structure. Pages are built across Phases 2 through 7.

---

## 7. Proposed Homepage Sections

1. Header, sticky, light, with primary CTA "Request Wholesale Pricing"
2. Compliance strip, thin, above or below the header
3. Hero, headline plus subhead plus two CTAs, key stats
4. Trust and quality pillars, four-card grid
5. Catalog preview, featured categories with a link to the full catalog
6. How wholesale ordering works, numbered steps
7. Quality and documentation summary, link to the Quality page
8. Wholesale account callout, qualification messaging
9. Contact and quote CTA band
10. Footer, full disclaimer, navigation, legal links

---

## 8. Proposed Catalog Experience

Move beyond a single static PDF.

- Catalog landing page with category cards
- Searchable and filterable product list
- Category filters and an A to Z sort
- Product cards with SKU, dosage, per-vial and 10-vial pricing
- Mono font for SKUs and technical metadata only
- Each product card and page carries a research-use disclaimer
- "Request quote" and "Add to inquiry" actions instead of a cart checkout
- Keep a downloadable PDF price sheet as a secondary option
- Mobile, list view with no wide tables, see Responsive Strategy

The catalog is built in Phase 3.

---

## 9. Compliance Guardrails

All current and future content must be USA and California conscious and
conservative. Full detail is in `BLUEPRINT_COMPLIANCE_COPY_GUIDE.md`.

Summary rules:
- No treatment, disease, weight loss, or human outcome claims
- No "cure", "heal", "reverse", "treat", or "prevent" language
- No implication of FDA-approved medication status
- No implication that the company prescribes, diagnoses, compounds,
  administers, or provides medical care
- No DTC "start treatment" language
- Use "research use only", "not for human or animal consumption",
  "available to qualified buyers", "documentation available upon request"
- Buyer is responsible for compliance with applicable laws

Risks found on the current site and safer rewrites are listed in Section
12 and in the Compliance Copy Guide.

---

## 10. Design System Direction

Full detail in `BLUEPRINT_DESIGN_SYSTEM.md`.

Summary:
- Background: white, off-white, soft gray
- Text: deep navy and near-black
- Accent: electric blue, with subtle cyan and teal highlights
- Thin borders, blueprint grid patterns
- Glassmorphism cards used sparingly, performance first
- Scientific line icons
- Typography: clean modern sans-serif for UI, mono for SKUs and metadata
- Premium spacing, subtle hover and scroll interactions
- No heavy animations that hurt mobile performance

Chosen typography:
- Primary sans: Inter
- Optional display sans: Plus Jakarta Sans for large headings
- Mono: JetBrains Mono for SKUs, dosages, and catalog data

---

## 11. Responsive Strategy

Design and build mobile-first. Target widths:
- 390px mobile
- 768px tablet
- 1024px laptop
- 1440px desktop

Hard rules for every future phase:
- No horizontal overflow at any width
- Hero text scales down on mobile, use a fluid clamp scale
- No wide data tables on mobile, catalog uses stacked cards instead
- Buttons and content stay inside card boundaries
- Header and logo sized with explicit caps on mobile
- Reserve space for images and fonts to avoid layout shift
- Test every phase at all four target widths

---

## 12. Performance Strategy

- Optimized images, modern formats (WebP or AVIF), correct sizing
- Lazy load all below-the-fold images and the catalog
- Minimal external scripts, no analytics bloat
- No heavy UI libraries, vanilla or light components only
- Reusable components to keep CSS and markup small
- Lightweight CSS-driven animations, respect reduced motion
- Self-host fonts with `font-display: swap`
- Target strong Lighthouse scores on mobile, performance and
  accessibility 90 plus

---

## 13. Compliance Risks Found and Safer Rewrites

Risks identified on the current live site:

| Current wording | Risk | Safer rewrite |
|---|---|---|
| "healing peptides" | Implies a medical treatment outcome | "repair and recovery research compounds" |
| "anti-aging compounds" | Implies a human longevity outcome | "longevity research compounds" |
| "cognitive enhancers" | Implies a human performance outcome | "cognitive research compounds" |
| "GLP-1 agonists including Semaglutide, Tirzepatide, Retatrutide" stated as a selling point | Associates products with weight loss drugs | Keep compound names as catalog data only, no benefit framing |
| "We work with medical professionals, clinics" | Leans toward clinical and patient use | "We supply qualified buyers and licensed research facilities" |
| "discreet shipping" | Implies consumer use and avoidance of scrutiny | "reliable, tracked fulfillment" |
| "Custom labels ... includes finished product" | Implies a ready-to-use consumer product | "Custom labeling available for qualified wholesale buyers" |
| Footer: "Not for human consumption" only | Incomplete disclaimer | Use the full disclaimer in the Compliance Copy Guide |

Full approved and risky language lists are in
`BLUEPRINT_COMPLIANCE_COPY_GUIDE.md`.

---

## 14. Future Phase Roadmap

Detailed in `BLUEPRINT_BUILD_ROADMAP.md`.

- Phase 2: Homepage redesign
- Phase 3: Catalog and product experience
- Phase 4: Quality, testing, and compliance section or page
- Phase 5: Wholesale account and application flow
- Phase 6: Contact form and email integration
- Phase 7: Legal, privacy, and terms pages
- Phase 8: Responsive polish
- Phase 9: Speed, SEO, and AEO optimization
- Phase 10: QA, deployment, and client polish

---

## 15. Assumptions Log

1. The local project folder was empty. The live Netlify site is treated as
   the source of truth for the current content audit.
2. No Stitch HTML file was found. Stitch design intent was reconstructed
   from the brand brief.
3. The current site is a static single-page build. Astro is recommended
   for the redesign, with plain static HTML as a fallback.
4. The redesign will be built in a separate branch or folder and reviewed
   via Netlify Deploy Previews. The live site stays untouched until QA in
   Phase 10.
5. Phase 1 produces planning documents and a light, non-breaking code
   foundation only. No redesign work has started.

---

## 16. Phase 1 Deliverables

- `BLUEPRINT_PHASE_1_STRATEGY.md` (this document)
- `BLUEPRINT_COMPLIANCE_COPY_GUIDE.md`
- `BLUEPRINT_DESIGN_SYSTEM.md`
- `BLUEPRINT_BUILD_ROADMAP.md`
- `design-system/tokens.css`, design tokens and CSS variables
- `design-system/utilities.css`, reusable utility classes
- Placeholder component and asset folders for future phases

---

## 17. Exact Next Step for Phase 2

Begin the homepage redesign:
1. Scaffold the chosen framework (Astro recommended) in a new branch.
2. Wire in `design-system/tokens.css` and `design-system/utilities.css`.
3. Build the homepage sections listed in Section 7, mobile-first.
4. Apply the compliance-safe copy from the Compliance Copy Guide.
5. Review on a Netlify Deploy Preview at all four target widths.

Do not promote to production until Phase 10 QA.
