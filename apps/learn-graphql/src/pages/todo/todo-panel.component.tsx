import { useLazyQuery } from "@apollo/client";

import { Todo } from "../../apollo";

import { QUERY_TODOS_PARTIAL } from "./todo.graphql";
import { FormInput } from "./form-input.component";
import { TodoList } from "./todo-list.component";

export function TodoPanel() {
  const [query, { data }] = useLazyQuery<{ todos: Todo[] }>(
    QUERY_TODOS_PARTIAL,
    {
      fetchPolicy: "cache-only",
    }
  );

  console.log(data);

  return (
    <div className="h-full">
      <h2 className="text-8xl font-thin text-center p-10 text-base-neutral opacity-10 select-none">
        Todos
        <button className="btn" type="button" onClick={() => query()}>
          query
        </button>
      </h2>
      <FormInput />
      <TodoList />
    </div>
  );
}
