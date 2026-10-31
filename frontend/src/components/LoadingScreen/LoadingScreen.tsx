import { useEffect, useRef, useState } from "react";
import { usePreferences } from "../../context/usePreferences";
import styles from "./LoadingScreen.module.css";

interface LoadingScreenProps {
  onComplete?: () => void;
}

const MIN_DURATION = 900;
const FADE_DURATION = 400;
const SAFETY_TIMEOUT = 4000;

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const { t } = usePreferences();
  const [leaving, setLeaving] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const completedRef = useRef(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const finish = () => {
      if (completedRef.current) return;
      completedRef.current = true;
      document.body.style.overflow = "";
      if (rootRef.current) {
        rootRef.current.style.display = "none";
        rootRef.current.style.pointerEvents = "none";
      }
      onComplete?.();
    };

    const fadeTimer = window.setTimeout(() => {
      setLeaving(true);
      window.setTimeout(finish, FADE_DURATION);
    }, MIN_DURATION);

    const safetyTimer = window.setTimeout(finish, SAFETY_TIMEOUT);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(safetyTimer);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <div
      ref={rootRef}
      className={`${styles.root} ${leaving ? styles.leaving : ""}`}
      style={{ pointerEvents: leaving ? "none" : "auto" }}
    >
      <div className={styles.center}>
        <img
          src="/logo.jpg"
          alt=""
          className={styles.logo}
          width={72}
          height={72}
        />
        <p className={styles.text}>{t("loading.message")}</p>
        <div className={styles.progress} aria-hidden="true">
          <span className={styles.progressBar} />
        </div>
      </div>
    </div>
  );
}