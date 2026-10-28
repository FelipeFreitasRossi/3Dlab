import { useEffect, useRef } from "react";

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

/**
 * Escreve duas variáveis CSS no elemento da seção:
 *   --sp      → posição da seção em relação ao centro da tela (-1 a 1)
 *               (1 = entrando por baixo, 0 = no centro, -1 = saindo por cima)
 *   --sp-abs  → o mesmo valor, sem sinal (0 a 1)
 * Nada de useState: só CSS variables, em 1 rAF por frame, e SÓ enquanto
 * a seção está perto da tela (IntersectionObserver). Sem custo fora dela.
 * Enquanto está ativo, coloca data-fx-active="true" (o CSS usa para will-change).
 */
export function useSectionFx<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let rafId = 0;
    let active = false;

    const update = () => {
      rafId = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const center = rect.top + rect.height / 2;
      const range = vh / 2 + rect.height / 2;
      const p = clamp((center - vh / 2) / range, -1, 1);
      el.style.setProperty("--sp", p.toFixed(3));
      el.style.setProperty("--sp-abs", Math.abs(p).toFixed(3));
    };

    const schedule = () => {
      if (!rafId) rafId = requestAnimationFrame(update);
    };

    const start = () => {
      if (active) return;
      active = true;
      el.dataset.fxActive = "true";
      update();
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
    };

    const stop = () => {
      if (!active) return;
      active = false;
      delete el.dataset.fxActive;
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
    };

    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { rootMargin: "15% 0px 15% 0px" },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      stop();
    };
  }, []);

  return ref;
}

/**
 * Para o Hero: escreve --hero-p (0 no topo → 1 depois de rolar a altura do Hero).
 * Usado no "skew on scroll" e no fade do conteúdo.
 */
export function useHeroFx<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let rafId = 0;
    let active = false;

    const update = () => {
      rafId = 0;
      const p = clamp(window.scrollY / Math.max(el.offsetHeight, 1), 0, 1);
      el.style.setProperty("--hero-p", p.toFixed(3));
    };

    const schedule = () => {
      if (!rafId) rafId = requestAnimationFrame(update);
    };

    const start = () => {
      if (active) return;
      active = true;
      el.dataset.fxActive = "true";
      update();
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
    };

    const stop = () => {
      if (!active) return;
      active = false;
      delete el.dataset.fxActive;
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
    };

    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { rootMargin: "0px" },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      stop();
    };
  }, []);

  return ref;
}
