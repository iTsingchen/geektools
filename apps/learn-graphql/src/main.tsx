import React from "react";
import ReactDOM from "react-dom";

import { registerSW } from "virtual:pwa-register";
import "virtual:windi.css";

import App from "./app";

function bootstrap(render: () => void) {
  registerSW({
    immediate: true,
    onRegistered: render,
  });
}

bootstrap(() => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
});
