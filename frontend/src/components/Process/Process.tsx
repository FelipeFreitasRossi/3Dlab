import { usePreferences } from "../../context/usePreferences";
import { Reveal } from "../Reveal/Reveal";
import styles from "./Process.module.css";

export function Process() {
  const { t } = usePreferences();

  const steps = [1, 2, 3].map((n) => ({
    title: t(`process.step${n}.title`),
    text: t(`process.step${n}.text`),
  }));

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Reveal>
          <div className={styles.header}>
            <p className={styles.eyebrow}>{t("process.eyebrow")}</p>
            <h2 className={styles.title}>{t("process.title")}</h2>
          </div>
        </Reveal>

        <div className={styles.steps}>
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 100}>
              <article className={styles.step}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepText}>{step.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}