import { PositionBadge } from "./PositionBadge";
import type { DraftPick, Player } from "@/types/league";
import styles from "./DefenseCard.module.css";

interface DefenseCardProps {
  player: Player;
  pick: DraftPick;
  variant?: "compact" | "standard" | "featured";
}

export function DefenseCard({ player, pick, variant = "standard" }: DefenseCardProps) {
  return (
    <article className={`${styles.card} ${styles[variant]}`}>
      <span className={styles.pick}>PICK {pick.displayPick}</span>
      <div className={styles.mark} aria-hidden="true">
        DEF
      </div>
      <div className={styles.meta}>
        <span className={styles.name}>{player.displayName.toUpperCase()}</span>
        <span className={styles.line}>
          <PositionBadge position="DEF" />
          <span className={styles.team}>{player.nflTeam}</span>
        </span>
      </div>
    </article>
  );
}
