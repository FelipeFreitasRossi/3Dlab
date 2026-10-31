import { useEffect, useState } from "react";
import type { ApiTestimonial } from "../types/testimonial";
import { fetchTestimonials } from "../services/api";

interface State {
  items: ApiTestimonial[] | null;
  loading: boolean;
}

/**
 * Busca os depoimentos cadastrados no painel admin.
 * Se a API falhar, devolve lista vazia (o componente usa os textos padrão).
 */
export function useTestimonials(): State {
  const [state, setState] = useState<State>({ items: null, loading: true });

  useEffect(() => {
    const controller = new AbortController();

    fetchTestimonials(controller.signal)
      .then((items) => setState({ items, loading: false }))
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        console.warn("[useTestimonials] API indisponível, usando padrão:", err);
        setState({ items: [], loading: false });
      });

    return () => controller.abort();
  }, []);

  return state;
}
