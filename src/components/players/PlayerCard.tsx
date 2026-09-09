import { PlayerImage } from "./PlayerImage";
import { PlayerMeta } from "./PlayerMeta";
import { DefenseCard } from "./DefenseCard";
import type { DraftPick, Player } from "@/types/league";
import styles from "./PlayerCard.module.css";

export interface PlayerCardProps {
  player: Player;
  pick: DraftPick;
  variant?: "compact" | "standard" | "featured";
  priority?: boolean;
}

export function PlayerCard({ player, pick, variant = "standard", priority = false }: PlayerCardProps) {
  if (player.position === "DEF") {
    return <DefenseCard player={player} pick={pick} variant={variant} />;
  }

  return (
    <article className={`${styles.card} ${styles[variant]}`}>
      <span className={styles.pick}>PICK {pick.displayPick}</span>
      <PlayerImage
        sleeperId={player.sleeperId}
        alt={`${player.displayName}, selección ${pick.displayPick}`}
        priority={priority}
      />
      <PlayerMeta player={player} />
    </article>
  );
}
