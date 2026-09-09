import type { DraftPick, FantasyTeam } from "@/types/league";

export interface DraftBoardCell {
  draftSlot: number;
  teamId: string;
  pick: DraftPick | null;
}

export interface DraftBoardRow {
  round: number;
  slots: DraftBoardCell[];
}

/**
 * Builds a 14-round x 10-slot board where columns represent original draft
 * slots (snake position), not chronological order within the round.
 */
export function buildDraftBoard(picks: DraftPick[], teams: FantasyTeam[]): DraftBoardRow[] {
  const teamsBySlot = new Map(teams.map((team) => [team.draftPosition, team]));
  const picksByRoundAndSlot = new Map<string, DraftPick>();

  for (const pick of picks) {
    picksByRoundAndSlot.set(`${pick.round}:${pick.draftSlot}`, pick);
  }

  const rounds = picks.reduce((max, pick) => Math.max(max, pick.round), 0);
  const slotCount = teams.length;

  const board: DraftBoardRow[] = [];

  for (let round = 1; round <= rounds; round += 1) {
    const slots: DraftBoardCell[] = [];

    for (let draftSlot = 1; draftSlot <= slotCount; draftSlot += 1) {
      const team = teamsBySlot.get(draftSlot);

      slots.push({
        draftSlot,
        teamId: team?.id ?? "",
        pick: picksByRoundAndSlot.get(`${round}:${draftSlot}`) ?? null,
      });
    }

    board.push({ round, slots });
  }

  return board;
}
