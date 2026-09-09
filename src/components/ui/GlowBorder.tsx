import type { CSSProperties, ReactNode } from "react";
import styles from "./GlowBorder.module.css";

export function GlowBorder({ children, accent }: { children: ReactNode; accent?: string }) {
  const style = accent ? ({ "--glow-color": accent } as CSSProperties) : undefined;

  return (
    <div className={styles.glow} style={style}>
      {children}
    </div>
  );
}
