# Blueprint Biologics, Phase 8 Vercel + Resend Setup

Phase 8 migrated the contact and wholesale forms off Netlify Forms and onto
a Vercel Serverless Function that sends email via Resend.

Date: 2026-05-21
Applies to: production Vercel deployment for Blueprint Biologics

This file is operational notes, not legal advice. Final form copy and
disclaimers should be reviewed by qualified counsel before launch.

---

## 1. Hosting

Blueprint Biologics is hosted on **Vercel**. Form submissions are processed
by a Vercel Serverless Function at `/api/contact` and delivered via
[Resend](https://resend.com). Netlify Forms are no longer used in
production. See `BLUEPRINT_PHASE_6_NETLIFY_FORM_SETUP.md` for the obsolete
Netlify notes.

---

## 2. Required Environment Variables

Configure these in the Vercel dashboard under
**Project → Settings → Environment Variables**. Add them to **Production**,
**Preview**, and **Development** environments.

| Name | Required | Example | Notes |
|---|---|---|---|
| `RESEND_API_KEY` | Required | `re_xxxxxxxxxxxxxxxx` | Secret. Create in the Resend dashboard. Do not commit. |
| `CONTACT_TO_EMAIL` | Required | `orders@blueprintbiologics.com` | Inbox that receives form submissions. |
| `CONTACT_FROM_EMAIL` | Required | `noreply@blueprintbiologics.com` | Verified sender. Must use a domain verified in Resend. |
| `CONTACT_FROM_NAME` | Optional | `Blueprint Biologics` | Display name. Defaults to `Blueprint Biologics`. |
| `CONTACT_REPLY_TO_FALLBACK` | Optional | `orders@blueprintbiologics.com` | Used when the submitter email is missing or invalid. |

### Important rules

- **Do not put secrets in frontend JS.** The Resend API key is only read by
  the serverless function at request time.
- `CONTACT_FROM_EMAIL` must be a raw email address only, for example
  `noreply@blueprintbiologics.com`. The display name is assembled in code.
- Verify the sender domain in the Resend dashboard before production
  sending. Unverified domains will be rejected.
- The function does not echo specific env var names to the client on
  failure. It returns a generic 500 with a friendly message.

---

## 3. Files Touched by Phase 8

- `api/contact.js`: Vercel Serverless Function, accepts POST only,
  validates required fields, checks the honeypot, sends via Resend.
- `package.json`: adds the `resend` dependency and `dev` / `deploy`
  scripts.
- `src/scripts/site.js`: both forms now POST JSON to `/api/contact` via
  `fetch`. Submit button shows a "Sending..." state and is disabled while
  the request is in flight. Successful submissions redirect to the matching
  thank-you page. Errors surface inline and re-enable the submit button.
- `index.html`, `wholesale.html`: Netlify-specific attributes removed.
  Hidden context fields and the honeypot remain. `data-form-type` and
  `data-success-url` attributes drive the new shared submit handler.
- `BLUEPRINT_PHASE_6_NETLIFY_FORM_SETUP.md`: marked obsolete with a
  banner at the top.

---

## 4. API Endpoint Contract

`POST /api/contact`

Request body, `application/json`:

```jsonc
{
  "form_type": "contact-inquiry" | "wholesale-application",
  "full_name": "...",
  "work_email": "...",
  "email": "...",             // mirror of work_email, for Reply-to
  "phone": "...",
  "organization": "...",
  "website": "...",
  "buyer_type": "...",
  "inquiry_type": "...",      // contact form
  "message": "...",           // contact form
  "volume": "...",            // wholesale form
  "state": "...",             // wholesale form
  "country": "...",           // wholesale form
  "categories": ["..."],      // wholesale form, multi-select
  "notes": "...",             // wholesale form
  "ack": true,                // contact form
  "ack_research": true,       // wholesale form
  "ack_disease": true,        // wholesale form
  "ack_review": true,         // wholesale form
  "ack_laws": true,           // wholesale form
  "bot-field": "",            // honeypot, must be empty
  "product_context": "...",
  "inquiry_context": "...",
  "account_context": "...",
  "source_url": "...",
  "submitted_from": "homepage-inquiry" | "wholesale-application",
  "timestamp": "ISO-8601"
}
```

Response, JSON:

| Status | Body | Meaning |
|---|---|---|
| `200` | `{ "ok": true, "message": "Submission received." }` | Sent or honeypot tripped. |
| `400` | `{ "ok": false, "message": "Required fields missing or invalid.", "fields": [...] }` | Validation failed. |
| `405` | `{ "ok": false, "message": "Method Not Allowed. Use POST." }` | Non-POST request. |
| `500` | `{ "ok": false, "message": "Server is not fully configured. Please try again later." }` | Missing env vars or unexpected error. |
| `502` | `{ "ok": false, "message": "Unable to send submission at this time." }` | Resend rejected the send. |

Honeypot behavior: if `bot-field` is filled, the endpoint returns 200
without sending email. This silently absorbs most bot traffic.

---

## 5. Local Testing

This is a static-first site. The Python `http.server` used during earlier
phases does not run Vercel Functions. `/api/contact` will 404 in that
preview, and the form will display:

> Local static preview detected. Form will submit through /api/contact once
> deployed to Vercel.

To test the form end to end locally, use the Vercel CLI:

```bash
npm install          # installs the resend dependency
npx vercel link      # one-time, links the local folder to the project
npx vercel env pull  # pulls env vars from the Vercel dashboard into .env
npx vercel dev       # runs static files + /api functions on http://localhost:3000
```

Or, with the script in `package.json`:

```bash
npm run dev
```

Layout-only QA can still use any static server. The form will gracefully
inform the user that the API is not available locally.

---

## 6. Vercel Deployment Settings

If creating a fresh Vercel project:

- **Framework Preset**: Other
- **Root Directory**: `./`
- **Build Command**: leave empty
- **Output Directory**: leave empty (Vercel will serve static files from
  the project root)
- **Install Command**: leave default (`npm install`) so the `resend`
  dependency installs for the API function

Add the environment variables from Section 2.

Push the branch or click **Deploy** in the dashboard.

---

## 7. Post-Deploy Test Plan

After the first deploy with the Phase 8 changes:

1. Visit the deployed homepage URL.
2. Submit the contact form with valid data. Confirm:
   - The submit button shows "Sending..." briefly.
   - You land on `/thank-you.html`.
   - An email arrives at the address configured by `CONTACT_TO_EMAIL`.
   - The Reply-to header on the email matches the submitter's address.
3. Submit the wholesale form with valid data. Confirm the same flow with
   `/wholesale-thank-you.html`.
4. Submit the contact form with empty required fields. Confirm inline
   error states appear and no email is sent.
5. Submit the wholesale form with the honeypot field filled (via DevTools
   or curl). Confirm the API returns 200 without sending email.
6. Send a GET to `/api/contact` from curl. Confirm it returns 405.

---

## 8. Common Errors

| Symptom | Likely cause | Fix |
|---|---|---|
| 500 on every submit | Missing `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, or `CONTACT_FROM_EMAIL` | Set the three env vars in the Vercel dashboard, redeploy. |
| 502 on every submit | Resend rejecting due to unverified sender domain | Verify the domain in the Resend dashboard and ensure `CONTACT_FROM_EMAIL` uses it. |
| 405 on form submit | Form action pointing at wrong path, or browser cached GET request | Confirm the form `action="/api/contact"` and `method="POST"`. |
| 404 on form submit (live site) | API function not deployed | Confirm `api/contact.js` exists at repo root before deploy. Trigger a redeploy. |
| Local form always shows "Local static preview detected." | You are running Python http.server | Switch to `npx vercel dev` for full local testing. |
| Email lands in spam | Sending domain SPF/DKIM not aligned | Add Resend's DNS records to the sending domain. |

---

## 9. Reminder

Production should use **Vercel + Resend only**.
The Netlify Forms setup from Phase 6 is **obsolete** and is kept only as
historical reference. Do not point the production site at Netlify.

Next phase: see the Phase 1 roadmap. Phase 9 covers speed, SEO, and AEO
work after Phase 8 lands.
