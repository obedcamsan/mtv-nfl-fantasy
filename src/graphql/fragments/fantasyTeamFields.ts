import { gql } from "@apollo/client";

export const FANTASY_TEAM_FIELDS = gql`
  fragment FantasyTeamFields on FantasyTeam {
    id
    slug
    name
    manager
    draftPosition
  }
`;
