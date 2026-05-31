# Blueprint Biologics, Catalog Maintenance

This document is the operator manual for keeping the product catalog up to date.

## Current state

- **Product count:** 163
- **Source of truth (data):** `src/data/products.js`
- **Source of truth (price sheet):** the official Blueprint Biologics price sheet PDF
- **Generator:** `tools/gen_products.py`
- **Renderers:**
  - `src/scripts/catalog.js` (search, filter, sort, cards, table)
  - `src/scripts/product-detail.js` (single-product detail + related strengths)
- **Catalog page:** `catalog.html`
- **Detail page:** `product-detail.html` (query-string driven via `?id=<product-id>`)
- **Live URL:** https://blueprint-biologics.vercel.app

## How to update prices

1. Open `tools/gen_products.py`.
2. Find the `ROWS` list. Each tuple is:
   `(name, strength, price_one_vial, price_ten_vial_box, category)`
3. Edit the price columns for any changed products. Add new tuples for new products. Delete tuples for discontinued products.
4. From the repo root, run:
   ```bash
   python3 tools/gen_products.py
   ```
   This rewrites `src/data/products.js`.
5. Bump the cache-buster so browsers refetch (see "Cache-busters" below).
6. QA locally (see "Catalog QA" and "Product detail QA" below).
7. Commit and push. Vercel redeploys automatically.

## How to add new products

- Append a row to the `ROWS` list in `tools/gen_products.py`.
- Use the exact product name from the price sheet (do not paraphrase).
- Each strength gets its own row. Do not combine.
- Pick a category id from the allowed set (see below). If unsure, use `specialty`.
- Regenerate, cache-bust, QA, commit, push.

## How to preserve alphabetical default order

The catalog renderer (`catalog.js`) strips leading non-letters before sorting, so `5-Amino-1MQ` lands inside the A group as it does on the printed price sheet. **You do not need to manually pre-sort `ROWS`** for the website to display in A-Z order, but keeping `ROWS` in price-sheet order makes diffs reviewable.

## How to assign categories conservatively

Allowed category ids (defined in both the generator and the renderer):

| id | label | use for |
|---|---|---|
| `glp1` | Incretin Products | Semaglutide, Tirzepatide, Retatrutide, Liraglutide, Survodutide, Cagrilitide and its blends, GLP-1. Rendered to the UI as "Incretin Products" (not GLP-1 only) since the catalog mixes GLP-1, GLP-2, and GLP-3 class compounds. |
| `recovery` | Recovery & Repair Research | BPC 157, TB500, Thymosin Alpha-1, Thymalin, GHK-Cu, LL37, KPV, GLOW50, KLOW80, Hyaluronic Acid, BPC+TB blends |
| `longevity` | Longevity & NAD+ Research | NAD+ (Buffered), Epithalon, Glutathione, 5-Amino-1MQ, FOXO4-DRI, Humanin, SS-31, MOTS-c, Pinealon, Cortagen, Crystagen |
| `growth` | Growth Hormone Research | Ipamorelin, CJC-1295 (with/without DAC + blends), Sermorelin Acetate, Tesamorelin, HGH 191AA, HGH Fragments, GHRP-2, GHRP-6, Hexarelin Acetate, MGF, PEG MGF, IGF-1LR3, IGF-DES |
| `cognitive` | Cognitive Research | Selank, Semax, Cerebrolysin, DSIP, P21, PE22-28, Dermorphin, ARA-290, Melatonin, B7-33 |
| `specialty` | Specialty Compounds | Anything not fitting above (ACE-031, Adamax, Adipotide, AICAR, Alprostadil, AOD9604, EPo, Follistatin-344, GDF-8, HCG, HMG, Gonadorelin Acetate, Kisspeptin, L-Carnitine, Lyophilisate, Melanotan 1, MT-2, Oxytocin, PNC27, PT-141, SNAP-8, VIP) |
| `solutions` | Solutions & Accessories | Acetic Acid Solution / Water, BAC Water |

**Do not introduce new top-level categories without legal review.** New buckets risk implying therapeutic uses.

## Cache-busters

Every HTML page loads CSS/JS with a `?v=<version>` query string so browsers refetch when files change.

