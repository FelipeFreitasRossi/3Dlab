import { useId } from "react";

interface BrandIconProps {
  size?: number;
  className?: string;
  /** true = gradiente característico da marca; false (padrão) = contorno em currentColor */
  colored?: boolean;
}

export function InstagramIcon({
  size = 20,
  className,
  colored = false,
}: BrandIconProps) {
  const gradientId = useId();

  if (!colored) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
        focusable="false"
      >
        <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient
          id={gradientId}
          cx="0.3"
          cy="1.05"
          r="1.25"
          fx="0.3"
          fy="1.05"
        >
          <stop offset="0" stopColor="#FFD879" />
          <stop offset="0.25" stopColor="#FA8F21" />
          <stop offset="0.5" stopColor="#D82D7E" />
          <stop offset="0.75" stopColor="#8C3AAA" />
          <stop offset="1" stopColor="#515BD4" />
        </radialGradient>
      </defs>
      <rect x="1" y="1" width="22" height="22" rx="6.2" fill={`url(#${gradientId})`} />
      <rect
        x="4.6"
        y="4.6"
        width="14.8"
        height="14.8"
        rx="4.3"
        fill="none"
        stroke="#fff"
        strokeWidth="1.7"
      />
      <circle cx="12" cy="12" r="3.5" fill="none" stroke="#fff" strokeWidth="1.7" />
      <circle cx="16.4" cy="7.6" r="1" fill="#fff" />
    </svg>
  );
}
