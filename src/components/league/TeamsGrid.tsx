import { TeamPreviewCard } from "./TeamPreviewCard";
import { getFirstPick } from "@/lib/draft/stats";
import type { DraftPick, FantasyTeam, Player } from "@/types/league";
import styles from "./TeamsGrid.module.css";

interface TeamsGridProps {
  teams: FantasyTeam[];
  picks: DraftPick[];
  players: Player[];
}

export function TeamsGrid({ teams, picks, players }: TeamsGridProps) {
  const playersById = new Map(players.map((player) => [player.id, player]));

  return (
    <div className={styles.grid}>
      {teams
        .toSorted((a, b) => a.draftPosition - b.draftPosition)
        .map((team) => {
          const firstPick = getFirstPick(team.id, picks);
          const firstPickPlayer = firstPick ? playersById.get(firstPick.playerId) : undefined;

          return (
            <TeamPreviewCard key={team.id} team={team} firstPick={firstPick} firstPickPlayer={firstPickPlayer} />
          );
        })}
    </div>
  );
}
