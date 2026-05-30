# Blueprint Biologics, About and Contact Page Strategy

Planning document for two new pages — `about.html` and `contact.html` — to be built after this strategy is approved. No code changes yet. No edits to existing pages, image placeholders, product data, or `api/contact.js`.

## 1. Purpose

Blueprint Biologics is now a full website with a 165-product catalog, working pricing, a research-use disclaimer page, a Privacy/Terms pair, and a working Vercel + Resend inquiry pipeline. As the site matures into a real B2B catalog + wholesale inquiry experience, the homepage is being asked to do too much: it currently doubles as company positioning, catalog preview, quality preview, wholesale CTA, FAQ, *and* the only inquiry form.

Splitting About and Contact into their own pages does three things:

1. **Tightens the homepage.** It becomes a conversion-first wholesale catalog entry-point.
2. **Gives "about" the room to build trust** with qualified buyers (research labs, licensed clinics, pharmacies, distributors, academic institutions) without medical/treatment framing.
3. **Gives "contact" a single canonical inquiry endpoint** so every Request Quote link in the catalog can point to one place — improving analytics, easier to maintain, easier to A/B in the future.

Scope: this document. Execution will be broken into Prompts 2-5 (see Section 10).

## 2. Competitor / inspiration research summary

**Live competitor verification status:** this strategy is written from the provided inspiration URL and from general B2B research-supplier UX patterns. Live competitor pages should be re-verified by the implementer before Prompt 2 starts, in case patterns have shifted. URLs included for that pass.

| Site | URL | What is useful | What to avoid | How Blueprint can adapt safely |
|---|---|---|---|---|
| Eterna Health (Peptides) | https://geteternahealth.com/peptides/ | Clean two-column hero, generous whitespace, premium type rhythm, calm color system, sticky CTA. Section pacing on long pages. | Direct-to-consumer treatment framing, patient testimonials, outcome claims, dosing language. | Borrow only the section rhythm, the calm visual gravity, and the sticky inquiry CTA pattern. Replace all wellness/treatment language with research-use + qualified-buyer language. |
| Phoenix Peptide | phoenixpeptide.com | B2B research catalog framing, simple sectioning, COA/documentation request flow. | Any specific phrasing or claims; verify their current language hasn't drifted. | Borrow the explicit "documentation available on request" pattern and the catalog-to-inquiry handoff. |
| R-Peptide | rpeptide.com | Wholesale/bulk focus on landing pages, qualified-buyer gate. | Any direct product images, prices, or copy. | Borrow the qualified-buyer eligibility list pattern (we already use a similar pattern on `wholesale.html`). |
| Peptide Warehouse | peptide-warehouse.com | Inquiry routing card grid, segmented contact flows. | Any phrasing involving outcomes or human use. | Borrow the routing-card pattern for Contact (Pricing / Wholesale / Docs / Custom Label / General). |
| JPT Peptide Technologies | jpt.com/peptide-catalog | Science-first About page, plain language on capabilities, no treatment framing. | Specific corporate facts; their claims belong to them, not us. | Borrow the "What we provide / Who we serve / How we operate" structure for the About page. |
| Sigma-Aldrich / MilliporeSigma research catalog | sigmaaldrich.com (research-use catalogs) | Clear "For research use only" labeling on every product, conservative About copy, documentation availability messaging. | Any compliance or certification claim phrasing — those companies have certifications we do not have. | Borrow only the *placement* of the research-use label and the documentation-request CTA. |

**Pattern takeaways relevant to both About and Contact:**

- Sticky or persistent "Request Quote" / "Request Pricing" CTA throughout long pages.
- Inquiry routing cards (3-5 segments) above the form to set buyer expectations before they fill it out.
- Compliance language repeated in calm muted text near the form and in the footer, not as a screaming top banner (we already removed the top banner sitewide).
- "Who we serve" / eligibility section is a trust accelerator for B2B; uses plain organization types (research lab, licensed clinic, etc.).
- Documentation request as a first-class inquiry path, equal weight to pricing.

