import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { ArrowUpRight, Check, Clock, X } from "lucide-react";
import { buildWhatsAppUrl } from "../../data/site";
import { usePreferences } from "../../context/usePreferences";
import { localizeProduct } from "../../services/productLocalizer";
import { PRODUCT_CATEGORIES } from "../../types/product";
import type { Product } from "../../types/product";
import { WhatsAppIcon } from "../BrandIcons";
import styles from "./ProductModal.module.css";

const priceFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

interface ProductModalProps {
  product: Product;
  closing: boolean;
  onClose: () => void;
}

export function ProductModal({
  product: rawProduct,
  closing,
  onClose,
}: ProductModalProps) {
  const { language, t } = usePreferences();
  const product = localizeProduct(rawProduct, language);

  const [activeImage, setActiveImage] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const gallery = product.images?.length
    ? product.images
    : product.image
      ? [product.image]
      : [];

  const categoryLabel =
    PRODUCT_CATEGORIES.find((c) => c.id === product.category)?.label ??
    product.category;

  useEffect(() => {
    setActiveImage(0);
  }, [product.id]);

  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
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

  const whatsappMessage = `Olá! Tenho interesse no produto "${product.name}". Poderia me passar mais informações?`;
  const whatsappUrl = buildWhatsAppUrl(whatsappMessage);

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
          aria-label={t("product.modal.close")}
        >
          <X size={20} aria-hidden="true" />
        </button>

        <div className={styles.layout}>
          <div className={styles.gallery}>
            <div className={styles.mainImageWrapper}>
              {currentImage ? (
                <img
                  key={currentImage}
                  src={currentImage}
                  alt={`${product.name} — ${activeImage + 1}/${gallery.length}`}
                  className={styles.mainImage}
                  width={800}
                  height={400}
                />
              ) : (
                <div
                  className={styles.mainImagePlaceholder}
                  style={{ "--product-accent": product.accent } as CSSProperties}
                  aria-hidden="true"
                />
              )}

              <span className={styles.categoryBadge}>{categoryLabel}</span>
              {product.badge && (
                <span className={styles.highlightBadge}>{product.badge}</span>
              )}
            </div>

            {gallery.length > 1 && (
              <div
                className={styles.thumbnails}
                aria-label={t("product.modal.thumbnails")}
              >
                {gallery.map((src, index) => (
                  <button
                    key={src}
                    type="button"
                    className={`${styles.thumb} ${
                      activeImage === index ? styles.thumbActive : ""
                    }`}
                    onClick={() => setActiveImage(index)}
                    aria-label={`${t("product.modal.viewImage")} ${index + 1}`}
                    aria-current={activeImage === index}
                  >
                    <img src={src} alt="" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>

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
                {product.leadTimeDays} {t("product.modal.days")}
              </span>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cta}
            >
              <WhatsAppIcon size={18} />
              {t("product.modal.cta")}
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