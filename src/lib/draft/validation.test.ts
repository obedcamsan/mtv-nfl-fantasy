import { describe, expect, it } from "vitest";
import { validateLeagueData } from "./validation";
import { computeDraftSlot, normalizeDraftPicks } from "./normalize";
import type { FantasyTeam, League, Player } from "@/types/league";

function buildValidLeague(): League {
  const teams: FantasyTeam[] = Array.from({ length: 10 }, (_, index) => ({
    id: `team-${index + 1}`,
    slug: `team-${index + 1}`,
    name: `Team ${index + 1}`,
    manager: `Manager ${index + 1}`,
    draftPosition: index + 1,
  }));

  const players: Player[] = [];
  const rawPicks: Array<{ displayPick: string; teamId: string; playerId: string }> = [];

  // Build a self-consistent snake draft: for each team's known draftPosition,
  // compute the chronological-pick-in-round number a real draft would produce
  // (computeDraftSlot is its own inverse), so `pick.draftSlot` derived by
  // normalizeDraftPicks ends up matching the team's actual draftPosition.
  for (let round = 1; round <= 2; round += 1) {
    for (const team of teams) {
      const chronologicalPickInRound = computeDraftSlot(round, team.draftPosition, teams.length);
      const playerId = `player-${round}-${team.draftPosition}`;
      players.push({ id: playerId, sleeperId: null, displayName: playerId, position: "RB", nflTeam: "DAL" });
      rawPicks.push({
        displayPick: `${round}.${String(chronologicalPickInRound).padStart(2, "0")}`,
        teamId: team.id,
        playerId,
      });
    }
  }

  return {
    id: "league-2026",
    name: "MTV League",
    season: 2026,
    rounds: 2,
    teams,
    players,
    picks: normalizeDraftPicks(rawPicks, teams.length),
  };
}

describe("validateLeagueData", () => {
  it("returns no errors for a structurally sound league", () => {
    expect(validateLeagueData(buildValidLeague())).toEqual([]);
  });

  it("flags a pick referencing an unknown teamId", () => {
    const league = buildValidLeague();
    league.picks[0] = { ...league.picks[0], teamId: "ghost-team" };

    const errors = validateLeagueData(league);
    expect(errors.some((error) => error.includes("ghost-team"))).toBe(true);
  });

  it("flags a team with the wrong number of picks", () => {
    const league = buildValidLeague();
    league.picks = league.picks.filter((pick) => pick.teamId !== "team-1");

    const errors = validateLeagueData(league);
    expect(errors.some((error) => error.includes('"team-1"'))).toBe(true);
  });

  it("flags duplicate overallPick values", () => {
    const league = buildValidLeague();
    league.picks[1] = { ...league.picks[1], overallPick: league.picks[0].overallPick };

    const errors = validateLeagueData(league);
    expect(errors.some((error) => error.includes("Duplicate overallPick"))).toBe(true);
  });

  it("flags a pick whose draftSlot doesn't match its team's draftPosition", () => {
    const league = buildValidLeague();
    // Swap two picks' teamId so their draftSlot no longer matches the owning team.
    const [first, second] = league.picks;
    league.picks[0] = { ...first, teamId: second.teamId };
    league.picks[1] = { ...second, teamId: first.teamId };

    const errors = validateLeagueData(league);
    expect(errors.some((error) => error.includes("owns draft position"))).toBe(true);
  });
});
