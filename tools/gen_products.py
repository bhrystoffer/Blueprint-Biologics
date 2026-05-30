#!/usr/bin/env python3
"""
Blueprint Biologics, Product Data Generator
============================================

Generates src/data/products.js from the canonical price-sheet ROWS list
defined below. src/data/products.js is the single source of truth for
the website catalog. The browser loads it directly via a <script> tag;
no build step.

USAGE
-----
1. Open this file. Edit the ROWS list to match the latest Blueprint
   Biologics price sheet PDF. Each row is a tuple of:
       (name, strength, price_one_vial, price_ten_vial_box, category)

   Categories must be one of (keep this list small and research-safe):
       glp1, recovery, longevity, growth, cognitive,
       specialty, solutions

2. From the repo root, run:
       python3 tools/gen_products.py

3. The script writes src/data/products.js with all entries.

4. Bump the cache-buster on every HTML page so browsers refetch the new
   data file. From the repo root:
       grep -rl "?v=" *.html | xargs sed -i '' \\
         's/?v=[a-z0-9-]\\+/?v=YOUR-NEW-VERSION/g'
   (On Linux, drop the empty quotes after -i.)

5. QA locally:
       python3 -m http.server 8765
       open http://localhost:8765/catalog.html
       open http://localhost:8765/product-detail.html?id=semaglutide-2mg-vial

6. Commit and push. Vercel redeploys automatically.

DATA SHAPE EMITTED PER PRODUCT
------------------------------
    id                 slug of name + strength, used in URLs
    name               exact label from the price sheet
    nameNormalized     slug of name only, used for related-strength lookups
    strength           "5mg/vial", "10ml/vial", "3000IU/vial", etc.
    format             "Lyophilized vial" or "Lyophilized bottle"
    letter             first alpha character, used for the A-Z filter
    category           one of the seven research-safe ids above
    priceOneVial       integer USD
    priceTenVialBox    integer USD

The shared catalog-level fields below are exposed on the window
BB_CATALOG object alongside the products array, so renderers can pull
them in once rather than repeating them per row:
    customLabelNote    "Custom labels add $0.25 per vial where available."
    availabilityNote   "Request current availability"
    disclaimerNote     "Available to qualified wholesale, clinical, and
                        professional accounts, subject to account review
                        and applicable laws."

COMPLIANCE GUARDRAILS
---------------------
- Do not add medical, treatment, dosage, weight-loss, anti-aging,
  healing, cognitive-enhancement, human-use, or FDA-approved claims.
- Do not add Buy Now, Shop, Add to Cart, or Start Treatment language.
- Do not emit schema.org Product or Offer markup. The website is a
  research-use wholesale catalog, not an ecommerce store.
- Use simple hyphens. Do not use em dashes.
- Keep prices in USD.
- Preserve exact product names and strengths from the price sheet.
- Duplicate names with different strengths get their own row.
- Default order is alphabetical, matching the price sheet's A-Z
  layout. The catalog renderer strips leading non-letters when
  sorting so "5-Amino-1MQ" lands inside the A group.

CATEGORY ASSIGNMENT NOTES
-------------------------
Use the most conservative bucket. When uncertain, use specialty.
    glp1       Semaglutide, Tirzepatide, Retatrutide, Liraglutide,
               Mazdutide, Survodutide, Cagrilitide and its blends, GLP-1
    recovery   BPC 157, TB500, Thymosin Alpha-1, Thymalin, GHK-Cu,
               LL37, KPV, GLOW50, KLOW80, Hyaluronic Acid, BPC+TB blends
    longevity  NAD+ (Buffered), Epithalon, Glutathione, 5-Amino-1MQ,
               FOXO4-DRI, Humanin, SS-31, MOTS-c, Pinealon, Cortagen,
               Crystagen
    growth     Ipamorelin, CJC-1295 (with/without DAC + blends),
               Sermorelin Acetate, Tesamorelin, HGH 191AA, HGH Fragments,
               GHRP-2, GHRP-6, Hexarelin Acetate, MGF, PEG MGF, IGF-1LR3,
               IGF-DES
    cognitive  Selank, Semax, Cerebrolysin, DSIP, P21, PE22-28,
               Dermorphin, ARA-290, Melatonin, B7-33
    specialty  ACE-031, Adamax, Adipotide, AICAR, Alprostadil, AOD9604,
               EPo, Follistatin-344, GDF-8, HCG, HMG, Gonadorelin Acetate,
               Kisspeptin, L-Carnitine, Lyophilisate, Melanotan 1, MT-2,
               Oxytocin Acetate, PNC27, PT-141, SNAP-8, VIP
    solutions  Acetic Acid Solution / Water, BAC Water

DO NOT add new top-level categories without legal review.
"""
import re

