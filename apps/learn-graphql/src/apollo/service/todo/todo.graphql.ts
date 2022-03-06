/**
 * Due to vite-plugin-pwa compilation problems, the following methods will not be used to import graphql files here:
 *  1. use the @rollup/plugin-graphql plug-in
 *  2. use gql provided by apollo
 *
 *  DateTime: 2022.03.04
 */

import { gql } from "graphql-tag";

const typeDefs = gql`
  type Todo {
    id: String!
    text: String!
    done: Boolean!
  }

  type Query {
    todos: [Todo!]!
  }

  type Mutation {
    createTodo(text: String!): Todo
    toggleTodo(id: ID!): Todo!
    deleteTodo(id: ID!): Todo!
  }
`;

export default typeDefs;
