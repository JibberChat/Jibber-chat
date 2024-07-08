"use client";

import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support";

import { getClient } from "@/http/client/apollo-client";

export function ApolloWrapper({ children }: Readonly<React.PropsWithChildren>) {
  return <ApolloNextAppProvider makeClient={getClient}>{children}</ApolloNextAppProvider>;
}
