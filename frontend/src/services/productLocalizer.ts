import type { Product } from "../types/product";
import type { Language } from "../i18n/translations";

/**
 * Retorna o produto com os campos do idioma atual.
 * Se o campo EN estiver vazio, usa PT (fallback).
 * Não faz chamada de rede — os campos já vêm do backend.
 */
export function localizeProduct(
  product: Product,
  language: Language,
): Product {
  if (language !== "en-US") return product;

  return {
    ...product,
    name: product.name_en || product.name,
    shortDescription: product.shortDescription_en || product.shortDescription,
    longDescription: product.longDescription_en || product.longDescription,
    features: product.features_en?.length ? product.features_en : product.features,
    badge: product.badge_en || product.badge,
  };
}