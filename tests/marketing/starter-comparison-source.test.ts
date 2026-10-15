// @vitest-environment node
// Keep filesystem contracts separate from the jsdom rendering suite.

import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const marketingRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const upgradeGuide = readFileSync(
  resolve(marketingRoot, "content/docs/starter/upgrade.mdx"),
  "utf8",
);
const guideText = upgradeGuide.replace(/\s+/gu, " ");

describe("Starter comparison source contracts", () => {
  it("uses the same comparison on the Starter discovery page", () => {
    const page = readFileSync(
      resolve(marketingRoot, "app/(site)/starters/page.tsx"),
      "utf8",
    );
    expect(page).toContain("<StarterComparisonTable />");
    expect(page).not.toMatch(/const comparison(?:Rows)?\s*=/u);
  });

  it("keeps every comparison link on an existing internal route", () => {
    const component = readFileSync(
      resolve(marketingRoot, "components/starters/starter-comparison-table.tsx"),
      "utf8",
    );
    const destinations = [...component.matchAll(/href="([^"]+)"/gu)].map(
      (match) => match[1],
    );

    expect(destinations).toEqual([
      "/starters/free",
      "/docs/starter/upgrade",
      "/docs/starter-pro/production-checklist",
    ]);
    for (const href of destinations) {
      expect(href).toBeDefined();
      if (!href) {
        throw new Error("Comparison link is missing its destination");
      }

      const path = href.startsWith("/docs/")
        ? resolve(marketingRoot, "content/docs", `${href.slice(6)}.mdx`)
        : resolve(marketingRoot, "app/(site)", href.slice(1), "page.tsx");

      expect(existsSync(path), `Missing destination: ${href}`).toBe(true);
    }
  });

  it("keeps the page connected to the comparison and purchase CTA", () => {
    const page = readFileSync(
      resolve(marketingRoot, "app/(site)/starters/pro/page.tsx"),
      "utf8",
    );

    expect(page).toContain("<StarterComparisonTable />");
    expect(page).toContain('id="free-vs-pro"');
    expect(page).not.toContain("const comparisonRows =");
    expect(page).toContain("BuyStarterProButton");
    expect(page).toContain("Try the Starter Free demo");
    expect(page).toContain("<MarketingFaq");
    expect(page).toContain("items={starterProBuyerFaqs}");
  });

  it("documents local project value and browser-storage limits", () => {
    expect(guideText).toContain(
      "create a project, view its details, rename it, and delete it",
    );
    expect(guideText).toContain("this browser's `localStorage`");
    expect(guideText).toContain("when storage is available");
    expect(guideText).toContain("Reset demo");
    expect(guideText).toContain("Clearing browser storage removes your changes");
    expect(guideText).toContain("current visit only");
    expect(guideText).toContain("Use sample data, not sensitive information");
    expect(guideText).toContain(
      "no real account, shared database, authorization, or cross-device synchronization",
    );
    expect(guideText).toContain("dashboard metrics remain illustrative");
  });

  it("places the separate-source boundary before the first purchase CTA", () => {
    const introduction = guideText.split("<DocsUpgradeCTA")[0] ?? "";

    expect(introduction).toContain(
      "separate source code to download, configure, and adapt",
    );
    expect(introduction).toContain(
      "does not unlock the running Free demo or automatically migrate your app or local projects",
    );
    expect(introduction).toContain(
      "does not provision your services or deploy your app",
    );
    expect(introduction).toContain(
      "implement your own domain data model, permissions, and workflows",
    );
    expect(guideText).toContain("no automatic in-place upgrade");
    expect(guideText).toContain(
      "no migration command or automatic transfer is provided by this guide",
    );
    expect(upgradeGuide.match(/productSlug="starter-pro"/gu)).toHaveLength(2);
    expect(upgradeGuide).toContain(
      'secondaryHref="/docs/starter-pro/what-is-included"',
    );
    expect(upgradeGuide).toContain('secondaryHref="/pricing"');
  });

  it("keeps existing guide anchors and orders the manual upgrade checkpoints", () => {
    const headings = [...upgradeGuide.matchAll(/^## (.+)$/gmu)].map(
      (match) => match[1],
    );
    const checkpoints = [...upgradeGuide.matchAll(/^    ### (.+)$/gmu)].map(
      (match) => match[1],
    );

    expect(headings).toEqual([
      "Overview",
      "Free vs Pro",
      "When to upgrade",
      "Upgrade flow",
      "Decision guide",
      "Common concerns",
      "Next steps",
    ]);
    expect(checkpoints).toEqual([
      "Preserve Free and inspect the Pro source",
      "Configure and validate locally",
      "Add authentication",
      "Protect product routes",
      "Connect billing",
      "Replace mock data",
    ]);
    for (const heading of [
      "The upgrade moment",
      "What changes with Pro",
      "What you keep",
      "Why not build it yourself?",
      "Ready to move faster?",
    ]) {
      expect(upgradeGuide).toContain(`### ${heading}`);
    }
    expect(guideText).toContain("keep the last working version available");
    expect(guideText).toContain(
      "a successful local run is not production approval",
    );
  });

  it("keeps upgrade guidance on existing Marketing and documentation routes", () => {
    const destinations = [
      ...upgradeGuide.matchAll(
        /(?:\]\(|\b(?:href|secondaryHref)\s*[:=]\s*["'])(\/[^"'()\s]+)(?:["']|\))/gu,
      ),
    ].map((match) => match[1]);

    expect(destinations).toEqual(
      expect.arrayContaining([
        "/docs/starter/getting-started",
        "/docs/starter-pro/what-is-included",
        "/docs/starter-pro/delivery",
        "/docs/starter-pro/getting-started",
        "/docs/starter-pro/environment-variables",
        "/docs/starter-pro/auth",
        "/docs/starter-pro/billing-testing",
        "/docs/starter-pro/production-checklist",
        "/starters/free",
        "/starters/pro",
        "/pricing",
      ]),
    );
    for (const href of new Set(destinations)) {
      if (!href) {
        throw new Error("Upgrade guide link is missing its destination");
      }

      const path = href.startsWith("/docs/")
        ? resolve(marketingRoot, "content/docs", href.slice(6))
        : resolve(marketingRoot, "app/(site)", href.slice(1));
      const exists = href.startsWith("/docs/")
        ? existsSync(`${path}.mdx`) || existsSync(resolve(path, "index.mdx"))
        : existsSync(resolve(path, "page.tsx"));

      expect(exists, `Missing upgrade destination: ${href}`).toBe(true);
    }
  });
});
