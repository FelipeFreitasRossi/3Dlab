import { useEffect, useState } from "react";
import { buildWhatsAppUrl } from "../../data/site";
import { usePreferences } from "../../context/usePreferences";
import { WhatsAppIcon } from "../BrandIcons";
import styles from "./WhatsAppFloat.module.css";

const SHOW_AFTER_MS = 2000;

/**
 * Balão fixo do WhatsApp (canto inferior direito).
 * - Aparece com "pop-in" 2s depois do carregamento.
 * - Some quando o modal de produto está aberto (o ProductModal marca
 *   <html data-modal-open="true"> e o CSS cuida do resto).
 */
export function WhatsAppFloat() {
  const { t } = usePreferences();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), SHOW_AFTER_MS);
    return () => window.clearTimeout(timer);
  }, []);

  const label = t("whatsapp.tooltip");

  return (
    <a
      href={buildWhatsAppUrl(t("whatsapp.defaultMessage"))}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.float} ${visible ? styles.visible : ""}`}
      aria-label={label}
      tabIndex={visible ? 0 : -1}
    >
      <WhatsAppIcon size={30} />
      <span className={styles.tooltip} aria-hidden="true">
        {label}
      </span>
    </a>
  );
}
