import { useEffect, useState } from "react";
import { Menu, MessageCircle, X } from "lucide-react";
import { WHATSAPP_URL } from "../../data/site";
import styles from "./Header.module.css";

const NAV_LINKS = [
  { href: "#inicio", label: "Início" },
  { href: "#catalogo", label: "Catálogo" },
  { href: "#sobre", label: "Sobre" },
  { href: "#contato", label: "Contato" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}>
        <div className={styles.inner}>
          <a href="#inicio" className={styles.brand} onClick={closeMenu}>
            <img
              src="https://i.postimg.cc/KYFJDsWs/Pedra-Lunar.jpg"
              alt="Logo Pedra Lunar"
              className={styles.brandLogo}
              width={40}
              height={40}
              loading="eager"
            />
            <span>Pedra Lunar</span>
          </a>

          <nav className={styles.nav} aria-label="Navegação principal">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className={styles.navLink}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className={styles.actions}>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cta}
            >
              <MessageCircle size={16} aria-hidden="true" />
              WhatsApp
            </a>
            <button
              type="button"
              className={styles.mobileToggle}
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu"
            >
              <Menu size={24} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div
          className={styles.mobileMenu}
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
        >
          <div className={styles.mobileMenuHeader}>
            <span className={styles.brand}>
              <img
                src="https://i.postimg.cc/KYFJDsWs/Pedra-Lunar.jpg"
                alt="Logo Pedra Lunar"
                className={styles.brandLogo}
                width={40}
                height={40}
                loading="eager"
              />
              <span>Pedra Lunar</span>
            </span>
            <button
              type="button"
              onClick={closeMenu}
              className={styles.mobileToggle}
              aria-label="Fechar menu"
            >
              <X size={24} aria-hidden="true" />
            </button>
          </div>
          <nav className={styles.mobileNav}>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={styles.mobileNavLink}
                onClick={closeMenu}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}