import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

import { serializeTheme } from "@pycolors/color-engine";

import {
  THEME_BUILDER_CTA_LINKS,
  THEME_BUILDER_DESCRIPTION,
  THEME_BUILDER_PATH,
  THEME_BUILDER_TITLE,
} from "./theme-builder-launch";
import { createThemeBuilderState } from "./theme-builder-state";

const marketingRoot = new URL("../..", import.meta.url).pathname;

function readMarketingFile(path: string) {
  return readFileSync(join(marketingRoot, path), "utf8");
}

test("publishes the Theme Builder SEO contract and launch limitations", () => {
  const page = readMarketingFile("app/(site)/tools/theme-builder/page.tsx");

  assert.equal(
    THEME_BUILDER_TITLE,
    "PyColors Theme Builder — Generate light and dark design tokens",
  );
  assert.equal(
    THEME_BUILDER_DESCRIPTION,
    "Generate contrast-aware PyColors CSS variables for light and dark interfaces from your brand color. Preview them with PyColors UI and copy the result.",
  );
  assert.equal(THEME_BUILDER_PATH, "/tools/theme-builder");
  assert.match(page, /title: \{ absolute: THEME_BUILDER_TITLE \}/u);
  assert.match(page, /canonical: THEME_BUILDER_PATH/u);
  assert.match(page, /openGraph:/u);
  assert.match(page, /twitter:/u);
  assert.match(page, /Build a PyColors theme from your brand colors/u);
  assert.match(
    page,
    /Free, client-side, PyColors-compatible theme generation for\s+production-shaped SaaS interfaces\./u,
  );
  assert.match(page, /Semantic token studio/u);
  assert.match(page, /border border-pro-border bg-pro-surface/u);
  assert.match(page, /contrast-aware, not an accessibility\s+certification/u);
  for (const reviewContext of [
    "Brand perception",
    "Complete component and page context",
    "Color-vision deficiencies",
    "States communicated only by color",
    "Real focus, hover, and disabled contexts",
  ]) {
    assert.match(page, new RegExp(reviewContext, "u"));
  }
  assert.doesNotMatch(
    page,
    /guaranteed accessible|accessibility guaranteed|wcag certified|certified accessible|radix-compatible/iu,
  );
});

test("keeps discovery, docs links, and the CTA funnel on real routes", () => {
  const navigation = readMarketingFile("lib/layout.shared.tsx");
  const footer = readMarketingFile("components/footer.tsx");
  const output = readMarketingFile("components/theme-builder/theme-output.tsx");
  const sitemap = readMarketingFile("app/sitemap.ts");
  const docs = [
    "content/docs/design-system/colors.mdx",
    "content/docs/design-system/tokens/index.mdx",
    "content/docs/ui/theming.mdx",
  ].map(readMarketingFile);

  assert.match(navigation, /title: ["']UI system["'][\s\S]*Theme Builder/u);
  assert.match(footer, /title: "Platform"[\s\S]*Theme Builder/u);
  assert.match(sitemap, /["']\/tools\/theme-builder["']/u);
  for (const document of docs) {
    assert.match(document, /\/tools\/theme-builder/u);
  }

  assert.deepEqual(THEME_BUILDER_CTA_LINKS, [
    { label: "Use with PyColors UI", href: "/docs/ui/theming" },
    {
      label: "Read token documentation",
      href: "/docs/design-system/tokens",
    },
    { label: "Build faster with Starter Pro", href: "/starters/pro" },
  ]);
  assert.match(output, /THEME_BUILDER_CTA_LINKS\.map/u);

  for (const routeFile of [
    "app/(site)/tools/theme-builder/page.tsx",
    "content/docs/ui/theming.mdx",
    "content/docs/design-system/tokens/index.mdx",
    "app/(site)/starters/pro/page.tsx",
  ]) {
    assert.equal(existsSync(join(marketingRoot, routeFile)), true);
  }
});

test("uses current serializer output without analytics or a second Tailwind contract", () => {
  const page = readMarketingFile("app/(site)/tools/theme-builder/page.tsx");
  const output = readMarketingFile("components/theme-builder/theme-output.tsx");
  const themeSources = [
    page,
    output,
    readMarketingFile("components/theme-builder/theme-builder.tsx"),
  ].join("\n");
  const serialized = serializeTheme(
    createThemeBuilderState().generatedTheme,
    "css",
  );

  assert.equal(serialized.ok, true);
  if (!serialized.ok) throw new Error("Expected Theme Builder CSS output.");
  assert.match(serialized.value.content, /^:root \{/u);
  assert.match(serialized.value.content, /\.dark \{/u);
  assert.match(output, /generatedCssExample\(css\.content\)/u);
  assert.match(page, /@pycolors\/tokens\/tokens\.css/u);
  assert.match(page, /@theme inline/u);
  assert.match(output, /existing Tailwind v4 semantic utilities/u);
  assert.doesNotMatch(themeSources, /analytics|track\s*\(/iu);
  assert.doesNotMatch(themeSources, /localStorage|fetch\s*\(/iu);
});
