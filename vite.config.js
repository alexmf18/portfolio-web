import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      // "/images/..." are files in public/, served as-is: don't turn them
      // into module imports (Vitest would try to read them from disk)
      template: { transformAssetUrls: { includeAbsolute: false } },
    }),
  ],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
  },
  test: {
    environment: "jsdom",
    globals: true,
  },
});
