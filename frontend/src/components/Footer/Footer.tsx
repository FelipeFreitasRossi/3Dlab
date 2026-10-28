import { ArrowUpRight, Mail } from "lucide-react";
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  TIKTOK_HANDLE,
  TIKTOK_URL,
  buildWhatsAppUrl,
} from "../../data/site";
import { usePreferences } from "../../context/usePreferences";
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from "../BrandIcons";
import styles from "./Footer.module.css";

const NAV_LINKS = [
  { href: "#inicio", key: "nav.home" },
  { href: "#catalogo", key: "nav.catalog" },
  { href: "#sobre", key: "nav.about" },
  { href: "#contato", key: "nav.contact" },
];

export function Footer() {
  const { t } = usePreferences();
  const year = new Date().getFullYear();
  const whatsappUrl = buildWhatsAppUrl(t("whatsapp.defaultMessage"));

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brandCol}>
            <a href="#inicio" className={styles.brand}>
              <img
                src="https://i.postimg.cc/KYFJDsWs/Pedra-Lunar.jpg"
                alt={t("nav.logoAlt")}
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
                aria-label={t("footer.openInstagram")}
              >
                <InstagramIcon size={20} colored />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={t("footer.openWhatsapp")}
              >
                <WhatsAppIcon size={20} colored />
              </a>
              <a
                href={TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={t("footer.openTiktok")}
              >
                <TikTokIcon size={18} />
              </a>
            </div>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>{t("footer.navigate")}</h4>
            <nav className={styles.navList} aria-label={t("footer.navLabel")}>
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href} className={styles.navLink}>
                  {t(link.key)}
                  <ArrowUpRight size={12} aria-hidden="true" />
                </a>
              ))}
            </nav>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>{t("footer.contact")}</h4>
            <ul className={styles.contactList}>
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                >
                  <WhatsAppIcon size={16} />
                  {t("contact.cta")}
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
                  {INSTAGRAM_HANDLE}
                </a>
              </li>
              <li>
                <a
                  href={TIKTOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                >
                  <TikTokIcon size={16} />
                  {TIKTOK_HANDLE}
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
          <p>
            © {year} Pedra Lunar — 3D Lab. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}