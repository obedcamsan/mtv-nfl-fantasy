import type { Position } from "@/types/league";

export interface League2026QueryVariables {
  season: number;
}

export interface League2026QueryResult {
  league: {
    id: string;
    name: string;
    season: number;
    rounds: number;
    teams: Array<{
      id: string;
      slug: string;
      name: string;
      manager: string;
      draftPosition: number;
    }>;
    draft: {
      totalPicks: number;
      rounds: number;
      picks: Array<{
        id: string;
        overallPick: number;
        round: number;
        roundPick: number;
        displayPick: string;
        team: { id: string };
        player: {
          id: string;
          sleeperId: string | null;
          displayName: string;
          position: Position;
          nflTeam: string;
        } | null;
      }>;
    };
  } | null;
}
