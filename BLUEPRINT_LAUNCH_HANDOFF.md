# Blueprint Biologics, Launch Handoff Notes

Engineering / ops reference. Pair with:
- `BLUEPRINT_CATALOG_MAINTENANCE.md` (operator manual for price/product updates)
- `BLUEPRINT_IMAGE_ASSET_PLAN.md` (image asset plan, do-not-touch placeholder policy)
- `BLUEPRINT_CLIENT_REVIEW_CHECKLIST.md` (client-facing review punch list)

## Recent additions

- **`about.html`** is live. Dedicated About page covering company positioning, what Blueprint provides, catalog & pricing, wholesale support, documentation, eligibility, and compliance.
- **`contact.html`** is live. Dedicated Contact page with 6 inquiry routing cards, a full inquiry form (reuses the homepage form pattern, posts to `/api/contact`, `submitted_from = contact-page-inquiry`), a quick-links sidebar, and a FAQ.
- **Sitewide nav** routes About → `about.html` and Contact → `contact.html` in every header and mobile menu. Footer Site column now includes Home, About, Catalog, Quality, Wholesale, Contact across all pages.
- **Request Quote links** in catalog cards, the catalog table view, and product-detail pages now route to `contact.html?inquiry=pricing&product=<Name+strength>#contact-form`. Catalog and detail JS were updated together.
- **Legacy back-compat** preserved: old homepage URLs like `index.html?inquiry=pricing&product=AOD9604%2010mg/vial#contact` still prefill the homepage form (`submitted_from = homepage-inquiry`). The homepage contact section was intentionally kept.
- `sitemap.xml` now includes both `/about.html` (priority 0.8) and `/contact.html` (priority 0.7).

## Repository

- **GitHub:** https://github.com/bhrystoffer/Blueprint-Biologics
- **Default branch:** `main`
- Every commit to `main` triggers an automatic Vercel deploy.

## Hosting

- **Platform:** Vercel
- **Preview URL:** https://blueprint-biologics.vercel.app
- **Production domain:** to be connected before launch (placeholder `blueprintbiologics.com` is used in canonical, OG, and sitemap references — update if the final domain differs).
- **Build:** static HTML / CSS / vanilla JS. No build step required. Vercel serves files directly.
- **Serverless function:** `api/contact.js` (Node.js runtime, Resend SDK).
- `vercel.json` configures the function.
- `package.json` declares the single runtime dep: `resend ^3.5.0`.

## Required environment variables (Vercel project settings)

| Variable | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | yes | Resend project API key. |
| `CONTACT_TO_EMAIL` | yes | Inbox that receives all inquiries. |
| `CONTACT_FROM_EMAIL` | yes | Sender address. Must be on a verified Resend sender domain. |
| `CONTACT_FROM_NAME` | optional | Default `"Blueprint Biologics"`. |
| `CONTACT_REPLY_TO_FALLBACK` | optional | Defaults to `CONTACT_FROM_EMAIL`. Used when the submitter's email cannot be used as reply-to. |

Set these for **Production**, **Preview**, and **Development** environments in Vercel. Redeploy after setting.

## Product price update workflow

Single source of truth: `src/data/products.js`. Regenerated from `tools/gen_products.py`. Full procedure in `BLUEPRINT_CATALOG_MAINTENANCE.md`. Short version:

1. Edit `ROWS` in `tools/gen_products.py` with new prices / new products.
2. `python3 tools/gen_products.py` from the repo root.
3. Bump cache-buster on every HTML page (`?v=<new-version>`).
4. QA locally with `python3 -m http.server 8765`.
5. Commit, push, Vercel redeploys.

## Image placeholder workflow

**Do not** swap a placeholder for an icon or stock image. Wait for client-approved imagery, then follow the wiring procedure in `BLUEPRINT_IMAGE_ASSET_PLAN.md`:

- Drop file under `src/assets/images/` at the documented path.
- Add an `<img>` with `loading="lazy"`, `decoding="async"`, explicit `width` and `height`.
- Keep the `.placeholder-visual` block in the DOM as a fallback.

## Legal review status

Privacy, Terms, and Research-Use Disclaimer pages are conservative drafts. Each carries a visible **Draft Legal Notice** badge and a "Draft template for counsel review" line in the meta description. After counsel sign-off:

1. Remove the draft badge block from each page.
2. Strip "Draft template for counsel review" from the meta descriptions on the same pages.
3. Update the `Last updated` line to a real date.
4. Update the `<title>` if counsel renames the page.

Do not claim CCPA/CPRA/HIPAA/FDA compliance anywhere without explicit counsel approval.

## Final production domain task

When the verified production domain is attached in Vercel:

1. Find-and-replace the placeholder `blueprintbiologics.com` in:
   - `<link rel="canonical">` on every HTML page
   - `og:url` and JSON-LD `url`/`@id` on every HTML page
   - `sitemap.xml`
   - `robots.txt` if it references the host
2. Verify SSL is provisioned.
3. Re-verify the Resend sender domain matches the new production domain.
4. Hit each page and confirm canonical URLs point to the new domain.
5. Submit the new `sitemap.xml` to Google Search Console under the new property.

## SEO / indexing

- `sitemap.xml` lists the 5 main public pages (home, catalog, quality, wholesale, plus the legal pages). Product detail, thank-you, wholesale-thank-you are excluded by design.
- `robots.txt` is in the repo root.
- `product-detail.html` is `noindex, follow` (query-string template; canonicals point at `/catalog.html`).
- `thank-you.html` and `wholesale-thank-you.html` are `noindex`.
- Each page has title, description, OG, and Twitter metadata.
- JSON-LD: `Organization` + `WebSite` on the homepage, `BreadcrumbList` on internal pages. **No** `Product`, `Offer`, `Drug`, `MedicalBusiness`, `Review`, `AggregateRating`, or pricing schema. This is intentional — keep it that way unless legal explicitly approves.

## Post-launch monitoring recommendations

| Area | What to watch | How |
|---|---|---|
| Form deliverability | Resend dashboard for bounces, sender reputation | Resend → Logs |
| Inbox flow | `CONTACT_TO_EMAIL` actually receiving inquiries | Inbox + ask client weekly for the first month |
| 404s / broken links | Vercel access logs for sustained 404 patterns | Vercel → Analytics |
| Catalog data integrity | Spot-check 5 random products vs. price sheet monthly | Manual or scripted via `tools/gen_products.py` diff |
| Performance | Largest Contentful Paint on home + catalog | Lighthouse or PageSpeed Insights monthly |
| Security headers | No frontend secrets, no unsafe inline scripts | Manual review on each release |
| Compliance language | New copy from client passes the `BLUEPRINT_CATALOG_MAINTENANCE.md` do-not list | PR review |
| Cache-buster discipline | Every CSS/JS/data change bumps `?v=` site-wide | PR review |

## Quick references

- Sticky catalog controls bar offset is `top: 64px` on the category pills. If a global announcement bar is added later, adjust that offset.
- Default catalog sort is alphabetical with leading non-letters stripped (so "5-Amino-1MQ" sits inside the A group, matching the price sheet).
- Strength-picker fallback on `product-detail.html?id=<base-slug>` (without strength) lists every matching strength with prices.
- Request Quote deep-link pattern: `index.html?inquiry=pricing&product=<Name+strength>#contact`.
- Honeypot field name on every form: `bot-field`.
