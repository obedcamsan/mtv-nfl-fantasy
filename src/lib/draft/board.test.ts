import { describe, expect, it } from "vitest";
import { buildDraftBoard } from "./board";
import { normalizeDraftPicks } from "./normalize";
import type { FantasyTeam } from "@/types/league";

const teams: FantasyTeam[] = Array.from({ length: 10 }, (_, index) => ({
  id: `team-${index + 1}`,
  slug: `team-${index + 1}`,
  name: `Team ${index + 1}`,
  manager: `Manager ${index + 1}`,
  draftPosition: index + 1,
}));

describe("buildDraftBoard", () => {
  it("maps round 2 picks to their owning team's draft slot column (snake reversal)", () => {
    // team-1 (slot 1) picks 1st in round 1 ("1.01") and last in round 2 ("2.10").
    // team-10 (slot 10) picks last in round 1 ("1.10") and first in round 2 ("2.01").
    const picks = normalizeDraftPicks(
      [
        { displayPick: "1.01", teamId: "team-1", playerId: "p1" },
        { displayPick: "1.10", teamId: "team-10", playerId: "p10" },
        { displayPick: "2.10", teamId: "team-1", playerId: "p11" },
        { displayPick: "2.01", teamId: "team-10", playerId: "p12" },
      ],
      teams.length,
    );

    const board = buildDraftBoard(picks, teams);
    const round2 = board.find((row) => row.round === 2)!;

    expect(round2.slots[0].pick?.playerId).toBe("p11");
    expect(round2.slots[0].pick?.overallPick).toBe(20);

    expect(round2.slots[9].pick?.playerId).toBe("p12");
    expect(round2.slots[9].pick?.overallPick).toBe(11);
  });

  it("returns a null cell for a slot with no pick yet", () => {
    const picks = normalizeDraftPicks([{ displayPick: "1.01", teamId: "team-1", playerId: "p1" }], teams.length);

    const board = buildDraftBoard(picks, teams);
    const round1 = board[0];

    expect(round1.slots[0].pick).not.toBeNull();
    expect(round1.slots[1].pick).toBeNull();
    expect(round1.slots[1].teamId).toBe("team-2");
  });
});
