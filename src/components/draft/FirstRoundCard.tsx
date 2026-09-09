import { PlayerImage } from "@/components/players/PlayerImage";
import { PositionBadge } from "@/components/players/PositionBadge";
import { PickBadge } from "./PickBadge";
import type { DraftPick, FantasyTeam, Player } from "@/types/league";
import styles from "./FirstRoundCard.module.css";

interface FirstRoundCardProps {
  pick: DraftPick;
  player: Player;
  team: FantasyTeam;
  priority?: boolean;
}

export function FirstRoundCard({ pick, player, team, priority = false }: FirstRoundCardProps) {
  return (
    <article className={styles.card}>
      <PickBadge displayPick={pick.displayPick} />

      <PlayerImage
        sleeperId={player.sleeperId}
        alt={`${player.displayName}, selección ${pick.displayPick} de ${team.name}`}
        priority={priority}
      />

      <div className={styles.meta}>
        <span className={styles.name}>{player.displayName}</span>
        <span className={styles.line}>
          <PositionBadge position={player.position} />
          <span className={styles.team}>{player.nflTeam}</span>
        </span>
        <span className={styles.franchise}>{team.name}</span>
      </div>
    </article>
  );
}
