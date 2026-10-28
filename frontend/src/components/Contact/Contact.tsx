import { buildWhatsAppUrl } from "../../data/site";
import { usePreferences } from "../../context/usePreferences";
import { useSectionFx } from "../../hooks/useSectionFx";
import { WhatsAppIcon } from "../BrandIcons";
import { Reveal } from "../Reveal/Reveal";
import styles from "./Contact.module.css";

export function Contact() {
  const { t } = usePreferences();
  const ref = useSectionFx<HTMLElement>();

  return (
    <section ref={ref} id="contato" className={styles.section}>
      <div className={`${styles.inner} fx-fade`}>
        <Reveal>
          <h2 className={styles.title}>{t("contact.title")}</h2>
        </Reveal>
        <Reveal delay={80}>
          <p className={styles.text}>{t("contact.text")}</p>
        </Reveal>
        <Reveal delay={160}>
          <a
            href={buildWhatsAppUrl(t("whatsapp.defaultMessage"))}
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