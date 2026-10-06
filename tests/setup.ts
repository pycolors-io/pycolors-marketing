import "@testing-library/jest-dom/vitest";
import "vitest-axe/extend-expect";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// jsdom has no media-query API; individual tests can override the preference.
if (typeof window !== "undefined") {
  window.matchMedia ??= (media: string): MediaQueryList => ({
    media,
    matches: false,
    onchange: null,
    addListener() {},
    removeListener() {},
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent: () => true,
  });
}

afterEach(() => {
  cleanup();
});
