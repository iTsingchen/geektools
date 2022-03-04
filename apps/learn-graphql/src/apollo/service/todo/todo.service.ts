import { nanoid } from "nanoid";

import { Todo } from "./todo.type";

export class TodoService {
  private todos: Todo[] = [];

  findAll() {
    return this.todos;
  }

  create(text: string): Todo {
    const todo = {
      id: nanoid(),
      text,
      completed: false,
    };
    this.todos.push(todo);

    return todo;
  }

  toggle(id: string): Todo {
    const todo = this.todos.find((item) => item.id === id);
    if (!todo) throw new Error(`Todo not found by id: ${id}`);
    todo.completed = !todo.completed;

    return todo;
  }

  delete(id: string): Todo {
    const todo = this.todos.find((item) => item.id === id);
    if (!todo) throw new Error(`Todo not found by id: ${id}`);
    this.todos = this.todos.filter((item) => item.id !== id);

    return todo;
  }
}
