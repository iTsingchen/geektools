import { nanoid } from "nanoid";
import { isBefore } from "date-fns";

import localforage from "localforage/src/localforage";

import { Todo } from "./todo.interface";

export class TodoService {
  private model = localforage.createInstance({
    name: "todos",
    description: "This is a todo list",
  });

  async findOne(id: string): Promise<Todo> {
    const todo = await this.model.getItem<Todo>(id);
    if (!todo) throw new Error(`Todo not found by id: ${id}`);
    return todo;
  }

  async findAll(): Promise<Todo[]> {
    const todos: Todo[] = [];
    await this.model.iterate<Todo, unknown>((value) => {
      todos.push(value);
    });
    todos.sort((t1, t2) => (isBefore(t1.createdAt, t2.createdAt) ? 1 : -1));

    return todos;
  }

  async create(text: string): Promise<Todo> {
    const id = nanoid();
    const todo = {
      id,
      text,
      done: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await this.model.setItem(id, todo);

    return todo;
  }

  async toggle(id: string): Promise<Todo> {
    const todo = await this.findOne(id);
    todo.done = !todo.done;
    todo.updatedAt = new Date();
    await this.model.setItem(id, todo);

    return todo;
  }

  async delete(id: string): Promise<Todo> {
    const todo = await this.findOne(id);
    await this.model.removeItem(id);

    return todo;
  }
}
