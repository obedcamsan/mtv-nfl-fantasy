import type { League2026QueryResult } from "@/graphql/queries/league.types";
import type { DraftPick, League, Player } from "@/types/league";
import { computeDraftSlot, computeOverallPick } from "./normalize";

export function leagueFromQueryResult(data: League2026QueryResult["league"]): League | null {
  if (!data) return null;

  const teamCount = data.teams.length;
  const playersById = new Map<string, Player>();
  const picks: DraftPick[] = [];

  for (const node of data.draft.picks) {
    if (node.player) {
      playersById.set(node.player.id, node.player);
    }

    const chronologicalPickInRound = node.roundPick;
    const draftSlot = computeDraftSlot(node.round, chronologicalPickInRound, teamCount);

    picks.push({
      id: node.id,
      round: node.round,
      draftSlot,
      chronologicalPickInRound,
      overallPick: node.overallPick ?? computeOverallPick(node.round, chronologicalPickInRound, teamCount),
      displayPick: node.displayPick,
      teamId: node.team.id,
      playerId: node.player?.id ?? "",
    });
  }

  return {
    id: data.id,
    name: data.name,
    season: data.season,
    rounds: data.rounds,
    teams: data.teams,
    players: Array.from(playersById.values()),
    picks,
  };
}
