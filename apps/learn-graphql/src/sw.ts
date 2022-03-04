/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */

import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";
import { clientsClaim } from "workbox-core";
import { registerRoute } from "workbox-routing";

import { apolloService } from "./apollo/service/apollo-service";

declare let self: ServiceWorkerGlobalScope;

// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST);

// clean old assets
cleanupOutdatedCaches();

// register route
registerRoute("/graphql", apolloService.fetch, "POST");

// claim
self.skipWaiting();
clientsClaim();
