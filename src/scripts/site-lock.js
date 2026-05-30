(function () {
  "use strict";

  var PASSWORD = "Bhlix";
  var STORAGE_KEY = "blueprint-client-preview-unlocked";
  var docEl = document.documentElement;

  function isUnlocked() {
    try {
      return window.localStorage.getItem(STORAGE_KEY) === "true";
    } catch (err) {
      return false;
    }
  }

  function setUnlocked() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "true");
    } catch (err) {
      // If storage is unavailable, keep this session unlocked.
    }
  }

  function unlock() {
    docEl.classList.remove("site-lock-pending", "site-lock-active");
    docEl.classList.add("site-lock-unlocked");
    var gate = document.querySelector("[data-site-lock]");
    if (gate) gate.remove();
  }

  function buildGate() {
    var gate = document.createElement("div");
    gate.className = "site-lock";
    gate.setAttribute("data-site-lock", "");
    gate.setAttribute("role", "dialog");
    gate.setAttribute("aria-modal", "true");
    gate.setAttribute("aria-labelledby", "site-lock-title");
    gate.innerHTML =
      '<div class="site-lock__shell">' +
        '<div class="site-lock__brand">' +
          '<img src="src/assets/images/Blueprint%20Biologics%20V2%20-%20Logo%20Horizontal.png" alt="Blueprint Biologics" width="190" height="53" decoding="async" />' +
        "</div>" +
        '<form class="site-lock__card" data-site-lock-form>' +
          '<span class="site-lock__eyebrow">Locked Client Preview</span>' +
          '<h1 class="site-lock__title" id="site-lock-title">Client Preview Access</h1>' +
          '<p class="site-lock__body">This preview is restricted for client review.</p>' +
          '<label class="site-lock__label" for="site-lock-password">Password</label>' +
          '<input class="site-lock__input" id="site-lock-password" name="password" type="password" autocomplete="current-password" required />' +
          '<p class="site-lock__error" data-site-lock-error role="alert" hidden>Incorrect password. Please try again.</p>' +
          '<button class="u-btn u-btn--primary site-lock__button" type="submit">Enter Site</button>' +
        "</form>" +
      "</div>";
    return gate;
  }

  function showGate() {
    docEl.classList.add("site-lock-active");
    docEl.classList.remove("site-lock-unlocked");

    var gate = buildGate();
    document.body.prepend(gate);

    var form = gate.querySelector("[data-site-lock-form]");
    var input = gate.querySelector("#site-lock-password");
    var error = gate.querySelector("[data-site-lock-error]");

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (input.value === PASSWORD) {
        setUnlocked();
        unlock();
        return;
      }
      input.value = "";
      input.setAttribute("aria-invalid", "true");
      error.hidden = false;
      input.focus();
    });

    window.setTimeout(function () {
      input.focus();
    }, 0);
  }

  function init() {
    if (isUnlocked()) {
      unlock();
      return;
    }
    showGate();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
