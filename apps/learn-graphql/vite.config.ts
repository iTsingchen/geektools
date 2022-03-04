import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import graphql from "@rollup/plugin-graphql";
import WindiCSS from "vite-plugin-windicss";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VitePWA({
      manifest: false,
      strategies: "injectManifest",
      registerType: "autoUpdate",
      srcDir: "src",
      filename: "sw.ts",
      devOptions: {
        enabled: process.env.NODE_ENV === "development",
        type: "module",
        navigateFallback: "index.html",
      },
    }),
    react(),
    WindiCSS(),
    graphql(),
  ],
});
