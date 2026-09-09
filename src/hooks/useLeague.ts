import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { LEAGUE_2026_QUERY } from "@/graphql/queries/league";
import type { League2026QueryResult, League2026QueryVariables } from "@/graphql/queries/league.types";
import { leagueFromQueryResult } from "@/lib/draft/fromGraphQL";
import { validateLeagueData } from "@/lib/draft/validation";
import type { League } from "@/types/league";

export interface UseLeagueResult {
  league: League | null;
  loading: boolean;
  error: Error | undefined;
  refetch: () => void;
}

export function useLeague(season = 2026): UseLeagueResult {
  const { data, loading, error, refetch } = useQuery<League2026QueryResult, League2026QueryVariables>(
    LEAGUE_2026_QUERY,
    { variables: { season } },
  );

  const league = useMemo(() => leagueFromQueryResult(data?.league ?? null), [data]);

  if (import.meta.env.DEV && league) {
    const errors = validateLeagueData(league);
    if (errors.length > 0) {
      console.error(`League data validation failed with ${errors.length} error(s):`);
      for (const validationError of errors) {
        console.error(`  - ${validationError}`);
      }
    }
  }

  return {
    league,
    loading,
    error,
    refetch: () => {
      void refetch();
    },
  };
}
