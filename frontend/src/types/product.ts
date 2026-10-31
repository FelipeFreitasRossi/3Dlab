export const PRODUCT_CATEGORIES = [
  { id: "decoracao", label: "Decoração" },
  { id: "utilidades", label: "Utilidades" },
  { id: "personalizados", label: "Personalizados" },
  { id: "prototipos", label: "Protótipos" },
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number]["id"];

export type CategoryFilter = ProductCategory | "todos";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  shortDescription: string;
  longDescription?: string;
  features?: string[];
  price: number;
  badge?: string;
  image?: string;
  images?: string[];
  accent: string;
  leadTimeDays: number;

  // Tradução em inglês (opcional)
  name_en?: string;
  shortDescription_en?: string;
  longDescription_en?: string;
  features_en?: string[];
  badge_en?: string;
}