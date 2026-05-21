// Blueprint Biologics, Vercel Serverless Function
// Handles both forms:
//   form_type = "contact-inquiry"        from index.html
//   form_type = "wholesale-application"  from wholesale.html
//
// Environment variables required:
//   RESEND_API_KEY              (secret)
//   CONTACT_TO_EMAIL            (e.g. orders@blueprintbiologics.com)
//   CONTACT_FROM_EMAIL          (verified Resend sender, e.g. noreply@blueprintbiologics.com)
//
// Environment variables optional:
//   CONTACT_FROM_NAME           (display name for the From header)
//   CONTACT_REPLY_TO_FALLBACK   (used if submitter email is missing or invalid)
//
// This function does NOT log PII. The only console output is a generic
// success/failure marker with no field values.

import { Resend } from "resend";

// ---------- Helpers ----------------------------------------------------------

const MAX_FIELD_LENGTH = 5000;

function escapeHtml(value) {
  if (value === undefined || value === null) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function cleanString(value) {
  if (value === undefined || value === null) return "";
  return String(value).slice(0, MAX_FIELD_LENGTH).trim();
}

function looksLikeEmail(value) {
  if (typeof value !== "string") return false;
  // Conservative pattern, server-side validation only.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function jsonResponse(res, status, payload) {
  res.status(status).setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(payload));
}

function safeJsonBody(req) {
  // Vercel typically parses JSON bodies automatically when Content-Type is
  // application/json. Fall back to string body just in case.
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string" && req.body.length) {
    try { return JSON.parse(req.body); } catch (_) { return null; }
  }
  return {};
}

function buildSubject(formType) {
  if (formType === "wholesale-application") {
    return "New Blueprint Biologics Wholesale Application";
  }
  return "New Blueprint Biologics Inquiry";
}

