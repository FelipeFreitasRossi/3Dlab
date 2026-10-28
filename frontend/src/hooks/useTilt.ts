import { useEffect, useRef } from "react";

/**
 * Tilt 3D sutil seguindo o mouse. Escreve --rx e --ry (em graus) no elemento;
 * o CSS aplica rotateX/rotateY. Sem useState. Só para mouse (não toca no touch)
 * e desligado com prefers-reduced-motion.
 * @param maxDeg inclinação máxima em graus (padrão 6)
 */
export function useTilt<T extends HTMLElement = HTMLElement>(maxDeg = 6) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }

    let rafId = 0;
    let nextX = 0;
    let nextY = 0;

    const apply = () => {
      rafId = 0;
      el.style.setProperty("--rx", `${nextY.toFixed(2)}deg`);
      el.style.setProperty("--ry", `${nextX.toFixed(2)}deg`);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 a 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      nextX = px * maxDeg * 2;
      nextY = -py * maxDeg * 2;
      if (!rafId) rafId = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      nextX = 0;
      nextY = 0;
      if (!rafId) rafId = requestAnimationFrame(apply);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [maxDeg]);

  return ref;
}
