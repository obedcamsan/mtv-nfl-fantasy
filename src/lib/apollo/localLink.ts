import { ApolloLink, Observable } from "@apollo/client";
import { league } from "@/data/league-2026";

/**
 * Resolves queries against the local dataset instead of a network request.
 * Shapes data to match the GraphQL target schema (see build-app spec section 12)
 * so the same components work unmodified once HttpLink replaces this link.
 *
 * GraphQL's `roundPick` maps to our internal `chronologicalPickInRound`
 * (the Nth pick that actually happened within the round — this is what the
 * source data's own "round.pick" notation encodes; see normalize.ts).
 * `draftSlot` is re-derived from it on read.
 */
function resolveLeague(season: number) {
  if (season !== league.season) return null;

  const playersById = new Map(league.players.map((player) => [player.id, player]));

  return {
    __typename: "League",
    id: league.id,
    name: league.name,
    season: league.season,
    rounds: league.rounds,
    teams: league.teams.map((team) => ({
      __typename: "FantasyTeam",
      id: team.id,
      slug: team.slug,
      name: team.name,
      manager: team.manager,
      draftPosition: team.draftPosition,
    })),
    draft: {
      __typename: "Draft",
      totalPicks: league.picks.length,
      rounds: league.rounds,
      picks: league.picks.map((pick) => ({
        __typename: "DraftPick",
        id: pick.id,
        overallPick: pick.overallPick,
        round: pick.round,
        roundPick: pick.chronologicalPickInRound,
        displayPick: pick.displayPick,
        team: { __typename: "FantasyTeam", id: pick.teamId },
        player: playersById.has(pick.playerId)
          ? { __typename: "Player", ...playersById.get(pick.playerId)! }
          : null,
      })),
    },
  };
}

export function createLocalLink(): ApolloLink {
  return new ApolloLink((operation) => {
    return new Observable((observer) => {
      try {
        if (operation.operationName === "League2026") {
          const season = operation.variables.season as number;
          observer.next({ data: { league: resolveLeague(season) } });
          observer.complete();
          return;
        }

        observer.error(new Error(`Unknown local operation: ${operation.operationName}`));
      } catch (error) {
        observer.error(error);
      }
    });
  });
}
