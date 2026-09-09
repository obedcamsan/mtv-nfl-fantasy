import type { DraftPick } from "@/types/league";

export interface RawDraftPick {
  /** "round.pick" notation as delivered in the source data, e.g. "2.10". Presentation-only. */
  displayPick: string;
  teamId: string;
  playerId: string;
}

interface ParsedDisplayPick {
  round: number;
  chronologicalPickInRound: number;
}

/**
 * Parses "round.pick" notation. The number after the dot is the chronological
 * pick within the round (the order picks actually happened), matching the
 * source data's own convention — verified against every team in the real
 * dataset: a team's number alternates between its draft slot and
 * (teamCount + 1 - slot) each round, which only happens under snake reversal
 * of a chronological count. It is NOT a fixed per-team draft slot.
 */
export function parseDisplayPick(displayPick: string): ParsedDisplayPick {
  const match = /^(\d+)\.(\d+)$/.exec(displayPick.trim());
  if (!match) {
    throw new Error(`Invalid displayPick format: "${displayPick}"`);
  }

  return {
    round: Number(match[1]),
    chronologicalPickInRound: Number(match[2]),
  };
}

/** Self-inverse: also recovers chronologicalPickInRound from a draftSlot, and vice versa. */
export function computeDraftSlot(round: number, chronologicalPickInRound: number, teamCount: number): number {
  return round % 2 === 1 ? chronologicalPickInRound : teamCount + 1 - chronologicalPickInRound;
}

export function computeOverallPick(
  round: number,
  chronologicalPickInRound: number,
  teamCount: number,
): number {
  return (round - 1) * teamCount + chronologicalPickInRound;
}

export function normalizeDraftPicks(
  rawPicks: RawDraftPick[],
  teamCount: number,
): DraftPick[] {
  return rawPicks.map((raw, index) => {
    const { round, chronologicalPickInRound } = parseDisplayPick(raw.displayPick);
    const draftSlot = computeDraftSlot(round, chronologicalPickInRound, teamCount);
    const overallPick = computeOverallPick(round, chronologicalPickInRound, teamCount);

    return {
      id: `pick-${String(index + 1).padStart(3, "0")}`,
      round,
      draftSlot,
      chronologicalPickInRound,
      overallPick,
      displayPick: raw.displayPick,
      teamId: raw.teamId,
      playerId: raw.playerId,
    } satisfies DraftPick;
  });
}
