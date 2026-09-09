import { slugify } from "./slug";
import type { Position } from "@/types/league";

/** Deterministic, human-readable id, e.g. "j-williams-dal-rb". Not a Sleeper id. */
export function generatePlayerId(displayName: string, nflTeam: string, position: Position): string {
  return [slugify(displayName), slugify(nflTeam), slugify(position)].filter(Boolean).join("-");
}

export function getPlayerImageUrl(sleeperId: string | null): string | null {
  if (!sleeperId) return null;
  return `https://sleepercdn.com/content/nfl/players/thumb/${sleeperId}.jpg`;
}
