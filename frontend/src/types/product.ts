// ============================================================
// Categorias do catálogo.
// "todos" é apenas um filtro de UI — não é uma categoria de produto.
// ============================================================
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
  /** Descrição estendida exibida no modal. Cai para shortDescription se ausente. */
  longDescription?: string;
  /** Lista de características exibida no modal (ex.: dimensões, material). */
  features?: string[];
  /** Preço em reais. ⚠️ DEMONSTRATIVO até o cliente enviar os valores reais. */
  price: number;
  /** Selo opcional exibido no card (ex.: "Novo", "Mais vendido"). */
  badge?: string;
  /** Imagem principal (usada no card). Se ausente, usamos placeholder gerado. */
  image?: string;
  /**
   * Galeria de imagens exibida no modal.
   * Se ausente, o modal usa `image` como única imagem (sem miniaturas).
   */
  images?: string[];
  /** Cor de acento do placeholder (rgba). Ignorado se houver imagem. */
  accent: string;
  /** Prazo estimado em dias úteis. ⚠️ DEMONSTRATIVO. */
  leadTimeDays: number;
}