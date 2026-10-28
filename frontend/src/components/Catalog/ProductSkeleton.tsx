import styles from "./ProductSkeleton.module.css";

/** Cartão "fantasma" mostrado enquanto os produtos carregam. */
export function ProductSkeleton() {
  return (
    <div className={styles.card} aria-hidden="true">
      <div className={`${styles.block} ${styles.image}`} />
      <div className={styles.body}>
        <div className={`${styles.block} ${styles.lineLg}`} />
        <div className={`${styles.block} ${styles.line}`} />
        <div className={`${styles.block} ${styles.lineShort}`} />
      </div>
      <div className={styles.footer}>
        <div className={`${styles.block} ${styles.price}`} />
        <div className={`${styles.block} ${styles.button}`} />
      </div>
    </div>
  );
}
