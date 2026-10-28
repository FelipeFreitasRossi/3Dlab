import { usePreferences } from "../../context/usePreferences";
import { useSectionFx } from "../../hooks/useSectionFx";
import { Counter } from "../Counter/Counter";
import { Reveal } from "../Reveal/Reveal";
import styles from "./About.module.css";

// ⚠️ DEMONSTRATIVO — números fictícios. Troque pelos reais do cliente.
const STATS = [
  { key: "pieces", value: 250, prefix: "+", suffix: "" },
  { key: "years", value: 4, prefix: "", suffix: "" },
  { key: "satisfaction", value: 98, prefix: "", suffix: "%" },
] as const;

export function About() {
  const { t } = usePreferences();
  const ref = useSectionFx<HTMLElement>();

  return (
    <section ref={ref} id="sobre" className={styles.section}>
      {/* Decoração com parallax: anel que sobe e gira conforme o scroll */}
      <div className={styles.ring} aria-hidden="true" />
      <div className={`${styles.ring} ${styles.ringSmall}`} aria-hidden="true" />

      <div className={`${styles.inner} fx-fade`}>
        <Reveal direction="right" distance={40}>
          <div className={styles.layerTitle}>
            <p className={styles.eyebrow}>{t("about.eyebrow")}</p>
            <h2 className={styles.title}>{t("about.title")}</h2>
          </div>
        </Reveal>

        <Reveal direction="left" distance={40} delay={120}>
          <div className={`${styles.text} ${styles.layerText}`}>
            <p>{t("about.p1")}</p>
            <p>
              <span className={styles.highlight}>{t("about.p2Highlight")}</span>{" "}
              {t("about.p2")}
            </p>
            <p>{t("about.p3")}</p>
          </div>
        </Reveal>

        <ul className={styles.stats} aria-label={t("about.stats.label")}>
          {STATS.map((stat, index) => (
            <li key={stat.key} className={styles.statItem}>
              <Reveal delay={index * 120} scale>
                <p className={styles.statValue}>
                  <Counter
                    to={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </p>
                <p className={styles.statLabel}>{t(`about.stats.${stat.key}`)}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
