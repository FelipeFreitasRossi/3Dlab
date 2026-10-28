import type { CSSProperties } from "react";
import { Layers, Ruler, ShieldCheck, Sparkles } from "lucide-react";
import { usePreferences } from "../../context/usePreferences";
import { useSectionFx } from "../../hooks/useSectionFx";
import { Reveal } from "../Reveal/Reveal";
import styles from "./Features.module.css";

// Os textos ficam em i18n/translations.ts (features.items.N.*)
const ICONS = [Layers, Ruler, ShieldCheck, Sparkles];

export function Features() {
  const { t } = usePreferences();
  const ref = useSectionFx<HTMLElement>();

  return (
    <section ref={ref} className={styles.section}>
      <div className={`${styles.inner} fx-fade`}>
        <Reveal>
          <div className={`${styles.header} ${styles.layerHeader}`}>
            <p className={styles.eyebrow}>{t("features.eyebrow")}</p>
            <h2 className={styles.title}>{t("features.title")}</h2>
          </div>
        </Reveal>

        <div className={styles.grid}>
          {ICONS.map((Icon, index) => (
            <Reveal key={index} delay={index * 110} distance={40} scale>
              {/* camada de parallax: colunas pares e ímpares andam em sentidos opostos */}
              <div
                className={styles.layer}
                style={{ "--k": index % 2 === 0 ? 1 : -1 } as CSSProperties}
              >
                <article className={styles.card}>
                  <span className={styles.icon}>
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <h3 className={styles.cardTitle}>
                    {t(`features.items.${index}.title`)}
                  </h3>
                  <p className={styles.cardText}>
                    {t(`features.items.${index}.text`)}
                  </p>
                </article>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
