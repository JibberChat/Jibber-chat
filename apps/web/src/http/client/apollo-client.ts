import { HttpLink, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { ApolloClient, InMemoryCache } from "@apollo/experimental-nextjs-app-support";
import { createClient } from "graphql-ws";

// URL de votre serveur GraphQL
const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include", // Pour inclure les cookies avec les requêtes
});

// Middleware pour ajouter les cookies aux en-têtes
const authLink = setContext((_, { headers }) => {
  const cookies = document.cookie;
  return {
    headers: {
      ...headers,
      cookie: cookies,
    },
  };
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:4000/subscriptions",
    on: {
      connected: () => console.log("WebSocket connected"),
      error: (error) => console.error("WebSocket error", error),
      closed: (event) => console.log("WebSocket closed", event),
    },
  })
);

// Utiliser le lien WebSocket pour les subscriptions, sinon utiliser le lien HTTP
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  wsLink,
  authLink.concat(httpLink)
);

let apolloClient: ApolloClient<any> | null = null;

export const getClient = () => {
  if (!apolloClient) {
    apolloClient = new ApolloClient({
      // ssrMode: false,
      ssrForceFetchDelay: 100,
      link: splitLink,
      cache: new InMemoryCache(),
    });
  }
  return apolloClient;
};
