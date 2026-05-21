# Blueprint Biologics, Phase 9 SEO, Speed, AEO

Phase 9 optimized the static site for production indexing, Core Web Vitals,
social sharing, and answer-engine readability.

Date: 2026-05-21
Applies to: production Vercel deployment for Blueprint Biologics

This file is operational notes, not legal advice. Final form copy and
disclaimers should be reviewed by qualified counsel before launch.

---

## 1. What Was Optimized

- Hero image weight reduced 95 percent through responsive variants
- Per-page metadata, canonical, Open Graph, Twitter Card unified across 10
  pages with a production domain placeholder
- OG image at 1200x630 generated from the verified hero asset
- `sitemap.xml` and `robots.txt` written for production
- JSON-LD added: Organization + WebSite (homepage), BreadcrumbList (6
  interior pages), FAQPage (quality.html)
- AEO blocks (small native `<details>` FAQs) added on homepage, catalog,
  and wholesale pages
- `vercel.json` extended with cache headers and per-route `X-Robots-Tag`
  directives
- Performance touches: backdrop blur disabled on small screens, no new
  scripts, no external image URLs added
- Print styles for legal pages already in place from Phase 8 and verified

---

## 2. Metadata Strategy

Every page now carries:

- Unique `<title>` formatted as `<Page> | Blueprint Biologics`
- Unique `<meta name="description">` (compliance-safe wording)
- `<link rel="canonical">`
- Open Graph: `og:title`, `og:description`, `og:type`, `og:url`,
  `og:site_name`, `og:image`, `og:image:width=1200`, `og:image:height=630`
- Twitter Card: `twitter:card=summary_large_image`, `twitter:title`,
  `twitter:description`, `twitter:image`
- `theme-color` retained from earlier phases

Pages that should not be indexed also carry
`<meta name="robots" content="noindex, follow">` for
`product-detail.html` and `<meta name="robots" content="noindex">` for
both thank-you pages. The `vercel.json` `X-Robots-Tag` headers reinforce
both.

### Domain placeholder

All canonical, og:url, og:image, and structured-data URLs use:

```
https://blueprintbiologics.com
```

> **Action before launch:** find-and-replace this placeholder with the
> verified production domain. Search the repo for `blueprintbiologics.com`
> to surface every location.

---

## 3. Sitemap and Robots Notes

`sitemap.xml` lists only the 7 indexable static pages:

- `/`
- `/catalog.html`
- `/quality.html`
- `/wholesale.html`
- `/privacy.html`
- `/terms.html`
- `/research-use.html`

Excluded by design:

- `/api/contact` (function endpoint)
- `/thank-you.html`, `/wholesale-thank-you.html` (noindex)
- `/product-detail.html` (query-driven template; noindex follow; canonical
  points to `/catalog.html`)
- Query-based product detail URLs (no static page per product yet)

`robots.txt` allows all crawlers, disallows `/api/`, both thank-you pages,
and `/product-detail.html`, and references the sitemap.

---

## 4. Structured Data Added

| Page | Schema |
|---|---|
| `/` | `Organization`, `WebSite` (linked via `@id`) |
| `/catalog.html` | `BreadcrumbList` |
| `/quality.html` | `FAQPage` (7 questions matching the visible FAQ) + `BreadcrumbList` |
| `/wholesale.html` | `BreadcrumbList` |
| `/privacy.html` | `BreadcrumbList` |
| `/terms.html` | `BreadcrumbList` |
| `/research-use.html` | `BreadcrumbList` |

Intentionally skipped per the brief:

- `Product`, `MedicalBusiness`, `Drug`, `Offer`, `AggregateRating`,
  `Review`, and `Price` schema. Products are research-use only with
  placeholder SKUs and should not be marketed as consumer goods.
- `SearchAction` on `WebSite`. There is no site-wide search.

---

## 5. Image Optimization Notes

Source: `src/assets/images/Hero_Background.jpeg`, 2752x1536, 2.27 MB.

Generated with macOS `sips` during this phase:

| File | Width | Size |
|---|---|---|
| `Hero_Background-800.jpg` | 800px | ~52 KB |
| `Hero_Background-1280.jpg` | 1280px | ~117 KB |
| `Hero_Background-1920.jpg` | 1920px | ~242 KB |
| `og-blueprint-biologics.jpg` | 1200x630 | ~109 KB |

CSS now serves the matching variant per breakpoint:

```css
.hero__bg { background-image: url("../assets/images/Hero_Background-800.jpg"); }
@media (min-width: 768px)  { .hero__bg { background-image: url(".../Hero_Background-1280.jpg"); } }
@media (min-width: 1280px) { .hero__bg { background-image: url(".../Hero_Background-1920.jpg"); } }
```

Preloads on the homepage use `media` queries plus `fetchpriority="high"`
so each viewport only downloads its own variant.

The original 2.27 MB JPEG is kept in place as a master.

### Recommended future conversions (if tooling becomes available)

```bash
# WebP variants (smaller than JPEG at similar quality)
cwebp -q 80 src/assets/images/Hero_Background.jpeg -o src/assets/images/Hero_Background-1280.webp
cwebp -q 80 -resize 800 0 src/assets/images/Hero_Background.jpeg -o src/assets/images/Hero_Background-800.webp

# AVIF variants (smallest)
avifenc --min 25 --max 35 src/assets/images/Hero_Background.jpeg src/assets/images/Hero_Background-1280.avif

# OG image variants
cwebp -q 82 src/assets/images/og-blueprint-biologics.jpg -o src/assets/images/og-blueprint-biologics.webp
```

