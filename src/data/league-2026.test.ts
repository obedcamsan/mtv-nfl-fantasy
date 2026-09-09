import { describe, expect, it } from "vitest";
import { league, picks, players, teams } from "./league-2026";
import { validateLeagueData } from "@/lib/draft/validation";
import { getFirstRoundPicks, getRosterComposition, getTeamPicks } from "@/lib/draft/stats";

describe("league-2026 dataset", () => {
  it("has exactly 10 teams, 140 picks, and 14 rounds", () => {
    expect(teams).toHaveLength(10);
    expect(picks).toHaveLength(140);
    expect(league.rounds).toBe(14);
  });

  it("passes full structural validation", () => {
    expect(validateLeagueData(league)).toEqual([]);
  });

  it("gives every team exactly 14 distinct players (no id collisions across teams)", () => {
    for (const team of teams) {
      const teamPicks = getTeamPicks(team.id, picks);
      expect(teamPicks).toHaveLength(14);

      const playerIds = new Set(teamPicks.map((pick) => pick.playerId));
      expect(playerIds.size).toBe(14);
    }
  });

  it("resolves every pick's playerId to a real player in the dataset", () => {
    const playersById = new Map(players.map((player) => [player.id, player]));
    for (const pick of picks) {
      expect(playersById.has(pick.playerId)).toBe(true);
    }
  });

  it("derives round 1 with exactly one pick per team, ordered by overallPick", () => {
    const firstRound = getFirstRoundPicks(picks);
    expect(firstRound).toHaveLength(10);
    expect(firstRound.map((pick) => pick.overallPick)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it("gives the 2.10 raw notation to overall pick 20 (Raizsonica, B. Bowers, last pick of round 2 via snake reversal)", () => {
    const pick = picks.find((candidate) => candidate.displayPick === "2.10" && candidate.teamId === "raizsonica");
    expect(pick?.overallPick).toBe(20);
    expect(pick?.draftSlot).toBe(1);
  });

  it("gives the 2.01 raw notation to overall pick 11 (Knoxville's BigRedRockets, C. Brown, first pick of round 2)", () => {
    const pick = picks.find(
      (candidate) => candidate.displayPick === "2.01" && candidate.teamId === "knoxvilles-bigredrockets",
    );
    expect(pick?.overallPick).toBe(11);
    expect(pick?.draftSlot).toBe(10);
  });

  it("keeps every pick's derived draftSlot equal to its owning team's draftPosition", () => {
    const draftPositionByTeamId = new Map(teams.map((team) => [team.id, team.draftPosition]));
    for (const pick of picks) {
      expect(pick.draftSlot).toBe(draftPositionByTeamId.get(pick.teamId));
    }
  });

  it("computes a non-empty roster composition per team", () => {
    for (const team of teams) {
      const teamPicks = getTeamPicks(team.id, picks);
      const composition = getRosterComposition(teamPicks, players);
      const total = Object.values(composition).reduce((sum, count) => sum + count, 0);
      expect(total).toBe(14);
    }
  });
});
