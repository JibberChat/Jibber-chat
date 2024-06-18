"use client";

import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
} from "@apollo/experimental-nextjs-app-support/ssr";

function makeClient() {
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: splitLink,
  });
}
import { splitLink } from "./apollo-client";

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return <ApolloNextAppProvider makeClient={makeClient}>{children}</ApolloNextAppProvider>;
}
