# Blueprint Biologics, Phase 6 Netlify Form Setup

> **OBSOLETE FOR FINAL DEPLOYMENT.**
> This project will be hosted on **Vercel** and use **Resend** for form
> delivery. Netlify Forms were used only as an earlier temporary
> implementation and should **not** be used for the final production
> deployment. The production wiring is described in
> [`BLUEPRINT_PHASE_8_VERCEL_RESEND_SETUP.md`](BLUEPRINT_PHASE_8_VERCEL_RESEND_SETUP.md).
> This document is kept for historical reference only and should be
> removed from any production launch checklist.

Phase 6 wired the homepage inquiry form and the wholesale application form
to Netlify Forms. This document covers the dashboard steps the client need-
ed to complete on the temporary Netlify deployment.

Date: 2026-05-21
Applies to: Netlify production site for `blueprintbiologics.netlify.app`

This file is operational notes, not legal advice. Final form copy and
disclaimers should be reviewed by qualified counsel before launch.

---

## 1. What Was Wired in Code

Two forms now have full Netlify attributes.

| Form | Page | name | Action | Submission target |
|---|---|---|---|---|
| Contact / inquiry | `index.html` | `contact-inquiry` | `/thank-you.html` | Homepage inquiry |
| Wholesale application | `wholesale.html` | `wholesale-application` | `/wholesale-thank-you.html` | Wholesale application |

Both forms include:
- `method="POST"`
- `data-netlify="true"`
- `netlify-honeypot="bot-field"`
- A static hidden `form-name` input matching the form name
- A visually hidden honeypot field at `.u-honeypot` (`name="bot-field"`)
- Hidden context fields populated by JS:
  - `product_context` (homepage only, from `?product=`)
  - `inquiry_context` (homepage only, from `?inquiry=`)
  - `account_context` (wholesale only, from `?account=apply`)
  - `source_url` (full URL at submission time)
  - `submitted_from` (static value, `homepage-inquiry` or `wholesale-application`)
  - `timestamp` (ISO timestamp at submission time)

Validation runs client-side first. Required acknowledgments are still
required. Forms only submit natively when validation passes.

### Phase 7 addendum: Netlify Reply-to support

Both forms include an `email` field so Netlify form notification emails can
populate the Reply-to header with the submitter's address:

- The visible "Work Email" input uses `name="work_email"`. This name was
  preserved so existing Netlify submissions, dashboard records, and JS
  references continue to work.
- A hidden `<input type="hidden" name="email">` is included in both forms.
  It is populated by `src/scripts/site.js` (via
  `populateContextFields(form)`) from the visible Work Email field
  immediately before the native Netlify submit fires.
- Each form contains exactly one field named `email`. No PII is logged to
  the console, written to `localStorage`, or stored in `sessionStorage`.

---

## 2. Required Netlify Dashboard Steps

Run these after the next deploy that includes Phase 6 changes.

### 2.1 Confirm form detection is enabled

Netlify Forms ship enabled by default for new sites. To verify:

1. Log in to the Netlify dashboard
2. Open the `blueprintbiologics` site
3. Go to **Site configuration → Forms**
4. Confirm "Form detection" is **On**. If you see a banner saying forms are
   disabled, click **Enable form detection**.

### 2.2 Trigger a redeploy

Netlify only registers forms when it processes the static HTML during a
build. Two ways to trigger a new build:

- Push a commit with the Phase 6 changes to the connected branch, OR
- In the dashboard click **Deploys → Trigger deploy → Clear cache and
  deploy site**

### 2.3 Confirm forms appear in the dashboard

After the deploy succeeds:

1. Open **Forms** in the site dashboard
2. You should see two forms listed:
   - `contact-inquiry`
   - `wholesale-application`
3. If you do not see them within a minute of the deploy completing,
   confirm the deploy preview includes the form markup and that
   `data-netlify="true"` is present. Then trigger another deploy.

### 2.4 Configure email notifications

For each form:

1. Click the form name in the dashboard
2. Go to **Settings & usage → Form notifications**
3. Click **Add notification → Email notification**
4. Email to notify: `orders@blueprintbiologics.com`
5. Event: **New form submission**
6. Form: select the form you want this notification on
7. Click **Save**

Repeat for the other form.

Optional: add a second notification routed to a secondary inbox if the
client wants redundancy.

### 2.5 Optional Slack notifications

If the client wants real-time alerts:

1. In **Form notifications**, click **Add notification → Slack
   integration** (or **Outgoing webhook** for any other tool)
