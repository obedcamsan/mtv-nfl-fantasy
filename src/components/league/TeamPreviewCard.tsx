import { GlowBorder } from "@/components/ui/GlowBorder";
import { PositionBadge } from "@/components/players/PositionBadge";
import type { DraftPick, FantasyTeam, Player } from "@/types/league";
import styles from "./TeamPreviewCard.module.css";

interface TeamPreviewCardProps {
  team: FantasyTeam;
  firstPick?: DraftPick;
  firstPickPlayer?: Player;
}

export function TeamPreviewCard({ team, firstPick, firstPickPlayer }: TeamPreviewCardProps) {
  return (
    <GlowBorder>
      <a href={`#team-${team.slug}`} className={styles.card}>
        <div className={styles.header}>
          <span className={styles.position}>#{team.draftPosition}</span>
          <span className={styles.manager}>{team.manager}</span>
        </div>

        <h3 className={styles.name}>{team.name}</h3>

        <div className={styles.firstPick}>
          {firstPick && firstPickPlayer ? (
            <>
              <span className={styles.firstPickLabel}>First Pick &middot; {firstPick.displayPick}</span>
              <span className={styles.firstPickPlayer}>
                <PositionBadge position={firstPickPlayer.position} />
                {firstPickPlayer.displayName}
                <span className={styles.firstPickTeam}>{firstPickPlayer.nflTeam}</span>
              </span>
            </>
          ) : (
            <span className={styles.firstPickLabel}>On the clock</span>
          )}
        </div>
      </a>
    </GlowBorder>
  );
}
