import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: `${window.location.origin}/graphql`,
  cache: new InMemoryCache(),
  connectToDevTools: process.env.NODE_ENV === "development",
});