2. Authorize Slack and pick the channel
3. Repeat for each form

### 2.6 Test the live forms

After the dashboard is configured:

1. Open the live site in a private/incognito window
2. Submit each form with valid data
3. Confirm you land on the correct thank-you page
   - `contact-inquiry` → `/thank-you.html`
   - `wholesale-application` → `/wholesale-thank-you.html`
4. Confirm the email arrives at `orders@blueprintbiologics.com`
5. In the Netlify dashboard, open the form and verify the submission is
   listed with all fields, including the hidden context fields

### 2.7 Check spam vs verified submissions

In **Forms → [form name]** Netlify groups submissions:

- **Verified** submissions, real users
- **Spam** submissions, caught by the honeypot or Netlify spam filtering

Review the spam tab weekly during launch to confirm legitimate inquiries
are not being filtered. If a legitimate inquiry lands in spam, mark it as
not spam to retrain the filter.

---

## 3. Honeypot Behavior

Both forms include a hidden honeypot field at `name="bot-field"` and the
form attribute `netlify-honeypot="bot-field"`.

How it works:

- The field is positioned off-screen by CSS in `.u-honeypot`
- Real users never see or fill it
- Most bots auto-fill every input on the page
- Netlify silently rejects any submission with a non-empty `bot-field`

If spam volume is still high after deployment, you can layer in Netlify's
built-in reCAPTCHA option from the **Forms → Spam filters** dashboard tab.
The current honeypot setup does not require reCAPTCHA to work.

---

## 4. Field Reference

### 4.1 `contact-inquiry` fields, in submission order

- `form-name` (hidden, always `contact-inquiry`)
- `bot-field` (honeypot)
- `product_context` (hidden, populated from `?product=`)
- `inquiry_context` (hidden, populated from `?inquiry=`)
- `source_url` (hidden, full URL at submission time)
- `submitted_from` (hidden, always `homepage-inquiry`)
- `timestamp` (hidden, ISO timestamp)
- `full_name`, `work_email`, `organization`, `buyer_type`
- `inquiry_type`, `message`
- `ack` (required research-use acknowledgment)

### 4.2 `wholesale-application` fields, in submission order

- `form-name` (hidden, always `wholesale-application`)
- `bot-field` (honeypot)
- `account_context` (hidden, populated from `?account=apply`)
- `source_url`, `submitted_from`, `timestamp` (hidden)
- `full_name`, `work_email`, `phone`, `organization`, `website`
- `buyer_type`, `volume`, `state`, `country`
- `categories[]` (multiple values from checkbox group)
- `notes`
- `ack_research`, `ack_disease`, `ack_review`, `ack_laws` (all required)

---

## 5. Privacy and Compliance Notes

- Forms include a privacy microcopy block above the submit button asking
  users not to submit medical or patient information.
- All 4 wholesale acknowledgments and the homepage acknowledgment must be
  checked before submit. JS validation enforces this client-side; the
  Netlify dashboard records whether the checkboxes were submitted as part
  of the form data.
- No form data is logged to the browser console.
- No PII is persisted to `localStorage` or `sessionStorage`.
- Hidden context fields contain only URL parameters and a timestamp.

Phase 7 will add real `/privacy.html`, `/terms.html`, and `/research-use.html`
pages. After those pages exist, link them from the privacy microcopy and
update the footer.

---

## 6. Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Form does not appear in dashboard | No build has run since Phase 6 markup landed, or `data-netlify="true"` missing | Trigger a deploy with cache cleared, then check `view-source:` of the live page for `data-netlify` |
| Submission lands on a 404 page | Thank-you page path mismatch | Confirm `thank-you.html` and `wholesale-thank-you.html` are at the site root and the form `action` matches |
| Email notification not received | Notification not configured, or sent to spam | Re-check dashboard notifications, check the spam folder, send a test from the dashboard |
| Real inquiries flagged as spam | Aggressive Netlify filtering | Mark as not spam in the dashboard. Consider disabling auto-spam filtering temporarily if needed |
| Submitted fields missing context | JS did not run before submit | Confirm `src/scripts/site.js` is loaded with `defer` on the form page |

---

## 7. Next Steps After This Setup

1. Run the test plan in Section 2.6 with a real submission
2. Confirm the email lands at `orders@blueprintbiologics.com`
3. Add the Slack notification if requested
4. Move into Phase 7, legal pages (Privacy, Terms, Research Use Disclaimer)