## 3. About page strategy (`about.html`)

### Goal

Convince a qualified procurement contact at a research lab, licensed clinic, licensed pharmacy, distributor, or academic institution that Blueprint Biologics is a legitimate, compliance-aware, B2B-focused research-use catalog supplier worth opening an account with.

### Section plan

1. **Hero — About Blueprint Biologics**
   - Eyebrow: "About Blueprint Biologics"
   - H1: "Wholesale Research-Use Catalog Supply"
   - Lede direction (do not write final copy yet): one paragraph framing Blueprint as a wholesale research-use catalog supplier serving qualified buyers with documentation-conscious operations. Lead with what we *do*, not what products *do*.
   - CTAs: "View Catalog" (primary, → `catalog.html`), "Request Wholesale Access" (secondary, → `wholesale.html#apply`).
   - Breadcrumb: Home / About.

2. **Company positioning**
   - 3-4 short paragraphs.
   - Topics: who we are, what we supply, who we serve, how we work (account-based, reviewed, documented). No founding story unless the client provides one.
   - Compliance language placement: research-use disclaimer line at the bottom of the block.

3. **What Blueprint Provides**
   - 4-card or 4-row layout reusing existing `.feature-card` styling.
   - Cards (working titles, copy TBD): Research-Use Catalog · Wholesale Account Support · Custom Label Options · Documentation on Request.
   - Each card 2-3 sentences max, neutral language.

4. **Research-Use Catalog and Pricing**
   - Short section explaining the catalog model: 1 vial / 10 vial box pricing, USD, blank vial baseline, custom label +$0.25/vial where available, account-based access.
   - CTA: "View Catalog" → `catalog.html`.

5. **Wholesale and Custom Label Support**
   - Brief, B2B-toned: account review, qualified-buyer access, custom labels for supported pack sizes, bulk fulfillment.
   - CTA: "Request Wholesale Access" → `wholesale.html#apply`.

6. **Documentation and Quality Support**
   - Mirrors the Quality page in a single section.
   - Topics: reference documentation, storage/handling guidance, batch reference docs, buyer verification — all framed as "available on request" / "on qualifying orders" rather than guaranteed certifications.
   - CTA: "Learn About Quality" → `quality.html`.

7. **Who Blueprint Serves**
   - Reuse the `.eligibility-card` grid pattern from `wholesale.html` (already fixed in an earlier step).
   - Audience cards: Research Laboratory · Licensed Clinic · Licensed Pharmacy · Qualified Distributor · Academic Institution · Other Qualified Buyer.
   - Plain organization types only. No outcome claims.

8. **Compliance-Conscious Operations**
   - Short trust block: what we don't do (no consumer sales, no human/animal use, no medical claims), what we do (buyer review, account-based access, documentation on request, USD pricing).
   - Compliance language placement: prominent research-use disclaimer line + buyer-responsibility line.

9. **CTA section: View Catalog / Request Wholesale Access**
   - Mirror of the homepage wholesale band.
   - Two buttons + a short compliance microcopy line.

10. **AEO — Common Questions** (optional, see SEO section)
    - 3-4 questions, plain answers. Same `.aeo-faq` styling already in the design system.

### Tone

Professional, premium, B2B, scientific, clean, trustworthy, direct. Active voice. Short paragraphs. No filler.

### Anti-tone

Do not let About page sound like:
- A clinic or telehealth provider
- A pharmacy
- A wellness brand
- A peptide reseller for consumers
- A treatment provider
- A "lifestyle peptide" site

## 4. Contact page strategy (`contact.html`)

### Goal

Give every Request Quote / Inquire / Documentation Request link in the site exactly one canonical landing page that prefills the right inquiry context, then routes through the existing Vercel + Resend pipeline at `/api/contact`.

### Section plan

1. **Hero — Contact Blueprint Biologics**
   - Eyebrow: "Contact"
   - H1: "Request Pricing, Documentation, or Wholesale Access"
   - Short lede: one sentence explaining who can contact and how reviews work.
   - Breadcrumb: Home / Contact.

