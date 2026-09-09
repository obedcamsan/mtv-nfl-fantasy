import { PlayerCard } from "@/components/players/PlayerCard";
import type { DraftPick, Player } from "@/types/league";
import styles from "./RosterGrid.module.css";

interface RosterGridProps {
  picks: DraftPick[];
  players: Player[];
}

export function RosterGrid({ picks, players }: RosterGridProps) {
  if (picks.length === 0) {
    return <p className="text-body">El roster de esta franquicia aún no está disponible.</p>;
  }

  const playersById = new Map(players.map((player) => [player.id, player]));

  return (
    <div className={styles.grid}>
      {picks.map((pick) => {
        const player = playersById.get(pick.playerId);
        if (!player) return null;
        return <PlayerCard key={pick.id} pick={pick} player={player} variant="compact" />;
      })}
    </div>
  );
}
