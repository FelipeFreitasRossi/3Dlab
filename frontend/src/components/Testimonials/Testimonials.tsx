import { BadgeCheck, Quote, Star } from "lucide-react";
import { usePreferences } from "../../context/usePreferences";
import { useSectionFx } from "../../hooks/useSectionFx";
import { Reveal } from "../Reveal/Reveal";
import styles from "./Testimonials.module.css";

const RATING = 5;
const ITEM_COUNT = 3;

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Testimonials() {
  const { t } = usePreferences();
  const ref = useSectionFx<HTMLElement>();

  return (
    <section ref={ref} className={styles.section}>
      <div className={`${styles.inner} fx-fade`}>
        <Reveal>
          <div className={styles.header}>
            <p className={styles.eyebrow}>{t("testimonials.eyebrow")}</p>
            <h2 className={styles.title}>{t("testimonials.title")}</h2>
            <p className={styles.subtitle}>{t("testimonials.subtitle")}</p>
          </div>
        </Reveal>

        <div className={styles.grid}>
          {Array.from({ length: ITEM_COUNT }).map((_, index) => (
            <Reveal
              key={index}
              delay={index * 120}
              distance={40}
              scale
              className={styles.cardWrapper}
            >
              <article className={styles.card}>
                <Quote
                  className={styles.quoteMark}
                  size={72}
                  aria-hidden="true"
                />

                <div
                  className={styles.rating}
                  aria-label={t("testimonials.ratingLabel", { n: RATING })}
                >
                  {Array.from({ length: RATING }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill="currentColor"
                      strokeWidth={0}
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <p className={styles.quote}>&ldquo;{t(`testimonials.items.${index}.quote`)}&rdquo;</p>

                <div className={styles.divider} aria-hidden="true" />

                <footer className={styles.authorRow}>
                  <span className={styles.avatar} aria-hidden="true">
                    {initials(t(`testimonials.items.${index}.author`))}
                  </span>
                  <div className={styles.authorInfo}>
                    <span className={styles.authorName}>
                      {t(`testimonials.items.${index}.author`)}
                      <BadgeCheck
                        size={14}
                        className={styles.verified}
                        aria-label={t("testimonials.verified")}
                      />
                    </span>
                    <span className={styles.authorRole}>{t(`testimonials.items.${index}.role`)}</span>
                  </div>
                </footer>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}