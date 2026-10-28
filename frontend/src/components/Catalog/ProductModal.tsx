import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { ArrowUpRight, Check, Clock, X } from "lucide-react";
import { buildWhatsAppUrl } from "../../data/site";
import { usePreferences } from "../../context/usePreferences";
import { WhatsAppIcon } from "../BrandIcons";
import type { Product } from "../../types/product";
import styles from "./ProductModal.module.css";

interface ProductModalProps {
  product: Product;
  closing: boolean;
  onClose: () => void;
}

export function ProductModal({ product, closing, onClose }: ProductModalProps) {
  const { t, language } = usePreferences();
  const priceFormatter = useMemo(
    () => new Intl.NumberFormat(language, { style: "currency", currency: "BRL" }),
    [language],
  );
  const [activeImage, setActiveImage] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const gallery = product.images?.length
    ? product.images
    : product.image
      ? [product.image]
      : [];

  useEffect(() => {
    setActiveImage(0);
  }, [product.id]);

  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    // Avisa o resto do site (ex.: balão do WhatsApp) que há um modal aberto
    document.documentElement.setAttribute("data-modal-open", "true");
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = "";
      document.documentElement.removeAttribute("data-modal-open");
      previousFocusRef.current?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !closing) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, closing]);

  const currentImage = gallery[activeImage];

  const category = t(`categories.${product.category}`);
  const whatsappUrl = buildWhatsAppUrl(
    t("product.whatsappMessage", { name: product.name, category }),
  );

  return (
    <div
      className={`${styles.overlay} ${closing ? styles.overlayClosing : ""}`}
      onClick={onClose}
      role="presentation"
    >
      <div
        className={`${styles.dialog} ${closing ? styles.dialogClosing : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`product-modal-title-${product.id}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label={t("product.close")}
        >
          <X size={20} aria-hidden="true" />
        </button>

        <div className={styles.layout}>
          {/* ============ Galeria ============ */}
          <div className={styles.gallery}>
            <div className={styles.mainImageWrapper}>
              {currentImage ? (
                <img
                  key={currentImage}
                  src={currentImage}
                  alt={t("product.imageAlt", {
                    name: product.name,
                    n: activeImage + 1,
                    total: gallery.length,
                  })}
                  className={styles.mainImage}
                  width={800}
                  height={400}
                />
              ) : (
                <div
                  className={styles.mainImagePlaceholder}
                  style={
                    { "--product-accent": product.accent } as CSSProperties
                  }
                  aria-hidden="true"
                />
              )}

              <span className={styles.categoryBadge}>
                {category}
              </span>
              {product.badge && (
                <span className={styles.highlightBadge}>{product.badge}</span>
              )}
            </div>

            {gallery.length > 1 && (
              <div
                className={styles.thumbnails}
                aria-label={t("product.thumbs")}
              >
                {gallery.map((src, index) => (
                  <button
                    key={src}
                    type="button"
                    className={`${styles.thumb} ${
                      activeImage === index ? styles.thumbActive : ""
                    }`}
                    onClick={() => setActiveImage(index)}
                    aria-label={t("product.viewImage", { n: index + 1 })}
                    aria-current={activeImage === index}
                  >
                    <img src={src} alt="" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ============ Detalhes ============ */}
          <div className={styles.details}>
            <div className={styles.headerBlock}>
              <h2
                id={`product-modal-title-${product.id}`}
                className={styles.title}
              >
                {product.name}
              </h2>
              <p className={styles.description}>
                {product.longDescription ?? product.shortDescription}
              </p>
            </div>

            {product.features && product.features.length > 0 && (
              <ul className={styles.featureList}>
                {product.features.map((feature) => (
                  <li key={feature} className={styles.featureItem}>
                    <Check
                      size={14}
                      className={styles.featureIcon}
                      aria-hidden="true"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className={styles.metaRow}>
              <span className={styles.price}>
                {priceFormatter.format(product.price)}
              </span>
              <span className={styles.leadTime}>
                <Clock size={14} aria-hidden="true" />
                {t("product.leadTime", { days: product.leadTimeDays })}
              </span>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cta}
            >
              <WhatsAppIcon size={18} />
              {t("product.cta")}
              <ArrowUpRight
                size={16}
                className={styles.ctaArrow}
                aria-hidden="true"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}