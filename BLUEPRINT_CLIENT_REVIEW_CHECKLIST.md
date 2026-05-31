# Blueprint Biologics, Client Review Checklist

A short walkthrough of what to look at before approving the site for launch.

**Preview URL:** https://blueprint-biologics.vercel.app

If you see anything stacked oddly or out of date, hard-refresh the page (or open in a private window) — Vercel caches aggressively and we use a version stamp on every asset to force-refresh.

## 1. Pages to review (12 total)

Open each in a fresh tab and skim for tone, accuracy, and obvious issues.

- [ ] [Home](https://blueprint-biologics.vercel.app/index.html)
- [ ] [About](https://blueprint-biologics.vercel.app/about.html) **(new)**
- [ ] [Contact](https://blueprint-biologics.vercel.app/contact.html) **(new)**
- [ ] [Catalog](https://blueprint-biologics.vercel.app/catalog.html)
- [ ] [Sample product detail (Semaglutide 2mg)](https://blueprint-biologics.vercel.app/product-detail.html?id=semaglutide-2mg-vial)
- [ ] [Sample product detail (Tirzepatide 10mg)](https://blueprint-biologics.vercel.app/product-detail.html?id=tirzepatide-10mg-vial)
- [ ] [Quality](https://blueprint-biologics.vercel.app/quality.html)
- [ ] [Wholesale](https://blueprint-biologics.vercel.app/wholesale.html)
- [ ] [Privacy Policy](https://blueprint-biologics.vercel.app/privacy.html)
- [ ] [Terms of Use](https://blueprint-biologics.vercel.app/terms.html)
- [ ] [Research-Use Disclaimer](https://blueprint-biologics.vercel.app/research-use.html)
- [ ] [Thank-you page](https://blueprint-biologics.vercel.app/thank-you.html)

## 2. Product catalog review

- [ ] Catalog shows **163 products** in alphabetical order by default (A first, V last). Mazdutide removed per client request.
- [ ] Use the **search bar**: confirm "Semaglutide", "AOD9604", "Tirzepatide", "NAD" all return expected products.
- [ ] Use the **category filter** and the **A-Z letter filter** at the top of the catalog browse section.
- [ ] Use the **sort dropdown**: try "1 Vial price, Low to High" and "10 Vial Box price, High to Low".
- [ ] Toggle between **Cards** and **Table** views; both should show prices.
- [ ] Click into **3 to 5 random products** and confirm the detail page shows the right prices, strength, and category.
- [ ] Try an old-style URL like `/product-detail.html?id=semaglutide` (no strength); confirm you see a **"Select a Strength" picker**, not a blank page.

## 3. Price review

Open the catalog and confirm a handful of prices against the original price sheet PDF. The site treats `src/data/products.js` as the single source of truth; if you spot any price drift, flag the product name + strength to the dev and the next update can be made through the generator (see Maintenance doc).

Spot-check examples already verified:

| Product | Strength | 1 Vial | 10 Vial Box |
|---|---|---|---|
| Semaglutide | 2mg/vial | $19 | $190 |
| Semaglutide | 50mg/vial | $68 | $680 |
| AOD9604 | 2mg/vial | $18 | $180 |
| AOD9604 | 10mg/vial | $64 | $640 |
| Tirzepatide | 100mg/vial | $68 | $680 |
| Retatrutide | 60mg/vial | $90 | $900 |
| BPC 157 | 5mg/vial | $17 | $170 |
| NAD+ (Buffered) | 1000mg/vial | $65 | $650 |

## 4. Category review

Each product is bucketed into one of 7 research-safe categories:

- GLP-1 / Incretin Research
- Recovery & Repair Research
- Longevity & NAD+ Research
- Growth Hormone Research
- Cognitive Research
- Specialty Compounds
- Solutions & Accessories

A handful of items were placed conservatively where the science is ambiguous. Please flag any of these you'd like moved (the maintenance doc shows how):

- **GDF-8** is in Specialty (could arguably sit in Growth).
- **B7-33** is in Specialty.
- **Cortagen** and **Crystagen** are in Longevity.
- **SNAP-8** is in Specialty.
- **Cagrilitide blends** (Cagrilitide+Semaglutide, Cagrilitide+Tirzepatide) are in GLP-1.

## 5. Placeholder visuals still pending final imagery

The following spots intentionally show styled placeholders. They reserve correct layout and aspect ratios for the final images. **No icon or stock image will be added** until the client approves final assets. See `BLUEPRINT_IMAGE_ASSET_PLAN.md` for specs.

- [ ] Homepage Quality section visual (1 placeholder)
- [ ] Catalog page Documentation block (1 placeholder)
- [ ] Product detail page main visual (1 placeholder per product)
- [ ] Quality page visuals (2 placeholders)
- [ ] Wholesale page visual (1 placeholder)

Per-product photography for catalog cards is **not yet wired in** because final product images are not yet supplied. The card layout is ready to accept them as soon as they arrive.

## 6. Legal pages requiring counsel review

The Privacy, Terms, and Research-Use Disclaimer pages are written as conservative drafts and each carries a visible **"Draft Legal Notice"** badge. Please route them through your counsel before launch.

- [ ] Privacy Policy reviewed by counsel (currently labeled draft template)
- [ ] Terms of Use reviewed by counsel (currently labeled draft template)
- [ ] Research-Use Disclaimer reviewed by counsel (currently labeled draft template)
- [ ] California (CCPA/CPRA) language reviewed for the client's specific data-collection footprint

Once counsel signs off, ask the dev to remove the draft badges and update the page descriptions to drop "Draft template for counsel review."

## 7. Vercel + Resend setup items

The contact form and wholesale form both post to `/api/contact`, which uses Resend for email delivery. The function code is at `api/contact.js` and does not need to be modified.

Vercel environment variables that must be set before launch (in the Vercel project settings):

- [ ] `RESEND_API_KEY` (required) — your Resend project API key
- [ ] `CONTACT_TO_EMAIL` (required) — where inbound inquiries land
- [ ] `CONTACT_FROM_EMAIL` (required) — verified sender domain in Resend
- [ ] `CONTACT_FROM_NAME` (optional, defaults to "Blueprint Biologics")
- [ ] `CONTACT_REPLY_TO_FALLBACK` (optional, defaults to CONTACT_FROM_EMAIL)

Smoke test after env vars are set:

- [ ] Submit the homepage contact form with a test address. Confirm Resend delivers an email to `CONTACT_TO_EMAIL` (`submitted_from = homepage-inquiry`).
- [ ] Submit the **Contact page** form with a test address. Confirm Resend delivers (`submitted_from = contact-page-inquiry`).
- [ ] Submit the wholesale form with a test address. Confirm Resend delivers (`submitted_from = wholesale-application`).
- [ ] Click a **Request Quote** button from a catalog card. Confirm `contact.html` opens with the product name and strength prefilled, inquiry type "Wholesale Pricing" preselected, and a "Prefilled with…" banner shown above the form.
- [ ] Open an old-style legacy URL like `index.html?inquiry=pricing&product=Tirzepatide%20100mg/vial#contact` and confirm the homepage form still prefills (backward compatibility).

## 8. Final domain confirmation

The site is currently on the Vercel preview domain. Before launch:

- [ ] Connect the verified production domain in Vercel (e.g. `blueprintbiologics.com`).
- [ ] Ask the dev to find-and-replace the placeholder `blueprintbiologics.com` references in canonical, OG, and sitemap.xml if the final domain differs.
- [ ] Confirm SSL certificate provisioned by Vercel.
- [ ] Update `CONTACT_FROM_EMAIL` and Resend sender verification to the production domain.

## 9. Items the client needs to approve before launch

- [ ] Final approval of all pricing displayed on the catalog.
- [ ] Final approval of all category assignments (see Section 4).
- [ ] Counsel sign-off on Privacy, Terms, Research-Use Disclaimer.
- [ ] Decision on whether to add per-product photos now or after launch (placeholder layout is ready either way).
- [ ] Confirmation of the production domain to be used at launch.
- [ ] Confirmation that the Resend account and verified sender domain are set up.
- [ ] Approval of the contact-receiving inbox (`CONTACT_TO_EMAIL`).
- [ ] Approval of the OG/social share image (`src/assets/images/og-blueprint-biologics.jpg`, 1200×630, 108 KB).
