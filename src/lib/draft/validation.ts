import type { League } from "@/types/league";

const VALID_POSITIONS = new Set(["QB", "RB", "WR", "TE", "K", "DEF"]);

export function validateLeagueData(league: League): string[] {
  const errors: string[] = [];

  const teamCount = league.teams.length;
  const expectedPicks = teamCount * league.rounds;

  if (league.picks.length !== expectedPicks) {
    errors.push(
      `Expected ${expectedPicks} picks (${teamCount} teams x ${league.rounds} rounds), found ${league.picks.length}.`,
    );
  }

  const teamIds = new Set(league.teams.map((team) => team.id));
  const playerIds = new Set(league.players.map((player) => player.id));
  const draftPositionByTeamId = new Map(league.teams.map((team) => [team.id, team.draftPosition]));

  const seenDisplayPick = new Set<string>();
  const seenOverallPick = new Set<number>();
  const picksPerTeam = new Map<string, number>();
  const picksPerRound = new Map<number, number>();

  for (const pick of league.picks) {
    if (seenDisplayPick.has(pick.displayPick)) {
      errors.push(`Duplicate displayPick: "${pick.displayPick}".`);
    }
    seenDisplayPick.add(pick.displayPick);

    if (seenOverallPick.has(pick.overallPick)) {
      errors.push(`Duplicate overallPick: ${pick.overallPick}.`);
    }
    seenOverallPick.add(pick.overallPick);

    if (!teamIds.has(pick.teamId)) {
      errors.push(`Pick "${pick.id}" references unknown teamId "${pick.teamId}".`);
    }

    if (!playerIds.has(pick.playerId)) {
      errors.push(`Pick "${pick.id}" references unknown playerId "${pick.playerId}".`);
    }

    if (pick.round < 1 || pick.round > league.rounds) {
      errors.push(`Pick "${pick.id}" has invalid round ${pick.round}.`);
    }

    if (pick.draftSlot < 1 || pick.draftSlot > teamCount) {
      errors.push(`Pick "${pick.id}" has invalid draftSlot ${pick.draftSlot}.`);
    } else {
      const ownerDraftPosition = draftPositionByTeamId.get(pick.teamId);
      if (ownerDraftPosition !== undefined && ownerDraftPosition !== pick.draftSlot) {
        errors.push(
          `Pick "${pick.id}" has draftSlot ${pick.draftSlot} but team "${pick.teamId}" owns draft position ${ownerDraftPosition}.`,
        );
      }
    }

    picksPerTeam.set(pick.teamId, (picksPerTeam.get(pick.teamId) ?? 0) + 1);
    picksPerRound.set(pick.round, (picksPerRound.get(pick.round) ?? 0) + 1);
  }

  for (const player of league.players) {
    if (!VALID_POSITIONS.has(player.position)) {
      errors.push(`Player "${player.id}" has invalid position "${player.position}".`);
    }
  }

  for (const team of league.teams) {
    const count = picksPerTeam.get(team.id) ?? 0;
    if (count !== league.rounds) {
      errors.push(`Team "${team.id}" has ${count} picks, expected ${league.rounds}.`);
    }
  }

  for (let round = 1; round <= league.rounds; round += 1) {
    const count = picksPerRound.get(round) ?? 0;
    if (count !== teamCount) {
      errors.push(`Round ${round} has ${count} picks, expected ${teamCount}.`);
    }
  }

  return errors;
}

export function assertValidLeagueData(league: League): void {
  const errors = validateLeagueData(league);

  if (errors.length > 0) {
    console.error(`League data validation failed with ${errors.length} error(s):`);
    for (const error of errors) {
      console.error(`  - ${error}`);
    }
    throw new Error("League data validation failed. See console for details.");
  }
}
