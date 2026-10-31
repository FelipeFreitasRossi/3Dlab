import { useEffect, useState } from "react";
import { Settings } from "lucide-react";
import { buildWhatsAppUrl } from "../../data/site";
import { usePreferences } from "../../context/usePreferences";
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from "../BrandIcons";
import { SettingsPanel } from "../Settings/SettingsPanel";
import styles from "./Header.module.css";

const NAV_KEYS = [
  { href: "#inicio", key: "nav.home" },
  { href: "#catalogo", key: "nav.catalog" },
  { href: "#sobre", key: "nav.about" },
  { href: "#contato", key: "nav.contact" },
] as const;

export function Header() {
  const { t } = usePreferences();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Sombra/vidro ao rolar
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Trava scroll do body quando menu ou settings estão abertos
  useEffect(() => {
    const lock = menuOpen || settingsOpen;
    document.body.style.overflow = lock ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, settingsOpen]);

  // Esc fecha tudo
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (settingsOpen) setSettingsOpen(false);
      else if (menuOpen) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, settingsOpen]);

  const closeMenu = () => setMenuOpen(false);
  const whatsappUrl = buildWhatsAppUrl();

  return (
    <>
      <header
        className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}
      >
        <div className={styles.inner}>
          {/* Brand */}
          <a href="#inicio" className={styles.brand} onClick={closeMenu}>
            <img
              src="/logo.jpg"
              alt="Pedra Lunar"
              className={styles.brandLogo}
              width={40}
              height={40}
              loading="eager"
            />
            <span className={styles.brandName}>Pedra Lunar</span>
          </a>

          {/* Nav desktop */}
          <nav className={styles.nav} aria-label={t("header.navigation")}>
            {NAV_KEYS.map((link) => (
              <a key={link.href} href={link.href} className={styles.navLink}>
                {t(link.key)}
              </a>
            ))}
          </nav>

          {/* Actions desktop */}
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.iconButton}
              onClick={() => setSettingsOpen(true)}
              aria-label={t("settings.open")}
            >
              <Settings size={18} aria-hidden="true" />
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cta}
            >
              <WhatsAppIcon size={16} />
              {t("header.whatsapp")}
            </a>

            {/* Hamburguer */}
            <button
              type="button"
              className={`${styles.hamburger} ${
                menuOpen ? styles.hamburgerActive : ""
              }`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? t("header.closeMenu") : t("header.openMenu")}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Overlay + Sidebar */}
      <div
        className={`${styles.menuBackdrop} ${
          menuOpen ? styles.menuBackdropOpen : ""
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <aside
        id="mobile-menu"
        className={`${styles.menuPanel} ${
          menuOpen ? styles.menuPanelOpen : ""
        }`}
        role="dialog"
        aria-modal="true"
        aria-label={t("header.mobileMenu")}
        aria-hidden={!menuOpen}
      >
        <div className={styles.menuHeader}>
          <a href="#inicio" className={styles.brand} onClick={closeMenu}>
            <img
              src="/logo.jpg"
              alt="Pedra Lunar"
              className={styles.brandLogo}
              width={36}
              height={36}
              loading="eager"
            />
            <span className={styles.brandName}>Pedra Lunar</span>
          </a>
          <button
            type="button"
            className={styles.closeButton}
            onClick={closeMenu}
            aria-label={t("header.closeMenu")}
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className={styles.mobileNav}>
          {NAV_KEYS.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.mobileNavLink}
              style={{ transitionDelay: menuOpen ? `${120 + index * 60}ms` : "0ms" }}
              onClick={closeMenu}
            >
              <span className={styles.mobileNavIndex}>
                0{index + 1}
              </span>
              {t(link.key)}
            </a>
          ))}
        </nav>

        <div className={styles.menuDivider} aria-hidden="true" />

        <div className={styles.menuFooter}>
          <button
            type="button"
            className={styles.menuAction}
            onClick={() => {
              closeMenu();
              // pequeno delay para não brigar com animação da sidebar
              window.setTimeout(() => setSettingsOpen(true), 260);
            }}
          >
            <Settings size={16} aria-hidden="true" />
            {t("settings.open")}
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.menuWhatsApp}
            onClick={closeMenu}
          >
            <WhatsAppIcon size={16} />
            {t("header.whatsapp")}
          </a>

          <div className={styles.socials}>
            <a
              href="https://instagram.com/pedralunar.3d"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("footer.instagram.aria")}
            >
              <InstagramIcon size={18} />
            </a>
            <a
              href="https://tiktok.com/@pedralunar.3d"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("footer.tiktok.aria")}
            >
              <TikTokIcon size={18} />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("footer.whatsapp.aria")}
            >
              <WhatsAppIcon size={18} />
            </a>
          </div>
        </div>
      </aside>

      {settingsOpen && <SettingsPanel onClose={() => setSettingsOpen(false)} />}
    </>
  );
}