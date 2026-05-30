# Blueprint Biologics Image Asset Audit

## 1. Audit Summary

Scanned the local Blueprint Biologics project and checked the current live homepage at `https://blueprint-biologics.vercel.app/index.html`. Local pages scanned: `index.html`, `about.html`, `catalog.html`, `product-detail.html`, `quality.html`, `wholesale.html`, `contact.html`, `thank-you.html`, `wholesale-thank-you.html`, `privacy.html`, `terms.html`, and `buyer-responsibility.html`, plus `src/styles/site.css`, `src/scripts/catalog.js`, `src/scripts/product-detail.js`, and `src/data/products.js`.

The live homepage matches the local structure for the audited visual areas: existing logo/favicon/hero background assets are present, while catalog, documentation, product, quality, storage, and wholesale visuals remain CSS-only or placeholder-driven.

Recommended practical image set: 25 generated image assets. This includes 7 catalog/category visuals, 7 generic product/vial mockups by category, 5 quality/storage/wholesale visuals, 3 reusable hero/background/support visuals, 2 thank-you/support visuals, and 1 custom label visual. A larger full set could include 173 product-specific catalog images, but because labels cannot contain readable product names, the recommended approach is category-based reusable product mockups rather than one image per product.

## 2. Current Placeholder / Visual Inventory

| Current Area | Location | Current State | Recommendation |
|---|---|---|---|
| Homepage hero background | `index.html`, `src/styles/site.css` | Real responsive JPG assets exist: `Hero_Background-800.jpg`, `Hero_Background-1280.jpg`, `Hero_Background-1920.jpg` | Keep unless brand wants a refreshed lab hero. |
| Homepage catalog category cards | `index.html` catalog preview | Six CSS-only visual cards with inline SVG glyphs | Replace or enhance with category image assets. |
| Homepage quality visual | `index.html` quality section | `.placeholder-visual` documentation block | Replace with documentation/lab image. |
| Catalog featured categories | `catalog.html`, rendered by `src/scripts/catalog.js` | Seven CSS-only featured category buttons with SVG glyphs | Replace or enhance with category image assets. |
| Catalog product cards | `catalog.html`, rendered by `src/scripts/catalog.js` | No `<img>` output; CSS has `.product-card__visual` rules prepared | Add reusable category product mockups or optional product-specific images. |
| Catalog quality snapshot | `catalog.html` | CSS card with decorative SVG icon | Image not required; optional small accent only. |
| Catalog documentation CTA | `catalog.html` docs CTA | `.placeholder-visual.placeholder-visual--doc` | Replace with documentation image, can reuse homepage/quality doc visual. |
| Product detail vial visual | `product-detail.html` | `.placeholder-visual.placeholder-visual--product` | Replace with reusable generic product vial visual. |
| Quality documentation visual | `quality.html` documentation availability | `.placeholder-visual.placeholder-visual--doc` labeled Asset Pending | Replace with COA/documentation desk image. |
| Quality storage visual | `quality.html` storage handling | `.placeholder-visual.placeholder-visual--storage` labeled Asset Pending | Replace with compliant cold-storage/handling image. |
| Wholesale application visual | `wholesale.html` application aside | `.placeholder-visual.placeholder-visual--storage` labeled wholesale account visual | Replace with wholesale account review image. |
| Wholesale CTA cards | `index.html`, `catalog.html` | Text cards with SVG check icons | No image required. |
| About page | `about.html` | Feature cards and text sections, no image placeholders | No required image; optional brand/lab support image can wait. |
| Contact page | `contact.html` | Inquiry cards, form, no image placeholders | No image required. |
| Thank-you pages | `thank-you.html`, `wholesale-thank-you.html` | Success icon card, abstract background | No required image; optional subtle support visual can wait. |
| Legal pages | `privacy.html`, `terms.html`, `buyer-responsibility.html` | Legal hero grid backgrounds and text content | No image required; avoid adding distracting visuals. |
| Header/footer logo | All pages | Existing logo image used | No replacement needed. |
| Open Graph image | Metadata and `src/assets/images/og-blueprint-biologics.jpg` | File exists | No replacement required unless final brand changes. |

## 3. Exact Image Assets Needed