2. **Inquiry routing cards**
   - 5-card grid (reuse `.feature-card` styling) above the form.
   - Each card is a button that scrolls to the form and pre-selects the relevant inquiry type via a `setInquiry()` helper (or the URL deep-link, see Section 5).
   - Cards:
     - **Product Pricing** — for 1 vial / 10 vial box wholesale pricing inquiries.
     - **Wholesale Account** — for new account setup and qualified-buyer review.
     - **Documentation Request** — for reference docs and storage/handling info.
     - **Custom Label Inquiry** — for label add-on availability on supported pack sizes.
     - **General Question** — for everything else.

3. **Main contact form**
   - **Reuse the existing form pattern from `index.html`** verbatim. Same fields, same `data-inquiry-form` hook, same hidden context fields, same honeypot (`bot-field`), same acknowledgment checkbox, same privacy microcopy, same `action="/api/contact"`.
   - **Adjust** `submitted_from` hidden field to `"contact-page-inquiry"` so Resend payloads identify the origin.
   - **Adjust** `data-success-url` to keep landing on `/thank-you.html`.

4. **Quick links / contact methods sidebar**
   - Email line (placeholder: `orders@blueprintbiologics.com` — client to confirm).
   - Wholesale account hint.
   - Business hours / time zone (TBD).
   - Optional phone or address rows only if client provides them. **Default: do not show direct phone or address** unless the client requests them.

5. **Documentation / contact FAQ**
   - 3-4 questions.
   - Suggested: "How long until I hear back?", "What do I need to provide for account review?", "How do I request documentation?", "Are products available for individual purchase?" (answer: no, B2B only).

6. **Research-use disclaimer note**
   - Standard footer disclaimer block + the form-adjacent microcopy ("Buyer is responsible for compliance with all applicable laws and regulations.").

### Form behavior reused

The existing handler in `src/scripts/site.js` already supports `?inquiry=<type>` and `?product=<label>` URL params and applies them to:
- the `inquiry_type` select
- the `product_context` hidden field
- the `inquiry_context` hidden field
- the message body prefix
- a "context applied" banner above the form

**No backend changes required.** Contact page just inherits this handler.

## 5. Form routing strategy

### Recommended URL contracts on `contact.html`

| Path | Behavior |
|---|---|
| `contact.html` | Default contact page, no prefill. |
| `contact.html?inquiry=pricing` | Inquiry select preset to "Wholesale Pricing". |
| `contact.html?inquiry=docs` | Inquiry select preset to "Documentation / COA Request". |
| `contact.html?inquiry=catalog` | Inquiry select preset to "Catalog Request". |
| `contact.html?inquiry=custom-label` | Inquiry select preset to "Custom Label Inquiry". |
| `contact.html?product=<Name+strength>` | `product_context` hidden field prefilled + message body prefixed. Used by catalog "Request Quote" buttons. |
| `contact.html?inquiry=pricing&product=<Name+strength>` | Both of the above. |
| `contact.html?account=apply` | Banner reads "Wholesale application selected. Complete the form below." (Reuses the existing wholesale-application handler. May fire even though form posts to `/api/contact`.) |

### Catalog Request Quote link migration

**Today:** catalog and product-detail pages link to `index.html?inquiry=pricing&product=<label>#contact`.

**Recommended after Prompt 3:** flip every Request Quote link to `contact.html?inquiry=pricing&product=<label>`.

**Why move it:** keeps the homepage focused on top-of-funnel positioning. Centralizes inquiry analytics on one URL. Easier to test and iterate on a single conversion page later.

**Backward compatibility:** keep the existing handler in `site.js` so the old homepage anchor still works for anyone with an old link or browser cache.

### Files that will need link updates in Prompt 4

- `src/scripts/catalog.js` — `productInquireHref()` function
- `src/scripts/product-detail.js` — `inquireLink.setAttribute` for `[data-detail-inquire]`
- All HTML pages — header CTA, footer Contact link, in-page CTAs that say "Request Pricing" / "Contact Blueprint"

