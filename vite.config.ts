import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import htmlEnv from "vite-plugin-html-env";

export default defineConfig({
  plugins: [react(), htmlEnv()],
  build: {
    outDir: "./www",
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
});