| # | Priority | Asset Name | Page | Section | Suggested File Name | Suggested Path | Ratio | Recommended Size | Asset Type | Description | Reuse Notes | Compliance Notes | Alt Text |
|---:|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | High | Primary biotech lab hero refresh | `index.html` | Hero background | `hero-lab-vials-01.webp` | `src/assets/images/blueprint/hero/` | 16:9 | 1920x1080 | Realistic photo background | Premium clean lab bench with generic clear research vials, soft white/blue light, shallow depth of field, no readable labels. | Optional replacement for existing hero; can also support OG refresh. | No syringes, needles, pills, people, logos, readable labels, drug names, dosing, or claims. | Clean research vials on a modern laboratory bench. |
| 2 | High | GLP-1 and incretin category visual | `index.html`, `catalog.html` | Catalog category cards and featured categories | `catalog-glp1-incretin-research.webp` | `src/assets/images/blueprint/catalog/` | 4:3 | 1200x900 | Abstract accent / lab photo hybrid | Generic molecular research composition with clear vial silhouettes and soft cyan highlights, no text. | Reuse for homepage CAT 01 and catalog featured category. | Avoid body transformation, weight loss, drug names, readable labels, or human-use cues. | Abstract research vial visual for GLP-1 and incretin category. |
| 3 | High | Recovery and repair category visual | `index.html`, `catalog.html` | Catalog category cards and featured categories | `catalog-recovery-repair-research.webp` | `src/assets/images/blueprint/catalog/` | 4:3 | 1200x900 | Abstract accent / lab photo hybrid | Clean bench-top research materials, frosted glass plates, neutral blue-gray tones, no anatomy. | Reuse for homepage CAT 02 and catalog featured category. | No wounds, body parts, treatment scenes, healing claims, or readable labels. | Abstract laboratory visual for recovery and repair research category. |
| 4 | High | Longevity and NAD+ category visual | `index.html`, `catalog.html` | Catalog category cards and featured categories | `catalog-longevity-nad-research.webp` | `src/assets/images/blueprint/catalog/` | 4:3 | 1200x900 | Abstract accent | Subtle macro molecule pattern over glassware, off-white and muted navy, calm research aesthetic. | Reuse for homepage CAT 03 and catalog featured category. | Avoid anti-aging imagery, age comparison, people, claims, or readable text. | Abstract molecule visual for longevity and NAD research category. |
| 5 | High | Growth hormone research category visual | `index.html`, `catalog.html` | Catalog category cards and featured categories | `catalog-growth-hormone-research.webp` | `src/assets/images/blueprint/catalog/` | 4:3 | 1200x900 | Abstract accent / product mockup | Generic research vials arranged in a measured grid with blank labels and soft lab lighting. | Reuse for homepage CAT 04 and catalog featured category. | No human growth imagery, transformation imagery, dosing, or drug names. | Generic research vial visual for growth hormone research category. |
| 6 | Medium | Cognitive research category visual | `index.html`, `catalog.html` | Catalog category cards and featured categories | `catalog-cognitive-research.webp` | `src/assets/images/blueprint/catalog/` | 4:3 | 1200x900 | Abstract accent | Clean neural-network-inspired molecule pattern in glass and soft blue tones, not sci-fi or neon. | Reuse for homepage CAT 05 and catalog featured category. | No brain scans, patients, medical claims, or readable labels. | Abstract research visual for cognitive research category. |
| 7 | Medium | Specialty compounds category visual | `index.html`, `catalog.html` | Catalog category cards and featured categories | `catalog-specialty-compounds.webp` | `src/assets/images/blueprint/catalog/` | 4:3 | 1200x900 | Product mockup | Premium grouping of generic clear vials and small lab containers on a clean white surface. | Reuse for homepage CAT 06 and catalog featured category. | Blank or unreadable labels only; no drug names, dosing, or prescription packaging. | Generic specialty compound research vials. |
| 8 | Medium | Solutions and accessories category visual | `catalog.html` | Featured categories only | `catalog-solutions-accessories.webp` | `src/assets/images/blueprint/catalog/` | 4:3 | 1200x900 | Product mockup | Generic clear solution vials, capped containers, and sterile-looking lab accessories without needles. | Reuse for catalog featured category and future catalog cards. | No syringes, needles, prescription bottles, readable labels, or injection wording. | Generic research solution vials and lab accessories. |
| 9 | High | Generic product vial mockup | `product-detail.html`, `catalog.html` | Product detail visual and catalog cards | `product-research-vial-generic-01.webp` | `src/assets/images/blueprint/products/` | 1:1 | 1200x1200 | Product mockup | Single clear research vial with blank frosted label, neutral cap, soft shadow, premium clean background. | Must-generate first; default fallback for all products. | Label must be blank or unreadable; no peptide names, drug names, doses, logos, or human-use packaging. | Generic clear research vial with blank label. |
| 10 | Medium | GLP-1 category product vial mockup | `catalog.html`, `product-detail.html` | Product cards and detail fallback for GLP-1 category | `product-vial-glp1-generic.webp` | `src/assets/images/blueprint/products/` | 1:1 | 1200x1200 | Product mockup | Generic clear vial in soft cyan accent environment, blank label only. | Reuse across all GLP-1 category products. | No GLP-1 text, product names, dosing, weight loss cues, or injection imagery. | Generic research vial for GLP-1 category products. |
| 11 | Medium | Recovery category product vial mockup | `catalog.html`, `product-detail.html` | Product cards and detail fallback for recovery category | `product-vial-recovery-generic.webp` | `src/assets/images/blueprint/products/` | 1:1 | 1200x1200 | Product mockup | Generic vial with muted blue-gray accent surface and blank label. | Reuse across recovery category products. | No healing, wounds, body parts, patients, treatment language, or readable label text. | Generic research vial for recovery category products. |
| 12 | Medium | Longevity category product vial mockup | `catalog.html`, `product-detail.html` | Product cards and detail fallback for longevity category | `product-vial-longevity-generic.webp` | `src/assets/images/blueprint/products/` | 1:1 | 1200x1200 | Product mockup | Generic vial with subtle molecule texture and soft off-white background. | Reuse across longevity category products. | No anti-aging claims, people, transformation visuals, readable labels, or drug names. | Generic research vial for longevity category products. |
| 13 | Medium | Growth category product vial mockup | `catalog.html`, `product-detail.html` | Product cards and detail fallback for growth category | `product-vial-growth-generic.webp` | `src/assets/images/blueprint/products/` | 1:1 | 1200x1200 | Product mockup | Generic vial upright with clean technical bench lighting and blank label. | Reuse across growth category products. | No growth claims, human bodies, dosing, names, or administration references. | Generic research vial for growth category products. |
| 14 | Low | Cognitive category product vial mockup | `catalog.html`, `product-detail.html` | Product cards and detail fallback for cognitive category | `product-vial-cognitive-generic.webp` | `src/assets/images/blueprint/products/` | 1:1 | 1200x1200 | Product mockup | Generic vial with subtle abstract molecule accent, premium research supply feel. | Reuse across cognitive category products. | No brain treatment claims, patients, readable labels, or drug names. | Generic research vial for cognitive category products. |
| 15 | Low | Solutions category product mockup | `catalog.html`, `product-detail.html` | Product cards and detail fallback for solutions category | `product-solution-vial-generic.webp` | `src/assets/images/blueprint/products/` | 1:1 | 1200x1200 | Product mockup | Clear solution vial/container with blank label, no injection devices. | Reuse across solutions and accessories products. | No syringes, needles, dosing, injection wording, prescription packaging, or readable labels. | Generic clear research solution vial. |
| 16 | High | Documentation and COA visual | `index.html`, `catalog.html`, `quality.html` | Quality preview, documentation CTA, documentation availability | `quality-documentation-coa.webp` | `src/assets/images/blueprint/quality/` | 5:4 | 1400x1120 | Realistic photo | Clean desk scene with unreadable lab documents, clipboard, and generic vials in background blur. | Reuse across homepage, catalog docs CTA, and quality page. | Documents must be unreadable; no FDA, sterile, clinical grade, drug names, logos, or claims. | Laboratory documentation and generic research vials. |
| 17 | High | Quality lab bench visual | `quality.html`, optional `index.html` | Quality overview / hero support | `quality-lab-bench-review.webp` | `src/assets/images/blueprint/quality/` | 4:3 | 1400x1050 | Realistic photo | Modern lab bench with clean glassware, sealed generic vials, and soft daylight. | Can support quality page and future hero panels. | No people, injections, readable labels, claims, or drug names. | Modern laboratory bench with generic research materials. |
| 18 | High | Storage and handling visual | `quality.html` | Storage and Handling Guidance | `quality-storage-handling.webp` | `src/assets/images/blueprint/quality/` | 5:4 | 1400x1120 | Realistic photo | Compliant cold-chain style storage shelf or insulated lab container with blank vials and no branded labels. | Reuse in wholesale fulfillment if needed. | No dry ice hazard text, prescription labels, syringes, needles, or readable packaging. | Generic research vials arranged for storage and handling. |
| 19 | High | Wholesale account review visual | `wholesale.html` | Application aside | `wholesale-account-review.webp` | `src/assets/images/blueprint/wholesale/` | 5:4 | 1400x1120 | Realistic photo | Professional desk with laptop edge, unreadable forms, blank lab documentation, and generic vials. | Must-generate first for wholesale page. | No people, logos, readable documents, medical treatment scenes, or product names. | Wholesale account review materials on a professional desk. |
| 20 | Medium | Fulfillment and shipping visual | `wholesale.html`, `index.html`, `catalog.html` | Program benefits / wholesale CTA support | `wholesale-fulfillment-shipping.webp` | `src/assets/images/blueprint/wholesale/` | 4:3 | 1400x1050 | Realistic photo | Clean shipping prep surface with plain insulated mailer, blank packing insert, and generic sealed containers. | Optional replacement for repeated text-only fulfillment cards. | No readable shipping labels, logos, drug names, prescription packaging, or claims. | Plain research-supply fulfillment materials ready for shipment. |
| 21 | Medium | Custom label visual | `index.html`, `wholesale.html`, `contact.html` | Custom label cards and inquiry context | `wholesale-custom-label-blank-vials.webp` | `src/assets/images/blueprint/wholesale/` | 4:3 | 1400x1050 | Product mockup | Several generic vials with blank/unreadable labels shown as customization examples. | Reuse anywhere custom labels are mentioned. | Labels must not be readable; no names, dosing, logos, claims, or prescription-style packaging. | Generic research vials with blank custom labels. |
| 22 | Low | Abstract molecule accent | Multiple pages | Section backgrounds / category accents | `accent-molecule-soft-blue.webp` | `src/assets/images/blueprint/accents/` | 16:9 | 1600x900 | Abstract accent | Subtle molecule pattern on off-white to soft-blue field, very low contrast. | Reuse as a light accent behind category or quality sections. | No text, logos, drug names, or claim-like symbols. | Soft abstract molecule pattern. |
| 23 | Low | Background texture | Multiple pages | Background bands | `background-lab-paper-texture.webp` | `src/assets/images/blueprint/backgrounds/` | 16:9 | 1920x1080 | Background texture | Very subtle paper/glass/lab-surface texture for section depth. | Optional; keep current CSS gradients if performance is preferred. | No readable document fragments, logos, claims, or product names. | Subtle laboratory surface texture. |
| 24 | Low | Contact support visual | `contact.html`, optional `about.html` | Contact/inquiry support | `support-inquiry-desk.webp` | `src/assets/images/blueprint/wholesale/` | 4:3 | 1400x1050 | Realistic photo | Clean business inquiry desk scene with unreadable notes and neutral laptop, no people. | Optional; contact page works without it. | No readable emails, names, logos, patient info, or medical claims. | Professional inquiry desk with unreadable notes. |
| 25 | Low | Thank-you confirmation visual | `thank-you.html`, `wholesale-thank-you.html` | Success card support | `support-confirmation-docs.webp` | `src/assets/images/blueprint/accents/` | 4:3 | 1200x900 | Abstract accent / realistic hybrid | Calm confirmation-style documentation scene with soft checkmark-like composition but no visible text. | Optional only; current success icon is sufficient. | No readable text, claims, logos, drug names, or medical scene. | Confirmation-style documentation visual. |

