# Blueprint Biologics, Build Roadmap

Phased plan for the redesign. Phase 1 is complete. Phases 2 through 10
deliver the full redesign.

Date: 2026-05-17

Core rules across all phases:
- The live site stays untouched until Phase 10 QA.
- Build in a separate branch or folder, review via Netlify Deploy
  Previews.
- Every phase consumes the design tokens and follows the Compliance Copy
  Guide.
- Every phase is tested at 390px, 768px, 1024px, and 1440px.
- No phase ships heavy scripts, unused libraries, or layout-shift bugs.

---

## Phase 1, Foundation, complete

Delivered: project audit, redesign strategy, compliance guide, design
system, this roadmap, and a light code foundation of design tokens and
utility classes. No redesign work started.

---

## Phase 2, Homepage Redesign

Goal: rebuild the homepage with the new design system and safe copy.

Scope:
- Scaffold the framework (Astro recommended) in a new branch
- Wire in `tokens.css` and `utilities.css`
- Build homepage sections: header, compliance strip, hero, trust pillars,
  catalog preview, how ordering works, quality summary, wholesale callout,
  contact CTA, footer
- Apply compliance-safe copy throughout
- Mobile-first, responsive across all four breakpoints

Done when: homepage renders cleanly on a Deploy Preview, no overflow, copy
passes the compliance checklist.

---

## Phase 3, Catalog and Product Experience

Goal: replace the static PDF approach with a usable catalog.

Scope:
- Catalog landing page with category cards
- Searchable, filterable product list
- Category filters and A to Z sort
- Product cards with SKU, dosage, per-vial and 10-vial pricing in mono
- Product detail page template
- Research-use disclaimer on every card and page
- "Request Quote" and "Add to Inquiry" actions, no cart checkout
- Keep a downloadable PDF price sheet as a secondary option
- Mobile: stacked cards, no wide tables

Done when: a buyer can browse, filter, and request a quote on any device.

---

## Phase 4, Quality, Testing, and Compliance Page

Goal: a dedicated page that builds buyer trust.

Scope:
- Quality standards overview
- Purity and testing approach, conservative wording only
- Documentation availability for qualified buyers
- Research-use position and buyer responsibility statement
- Scientific, factual tone, no outcome claims

Done when: the page communicates quality and compliance without any risky
language.

---

## Phase 5, Wholesale Account and Application Flow

Goal: a clear path for qualified buyers to apply for an account.

Scope:
- Wholesale accounts page explaining eligibility and the process
- Account application form with required fields and acknowledgment
  checkboxes per the Compliance Copy Guide
- Qualified-buyer verification messaging
- Confirmation and next-steps state after submission

Done when: a qualified buyer can apply and receive a clear confirmation.

---

## Phase 6, Contact Form and Email Integration

Goal: working inquiry and quote forms.

Scope:
- Contact and quote request forms
- Netlify Forms or a lightweight form handler, no heavy dependencies
- Spam protection, honeypot or similar
- Required compliance acknowledgment checkbox, not pre-checked
- Email routing to the orders inbox
- Success and error states

Done when: form submissions reliably reach the business inbox and users
see clear feedback.

---

## Phase 7, Legal, Privacy, and Terms Pages

Goal: complete the legal surface of the site.

Scope:
- Privacy Policy
- Terms of Service
- Research Use Disclaimer page
- Full footer disclaimer wired site-wide
- Cookie or tracking notice if any analytics are added

Note: legal pages should be reviewed by qualified counsel before launch.

Done when: all legal pages exist, are linked in the footer, and are
consistent with the Compliance Copy Guide.

---

## Phase 8, Responsive Polish

Goal: every page is correct at every width.

Scope:
- Audit all pages at 390px, 768px, 1024px, 1440px
- Fix horizontal overflow, oversized hero text, table breaks, button
  leaks, header and logo sizing
- Verify tap targets and mobile navigation
- Confirm no layout shift on load

Done when: no responsive defects remain on any page.

---

## Phase 9, Speed, SEO, and AEO Optimization

Goal: fast, discoverable, and answer-engine friendly.

Scope:
- Image optimization, WebP or AVIF, correct sizing, lazy loading
- Minimize and defer scripts, self-host fonts
- Meta titles, descriptions, Open Graph tags per page
- Semantic HTML, structured data where appropriate
- Sitemap and robots file
- AEO, clear factual content, FAQ-style sections, concise answers
- Lighthouse pass, target 90 plus on performance, accessibility, SEO

Done when: Lighthouse targets are met and core pages are indexable.

---

## Phase 10, QA, Deployment, and Client Polish

Goal: launch the redesign safely.

Scope:
- Full cross-browser and cross-device QA
- Final compliance copy review against the checklist
- Legal sign-off confirmation
- Link, form, and 404 checks
- Promote the redesign to production on Netlify
- Post-launch smoke test on the live domain
- Final client review and polish pass

Done when: the redesigned site is live, verified, and approved by the
client.

---

## Phase Dependency Summary

```
Phase 1  Foundation            done
Phase 2  Homepage              needs Phase 1
Phase 3  Catalog               needs Phase 2
Phase 4  Quality page          needs Phase 2
Phase 5  Wholesale flow        needs Phase 2, 6
Phase 6  Contact and email     needs Phase 2
Phase 7  Legal pages           needs Phase 2
Phase 8  Responsive polish     needs Phases 2 to 7
Phase 9  Speed, SEO, AEO       needs Phases 2 to 7
Phase 10 QA and deployment     needs Phases 2 to 9
```

Phases 4, 6, and 7 can run in parallel after Phase 2. Phase 5 depends on
the form work in Phase 6.