When you change **any** of:
- `src/data/products.js`
- `src/scripts/catalog.js`
- `src/scripts/product-detail.js`
- `src/scripts/site.js`
- `src/styles/site.css`

bump the version on every HTML page. Easiest one-liner from the repo root:

```bash
python3 -c "
import re
V = 'YOUR-NEW-VERSION'
for p in ['index.html','catalog.html','product-detail.html','quality.html','wholesale.html','privacy.html','terms.html','research-use.html','thank-you.html','wholesale-thank-you.html']:
    t = open(p).read()
    open(p,'w').write(re.sub(r'\?v=[a-z0-9-]+', f'?v={V}', t))
"
```

Pick a short, lowercase version slug describing the change (e.g. `prices-2026-q3`, `solutions-added`, `category-rebalance`). Do not reuse old slugs.

If you only changed docs or `tools/`, **do not** bump the cache-buster.

## Catalog QA

After updating, run a local server and verify:

```bash
python3 -m http.server 8765
open http://localhost:8765/catalog.html
```

Checks:
- Cards render with name, strength, 1 Vial price, 10 Vial Box price, custom-label note, Request Quote CTA.
- Table view renders with Product / Strength / Category / 1 Vial / 10 Vial Box / Action columns.
- Search: `Semaglutide` returns 8 rows, `AOD9604` returns 3, `Tirzepatide` returns 9, `10mg` returns many.
- Sort: A-Z is default, Z-A reverses, 1 Vial Low->High and 10 Vial Box High->Low both work and respect alphabetical tiebreak.
- Category pills filter as expected; A-Z letter pills also filter.
- Sticky controls bar appears below the header at >=768px when scrolling.

## Product detail QA

```bash
open http://localhost:8765/product-detail.html?id=semaglutide-2mg-vial
open http://localhost:8765/product-detail.html?id=aod9604-10mg-vial
open http://localhost:8765/product-detail.html?id=tirzepatide-100mg-vial
```

Checks:
- Title, strength, 1 Vial price, 10 Vial Box price all populate.
- Custom label note and availability text show.
- "Other Available Strengths" lists every sibling sorted numerically.
- Request Quote CTA href is `index.html?inquiry=pricing&product=<Name+strength>#contact`.
- Page tab title is `<Name> <strength> | Blueprint Biologics`.

Legacy URL test (covered by strength-picker fallback):

```bash
open http://localhost:8765/product-detail.html?id=semaglutide
```

Should render a "Select a Strength" picker listing every Semaglutide row with prices, **not** dashes or "not found".

## Compliance reminders

- **Do not** add `schema.org` Product or Offer markup, or any pricing schema. This is a research-use wholesale catalog, not an ecommerce store. Product Detail pages remain `noindex, follow`.
- **Do not** add Buy Now, Shop, Add to Cart, Start Treatment, or checkout language anywhere. Use Request Quote or Inquire.
- **Do not** add medical, treatment, dosage, weight-loss, anti-aging, healing, cognitive-enhancement, human-use, or FDA-approved claims.
- **Do not** add cGMP, GMP, ISO, sterile, 99% purity, pharmaceutical-grade, or clinical-grade claims without verified documentation and legal review.
- **Do not** touch image placeholder visuals (`.placeholder-visual` blocks) until the client has approved final images. See `BLUEPRINT_IMAGE_ASSET_PLAN.md`.
- **Do not** use em dashes anywhere in copy or comments. Use hyphens, commas, or sentence rewrites.
- Always preserve the research-use disclaimer, the buyer-responsibility line, and the "Pricing and availability may change" note.

## Vercel + Resend (do not break)

- `api/contact.js` is the Vercel serverless function that sends inquiries via Resend.
- Contact form posts to `/api/contact` from `index.html`.
- Wholesale application form posts to `/api/contact` from `wholesale.html`.
- Hidden context fields ride with each submission: `product_context`, `inquiry_context`, `source_url`, `submitted_from`, `timestamp`, `account_context`.
- Request Quote links from catalog/detail pages set `?inquiry=pricing&product=<Name+strength>` in the URL so the homepage handler prefills the form.
- Do not reintroduce Netlify Forms attributes or any other form provider.
- Do not put secrets in the frontend; the Resend API key lives in Vercel env vars.
