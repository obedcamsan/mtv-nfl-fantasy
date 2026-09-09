import styles from "./Skeleton.module.css";

export function Skeleton({ height = "1em", width = "100%" }: { height?: string; width?: string }) {
  return <div className={styles.skeleton} style={{ height, width }} aria-hidden="true" />;
}
