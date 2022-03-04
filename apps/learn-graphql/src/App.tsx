import { ApolloProvider } from "@apollo/client";

import { client } from "./apollo";
import { TodoList } from "./todo-list";

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="bg-neutral">
        <TodoList />
      </div>
    </ApolloProvider>
  );
}

export default App;
