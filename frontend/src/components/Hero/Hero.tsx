import type { CSSProperties } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { buildWhatsAppUrl } from "../../data/site";
import { usePreferences } from "../../context/usePreferences";
import { useHeroFx } from "../../hooks/useSectionFx";
import { WhatsAppIcon } from "../BrandIcons";
import styles from "./Hero.module.css";

interface WordsProps {
  text: string;
  /** índice da primeira palavra (para o escalonamento continuar entre linhas) */
  start: number;
  accent?: boolean;
}

/** Cada palavra "sobe" de dentro de uma máscara (clip-reveal) */
function Words({ text, start, accent = false }: WordsProps) {
  return (
    <span className={styles.line}>
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`}>
          <span className={styles.word}>
            <span
              className={`${styles.wordInner} ${accent ? styles.accentWord : ""}`}
              style={{ "--i": start + i } as CSSProperties}
            >
              {word}
            </span>
          </span>{" "}
        </span>
      ))}
    </span>
  );
}

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function Hero() {
  const { t } = usePreferences();
  const ref = useHeroFx<HTMLElement>();

  const line1 = t("hero.title1");
  const line2 = t("hero.title2");
  const line1Count = line1.split(" ").length;

  return (
    <section ref={ref} id="inicio" className={styles.hero}>
      <div className={styles.inner}>
        <span className={`${styles.eyebrow} ${styles.rise}`} style={delay(0)}>
          <Sparkles size={12} aria-hidden="true" />
          {t("hero.eyebrow")}
        </span>

        <h1 className={styles.title}>
          <Words text={line1} start={0} />
          <Words text={line2} start={line1Count} accent />
        </h1>

        <p className={`${styles.subtitle} ${styles.rise}`} style={delay(650)}>
          {t("hero.subtitle")}
        </p>

        <div className={`${styles.actions} ${styles.rise}`} style={delay(800)}>
          <a href="#catalogo" className={styles.primaryCta}>
            {t("hero.ctaCatalog")}
            <ArrowRight size={18} aria-hidden="true" />
          </a>
          <a
            href={buildWhatsAppUrl(t("whatsapp.defaultMessage"))}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondaryCta}
          >
            <WhatsAppIcon size={18} />
            {t("hero.ctaWhatsapp")}
          </a>
        </div>
      </div>
    </section>
  );
}