### Decision deferred to client

Whether the homepage contact section stays (as a quick inquiry shortcut visible from the homepage) or becomes a smaller teaser that links to `contact.html`. Recommended: keep the homepage contact section, but make the catalog "Request Quote" buttons point at `contact.html` so power users hitting many products land on a consistent page.

## 6. Navigation strategy

### Primary nav (header), after both pages exist

```
Home  ·  About  ·  Catalog  ·  Quality  ·  Wholesale  ·  Contact
```

Replace the current "Home · About · Catalog · Quality · Wholesale · Contact" anchor links on the homepage with real page links. `index.html#about` and `index.html#contact` would 301-feel-broken once new pages exist; switch them to `about.html` and `contact.html` everywhere.

### Header CTA

Keep "Request Wholesale Access" → `wholesale.html#apply` (the most aggressive top-of-funnel ask). Do **not** swap to "Contact" — keeping wholesale-account framing in the CTA is the highest-intent path.

### Mobile menu

Same six items, same order, plus the existing CTA button.

### Footer updates

**Site** column gets two additions (in order):

```
About
Catalog
Quality
Wholesale
Contact
```

**Resources** column: no change.

**Compliance** column: no change. Privacy / Terms / Research-Use Disclaimer remain.

### `aria-current="page"` discipline

`about.html` and `contact.html` should set `aria-current="page"` on their respective nav links, matching the existing pattern on `catalog.html`.

## 7. SEO and AEO strategy

### `about.html`

- **Title:** `About Blueprint Biologics | Wholesale Research-Use Catalog Supplier`
- **Meta description:** `Blueprint Biologics is a wholesale supplier of research-use peptide and biologics compounds for qualified buyers. Account-based catalog access, custom label options, and documentation on request. For laboratory research use only.`
- **H1:** `Wholesale Research-Use Catalog Supply`
- **Canonical:** `https://blueprintbiologics.com/about.html` (placeholder — swap on domain cutover)
- **OG / Twitter:** reuse the existing `og-blueprint-biologics.jpg`. Title and description match the page.
- **Robots:** `index, follow`.
- **Breadcrumb (JSON-LD `BreadcrumbList`):** Home → About.
- **Schema:** `BreadcrumbList` only. Do **not** add `AboutPage` schema; it adds no SEO lift for B2B and risks pulling in confusing markup. Do **not** add `MedicalBusiness`, `Drug`, `Product`, `Offer`, or `Review` schema.

#### AEO questions for About (visible FAQ, only if added)

Only add an FAQPage schema block if the visible Q&A on the page matches exactly. Candidates:

- What is Blueprint Biologics?
- Who can buy from Blueprint?
- Are products available for individual purchase? (No, B2B only.)
- Does Blueprint provide documentation?

### `contact.html`

- **Title:** `Contact Blueprint Biologics | Wholesale and Documentation Inquiries`
- **Meta description:** `Request wholesale pricing, account access, documentation, or custom label information for Blueprint Biologics research-use products. Inquiries reviewed for qualified buyers. For laboratory research use only.`
- **H1:** `Request Pricing, Documentation, or Wholesale Access`
- **Canonical:** `https://blueprintbiologics.com/contact.html`
- **OG / Twitter:** reuse `og-blueprint-biologics.jpg`. Title and description match.
- **Robots:** `index, follow`.
- **Breadcrumb (JSON-LD):** Home → Contact.
- **Schema:** `BreadcrumbList` only. Do **not** add `ContactPage` or `ContactPoint` schema unless the client confirms a real publicly-listed email and is comfortable having it indexed (and even then, prefer not to — phishing risk).

#### AEO questions for Contact

Candidates for a visible FAQ block:

- How long until I hear back? (One business day target.)
- What do I need to provide for account review? (Organization details and intended research-use context.)
- How do I request documentation? (Submit a Documentation Request inquiry.)
- Are products available for individual purchase? (No, available only to qualified buyers.)

