import { useMutation, Reference } from "@apollo/client";
import { XIcon } from "@heroicons/react/solid";

import { Todo } from "../../apollo";
import { DELETE_TODO, TOGGLE_TODO } from "./todo.graphql";

export function TodoItem({ id, text, done }: Todo) {
  const [toggleTodo] = useMutation(TOGGLE_TODO, { variables: { id } });
  const [deleteTodo] = useMutation<{ deleteTodo: { id: string } }>(
    DELETE_TODO,
    {
      variables: { id },
      update: (cache, { data }) => {
        if (data) {
          cache.evict({ id: cache.identify(data.deleteTodo) });
          cache.gc();
        }
      },
    }
  );

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
        <XIcon width={24} />
      </button>
    </p>
  );
}
