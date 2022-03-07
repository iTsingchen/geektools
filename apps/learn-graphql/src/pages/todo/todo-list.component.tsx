import { useQuery } from "@apollo/client";
import { useTransition, animated } from "@react-spring/web";

import { Todo } from "../../apollo";

import { QUERY_TODOS } from "./todo.graphql";
import { TodoItem } from "./todo-item.component";

export function TodoList() {
  const { loading, data } = useQuery<{ todos: Todo[] }>(QUERY_TODOS);

  const transitions = useTransition(data?.todos ?? [], {
    keys: (item: Todo) => item.id,
    from: { height: 0, opacity: 0 },
    leave: { height: 0, opacity: 0 },
    enter: { height: 52, opacity: 1 },
  });

  if (loading) return null;

  return (
    <ul className="mt-4">
      {transitions((style, item) => (
        <animated.li style={style} className="border-b">
          <TodoItem {...item} />
        </animated.li>
      ))}
    </ul>
  );
}
