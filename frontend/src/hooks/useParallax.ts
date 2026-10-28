import { useEffect, useRef } from "react";

/**
 * Aplica parallax vertical a um elemento com base no scroll.
 * @param speed Fator de deslocamento. 0.1 = bem sutil; 0.4 = evidente.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(speed = 0.2) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rafId = 0;
    let lastY = 0;

    const update = () => {
      const y = window.scrollY * speed;
      el.style.transform = `translate3d(0, ${y}px, 0)`;
      rafId = 0;
    };

    const onScroll = () => {
      lastY = window.scrollY;
      if (!rafId) rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [speed]);

  return ref;
}