## 4. Must-Generate First

1. `product-research-vial-generic-01.webp` - single reusable product detail/catalog fallback.
2. `quality-documentation-coa.webp` - replaces the repeated documentation placeholder on homepage, catalog, and quality page.
3. `quality-storage-handling.webp` - replaces the storage handling placeholder on quality page.
4. `wholesale-account-review.webp` - replaces the wholesale application placeholder.
5. Seven catalog/category visuals:
   - `catalog-glp1-incretin-research.webp`
   - `catalog-recovery-repair-research.webp`
   - `catalog-longevity-nad-research.webp`
   - `catalog-growth-hormone-research.webp`
   - `catalog-cognitive-research.webp`
   - `catalog-specialty-compounds.webp`
   - `catalog-solutions-accessories.webp`

Must-generate first count: 11 assets.

## 5. Recommended Lean Asset Set

Smallest practical first pass: 11 images.

| Type | Count | Assets |
|---|---:|---|
| Generic vial/product mockup | 1 | `product-research-vial-generic-01.webp` |
| Catalog category images | 7 | One per category: GLP-1, recovery, longevity, growth, cognitive, specialty, solutions |
| Quality/documentation images | 2 | `quality-documentation-coa.webp`, `quality-storage-handling.webp` |
| Wholesale/account image | 1 | `wholesale-account-review.webp` |

