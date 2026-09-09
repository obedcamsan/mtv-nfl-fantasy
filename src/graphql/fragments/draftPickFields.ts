import { gql } from "@apollo/client";
import { PLAYER_FIELDS } from "./playerFields";

export const DRAFT_PICK_FIELDS = gql`
  fragment DraftPickFields on DraftPick {
    id
    overallPick
    round
    roundPick
    displayPick
    team {
      id
    }
    player {
      ...PlayerFields
    }
  }
  ${PLAYER_FIELDS}
`;
