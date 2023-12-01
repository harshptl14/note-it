import { defineConfig } from "vite";
import path from "path";

export default defineConfig(({ command, mode }) => ({
  server: {
    open: "index.html",
    origin: "http://localhost:5000",
  },

  root: "frontend",
  build: {
    outDir: "../dist",
  },
  //   publicDir: "./public",
  resolve: {
    alias: { "/frontend": path.resolve(process.cwd(), "frontend") },
  },
}));
