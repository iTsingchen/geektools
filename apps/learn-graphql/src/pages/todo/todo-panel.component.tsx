import { useLazyQuery } from "@apollo/client";

import { Todo } from "../../apollo";

import { QUERY_TODOS } from "./todo.graphql";
import { FormInput } from "./form-input.component";
import { TodoList } from "./todo-list.component";

export function TodoPanel() {
  const [query] = useLazyQuery<{ todos: Todo[] }>(QUERY_TODOS);

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
