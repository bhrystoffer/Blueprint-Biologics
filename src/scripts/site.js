/* Blueprint Biologics, homepage interactions
   Minimal vanilla JS. No external dependencies.
   Handles: mobile menu toggle, scroll reveal, current year in footer.
*/

(function () {
  "use strict";

  // ---- Mobile menu ---------------------------------------------------------
  var toggle = document.querySelector("[data-menu-toggle]");
  var menu = document.querySelector("[data-mobile-menu]");

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.getAttribute("data-open") === "true";
      menu.setAttribute("data-open", open ? "false" : "true");
      toggle.setAttribute("aria-expanded", open ? "false" : "true");
    });

    // Close after navigation tap
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.setAttribute("data-open", "false");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---- Scroll reveal -------------------------------------------------------
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".u-reveal").forEach(function (el) {
      io.observe(el);
    });
  } else {
    document.querySelectorAll(".u-reveal").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  // ---- Footer year ---------------------------------------------------------
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ==========================================================================
  // Phase 8: Vercel + Resend submission flow
  // Both forms POST JSON to /api/contact. Validation runs first. On success
  // the user is redirected to a thank-you page. On error, an inline message
  // appears and the submit button is re-enabled. No PII is logged or stored.
  // ==========================================================================

  function populateContextFields(f) {
    if (!f) return;
    var nowISO = new Date().toISOString();
    var here = window.location.href;
    var ts = f.querySelector("[data-context-timestamp]");
    var src = f.querySelector("[data-context-source]");
    if (ts) ts.value = nowISO;
    if (src) src.value = here;
  }

  function validateForm(f) {
    f.querySelectorAll(".u-field--error").forEach(function (x) {
      x.classList.remove("u-field--error");
    });
    f.querySelectorAll(".checkbox-field--error").forEach(function (x) {
      x.classList.remove("checkbox-field--error");
    });
    var invalid = [];
    var requiredInputs = f.querySelectorAll(
      "input[required], select[required], textarea[required]"
    );
    Array.prototype.forEach.call(requiredInputs, function (el) {
      var ok = el.type === "checkbox" ? el.checked : !!el.value.trim();
      if (!ok) {
        invalid.push(el);
        var field = el.closest(".u-field");
        var chk = el.closest(".checkbox-field");
        if (field) field.classList.add("u-field--error");
        if (chk) chk.classList.add("checkbox-field--error");
      }
    });
    return invalid;
  }

  function buildPayload(f) {
    // Collect form fields into a JSON object suitable for /api/contact.
    // Checkbox groups (same name, multiple checkboxes) become arrays.
    var payload = {};
    var fd = new FormData(f);
    fd.forEach(function (value, key) {
      if (payload[key] === undefined) {
        payload[key] = value;
      } else if (Array.isArray(payload[key])) {
        payload[key].push(value);
      } else {
        payload[key] = [payload[key], value];
      }
    });

    // Stamp the form_type so the API knows which template to use.
    payload.form_type = f.getAttribute("data-form-type") || "contact-inquiry";

    // Mirror Work Email into `email` for Resend Reply-to convenience.
    var workEmail = f.querySelector('input[name="work_email"]');
    if (workEmail && workEmail.value) payload.email = workEmail.value.trim();

    // Booleanize required acknowledgment checkboxes.
    ["ack", "ack_research", "ack_disease", "ack_review", "ack_laws"].forEach(function (k) {
      if (payload[k] === undefined) payload[k] = false;
      else if (payload[k] === "on" || payload[k] === "true") payload[k] = true;
    });

    return payload;
  }

  function setSubmitting(submitBtn, isSubmitting) {
    if (!submitBtn) return;
    if (isSubmitting) {
      submitBtn.setAttribute("aria-busy", "true");
      submitBtn.setAttribute("disabled", "disabled");
      if (!submitBtn.dataset.originalText) {
        submitBtn.dataset.originalText = submitBtn.innerHTML;
      }
      submitBtn.innerHTML = "Sending...";
    } else {
      submitBtn.removeAttribute("aria-busy");
      submitBtn.removeAttribute("disabled");
      if (submitBtn.dataset.originalText) {
        submitBtn.innerHTML = submitBtn.dataset.originalText;
      }
    }
  }

  function showFormStatus(noteEl, message, kind) {
    if (!noteEl) return;
    noteEl.textContent = message;
    if (kind === "error") noteEl.style.color = "var(--danger)";
    else if (kind === "success") noteEl.style.color = "var(--success)";
    else if (kind === "info") noteEl.style.color = "var(--accent)";
    else noteEl.style.color = "var(--text-muted)";
  }

  // Detect when the static preview cannot reach /api/contact (Python http
  // server, for example). On localhost with a 404 we surface a mock success
  // instead of an unfriendly error so the layout can still be reviewed.
  function isLocalStaticPreview() {
    if (typeof window === "undefined") return false;
    return /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname);
  }

  function handleFetchSubmit(f, opts) {
    var submitBtn = f.querySelector('button[type="submit"]');
    var noteEl = f.querySelector(opts.noteSelector);
    var successUrl = f.getAttribute("data-success-url") || "/thank-you.html";

    f.addEventListener("submit", function (e) {
      e.preventDefault();

      var invalid = validateForm(f);
      if (invalid.length) {
        showFormStatus(noteEl, opts.invalidMessage, "error");
        invalid[0].focus({ preventScroll: false });
        return;
      }

      populateContextFields(f);
      setSubmitting(submitBtn, true);
      showFormStatus(noteEl, "Sending your submission...", "info");

      var payload = buildPayload(f);

      fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(payload)
      })
        .then(function (res) {
          return res.json().then(function (data) { return { status: res.status, data: data }; })
            .catch(function () { return { status: res.status, data: null }; });
        })
        .then(function (result) {
          if (result.status >= 200 && result.status < 300 && result.data && result.data.ok) {
            // Successful submission. Redirect to the thank-you page.
            window.location.assign(successUrl);
            return;
          }

          // 404 from the static preview, where /api/contact does not exist.
          if (result.status === 404 && isLocalStaticPreview()) {
            showFormStatus(
              noteEl,
              "Local static preview detected. Form will submit through /api/contact once deployed to Vercel.",
              "info"
            );
            setSubmitting(submitBtn, false);
            return;
          }

          var msg = (result.data && result.data.message)
            ? result.data.message
            : "Submission failed. Please try again or contact us directly.";
          showFormStatus(noteEl, msg, "error");
          setSubmitting(submitBtn, false);
        })
        .catch(function () {
          // Network error or fetch blocked. In a local static preview we show
          // the mock notice; otherwise surface a generic retry message.
          if (isLocalStaticPreview()) {
            showFormStatus(
              noteEl,
              "Local static preview detected. Form will submit through /api/contact once deployed to Vercel.",
              "info"
            );
          } else {
            showFormStatus(
              noteEl,
              "Network error. Please check your connection and try again.",
              "error"
            );
          }
          setSubmitting(submitBtn, false);
        });
    });
  }

  // ---- Inquiry form submission -------------------------------------------
  var form = document.querySelector("[data-inquiry-form]");
  if (form) {
    handleFetchSubmit(form, {
      noteSelector: "[data-form-note]",
      invalidMessage:
        "Please complete the required fields and the research-use acknowledgment before submitting."
    });
  }

  // ---- Deep-link inquiry context ------------------------------------------
  // Honors ?product=<name>&inquiry=<type> on the homepage. When the page
  // loads with these params, prefill the form, scroll to the contact section,
  // and surface a small "context applied" banner above the form.
  if (form) {
    var params = new URLSearchParams(window.location.search);
    var productParam = params.get("product");
    var inquiryParam = params.get("inquiry"); // pricing | docs | catalog | custom-label

    // Populate hidden context fields so they ride along with the Netlify
    // submission, even if the user does not change anything else.
    var pCtxField = form.querySelector("[data-context-product]");
    var iCtxField = form.querySelector("[data-context-inquiry]");
    if (pCtxField && productParam) pCtxField.value = productParam;
    if (iCtxField && inquiryParam) iCtxField.value = inquiryParam;

    if (productParam || inquiryParam) {
      var msg = form.querySelector("#message");
      var inquirySelect = form.querySelector("#inquiry_type");

      if (productParam && msg) {
        var prefix = "I would like to request pricing and availability for: " +
          productParam + ".\n\n";
        if (msg.value.indexOf(productParam) === -1) {
          msg.value = prefix + msg.value;
        }
      }

      if (inquirySelect && inquiryParam) {
        var map = {
          "pricing": "Wholesale Pricing",
          "docs": "Documentation / COA Request",
          "catalog": "Catalog Request",
          "custom-label": "Custom Label Inquiry"
        };
        var target = map[inquiryParam];
        if (target) {
          Array.prototype.forEach.call(inquirySelect.options, function (opt) {
            if (opt.text === target) opt.selected = true;
          });
        }
      } else if (inquirySelect && productParam && !inquirySelect.value) {
        Array.prototype.forEach.call(inquirySelect.options, function (opt) {
          if (opt.text === "Wholesale Pricing") opt.selected = true;
        });
      }

      // Surface a small notice above the form so users see the context applied.
      var noticeText = productParam
        ? "Prefilled with " + productParam + ". Adjust before submitting."
        : "Inquiry type prefilled. Adjust before submitting.";
      var notice = document.createElement("div");
      notice.className = "form-context-banner";
      notice.setAttribute("role", "status");
      notice.textContent = noticeText;
      form.insertBefore(notice, form.firstChild);

      // Scroll to contact on next frame so layout is settled.
      requestAnimationFrame(function () {
        var contact = document.getElementById("contact");
        if (contact) contact.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }

  // ---- Wholesale application form submission, Phase 8 -------------------
  var wForm = document.querySelector("[data-wholesale-form]");
  if (wForm) {
    handleFetchSubmit(wForm, {
      noteSelector: "[data-wholesale-note]",
      invalidMessage:
        "Please complete the required fields and acknowledgments before submitting."
    });
  }

  // ---- Deep-link wholesale application context, ?account=apply -----------
  if (wForm) {
    var wParams = new URLSearchParams(window.location.search);
    if (wParams.get("account") === "apply") {
      // Populate hidden account_context so the submission email includes it
      var aCtxField = wForm.querySelector("[data-context-account]");
      if (aCtxField) aCtxField.value = "wholesale-application";

      var banner = document.createElement("div");
      banner.className = "form-context-banner";
      banner.setAttribute("role", "status");
      banner.textContent =
        "Wholesale application selected. Complete the form below to request account review.";
      wForm.insertBefore(banner, wForm.firstChild);

      requestAnimationFrame(function () {
        var apply = document.getElementById("apply");
        if (apply) apply.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }
})();
