import React from "react";
import ReactDOM from "react-dom";

import { registerSW } from "virtual:pwa-register";

import "./index.css";

import { pingServiceWorker } from "./utils/ping-pong";

import App from "./app";

async function bootstrap() {
  registerSW({ immediate: true });
  await pingServiceWorker();

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
}

bootstrap().catch((e) => {
  throw e;
});