This set makes the homepage, catalog, product detail, quality, and wholesale pages feel visually complete without generating 173 product-specific product images.

## 6. Full Asset Set

Recommended full practical set: 25 images from the table above.

| Type | Count | Notes |
|---|---:|---|
| Hero biotech/lab image | 1 | Optional refresh; current hero JPGs exist. |
| Catalog category images | 7 | Covers homepage and catalog category visuals. |
| Vial/product mockups | 7 | One generic default plus category-specific variants. |
| Quality/documentation visuals | 3 | Documentation, lab bench, storage handling. |
| Wholesale/account visuals | 3 | Account review, fulfillment, custom label. |
| Abstract molecule/accent textures | 2 | Optional backgrounds and accents. |
| Thank-you/contact supporting visuals | 2 | Optional polish only. |

Optional maximum set: 173 product-specific images, one for each current catalog item in `src/data/products.js`. This is not recommended for the first pass because all labels must remain blank or unreadable and cannot show product names, peptide names, doses, claims, or logos. Category-level reusable mockups will be more compliant and easier to maintain.

## 7. Suggested Folder Structure

```text
src/assets/images/blueprint/
  hero/
  catalog/
  products/
  quality/
  wholesale/
  backgrounds/
  accents/
```

If the current static site continues to serve assets from `src/assets/images/`, mirror the same structure there instead:

