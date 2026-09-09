import { PositionBadge } from "@/components/players/PositionBadge";
import type { DraftPick, Player } from "@/types/league";
import styles from "./DraftBoardCell.module.css";

interface DraftBoardCellProps {
  pick: DraftPick | null;
  player?: Player;
}

export function DraftBoardCell({ pick, player }: DraftBoardCellProps) {
  if (!pick || !player) {
    return (
      <div className={styles.cell} data-empty="true">
        <span className={styles.empty}>&mdash;</span>
      </div>
    );
  }

  return (
    <div className={styles.cell}>
      <span className={styles.player}>{player.displayName}</span>
      <span className={styles.line}>
        <PositionBadge position={player.position} />
        <span className={styles.team}>{player.nflTeam}</span>
      </span>
      <span className={styles.pick}>{pick.displayPick}</span>
    </div>
  );
}