After adding WebP/AVIF, wrap the hero in a `<picture>` element or use
`image-set()` in CSS to deliver the lightest format the browser supports.

---

## 6. Font Strategy

Current setup uses Google Fonts (Inter, Plus Jakarta Sans, JetBrains Mono)
via the existing `<link>` tag plus `preconnect`. No local font files were
added, since the brief required not adding font files from random sources.

Production-friendly fallback stacks are already declared in
`design-system/tokens.css`:

```
--font-sans: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
--font-display: "Plus Jakarta Sans", var(--font-sans);
--font-mono: "JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace;
```

If Google Fonts is unavailable for any reason, the site degrades to the
system stack with no broken text.

### Recommended future improvement

When the client confirms the typography choice, self-host woff2 files
under `src/assets/fonts/` with `font-display: swap` and add
`<link rel="preload" as="font" type="font/woff2" crossorigin>` for the
critical weights. This removes the Google Fonts dependency and one
network hop.

---

## 7. Caching Strategy

`vercel.json` now sets:

| Path | Cache-Control |
|---|---|
| `/api/(.*)` | `no-store` |
| `/(thank-you\|wholesale-thank-you).html` | `no-store` plus `X-Robots-Tag: noindex` |
| `/product-detail.html` | `X-Robots-Tag: noindex, follow` |
| `/src/assets/images/*.{png,jpg,jpeg,webp,avif,svg,gif,ico}` | `public, max-age=2592000` (30 days) |
| `/*.{css,js}` | `public, max-age=86400, must-revalidate` (24 hours) |
| `/sitemap.xml`, `/robots.txt` | `public, max-age=3600` (1 hour) |
| All other paths | default Vercel cache plus shared security headers |

CSS/JS use a conservative 24-hour cache because filenames are not content
hashed in this static build. When asset hashing is added in a future
phase, those entries can switch to `max-age=31536000, immutable`.

---

## 8. AEO Content Blocks Added

Native `<details>`/`<summary>` accordion blocks placed before the contact
or disclaimer section on three pages:

- `index.html`, `#common-questions`, 4 Q&As: What is Blueprint Biologics,
  who can request wholesale access, are products intended for human or
  animal use, how do buyers request documentation.
- `catalog.html`, `#catalog-faqs`, 4 Q&As: pricing public, request
  availability, request documentation, why categorized by research category.
- `wholesale.html`, `#wholesale-faqs`, 3 Q&As: approval not guaranteed,
  who can apply, what happens after applying.

Answers are short, factual, compliance-safe, and link to
`quality.html` for the full FAQ to keep duplication low. The full
`FAQPage` JSON-LD lives only on `quality.html`, matching its visible 7-
item FAQ.

---

## 9. Items That Still Need Client Input

| Item | Action |
|---|---|
| Production domain | Replace `https://blueprintbiologics.com` placeholder across HTML, sitemap, robots, structured data, and metadata. |
| Final OG image | The current OG image is a 1200x630 crop of the hero. A purpose-designed image with the brand mark would be a nice upgrade. Drop into `src/assets/images/og-blueprint-biologics.jpg`. |
| Real product SKUs | Catalog uses Blueprint-style placeholder SKUs (`BB-GLP-001`, etc). Replace in `src/data/products.js`. |
| Static product pages | If product-level SEO is desired, convert `product-detail.html` into per-product static pages (e.g. `/catalog/semaglutide.html`) and add them to the sitemap with `Product` schema only after client review. |
| Legal sign-off | Privacy, Terms, and Research-Use are draft templates pending counsel review. |
| Resend domain verification | Required before production form submissions can be delivered. See `BLUEPRINT_PHASE_8_VERCEL_RESEND_SETUP.md`. |
| Optional analytics | No analytics currently. If Vercel Analytics or another privacy-friendly tool is added, update `privacy.html` accordingly. |

---

## 10. How to Run Lighthouse After Vercel Preview

1. Push the branch with Phase 9 changes.
2. Wait for the Vercel Preview deployment to finish.
3. Open the Preview URL in Chrome.
4. Open DevTools, Lighthouse tab.
5. Run separate audits for mobile and desktop on these pages:
   - `/`
   - `/catalog.html`
   - `/quality.html`
   - `/wholesale.html`
6. Target scores: 90+ on Performance, Accessibility, Best Practices, SEO.
7. Capture screenshots of the results into a short notes file for the
   client.

If Performance is below 90 on mobile:

- Confirm the hero variant served is `Hero_Background-800.jpg`, not the
  original 2.27 MB JPEG.
- Confirm the responsive `<link rel="preload">` is using the right
  `media` query (you should only see one hero image load per page).
- Consider deferring the Google Fonts stylesheet behind a small inline
  `media="print" onload="this.media='all'"` swap if FCP is being held back.
- Defer or remove any browser extensions during the audit.

---

## 11. Reminder

Production should use **Vercel + Resend only**, per Phase 8. The Phase 6
Netlify Forms doc is **obsolete** and is kept only as historical reference.
