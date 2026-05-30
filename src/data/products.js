/* ==========================================================================
   Blueprint Biologics, Catalog Data
   Generated from the official Blueprint Biologics price sheet.
   Vanilla JS, exposed as window.BB_CATALOG.

   All entries are research compounds for laboratory research use only.
   Not for human or animal consumption. Not intended to diagnose, treat,
   cure, or prevent any disease. Prices are in USD and reflect blank vial
   pricing. Custom labels add $0.25 per vial where available.
   ========================================================================== */

(function (global) {
  "use strict";

  var CATEGORIES = [
    { id: "all",        label: "All Categories",                    short: "All" },
    { id: "glp1",       label: "GLP-1 / Incretin Research",         short: "GLP-1" },
    { id: "recovery",   label: "Recovery & Repair Research",        short: "Recovery" },
    { id: "longevity",  label: "Longevity & NAD+ Research",         short: "Longevity" },
    { id: "growth",     label: "Growth Hormone Research",           short: "Growth" },
    { id: "cognitive",  label: "Cognitive Research",                short: "Cognitive" },
    { id: "specialty",  label: "Specialty Compounds",               short: "Specialty" },
    { id: "solutions",  label: "Solutions & Accessories",           short: "Solutions" }
  ];

  var CUSTOM_LABEL_NOTE = "Custom labels add $0.25 per vial where available.";
  var AVAILABILITY_NOTE = "Request current availability";
  var DISCLAIMER_NOTE   = "For laboratory research use only. Not for human or animal consumption.";

  var PRODUCTS = [
    { id: "ace-031-1mg-vial", name: "ACE-031", nameNormalized: "ace-031", strength: "1mg/vial", format: "Lyophilized vial", letter: "A", category: "specialty", priceOneVial: 20, priceTenVialBox: 200 },
    { id: "acetic-acid-solution-1-10ml-vial", name: "Acetic Acid Solution 1%", nameNormalized: "acetic-acid-solution-1", strength: "10ml/vial", format: "Lyophilized vial", letter: "A", category: "solutions", priceOneVial: 7, priceTenVialBox: 70 },
    { id: "acetic-acid-water-0-6-3ml-vial", name: "Acetic Acid Water 0.6%", nameNormalized: "acetic-acid-water-0-6", strength: "3ml/vial", format: "Lyophilized vial", letter: "A", category: "solutions", priceOneVial: 5, priceTenVialBox: 50 },
    { id: "acetic-acid-water-0-6-10ml-vial", name: "Acetic Acid Water 0.6%", nameNormalized: "acetic-acid-water-0-6", strength: "10ml/vial", format: "Lyophilized vial", letter: "A", category: "solutions", priceOneVial: 7, priceTenVialBox: 70 },
    { id: "adamax-5mg-vial", name: "Adamax", nameNormalized: "adamax", strength: "5mg/vial", format: "Lyophilized vial", letter: "A", category: "specialty", priceOneVial: 38, priceTenVialBox: 380 },
    { id: "adamax-10mg-vial", name: "Adamax", nameNormalized: "adamax", strength: "10mg/vial", format: "Lyophilized vial", letter: "A", category: "specialty", priceOneVial: 54, priceTenVialBox: 540 },
    { id: "adipotide-5mg-vial", name: "Adipotide", nameNormalized: "adipotide", strength: "5mg/vial", format: "Lyophilized vial", letter: "A", category: "specialty", priceOneVial: 97, priceTenVialBox: 970 },
    { id: "aicar-50mg-vial", name: "AICAR", nameNormalized: "aicar", strength: "50mg/vial", format: "Lyophilized vial", letter: "A", category: "specialty", priceOneVial: 26, priceTenVialBox: 260 },
    { id: "aicar-100mg-vial", name: "AICAR", nameNormalized: "aicar", strength: "100mg/vial", format: "Lyophilized vial", letter: "A", category: "specialty", priceOneVial: 39, priceTenVialBox: 390 },
    { id: "alprostadil-20mcg-vial", name: "Alprostadil", nameNormalized: "alprostadil", strength: "20mcg/vial", format: "Lyophilized vial", letter: "A", category: "specialty", priceOneVial: 60, priceTenVialBox: 600 },
    { id: "5-amino-1mq-5mg-vial", name: "5-Amino-1MQ", nameNormalized: "5-amino-1mq", strength: "5mg/vial", format: "Lyophilized vial", letter: "A", category: "longevity", priceOneVial: 11, priceTenVialBox: 110 },
    { id: "5-amino-1mq-10mg-vial", name: "5-Amino-1MQ", nameNormalized: "5-amino-1mq", strength: "10mg/vial", format: "Lyophilized vial", letter: "A", category: "longevity", priceOneVial: 12, priceTenVialBox: 120 },
    { id: "aod9604-2mg-vial", name: "AOD9604", nameNormalized: "aod9604", strength: "2mg/vial", format: "Lyophilized vial", letter: "A", category: "specialty", priceOneVial: 18, priceTenVialBox: 180 },
    { id: "aod9604-5mg-vial", name: "AOD9604", nameNormalized: "aod9604", strength: "5mg/vial", format: "Lyophilized vial", letter: "A", category: "specialty", priceOneVial: 35, priceTenVialBox: 350 },
    { id: "aod9604-10mg-vial", name: "AOD9604", nameNormalized: "aod9604", strength: "10mg/vial", format: "Lyophilized vial", letter: "A", category: "specialty", priceOneVial: 64, priceTenVialBox: 640 },
    { id: "ara-290-10mg-vial", name: "ARA-290", nameNormalized: "ara-290", strength: "10mg/vial", format: "Lyophilized vial", letter: "A", category: "cognitive", priceOneVial: 33, priceTenVialBox: 330 },
    { id: "b7-33-2mg-vial", name: "B7-33", nameNormalized: "b7-33", strength: "2mg/vial", format: "Lyophilized vial", letter: "B", category: "specialty", priceOneVial: 31, priceTenVialBox: 310 },
    { id: "b7-33-10mg-vial", name: "B7-33", nameNormalized: "b7-33", strength: "10mg/vial", format: "Lyophilized vial", letter: "B", category: "specialty", priceOneVial: 104, priceTenVialBox: 1040 },
    { id: "bac-water-3ml-vial", name: "BAC Water", nameNormalized: "bac-water", strength: "3ml/vial", format: "Lyophilized vial", letter: "B", category: "solutions", priceOneVial: 5, priceTenVialBox: 50 },
    { id: "bac-water-10ml-vial", name: "BAC Water", nameNormalized: "bac-water", strength: "10ml/vial", format: "Lyophilized vial", letter: "B", category: "solutions", priceOneVial: 8, priceTenVialBox: 80 },
    { id: "bpc-10mg-tb-10mg-20mg-vial", name: "BPC 10mg+TB 10mg", nameNormalized: "bpc-10mg-tb-10mg", strength: "20mg/vial", format: "Lyophilized vial", letter: "B", category: "recovery", priceOneVial: 70, priceTenVialBox: 700 },
    { id: "bpc-157-5mg-vial", name: "BPC 157", nameNormalized: "bpc-157", strength: "5mg/vial", format: "Lyophilized vial", letter: "B", category: "recovery", priceOneVial: 17, priceTenVialBox: 170 },
    { id: "bpc-157-10mg-vial", name: "BPC 157", nameNormalized: "bpc-157", strength: "10mg/vial", format: "Lyophilized vial", letter: "B", category: "recovery", priceOneVial: 26, priceTenVialBox: 260 },
    { id: "bpc-5mg-tb-5mg-10mg-vial", name: "BPC 5mg+TB 5mg", nameNormalized: "bpc-5mg-tb-5mg", strength: "10mg/vial", format: "Lyophilized vial", letter: "B", category: "recovery", priceOneVial: 41, priceTenVialBox: 410 },
    { id: "cagrilitide-5mg-vial", name: "Cagrilitide", nameNormalized: "cagrilitide", strength: "5mg/vial", format: "Lyophilized vial", letter: "C", category: "glp1", priceOneVial: 45, priceTenVialBox: 450 },
    { id: "cagrilitide-10mg-vial", name: "Cagrilitide", nameNormalized: "cagrilitide", strength: "10mg/vial", format: "Lyophilized vial", letter: "C", category: "glp1", priceOneVial: 67, priceTenVialBox: 670 },
    { id: "cagrilitide-5mg-semaglutide-5mg-10mg-vial", name: "Cagrilitide 5mg+Semaglutide 5mg", nameNormalized: "cagrilitide-5mg-semaglutide-5mg", strength: "10mg/vial", format: "Lyophilized vial", letter: "C", category: "glp1", priceOneVial: 74, priceTenVialBox: 740 },
    { id: "cagrilitide-5mg-tirzepatide-5mg-10mg-vial", name: "Cagrilitide 5mg+Tirzepatide 5mg", nameNormalized: "cagrilitide-5mg-tirzepatide-5mg", strength: "10mg/vial", format: "Lyophilized vial", letter: "C", category: "glp1", priceOneVial: 73, priceTenVialBox: 730 },
    { id: "cerebrolysin-60mg-vial", name: "Cerebrolysin", nameNormalized: "cerebrolysin", strength: "60mg/vial", format: "Lyophilized vial", letter: "C", category: "cognitive", priceOneVial: 37, priceTenVialBox: 370 },
    { id: "cjc-1295-with-dac-2mg-vial", name: "CJC-1295 With DAC", nameNormalized: "cjc-1295-with-dac", strength: "2mg/vial", format: "Lyophilized vial", letter: "C", category: "growth", priceOneVial: 32, priceTenVialBox: 320 },
    { id: "cjc-1295-with-dac-5mg-vial", name: "CJC-1295 With DAC", nameNormalized: "cjc-1295-with-dac", strength: "5mg/vial", format: "Lyophilized vial", letter: "C", category: "growth", priceOneVial: 68, priceTenVialBox: 680 },
    { id: "cjc-1295-without-dac-2mg-vial", name: "CJC-1295 Without DAC", nameNormalized: "cjc-1295-without-dac", strength: "2mg/vial", format: "Lyophilized vial", letter: "C", category: "growth", priceOneVial: 16, priceTenVialBox: 160 },
    { id: "cjc-1295-without-dac-5mg-vial", name: "CJC-1295 Without DAC", nameNormalized: "cjc-1295-without-dac", strength: "5mg/vial", format: "Lyophilized vial", letter: "C", category: "growth", priceOneVial: 27, priceTenVialBox: 270 },
    { id: "cjc-1295-without-dac-10mg-vial", name: "CJC-1295 Without DAC", nameNormalized: "cjc-1295-without-dac", strength: "10mg/vial", format: "Lyophilized vial", letter: "C", category: "growth", priceOneVial: 47, priceTenVialBox: 470 },
    { id: "cjc-1295-without-dac-5mg-ipa-5mg-10mg-vial", name: "CJC-1295 Without DAC 5mg + IPA 5mg", nameNormalized: "cjc-1295-without-dac-5mg-ipa-5mg", strength: "10mg/vial", format: "Lyophilized vial", letter: "C", category: "growth", priceOneVial: 44, priceTenVialBox: 440 },
    { id: "cortagen-20mg-vial", name: "Cortagen", nameNormalized: "cortagen", strength: "20mg/vial", format: "Lyophilized vial", letter: "C", category: "longevity", priceOneVial: 54, priceTenVialBox: 540 },
    { id: "crystagen-20mg-vial", name: "Crystagen", nameNormalized: "crystagen", strength: "20mg/vial", format: "Lyophilized vial", letter: "C", category: "longevity", priceOneVial: 38, priceTenVialBox: 380 },
    { id: "dermorphin-5mg-vial", name: "Dermorphin", nameNormalized: "dermorphin", strength: "5mg/vial", format: "Lyophilized vial", letter: "D", category: "cognitive", priceOneVial: 31, priceTenVialBox: 310 },
    { id: "dsip-5mg-vial", name: "DSIP", nameNormalized: "dsip", strength: "5mg/vial", format: "Lyophilized vial", letter: "D", category: "cognitive", priceOneVial: 18, priceTenVialBox: 180 },
    { id: "dsip-10mg-vial", name: "DSIP", nameNormalized: "dsip", strength: "10mg/vial", format: "Lyophilized vial", letter: "D", category: "cognitive", priceOneVial: 28, priceTenVialBox: 280 },
    { id: "epithalon-10mg-vial", name: "Epithalon", nameNormalized: "epithalon", strength: "10mg/vial", format: "Lyophilized vial", letter: "E", category: "longevity", priceOneVial: 18, priceTenVialBox: 180 },
    { id: "epithalon-50mg-vial", name: "Epithalon", nameNormalized: "epithalon", strength: "50mg/vial", format: "Lyophilized vial", letter: "E", category: "longevity", priceOneVial: 56, priceTenVialBox: 560 },
    { id: "epo-3000iu-vial", name: "EPo", nameNormalized: "epo", strength: "3000IU/vial", format: "Lyophilized vial", letter: "E", category: "specialty", priceOneVial: 31, priceTenVialBox: 310 },
    { id: "follistatin-344-1mg-vial", name: "Follistatin-344", nameNormalized: "follistatin-344", strength: "1mg/vial", format: "Lyophilized vial", letter: "F", category: "specialty", priceOneVial: 131, priceTenVialBox: 1310 },
    { id: "foxo4-dri-10mg-vial", name: "FOXO4-DRI", nameNormalized: "foxo4-dri", strength: "10mg/vial", format: "Lyophilized vial", letter: "F", category: "longevity", priceOneVial: 198, priceTenVialBox: 1980 },
    { id: "gdf-8-1mg-vial", name: "GDF-8", nameNormalized: "gdf-8", strength: "1mg/vial", format: "Lyophilized vial", letter: "G", category: "specialty", priceOneVial: 94, priceTenVialBox: 940 },
    { id: "ghk-cu-50mg-vial", name: "GHK-Cu", nameNormalized: "ghk-cu", strength: "50mg/vial", format: "Lyophilized vial", letter: "G", category: "recovery", priceOneVial: 14, priceTenVialBox: 140 },
    { id: "ghk-cu-100mg-vial", name: "GHK-Cu", nameNormalized: "ghk-cu", strength: "100mg/vial", format: "Lyophilized vial", letter: "G", category: "recovery", priceOneVial: 15, priceTenVialBox: 150 },
    { id: "ghrp-2-acetate-5mg-vial", name: "GHRP-2 Acetate", nameNormalized: "ghrp-2-acetate", strength: "5mg/vial", format: "Lyophilized vial", letter: "G", category: "growth", priceOneVial: 14, priceTenVialBox: 140 },
    { id: "ghrp-2-acetate-10mg-vial", name: "GHRP-2 Acetate", nameNormalized: "ghrp-2-acetate", strength: "10mg/vial", format: "Lyophilized vial", letter: "G", category: "growth", priceOneVial: 18, priceTenVialBox: 180 },
    { id: "ghrp-2-acetate-15mg-vial", name: "GHRP-2 Acetate", nameNormalized: "ghrp-2-acetate", strength: "15mg/vial", format: "Lyophilized vial", letter: "G", category: "growth", priceOneVial: 25, priceTenVialBox: 250 },
    { id: "ghrp-6-acetate-5mg-vial", name: "GHRP-6 Acetate", nameNormalized: "ghrp-6-acetate", strength: "5mg/vial", format: "Lyophilized vial", letter: "G", category: "growth", priceOneVial: 14, priceTenVialBox: 140 },
    { id: "ghrp-6-acetate-10mg-vial", name: "GHRP-6 Acetate", nameNormalized: "ghrp-6-acetate", strength: "10mg/vial", format: "Lyophilized vial", letter: "G", category: "growth", priceOneVial: 19, priceTenVialBox: 190 },
    { id: "glow50-bpc157-5mg-ghk-cu-35mg-tb500-10mg-50mg-10mg-10mg", name: "GLOW50 (BPC157 5mg+GHK-CU 35mg+TB500 10mg)", nameNormalized: "glow50-bpc157-5mg-ghk-cu-35mg-tb500-10mg", strength: "50mg/10mg/10mg", format: "Lyophilized vial", letter: "G", category: "recovery", priceOneVial: 42, priceTenVialBox: 420 },
    { id: "glp-1-5mg-vial", name: "GLP-1", nameNormalized: "glp-1", strength: "5mg/vial", format: "Lyophilized vial", letter: "G", category: "glp1", priceOneVial: 45, priceTenVialBox: 450 },
    { id: "glutathione-600mg-vial", name: "Glutathione", nameNormalized: "glutathione", strength: "600mg/vial", format: "Lyophilized vial", letter: "G", category: "longevity", priceOneVial: 20, priceTenVialBox: 200 },
    { id: "glutathione-1500mg-vial", name: "Glutathione", nameNormalized: "glutathione", strength: "1500mg/vial", format: "Lyophilized vial", letter: "G", category: "longevity", priceOneVial: 38, priceTenVialBox: 380 },
    { id: "gonadorelin-acetate-2mg-vial", name: "Gonadorelin Acetate", nameNormalized: "gonadorelin-acetate", strength: "2mg/vial", format: "Lyophilized vial", letter: "G", category: "specialty", priceOneVial: 15, priceTenVialBox: 150 },
    { id: "gonadorelin-acetate-5mg-vial", name: "Gonadorelin Acetate", nameNormalized: "gonadorelin-acetate", strength: "5mg/vial", format: "Lyophilized vial", letter: "G", category: "specialty", priceOneVial: 28, priceTenVialBox: 280 },
    { id: "hcg-5000iu-vial", name: "HCG", nameNormalized: "hcg", strength: "5000IU/vial", format: "Lyophilized vial", letter: "H", category: "specialty", priceOneVial: 41, priceTenVialBox: 410 },
    { id: "hcg-10000iu-vial", name: "HCG", nameNormalized: "hcg", strength: "10000IU/vial", format: "Lyophilized vial", letter: "H", category: "specialty", priceOneVial: 52, priceTenVialBox: 520 },
    { id: "hexarelin-acetate-2mg-vial", name: "Hexarelin Acetate", nameNormalized: "hexarelin-acetate", strength: "2mg/vial", format: "Lyophilized vial", letter: "H", category: "growth", priceOneVial: 17, priceTenVialBox: 170 },
    { id: "hexarelin-acetate-5mg-vial", name: "Hexarelin Acetate", nameNormalized: "hexarelin-acetate", strength: "5mg/vial", format: "Lyophilized vial", letter: "H", category: "growth", priceOneVial: 40, priceTenVialBox: 400 },
    { id: "hgh-191aa-10iu-vial", name: "HGH 191AA", nameNormalized: "hgh-191aa", strength: "10iu/vial", format: "Lyophilized vial", letter: "H", category: "growth", priceOneVial: 25, priceTenVialBox: 250 },
    { id: "hgh-191aa-12iu-vial", name: "HGH 191AA", nameNormalized: "hgh-191aa", strength: "12iu/vial", format: "Lyophilized vial", letter: "H", category: "growth", priceOneVial: 29, priceTenVialBox: 290 },
    { id: "hgh-191aa-15iu-vial", name: "HGH 191AA", nameNormalized: "hgh-191aa", strength: "15iu/vial", format: "Lyophilized vial", letter: "H", category: "growth", priceOneVial: 34, priceTenVialBox: 340 },
    { id: "hgh-191aa-24iu-vial", name: "HGH 191AA", nameNormalized: "hgh-191aa", strength: "24iu/vial", format: "Lyophilized vial", letter: "H", category: "growth", priceOneVial: 48, priceTenVialBox: 480 },
    { id: "hgh-191aa-36iu-vial", name: "HGH 191AA", nameNormalized: "hgh-191aa", strength: "36iu/vial", format: "Lyophilized vial", letter: "H", category: "growth", priceOneVial: 65, priceTenVialBox: 650 },
    { id: "hgh-fragments-5mg-vial", name: "HGH Fragments", nameNormalized: "hgh-fragments", strength: "5mg/vial", format: "Lyophilized vial", letter: "H", category: "growth", priceOneVial: 50, priceTenVialBox: 500 },
    { id: "hmg-75iu-vial", name: "HMG", nameNormalized: "hmg", strength: "75iu/vial", format: "Lyophilized vial", letter: "H", category: "specialty", priceOneVial: 27, priceTenVialBox: 270 },
    { id: "humanin-10mg-vial", name: "Humanin", nameNormalized: "humanin", strength: "10mg/vial", format: "Lyophilized vial", letter: "H", category: "longevity", priceOneVial: 120, priceTenVialBox: 1200 },
    { id: "hyaluronic-acid-5mg-vial", name: "Hyaluronic Acid", nameNormalized: "hyaluronic-acid", strength: "5mg/vial", format: "Lyophilized vial", letter: "H", category: "recovery", priceOneVial: 10, priceTenVialBox: 100 },
    { id: "igf-1lr3-0-1mg-vial", name: "IGF-1LR3", nameNormalized: "igf-1lr3", strength: "0.1mg/vial", format: "Lyophilized vial", letter: "I", category: "growth", priceOneVial: 16, priceTenVialBox: 160 },
    { id: "igf-1lr3-1mg-vial", name: "IGF-1LR3", nameNormalized: "igf-1lr3", strength: "1mg/vial", format: "Lyophilized vial", letter: "I", category: "growth", priceOneVial: 82, priceTenVialBox: 820 },
    { id: "igf-des-2mg-vial", name: "IGF-DES", nameNormalized: "igf-des", strength: "2mg/vial", format: "Lyophilized vial", letter: "I", category: "growth", priceOneVial: 58, priceTenVialBox: 580 },
    { id: "ipamorelin-2mg-vial", name: "Ipamorelin", nameNormalized: "ipamorelin", strength: "2mg/vial", format: "Lyophilized vial", letter: "I", category: "growth", priceOneVial: 11, priceTenVialBox: 110 },
    { id: "ipamorelin-5mg-vial", name: "Ipamorelin", nameNormalized: "ipamorelin", strength: "5mg/vial", format: "Lyophilized vial", letter: "I", category: "growth", priceOneVial: 15, priceTenVialBox: 150 },
    { id: "ipamorelin-10mg-vial", name: "Ipamorelin", nameNormalized: "ipamorelin", strength: "10mg/vial", format: "Lyophilized vial", letter: "I", category: "growth", priceOneVial: 22, priceTenVialBox: 220 },
    { id: "kisspeptin-10-kisspeptin-5mg-vial", name: "KissPeptin-10/Kisspeptin", nameNormalized: "kisspeptin-10-kisspeptin", strength: "5mg/vial", format: "Lyophilized vial", letter: "K", category: "specialty", priceOneVial: 19, priceTenVialBox: 190 },
    { id: "kisspeptin-10-kisspeptin-10mg-vial", name: "KissPeptin-10/Kisspeptin", nameNormalized: "kisspeptin-10-kisspeptin", strength: "10mg/vial", format: "Lyophilized vial", letter: "K", category: "specialty", priceOneVial: 30, priceTenVialBox: 300 },
    { id: "klow80-bpc157-10mg-ghk-cu-50mg-tb500-10mg-kpv10mg-50mg-10mg-10mg-10mg", name: "KLOW80 (BPC157 10mg+GHK-CU 50mg+TB500 10mg+KPV10mg)", nameNormalized: "klow80-bpc157-10mg-ghk-cu-50mg-tb500-10mg-kpv10mg", strength: "50mg/10mg/10mg/10mg", format: "Lyophilized vial", letter: "K", category: "recovery", priceOneVial: 60, priceTenVialBox: 600 },
    { id: "kpv-5mg-vial", name: "KPV", nameNormalized: "kpv", strength: "5mg/vial", format: "Lyophilized vial", letter: "K", category: "recovery", priceOneVial: 15, priceTenVialBox: 150 },
    { id: "kpv-10mg-vial", name: "KPV", nameNormalized: "kpv", strength: "10mg/vial", format: "Lyophilized vial", letter: "K", category: "recovery", priceOneVial: 20, priceTenVialBox: 200 },
    { id: "l-carnitine-2mg-vial", name: "L-Carnitine", nameNormalized: "l-carnitine", strength: "2mg/vial", format: "Lyophilized vial", letter: "L", category: "specialty", priceOneVial: 18, priceTenVialBox: 180 },
    { id: "l-carnitine-400mg-vial", name: "L-Carnitine", nameNormalized: "l-carnitine", strength: "400mg/vial", format: "Lyophilized vial", letter: "L", category: "specialty", priceOneVial: 24, priceTenVialBox: 240 },
    { id: "l-carnitine-600mg-vial", name: "L-Carnitine", nameNormalized: "l-carnitine", strength: "600mg/vial", format: "Lyophilized vial", letter: "L", category: "specialty", priceOneVial: 27, priceTenVialBox: 270 },
    { id: "l-carnitine-1200mg-vial", name: "L-Carnitine", nameNormalized: "l-carnitine", strength: "1200mg/vial", format: "Lyophilized vial", letter: "L", category: "specialty", priceOneVial: 30, priceTenVialBox: 300 },
    { id: "liraglutide-5mg-vial", name: "Liraglutide", nameNormalized: "liraglutide", strength: "5mg/vial", format: "Lyophilized vial", letter: "L", category: "glp1", priceOneVial: 45, priceTenVialBox: 450 },
    { id: "liraglutide-10mg-vial", name: "Liraglutide", nameNormalized: "liraglutide", strength: "10mg/vial", format: "Lyophilized vial", letter: "L", category: "glp1", priceOneVial: 79, priceTenVialBox: 790 },
    { id: "liraglutide-30mg-vial", name: "Liraglutide", nameNormalized: "liraglutide", strength: "30mg/vial", format: "Lyophilized vial", letter: "L", category: "glp1", priceOneVial: 218, priceTenVialBox: 2180 },
    { id: "ll37-5mg-vial", name: "LL37", nameNormalized: "ll37", strength: "5mg/vial", format: "Lyophilized vial", letter: "L", category: "recovery", priceOneVial: 45, priceTenVialBox: 450 },
    { id: "lyophilisate-30mg-bottle", name: "Lyophilisate", nameNormalized: "lyophilisate", strength: "30mg/bottle", format: "Lyophilized bottle", letter: "L", category: "specialty", priceOneVial: 36, priceTenVialBox: 360 },
    { id: "mazdutide-5mg-vial", name: "Mazdutide", nameNormalized: "mazdutide", strength: "5mg/vial", format: "Lyophilized vial", letter: "M", category: "glp1", priceOneVial: 60, priceTenVialBox: 600 },
    { id: "mazdutide-10mg-vial", name: "Mazdutide", nameNormalized: "mazdutide", strength: "10mg/vial", format: "Lyophilized vial", letter: "M", category: "glp1", priceOneVial: 100, priceTenVialBox: 1000 },
    { id: "melanotan-1-mt1-10mg-vial", name: "Melanotan 1/MT1", nameNormalized: "melanotan-1-mt1", strength: "10mg/vial", format: "Lyophilized vial", letter: "M", category: "specialty", priceOneVial: 24, priceTenVialBox: 240 },
    { id: "melatonin-10mg-vial", name: "Melatonin", nameNormalized: "melatonin", strength: "10mg/vial", format: "Lyophilized vial", letter: "M", category: "cognitive", priceOneVial: 30, priceTenVialBox: 300 },
    { id: "mgf-2mg-vial", name: "MGF", nameNormalized: "mgf", strength: "2mg/vial", format: "Lyophilized vial", letter: "M", category: "growth", priceOneVial: 33, priceTenVialBox: 330 },
    { id: "mots-c-10mg-vial", name: "MOTS-c", nameNormalized: "mots-c", strength: "10mg/vial", format: "Lyophilized vial", letter: "M", category: "longevity", priceOneVial: 28, priceTenVialBox: 280 },
    { id: "mots-c-15mg-vial", name: "MOTS-c", nameNormalized: "mots-c", strength: "15mg/vial", format: "Lyophilized vial", letter: "M", category: "longevity", priceOneVial: 55, priceTenVialBox: 550 },
    { id: "mots-c-20mg-vial", name: "MOTS-c", nameNormalized: "mots-c", strength: "20mg/vial", format: "Lyophilized vial", letter: "M", category: "longevity", priceOneVial: 63, priceTenVialBox: 630 },
    { id: "mots-c-40mg-vial", name: "MOTS-c", nameNormalized: "mots-c", strength: "40mg/vial", format: "Lyophilized vial", letter: "M", category: "longevity", priceOneVial: 96, priceTenVialBox: 960 },
    { id: "mt-2-melanotan-2-acetate-10mg-vial", name: "MT-2 (Melanotan 2 Acetate)", nameNormalized: "mt-2-melanotan-2-acetate", strength: "10mg/vial", format: "Lyophilized vial", letter: "M", category: "specialty", priceOneVial: 23, priceTenVialBox: 230 },
    { id: "nad-buffered-100mg-vial", name: "NAD+ (Buffered)", nameNormalized: "nad-buffered", strength: "100mg/vial", format: "Lyophilized vial", letter: "N", category: "longevity", priceOneVial: 23, priceTenVialBox: 230 },
    { id: "nad-buffered-500mg-vial", name: "NAD+ (Buffered)", nameNormalized: "nad-buffered", strength: "500mg/vial", format: "Lyophilized vial", letter: "N", category: "longevity", priceOneVial: 35, priceTenVialBox: 350 },
    { id: "nad-buffered-1000mg-vial", name: "NAD+ (Buffered)", nameNormalized: "nad-buffered", strength: "1000mg/vial", format: "Lyophilized vial", letter: "N", category: "longevity", priceOneVial: 65, priceTenVialBox: 650 },
    { id: "oxytocin-acetate-2mg-vial", name: "Oxytocin Acetate", nameNormalized: "oxytocin-acetate", strength: "2mg/vial", format: "Lyophilized vial", letter: "O", category: "specialty", priceOneVial: 15, priceTenVialBox: 150 },
    { id: "oxytocin-acetate-5mg-vial", name: "Oxytocin Acetate", nameNormalized: "oxytocin-acetate", strength: "5mg/vial", format: "Lyophilized vial", letter: "O", category: "specialty", priceOneVial: 21, priceTenVialBox: 210 },
    { id: "oxytocin-acetate-10mg-vial", name: "Oxytocin Acetate", nameNormalized: "oxytocin-acetate", strength: "10mg/vial", format: "Lyophilized vial", letter: "O", category: "specialty", priceOneVial: 32, priceTenVialBox: 320 },
    { id: "p21-5mg-vial", name: "P21", nameNormalized: "p21", strength: "5mg/vial", format: "Lyophilized vial", letter: "P", category: "cognitive", priceOneVial: 146, priceTenVialBox: 1460 },
    { id: "pe22-28-10mg-vial", name: "PE22-28", nameNormalized: "pe22-28", strength: "10mg/vial", format: "Lyophilized vial", letter: "P", category: "cognitive", priceOneVial: 48, priceTenVialBox: 480 },
    { id: "peg-mgf-2mg-vial", name: "PEG MGF", nameNormalized: "peg-mgf", strength: "2mg/vial", format: "Lyophilized vial", letter: "P", category: "growth", priceOneVial: 40, priceTenVialBox: 400 },
    { id: "pinealon-5mg-vial", name: "Pinealon", nameNormalized: "pinealon", strength: "5mg/vial", format: "Lyophilized vial", letter: "P", category: "longevity", priceOneVial: 14, priceTenVialBox: 140 },
    { id: "pinealon-10mg-vial", name: "Pinealon", nameNormalized: "pinealon", strength: "10mg/vial", format: "Lyophilized vial", letter: "P", category: "longevity", priceOneVial: 24, priceTenVialBox: 240 },
    { id: "pinealon-20mg-vial", name: "Pinealon", nameNormalized: "pinealon", strength: "20mg/vial", format: "Lyophilized vial", letter: "P", category: "longevity", priceOneVial: 45, priceTenVialBox: 450 },
    { id: "pnc27-5mg-vial", name: "PNC27", nameNormalized: "pnc27", strength: "5mg/vial", format: "Lyophilized vial", letter: "P", category: "specialty", priceOneVial: 45, priceTenVialBox: 450 },
    { id: "pnc27-10mg-vial", name: "PNC27", nameNormalized: "pnc27", strength: "10mg/vial", format: "Lyophilized vial", letter: "P", category: "specialty", priceOneVial: 80, priceTenVialBox: 800 },
    { id: "pt-141-10mg-vial", name: "PT-141", nameNormalized: "pt-141", strength: "10mg/vial", format: "Lyophilized vial", letter: "P", category: "specialty", priceOneVial: 25, priceTenVialBox: 250 },
    { id: "retatrutide-5mg-vial", name: "Retatrutide", nameNormalized: "retatrutide", strength: "5mg/vial", format: "Lyophilized vial", letter: "R", category: "glp1", priceOneVial: 26, priceTenVialBox: 260 },
    { id: "retatrutide-10mg-vial", name: "Retatrutide", nameNormalized: "retatrutide", strength: "10mg/vial", format: "Lyophilized vial", letter: "R", category: "glp1", priceOneVial: 29, priceTenVialBox: 290 },
    { id: "retatrutide-15mg-vial", name: "Retatrutide", nameNormalized: "retatrutide", strength: "15mg/vial", format: "Lyophilized vial", letter: "R", category: "glp1", priceOneVial: 33, priceTenVialBox: 330 },
    { id: "retatrutide-20mg-vial", name: "Retatrutide", nameNormalized: "retatrutide", strength: "20mg/vial", format: "Lyophilized vial", letter: "R", category: "glp1", priceOneVial: 38, priceTenVialBox: 380 },
    { id: "retatrutide-30mg-vial", name: "Retatrutide", nameNormalized: "retatrutide", strength: "30mg/vial", format: "Lyophilized vial", letter: "R", category: "glp1", priceOneVial: 48, priceTenVialBox: 480 },
    { id: "retatrutide-50mg-vial", name: "Retatrutide", nameNormalized: "retatrutide", strength: "50mg/vial", format: "Lyophilized vial", letter: "R", category: "glp1", priceOneVial: 73, priceTenVialBox: 730 },
    { id: "retatrutide-60mg-vial", name: "Retatrutide", nameNormalized: "retatrutide", strength: "60mg/vial", format: "Lyophilized vial", letter: "R", category: "glp1", priceOneVial: 90, priceTenVialBox: 900 },
    { id: "selank-5mg-vial", name: "Selank", nameNormalized: "selank", strength: "5mg/vial", format: "Lyophilized vial", letter: "S", category: "cognitive", priceOneVial: 15, priceTenVialBox: 150 },
    { id: "selank-10mg-vial", name: "Selank", nameNormalized: "selank", strength: "10mg/vial", format: "Lyophilized vial", letter: "S", category: "cognitive", priceOneVial: 23, priceTenVialBox: 230 },
    { id: "semaglutide-2mg-vial", name: "Semaglutide", nameNormalized: "semaglutide", strength: "2mg/vial", format: "Lyophilized vial", letter: "S", category: "glp1", priceOneVial: 19, priceTenVialBox: 190 },
    { id: "semaglutide-5mg-vial", name: "Semaglutide", nameNormalized: "semaglutide", strength: "5mg/vial", format: "Lyophilized vial", letter: "S", category: "glp1", priceOneVial: 20, priceTenVialBox: 200 },
    { id: "semaglutide-10mg-vial", name: "Semaglutide", nameNormalized: "semaglutide", strength: "10mg/vial", format: "Lyophilized vial", letter: "S", category: "glp1", priceOneVial: 23, priceTenVialBox: 230 },
    { id: "semaglutide-15mg-vial", name: "Semaglutide", nameNormalized: "semaglutide", strength: "15mg/vial", format: "Lyophilized vial", letter: "S", category: "glp1", priceOneVial: 28, priceTenVialBox: 280 },
    { id: "semaglutide-20mg-vial", name: "Semaglutide", nameNormalized: "semaglutide", strength: "20mg/vial", format: "Lyophilized vial", letter: "S", category: "glp1", priceOneVial: 34, priceTenVialBox: 340 },
    { id: "semaglutide-30mg-vial", name: "Semaglutide", nameNormalized: "semaglutide", strength: "30mg/vial", format: "Lyophilized vial", letter: "S", category: "glp1", priceOneVial: 44, priceTenVialBox: 440 },
    { id: "semaglutide-40mg-vial", name: "Semaglutide", nameNormalized: "semaglutide", strength: "40mg/vial", format: "Lyophilized vial", letter: "S", category: "glp1", priceOneVial: 55, priceTenVialBox: 550 },
    { id: "semaglutide-50mg-vial", name: "Semaglutide", nameNormalized: "semaglutide", strength: "50mg/vial", format: "Lyophilized vial", letter: "S", category: "glp1", priceOneVial: 68, priceTenVialBox: 680 },
    { id: "semax-5mg-vial", name: "Semax", nameNormalized: "semax", strength: "5mg/vial", format: "Lyophilized vial", letter: "S", category: "cognitive", priceOneVial: 15, priceTenVialBox: 150 },
    { id: "semax-10mg-vial", name: "Semax", nameNormalized: "semax", strength: "10mg/vial", format: "Lyophilized vial", letter: "S", category: "cognitive", priceOneVial: 23, priceTenVialBox: 230 },
    { id: "sermorelin-acetate-2mg-vial", name: "Sermorelin Acetate", nameNormalized: "sermorelin-acetate", strength: "2mg/vial", format: "Lyophilized vial", letter: "S", category: "growth", priceOneVial: 17, priceTenVialBox: 170 },
    { id: "sermorelin-acetate-5mg-vial", name: "Sermorelin Acetate", nameNormalized: "sermorelin-acetate", strength: "5mg/vial", format: "Lyophilized vial", letter: "S", category: "growth", priceOneVial: 35, priceTenVialBox: 350 },
    { id: "sermorelin-acetate-10mg-vial", name: "Sermorelin Acetate", nameNormalized: "sermorelin-acetate", strength: "10mg/vial", format: "Lyophilized vial", letter: "S", category: "growth", priceOneVial: 50, priceTenVialBox: 500 },
    { id: "snap-8-10mg-vial", name: "SNAP-8", nameNormalized: "snap-8", strength: "10mg/vial", format: "Lyophilized vial", letter: "S", category: "specialty", priceOneVial: 22, priceTenVialBox: 220 },
    { id: "ss-31-10mg-vial", name: "SS-31", nameNormalized: "ss-31", strength: "10mg/vial", format: "Lyophilized vial", letter: "S", category: "longevity", priceOneVial: 32, priceTenVialBox: 320 },
    { id: "ss-31-50mg-vial", name: "SS-31", nameNormalized: "ss-31", strength: "50mg/vial", format: "Lyophilized vial", letter: "S", category: "longevity", priceOneVial: 124, priceTenVialBox: 1240 },
    { id: "survodutide-10mg-vial", name: "Survodutide", nameNormalized: "survodutide", strength: "10mg/vial", format: "Lyophilized vial", letter: "S", category: "glp1", priceOneVial: 125, priceTenVialBox: 1250 },
    { id: "tb500-2mg-vial", name: "TB500", nameNormalized: "tb500", strength: "2mg/vial", format: "Lyophilized vial", letter: "T", category: "recovery", priceOneVial: 19, priceTenVialBox: 190 },
    { id: "tb500-5mg-vial", name: "TB500", nameNormalized: "tb500", strength: "5mg/vial", format: "Lyophilized vial", letter: "T", category: "recovery", priceOneVial: 32, priceTenVialBox: 320 },
    { id: "tb500-10mg-vial", name: "TB500", nameNormalized: "tb500", strength: "10mg/vial", format: "Lyophilized vial", letter: "T", category: "recovery", priceOneVial: 60, priceTenVialBox: 600 },
    { id: "tesamorelin-2mg-vial", name: "Tesamorelin", nameNormalized: "tesamorelin", strength: "2mg/vial", format: "Lyophilized vial", letter: "T", category: "growth", priceOneVial: 25, priceTenVialBox: 250 },
    { id: "tesamorelin-5mg-vial", name: "Tesamorelin", nameNormalized: "tesamorelin", strength: "5mg/vial", format: "Lyophilized vial", letter: "T", category: "growth", priceOneVial: 38, priceTenVialBox: 380 },
    { id: "tesamorelin-10mg-vial", name: "Tesamorelin", nameNormalized: "tesamorelin", strength: "10mg/vial", format: "Lyophilized vial", letter: "T", category: "growth", priceOneVial: 58, priceTenVialBox: 580 },
    { id: "tesamorelin-20mg-vial", name: "Tesamorelin", nameNormalized: "tesamorelin", strength: "20mg/vial", format: "Lyophilized vial", letter: "T", category: "growth", priceOneVial: 115, priceTenVialBox: 1150 },
    { id: "thymalin-10mg-vial", name: "Thymalin", nameNormalized: "thymalin", strength: "10mg/vial", format: "Lyophilized vial", letter: "T", category: "recovery", priceOneVial: 27, priceTenVialBox: 270 },
    { id: "thymosin-alpha-1-2mg-vial", name: "Thymosin Alpha-1", nameNormalized: "thymosin-alpha-1", strength: "2mg/vial", format: "Lyophilized vial", letter: "T", category: "recovery", priceOneVial: 28, priceTenVialBox: 280 },
    { id: "thymosin-alpha-1-5mg-vial", name: "Thymosin Alpha-1", nameNormalized: "thymosin-alpha-1", strength: "5mg/vial", format: "Lyophilized vial", letter: "T", category: "recovery", priceOneVial: 45, priceTenVialBox: 450 },
    { id: "thymosin-alpha-1-10mg-vial", name: "Thymosin Alpha-1", nameNormalized: "thymosin-alpha-1", strength: "10mg/vial", format: "Lyophilized vial", letter: "T", category: "recovery", priceOneVial: 78, priceTenVialBox: 780 },
    { id: "tirzepatide-5mg-vial", name: "Tirzepatide", nameNormalized: "tirzepatide", strength: "5mg/vial", format: "Lyophilized vial", letter: "T", category: "glp1", priceOneVial: 20, priceTenVialBox: 200 },
    { id: "tirzepatide-10mg-vial", name: "Tirzepatide", nameNormalized: "tirzepatide", strength: "10mg/vial", format: "Lyophilized vial", letter: "T", category: "glp1", priceOneVial: 23, priceTenVialBox: 230 },
    { id: "tirzepatide-15mg-vial", name: "Tirzepatide", nameNormalized: "tirzepatide", strength: "15mg/vial", format: "Lyophilized vial", letter: "T", category: "glp1", priceOneVial: 28, priceTenVialBox: 280 },
    { id: "tirzepatide-20mg-vial", name: "Tirzepatide", nameNormalized: "tirzepatide", strength: "20mg/vial", format: "Lyophilized vial", letter: "T", category: "glp1", priceOneVial: 34, priceTenVialBox: 340 },
    { id: "tirzepatide-30mg-vial", name: "Tirzepatide", nameNormalized: "tirzepatide", strength: "30mg/vial", format: "Lyophilized vial", letter: "T", category: "glp1", priceOneVial: 44, priceTenVialBox: 440 },
    { id: "tirzepatide-40mg-vial", name: "Tirzepatide", nameNormalized: "tirzepatide", strength: "40mg/vial", format: "Lyophilized vial", letter: "T", category: "glp1", priceOneVial: 55, priceTenVialBox: 550 },
    { id: "tirzepatide-50mg-vial", name: "Tirzepatide", nameNormalized: "tirzepatide", strength: "50mg/vial", format: "Lyophilized vial", letter: "T", category: "glp1", priceOneVial: 61, priceTenVialBox: 610 },
    { id: "tirzepatide-60mg-vial", name: "Tirzepatide", nameNormalized: "tirzepatide", strength: "60mg/vial", format: "Lyophilized vial", letter: "T", category: "glp1", priceOneVial: 68, priceTenVialBox: 680 },
    { id: "tirzepatide-100mg-vial", name: "Tirzepatide", nameNormalized: "tirzepatide", strength: "100mg/vial", format: "Lyophilized vial", letter: "T", category: "glp1", priceOneVial: 68, priceTenVialBox: 680 },
    { id: "vip-5mg-vial", name: "VIP", nameNormalized: "vip", strength: "5mg/vial", format: "Lyophilized vial", letter: "V", category: "specialty", priceOneVial: 40, priceTenVialBox: 400 },
    { id: "vip-10mg-vial", name: "VIP", nameNormalized: "vip", strength: "10mg/vial", format: "Lyophilized vial", letter: "V", category: "specialty", priceOneVial: 73, priceTenVialBox: 730 }
  ];

  // ----- Helpers -----------------------------------------------------------
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
  function findRelatedStrengths(p) {
    if (!p) return [];
    return PRODUCTS.filter(function (x) {
      return x.nameNormalized === p.nameNormalized && x.id !== p.id;
    });
  }
  function formatPrice(n) {
    if (typeof n !== "number" || isNaN(n)) return "Request pricing";
    return "$" + n.toLocaleString("en-US");
  }
  // Numeric strength sort helper. Pulls the first numeric value out of the
  // strength label so 2mg < 10mg < 50mg etc.
  function strengthValue(s) {
    var m = String(s || "").match(/([0-9]*\.?[0-9]+)\s*(mcg|mg|iu|ml|g)?/i);
    if (!m) return 0;
    var n = parseFloat(m[1]);
    var u = (m[2] || "mg").toLowerCase();
    if (u === "mcg") n = n / 1000;     // normalize to mg
    if (u === "g")   n = n * 1000;
    return n;
  }

  global.BB_CATALOG = {
    categories: CATEGORIES,
    products: PRODUCTS,
    customLabelNote: CUSTOM_LABEL_NOTE,
    availabilityNote: AVAILABILITY_NOTE,
    disclaimerNote: DISCLAIMER_NOTE,
    categoryLabel: categoryLabel,
    categoryShort: categoryShort,
    findProduct: findProduct,
    findRelatedStrengths: findRelatedStrengths,
    formatPrice: formatPrice,
    strengthValue: strengthValue
  };
})(window);
