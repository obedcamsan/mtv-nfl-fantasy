export type Position = "QB" | "RB" | "WR" | "TE" | "K" | "DEF";

export interface Player {
  id: string;
  sleeperId: string | null;
  displayName: string;
  position: Position;
  nflTeam: string;
}

export interface FantasyTeam {
  id: string;
  slug: string;
  name: string;
  manager: string;
  draftPosition: number;
}

export interface DraftPick {
  id: string;

  round: number;

  /** Original snake-draft slot (1..teamCount) this pick belongs to, from the source "round.slot" notation. */
  draftSlot: number;
  /** Chronological order of this pick within its round (1..teamCount), accounting for snake reversal. */
  chronologicalPickInRound: number;
  /** Absolute pick number across the entire draft (1..totalPicks). */
  overallPick: number;

  /** Presentation-only label, e.g. "1.04". Never used as a structural source of truth. */
  displayPick: string;

  teamId: string;
  playerId: string;
}

export interface League {
  id: string;
  name: string;
  season: number;
  rounds: number;
  teams: FantasyTeam[];
  players: Player[];
  picks: DraftPick[];
}

export type RosterComposition = Record<Position, number>;
