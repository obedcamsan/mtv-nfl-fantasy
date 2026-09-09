import type { FantasyTeam } from "@/types/league";
import styles from "./DraftBoardHeader.module.css";

export function DraftBoardHeader({ teams }: { teams: FantasyTeam[] }) {
  const teamsBySlot = new Map(teams.map((team) => [team.draftPosition, team]));

  return (
    <div className={styles.row} role="row">
      <div className={styles.corner} role="columnheader" aria-hidden="true" />
      {Array.from({ length: teams.length }, (_, index) => index + 1).map((slot) => {
        const team = teamsBySlot.get(slot);
        return (
          <div key={slot} className={styles.cell} role="columnheader">
            <span className={styles.slot}>SLOT {slot}</span>
            <span className={styles.name}>{team?.name ?? "—"}</span>
          </div>
        );
      })}
    </div>
  );
}
