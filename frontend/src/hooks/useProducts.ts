import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { fetchProducts } from "../services/api";
import { PRODUCTS as LOCAL_PRODUCTS } from "../data/products";

type Source = "api" | "local";

interface UseProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  source: Source;
}

/**
 * Busca os produtos da API. Se a API falhar, cai para os dados locais
 * (marcando `source: "local"` para que a UI possa avisar discretamente).
 */
export function useProducts(): UseProductsState {
  const [state, setState] = useState<UseProductsState>({
    products: [],
    loading: true,
    error: null,
    source: "api",
  });

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    (async () => {
      try {
        const products = await fetchProducts(controller.signal);
        if (cancelled) return;
        setState({ products, loading: false, error: null, source: "api" });
      } catch (err) {
        if (cancelled) return;
        const message =
          err instanceof Error ? err.message : "Falha ao carregar produtos";
        console.warn(
          "[useProducts] API indisponível, usando dados locais:",
          message,
        );
        setState({
          products: LOCAL_PRODUCTS,
          loading: false,
          error: message,
          source: "local",
        });
      }
    })();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  return state;
}