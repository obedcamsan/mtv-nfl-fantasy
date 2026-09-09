import { gql } from "@apollo/client";
import { FANTASY_TEAM_FIELDS } from "../fragments/fantasyTeamFields";
import { DRAFT_PICK_FIELDS } from "../fragments/draftPickFields";

export const LEAGUE_2026_QUERY = gql`
  query League2026($season: Int!) {
    league(season: $season) {
      id
      name
      season
      rounds

      teams {
        ...FantasyTeamFields
      }

      draft {
        totalPicks
        rounds

        picks {
          ...DraftPickFields
        }
      }
    }
  }
  ${FANTASY_TEAM_FIELDS}
  ${DRAFT_PICK_FIELDS}
`;
