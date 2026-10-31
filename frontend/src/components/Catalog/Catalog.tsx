import { useCallback, useMemo, useRef, useState } from "react";
import { AlertCircle, Loader2, Search, SlidersHorizontal } from "lucide-react";
import { usePreferences } from "../../context/usePreferences";
import { useProducts } from "../../hooks/useProducts";
import { PRODUCT_CATEGORIES } from "../../types/product";
import type { CategoryFilter, Product } from "../../types/product";
import { Reveal } from "../Reveal/Reveal";
import { ProductCard } from "./ProductCard";
import { ProductModal } from "./ProductModal";
import styles from "./Catalog.module.css";

const MODAL_EXIT_MS = 220;

function CardSkeleton() {
  return <div className={styles.skeletonCard} aria-hidden="true" />;
}

export function Catalog() {
  const { t } = usePreferences();
  const [activeCategory, setActiveCategory] =
    useState<CategoryFilter>("todos");
  const [query, setQuery] = useState("");

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalClosing, setModalClosing] = useState(false);
  const closingRef = useRef(false);

  const { products, loading, error, source } = useProducts();

  const filters: { id: CategoryFilter; label: string }[] = [
    { id: "todos", label: t("catalog.filter.all") },
    ...PRODUCT_CATEGORIES.map((c) => ({
      id: c.id,
      label: t(`catalog.filter.${c.id}`),
    })),
  ];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "todos" || product.category === activeCategory;
      const matchesQuery =
        q === "" ||
        product.name.toLowerCase().includes(q) ||
        product.shortDescription.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [products, activeCategory, query]);

  const handleOpen = useCallback((product: Product) => {
    setSelectedProduct(product);
    setModalClosing(false);
    closingRef.current = false;
  }, []);

  const handleClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    setModalClosing(true);
    window.setTimeout(() => {
      setSelectedProduct(null);
      setModalClosing(false);
      closingRef.current = false;
    }, MODAL_EXIT_MS);
  }, []);

  return (
    <section id="catalogo" className={styles.section}>
      <div className={styles.inner}>
        <Reveal>
          <div className={styles.header}>
            <p className={styles.eyebrow}>{t("catalog.eyebrow")}</p>
            <h2 className={styles.title}>{t("catalog.title")}</h2>
            <p className={styles.subtitle}>{t("catalog.subtitle")}</p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className={styles.controls}>
            <div className={styles.searchWrapper}>
              <Search
                size={16}
                className={styles.searchIcon}
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("catalog.search.placeholder")}
                className={styles.searchInput}
                aria-label={t("catalog.search.label")}
              />
            </div>

            <div
              className={styles.filters}
              role="group"
              aria-label={t("catalog.filters.label")}
            >
              <SlidersHorizontal
                size={16}
                className={styles.filtersIcon}
                aria-hidden="true"
              />
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveCategory(filter.id)}
                  className={`${styles.filter} ${
                    activeCategory === filter.id ? styles.filterActive : ""
                  }`}
                  aria-pressed={activeCategory === filter.id}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {source === "local" && error && (
          <div className={styles.notice} role="status">
            <AlertCircle size={14} aria-hidden="true" />
            {t("catalog.fallback.notice")}
          </div>
        )}

        {loading ? (
          <div
            className={styles.grid}
            aria-busy="true"
            aria-label={t("catalog.loading")}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <Reveal>
            <div className={styles.empty}>
              <p>{t("catalog.empty.message")}</p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory("todos");
                  setQuery("");
                }}
                className={styles.clearButton}
              >
                {t("catalog.empty.clear")}
              </button>
            </div>
          </Reveal>
        ) : (
          <div className={styles.grid}>
            {filtered.map((product, index) => (
              <Reveal
                key={product.id}
                delay={Math.min(index * 60, 300)}
                className={styles.gridItem}
              >
                <ProductCard product={product} onOpen={handleOpen} />
              </Reveal>
            ))}
          </div>
        )}

        {loading && (
          <p className={styles.loadingRow}>
            <Loader2 size={14} className={styles.spinner} aria-hidden="true" />
            {t("catalog.loading")}
          </p>
        )}
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          closing={modalClosing}
          onClose={handleClose}
        />
      )}
    </section>
  );
}