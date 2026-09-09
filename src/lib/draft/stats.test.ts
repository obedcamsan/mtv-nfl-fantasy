import { describe, expect, it } from "vitest";
import { getFirstPick, getFirstRoundPicks, getRosterComposition } from "./stats";
import { normalizeDraftPicks } from "./normalize";
import type { Player } from "@/types/league";

const players: Player[] = [
  { id: "p1", sleeperId: null, displayName: "J. Gibbs", position: "RB", nflTeam: "DET" },
  { id: "p2", sleeperId: null, displayName: "J. Chase", position: "WR", nflTeam: "CIN" },
  { id: "p3", sleeperId: null, displayName: "P. Mahomes", position: "QB", nflTeam: "KC" },
];

describe("getRosterComposition", () => {
  it("derives position counts from picks, never from a stored summary", () => {
    const picks = normalizeDraftPicks(
      [
        { displayPick: "1.01", teamId: "team-1", playerId: "p1" },
        { displayPick: "2.10", teamId: "team-1", playerId: "p2" },
        { displayPick: "3.01", teamId: "team-1", playerId: "p3" },
      ],
      10,
    );

    expect(getRosterComposition(picks, players)).toEqual({
      QB: 1,
      RB: 1,
      WR: 1,
      TE: 0,
      K: 0,
      DEF: 0,
    });
  });
});

describe("getFirstPick", () => {
  it("derives the first pick by lowest overallPick, not by round === 1", () => {
    const picks = normalizeDraftPicks(
      [
        { displayPick: "2.10", teamId: "team-10", playerId: "p1" },
        { displayPick: "1.10", teamId: "team-10", playerId: "p2" },
      ],
      10,
    );

    const firstPick = getFirstPick("team-10", picks);
    expect(firstPick?.playerId).toBe("p2");
    expect(firstPick?.overallPick).toBe(10);
  });
});

describe("getFirstRoundPicks", () => {
  it("filters round 1 picks and orders them by overallPick", () => {
    const picks = normalizeDraftPicks(
      [
        { displayPick: "1.10", teamId: "team-10", playerId: "p1" },
        { displayPick: "1.01", teamId: "team-1", playerId: "p2" },
        { displayPick: "2.01", teamId: "team-1", playerId: "p3" },
      ],
      10,
    );

    const firstRound = getFirstRoundPicks(picks);
    expect(firstRound.map((pick) => pick.playerId)).toEqual(["p2", "p1"]);
  });
});
