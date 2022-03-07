import React, { useState } from "react";
import { useMutation, gql, Reference } from "@apollo/client";
import { PlusIcon } from "@heroicons/react/solid";

import { Todo } from "../../apollo";
import { CREATE_TODO } from "./todo.graphql";

export function FormInput() {
  const [text, setText] = useState("");
  const [createTodo, { loading }] = useMutation<{ createTodo: Todo }>(
    CREATE_TODO,
    {
      update: (cache, { data }) => {
        cache.modify({
          fields: {
            todos: (existingTodoRefs: Reference[] = []) => {
              if (!data) return existingTodoRefs;

              const newTodoRef = cache.writeFragment({
                data: data.createTodo,
                fragment: gql`
                  fragment NewTodo on Todo {
                    id
                    text
                    done
                  }
                `,
              });

              return [newTodoRef, ...existingTodoRefs];
            },
          },
        });
      },
    }
  );
  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    if (loading) return;
    await createTodo({ variables: { text } });
    setText("");
  };
  return (
    <form className="flex pl-4" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        className="input input-bordered grow"
      />
      <button type="submit" disabled={text.length < 2} className="btn ml-4">
        <PlusIcon width={32} />
      </button>
    </form>
  );
}
