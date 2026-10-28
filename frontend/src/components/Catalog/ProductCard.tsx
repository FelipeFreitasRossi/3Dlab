import { useMemo } from "react";
import type { CSSProperties } from "react";
import { ArrowUpRight, Clock } from "lucide-react";
import { buildWhatsAppUrl } from "../../data/site";
import { usePreferences } from "../../context/usePreferences";
import { useTilt } from "../../hooks/useTilt";
import { WhatsAppIcon } from "../BrandIcons";
import type { Product } from "../../types/product";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
  /** Chamado ao clicar no card (abre o modal no pai). */
  onOpen: (product: Product) => void;
}

export function ProductCard({ product, onOpen }: ProductCardProps) {
  const { t, language } = usePreferences();
  const tiltRef = useTilt<HTMLElement>(6); // inclinação máxima: 6 graus
  const priceFormatter = useMemo(
    () => new Intl.NumberFormat(language, { style: "currency", currency: "BRL" }),
    [language],
  );

  const cardImage = product.image ?? product.images?.[0];
  const category = t(`categories.${product.category}`);

  const whatsappUrl = buildWhatsAppUrl(
    t("product.whatsappMessage", { name: product.name, category }),
  );

  return (
    <article ref={tiltRef} className={styles.card}>
      <button
        type="button"
        className={styles.cardClickable}
        onClick={() => onOpen(product)}
        aria-label={t("product.viewDetails", { name: product.name })}
      >
        <div className={styles.imageArea}>
          {cardImage ? (
            <img
              src={cardImage}
              alt={product.name}
              className={styles.image}
              loading="lazy"
              width={400}
              height={300}
            />
          ) : (
            <div
              className={styles.imagePlaceholder}
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

        <div className={styles.infoBlock}>
          <h3 className={styles.name}>{product.name}</h3>
          <p className={styles.description}>{product.shortDescription}</p>
        </div>
      </button>

      <div className={styles.footer}>
        <div className={styles.meta}>
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
          <WhatsAppIcon size={16} />
          {t("product.cta")}
          <ArrowUpRight
            size={14}
            className={styles.ctaArrow}
            aria-hidden="true"
          />
        </a>
      </div>
    </article>
  );
}