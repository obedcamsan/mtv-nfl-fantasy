import styles from "./Stat.module.css";

interface StatProps {
  value: string | number;
  label: string;
}

export function Stat({ value, label }: StatProps) {
  return (
    <div className={styles.stat}>
      <span className={`text-display-lg ${styles.value}`}>{value}</span>
      <span className={`text-eyebrow ${styles.label}`}>{label}</span>
    </div>
  );
}
