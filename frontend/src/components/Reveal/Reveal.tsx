import type { CSSProperties, ReactNode } from "react";
import { useReveal } from "../../hooks/useReveal";

export type RevealDirection = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: ReactNode;
  /** Delay em ms — útil para escalonar elementos em sequência */
  delay?: number;
  className?: string;
  /** De onde o elemento vem ao aparecer (padrão: "up" = sobe de baixo) */
  direction?: RevealDirection;
  /** Distância do deslocamento em px (padrão 24) */
  distance?: number;
  /** Começa um pouco menor e cresce até o tamanho final */
  scale?: boolean;
}

function offsets(direction: RevealDirection, distance: number) {
  switch (direction) {
    case "up":
      return { x: 0, y: distance };
    case "down":
      return { x: 0, y: -distance };
    case "left":
      return { x: distance, y: 0 }; // vem da direita, indo para a esquerda
    case "right":
      return { x: -distance, y: 0 };
    default:
      return { x: 0, y: 0 };
  }
}

export function Reveal({
  children,
  delay = 0,
  className = "",
  direction = "up",
  distance = 24,
  scale = false,
}: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const { x, y } = offsets(direction, distance);

  const style = {
    "--reveal-x": `${x}px`,
    "--reveal-y": `${y}px`,
    "--reveal-s": scale ? 0.94 : 1,
    ...(delay ? { transitionDelay: `${delay}ms` } : null),
  } as CSSProperties;

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal--visible" : ""} ${className}`.trim()}
      style={style}
    >
      {children}
    </div>
  );
}
