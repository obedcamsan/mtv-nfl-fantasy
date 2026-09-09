import type { ReactNode } from "react";
import styles from "./SectionHeader.module.css";

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
}

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <header className={styles.header}>
      {eyebrow ? <p className={`text-eyebrow ${styles.eyebrow}`}>{eyebrow}</p> : null}
      <h2 className={`text-display-lg ${styles.title}`}>{title}</h2>
      {description ? <p className={`text-body ${styles.description}`}>{description}</p> : null}
    </header>
  );
}
