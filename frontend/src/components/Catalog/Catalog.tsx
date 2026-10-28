import { useCallback, useMemo, useRef, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { usePreferences } from "../../context/usePreferences";
import { useProducts } from "../../hooks/useProducts";
import { useSectionFx } from "../../hooks/useSectionFx";
import { PRODUCT_CATEGORIES } from "../../types/product";
import type { CategoryFilter, Product } from "../../types/product";
import { Reveal } from "../Reveal/Reveal";
import { ProductCard } from "./ProductCard";
import { ProductModal } from "./ProductModal";
import { ProductSkeleton } from "./ProductSkeleton";
import styles from "./Catalog.module.css";

const FILTER_IDS: CategoryFilter[] = [
  "todos",
  ...PRODUCT_CATEGORIES.map((c) => c.id),
];

const SKELETON_COUNT = 6;

const MODAL_EXIT_MS = 220;

export function Catalog() {
  const { t } = usePreferences();
  const { products, loading } = useProducts();
  const sectionRef = useSectionFx<HTMLElement>();
  const [activeCategory, setActiveCategory] =
    useState<CategoryFilter>("todos");
  const [query, setQuery] = useState("");

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalClosing, setModalClosing] = useState(false);
  const closingRef = useRef(false);

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
    <section ref={sectionRef} id="catalogo" className={styles.section}>
      <div className={`${styles.inner} fx-fade`}>
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
                placeholder={t("catalog.searchPlaceholder")}
                className={styles.searchInput}
                aria-label={t("catalog.searchLabel")}
              />
            </div>

            <div
              className={styles.filters}
              role="group"
              aria-label={t("catalog.filterLabel")}
            >
              <SlidersHorizontal
                size={16}
                className={styles.filtersIcon}
                aria-hidden="true"
              />
              {FILTER_IDS.map((filterId) => (
                <button
                  key={filterId}
                  type="button"
                  onClick={() => setActiveCategory(filterId)}
                  className={`${styles.filter} ${
                    activeCategory === filterId ? styles.filterActive : ""
                  }`}
                  aria-pressed={activeCategory === filterId}
                >
                  {filterId === "todos"
                    ? t("catalog.all")
                    : t(`categories.${filterId}`)}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {loading ? (
          <div
            className={styles.grid}
            aria-busy="true"
            aria-label={t("catalog.loading")}
          >
            {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <div key={i} className={styles.gridItem}>
                <ProductSkeleton />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <Reveal>
            <div className={styles.empty}>
              <p>{t("catalog.empty")}</p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory("todos");
                  setQuery("");
                }}
                className={styles.clearButton}
              >
                {t("catalog.clear")}
              </button>
            </div>
          </Reveal>
        ) : (
          <div className={styles.grid}>
            {filtered.map((product, index) => (
              <Reveal
                key={product.id}
                // stagger: cada coluna entra um pouco depois da anterior,
                // cada linha um pouco depois da de cima
                delay={(index % 3) * 90 + Math.floor(index / 3) * 50}
                distance={36}
                scale
                className={styles.gridItem}
              >
                <ProductCard product={product} onOpen={handleOpen} />
              </Reveal>
            ))}
          </div>
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