# ---------------------------------------------------------------------------
# ROWS: paste new price sheet here. Format:
#   (name, strength, price_one_vial, price_ten_vial_box, category)
# Categories: glp1, recovery, longevity, growth, cognitive, specialty, solutions
# ---------------------------------------------------------------------------
ROWS = [
    # ----- A -----
    ("ACE-031",                                   "1mg/vial",     20,   200,  "specialty"),
    ("Acetic Acid Solution 1%",                   "10ml/vial",     7,    70,  "solutions"),
    ("Acetic Acid Water 0.6%",                    "3ml/vial",      5,    50,  "solutions"),
    ("Acetic Acid Water 0.6%",                    "10ml/vial",     7,    70,  "solutions"),
    ("Adamax",                                    "5mg/vial",     38,   380,  "specialty"),
    ("Adamax",                                    "10mg/vial",    54,   540,  "specialty"),
    ("Adipotide",                                 "5mg/vial",     97,   970,  "specialty"),
    ("AICAR",                                     "50mg/vial",    26,   260,  "specialty"),
    ("AICAR",                                     "100mg/vial",   39,   390,  "specialty"),
    ("Alprostadil",                               "20mcg/vial",   60,   600,  "specialty"),
    ("5-Amino-1MQ",                               "5mg/vial",     11,   110,  "longevity"),
    ("5-Amino-1MQ",                               "10mg/vial",    12,   120,  "longevity"),
    ("AOD9604",                                   "2mg/vial",     18,   180,  "specialty"),
    ("AOD9604",                                   "5mg/vial",     35,   350,  "specialty"),
    ("AOD9604",                                   "10mg/vial",    64,   640,  "specialty"),
    ("ARA-290",                                   "10mg/vial",    33,   330,  "cognitive"),
    # ----- B -----
    ("B7-33",                                     "2mg/vial",     31,   310,  "specialty"),
    ("B7-33",                                     "10mg/vial",   104,  1040,  "specialty"),
    ("BAC Water",                                 "3ml/vial",      5,    50,  "solutions"),
    ("BAC Water",                                 "10ml/vial",     8,    80,  "solutions"),
    ("BPC 10mg+TB 10mg",                          "20mg/vial",    70,   700,  "recovery"),
    ("BPC 157",                                   "5mg/vial",     17,   170,  "recovery"),
    ("BPC 157",                                   "10mg/vial",    26,   260,  "recovery"),
    ("BPC 5mg+TB 5mg",                            "10mg/vial",    41,   410,  "recovery"),
    # ----- C -----
    ("Cagrilitide",                               "5mg/vial",     45,   450,  "glp1"),
    ("Cagrilitide",                               "10mg/vial",    67,   670,  "glp1"),
    ("Cagrilitide 5mg+Semaglutide 5mg",           "10mg/vial",    74,   740,  "glp1"),
    ("Cagrilitide 5mg+Tirzepatide 5mg",           "10mg/vial",    73,   730,  "glp1"),
    ("Cerebrolysin",                              "60mg/vial",    37,   370,  "cognitive"),
    ("CJC-1295 With DAC",                         "2mg/vial",     32,   320,  "growth"),
    ("CJC-1295 With DAC",                         "5mg/vial",     68,   680,  "growth"),
    ("CJC-1295 Without DAC",                      "2mg/vial",     16,   160,  "growth"),
    ("CJC-1295 Without DAC",                      "5mg/vial",     27,   270,  "growth"),
    ("CJC-1295 Without DAC",                      "10mg/vial",    47,   470,  "growth"),
    ("CJC-1295 Without DAC 5mg + IPA 5mg",        "10mg/vial",    44,   440,  "growth"),
    ("Cortagen",                                  "20mg/vial",    54,   540,  "longevity"),
    ("Crystagen",                                 "20mg/vial",    38,   380,  "longevity"),
    # ----- D -----
    ("Dermorphin",                                "5mg/vial",     31,   310,  "cognitive"),
    ("DSIP",                                      "5mg/vial",     18,   180,  "cognitive"),
    ("DSIP",                                      "10mg/vial",    28,   280,  "cognitive"),
    # ----- E -----
    ("Epithalon",                                 "10mg/vial",    18,   180,  "longevity"),
    ("Epithalon",                                 "50mg/vial",    56,   560,  "longevity"),
    ("EPo",                                       "3000IU/vial",  31,   310,  "specialty"),
    # ----- F -----
    ("Follistatin-344",                           "1mg/vial",    131,  1310,  "specialty"),
    ("FOXO4-DRI",                                 "10mg/vial",   198,  1980,  "longevity"),
    # ----- G -----
    ("GDF-8",                                     "1mg/vial",     94,   940,  "specialty"),
    ("GHK-Cu",                                    "50mg/vial",    14,   140,  "recovery"),
    ("GHK-Cu",                                    "100mg/vial",   15,   150,  "recovery"),
    ("GHRP-2 Acetate",                            "5mg/vial",     14,   140,  "growth"),
    ("GHRP-2 Acetate",                            "10mg/vial",    18,   180,  "growth"),
    ("GHRP-2 Acetate",                            "15mg/vial",    25,   250,  "growth"),
    ("GHRP-6 Acetate",                            "5mg/vial",     14,   140,  "growth"),
    ("GHRP-6 Acetate",                            "10mg/vial",    19,   190,  "growth"),
    ("GLOW50 (BPC157 5mg+GHK-CU 35mg+TB500 10mg)","50mg/10mg/10mg",42,  420,  "recovery"),
    ("GLP-1",                                     "5mg/vial",     45,   450,  "glp1"),
    ("Glutathione",                               "600mg/vial",   20,   200,  "longevity"),
    ("Glutathione",                               "1500mg/vial",  38,   380,  "longevity"),
    ("Gonadorelin Acetate",                       "2mg/vial",     15,   150,  "specialty"),
    ("Gonadorelin Acetate",                       "5mg/vial",     28,   280,  "specialty"),
    # ----- H -----
    ("HCG",                                       "5000IU/vial",  41,   410,  "specialty"),
    ("HCG",                                       "10000IU/vial", 52,   520,  "specialty"),
    ("Hexarelin Acetate",                         "2mg/vial",     17,   170,  "growth"),
    ("Hexarelin Acetate",                         "5mg/vial",     40,   400,  "growth"),
    ("HGH 191AA",                                 "10iu/vial",    25,   250,  "growth"),
    ("HGH 191AA",                                 "12iu/vial",    29,   290,  "growth"),
    ("HGH 191AA",                                 "15iu/vial",    34,   340,  "growth"),
    ("HGH 191AA",                                 "24iu/vial",    48,   480,  "growth"),
    ("HGH 191AA",                                 "36iu/vial",    65,   650,  "growth"),
    ("HGH Fragments",                             "5mg/vial",     50,   500,  "growth"),
    ("HMG",                                       "75iu/vial",    27,   270,  "specialty"),
    ("Humanin",                                   "10mg/vial",   120,  1200,  "longevity"),
    ("Hyaluronic Acid",                           "5mg/vial",     10,   100,  "recovery"),
    # ----- I -----
    ("IGF-1LR3",                                  "0.1mg/vial",   16,   160,  "growth"),
    ("IGF-1LR3",                                  "1mg/vial",     82,   820,  "growth"),
    ("IGF-DES",                                   "2mg/vial",     58,   580,  "growth"),
    ("Ipamorelin",                                "2mg/vial",     11,   110,  "growth"),
    ("Ipamorelin",                                "5mg/vial",     15,   150,  "growth"),
    ("Ipamorelin",                                "10mg/vial",    22,   220,  "growth"),
    # ----- K -----
    ("KissPeptin-10/Kisspeptin",                  "5mg/vial",     19,   190,  "specialty"),
    ("KissPeptin-10/Kisspeptin",                  "10mg/vial",    30,   300,  "specialty"),
    ("KLOW80 (BPC157 10mg+GHK-CU 50mg+TB500 10mg+KPV10mg)", "50mg/10mg/10mg/10mg", 60, 600, "recovery"),
    ("KPV",                                       "5mg/vial",     15,   150,  "recovery"),
    ("KPV",                                       "10mg/vial",    20,   200,  "recovery"),
    # ----- L -----
    ("L-Carnitine",                               "2mg/vial",     18,   180,  "specialty"),
    ("L-Carnitine",                               "400mg/vial",   24,   240,  "specialty"),
    ("L-Carnitine",                               "600mg/vial",   27,   270,  "specialty"),
    ("L-Carnitine",                               "1200mg/vial",  30,   300,  "specialty"),
    ("Liraglutide",                               "5mg/vial",     45,   450,  "glp1"),
    ("Liraglutide",                               "10mg/vial",    79,   790,  "glp1"),
    ("Liraglutide",                               "30mg/vial",   218,  2180,  "glp1"),
    ("LL37",                                      "5mg/vial",     45,   450,  "recovery"),
    ("Lyophilisate",                              "30mg/bottle",  36,   360,  "specialty"),
    # ----- M -----
    ("Mazdutide",                                 "5mg/vial",     60,   600,  "glp1"),
    ("Mazdutide",                                 "10mg/vial",   100,  1000,  "glp1"),
    ("Melanotan 1/MT1",                           "10mg/vial",    24,   240,  "specialty"),
    ("Melatonin",                                 "10mg/vial",    30,   300,  "cognitive"),
    ("MGF",                                       "2mg/vial",     33,   330,  "growth"),
    ("MOTS-c",                                    "10mg/vial",    28,   280,  "longevity"),
    ("MOTS-c",                                    "15mg/vial",    55,   550,  "longevity"),
    ("MOTS-c",                                    "20mg/vial",    63,   630,  "longevity"),
    ("MOTS-c",                                    "40mg/vial",    96,   960,  "longevity"),
    ("MT-2 (Melanotan 2 Acetate)",                "10mg/vial",    23,   230,  "specialty"),
    # ----- N -----
    ("NAD+ (Buffered)",                           "100mg/vial",   23,   230,  "longevity"),
    ("NAD+ (Buffered)",                           "500mg/vial",   35,   350,  "longevity"),
    ("NAD+ (Buffered)",                           "1000mg/vial",  65,   650,  "longevity"),
    # ----- O -----
    ("Oxytocin Acetate",                          "2mg/vial",     15,   150,  "specialty"),
    ("Oxytocin Acetate",                          "5mg/vial",     21,   210,  "specialty"),
    ("Oxytocin Acetate",                          "10mg/vial",    32,   320,  "specialty"),
    # ----- P -----
    ("P21",                                       "5mg/vial",    146,  1460,  "cognitive"),
    ("PE22-28",                                   "10mg/vial",    48,   480,  "cognitive"),
    ("PEG MGF",                                   "2mg/vial",     40,   400,  "growth"),
    ("Pinealon",                                  "5mg/vial",     14,   140,  "longevity"),
    ("Pinealon",                                  "10mg/vial",    24,   240,  "longevity"),
    ("Pinealon",                                  "20mg/vial",    45,   450,  "longevity"),
    ("PNC27",                                     "5mg/vial",     45,   450,  "specialty"),
    ("PNC27",                                     "10mg/vial",    80,   800,  "specialty"),
    ("PT-141",                                    "10mg/vial",    25,   250,  "specialty"),
    # ----- R -----
    ("Retatrutide",                               "5mg/vial",     26,   260,  "glp1"),
    ("Retatrutide",                               "10mg/vial",    29,   290,  "glp1"),
    ("Retatrutide",                               "15mg/vial",    33,   330,  "glp1"),
    ("Retatrutide",                               "20mg/vial",    38,   380,  "glp1"),
    ("Retatrutide",                               "30mg/vial",    48,   480,  "glp1"),
    ("Retatrutide",                               "50mg/vial",    73,   730,  "glp1"),
    ("Retatrutide",                               "60mg/vial",    90,   900,  "glp1"),
    # ----- S -----
    ("Selank",                                    "5mg/vial",     15,   150,  "cognitive"),
    ("Selank",                                    "10mg/vial",    23,   230,  "cognitive"),
    ("Semaglutide",                               "2mg/vial",     19,   190,  "glp1"),
    ("Semaglutide",                               "5mg/vial",     20,   200,  "glp1"),
    ("Semaglutide",                               "10mg/vial",    23,   230,  "glp1"),
    ("Semaglutide",                               "15mg/vial",    28,   280,  "glp1"),
    ("Semaglutide",                               "20mg/vial",    34,   340,  "glp1"),
    ("Semaglutide",                               "30mg/vial",    44,   440,  "glp1"),
    ("Semaglutide",                               "40mg/vial",    55,   550,  "glp1"),
    ("Semaglutide",                               "50mg/vial",    68,   680,  "glp1"),
    ("Semax",                                     "5mg/vial",     15,   150,  "cognitive"),
    ("Semax",                                     "10mg/vial",    23,   230,  "cognitive"),
    ("Sermorelin Acetate",                        "2mg/vial",     17,   170,  "growth"),
    ("Sermorelin Acetate",                        "5mg/vial",     35,   350,  "growth"),
    ("Sermorelin Acetate",                        "10mg/vial",    50,   500,  "growth"),
    ("SNAP-8",                                    "10mg/vial",    22,   220,  "specialty"),
    ("SS-31",                                     "10mg/vial",    32,   320,  "longevity"),
    ("SS-31",                                     "50mg/vial",   124,  1240,  "longevity"),
    ("Survodutide",                               "10mg/vial",   125,  1250,  "glp1"),
    # ----- T -----
    ("TB500",                                     "2mg/vial",     19,   190,  "recovery"),
    ("TB500",                                     "5mg/vial",     32,   320,  "recovery"),
    ("TB500",                                     "10mg/vial",    60,   600,  "recovery"),
    ("Tesamorelin",                               "2mg/vial",     25,   250,  "growth"),
    ("Tesamorelin",                               "5mg/vial",     38,   380,  "growth"),
    ("Tesamorelin",                               "10mg/vial",    58,   580,  "growth"),
    ("Tesamorelin",                               "20mg/vial",   115,  1150,  "growth"),
    ("Thymalin",                                  "10mg/vial",    27,   270,  "recovery"),
    ("Thymosin Alpha-1",                          "2mg/vial",     28,   280,  "recovery"),
    ("Thymosin Alpha-1",                          "5mg/vial",     45,   450,  "recovery"),
    ("Thymosin Alpha-1",                          "10mg/vial",    78,   780,  "recovery"),
    ("Tirzepatide",                               "5mg/vial",     20,   200,  "glp1"),
    ("Tirzepatide",                               "10mg/vial",    23,   230,  "glp1"),
    ("Tirzepatide",                               "15mg/vial",    28,   280,  "glp1"),
    ("Tirzepatide",                               "20mg/vial",    34,   340,  "glp1"),
    ("Tirzepatide",                               "30mg/vial",    44,   440,  "glp1"),
    ("Tirzepatide",                               "40mg/vial",    55,   550,  "glp1"),
    ("Tirzepatide",                               "50mg/vial",    61,   610,  "glp1"),
    ("Tirzepatide",                               "60mg/vial",    68,   680,  "glp1"),
    ("Tirzepatide",                               "100mg/vial",   68,   680,  "glp1"),
    # ----- V -----
    ("VIP",                                       "5mg/vial",     40,   400,  "specialty"),
    ("VIP",                                       "10mg/vial",    73,   730,  "specialty"),
]

