import { useMemo } from "react";
import { useLeague } from "./useLeague";
import { getFirstPick, getRosterComposition, getTeamPicks } from "@/lib/draft/stats";
import type { DraftPick, FantasyTeam, RosterComposition } from "@/types/league";

export interface UseTeamRosterResult {
  team: FantasyTeam | null;
  picks: DraftPick[];
  firstPick: DraftPick | undefined;
  composition: RosterComposition | null;
  loading: boolean;
  error: Error | undefined;
}

export function useTeamRoster(teamSlug: string, season = 2026): UseTeamRosterResult {
  const { league, loading, error } = useLeague(season);

  const team = league?.teams.find((candidate) => candidate.slug === teamSlug) ?? null;

  const picks = useMemo(
    () => (league && team ? getTeamPicks(team.id, league.picks) : []),
    [league, team],
  );

  const firstPick = useMemo(
    () => (league && team ? getFirstPick(team.id, league.picks) : undefined),
    [league, team],
  );

  const composition = useMemo(
    () => (league ? getRosterComposition(picks, league.players) : null),
    [league, picks],
  );

  return { team, picks, firstPick, composition, loading, error };
}