### Sitemap updates (deferred to Prompt 4)

Add `about.html` and `contact.html` to `sitemap.xml` with `priority` 0.8 and 0.7 respectively. Keep `product-detail.html`, `thank-you.html`, `wholesale-thank-you.html` excluded.

### What to NOT add

- No `Product` schema
- No `Offer` schema
- No `Drug` schema
- No `MedicalBusiness` schema
- No `AggregateRating`
- No price schema
- No `Article` schema (this is not editorial content)

## 8. Responsive strategy

All sizing aligns with the existing breakpoints already used sitewide.

### 390px mobile

- About: hero stacks vertically. CTA buttons stack full-width. "What Blueprint Provides" cards become a single column. "Who Blueprint Serves" cards become 1 column (matches existing `.eligibility-grid` mobile behavior).
- Contact: routing cards stack 1-up. Form fields stack 1-up (already the default). Quick-links sidebar collapses **below** the form on mobile.
- No horizontal overflow at 390px.
- Form fields use the existing `.u-input`, `.u-select`, `.u-textarea` design tokens. No new components needed.

### 768px tablet

- About: 2-column for "What Blueprint Provides" cards. 2-column for "Who Blueprint Serves" cards.
- Contact: routing cards 2 per row. Form fields can pair (full-name + work-email side by side) — matches the existing homepage form 2-up row.

### 1024px laptop

- About: 4-column for "What Blueprint Provides" cards. 3-column for "Who Blueprint Serves" cards.
- Contact: routing cards 3-5 per row depending on count. Form takes the larger column in a 2-column grid; quick-links sidebar takes the smaller column.

### 1440px desktop

- About: full layout with breathing room. Use the existing `--container-max` width.
- Contact: same grid as 1024 with extra horizontal padding.

### Cross-cutting

- `overflow-wrap: anywhere` on long product names and emails so they wrap cleanly.
- `min-width: 0` on flex/grid children inside cards (the same fix that resolved the wholesale eligibility-card per-word wrap earlier).
- Sticky controls *not* needed on either page (they have one form section each).
- Footer wrapping behavior is already healthy and needs no changes.

## 9. Compliance strategy

### Required disclaimers (must appear on both pages)

- Hero or hero-adjacent: a short "For laboratory research use only. Not for human or animal consumption." line.
- Form-adjacent (on Contact only): "Buyer is responsible for compliance with all applicable laws and regulations."
- Footer (already sitewide): the full disclaimer block.

### Safe copy patterns

- "Research-use products" (not "research-grade", which can imply quality grade we cannot certify)
- "Available to qualified buyers"
- "Account-based catalog access"
- "Documentation may be available upon request"
- "Pricing and availability may change"
- "Custom label options may be available for qualified accounts"
- "Buyer is responsible for compliance with all applicable laws and regulations"
- "Not intended to diagnose, treat, cure, or prevent any disease"

### Risky language — do not use anywhere

Treatment · Therapy · Patient · Dosing · Dosage · Administration · Reconstitution · Use protocol · Cycle · Weight loss · Fat loss · Anti-aging · Healing · Recovery from injury · Cognitive enhancement · Memory boost · Sleep aid · Sexual function · Mood · "Safe and effective" · "FDA-approved" (as a positive claim) · "cGMP", "GMP", "ISO", "USP" (without verified certifications) · "Sterile" · "Pharmaceutical grade" · "Clinical grade" · "Research grade" (as a quality assertion) · "99% purity" · "Buy Now" · "Shop" · "Add to Cart" · "Start Treatment"

### Em dash policy

Do not use the long em dash character. Use a hyphen, comma, or sentence rewrite.

### Compliance language placement on About

- Top of page: short research-use line in the hero microcopy.
- Mid-page: a "Compliance-Conscious Operations" section block.
- Bottom: footer disclaimer (sitewide).

### Compliance language placement on Contact

