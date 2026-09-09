import { DraftBoardHeader } from "./DraftBoardHeader";
import { DraftBoardRow } from "./DraftBoardRow";
import type { DraftBoardRow as DraftBoardRowData } from "@/lib/draft/board";
import type { FantasyTeam, Player } from "@/types/league";
import styles from "./DraftBoard.module.css";

interface DraftBoardProps {
  board: DraftBoardRowData[];
  teams: FantasyTeam[];
  players: Player[];
}

export function DraftBoard({ board, teams, players }: DraftBoardProps) {
  if (board.length === 0) {
    return <p className="text-body">El draft board aún no está disponible.</p>;
  }

  return (
    <div className={styles.wrapper} role="region" aria-label="Draft board completo, 14 rondas" tabIndex={0}>
      <div className={styles.table} role="table">
        <DraftBoardHeader teams={teams} />
        {board.map((row) => (
          <DraftBoardRow key={row.round} row={row} players={players} />
        ))}
      </div>
    </div>
  );
}
