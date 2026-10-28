import { useEffect, useRef } from "react";
import { usePreferences } from "../../context/usePreferences";

interface CounterProps {
  /** Valor final */
  to: number;
  prefix?: string;
  suffix?: string;
  /** Duração da contagem em ms */
  duration?: number;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Número que "sobe" de 0 até `to` quando entra na tela.
 * Atualiza o texto direto no DOM (sem useState a cada frame).
 */
export function Counter({
  to,
  prefix = "",
  suffix = "",
  duration = 1600,
}: CounterProps) {
  const { language } = usePreferences();
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const format = (n: number) =>
      `${prefix}${Math.round(n).toLocaleString(language)}${suffix}`;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = format(to);
      return;
    }

    el.textContent = format(0);
    let rafId = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / duration);
          el.textContent = format(to * easeOutCubic(progress));
          if (progress < 1) rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [to, prefix, suffix, duration, language]);

  return <span ref={ref}>{`${prefix}${to.toLocaleString(language)}${suffix}`}</span>;
}
