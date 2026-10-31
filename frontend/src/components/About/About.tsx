import { usePreferences } from "../../context/usePreferences";
import { Reveal } from "../Reveal/Reveal";
import styles from "./About.module.css";

export function About() {
  const { t } = usePreferences();

  const stats = [
    { value: 250, label: t("about.stat.pieces") },
    { value: 6, label: t("about.stat.years") },
    { value: 180, label: t("about.stat.clients") },
    { value: 12, label: t("about.stat.materials") },
  ];

  return (
    <section id="sobre" className={styles.section}>
      <div className={styles.inner}>
        <Reveal>
          <div>
            <p className={styles.eyebrow}>{t("about.eyebrow")}</p>
            <h2 className={styles.title}>{t("about.title")}</h2>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className={styles.text}>
            <p>{t("about.p1")}</p>
            <p>
              <span className={styles.highlight}>
                {t("about.p2.highlight")}
              </span>{" "}
              {t("about.p2.rest")}
            </p>
            <p>{t("about.p3")}</p>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className={styles.statsGrid}>
            {stats.map((stat) => (
              <div key={stat.label} className={styles.statCard}>
                <strong className={styles.statValue}>{stat.value}+</strong>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}