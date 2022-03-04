import React, { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";

import { Todo } from "./apollo";
import { Item } from "./components";

const QUERY_TODOS = gql`
  query Todos {
    todos {
      id
      text
      completed
    }
  }
`;

const CREATE_TODO = gql`
  mutation CreateTodo($text: String!) {
    createTodo(text: $text) {
      id
      text
      completed
    }
  }
`;

const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: ID!) {
    toggleTodo(id: $id) {
      id
      text
      completed
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
      text
      completed
    }
  }
`;

export function TodoList() {
  const [text, setText] = useState("");

  const { loading, data } = useQuery<{ todos: Array<Todo> }>(QUERY_TODOS, {
    // pollInterval: 500,
  });
  const [createTodo] = useMutation<{ text: string }>(CREATE_TODO);
  const [toggleTodo] = useMutation<{ id: string }>(TOGGLE_TODO);
  const [deleteTodo] = useMutation<{ id: string }>(DELETE_TODO);

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.stopPropagation();
    ev.preventDefault();
    await createTodo({ variables: { text } });
    setText("");
  };

  if (loading || !data) return null;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <button disabled={text.length < 5} type="submit">
          Add
        </button>
      </form>
      <ul>
        {data.todos.map((todo) => (
          <Item
            key={todo.id}
            text={todo.text}
            completed={todo.completed}
            toggleItem={() => toggleTodo({ variables: { id: todo.id } })}
            deleteItem={() => deleteTodo({ variables: { id: todo.id } })}
          />
        ))}
      </ul>
    </div>
  );
}
