import { useMutation } from "@apollo/client";
import { X } from "phosphor-react";

import { Todo } from "../../apollo";
import { DELETE_TODO, TOGGLE_TODO } from "./todo.graphql";

export function TodoItem({ id, text, done }: Todo) {
  const [toggleTodo] = useMutation(TOGGLE_TODO, { variables: { id } });
  const [deleteTodo] = useMutation(DELETE_TODO, { variables: { id } });

  return (
    <p className="group flex py-2 px-4 justify-between">
      <label htmlFor={id} className="label cursor-pointer">
        <input
          id={id}
          type="checkbox"
          checked={done}
          onChange={() => toggleTodo()}
          className="checkbox checkbox-xs"
        />
        <span
          className={`transition duration-75 label-text ml-2 decoration-1 ${
            done ? "line-through text-base-300" : ""
          }`}
        >
          {text}
        </span>
      </label>
      <button
        type="button"
        className="mr-2 opacity-0 group-hover:opacity-30 transition duration-500"
        onClick={() => deleteTodo()}
      >
        <X size={24} />
      </button>
    </p>
  );
}
