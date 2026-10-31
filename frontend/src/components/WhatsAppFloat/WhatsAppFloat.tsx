import { useEffect, useState } from "react";
import { buildWhatsAppUrl } from "../../data/site";
import { usePreferences } from "../../context/usePreferences";
import { WhatsAppIcon } from "../BrandIcons";
import styles from "./WhatsAppFloat.module.css";

export function WhatsAppFloat() {
  const { t } = usePreferences();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 2000);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <a
      href={buildWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.float}
      aria-label={t("whatsapp.label")}
    >
      <span className={styles.tooltip}>{t("whatsapp.tooltip")}</span>
      <WhatsAppIcon size={28} />
    </a>
  );
}