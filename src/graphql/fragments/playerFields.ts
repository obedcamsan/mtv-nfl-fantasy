import { gql } from "@apollo/client";

export const PLAYER_FIELDS = gql`
  fragment PlayerFields on Player {
    id
    sleeperId
    displayName
    position
    nflTeam
  }
`;
