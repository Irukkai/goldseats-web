import path from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  // tsconfig sets `jsx: preserve` for Next's compiler; Vitest needs the
  // runtime transform applied itself.
  esbuild: { jsx: "automatic" },
  // Tests never assert on compiled CSS, and the Tailwind v4 PostCSS plugin is
  // not loadable by Vite's config resolver. Skip PostCSS entirely.
  css: { postcss: { plugins: [] } },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
