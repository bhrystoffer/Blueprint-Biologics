# Blueprint Biologics, Phase 10 Launch QA

Final QA, production polish, Vercel readiness, and GitHub push.

Date: 2026-05-21
Applies to: production Vercel deployment for Blueprint Biologics

This file is operational notes, not legal advice. Final form copy and
disclaimers should be reviewed by qualified counsel before launch.

---

## 1. Pages Checked

10 pages, 4 breakpoints each, plus full metadata and structured-data audit.

| Page | Indexable | Notes |
|---|---|---|
| `/` | Yes | Homepage, hero + catalog preview + about + quality + wholesale + AEO + contact |
| `/catalog.html` | Yes | 28 products, search, filter, cards/table view, AEO block |
| `/product-detail.html?id=bpc-157` | No (noindex,follow) | Query-driven template, canonical points to `/catalog.html` |
| `/quality.html` | Yes | 4 standards cards, docs list, storage points, 4-step verification, 7-item FAQ + FAQPage JSON-LD |
| `/wholesale.html` | Yes | Hero, overview, eligibility, process, benefits, application form, AEO block |
| `/privacy.html` | Yes | Draft template with counsel-review notice |
| `/terms.html` | Yes | Draft template with counsel-review notice |
| `/research-use.html` | Yes | Draft template with counsel-review notice |
| `/thank-you.html` | No | noindex + no-store cache |
| `/wholesale-thank-you.html` | No | noindex + no-store cache |

---

## 2. Responsive QA Results

40 page-by-breakpoint iframe checks (10 pages times 4 widths). All passed.

| Breakpoint | Overflow failures |
|---|---|
| 390px | 0 |
| 768px | 0 |
| 1024px | 0 |
| 1440px | 0 |

`scrollWidth` is always less than or equal to viewport width on every page
at every tested breakpoint.

---

## 3. Form QA Results

### Homepage contact form, `[data-inquiry-form]`

| Check | Result |
|---|---|
| Action | `POST /api/contact` |
| `data-form-type` | `contact-inquiry` |
| `data-success-url` | `/thank-you.html` |
| Honeypot present, off-screen | Yes |
| Empty submit blocked | Yes, 4 field errors plus 1 acknowledgment error |
| Valid submit posts JSON | Yes, contains full_name, work_email, email mirror, organization, buyer_type, inquiry_type, message, ack, plus context |
| Deep link `?product=BPC-157&inquiry=docs#contact` | Pre-fills message, selects "Documentation / COA Request", sets `product_context`, `inquiry_context` |
| Privacy microcopy links to | `privacy.html` |
| `source_url`, `timestamp` populated | Yes |
| `bot-field` populated empty | Yes |

### Wholesale application form, `[data-wholesale-form]`

| Check | Result |
|---|---|
| Action | `POST /api/contact` |
| `data-form-type` | `wholesale-application` |
| `data-success-url` | `/wholesale-thank-you.html` |
| Honeypot present, off-screen | Yes |
| Empty submit blocked | Yes, 6 field errors plus 4 acknowledgment errors |
| Valid submit posts JSON | Yes, contains full_name, work_email, phone, organization, state, country, buyer_type, categories array, all 4 acknowledgments as booleans, plus context |
| Deep link `?account=apply` | Banner + smooth-scroll to `#apply`, sets `account_context=wholesale-application` |
| Privacy microcopy links to | `privacy.html` |
| `source_url`, `timestamp` populated | Yes |

### Deep links verified

- `index.html?product=BPC-157#contact`
- `index.html?inquiry=pricing#contact`
- `index.html?inquiry=docs#contact`
- `index.html?inquiry=catalog#contact`
- `index.html?inquiry=custom-label#contact`
- `wholesale.html?account=apply`

All preserve the Phase 3/5 behavior, populate the matching hidden context
fields, and surface a `.form-context-banner` above the form.

---

## 4. Vercel + Resend Readiness

| Item | Status |
|---|---|
| `api/contact.js` present | Yes |
| Accepts POST only, returns 405 for other methods | Yes |
| Checks honeypot, returns 200 silently if filled | Yes |
| Server-side required field validation | Yes |
| Sends via Resend, no API key on the client | Yes |
| `package.json` includes `resend ^3.5.0` | Yes |
| `vercel.json` valid JSON, has security headers, cache rules, function timeout | Yes |
| Forms post via JS fetch, no Netlify attributes | Yes |
| Successful homepage submit redirects to `/thank-you.html` | Yes |
| Successful wholesale submit redirects to `/wholesale-thank-you.html` | Yes |
| `BLUEPRINT_PHASE_6_NETLIFY_FORM_SETUP.md` clearly marked obsolete | Yes |

---

