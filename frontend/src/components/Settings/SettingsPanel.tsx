import { Globe, Moon, Sun, X } from "lucide-react";
import { INSTAGRAM_URL, TIKTOK_URL, buildWhatsAppUrl } from "../../data/site";
import { usePreferences } from "../../context/usePreferences";
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from "../BrandIcons";
import styles from "./SettingsPanel.module.css";

interface SettingsPanelProps {
  onClose: () => void;
}

export function SettingsPanel({ onClose }: SettingsPanelProps) {
  const { language, theme, setLanguage, setTheme, t } = usePreferences();

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={t("settings.title")}
      onClick={onClose}
    >
      <aside className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <header className={styles.header}>
          <h2 className={styles.title}>{t("settings.title")}</h2>
          <button
            type="button"
            onClick={onClose}
            className={styles.closeBtn}
            aria-label={t("settings.close")}
          >
            <X size={20} aria-hidden="true" />
          </button>
        </header>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <Globe size={16} aria-hidden="true" />
            <h3>{t("settings.language")}</h3>
          </div>
          <div className={styles.options}>
            <button
              type="button"
              className={`${styles.option} ${
                language === "pt-BR" ? styles.optionActive : ""
              }`}
              onClick={() => setLanguage("pt-BR")}
            >
              {t("settings.language.pt")}
            </button>
            <button
              type="button"
              className={`${styles.option} ${
                language === "en-US" ? styles.optionActive : ""
              }`}
              onClick={() => setLanguage("en-US")}
            >
              {t("settings.language.en")}
            </button>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            {theme === "dark" ? (
              <Moon size={16} aria-hidden="true" />
            ) : (
              <Sun size={16} aria-hidden="true" />
            )}
            <h3>{t("settings.theme")}</h3>
          </div>
          <div className={styles.options}>
            <button
              type="button"
              className={`${styles.option} ${
                theme === "dark" ? styles.optionActive : ""
              }`}
              onClick={() => setTheme("dark")}
            >
              {t("settings.theme.dark")}
            </button>
            <button
              type="button"
              className={`${styles.option} ${
                theme === "light" ? styles.optionActive : ""
              }`}
              onClick={() => setTheme("light")}
            >
              {t("settings.theme.light")}
            </button>
          </div>
        </div>

        <div className={styles.socials}>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label={t("footer.instagram.aria")}
          >
            <InstagramIcon size={18} />
          </a>
          <a
            href={TIKTOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label={t("footer.tiktok.aria")}
          >
            <TikTokIcon size={18} />
          </a>
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label={t("footer.whatsapp.aria")}
          >
            <WhatsAppIcon size={18} />
          </a>
        </div>
      </aside>
    </div>
  );
}