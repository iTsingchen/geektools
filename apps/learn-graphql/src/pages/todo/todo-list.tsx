import { TodoPanel } from "./todo-panel.component";

export function TodoPage() {
  return (
    <main className="h-full grid grid-cols-3 grid-rows-2">
      <section className="col-span-1 row-span-2 p-4">
        <TodoPanel />
      </section>
      <section className="col-span-2 bg-green-100">Control</section>
      <section className="col-span-2 bg-blue-100">🌚</section>
    </main>
  );
}
