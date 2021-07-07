import { split, HttpLink, InMemoryCache, ApolloProvider } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { ApolloClient } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = new HttpLink({
  uri: `https://api.widde.io/graphql`,
});

const wsLink = new WebSocketLink({
  uri: `wss://api.widde.io/graphql`,
  options: {
    reconnect: true,
    lazy: true,
    connectionParams: async () => {
      return {
        authorization: "teste",
      };
    },
  },
});

const authMiddleware = setContext(async (_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: 'teste',
    },
  };
});


const splitLink = split(
  ({ query }: any) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);
export const client = new ApolloClient({
  link: authMiddleware.concat(splitLink),
  cache: new InMemoryCache({
    resultCaching: true,
    dataIdFromObject: (o) => (o.key ? "" + o.key : undefined),
  }),
});
export default ({ children }: any) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);
