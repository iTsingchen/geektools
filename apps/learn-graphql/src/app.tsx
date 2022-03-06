import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { client } from "./apollo";
import { RegisterSW } from "./components";
import { TodoPage } from "./pages/todo";

function App() {
  return (
    <RegisterSW ms={3000}>
      <ApolloProvider client={client}>
        <Router>
          <Routes>
            <Route path="/" element={<TodoPage />} />
          </Routes>
        </Router>
      </ApolloProvider>
    </RegisterSW>
  );
}

export default App;
