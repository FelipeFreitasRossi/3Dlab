import type { CSSProperties } from "react";
import { ArrowUpRight, Clock } from "lucide-react";
import { buildWhatsAppUrl } from "../../data/site";
import { usePreferences } from "../../context/usePreferences";
import { localizeProduct } from "../../services/productLocalizer";
import { PRODUCT_CATEGORIES } from "../../types/product";
import type { Product } from "../../types/product";
import { WhatsAppIcon } from "../BrandIcons";
import styles from "./ProductCard.module.css";

const priceFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

interface ProductCardProps {
  product: Product;
  onOpen: (product: Product) => void;
}

export function ProductCard({ product: rawProduct, onOpen }: ProductCardProps) {
  const { language, t } = usePreferences();
  const product = localizeProduct(rawProduct, language);
  const cardImage = product.image ?? product.images?.[0];
  const categoryLabel =
    PRODUCT_CATEGORIES.find((c) => c.id === product.category)?.label ??
    product.category;

  const whatsappMessage = `Olá! Tenho interesse no produto "${product.name}". Poderia me passar mais informações?`;
  const whatsappUrl = buildWhatsAppUrl(whatsappMessage);

  return (
    <article className={styles.card}>
      <button
        type="button"
        className={styles.cardClickable}
        onClick={() => onOpen(rawProduct)}
        aria-label={`${t("catalog.card.details")} ${product.name}`}
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
              style={{ "--product-accent": product.accent } as CSSProperties}
              aria-hidden="true"
            />
          )}

          <span className={styles.categoryBadge}>{categoryLabel}</span>

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
            {product.leadTimeDays} {t("catalog.card.days")}
          </span>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cta}
        >
          <WhatsAppIcon size={16} />
          {t("catalog.card.cta")}
          <ArrowUpRight size={14} className={styles.ctaArrow} aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}