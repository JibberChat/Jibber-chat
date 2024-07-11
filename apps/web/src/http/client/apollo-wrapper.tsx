"use client";

import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support";

import { getClient } from "@/http/client/apollo-client";

export const ApolloWrapper: React.FC<Readonly<React.PropsWithChildren>> = ({ children }) => {
  return <ApolloNextAppProvider makeClient={getClient}>{children}</ApolloNextAppProvider>;
};
