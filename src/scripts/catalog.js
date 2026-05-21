/* Blueprint Biologics, Catalog page logic
   Vanilla JS, depends on window.BB_CATALOG (loaded from src/data/products.js).
   Handles: featured categories render, filter pills, mobile filter select,
            search, cards/table view toggle, deep-link inquiry context.
*/

(function () {
  "use strict";

  if (!window.BB_CATALOG) {
    console.warn("BB_CATALOG missing, catalog will not render.");
    return;
  }

  var data = window.BB_CATALOG;
  var products = data.products.slice();
  var categories = data.categories.slice();

  var state = {
    query: "",
    category: "all",
    view: "cards"
  };

  // ----- Element refs -------------------------------------------------------
  var $featured = document.querySelector("[data-featured-categories]");
  var $filters  = document.querySelector("[data-catalog-filters]");
  var $filterSelect = document.querySelector("[data-catalog-filter-select]");
  var $search   = document.querySelector("[data-catalog-search]");
  var $searchClear = document.querySelector("[data-catalog-search-clear]");
  var $grid     = document.querySelector("[data-catalog-grid]");
  var $tbody    = document.querySelector("[data-catalog-tbody]");
  var $count    = document.querySelector("[data-catalog-count]");
  var $empty    = document.querySelector("[data-catalog-empty]");
  var $viewCards = document.querySelector("[data-view-cards]");
  var $viewTable = document.querySelector("[data-view-table]");
  var $viewBtns = document.querySelectorAll(".catalog-view-toggle__btn");

  // ----- Utilities ----------------------------------------------------------
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function categoryIconSvg(catId) {
    // small SVG glyph keyed by category id
    var glyphs = {
      glp1:      '<path d="M12 3l3 6 6 1-4.5 4.4 1 6.1L12 17.5 6.5 20.5l1-6.1L3 10l6-1z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
      recovery:  '<circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.6"/><path d="M12 4v16M4 12h16" stroke="currentColor" stroke-width="1.6"/>',
      longevity: '<path d="M4 14a8 8 0 0116 0M4 14h16M9 14v6M15 14v6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
      growth:    '<path d="M6 21V9M18 21V3M12 21V13M3 21h18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
      cognitive: '<path d="M12 3a5 5 0 015 5v3a5 5 0 11-10 0V8a5 5 0 015-5z" stroke="currentColor" stroke-width="1.6"/><path d="M9 21h6M12 16v5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
      specialty: '<circle cx="6" cy="6" r="3" stroke="currentColor" stroke-width="1.6"/><circle cx="18" cy="6" r="3" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="18" r="3" stroke="currentColor" stroke-width="1.6"/><path d="M8 8l3 8M16 8l-3 8" stroke="currentColor" stroke-width="1.6"/>',
      all:       '<rect x="4" y="4" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.6"/><rect x="13" y="4" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.6"/><rect x="4" y="13" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.6"/><rect x="13" y="13" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.6"/>'
    };
    var g = glyphs[catId] || glyphs.all;
    return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">' + g + "</svg>";
  }

  function productMoleculeSvg() {
    return '<svg viewBox="0 0 96 96" fill="none" aria-hidden="true">' +
      '<circle cx="48" cy="48" r="6" fill="currentColor" opacity="0.9"/>' +
      '<circle cx="24" cy="32" r="4" fill="currentColor" opacity="0.55"/>' +
      '<circle cx="72" cy="32" r="4" fill="currentColor" opacity="0.55"/>' +
      '<circle cx="24" cy="64" r="4" fill="currentColor" opacity="0.55"/>' +
      '<circle cx="72" cy="64" r="4" fill="currentColor" opacity="0.55"/>' +
      '<line x1="48" y1="48" x2="24" y2="32" stroke="currentColor" stroke-width="1.6" opacity="0.7"/>' +
      '<line x1="48" y1="48" x2="72" y2="32" stroke="currentColor" stroke-width="1.6" opacity="0.7"/>' +
      '<line x1="48" y1="48" x2="24" y2="64" stroke="currentColor" stroke-width="1.6" opacity="0.7"/>' +
      '<line x1="48" y1="48" x2="72" y2="64" stroke="currentColor" stroke-width="1.6" opacity="0.7"/>' +
      "</svg>";
  }

  // ----- Filtering ----------------------------------------------------------
  function applyFilters() {
    var q = state.query.trim().toLowerCase();
    var cat = state.category;

    var filtered = products.filter(function (p) {
      var inCat = cat === "all" || p.category === cat;
      if (!inCat) return false;
      if (!q) return true;
      var hay = (p.name + " " + p.sku + " " + data.categoryLabel(p.category) + " " + (p.format || "")).toLowerCase();
      return hay.indexOf(q) !== -1;
    });

    renderCards(filtered);
    renderTable(filtered);
    updateMeta(filtered.length);
    updateEmpty(filtered.length === 0);
  }

  // ----- Rendering ----------------------------------------------------------
  function renderFeatured() {
    if (!$featured) return;
    var html = "";
    categories.forEach(function (c) {
      if (c.id === "all") return;
      var count = products.filter(function (p) { return p.category === c.id; }).length;
      html += '<button class="featured-cat" type="button" data-jump-category="' + c.id + '" aria-label="Jump to ' + escapeHtml(c.label) + ' category">' +
        '<span class="featured-cat__visual" aria-hidden="true">' +
          '<span class="featured-cat__glyph">' + categoryIconSvg(c.id) + '</span>' +
          '<span class="featured-cat__label-mono u-mono">' + escapeHtml(c.short) + '</span>' +
        '</span>' +
        '<span class="featured-cat__body">' +
          '<span class="featured-cat__title">' + escapeHtml(c.label) + '</span>' +
          '<span class="featured-cat__count">' + count + ' reference SKUs</span>' +
        '</span>' +
        '<span class="featured-cat__arrow" aria-hidden="true">' +
          '<svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
        '</span>' +
      '</button>';
    });
    $featured.innerHTML = html;
    $featured.querySelectorAll("[data-jump-category]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setCategory(btn.getAttribute("data-jump-category"));
        var browse = document.getElementById("browse");
        if (browse) browse.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function renderFilters() {
    if (!$filters) return;
    var html = "";
    categories.forEach(function (c) {
      var active = (c.id === state.category) ? " is-active" : "";
      var ariaPressed = (c.id === state.category) ? "true" : "false";
      html += '<button class="filter-pill' + active + '" type="button" data-filter="' + c.id + '" aria-pressed="' + ariaPressed + '">' +
        escapeHtml(c.label) +
      '</button>';
    });
    $filters.innerHTML = html;
    $filters.querySelectorAll("[data-filter]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setCategory(btn.getAttribute("data-filter"));
      });
    });
  }

  function renderFilterSelect() {
    if (!$filterSelect) return;
    var html = "";
    categories.forEach(function (c) {
      var sel = (c.id === state.category) ? " selected" : "";
      html += '<option value="' + c.id + '"' + sel + '>' + escapeHtml(c.label) + '</option>';
    });
    $filterSelect.innerHTML = html;
    $filterSelect.addEventListener("change", function () {
      setCategory($filterSelect.value);
    });
  }

  function renderCards(list) {
    if (!$grid) return;
    if (!list.length) { $grid.innerHTML = ""; return; }
    var html = "";
    list.forEach(function (p) {
      var detailHref = "product-detail.html?id=" + encodeURIComponent(p.id);
      var inquireHref = "index.html?product=" + encodeURIComponent(p.name) + "#contact";
      html += '<article class="product-card">' +
        '<a class="product-card__visual" href="' + detailHref + '" aria-label="View ' + escapeHtml(p.name) + ' detail">' +
          '<span class="product-card__sku-badge u-mono">' + escapeHtml(p.sku) + '</span>' +
          '<span class="product-card__molecule" aria-hidden="true">' + productMoleculeSvg() + '</span>' +
          '<span class="product-card__placeholder-label u-mono">Image placeholder, product visual</span>' +
        '</a>' +
        '<div class="product-card__body">' +
          '<span class="product-card__category u-mono">' + escapeHtml(data.categoryShort(p.category)) + '</span>' +
          '<h3 class="product-card__title"><a href="' + detailHref + '">' + escapeHtml(p.name) + '</a></h3>' +
          '<p class="product-card__note">' + escapeHtml(p.note) + '</p>' +
          '<dl class="product-card__meta">' +
            '<div><dt>Format</dt><dd>' + escapeHtml(p.format) + '</dd></div>' +
            '<div><dt>Availability</dt><dd>' + escapeHtml(p.availability) + '</dd></div>' +
          '</dl>' +
          '<div class="product-card__actions">' +
            '<a class="u-btn u-btn--primary product-card__cta" href="' + inquireHref + '">' +
              'Inquire' +
              '<svg viewBox="0 0 24 24" fill="none" width="14" height="14" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
            '</a>' +
            '<a class="product-card__detail" href="' + detailHref + '">Details</a>' +
          '</div>' +
          '<p class="product-card__disclaimer u-mono">For Research Use Only</p>' +
        '</div>' +
      '</article>';
    });
    $grid.innerHTML = html;
  }

  function renderTable(list) {
    if (!$tbody) return;
    if (!list.length) { $tbody.innerHTML = ""; return; }
    var html = "";
    list.forEach(function (p) {
      var detailHref = "product-detail.html?id=" + encodeURIComponent(p.id);
      var inquireHref = "index.html?product=" + encodeURIComponent(p.name) + "#contact";
      html += '<tr>' +
        '<td class="catalog-table__product"><a href="' + detailHref + '">' + escapeHtml(p.name) + '</a></td>' +
        '<td>' + escapeHtml(data.categoryLabel(p.category)) + '</td>' +
        '<td>' + escapeHtml(p.format) + '</td>' +
        '<td class="u-mono">' + escapeHtml(p.sku) + '</td>' +
        '<td>' + escapeHtml(p.availability) + '</td>' +
        '<td class="catalog-table__action-col"><a class="catalog-table__action" href="' + inquireHref + '">Inquire</a></td>' +
      '</tr>';
    });
    $tbody.innerHTML = html;
  }

  function updateMeta(n) {
    if (!$count) return;
    var catName = state.category === "all" ? "all categories" : '"' + data.categoryLabel(state.category) + '"';
    var qPart = state.query ? ' matching "' + state.query + '"' : "";
    if (n === 0) {
      $count.textContent = "No products" + qPart + " in " + catName;
    } else if (n === products.length) {
      $count.textContent = "Showing all " + n + " reference products";
    } else {
      $count.textContent = "Showing " + n + " of " + products.length + " products in " + catName + qPart;
    }
  }

  function updateEmpty(isEmpty) {
    if ($empty) $empty.hidden = !isEmpty;
    if ($grid) $grid.style.display = isEmpty ? "none" : "";
  }

  // ----- State updates ------------------------------------------------------
  function setCategory(id) {
    state.category = id;
    // Sync UI
    if ($filters) {
      $filters.querySelectorAll("[data-filter]").forEach(function (btn) {
        var active = btn.getAttribute("data-filter") === id;
        btn.classList.toggle("is-active", active);
        btn.setAttribute("aria-pressed", active ? "true" : "false");
      });
    }
    if ($filterSelect && $filterSelect.value !== id) {
      $filterSelect.value = id;
    }
    applyFilters();
  }

  function setQuery(q) {
    state.query = q;
    if ($searchClear) $searchClear.hidden = !q;
    applyFilters();
  }

  function setView(view) {
    state.view = view;
    $viewBtns.forEach(function (btn) {
      var active = btn.getAttribute("data-view") === view;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
    if ($viewCards) $viewCards.hidden = view !== "cards";
    if ($viewTable) $viewTable.hidden = view !== "table";
  }

  // ----- Wire up ------------------------------------------------------------
  function init() {
    renderFeatured();
    renderFilters();
    renderFilterSelect();

    // Search
    if ($search) {
      $search.addEventListener("input", function () {
        setQuery($search.value);
      });
    }
    if ($searchClear) {
      $searchClear.addEventListener("click", function () {
        if ($search) $search.value = "";
        setQuery("");
        if ($search) $search.focus();
      });
    }

    // View toggle
    $viewBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        setView(btn.getAttribute("data-view"));
      });
    });

    // Honor deep link from homepage, ?category=glp1
    var params = new URLSearchParams(window.location.search);
    var cat = params.get("category");
    var q = params.get("q");
    if (cat && categories.some(function (c) { return c.id === cat; })) {
      state.category = cat;
    }
    if (q) {
      state.query = q;
      if ($search) $search.value = q;
      if ($searchClear) $searchClear.hidden = false;
    }

    applyFilters();
    setView(state.view);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
