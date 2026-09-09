import type { DraftPick, Player, Position, RosterComposition } from "@/types/league";

const EMPTY_COMPOSITION: RosterComposition = {
  QB: 0,
  RB: 0,
  WR: 0,
  TE: 0,
  K: 0,
  DEF: 0,
};

export function getTeamPicks(teamId: string, picks: DraftPick[]): DraftPick[] {
  return picks.filter((pick) => pick.teamId === teamId).toSorted((a, b) => a.overallPick - b.overallPick);
}

export function getFirstPick(teamId: string, picks: DraftPick[]): DraftPick | undefined {
  return getTeamPicks(teamId, picks)[0];
}

export function getFirstRoundPicks(picks: DraftPick[]): DraftPick[] {
  return picks.filter((pick) => pick.round === 1).toSorted((a, b) => a.overallPick - b.overallPick);
}

export function getRosterComposition(picks: DraftPick[], players: Player[]): RosterComposition {
  const playersById = new Map(players.map((player) => [player.id, player]));
  const composition: RosterComposition = { ...EMPTY_COMPOSITION };

  for (const pick of picks) {
    const position = playersById.get(pick.playerId)?.position;
    if (position) {
      composition[position] += 1;
    }
  }

  return composition;
}

export function getPositionForPlayer(playerId: string, players: Player[]): Position | undefined {
  return players.find((player) => player.id === playerId)?.position;
}
