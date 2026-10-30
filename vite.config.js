import { defineConfig } from 'vite';
import { resolve } from "path";

export default defineConfig({
  base: '/travel-agency-website/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        notfound: resolve(__dirname, "404.html"),
      },
    },
  },
});