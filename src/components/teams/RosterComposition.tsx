import type { CSSProperties } from "react";
import { getPositionTheme } from "@/lib/utils/position-theme";
import type { Position, RosterComposition as RosterCompositionData } from "@/types/league";
import styles from "./RosterComposition.module.css";

const POSITION_ORDER: Position[] = ["QB", "RB", "WR", "TE", "K", "DEF"];

export function RosterComposition({ composition }: { composition: RosterCompositionData }) {
  return (
    <dl className={styles.strip} aria-label="Roster composition">
      {POSITION_ORDER.map((position) => {
        const theme = getPositionTheme(position);
        const style = { "--chip-color": theme.color } as CSSProperties;

        return (
          <div key={position} className={styles.chip} style={style}>
            <dt className={styles.label}>{theme.label}</dt>
            <dd className={styles.count}>{composition[position]}</dd>
          </div>
        );
      })}
    </dl>
  );
}
