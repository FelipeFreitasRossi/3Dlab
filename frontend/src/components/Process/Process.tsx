import { usePreferences } from "../../context/usePreferences";
import { useSectionFx } from "../../hooks/useSectionFx";
import { Reveal } from "../Reveal/Reveal";
import type { RevealDirection } from "../Reveal/Reveal";
import styles from "./Process.module.css";

// Cada etapa entra de um lado: esquerda → de baixo → direita
const DIRECTIONS: RevealDirection[] = ["right", "up", "left"];
const STEP_COUNT = 3;

export function Process() {
  const { t } = usePreferences();
  const ref = useSectionFx<HTMLElement>();

  return (
    <section ref={ref} className={styles.section}>
      <div className={`${styles.inner} fx-fade`}>
        <Reveal>
          <div className={styles.header}>
            <p className={styles.eyebrow}>{t("process.eyebrow")}</p>
            <h2 className={styles.title}>{t("process.title")}</h2>
          </div>
        </Reveal>

        <div className={styles.steps}>
          {Array.from({ length: STEP_COUNT }).map((_, index) => (
            <Reveal
              key={index}
              delay={index * 140}
              direction={DIRECTIONS[index]}
              distance={44}
              scale
            >
              <article className={styles.step}>
                <h3 className={styles.stepTitle}>
                  {t(`process.steps.${index}.title`)}
                </h3>
                <p className={styles.stepText}>
                  {t(`process.steps.${index}.text`)}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
