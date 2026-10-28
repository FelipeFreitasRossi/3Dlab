import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { ArrowUpRight, Check, Clock, MessageCircle, X } from "lucide-react";
import { buildWhatsAppUrl } from "../../data/site";
import { PRODUCT_CATEGORIES } from "../../types/product";
import type { Product } from "../../types/product";
import styles from "./ProductModal.module.css";

const priceFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function categoryLabel(id: Product["category"]) {
  return PRODUCT_CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

interface ProductModalProps {
  product: Product;
  closing: boolean;
  onClose: () => void;
}

export function ProductModal({ product, closing, onClose }: ProductModalProps) {
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

  const whatsappMessage = `Olá! Tenho interesse no produto "${product.name}" (${categoryLabel(product.category)}). Poderia me passar mais informações?`;
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
          aria-label="Fechar detalhes do produto"
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
                  alt={`${product.name} — imagem ${activeImage + 1} de ${gallery.length}`}
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
                {categoryLabel(product.category)}
              </span>
              {product.badge && (
                <span className={styles.highlightBadge}>{product.badge}</span>
              )}
            </div>

            {gallery.length > 1 && (
              <div
                className={styles.thumbnails}
                aria-label="Miniaturas do produto"
              >
                {gallery.map((src, index) => (
                  <button
                    key={src}
                    type="button"
                    className={`${styles.thumb} ${
                      activeImage === index ? styles.thumbActive : ""
                    }`}
                    onClick={() => setActiveImage(index)}
                    aria-label={`Ver imagem ${index + 1}`}
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
                {product.leadTimeDays} dias úteis
              </span>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cta}
            >
              <MessageCircle size={18} aria-hidden="true" />
              Falar sobre este produto
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