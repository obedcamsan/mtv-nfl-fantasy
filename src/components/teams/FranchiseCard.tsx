import { FranchiseHeader } from "./FranchiseHeader";
import { RosterComposition } from "./RosterComposition";
import { RosterGrid } from "./RosterGrid";
import { getRosterComposition } from "@/lib/draft/stats";
import type { DraftPick, FantasyTeam, Player } from "@/types/league";
import styles from "./FranchiseCard.module.css";

interface FranchiseCardProps {
  team: FantasyTeam;
  picks: DraftPick[];
  players: Player[];
}

export function FranchiseCard({ team, picks, players }: FranchiseCardProps) {
  const composition = getRosterComposition(picks, players);

  return (
    <article id={`team-${team.slug}`} className={styles.card}>
      <FranchiseHeader team={team} />

      <div className={styles.body}>
        <RosterComposition composition={composition} />
        <RosterGrid picks={picks} players={players} />
      </div>
    </article>
  );
}
