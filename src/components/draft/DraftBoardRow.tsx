import { DraftBoardCell } from "./DraftBoardCell";
import type { DraftBoardRow as DraftBoardRowData } from "@/lib/draft/board";
import type { Player } from "@/types/league";
import styles from "./DraftBoardRow.module.css";

export function DraftBoardRow({ row, players }: { row: DraftBoardRowData; players: Player[] }) {
  const playersById = new Map(players.map((player) => [player.id, player]));

  return (
    <div className={styles.row} role="row">
      <div className={styles.roundLabel} role="rowheader">
        R{row.round}
      </div>
      {row.slots.map((slot) => (
        <div key={slot.draftSlot} role="cell">
          <DraftBoardCell
            pick={slot.pick}
            player={slot.pick ? playersById.get(slot.pick.playerId) : undefined}
          />
        </div>
      ))}
    </div>
  );
}
