import { FranchiseCard } from "./FranchiseCard";
import { getTeamPicks } from "@/lib/draft/stats";
import type { DraftPick, FantasyTeam, Player } from "@/types/league";
import styles from "./FranchiseGrid.module.css";

interface FranchiseGridProps {
  teams: FantasyTeam[];
  picks: DraftPick[];
  players: Player[];
}

export function FranchiseGrid({ teams, picks, players }: FranchiseGridProps) {
  return (
    <div className={styles.grid}>
      {teams
        .toSorted((a, b) => a.draftPosition - b.draftPosition)
        .map((team) => (
          <FranchiseCard key={team.id} team={team} picks={getTeamPicks(team.id, picks)} players={players} />
        ))}
    </div>
  );
}
