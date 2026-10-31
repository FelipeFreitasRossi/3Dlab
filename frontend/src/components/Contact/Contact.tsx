import { buildWhatsAppUrl } from "../../data/site";
import { usePreferences } from "../../context/usePreferences";
import { Reveal } from "../Reveal/Reveal";
import { WhatsAppIcon } from "../BrandIcons";
import styles from "./Contact.module.css";

export function Contact() {
  const { t } = usePreferences();

  return (
    <section id="contato" className={styles.section}>
      <div className={styles.inner}>
        <Reveal>
          <h2 className={styles.title}>{t("contact.title")}</h2>
        </Reveal>
        <Reveal delay={80}>
          <p className={styles.text}>{t("contact.text")}</p>
        </Reveal>
        <Reveal delay={160}>
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.cta}
          >
            <WhatsAppIcon size={20} />
            {t("contact.cta")}
          </a>
        </Reveal>
      </div>
    </section>
  );
}