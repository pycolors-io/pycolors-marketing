import { defineConfig } from "vitest/config";

export default defineConfig({
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