VALID_CATEGORIES = {"glp1","recovery","longevity","growth","cognitive","specialty","solutions"}


def slug(s: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def build_entries(rows):
    out = []
    for name, strength, p1, p10, cat in rows:
        assert cat in VALID_CATEGORIES, f"Unknown category {cat!r} for {name}"
        letter_match = re.search(r"[A-Za-z]", name)
        letter = letter_match.group(0).upper() if letter_match else "#"
        pid = slug(name) + "-" + slug(strength)
        fmt = "Lyophilized bottle" if "/bottle" in strength else "Lyophilized vial"
        out.append({
            "id": pid,
            "name": name,
            "nameNormalized": slug(name),
            "strength": strength,
            "format": fmt,
            "letter": letter,
            "category": cat,
            "priceOneVial": p1,
            "priceTenVialBox": p10,
        })
    return out


def emit_js(entries) -> str:
    lines = [
        '/* ==========================================================================',
        '   Blueprint Biologics, Catalog Data',
        '   Generated from the official Blueprint Biologics price sheet.',
        '   Vanilla JS, exposed as window.BB_CATALOG.',
        '',
        '   All entries are catalog items available to qualified wholesale, clinical,',
        '   and professional accounts, subject to account review and applicable laws.',
        '   Prices are in USD and reflect blank vial pricing. Custom labels add $0.25',
        '   per vial where available. Pricing and availability may change.',
        '   ========================================================================== */',
        '',
        '(function (global) {',
        '  "use strict";',
        '',
        '  var CATEGORIES = [',
        '    { id: "all",        label: "All Categories",                    short: "All" },',
        '    { id: "glp1",       label: "GLP-1 / Incretin Research",         short: "GLP-1" },',
        '    { id: "recovery",   label: "Recovery & Repair Research",        short: "Recovery" },',
        '    { id: "longevity",  label: "Longevity & NAD+ Research",         short: "Longevity" },',
        '    { id: "growth",     label: "Growth Hormone Research",           short: "Growth" },',
        '    { id: "cognitive",  label: "Cognitive Research",                short: "Cognitive" },',
        '    { id: "specialty",  label: "Specialty Compounds",               short: "Specialty" },',
        '    { id: "solutions",  label: "Solutions & Accessories",           short: "Solutions" }',
        '  ];',
        '',
        '  var CUSTOM_LABEL_NOTE = "Custom labels add $0.25 per vial where available.";',
        '  var AVAILABILITY_NOTE = "Request current availability";',
        '  var DISCLAIMER_NOTE   = "Available to qualified wholesale, clinical, and professional accounts, subject to account review and applicable laws.";',
        '',
        '  var PRODUCTS = [',
    ]
    for p in entries:
        name_js = p["name"].replace('"', '\\"')
        strength_js = p["strength"].replace('"', '\\"')
        lines.append(
            f'    {{ id: "{p["id"]}", name: "{name_js}", '
            f'nameNormalized: "{p["nameNormalized"]}", '
            f'strength: "{strength_js}", format: "{p["format"]}", '
            f'letter: "{p["letter"]}", category: "{p["category"]}", '
            f'priceOneVial: {p["priceOneVial"]}, '
            f'priceTenVialBox: {p["priceTenVialBox"]} }},'
        )
    lines[-1] = lines[-1].rstrip(",")
    lines += [
        '  ];',
        '',
        '  // ----- Helpers -----------------------------------------------------------',
        '  function categoryLabel(id) {',
        '    var c = CATEGORIES.find(function (x) { return x.id === id; });',
        '    return c ? c.label : id;',
        '  }',
        '  function categoryShort(id) {',
        '    var c = CATEGORIES.find(function (x) { return x.id === id; });',
        '    return c ? c.short : id;',
        '  }',
        '  function findProduct(id) {',
        '    return PRODUCTS.find(function (p) { return p.id === id; }) || null;',
        '  }',
        '  function findRelatedStrengths(p) {',
        '    if (!p) return [];',
        '    return PRODUCTS.filter(function (x) {',
        '      return x.nameNormalized === p.nameNormalized && x.id !== p.id;',
        '    });',
        '  }',
        '  function formatPrice(n) {',
        '    if (typeof n !== "number" || isNaN(n)) return "Request pricing";',
        '    return "$" + n.toLocaleString("en-US");',
        '  }',
        '  // Numeric strength sort helper. Pulls the first numeric value out of the',
        '  // strength label so 2mg < 10mg < 50mg etc.',
        '  function strengthValue(s) {',
        '    var m = String(s || "").match(/([0-9]*\\.?[0-9]+)\\s*(mcg|mg|iu|ml|g)?/i);',
        '    if (!m) return 0;',
        '    var n = parseFloat(m[1]);',
        '    var u = (m[2] || "mg").toLowerCase();',
        '    if (u === "mcg") n = n / 1000;     // normalize to mg',
        '    if (u === "g")   n = n * 1000;',
        '    return n;',
        '  }',
        '',
        '  global.BB_CATALOG = {',
        '    categories: CATEGORIES,',
        '    products: PRODUCTS,',
        '    customLabelNote: CUSTOM_LABEL_NOTE,',
        '    availabilityNote: AVAILABILITY_NOTE,',
        '    disclaimerNote: DISCLAIMER_NOTE,',
        '    categoryLabel: categoryLabel,',
        '    categoryShort: categoryShort,',
        '    findProduct: findProduct,',
        '    findRelatedStrengths: findRelatedStrengths,',
        '    formatPrice: formatPrice,',
        '    strengthValue: strengthValue',
        '  };',
        '})(window);',
        '',
    ]
    return "\n".join(lines)


def main():
    import pathlib
    entries = build_entries(ROWS)
    target = pathlib.Path(__file__).resolve().parent.parent / "src" / "data" / "products.js"
    target.write_text(emit_js(entries))
    print(f"Wrote {target} with {len(entries)} products.")
    print("Next: bump the cache-buster on every HTML page so browsers refetch.")


if __name__ == "__main__":
    main()
