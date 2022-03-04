import { graphql, GraphQLArgs, GraphQLSchema } from "graphql";
import {
  makeExecutableSchema,
  IExecutableSchemaDefinition,
} from "@graphql-tools/schema";

type RequestBody = {
  query: GraphQLArgs["source"];
  variables: GraphQLArgs["variableValues"];
};

export class ApolloService<T> {
  private schema: GraphQLSchema;

  constructor(config: IExecutableSchemaDefinition<T>) {
    this.schema = makeExecutableSchema(config);
  }

  fetch = async ({ request }: { request: Request }): Promise<Response> => {
    const { query, variables } = (await request.json()) as RequestBody;

    const data = await graphql({
      schema: this.schema,
      source: query,
      variableValues: variables,
    });

    const json = JSON.stringify(data);
    return new Response(json);
  };
}