## 5. SEO / AEO Readiness

### Sitemap and robots
- `sitemap.xml` lists only the 7 indexable static pages
- `robots.txt` allows all, disallows `/api/`, both thank-you pages, and
  `product-detail.html`, references the sitemap

### Metadata, every page

- Unique `<title>` formatted `<Page> | Blueprint Biologics`
- Unique `<meta name="description">` (compliance-safe)
- `<link rel="canonical">`
- Open Graph: title, description, type=website, url, site_name, image,
  image:width=1200, image:height=630
- Twitter Card: summary_large_image, title, description, image
- `theme-color: #0A1A2F`

### Indexing rules

- Thank-you pages: `<meta name="robots" content="noindex, follow">`
- `product-detail.html`: noindex,follow plus canonical to `/catalog.html`
- All indexable pages: no `robots` meta, default indexable

### Structured data

- Homepage: `Organization` plus `WebSite` (linked via `@id`)
- 6 interior indexable pages: `BreadcrumbList`
- `quality.html`: `FAQPage` matching the 7 visible FAQ items verbatim
- No `Product`, `MedicalBusiness`, `Drug`, `Offer`, `Review`,
  `AggregateRating`, or `Price` schema. No `SearchAction` on `WebSite`.

### AEO content blocks

- Homepage `#common-questions`: 4 Q&As
- Catalog `#catalog-faqs`: 4 Q&As
- Wholesale `#wholesale-faqs`: 3 Q&As
- All use native `<details>`/`<summary>` for keyboard and SR accessibility

---

## 6. Accessibility Notes

| Check | Result |
|---|---|
| One `<h1>` per page | Yes, 10 of 10 |
| Semantic heading order | Yes |
| Skip links present | Yes, all pages |
| `aria-expanded` on mobile menu toggle | Yes |
| `aria-current="page"` on active nav | Yes |
| Form labels associated to inputs | Yes |
| Fieldsets/legends preserved on wholesale form | Yes |
| Acknowledgment checkboxes required, not pre-checked | Yes |
| Submit button shows loading state with `aria-busy="true"` | Yes |
| AEO/FAQ accordions use native `<details>`/`<summary>` | Yes |
| Legal TOC has `aria-label="On this page"` | Yes |
| Focus-visible rings on all interactive elements | Yes |
| 0 console errors on default page loads | Yes |
| `prefers-reduced-motion` honored | Yes (pulse, chevron, scroll reveal) |

---

## 7. Compliance Notes

