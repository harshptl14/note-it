// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        login: resolve(__dirname, "pages/login.html"),
        register: resolve(__dirname, "pages/register.html"),
        profile: resolve(__dirname, "pages/profile.html"),
      },
    },
  },
});
