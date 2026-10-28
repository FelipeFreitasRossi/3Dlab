import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronRight, Menu, Settings, X } from "lucide-react";
import { buildWhatsAppUrl } from "../../data/site";
import { usePreferences } from "../../context/usePreferences";
import { WhatsAppIcon } from "../BrandIcons";
import { SettingsPanel } from "../Settings/SettingsPanel";
import styles from "./Header.module.css";

const NAV_LINKS = [
  { href: "#inicio", key: "nav.home" },
  { href: "#catalogo", key: "nav.catalog" },
  { href: "#sobre", key: "nav.about" },
  { href: "#contato", key: "nav.contact" },
];

const SETTINGS_EXIT_MS = 260;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = usePreferences();

  // Painel de configurações: "closing" deixa a animação de saída terminar
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsClosing, setSettingsClosing] = useState(false);

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerCloseRef = useRef<HTMLButtonElement>(null);

  const openSettings = () => {
    setSettingsClosing(false);
    setSettingsOpen(true);
  };

  const closeSettings = useCallback(() => {
    setSettingsClosing(true);
    window.setTimeout(() => {
      setSettingsOpen(false);
      setSettingsClosing(false);
      // o botão que abriu as configurações (dentro do menu) já foi desmontado
      menuButtonRef.current?.focus();
    }, SETTINGS_EXIT_MS);
  }, []);

  const whatsappUrl = buildWhatsAppUrl(t("whatsapp.defaultMessage"));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    drawerCloseRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const openSettingsFromMenu = () => {
    closeMenu();
    openSettings();
  };

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}>
        <div className={styles.inner}>
          <a href="#inicio" className={styles.brand} onClick={closeMenu}>
            <img
              src="https://i.postimg.cc/KYFJDsWs/Pedra-Lunar.jpg"
              alt={t("nav.logoAlt")}
              className={styles.brandLogo}
              width={40}
              height={40}
              loading="eager"
            />
            <span>Pedra Lunar</span>
          </a>

          <nav className={styles.nav} aria-label={t("nav.mainLabel")}>
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className={styles.navLink}>
                {t(link.key)}
              </a>
            ))}
          </nav>

          <div className={styles.actions}>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cta}
            >
              <WhatsAppIcon size={16} />
              {t("header.whatsapp")}
            </a>
            <button
              ref={menuButtonRef}
              type="button"
              className={styles.menuButton}
              onClick={() => setMenuOpen(true)}
              aria-label={t("nav.openMenu")}
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
            >
              <Menu size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className={styles.drawerOverlay} onClick={closeMenu} role="presentation">
          <aside
            className={styles.drawer}
            role="dialog"
            aria-modal="true"
            aria-label={t("nav.mobileLabel")}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.drawerHeader}>
              <span className={styles.brand}>
                <img
                  src="https://i.postimg.cc/KYFJDsWs/Pedra-Lunar.jpg"
                  alt={t("nav.logoAlt")}
                  className={styles.brandLogo}
                  width={40}
                  height={40}
                  loading="eager"
                />
                <span>Pedra Lunar</span>
              </span>
              <button
                ref={drawerCloseRef}
                type="button"
                onClick={closeMenu}
                className={styles.drawerClose}
                aria-label={t("nav.closeMenu")}
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <nav className={styles.drawerNav}>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={styles.drawerNavLink}
                  onClick={closeMenu}
                >
                  {t(link.key)}
                </a>
              ))}
            </nav>

            <div className={styles.drawerFooter}>
              <button
                type="button"
                className={styles.settingsItem}
                onClick={openSettingsFromMenu}
                aria-haspopup="dialog"
              >
                <Settings size={20} aria-hidden="true" className={styles.settingsIcon} />
                <span>{t("settings.title")}</span>
                <ChevronRight size={18} aria-hidden="true" className={styles.settingsChevron} />
              </button>
            </div>
          </aside>
        </div>
      )}

      {settingsOpen && (
        <SettingsPanel closing={settingsClosing} onClose={closeSettings} />
      )}
    </>
  );
}