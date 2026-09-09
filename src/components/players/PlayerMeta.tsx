import { PositionBadge } from "./PositionBadge";
import type { Player } from "@/types/league";
import styles from "./PlayerMeta.module.css";

export function PlayerMeta({ player }: { player: Player }) {
  return (
    <div className={styles.meta}>
      <span className={styles.name}>{player.displayName}</span>
      <span className={styles.line}>
        <PositionBadge position={player.position} />
        <span className={styles.team}>{player.nflTeam}</span>
      </span>
    </div>
  );
}
