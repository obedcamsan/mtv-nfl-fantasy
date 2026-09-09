import { describe, expect, it } from "vitest";
import {
  computeDraftSlot,
  computeOverallPick,
  normalizeDraftPicks,
  parseDisplayPick,
} from "./normalize";

const TEAM_COUNT = 10;

describe("parseDisplayPick", () => {
  it("parses round.pick notation", () => {
    expect(parseDisplayPick("2.10")).toEqual({ round: 2, chronologicalPickInRound: 10 });
  });

  it("throws on malformed input", () => {
    expect(() => parseDisplayPick("not-a-pick")).toThrow();
  });
});

describe("snake draft chronology (10-team league)", () => {
  // The number after the dot is the chronological pick within the round (verified
  // against the real dataset: a team's number alternates between its draft slot and
  // (teamCount + 1 - slot) each round, which is the signature of snake reversal).
  const cases: Array<{
    displayPick: string;
    round: number;
    chronologicalPickInRound: number;
    draftSlot: number;
    overallPick: number;
  }> = [
    { displayPick: "1.01", round: 1, chronologicalPickInRound: 1, draftSlot: 1, overallPick: 1 },
    { displayPick: "1.10", round: 1, chronologicalPickInRound: 10, draftSlot: 10, overallPick: 10 },
    { displayPick: "2.10", round: 2, chronologicalPickInRound: 10, draftSlot: 1, overallPick: 20 },
    { displayPick: "2.01", round: 2, chronologicalPickInRound: 1, draftSlot: 10, overallPick: 11 },
    { displayPick: "3.01", round: 3, chronologicalPickInRound: 1, draftSlot: 1, overallPick: 21 },
    { displayPick: "3.10", round: 3, chronologicalPickInRound: 10, draftSlot: 10, overallPick: 30 },
  ];

  it.each(cases)(
    "$displayPick -> round $round / chronological $chronologicalPickInRound / slot $draftSlot / overall $overallPick",
    ({ displayPick, round, chronologicalPickInRound, draftSlot, overallPick }) => {
      const parsed = parseDisplayPick(displayPick);
      expect(parsed).toEqual({ round, chronologicalPickInRound });

      expect(computeDraftSlot(parsed.round, parsed.chronologicalPickInRound, TEAM_COUNT)).toBe(draftSlot);
      expect(computeOverallPick(parsed.round, parsed.chronologicalPickInRound, TEAM_COUNT)).toBe(overallPick);
    },
  );
});

describe("normalizeDraftPicks", () => {
  it("produces fully-derived DraftPick objects and preserves source order via id", () => {
    const [first, second] = normalizeDraftPicks(
      [
        { displayPick: "2.10", teamId: "team-a", playerId: "player-a" },
        { displayPick: "2.01", teamId: "team-b", playerId: "player-b" },
      ],
      TEAM_COUNT,
    );

    expect(first).toMatchObject({
      round: 2,
      chronologicalPickInRound: 10,
      draftSlot: 1,
      overallPick: 20,
      displayPick: "2.10",
      teamId: "team-a",
      playerId: "player-a",
    });

    expect(second).toMatchObject({
      round: 2,
      chronologicalPickInRound: 1,
      draftSlot: 10,
      overallPick: 11,
    });
  });
});
