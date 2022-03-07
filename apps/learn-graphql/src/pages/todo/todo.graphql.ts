import { gql } from "@apollo/client";

export const QUERY_TODOS = gql`
  query Todos {
    todos {
      id
      text
      done
    }
  }
`;
export const QUERY_TODOS_PARTIAL = gql`
  query Todos {
    todos {
      id
      text
      done
    }
  }
`;

export const CREATE_TODO = gql`
  mutation CreateTodo($text: String!) {
    createTodo(text: $text) {
      id
      text
      done
    }
  }
`;

export const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: ID!) {
    toggleTodo(id: $id) {
      id
      done
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
      # text
      # done
    }
  }
`;
