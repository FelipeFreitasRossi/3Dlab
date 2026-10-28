import { useEffect, useState } from "react";
import { PRODUCTS } from "../data/products";
import { fetchProducts, hasApi } from "../services/api";
import type { Product } from "../types/product";

const API_TIMEOUT_MS = 6000;

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: Error | null;
  /** true quando estamos mostrando os dados locais (sem API ou API falhou) */
  usingFallback: boolean;
}

/**
 * Busca os produtos na API. Se a API não existir ou falhar,
 * usa os dados locais — a tela nunca quebra.
 */
export function useProducts(): UseProductsResult {
  const [state, setState] = useState<UseProductsResult>({
    products: hasApi ? [] : PRODUCTS,
    loading: hasApi,
    error: null,
    usingFallback: !hasApi,
  });

  useEffect(() => {
    if (!hasApi) return;

    let cancelled = false;
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), API_TIMEOUT_MS);

    fetchProducts(controller.signal)
      .then((products) => {
        if (cancelled) return;
        setState({ products, loading: false, error: null, usingFallback: false });
      })
      .catch((err: unknown) => {
        if (cancelled) return; // efeito foi desmontado: ignora
        const error = err instanceof Error ? err : new Error(String(err));
        console.warn("[Pedra Lunar] API indisponível, usando dados locais:", error.message);
        setState({ products: PRODUCTS, loading: false, error, usingFallback: true });
      })
      .finally(() => window.clearTimeout(timer));

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      controller.abort();
    };
  }, []);

  return state;
}
