import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// test.env only applies to workers. Normalize the host before Vite initializes
// so CI's production default cannot turn Node imports into browser stubs.
Object.assign(process.env, { NODE_ENV: "test" });

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL(".", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    env: {
      NODE_ENV: "test",
    },
    include: [
      "tests/blocks/**/*.test.{ts,tsx}",
      "tests/docs/**/*.test.{ts,tsx}",
      "tests/marketing/**/*.test.{ts,tsx}",
    ],
    setupFiles: ["./tests/setup.ts"],
  },
});
