import { defineConfig } from 'vite';
import { resolve } from "path";

export default defineConfig({
  base: '/Travel-Agency-Website/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        notfound: resolve(__dirname, "404.html"),
      },
    },
  },
});