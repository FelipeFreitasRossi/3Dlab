import { ArrowRight, Sparkles } from "lucide-react";
import { buildWhatsAppUrl } from "../../data/site";
import { usePreferences } from "../../context/usePreferences";
import { WhatsAppIcon } from "../BrandIcons";
import styles from "./Hero.module.css";

export function Hero() {
  const { t } = usePreferences();

  return (
    <section id="inicio" className={styles.hero}>
      <div className={styles.inner}>
        <span className={styles.eyebrow}>
          <Sparkles size={12} aria-hidden="true" />
          {t("hero.eyebrow")}
        </span>

        <h1 className={styles.title}>
          {t("hero.title.line1")}
          <br />
          <span className={styles.titleAccent}>{t("hero.title.line2")}</span>
        </h1>

        <p className={styles.subtitle}>{t("hero.subtitle")}</p>

        <div className={styles.actions}>
          <a href="#catalogo" className={styles.primaryCta}>
            {t("hero.cta.catalog")}
            <ArrowRight size={18} aria-hidden="true" />
          </a>
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondaryCta}
          >
            <WhatsAppIcon size={18} />
            {t("hero.cta.whatsapp")}
          </a>
        </div>
      </div>
    </section>
  );
}