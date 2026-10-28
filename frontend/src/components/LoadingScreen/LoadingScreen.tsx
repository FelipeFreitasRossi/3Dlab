import { useEffect, useRef, useState } from "react";
import { usePreferences } from "../../context/usePreferences";
import styles from "./LoadingScreen.module.css";

interface LoadingScreenProps {
  /** Tempo mínimo na tela, em ms (mesmo que tudo carregue rápido). */
  minDuration?: number;
  /** Chamado quando a animação de saída COMEÇA (libera o scroll e as animações do site). */
  onExitStart?: () => void;
  /** Chamado quando a animação de saída TERMINA (o App pode remover o componente). */
  onDone: () => void;
}

const EXIT_MS = 700;

export function LoadingScreen({
  minDuration = 900,
  onExitStart,
  onDone,
}: LoadingScreenProps) {
  const { t } = usePreferences();
  const [exiting, setExiting] = useState(false);

  // Guardamos as funções em refs para o timer não reiniciar se o pai re-renderizar
  const exitStartRef = useRef(onExitStart);
  const doneRef = useRef(onDone);
  useEffect(() => {
    exitStartRef.current = onExitStart;
    doneRef.current = onDone;
  });

  useEffect(() => {
    let doneTimer = 0;
    const exitTimer = window.setTimeout(() => {
      setExiting(true);
      exitStartRef.current?.();
      doneTimer = window.setTimeout(() => doneRef.current(), EXIT_MS);
    }, minDuration);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
    };
  }, [minDuration]);

  return (
    <div
      className={`${styles.overlay} ${exiting ? styles.exiting : ""}`}
      role="status"
      aria-live="polite"
      aria-label={t("loading.label")}
    >
      <div className={styles.grid} aria-hidden="true" />

      <div className={styles.center} aria-hidden="true">
        <div className={styles.moon}>
          <span className={styles.moonCore} />
          <span className={styles.moonRing} />
          <span className={`${styles.moonRing} ${styles.moonRingDelayed}`} />
        </div>

        <p className={styles.brand}>
          <span className={styles.brandName}>PEDRA LUNAR</span>
          <span className={styles.brandTag}>3D LAB</span>
        </p>

        <div className={styles.bar}>
          <span className={styles.barFill} />
        </div>
      </div>
    </div>
  );
}
