# MTV League NFL Fantasy 2026 — Draft Headquarters

A React + TypeScript + Vite single-page site presenting the results of the 2026 MTV League NFL Fantasy Draft: 10 franchises, 10 managers, 14 rounds, 140 picks, full rosters, and an interactive Draft Board.

The frontend is built GraphQL-ready via Apollo Client. In `local` mode (the default) it reads a bundled dataset through a local Apollo Link, shaped exactly like the target GraphQL schema — so switching to a real GraphQL API later (`remote` mode) requires no component changes.

## Stack

React · TypeScript · Vite · Apollo Client · GraphQL · React Router · CSS Modules

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run test      # run the draft-logic unit tests
npm run lint       # ESLint
npm run build      # type-check + production build
npm run preview    # preview the production build locally
```

## Environment variables

Copy `.env.example` to `.env` and adjust as needed:

```env
VITE_DATA_MODE=local
VITE_GRAPHQL_ENDPOINT=
```

- `VITE_DATA_MODE=local` (default) — resolves the `League2026` query against `src/data/league-2026.ts` via a local Apollo Link (`src/lib/apollo/localLink.ts`). No server required.
- `VITE_DATA_MODE=remote` — routes the same query to `VITE_GRAPHQL_ENDPOINT` via `HttpLink`. All `VITE_*` values are public in the browser; never put secrets here.

## ⚠️ Pending: real draft data

`src/data/league-2026.ts` currently has the 10 real teams/managers filled in, but **`players` and the 140 picks are empty** — the actual draft results (player, position, NFL team, and which team/round/slot drafted them) haven't been supplied yet. Every section that depends on picks (Teams Grid first picks, First Round, Rosters, Draft Board) renders its intentional empty state until that data is added.

To populate it, add entries to the `rawPicks` array in that file using `"round.slot"` notation (the source data's own display convention — see `src/lib/draft/normalize.ts` for how it's parsed into `overallPick`/`draftSlot`/`chronologicalPickInRound`), plus corresponding `Player` objects. Run `npm run dev` afterward — `validateLeagueData()` logs any structural problems (wrong pick counts, duplicate picks, unknown team/player references, etc.) to the console in development.

## Project structure

```text
src/
├── app/              App shell composition, router, Apollo provider
├── components/       layout, navigation, league, teams, players, draft, ui
├── data/             local dataset (league-2026.ts)
├── graphql/          fragments, queries, query result types
├── hooks/            useLeague, useDraft, useTeamRoster
├── lib/
│   ├── apollo/       Apollo Client + local/remote link
│   ├── draft/        snake-draft normalization, board/stats/validation logic
│   └── utils/        slugs, player identity, position theming
├── styles/           design tokens, typography, animations, globals
└── types/            core domain model (Player, FantasyTeam, DraftPick, League)
```

## Draft logic notes

- **Source of truth**: `overallPick`, `round`, `draftSlot`, `teamId`, `playerId` — never the `displayPick` string ("1.04"), which is presentation-only.
- **Snake draft**: the number after the dot in `round.slot` notation is the team's original draft slot, not its chronological order within the round. `src/lib/draft/normalize.ts` derives `chronologicalPickInRound` and `overallPick` from it generically (works for any team count). Covered by tests in `src/lib/draft/normalize.test.ts`, including the required `2.10 → overall 11` / `2.01 → overall 20` cases.
- **Draft Board columns** represent draft slots (fixed), not chronological pick order — see `src/lib/draft/board.ts`.

## Data model

See `src/types/league.ts` and the GraphQL contract in `src/graphql/queries/league.ts`. `roundPick` in the GraphQL schema maps to the internal `draftSlot` field (see the comment in `src/lib/apollo/localLink.ts`).
