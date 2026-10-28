import { useParallax } from "../../hooks/useParallax";
import { useScrollProgress } from "../../hooks/useScrollProgress";
import styles from "./BackgroundFX.module.css";

export function BackgroundFX() {
  useScrollProgress();

  // Camadas de parallax com velocidades e direções diferentes
  const orbARef = useParallax<HTMLDivElement>(0.10);
  const orbBRef = useParallax<HTMLDivElement>(-0.06);
  const orbCRef = useParallax<HTMLDivElement>(0.14);
  const orbDRef = useParallax<HTMLDivElement>(-0.10);
  const orbERef = useParallax<HTMLDivElement>(0.05);

  return (
    <div className={styles.root} aria-hidden="true">
      {/* Aurora cônica rotativa — reage ao progresso de scroll via CSS */}
      <div className={styles.aurora} />

      {/* Camada de grade que gira suavemente com o scroll */}
      <div className={styles.gridRotator} />

      {/* Orbs com parallax + shift de matiz por scroll */}
      <div ref={orbARef} className={`${styles.orb} ${styles.orbA}`} />
      <div ref={orbBRef} className={`${styles.orb} ${styles.orbB}`} />
      <div ref={orbCRef} className={`${styles.orb} ${styles.orbC}`} />
      <div ref={orbDRef} className={`${styles.orb} ${styles.orbD}`} />
      <div ref={orbERef} className={`${styles.orb} ${styles.orbE}`} />
    </div>
  );
}