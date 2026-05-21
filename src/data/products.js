/* ==========================================================================
   Blueprint Biologics, Catalog Data
   Phase 3 mock catalog. Vanilla JS, exposed as window.BB_PRODUCTS.

   TODO (client): Replace SKUs, formats, and availability with the official
   Blueprint Biologics catalog data once supplied. Do not add public pricing
   here. Pricing is shared with approved wholesale accounts.

   All entries are research compounds referenced for laboratory research use
   only. Not for human or animal consumption. Not intended to diagnose,
   treat, cure, or prevent any disease. Descriptions are neutral and
   category-based, no benefit or outcome claims.
   ========================================================================== */

(function (global) {
  "use strict";

  var CATEGORIES = [
    { id: "all",        label: "All",                              short: "All" },
    { id: "glp1",       label: "GLP-1 / Incretin Research",         short: "GLP-1" },
    { id: "recovery",   label: "Recovery & Repair Research",        short: "Recovery" },
    { id: "longevity",  label: "Longevity & NAD+ Research",         short: "Longevity" },
    { id: "growth",     label: "Growth Hormone Research",           short: "Growth" },
    { id: "cognitive",  label: "Cognitive Research",                short: "Cognitive" },
    { id: "specialty",  label: "Specialty Compounds",               short: "Specialty" }
  ];

  // Neutral, research/category-based description per product.
  // Format and availability are uniform placeholders pending client data.
  var PRODUCTS = [
    // ----------------------------------------------------------------- GLP-1
    { id: "semaglutide",   name: "Semaglutide",   category: "glp1",      sku: "BB-GLP-001", format: "Lyophilized vial", availability: "Request current availability", note: "Reference compound for GLP-1 and incretin pathway research." },
    { id: "tirzepatide",   name: "Tirzepatide",   category: "glp1",      sku: "BB-GLP-002", format: "Lyophilized vial", availability: "Request current availability", note: "Reference compound for GLP-1 and incretin pathway research." },
    { id: "retatrutide",   name: "Retatrutide",   category: "glp1",      sku: "BB-GLP-003", format: "Lyophilized vial", availability: "Request current availability", note: "Reference compound for GLP-1 and incretin pathway research." },
    { id: "liraglutide",   name: "Liraglutide",   category: "glp1",      sku: "BB-GLP-004", format: "Lyophilized vial", availability: "Request current availability", note: "Reference compound for GLP-1 and incretin pathway research." },

    // -------------------------------------------------------------- Recovery
    { id: "bpc-157",          name: "BPC-157",          category: "recovery", sku: "BB-RCV-001", format: "Lyophilized vial", availability: "Request current availability", note: "Reference material for recovery and repair research workflows." },
    { id: "tb-500",           name: "TB-500",           category: "recovery", sku: "BB-RCV-002", format: "Lyophilized vial", availability: "Request current availability", note: "Reference material for recovery and repair research workflows." },
    { id: "thymosin-alpha-1", name: "Thymosin Alpha-1", category: "recovery", sku: "BB-RCV-003", format: "Lyophilized vial", availability: "Request current availability", note: "Reference material for recovery and repair research workflows." },
    { id: "ghk-cu",           name: "GHK-Cu",           category: "recovery", sku: "BB-RCV-004", format: "Lyophilized vial", availability: "Request current availability", note: "Reference material for recovery and repair research workflows." },

    // ------------------------------------------------------------- Longevity
    { id: "nad-plus",     name: "NAD+",          category: "longevity", sku: "BB-LNG-001", format: "Lyophilized vial", availability: "Request current availability", note: "Reference compound for longevity and NAD+ research workflows." },
    { id: "epitalon",     name: "Epitalon",      category: "longevity", sku: "BB-LNG-002", format: "Lyophilized vial", availability: "Request current availability", note: "Reference compound for longevity and NAD+ research workflows." },
    { id: "glutathione",  name: "Glutathione",   category: "longevity", sku: "BB-LNG-003", format: "Lyophilized vial", availability: "Request current availability", note: "Reference compound for longevity and NAD+ research workflows." },
    { id: "5-amino-1mq",  name: "5-Amino-1MQ",   category: "longevity", sku: "BB-LNG-004", format: "Lyophilized vial", availability: "Request current availability", note: "Reference compound for longevity and NAD+ research workflows." },

    // ---------------------------------------------------------------- Growth
    { id: "ipamorelin",   name: "Ipamorelin",       category: "growth", sku: "BB-GH-001", format: "Lyophilized vial", availability: "Request current availability", note: "Reference compound for growth hormone pathway research." },
    { id: "cjc-1295",     name: "CJC-1295",         category: "growth", sku: "BB-GH-002", format: "Lyophilized vial", availability: "Request current availability", note: "Reference compound for growth hormone pathway research." },
    { id: "sermorelin",   name: "Sermorelin",       category: "growth", sku: "BB-GH-003", format: "Lyophilized vial", availability: "Request current availability", note: "Reference compound for growth hormone pathway research." },
    { id: "tesamorelin",  name: "Tesamorelin",      category: "growth", sku: "BB-GH-004", format: "Lyophilized vial", availability: "Request current availability", note: "Reference compound for growth hormone pathway research." },
    { id: "mk-677",       name: "MK-677",           category: "growth", sku: "BB-GH-005", format: "Lyophilized vial", availability: "Request current availability", note: "Reference compound for growth hormone pathway research." },
    { id: "hgh-frag",     name: "HGH Fragment 176-191", category: "growth", sku: "BB-GH-006", format: "Lyophilized vial", availability: "Request current availability", note: "Reference compound for growth hormone pathway research." },

    // ------------------------------------------------------------- Cognitive
    { id: "cerebrolysin", name: "Cerebrolysin",  category: "cognitive", sku: "BB-COG-001", format: "Lyophilized vial", availability: "Request current availability", note: "Reference compound for cognitive and neuropeptide research." },
    { id: "selank",       name: "Selank",        category: "cognitive", sku: "BB-COG-002", format: "Lyophilized vial", availability: "Request current availability", note: "Reference compound for cognitive and neuropeptide research." },
    { id: "semax",        name: "Semax",         category: "cognitive", sku: "BB-COG-003", format: "Lyophilized vial", availability: "Request current availability", note: "Reference compound for cognitive and neuropeptide research." },
    { id: "dihexa",       name: "Dihexa",        category: "cognitive", sku: "BB-COG-004", format: "Lyophilized vial", availability: "Request current availability", note: "Reference compound for cognitive and neuropeptide research." },
    { id: "p21",          name: "P21",           category: "cognitive", sku: "BB-COG-005", format: "Lyophilized vial", availability: "Request current availability", note: "Reference compound for cognitive and neuropeptide research." },

    // ------------------------------------------------------------- Specialty
    { id: "thymulin",     name: "Thymulin",      category: "specialty", sku: "BB-SPC-001", format: "Lyophilized vial", availability: "Request current availability", note: "Specialty reference compound, available to qualified buyers." },
    { id: "kpv",          name: "KPV",           category: "specialty", sku: "BB-SPC-002", format: "Lyophilized vial", availability: "Request current availability", note: "Specialty reference compound, available to qualified buyers." },
    { id: "ll-37",        name: "LL-37",         category: "specialty", sku: "BB-SPC-003", format: "Lyophilized vial", availability: "Request current availability", note: "Specialty reference compound, available to qualified buyers." },
    { id: "dsip",         name: "DSIP",          category: "specialty", sku: "BB-SPC-004", format: "Lyophilized vial", availability: "Request current availability", note: "Specialty reference compound, available to qualified buyers." },
    { id: "aod-9604",     name: "AOD-9604",      category: "specialty", sku: "BB-SPC-005", format: "Lyophilized vial", availability: "Request current availability", note: "Specialty reference compound, available to qualified buyers." }
  ];

  // Helpers
  function categoryLabel(id) {
    var c = CATEGORIES.find(function (x) { return x.id === id; });
    return c ? c.label : id;
  }
  function categoryShort(id) {
    var c = CATEGORIES.find(function (x) { return x.id === id; });
    return c ? c.short : id;
  }
  function findProduct(id) {
    return PRODUCTS.find(function (p) { return p.id === id; }) || null;
  }

  global.BB_CATALOG = {
    categories: CATEGORIES,
    products: PRODUCTS,
    categoryLabel: categoryLabel,
    categoryShort: categoryShort,
    findProduct: findProduct
  };
})(window);
