import { useMemo } from "react";
import { useLeague, type UseLeagueResult } from "./useLeague";
import { buildDraftBoard, type DraftBoardRow } from "@/lib/draft/board";
import { getFirstRoundPicks } from "@/lib/draft/stats";
import type { DraftPick } from "@/types/league";

export interface UseDraftResult extends UseLeagueResult {
  picks: DraftPick[];
  firstRound: DraftPick[];
  board: DraftBoardRow[];
}

export function useDraft(season = 2026): UseDraftResult {
  const { league, ...rest } = useLeague(season);

  const picks = useMemo(() => league?.picks ?? [], [league]);

  const firstRound = useMemo(() => getFirstRoundPicks(picks), [picks]);
  const board = useMemo(() => buildDraftBoard(picks, league?.teams ?? []), [picks, league]);

  return { league, picks, firstRound, board, ...rest };
}
