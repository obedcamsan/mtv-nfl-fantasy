import styles from "./RoundBadge.module.css";

export function RoundBadge({ round }: { round: number }) {
  return <span className={styles.badge}>ROUND {round}</span>;
}
