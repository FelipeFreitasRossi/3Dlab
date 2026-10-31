import { DEMO_TRANSLATIONS_EN } from "../data/productsEn";
import type { Product } from "../types/product";
import type { Language } from "./translations";

/** Texto vazio ou só espaços conta como "sem tradução". */
function pick(value: string | null | undefined): string | undefined {
  return value && value.trim() ? value : undefined;
}

function pickList(value: string[] | null | undefined): string[] | undefined {
  const list = value?.filter((item) => item && item.trim());
  return list && list.length > 0 ? list : undefined;
}

/**
 * Devolve o produto no idioma escolhido.
 * - pt-BR: o produto como veio (os campos principais são em português).
 * - en-US: usa os campos *_en; o que estiver vazio continua em português
 *   (melhor um texto em PT do que um espaço em branco).
 * Para os produtos demo (fallback local) usa o dicionário em data/productsEn.ts.
 */
export function localizeProduct(product: Product, language: Language): Product {
  if (language !== "en-US") return product;

  const demo = DEMO_TRANSLATIONS_EN[product.id];

  return {
    ...product,
    name: pick(product.name_en) ?? pick(demo?.name_en) ?? product.name,
    shortDescription:
      pick(product.shortDescription_en) ??
      pick(demo?.shortDescription_en) ??
      product.shortDescription,
    longDescription:
      pick(product.longDescription_en) ??
      pick(demo?.longDescription_en) ??
      product.longDescription,
    features:
      pickList(product.features_en) ??
      pickList(demo?.features_en) ??
      product.features,
    badge: pick(product.badge_en) ?? pick(demo?.badge_en) ?? product.badge,
  };
}
