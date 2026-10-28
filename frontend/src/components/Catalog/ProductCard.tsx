import type { CSSProperties } from "react";
import { ArrowUpRight, Clock, MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "../../data/site";
import { PRODUCT_CATEGORIES } from "../../types/product";
import type { Product } from "../../types/product";
import styles from "./ProductCard.module.css";

const priceFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function categoryLabel(id: Product["category"]) {
  return PRODUCT_CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

interface ProductCardProps {
  product: Product;
  /** Chamado ao clicar no card (abre o modal no pai). */
  onOpen: (product: Product) => void;
}

export function ProductCard({ product, onOpen }: ProductCardProps) {
  const cardImage = product.image ?? product.images?.[0];

  const whatsappMessage = `Olá! Tenho interesse no produto "${product.name}" (${categoryLabel(product.category)}). Poderia me passar mais informações?`;
  const whatsappUrl = buildWhatsAppUrl(whatsappMessage);

  return (
    <article className={styles.card}>
      <button
        type="button"
        className={styles.cardClickable}
        onClick={() => onOpen(product)}
        aria-label={`Ver detalhes de ${product.name}`}
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
            {categoryLabel(product.category)}
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
            {product.leadTimeDays} dias úteis
          </span>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cta}
        >
          <MessageCircle size={16} aria-hidden="true" />
          Falar sobre este produto
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