import { ApolloClient, HttpLink, InMemoryCache, type ApolloLink } from "@apollo/client";
import { createLocalLink } from "./localLink";

function createRemoteLink(): ApolloLink {
  const endpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT;

  if (!endpoint) {
    throw new Error("VITE_GRAPHQL_ENDPOINT must be set when VITE_DATA_MODE=remote.");
  }

  return new HttpLink({ uri: endpoint });
}

const link = import.meta.env.VITE_DATA_MODE === "remote" ? createRemoteLink() : createLocalLink();

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache({
    typePolicies: {
      League: {
        keyFields: ["id"],
      },
      FantasyTeam: {
        keyFields: ["id"],
      },
      Player: {
        keyFields: ["id"],
      },
      DraftPick: {
        keyFields: ["id"],
      },
    },
  }),
});
