/* Blueprint Biologics, Catalog page logic
   Vanilla JS, depends on window.BB_CATALOG (loaded from src/data/products.js).
   Handles: featured categories, category filter pills + select, A-Z letter
   filter, search across name/strength/category/letter, sort dropdown,
   alphabetical default order, cards/table view toggle, deep-link inquiry
   context (?category=glp1, ?letter=A, ?q=...).
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

  // Pull unique sorted letters from products
  var LETTERS = (function () {
    var set = {};
    products.forEach(function (p) { set[p.letter] = true; });
    return Object.keys(set).sort();
  })();

  var SORTS = [
    { id: "az",         label: "Alphabetical, A-Z" },
    { id: "za",         label: "Alphabetical, Z-A" },
    { id: "price1asc",  label: "1 Vial price, Low to High" },
    { id: "price1desc", label: "1 Vial price, High to Low" },
    { id: "price10asc", label: "10 Vial Box price, Low to High" },
    { id: "price10desc",label: "10 Vial Box price, High to Low" }
  ];

  var state = {
    query: "",
    category: "all",
    letter: "all",
    sort: "az",
    view: "cards"
  };

  // ----- Element refs -------------------------------------------------------
  var $featured     = document.querySelector("[data-featured-categories]");
  var $filters      = document.querySelector("[data-catalog-filters]");
  var $filterSelect = document.querySelector("[data-catalog-filter-select]");
  var $letters      = document.querySelector("[data-catalog-letters]");
  var $sort         = document.querySelector("[data-catalog-sort]");
  var $search       = document.querySelector("[data-catalog-search]");
  var $searchClear  = document.querySelector("[data-catalog-search-clear]");
  var $grid         = document.querySelector("[data-catalog-grid]");
  var $tbody        = document.querySelector("[data-catalog-tbody]");
  var $count        = document.querySelector("[data-catalog-count]");
  var $empty        = document.querySelector("[data-catalog-empty]");
  var $viewCards    = document.querySelector("[data-view-cards]");
  var $viewTable    = document.querySelector("[data-view-table]");
  var $viewBtns     = document.querySelectorAll(".catalog-view-toggle__btn");

  // ----- Utilities ----------------------------------------------------------
  function escapeHtml(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function categoryIconSvg(catId) {
    var glyphs = {
      glp1:      '<path d="M12 3l3 6 6 1-4.5 4.4 1 6.1L12 17.5 6.5 20.5l1-6.1L3 10l6-1z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
      recovery:  '<circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.6"/><path d="M12 4v16M4 12h16" stroke="currentColor" stroke-width="1.6"/>',
      longevity: '<path d="M4 14a8 8 0 0116 0M4 14h16M9 14v6M15 14v6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
      growth:    '<path d="M6 21V9M18 21V3M12 21V13M3 21h18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
      cognitive: '<path d="M12 3a5 5 0 015 5v3a5 5 0 11-10 0V8a5 5 0 015-5z" stroke="currentColor" stroke-width="1.6"/><path d="M9 21h6M12 16v5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
      specialty: '<circle cx="6" cy="6" r="3" stroke="currentColor" stroke-width="1.6"/><circle cx="18" cy="6" r="3" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="18" r="3" stroke="currentColor" stroke-width="1.6"/><path d="M8 8l3 8M16 8l-3 8" stroke="currentColor" stroke-width="1.6"/>',
      solutions: '<path d="M9 3h6v3l-1 2v6l4 6H6l4-6V8L9 6V3z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>',
      all:       '<rect x="4" y="4" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.6"/><rect x="13" y="4" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.6"/><rect x="4" y="13" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.6"/><rect x="13" y="13" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.6"/>'
    };
    var g = glyphs[catId] || glyphs.all;
    return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">' + g + "</svg>";
  }

  // ----- Sort + filter ------------------------------------------------------
  function nameSortKey(name) {
    // Strip leading non-letters so "5-Amino-1MQ" sorts as "Amino-1MQ" and
    // lands inside the A group like it does on the price sheet.
    return String(name || "").replace(/^[^A-Za-z]+/, "");
  }
  function compareByName(a, b) {
    var ka = nameSortKey(a.name);
    var kb = nameSortKey(b.name);
    var n = ka.localeCompare(kb, "en", { sensitivity: "base", numeric: true });
    if (n !== 0) return n;
    return data.strengthValue(a.strength) - data.strengthValue(b.strength);
  }

  function sortProducts(list) {
    var copy = list.slice();
    switch (state.sort) {
      case "za":
        copy.sort(function (a, b) { return -compareByName(a, b); });
        break;
      case "price1asc":
        copy.sort(function (a, b) { return a.priceOneVial - b.priceOneVial || compareByName(a, b); });
        break;
      case "price1desc":
        copy.sort(function (a, b) { return b.priceOneVial - a.priceOneVial || compareByName(a, b); });
        break;
      case "price10asc":
        copy.sort(function (a, b) { return a.priceTenVialBox - b.priceTenVialBox || compareByName(a, b); });
        break;
      case "price10desc":
        copy.sort(function (a, b) { return b.priceTenVialBox - a.priceTenVialBox || compareByName(a, b); });
        break;
      default:
        copy.sort(compareByName);
    }
    return copy;
  }

  function applyFilters() {
    var q = state.query.trim().toLowerCase();
    var cat = state.category;
    var letter = state.letter;

    var filtered = products.filter(function (p) {
      if (cat !== "all" && p.category !== cat) return false;
      if (letter !== "all" && p.letter !== letter) return false;
      if (!q) return true;
      var hay = (
        p.name + " " +
        p.strength + " " +
        data.categoryLabel(p.category) + " " +
        p.letter + " " +
        p.format
      ).toLowerCase();
      return hay.indexOf(q) !== -1;
    });

    filtered = sortProducts(filtered);

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
      if (!count) return;
      html += '<button class="featured-cat" type="button" data-jump-category="' + c.id + '" aria-label="Jump to ' + escapeHtml(c.label) + ' category">' +
        '<span class="featured-cat__visual" aria-hidden="true">' +
          '<span class="featured-cat__glyph">' + categoryIconSvg(c.id) + '</span>' +
          '<span class="featured-cat__label-mono u-mono">' + escapeHtml(c.short) + '</span>' +
        '</span>' +
        '<span class="featured-cat__body">' +
          '<span class="featured-cat__title">' + escapeHtml(c.label) + '</span>' +
          '<span class="featured-cat__count">' + count + ' products</span>' +
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

  function renderLetters() {
    if (!$letters) return;
    var html = '<button class="letter-pill' + (state.letter === "all" ? " is-active" : "") +
      '" type="button" data-letter="all" aria-pressed="' + (state.letter === "all" ? "true" : "false") + '">All</button>';
    LETTERS.forEach(function (l) {
      var active = (l === state.letter) ? " is-active" : "";
      var ariaPressed = (l === state.letter) ? "true" : "false";
      html += '<button class="letter-pill' + active + '" type="button" data-letter="' + l + '" aria-pressed="' + ariaPressed + '">' + l + '</button>';
    });
    $letters.innerHTML = html;
    $letters.querySelectorAll("[data-letter]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLetter(btn.getAttribute("data-letter"));
      });
    });
  }

  function renderSort() {
    if (!$sort) return;
    var html = "";
    SORTS.forEach(function (s) {
      var sel = (s.id === state.sort) ? " selected" : "";
      html += '<option value="' + s.id + '"' + sel + '>' + escapeHtml(s.label) + '</option>';
    });
    $sort.innerHTML = html;
    $sort.addEventListener("change", function () {
      setSort($sort.value);
    });
  }

  function productInquireHref(p) {
    // Deep-link with product + strength so the homepage form can prefill
    // the full label, e.g. "AOD9604 2mg/vial"
    var label = p.name + " " + p.strength;
    return "contact.html?inquiry=pricing&product=" + encodeURIComponent(label) + "#contact-form";
  }

  function renderCards(list) {
    if (!$grid) return;
    if (!list.length) { $grid.innerHTML = ""; return; }
    var html = "";
    list.forEach(function (p) {
      var detailHref = "product-detail.html?id=" + encodeURIComponent(p.id);
      var inquireHref = productInquireHref(p);
      html += '<article class="product-card">' +
        '<div class="product-card__top">' +
          '<span class="product-card__category u-mono">' + escapeHtml(data.categoryShort(p.category)) + '</span>' +
          '<span class="product-card__letter u-mono" aria-hidden="true">' + escapeHtml(p.letter) + '</span>' +
        '</div>' +
        '<h3 class="product-card__title"><a href="' + detailHref + '">' + escapeHtml(p.name) + '</a></h3>' +
        '<p class="product-card__strength"><span class="product-card__strength-label">Strength</span> ' + escapeHtml(p.strength) + '</p>' +
        '<dl class="product-card__prices">' +
          '<div><dt>1 Vial</dt><dd>' + escapeHtml(data.formatPrice(p.priceOneVial)) + '</dd></div>' +
          '<div><dt>10 Vial Box</dt><dd>' + escapeHtml(data.formatPrice(p.priceTenVialBox)) + '</dd></div>' +
        '</dl>' +
        '<p class="product-card__custom-label">Custom labels +$0.25 / vial where available</p>' +
        '<div class="product-card__actions">' +
          '<a class="u-btn u-btn--primary product-card__cta" href="' + inquireHref + '">' +
            'Request Quote' +
            '<svg viewBox="0 0 24 24" fill="none" width="14" height="14" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
          '</a>' +
          '<a class="product-card__detail" href="' + detailHref + '">Details</a>' +
        '</div>' +
        '<p class="product-card__disclaimer u-mono">Qualified Accounts Only / Buyer responsible for compliance</p>' +
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
      var inquireHref = productInquireHref(p);
      html += '<tr>' +
        '<td class="catalog-table__product"><a href="' + detailHref + '">' + escapeHtml(p.name) + '</a></td>' +
        '<td>' + escapeHtml(p.strength) + '</td>' +
        '<td>' + escapeHtml(data.categoryLabel(p.category)) + '</td>' +
        '<td class="catalog-table__price">' + escapeHtml(data.formatPrice(p.priceOneVial)) + '</td>' +
        '<td class="catalog-table__price">' + escapeHtml(data.formatPrice(p.priceTenVialBox)) + '</td>' +
        '<td class="catalog-table__action-col"><a class="catalog-table__action" href="' + inquireHref + '">Request Quote</a></td>' +
      '</tr>';
    });
    $tbody.innerHTML = html;
  }

  function updateMeta(n) {
    if (!$count) return;
    var parts = [];
    if (state.category !== "all") parts.push('"' + data.categoryLabel(state.category) + '"');
    if (state.letter !== "all") parts.push("letter " + state.letter);
    if (state.query) parts.push('matching "' + state.query + '"');
    var qualifier = parts.length ? " in " + parts.join(", ") : "";
    if (n === 0) {
      $count.textContent = "No products" + qualifier + ".";
    } else if (n === products.length) {
      $count.textContent = "Showing all " + n + " products";
    } else {
      $count.textContent = "Showing " + n + " of " + products.length + " products" + qualifier;
    }
  }

  function updateEmpty(isEmpty) {
    if ($empty) $empty.hidden = !isEmpty;
    if ($grid) $grid.style.display = isEmpty ? "none" : "";
  }

  // ----- State updates ------------------------------------------------------
  function setCategory(id) {
    state.category = id;
    if ($filters) {
      $filters.querySelectorAll("[data-filter]").forEach(function (btn) {
        var active = btn.getAttribute("data-filter") === id;
        btn.classList.toggle("is-active", active);
        btn.setAttribute("aria-pressed", active ? "true" : "false");
      });
    }
    if ($filterSelect && $filterSelect.value !== id) $filterSelect.value = id;
    applyFilters();
  }

  function setLetter(l) {
    state.letter = l;
    if ($letters) {
      $letters.querySelectorAll("[data-letter]").forEach(function (btn) {
        var active = btn.getAttribute("data-letter") === l;
        btn.classList.toggle("is-active", active);
        btn.setAttribute("aria-pressed", active ? "true" : "false");
      });
    }
    applyFilters();
  }

  function setSort(s) {
    state.sort = s;
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
    renderLetters();
    renderSort();

    if ($search) {
      $search.addEventListener("input", function () { setQuery($search.value); });
    }
    if ($searchClear) {
      $searchClear.addEventListener("click", function () {
        if ($search) $search.value = "";
        setQuery("");
        if ($search) $search.focus();
      });
    }

    $viewBtns.forEach(function (btn) {
      btn.addEventListener("click", function () { setView(btn.getAttribute("data-view")); });
    });

    // Deep links
    var params = new URLSearchParams(window.location.search);
    var cat = params.get("category");
    var letter = params.get("letter");
    var q = params.get("q");
    var sort = params.get("sort");
    if (cat && categories.some(function (c) { return c.id === cat; })) state.category = cat;
    if (letter && (letter === "all" || LETTERS.indexOf(letter) !== -1)) state.letter = letter;
    if (sort && SORTS.some(function (s) { return s.id === sort; })) state.sort = sort;
    if (q) {
      state.query = q;
      if ($search) $search.value = q;
      if ($searchClear) $searchClear.hidden = false;
    }
    if ($sort) $sort.value = state.sort;

    applyFilters();
    setView(state.view);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
