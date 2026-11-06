import { nextJsConfig } from "@pycolors/eslint-config/next-js";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...nextJsConfig,
  {
    // These fixtures test native navigation without the Next router.
    files: ["tests/**/*.{ts,tsx}"],
    rules: { "@next/next/no-html-link-for-pages": "off" },
  },
  {
    files: ["components/layout/root-document.tsx"],
    // Standard HTML attribute supported by the pinned React types and browsers.
    rules: { "react/no-unknown-property": ["warn", { ignore: ["blocking"] }] },
  },
  {
    ignores: [".source/**"],
  },
];
