import type { ReactNode } from "react";
import styles from "./HorizontalScroller.module.css";

export function HorizontalScroller({ children, ariaLabel }: { children: ReactNode; ariaLabel: string }) {
  return (
    <div className={styles.scroller} role="region" aria-label={ariaLabel} tabIndex={0}>
      {children}
    </div>
  );
}