```text
src/assets/images/blueprint/
  hero/
  catalog/
  products/
  quality/
  wholesale/
  backgrounds/
  accents/
```

## 8. File Naming Convention

Use lowercase, hyphenated, descriptive names. Use `.webp` for final optimized images unless a specific compatibility reason requires JPG.

Examples:

```text
hero-lab-vials-01.webp
catalog-glp1-incretin-research.webp
catalog-recovery-repair-research.webp
product-research-vial-generic-01.webp
product-vial-growth-generic.webp
quality-documentation-coa.webp
quality-storage-handling.webp
wholesale-account-review.webp
wholesale-custom-label-blank-vials.webp
accent-molecule-soft-blue.webp
```

## 9. Next Implementation Step

After images are generated and approved, the next Codex task should be:

1. Place the final approved images into the agreed folder structure.
2. Convert/compress final assets to WebP and keep hero/detail assets under practical page-weight targets.
3. Update the relevant HTML and JS render functions with `<picture>` or `<img>` tags.
4. Add `loading="lazy"` and `decoding="async"` for below-the-fold visuals.
5. Add explicit `width` and `height` attributes or stable CSS `aspect-ratio` values.
6. Add compliant alt text from this audit.
7. Preserve placeholder fallbacks until image loading has been verified.
8. Test desktop, tablet, and mobile layouts.
9. Run performance checks and confirm no layout shift or oversized image payloads.

## QA Notes

- Pages scanned: 12 root HTML pages plus CSS/JS/data files.
- Current direct `.placeholder-visual` instances found in HTML: 6.
- Current CSS-only category/featured visual areas found: 13 visible category visuals, covering 6 homepage catalog cards and 7 catalog featured category buttons.
- Product card image slots: CSS exists, but rendered catalog cards currently output no product image element for 173 products.
- Images recommended in practical full set: 25.
- Must-generate image count: 11.
- Optional maximum product-specific count: 173 additional product images, not recommended for first pass.
- File created: `BLUEPRINT_IMAGE_ASSET_AUDIT.md`.
- Sections where no image is needed: legal pages, header/footer, contact form, wholesale CTA text cards, quality snapshot cards, thank-you success icons, and most feature-card grids.
- Exact next step: generate the 11 must-generate assets first using the compliance notes in this file, then place and wire them into the site in a separate implementation pass.
