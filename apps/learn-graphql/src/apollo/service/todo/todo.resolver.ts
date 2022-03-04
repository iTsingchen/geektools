import { TodoService } from "./todo.service";

const todoService = new TodoService();

const Query = {
  todos: () => todoService.findAll(),
};

type CreateArgs = { text: string };
type ToggleArgs = { id: string };
type DeleteArgs = { id: string };

const Mutation = {
  createTodo: (_: unknown, { text }: CreateArgs) => todoService.create(text),
  toggleTodo: (_: unknown, { id }: ToggleArgs) => todoService.toggle(id),
  deleteTodo: (_: unknown, { id }: DeleteArgs) => todoService.delete(id),
};

export default {
  Query,
  Mutation,
};
