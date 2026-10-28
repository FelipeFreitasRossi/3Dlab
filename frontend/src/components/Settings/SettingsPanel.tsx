import { useEffect, useRef } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { Globe, Moon, Sun, X } from "lucide-react";
import { INSTAGRAM_URL, TIKTOK_URL, buildWhatsAppUrl } from "../../data/site";
import { usePreferences } from "../../context/usePreferences";
import type { Language } from "../../i18n/translations";
import type { Theme } from "../../context/preferencesStore";
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from "../BrandIcons";
import styles from "./SettingsPanel.module.css";

interface SettingsPanelProps {
  closing: boolean;
  onClose: () => void;
}

interface Option<V extends string> {
  value: V;
  label: string;
  icon?: ReactNode;
}

interface OptionGroupProps<V extends string> {
  title: string;
  options: Option<V>[];
  value: V;
  onChange: (value: V) => void;
}

/** Grupo de botões "radio" com navegação por setas (← →) */
function OptionGroup<V extends string>({
  title,
  options,
  value,
  onChange,
}: OptionGroupProps<V>) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    const current = options.findIndex((o) => o.value === value);
    const step = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : -1;
    const next = (current + step + options.length) % options.length;
    onChange(options[next].value);
    refs.current[next]?.focus();
  };

  return (
    <div className={styles.group}>
      <h3 className={styles.groupTitle}>{title}</h3>
      <div
        className={styles.options}
        role="radiogroup"
        aria-label={title}
        onKeyDown={onKeyDown}
      >
        {options.map((option, index) => {
          const selected = option.value === value;
          return (
            <button
              key={option.value}
              ref={(el) => {
                refs.current[index] = el;
              }}
              type="button"
              role="radio"
              aria-checked={selected}
              // só o selecionado entra na ordem do Tab (padrão de radiogroup)
              tabIndex={selected ? 0 : -1}
              className={`${styles.option} ${selected ? styles.optionActive : ""}`}
              onClick={() => onChange(option.value)}
            >
              {option.icon}
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function SettingsPanel({ closing, onClose }: SettingsPanelProps) {
  const { language, theme, setLanguage, setTheme, t } = usePreferences();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Foco: entra no painel ao abrir e volta para o botão que abriu ao fechar
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      previous?.focus?.();
    };
  }, []);

  // Esc fecha
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape" && !closing) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, closing]);

  // Mantém o Tab dentro do painel (focus trap)
  const onPanelKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab") return;
    const items = Array.from(
      panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [],
    );
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const languageOptions: Option<Language>[] = [
    { value: "pt-BR", label: t("settings.languagePt") },
    { value: "en-US", label: t("settings.languageEn") },
  ];

  const themeOptions: Option<Theme>[] = [
    {
      value: "dark",
      label: t("settings.themeDark"),
      icon: <Moon size={16} aria-hidden="true" />,
    },
    {
      value: "light",
      label: t("settings.themeLight"),
      icon: <Sun size={16} aria-hidden="true" />,
    },
  ];

  return (
    <div
      className={`${styles.overlay} ${closing ? styles.overlayClosing : ""}`}
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={panelRef}
        className={`${styles.panel} ${closing ? styles.panelClosing : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-title"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onPanelKeyDown}
      >
        <div className={styles.top}>
          <h2 id="settings-title" className={styles.title}>
            {t("settings.title")}
          </h2>
          <button
            ref={closeRef}
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label={t("settings.close")}
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div className={styles.body}>
          <OptionGroup
            title={t("settings.language")}
            options={languageOptions.map((o) => ({
              ...o,
              icon: <Globe size={16} aria-hidden="true" />,
            }))}
            value={language}
            onChange={setLanguage}
          />

          <OptionGroup
            title={t("settings.theme")}
            options={themeOptions}
            value={theme}
            onChange={setTheme}
          />

          <div className={styles.group}>
            <h3 className={styles.groupTitle}>{t("settings.follow")}</h3>
            <div className={styles.socials}>
              <a
                href={buildWhatsAppUrl(t("whatsapp.defaultMessage"))}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={t("footer.openWhatsapp")}
              >
                <WhatsAppIcon size={22} colored />
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={t("footer.openInstagram")}
              >
                <InstagramIcon size={22} colored />
              </a>
              <a
                href={TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={t("footer.openTiktok")}
              >
                <TikTokIcon size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
