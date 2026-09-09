import type { CSSProperties } from "react";
import { getPositionTheme } from "@/lib/utils/position-theme";
import type { Position } from "@/types/league";
import styles from "./PositionBadge.module.css";

export function PositionBadge({ position }: { position: Position }) {
  const theme = getPositionTheme(position);
  const style = { "--badge-color": theme.color, "--badge-glow": theme.glow } as CSSProperties;

  return (
    <span className={styles.badge} style={style}>
      {theme.label}
    </span>
  );
}
