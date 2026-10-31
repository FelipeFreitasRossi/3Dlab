import type { Product } from "../types/product";

/**
 * Traduções em inglês dos 8 produtos DEMO (fallback local).
 * Produtos cadastrados no /admin trazem suas próprias traduções
 * (campos name_en, shortDescription_en...) vindas da API.
 */
export type ProductTranslation = Pick<
  Product,
  "name_en" | "shortDescription_en" | "longDescription_en" | "features_en" | "badge_en"
>;

export const DEMO_TRANSLATIONS_EN: Record<string, ProductTranslation> = {
  "vaso-orbita": {
    name_en: "Orbit Vase",
    shortDescription_en:
      "Geometric vase with a faceted surface. Printed in fine layers for a matte finish.",
    longDescription_en:
      "The Orbit Vase starts from a faceted mesh calculated to reflect light unevenly. Printing in 0.12 mm layers gives it a matte finish that hides print lines and highlights the edges. Ideal for small plants, dried arrangements or as a standalone sculptural piece.",
    features_en: [
      "Height: 22 cm · Diameter: 12 cm",
      "PLA print with matte finish",
      "Protective felt base",
      "Available in black, graphite and soft white",
    ],
    badge_en: "New",
  },
  "luminaria-cratera": {
    name_en: "Crater Lamp",
    shortDescription_en:
      "Indirect light with a translucent diffuser. Fits bedside tables and shelves.",
    longDescription_en:
      "Translucent diffuser printed in PETG, with an inner structure that spreads light evenly. Comes with an E27 socket and a 1.5 m fabric cable. Ideal as accent lighting on bedside tables, bookshelves and reading corners.",
    features_en: [
      "Height: 18 cm · Diameter: 14 cm",
      "Translucent PETG diffuser",
      "E27 socket (bulb not included)",
      "1.5 m fabric cable with switch",
    ],
  },
  "organizador-mesa": {
    name_en: "Desk Organizer",
    shortDescription_en:
      "Modular compartments for pens, clips and cards. Non-slip base.",
    longDescription_en:
      "Three independent modules that snap together magnetically, so you can rearrange the layout as your desk changes. The base has non-slip adhesive along its full length so it won't slide with use.",
    features_en: [
      "Overall size: 18 × 10 × 8 cm",
      "3 modules with magnetic fit",
      "Non-slip base along its full length",
      "Matte PLA print (black or white)",
    ],
    badge_en: "Best seller",
  },
  "suporte-headset": {
    name_en: "Headset Stand",
    shortDescription_en:
      "Stable base with universal fit. Keeps the headset off the desk and protected.",
    longDescription_en:
      "Arc-shaped structure with an internal counterweight, stable enough for large headsets without tipping over. The top is covered with adhesive foam to protect the headband cushion and prevent marks.",
    features_en: [
      "Height: 26 cm · Base: 12 × 12 cm",
      "Internal counterweight for stability",
      "Top with protective foam",
      "Compatible with large headsets",
    ],
  },
  "chaveiro-personalizado": {
    name_en: "Custom Keychain",
    shortDescription_en:
      "Name, initials or logo. Choose shape, color and finish — made to order.",
    longDescription_en:
      "You send the name, initials or logo as a file, and we adapt it to the keychain shape (round, rectangular or hexagonal). Made in high-strength PLA, with a metal ring included. Ideal for gifts, giveaways and key identification.",
    features_en: [
      "Shapes: round, rectangular or hexagonal",
      "Up to 12 characters or 1 simple logo",
      "Metal ring included",
      "Choice of base color and accent color",
    ],
  },
  "porta-caneta-geo": {
    name_en: "Geometric Pen Holder",
    shortDescription_en:
      "Angular design with a firm base. Available in black, white and graphite.",
    longDescription_en:
      "Angular body weighted at the base so it won't tip when you pull out a pen. The faceted geometry reflects light unevenly, creating shadows that highlight the shape. Holds up to 20 pens or medium brushes.",
    features_en: [
      "Height: 11 cm · Diameter: 9 cm",
      "Holds up to 20 pens",
      "Weighted base — won't tip over",
      "Three colors available",
    ],
  },
  "escultura-fase-lunar": {
    name_en: "Lunar Phase Sculpture",
    shortDescription_en:
      "Tabletop piece with a texture inspired by lunar craters. Limited edition.",
    longDescription_en:
      "The surface texture reproduces a real topographic map of the Moon, adapted for FDM printing. Each unit is sanded and sealed by hand, resulting in small variations between pieces — which makes every sculpture unique within the limited edition.",
    features_en: [
      "Height: 15 cm · Width: 15 cm",
      "Lunar topographic texture",
      "Hand-sanded and sealed finish",
      "Numbered limited edition",
    ],
  },
  "prototipo-sob-medida": {
    name_en: "Custom Prototype",
    shortDescription_en:
      "From 3D file to physical part. Ideal for validating fits, shapes and function.",
    longDescription_en:
      "Send your model in STL, STEP, OBJ or 3MF. We assess printability, suggest thickness and orientation tweaks, and produce the prototype with an agreed tolerance. Ideal for validating fits, ergonomics and function before investing in final production.",
    features_en: [
      "Accepts STL, STEP, OBJ and 3MF",
      "Technical review included before printing",
      "Dimensional tolerance agreed case by case",
      "One adjustment round after prototype delivery",
    ],
    badge_en: "On request",
  },
};