function buildEmailHtml(formType, payload) {
  const isWholesale = formType === "wholesale-application";
  const label = isWholesale ? "Wholesale Application" : "Contact Inquiry";

  const categories = Array.isArray(payload.categories)
    ? payload.categories.join(", ")
    : cleanString(payload.categories);

  const rows = [
    ["Form Type", label],
    ["Full Name", cleanString(payload.full_name)],
    ["Work Email", cleanString(payload.work_email || payload.email)],
    ["Phone", cleanString(payload.phone)],
    ["Organization", cleanString(payload.organization)],
    ["Website", cleanString(payload.website)],
    ["Buyer Type", cleanString(payload.buyer_type)],
    ["Inquiry Type", cleanString(payload.inquiry_type)],
    ["Estimated Monthly Volume", cleanString(payload.volume)],
    ["State", cleanString(payload.state)],
    ["Country", cleanString(payload.country)],
    ["Interested Categories", categories],
    ["Message / Notes", cleanString(payload.message || payload.notes)],
    ["Research-Use Acknowledgment", payload.ack_research || payload.ack ? "Yes" : "No"],
    ["Disease-Claim Acknowledgment", payload.ack_disease ? "Yes" : "No"],
    ["Account-Review Acknowledgment", payload.ack_review ? "Yes" : "No"],
    ["Laws-Compliance Acknowledgment", payload.ack_laws ? "Yes" : "No"],
    ["Product Context", cleanString(payload.product_context)],
    ["Inquiry Context", cleanString(payload.inquiry_context)],
    ["Account Context", cleanString(payload.account_context)],
    ["Source URL", cleanString(payload.source_url)],
    ["Submitted From", cleanString(payload.submitted_from)],
    ["Timestamp", cleanString(payload.timestamp)]
  ];

  const tableRows = rows
    .filter(([, value]) => value !== "" && value !== undefined && value !== null)
    .map(
      ([key, value]) =>
        `<tr>
          <td style="padding:8px 12px;border:1px solid #e2e8f0;background:#f7f9fc;font-weight:600;color:#0a1a2f;vertical-align:top;white-space:nowrap;">${escapeHtml(key)}</td>
          <td style="padding:8px 12px;border:1px solid #e2e8f0;color:#1f2d3d;white-space:pre-wrap;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join("");

  return `<!doctype html>
<html><head><meta charset="utf-8"><title>${escapeHtml(buildSubject(formType))}</title></head>
<body style="margin:0;padding:24px;font-family:Inter,Arial,sans-serif;background:#ffffff;color:#1f2d3d;">
  <div style="max-width:680px;margin:0 auto;">
    <h2 style="margin:0 0 8px;color:#0a1a2f;">${escapeHtml(buildSubject(formType))}</h2>
    <p style="margin:0 0 16px;color:#5b6b7f;font-size:14px;">New submission from the Blueprint Biologics website.</p>
    <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;font-size:14px;">
      ${tableRows}
    </table>
    <p style="margin:16px 0 0;color:#5b6b7f;font-size:12px;">For Research Use Only. Not for Human or Animal Consumption. Buyer is responsible for compliance with applicable laws and regulations.</p>
  </div>
</body></html>`;
}

function buildEmailText(formType, payload) {
  // Plain-text fallback. Mirror the HTML rows but plain.
  const lines = [];
  lines.push(buildSubject(formType));
  lines.push("");
  lines.push("Form: " + (formType === "wholesale-application" ? "Wholesale Application" : "Contact Inquiry"));
  const pairs = [
    ["Full Name", payload.full_name],
    ["Work Email", payload.work_email || payload.email],
    ["Phone", payload.phone],
    ["Organization", payload.organization],
    ["Website", payload.website],
    ["Buyer Type", payload.buyer_type],
    ["Inquiry Type", payload.inquiry_type],
    ["Volume", payload.volume],
    ["State", payload.state],
    ["Country", payload.country],
    ["Categories", Array.isArray(payload.categories) ? payload.categories.join(", ") : payload.categories],
    ["Message / Notes", payload.message || payload.notes],
    ["Research-Use Ack", payload.ack_research || payload.ack ? "Yes" : "No"],
    ["Disease-Claim Ack", payload.ack_disease ? "Yes" : "No"],
    ["Account-Review Ack", payload.ack_review ? "Yes" : "No"],
    ["Laws-Compliance Ack", payload.ack_laws ? "Yes" : "No"],
    ["Product Context", payload.product_context],
    ["Inquiry Context", payload.inquiry_context],
    ["Account Context", payload.account_context],
    ["Source URL", payload.source_url],
    ["Submitted From", payload.submitted_from],
    ["Timestamp", payload.timestamp]
  ];
  for (const [k, v] of pairs) {
    const val = cleanString(v);
    if (!val) continue;
    lines.push(k + ": " + val);
  }
  lines.push("");
  lines.push("For Research Use Only. Not for Human or Animal Consumption.");
  return lines.join("\n");
}

// ---------- Handler ----------------------------------------------------------

export default async function handler(req, res) {
  // Method gate
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return jsonResponse(res, 405, {
      ok: false,
      message: "Method Not Allowed. Use POST."
    });
  }

  // Env gate
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const fromName = process.env.CONTACT_FROM_NAME || "Blueprint Biologics";
  const fallbackReplyTo = process.env.CONTACT_REPLY_TO_FALLBACK || fromEmail;

  if (!apiKey || !toEmail || !fromEmail) {
    // Do not echo specific env var names back to the client.
    console.error("api/contact missing required environment variables");
    return jsonResponse(res, 500, {
      ok: false,
      message: "Server is not fully configured. Please try again later."
    });
  }

  // Parse body
  const body = safeJsonBody(req);
  if (!body) {
    return jsonResponse(res, 400, {
      ok: false,
      message: "Invalid request body."
    });
  }

  // Honeypot check
  // If a bot fills any of these, return success without sending.
  const botField = cleanString(body["bot-field"] || body.bot_field || "");
  if (botField) {
    return jsonResponse(res, 200, {
      ok: true,
      message: "Submission received."
    });
  }

  // Required field validation
  const formType = body.form_type === "wholesale-application"
    ? "wholesale-application"
    : "contact-inquiry";

  const fullName = cleanString(body.full_name);
  const workEmail = cleanString(body.work_email || body.email);
  const organization = cleanString(body.organization);
  const buyerType = cleanString(body.buyer_type);

  const errors = [];
  if (!fullName) errors.push("full_name");
  if (!workEmail) errors.push("work_email");
  else if (!looksLikeEmail(workEmail)) errors.push("work_email");
  if (!organization) errors.push("organization");
  if (!buyerType) errors.push("buyer_type");

  if (formType === "contact-inquiry") {
    if (!cleanString(body.inquiry_type)) errors.push("inquiry_type");
    if (!body.ack && !body.ack_research) errors.push("ack");
  } else {
    if (!cleanString(body.phone)) errors.push("phone");
    if (!cleanString(body.state)) errors.push("state");
    if (!cleanString(body.country)) errors.push("country");
    if (!body.ack_research) errors.push("ack_research");
    if (!body.ack_disease) errors.push("ack_disease");
    if (!body.ack_review) errors.push("ack_review");
    if (!body.ack_laws) errors.push("ack_laws");
  }

  if (errors.length) {
    return jsonResponse(res, 400, {
      ok: false,
      message: "Required fields missing or invalid.",
      fields: errors
    });
  }

  // Build email
  const subject = buildSubject(formType);
  const html = buildEmailHtml(formType, body);
  const text = buildEmailText(formType, body);

  const replyTo = looksLikeEmail(workEmail) ? workEmail : fallbackReplyTo;
  const fromHeader = `${fromName} <${fromEmail}>`;

  // Send via Resend
  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from: fromHeader,
      to: [toEmail],
      reply_to: replyTo,
      subject,
      html,
      text
    });

    if (result && result.error) {
      console.error("Resend send error", {
        // Do not log PII. Only log a generic error code/name.
        name: result.error.name || "unknown",
        statusCode: result.error.statusCode || null
      });
      return jsonResponse(res, 502, {
        ok: false,
        message: "Unable to send submission at this time."
      });
    }

    return jsonResponse(res, 200, {
      ok: true,
      message: "Submission received."
    });
  } catch (err) {
    console.error("api/contact unexpected error", {
      name: err && err.name ? err.name : "Error"
    });
    return jsonResponse(res, 500, {
      ok: false,
      message: "Unable to send submission at this time."
    });
  }
}
