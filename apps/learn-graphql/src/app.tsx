import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { client } from "./apollo";
import { TodoPage } from "./pages/todo";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<TodoPage />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
