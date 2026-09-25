import "vitest";

// vitest-axe still augments the legacy Assertion interface. Vitest 4's shared
// Matchers contract also covers promise assertions across pnpm peer contexts.
declare module "vitest" {
  interface Matchers {
    toHaveNoViolations(): void;
  }
}
