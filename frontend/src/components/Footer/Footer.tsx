import { ArrowUpRight, Mail } from "lucide-react";
import {
  INSTAGRAM_URL,
  TIKTOK_URL,
  buildWhatsAppUrl,
} from "../../data/site";
import { usePreferences } from "../../context/usePreferences";
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from "../BrandIcons";
import styles from "./Footer.module.css";

const NAV_KEYS = [
  { href: "#inicio", key: "nav.home" },
  { href: "#catalogo", key: "nav.catalog" },
  { href: "#sobre", key: "nav.about" },
  { href: "#contato", key: "nav.contact" },
] as const;

export function Footer() {
  const { t } = usePreferences();
  const year = new Date().getFullYear();
  const copyright = t("footer.copyright").replace("{year}", String(year));

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brandCol}>
            <a href="#inicio" className={styles.brand}>
              <img
                src="/logo.jpg"
                alt="Pedra Lunar"
                className={styles.logo}
                width={40}
                height={40}
                loading="lazy"
              />
              <span>Pedra Lunar</span>
            </a>

            <p className={styles.tagline}>{t("footer.tagline")}</p>

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
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>{t("footer.navTitle")}</h4>
            <nav className={styles.navList}>
              {NAV_KEYS.map((link) => (
                <a key={link.href} href={link.href} className={styles.navLink}>
                  {t(link.key)}
                  <ArrowUpRight size={12} aria-hidden="true" />
                </a>
              ))}
            </nav>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>{t("footer.contactTitle")}</h4>
            <ul className={styles.contactList}>
              <li>
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                >
                  <WhatsAppIcon size={16} />
                  {t("footer.whatsapp")}
                </a>
              </li>
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                >
                  <InstagramIcon size={16} />
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="mailto:contato@pedralunar.example"
                  className={styles.contactLink}
                >
                  <Mail size={16} aria-hidden="true" />
                  contato@pedralunar.example
                </a>
              </li>
            </ul>
            <p className={styles.responseNote}>{t("footer.responseNote")}</p>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>{copyright}</p>
        </div>
      </div>
    </footer>
  );
}