- Hero microcopy: short research-use line.
- Form: existing acknowledgment checkbox stays (verbatim from the homepage form). Existing privacy microcopy stays.
- Form-adjacent note: "Buyer is responsible for compliance with all applicable laws and regulations." (already present in the homepage form pattern).
- Footer disclaimer (sitewide).

### Legal pages

Privacy, Terms, and Research-Use Disclaimer remain conservative drafts with visible "Draft Legal Notice" badges until counsel sign-off. Nothing in this strategy changes that.

## 10. Implementation plan

| Prompt | Scope | Deliverables | Cache-buster |
|---|---|---|---|
| **Prompt 1 (this doc)** | Research + strategy | `BLUEPRINT_ABOUT_CONTACT_STRATEGY.md`; no code | none |
| **Prompt 2** | Build `about.html` | New page with all 9 sections from §3, header/footer reused, breadcrumb, no schema beyond BreadcrumbList, placeholders preserved/added per §3. Add to sitemap. | bump |
| **Prompt 3** | Build `contact.html` | New page with hero, 5 routing cards, reused inquiry form (`action="/api/contact"`, honeypot, hidden context fields), quick-links sidebar, FAQ, disclaimer. Add to sitemap. | bump |
| **Prompt 4** | Sitewide nav + link migration + SEO | Update header nav and mobile menu on all 12 pages (10 existing + 2 new). Update footer nav. Migrate `catalog.js` and `product-detail.js` Request Quote links to point at `contact.html`. Update `sitemap.xml`. Keep legacy `index.html#contact` deep-link handler working for back-compat. | bump |
| **Prompt 5** | QA + compliance scan + push | Full responsive sweep across 12 pages at 4 breakpoints. Compliance grep. Vercel + Resend regression check. Commit + push. | only if files changed |

Each prompt should keep the same do-not list: do not touch image placeholders, do not touch `api/contact.js`, do not add Product/Offer/Drug/MedicalBusiness schema, do not use em dashes, do not introduce ecommerce verbs.

## 11. Risks and open questions for the client

These should be resolved before or during Prompt 2 / Prompt 3 implementation:

1. **Final business contact email.** Currently the site uses the placeholder `orders@blueprintbiologics.com`. Confirm before publishing.
2. **Whether to show direct email publicly on Contact.** Default recommendation: hide direct email; route all inquiries through the form. Showing the address attracts scraping/phishing.
3. **Phone number.** Default recommendation: omit unless the client has staffed coverage and a tracked line.
4. **Business address.** Default recommendation: omit unless required by jurisdiction. If included, list a business mailing address only, not a residence or unstaffed location.
5. **Business hours / response window.** Recommendation: "One business day response target, Pacific Time" matches current copy. Confirm.
6. **Should Catalog Request Quote links flip to `contact.html` (recommended) or stay on `index.html#contact`?** Default: flip in Prompt 4 with the legacy handler kept for back-compat.
7. **Should there still be an inquiry form on the homepage** (the current `index.html#contact` section), or should the homepage CTA buttons start linking out to `contact.html`? Default: keep the homepage form section for now; revisit after analytics show real behavior.
8. **Counsel sign-off on Privacy / Terms / Research-Use Disclaimer.** Still required before launch; About/Contact build does not block this.
9. **Image placeholders.** Per the policy, placeholders on About will remain until the client supplies imagery. Confirm About hero can ship without a hero image (use the existing tinted-grid background pattern from the catalog hero) or whether a placeholder block goes there.
10. **Should the homepage About anchor (`index.html#about`) be removed or kept as a same-page anchor?** Default: keep the same-page section so the homepage still flows, but make the header "About" link point at the dedicated `about.html` page.
11. **AEO FAQ on About / Contact.** Confirm whether the client wants visible FAQ blocks on these pages. If yes, an FAQPage JSON-LD block is allowed *only* if the visible Q&A matches exactly.
12. **Whether placeholders should remain for launch or be replaced first.** Per the image asset plan, placeholders can ship and be replaced post-launch without code changes other than swapping in `<img>` tags.

---

**End of strategy. Ready for Prompt 2 (build `about.html`) on approval.**
