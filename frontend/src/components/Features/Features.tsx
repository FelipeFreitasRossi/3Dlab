import { Layers, Ruler, ShieldCheck, Sparkles } from "lucide-react";
import { usePreferences } from "../../context/usePreferences";
import { Reveal } from "../Reveal/Reveal";
import styles from "./Features.module.css";

export function Features() {
  const { t } = usePreferences();

  const items = [1, 2, 3, 4].map((n) => ({
    title: t(`features.item${n}.title`),
    text: t(`features.item${n}.text`),
  }));

  const icons = [Layers, Ruler, ShieldCheck, Sparkles];

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Reveal>
          <div className={styles.header}>
            <p className={styles.eyebrow}>{t("features.eyebrow")}</p>
            <h2 className={styles.title}>{t("features.title")}</h2>
          </div>
        </Reveal>

        <div className={styles.grid}>
          {items.map((item, index) => {
            const Icon = icons[index];
            return (
              <Reveal key={item.title} delay={index * 80}>
                <article className={styles.card}>
                  <span className={styles.icon}>
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardText}>{item.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}