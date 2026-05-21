/* Blueprint Biologics, Product Detail page logic
   Reads ?id=<product-id> from the URL and populates the detail page from
   window.BB_CATALOG. Renders a not-found state if id is missing or unknown.
*/

(function () {
  "use strict";

  if (!window.BB_CATALOG) {
    console.warn("BB_CATALOG missing, detail page will not render.");
    return;
  }

  function $(sel) { return document.querySelector(sel); }

  function init() {
    var params = new URLSearchParams(window.location.search);
    var id = params.get("id");
    var notFound = document.querySelector("[data-detail-notfound]");
    var detailMain = document.querySelector(".detail-main");
    var detailHero = document.querySelector(".detail-hero");

    if (!id) { showNotFound(); return; }
    var p = window.BB_CATALOG.findProduct(id);
    if (!p) { showNotFound(); return; }

    var catLabel = window.BB_CATALOG.categoryLabel(p.category);

    // Title-tab update
    document.title = p.name + ", Blueprint Biologics";

    set("[data-detail-name]", p.name);
    set("[data-detail-category]", catLabel);
    set("[data-detail-note]", p.note);
    set("[data-detail-sku]", p.sku);
    set("[data-detail-format]", p.format);
    set("[data-detail-availability]", p.availability);
    set("[data-detail-crumb]", p.name);
    set("[data-detail-cat-tag]", window.BB_CATALOG.categoryShort(p.category));

    var inquireLink = $("[data-detail-inquire]");
    if (inquireLink) {
      inquireLink.setAttribute(
        "href",
        "index.html?product=" + encodeURIComponent(p.name) + "#contact"
      );
    }

    function showNotFound() {
      if (detailMain) detailMain.hidden = true;
      if (detailHero) detailHero.hidden = true;
      if (notFound) notFound.hidden = false;
      document.title = "Product not found, Blueprint Biologics";
    }

    function set(sel, text) {
      var el = document.querySelector(sel);
      if (el) el.textContent = text;
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
