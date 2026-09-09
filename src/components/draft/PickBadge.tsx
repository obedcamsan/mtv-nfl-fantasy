import styles from "./PickBadge.module.css";

export function PickBadge({ displayPick }: { displayPick: string }) {
  return <span className={styles.badge}>PICK {displayPick}</span>;
}
