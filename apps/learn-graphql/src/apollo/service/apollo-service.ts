import { ApolloService } from "./core/apollo-service";

import resolvers from "./todo/todo.resolver";
import typeDefs from "./todo/todo.graphql";

export const apolloService = new ApolloService({
  typeDefs,
  resolvers,
});
