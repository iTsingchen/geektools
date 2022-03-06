import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";
import { clientsClaim } from "workbox-core";
import { registerRoute } from "workbox-routing";

import { PINT_PONG, PING, PONG } from "./utils/ping-pong";
import { apolloService } from "./apollo/service/apollo-service";

declare let self: ServiceWorkerGlobalScope;

async function bootstrap() {
  // self.__WB_MANIFEST is default injection point
  // eslint-disable-next-line no-underscore-dangle
  precacheAndRoute(self.__WB_MANIFEST);

  // clean old assets
  cleanupOutdatedCaches();

  // register route
  registerRoute("/graphql", apolloService.fetch, "POST");

  // ping pong
  const broadcast = new BroadcastChannel(PINT_PONG);
  broadcast.addEventListener(
    "message",
    (event: MessageEvent<{ type: typeof PING }>) => {
      if (event.data && event.data.type === PING) {
        broadcast.postMessage({ type: PONG });
      }
    }
  );

  // immediate effect
  await self.skipWaiting();
  clientsClaim();
}

bootstrap().catch((e) => {
  throw e;
});
