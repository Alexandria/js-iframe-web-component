import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  // Define the parent and iframe content as separate entry points
  server: {
    cors: true,
  },
  build: {
    rollupOptions: {
      input: {
        // Main application entry point (Parent)
        main: resolve(__dirname, "index.html"),
        // Iframe content entry point
        iframe: resolve(__dirname, "iframe-content-form.html"),
      },
    },
  },
});
