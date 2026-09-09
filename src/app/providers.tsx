import type { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@/lib/apollo/client";

export function AppProviders({ children }: { children: ReactNode }) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
