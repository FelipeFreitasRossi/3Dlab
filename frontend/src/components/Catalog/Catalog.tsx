import { useCallback, useMemo, useRef, useState } from "react";
import { AlertCircle, Loader2, Search, SlidersHorizontal } from "lucide-react";
import { useProducts } from "../../hooks/useProducts";
import { PRODUCT_CATEGORIES } from "../../types/product";
import type { CategoryFilter, Product } from "../../types/product";
import { Reveal } from "../Reveal/Reveal";
import { ProductCard } from "./ProductCard";
import { ProductModal } from "./ProductModal";
import styles from "./Catalog.module.css";

const ALL_FILTERS: { id: CategoryFilter; label: string }[] = [
  { id: "todos", label: "Todos" },
  ...PRODUCT_CATEGORIES.map((c) => ({ id: c.id, label: c.label })),
];

const MODAL_EXIT_MS = 220;

function CardSkeleton() {
  return <div className={styles.skeletonCard} aria-hidden="true" />;
}

export function Catalog() {
  const [activeCategory, setActiveCategory] =
    useState<CategoryFilter>("todos");
  const [query, setQuery] = useState("");

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalClosing, setModalClosing] = useState(false);
  const closingRef = useRef(false);

  const { products, loading, error, source } = useProducts();

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
            <p className={styles.eyebrow}>Catálogo</p>
            <h2 className={styles.title}>Peças prontas e sob medida.</h2>
            <p className={styles.subtitle}>
              Cada peça pode ser personalizada — o contato direto pelo
              WhatsApp define cor, acabamento e prazo.
            </p>
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
                placeholder="Buscar por nome ou descrição..."
                className={styles.searchInput}
                aria-label="Buscar produtos"
              />
            </div>

            <div
              className={styles.filters}
              role="group"
              aria-label="Filtrar por categoria"
            >
              <SlidersHorizontal
                size={16}
                className={styles.filtersIcon}
                aria-hidden="true"
              />
              {ALL_FILTERS.map((filter) => (
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

        {/* Aviso discreto se estamos com fallback local */}
        {source === "local" && error && (
          <div className={styles.notice} role="status">
            <AlertCircle size={14} aria-hidden="true" />
            Exibindo produtos de demonstração — API indisponível no momento.
          </div>
        )}

        {loading ? (
          <div className={styles.grid} aria-busy="true" aria-label="Carregando produtos">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <Reveal>
            <div className={styles.empty}>
              <p>Nenhum produto encontrado para essa combinação.</p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory("todos");
                  setQuery("");
                }}
                className={styles.clearButton}
              >
                Limpar filtros
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
            Carregando catálogo...
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