- Em-dash scan: zero matches in HTML, CSS, JS, MD, JSON, XML, TXT
- Positive-claim scan: zero positive claims. All matches for "guaranteed",
  "FDA-approved", "sterile", "clinical grade", etc. appear only inside
  negating sentences ("does not guarantee", "should not be interpreted as
  representing... FDA-approved") or in the internal Phase 1 / Compliance
  Copy Guide docs that document the banned-claims list itself.
- No "Buy Now", "Shop", "Start Treatment", "healing", "anti-aging",
  "weight loss", "cognitive enhancer", or patient-outcome claims anywhere
- Phase 10 polish: stale Phase 5 wholesale success-panel copy and a
  "product vial mockup" aria-label were tidied so no user-facing copy
  reads as a draft. The success panel is dead code under the Phase 8
  fetch flow but its copy now reads correctly in case it is ever
  reactivated as a fallback.
- All forms still require compliance acknowledgments. None are
  pre-checked.

---

## 8. Legal Page Status

Privacy, Terms, and Research-Use pages remain marked as draft templates
pending counsel review:

- Each page contains the HTML comment
  `<!-- DRAFT: Review with qualified legal counsel before publishing. -->`
- Each page contains the visible note
  "This page is provided as a draft website template and should be
  reviewed by qualified legal counsel before launch."

These notices should remain in place until counsel sign-off is documented
in the project files.

---

## 9. Remaining Client-Supplied Items

| Item | Why it's pending |
|---|---|
| Final production domain | All metadata, canonical, og:url, sitemap, robots, and structured data currently use the placeholder `https://blueprintbiologics.com`. Search the repo to surface every occurrence. |
| Resend domain verification | Required before production form submissions can be delivered. See Phase 8 doc. |
| `CONTACT_TO_EMAIL` confirmation | Currently documented as `orders@blueprintbiologics.com`. Confirm the right inbox before deploy. |
| `CONTACT_FROM_EMAIL` confirmation | Must be a verified mailbox on the verified Resend domain, for example `noreply@blueprintbiologics.com`. |
| Real product SKUs and catalog | Catalog still uses Blueprint-style placeholder SKUs in `src/data/products.js`. |
| Final product, category, quality, and wholesale imagery | CSS placeholders remain in 6 catalog category cards, the quality lab visual, the storage and handling visual, and the wholesale account visual. Drop real assets into `src/assets/images/` and update HTML references. |
| Legal counsel sign-off | Once counsel approves, remove the visible "DRAFT" notices and the `<!-- DRAFT ... -->` HTML comments from privacy/terms/research-use pages. |
| Analytics decision | Site is currently analytics-free. If Vercel Analytics or another tool is added, update `privacy.html` accordingly. |
| Final business contact details | Privacy and Terms pages reference "the contact pathways on this website". A confirmed mailing address and privacy contact should be added before launch. |

---

## 10. Vercel Deployment Settings

If creating a fresh Vercel project from this repo:

- Framework Preset: Other
- Root Directory: `./`
- Build Command: leave empty
- Output Directory: leave empty
- Install Command: default `npm install` so `resend` installs for the API function

`vercel.json` already configures:

- 10-second function timeout for `api/contact.js`
- `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy` site-wide
- `no-store` on `/api/(.*)`
- `noindex` + `no-store` on both thank-you pages
- `noindex, follow` on `product-detail.html`
- 30-day cache on `/src/assets/images/*`
- 24-hour `must-revalidate` cache on CSS/JS
- 1-hour cache + correct Content-Type on `sitemap.xml` and `robots.txt`

---

## 11. Environment Variables Needed

Set in Vercel dashboard, Project, Settings, Environment Variables, across
Production, Preview, and Development:

| Name | Required | Example |
|---|---|---|
| `RESEND_API_KEY` | Yes | `re_xxxxxxxx` |
| `CONTACT_TO_EMAIL` | Yes | `orders@blueprintbiologics.com` |
| `CONTACT_FROM_EMAIL` | Yes | `noreply@blueprintbiologics.com` |
| `CONTACT_FROM_NAME` | Optional | `Blueprint Biologics` |
| `CONTACT_REPLY_TO_FALLBACK` | Optional | `orders@blueprintbiologics.com` |

The Resend sending domain must be verified before any of these will
deliver in production.

---

## 12. GitHub Push Summary

See the conversation summary for the exact commit hash, branch, and push
status. The repo is configured to push to:

`https://github.com/bhrystoffer/Blueprint-Biologics`

Local git identity for this repo:

```
git config user.email "chrystoffer.business@gmail.com"
git config user.name "Chrystoffer Abad"
```

`.gitignore` protects:

- `node_modules`, `.pnpm-store`
- `.vercel`
- `.env`, `.env.local`, `.env.*.local`
- `.DS_Store`
- npm/yarn debug logs

---

## 13. Launch Checklist

Order this from top to bottom on launch day.

- [ ] Replace the production domain placeholder
      `https://blueprintbiologics.com` across HTML, sitemap, robots,
      structured data, OG/Twitter, and docs.
- [ ] In Resend, verify the sending domain and confirm DNS records
      (SPF/DKIM) align.
- [ ] In Vercel, set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`,
      `CONTACT_FROM_EMAIL` (and optional `CONTACT_FROM_NAME`,
      `CONTACT_REPLY_TO_FALLBACK`) across all three environments.
- [ ] Deploy a Vercel Preview, run the 6-step form test plan from the
      Phase 8 doc.
- [ ] Run Lighthouse on mobile and desktop for `/`, `/catalog.html`,
      `/quality.html`, `/wholesale.html`. Target 90+ across the four
      categories.
- [ ] Cross-browser smoke test: latest Chrome, Safari, Firefox, plus
      iOS Safari and Chrome on Android.
- [ ] Legal counsel sign-off documented. Remove visible "DRAFT" notices
      and `<!-- DRAFT -->` HTML comments from privacy/terms/research-use.
- [ ] Replace any remaining CSS placeholder visuals once the client
      supplies imagery.
- [ ] Import the real product list into `src/data/products.js`. Decide
      whether to expand `product-detail.html` into per-product static
      pages and update `sitemap.xml`/`robots.txt` accordingly.
- [ ] Promote Vercel Preview to Production. Set the custom domain.
      Update DNS.
- [ ] Curl `/thank-you.html`, `/wholesale-thank-you.html`, and
      `/product-detail.html` against the production domain and confirm
      `X-Robots-Tag` headers are present.
- [ ] Watch the Vercel Functions tab for `api/contact` errors during the
      first 48 hours. Watch the Resend dashboard for delivery failures.
      Watch the spam tab for legitimate inquiries that get flagged.
- [ ] Final client review and polish pass after production goes live.

---

## 14. Reminder

Production uses Vercel + Resend only. The Phase 6 Netlify Forms doc is
obsolete and is kept solely as historical reference. Do not point the
production site at Netlify.
