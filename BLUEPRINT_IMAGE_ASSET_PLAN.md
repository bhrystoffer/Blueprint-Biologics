# Blueprint Biologics, Image Asset Plan

This is a **planning document only**. It describes future image asset needs for the website. Do not change any current `.placeholder-visual` blocks in the HTML or CSS until the client has approved final images. The placeholders are intentional and reserve correct space, aspect ratios, and labels.

## Ground rules

- **Do not use external stock images.** Every image must be original or client-licensed and stored in the repo at `src/assets/images/`.
- **Do not use external image URLs.** No CDN hotlinks. The site loads from its own deploy only.
- **Keep placeholder fallback paths intact.** When an image is added, the markup should swap in an `<img>` *alongside* the placeholder block, not delete the placeholder. If the image fails to load, the placeholder still renders.
- **Lazy-load below-the-fold imagery.** Add `loading="lazy"` and `decoding="async"` to every product image. The hero image keeps `fetchpriority="high"`.
- **Always set explicit `width` / `height` attributes (or `aspect-ratio` in CSS).** This prevents layout shift (CLS).
- **Compress aggressively.** Target <100 KB per product card image, <250 KB per detail hero. Convert source PNGs to optimized JPG or AVIF before commit.

## Folder convention

```
src/assets/images/
  Hero_Background-800.jpg                (already exists)
  Hero_Background-1280.jpg               (already exists)
  Blueprint Biologics V2 - Favicon.png   (already exists)
  Blueprint Biologics V2 - Logo Horizontal.png  (already exists)
  og-blueprint-biologics.jpg             (referenced in metadata, needs verification)
  products/
    <product-id>.jpg                     (1 per product, matches data.id)
    <product-id>@2x.jpg                  (optional retina)
  categories/
    glp1.jpg
    recovery.jpg
    longevity.jpg
    growth.jpg
    cognitive.jpg
    specialty.jpg
    solutions.jpg
  quality/
    lab-testing.jpg
    documentation.jpg
  wholesale/
    accounts.jpg
```

`<product-id>` matches the `id` field in `src/data/products.js`, e.g. `semaglutide-2mg-vial.jpg`, `aod9604-10mg-vial.jpg`.

## Asset types

### 1. Product card images
- **Used on:** `catalog.html` (cards view) and product-card visual hover/focus states.
- **Placeholder class today:** `.product-card` does not currently include a visual block. When images arrive, add an `<img>` inside a new `<div class="product-card__visual">` element. (The existing `.product-card__visual` CSS rules are already styled and ready.)
- **Aspect ratio:** 4 / 3
- **Recommended size:** 800 x 600 px source, served as 400 x 300 jpg (~40-60 KB)
- **Format:** JPG primary, AVIF/WebP optional via `<picture>`
- **Naming:** `src/assets/images/products/<product-id>.jpg`
- **Lazy load:** yes
- **Fallback:** keep the molecule-glyph CSS placeholder for any product without an image yet.

### 2. Product detail images
- **Used on:** `product-detail.html` left column.
- **Placeholder class today:** `.placeholder-visual.placeholder-visual--product`
- **Aspect ratio:** 4 / 3 or 1 / 1
- **Recommended size:** 1200 x 900 px source, served as 800 x 600 jpg (~120-200 KB)
- **Format:** JPG primary, AVIF/WebP optional
- **Naming:** same as card image, reused at higher resolution
- **Lazy load:** yes (detail page hero is above fold but always behind a click)
- **Fallback:** keep the existing vial-icon placeholder.

### 3. Catalog category visuals
- **Used on:** `catalog.html` featured-categories section, and optionally per-category headers.
- **Placeholder class today:** `.featured-cat__visual` (icon-glyph based, no image yet).
- **Aspect ratio:** 16 / 9 or 4 / 3
- **Recommended size:** 1200 x 675 px, served as 600 x 338 jpg (~50-80 KB)
- **Format:** JPG
- **Naming:** `src/assets/images/categories/<category-id>.jpg`
- **Lazy load:** yes
- **Fallback:** existing icon-glyph block stays as a default style on `.featured-cat__visual`.

### 4. Quality / lab visual
- **Used on:** `index.html` quality section, `quality.html` page hero.
- **Placeholder class today:** `.placeholder-visual` with documentation icon.
- **Aspect ratio:** 4 / 3
- **Recommended size:** 1200 x 900 px source, served as 800 x 600 jpg (~120-200 KB)
- **Format:** JPG
- **Naming:** `src/assets/images/quality/lab-testing.jpg`, `src/assets/images/quality/documentation.jpg`
- **Lazy load:** yes
- **Fallback:** keep the existing placeholder visual.

### 5. Wholesale / account visual
- **Used on:** `wholesale.html` hero and account-process panels.
- **Placeholder class today:** any `.placeholder-visual` on that page.
- **Aspect ratio:** 4 / 3
- **Recommended size:** 1200 x 900 px source, served as 800 x 600 jpg
- **Format:** JPG
- **Naming:** `src/assets/images/wholesale/accounts.jpg`
- **Lazy load:** yes

### 6. Open Graph share image
- **Used on:** every page's `og:image` and `twitter:image` metadata.
- **Current state:** metadata references `src/assets/images/og-blueprint-biologics.jpg`. **This file should be verified to exist before any LinkedIn/Slack/Twitter share goes out.**
- **Aspect ratio:** 1.91 / 1 (Open Graph spec)
- **Recommended size:** 1200 x 630 px JPG (<200 KB)
- **Format:** JPG only (PNG falls back fine but is larger)
- **Naming:** `src/assets/images/og-blueprint-biologics.jpg`
- **Lazy load:** no, must be a real file at deploy time.

### 7. Favicon and logo
Already present. Do not re-export unless the client supplies an updated brand mark.
- `src/assets/images/Blueprint Biologics V2 - Favicon.png`
- `src/assets/images/Blueprint Biologics V2 - Logo Horizontal.png`

## Wiring an approved image (procedure)

When the client delivers a final image:

1. Drop it at the correct path under `src/assets/images/`.
2. Open the relevant HTML or render function.
3. **Add** an `<img>` element with `loading="lazy"`, `decoding="async"`, explicit `width` and `height`. Use `srcset` if a `@2x` version is delivered.
4. Keep the `.placeholder-visual` block in the DOM as a `::after`-style fallback, or wrap the `<img>` with `onerror` to hide the image and show the placeholder. Easiest CSS pattern:
   ```html
   <div class="product-card__visual">
     <img src="src/assets/images/products/aod9604-10mg-vial.jpg"
          width="400" height="300"
          loading="lazy" decoding="async"
          alt="" />
   </div>
   ```
   (`.product-card__visual` already covers background gradient + grid overlay, so the image sits on top.)
5. Bump the cache-buster on the page if you also edited CSS or JS. If only HTML changed, no cache bump is needed (HTML is not query-cached).
6. Commit and push.

## Do-not list

- Do not replace a placeholder with a generic emoji or third-party icon font.
- Do not embed images via base64 data URIs.
- Do not commit RAW or PSD files. Optimized JPG/AVIF only.
- Do not add image-related `<script>` tags or carousel libraries. Keep the site vanilla.
- Do not add `schema.org` ImageObject markup tied to product prices. (No Product/Offer schema, period.)
