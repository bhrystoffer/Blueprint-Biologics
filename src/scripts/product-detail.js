/* Blueprint Biologics, Product Detail page logic
   Reads ?id=<product-id> from the URL and populates the detail page from
   window.BB_CATALOG. Renders a not-found state if id is missing or unknown.
   Also lists other available strengths for the same product family.
*/

(function () {
  "use strict";

  if (!window.BB_CATALOG) {
    console.warn("BB_CATALOG missing, detail page will not render.");
    return;
  }

  function $(sel) { return document.querySelector(sel); }
  function setText(sel, text) {
    var el = document.querySelector(sel);
    if (el) el.textContent = text;
  }
  function escapeHtml(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  var ASSET_BASE = "public/images/blueprint/";
  var PRODUCT_IMAGES = {
    glp1: ASSET_BASE + "products/product-vial-glp1-generic.webp",
    recovery: ASSET_BASE + "products/product-vial-recovery-generic.webp",
    longevity: ASSET_BASE + "products/product-vial-longevity-generic.webp",
    growth: ASSET_BASE + "products/product-vial-growth-generic.webp",
    cognitive: ASSET_BASE + "products/product-vial-cognitive-generic.webp",
    specialty: ASSET_BASE + "products/product-research-vial-generic-01.webp",
    solutions: ASSET_BASE + "products/product-solution-vial-generic.webp"
  };
  var DEFAULT_PRODUCT_IMAGE = ASSET_BASE + "products/product-research-vial-generic-01.webp";

  function setDetailImage(category) {
    var img = document.querySelector("[data-detail-image]");
    if (!img) return;
    img.hidden = false;
    img.src = PRODUCT_IMAGES[category] || DEFAULT_PRODUCT_IMAGE;
    img.alt = "Generic research vial on a clean laboratory surface.";
    var frame = img.closest(".placeholder-visual");
    if (frame) frame.classList.remove("is-fallback");
  }

  function init() {
    var catalog = window.BB_CATALOG;
    var params = new URLSearchParams(window.location.search);
    var id = params.get("id");
    var notFound = document.querySelector("[data-detail-notfound]");
    var detailMain = document.querySelector(".detail-main");
    var detailHero = document.querySelector(".detail-hero");

    if (!id) { showNotFound(); return; }
    var p = catalog.findProduct(id);

    // Fallback for legacy URLs like ?id=semaglutide where the new catalog
    // uses strength-specific ids (semaglutide-2mg-vial, etc.). If multiple
    // products share that normalized name, render a strength picker instead
    // of a blank detail page.
    if (!p) {
      var normalized = String(id).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
      var matches = catalog.products.filter(function (x) {
        return x.nameNormalized === normalized || x.id.indexOf(normalized + "-") === 0;
      });
      if (matches.length) {
        showStrengthPicker(matches);
        return;
      }
      showNotFound();
      return;
    }

    var catLabel = catalog.categoryLabel(p.category);

    document.title = p.name + " " + p.strength + " | Blueprint Biologics";

    setText("[data-detail-name]", p.name);
    setText("[data-detail-category]", catLabel);
    setText("[data-detail-strength]", p.strength);
    setText("[data-detail-format]", p.format);
    setText("[data-detail-availability]", catalog.availabilityNote);
    setText("[data-detail-custom-label]", catalog.customLabelNote);
    setText("[data-detail-price-one]", catalog.formatPrice(p.priceOneVial));
    setText("[data-detail-price-ten]", catalog.formatPrice(p.priceTenVialBox));
    setText("[data-detail-crumb]", p.name + " " + p.strength);
    setText("[data-detail-cat-tag]", catalog.categoryShort(p.category));
    setDetailImage(p.category);

    var inquireLink = $("[data-detail-inquire]");
    if (inquireLink) {
      var label = p.name + " " + p.strength;
      inquireLink.setAttribute(
        "href",
        "contact.html?inquiry=pricing&product=" + encodeURIComponent(label) + "#contact-form"
      );
    }

    // Related strengths
    var related = catalog.findRelatedStrengths(p);
    var relSection = $("[data-detail-related]");
    var relList    = $("[data-detail-related-list]");
    if (related.length && relSection && relList) {
      // Sort related by numeric strength
      related.sort(function (a, b) {
        return catalog.strengthValue(a.strength) - catalog.strengthValue(b.strength);
      });
      relList.innerHTML = related.map(function (r) {
        return '<li><a href="product-detail.html?id=' + encodeURIComponent(r.id) + '">' +
          escapeHtml(r.strength) +
          ' <span class="detail-related__price">' +
          escapeHtml(catalog.formatPrice(r.priceOneVial)) +
          ' / 1 vial</span></a></li>';
      }).join("");
      relSection.hidden = false;
    }

    function showNotFound() {
      if (detailMain) detailMain.hidden = true;
      if (detailHero) detailHero.hidden = true;
      if (notFound) notFound.hidden = false;
      document.title = "Product not found | Blueprint Biologics";
    }

    function showStrengthPicker(list) {
      // Reuse the related-strengths section in the main column as a picker.
      list.sort(function (a, b) {
        return catalog.strengthValue(a.strength) - catalog.strengthValue(b.strength);
      });
      var first = list[0];
      var name = first.name;
      var catLabel = catalog.categoryLabel(first.category);

      document.title = "Select a Strength: " + name + " | Blueprint Biologics";
      setText("[data-detail-name]", name);
      setText("[data-detail-category]", catLabel);
      setText("[data-detail-strength]", "Multiple strengths available");
      setText("[data-detail-format]", first.format);
      setText("[data-detail-availability]", catalog.availabilityNote);
      setText("[data-detail-custom-label]", catalog.customLabelNote);
      setText("[data-detail-price-one]", "Select a strength");
      setText("[data-detail-price-ten]", "Select a strength");
      setText("[data-detail-crumb]", name);
      setText("[data-detail-cat-tag]", catalog.categoryShort(first.category));
      setDetailImage(first.category);

      var inquireLink = $("[data-detail-inquire]");
      if (inquireLink) {
        inquireLink.setAttribute(
          "href",
          "contact.html?inquiry=pricing&product=" + encodeURIComponent(name) + "#contact-form"
        );
      }

      var relSection = $("[data-detail-related]");
      var relList    = $("[data-detail-related-list]");
      var relTitle   = document.getElementById("related-title");
      if (relTitle) relTitle.textContent = "Select a Strength";
      if (relList) {
        relList.innerHTML = list.map(function (r) {
          return '<li><a href="product-detail.html?id=' + encodeURIComponent(r.id) + '">' +
            escapeHtml(r.strength) +
            ' <span class="detail-related__price">' +
            escapeHtml(catalog.formatPrice(r.priceOneVial)) + ' / 1 vial &middot; ' +
            escapeHtml(catalog.formatPrice(r.priceTenVialBox)) + ' / 10 vial box' +
            '</span></a></li>';
        }).join("");
      }
      if (relSection) relSection.hidden = false;
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
