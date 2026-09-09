import type { Position } from "@/types/league";

export interface PositionTheme {
  position: Position;
  label: string;
  color: string;
  glow: string;
}

const POSITION_THEMES: Record<Position, PositionTheme> = {
  QB: { position: "QB", label: "QB", color: "var(--pos-qb)", glow: "var(--pos-qb-glow)" },
  RB: { position: "RB", label: "RB", color: "var(--pos-rb)", glow: "var(--pos-rb-glow)" },
  WR: { position: "WR", label: "WR", color: "var(--pos-wr)", glow: "var(--pos-wr-glow)" },
  TE: { position: "TE", label: "TE", color: "var(--pos-te)", glow: "var(--pos-te-glow)" },
  K: { position: "K", label: "K", color: "var(--pos-k)", glow: "var(--pos-k-glow)" },
  DEF: { position: "DEF", label: "DEF", color: "var(--pos-def)", glow: "var(--pos-def-glow)" },
};

export function getPositionTheme(position: Position): PositionTheme {
  return POSITION_THEMES[position];
}
