// @vitest-environment node

import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const marketingRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const guide = readFileSync(
  resolve(marketingRoot, "content/docs/starter-pro/getting-started.mdx"),
  "utf8",
);
const heading = "## First 30 minutes after purchase";
const start = guide.indexOf(heading);
const end = guide.indexOf("\n## ", start + heading.length);
const timeline = start < 0 ? "" : guide.slice(start, end < 0 ? undefined : end);

// These are documentation-contract checks, not purchase or browser tests.
describe("Starter Pro first-session guidance", () => {
  it("keeps an ordered timeline before the detailed setup instructions", () => {
    expect(start).toBeGreaterThan(-1);
    expect(start).toBeLessThan(guide.indexOf("## Setup flow"));
    const steps = Array.from(
      timeline.matchAll(/^(\d)\. \*\*([^*]+)\*\*/gm),
      ([, number, title]) => `${number}. ${title}`,
    );
    expect(steps).toEqual([
      "1. 0–5 minutes: check payment and claim access.",
      "2. 5–10 minutes: download and inspect the package.",
      "3. 10–20 minutes: prepare the local foundation.",
      "4. 20–25 minutes: check the first local run.",
      "5. 25–30 minutes: choose one product change.",
    ]);
    expect(timeline).toContain("not measured setup times");
    expect(timeline).toContain("A local first run is not a production launch");
  });

  it("preserves separate payment, access-recovery, and local-failure paths", () => {
    const text = timeline.replace(/\s+/g, " ");
    expect(text).toContain("Recovery does not complete an unpaid checkout");
    expect(text).toContain("before paying again");
    expect(text).toContain("A recovery confirmation does not prove");
    expect(text).toContain("### Local setup is blocked");
    expect(text).toContain("Do not share passwords, card details, API keys");
    expect(text).toContain("do not run migrations or seeds against production");
    expect(text).toContain("record that flow as unverified");
  });

  it("keeps recovery entry points and resolvable guide links", () => {
    const links = Array.from(
      timeline.matchAll(/\]\(([^)]+)\)/g),
      ([, href]) => href,
    );
    expect(links).toContain("/orders/recover");
    expect(links).toContain("/orders/support");
    expect(links).toContain("#setup-flow");
    const docLinks = links.filter((href) => href.startsWith("/docs/starter-pro/"));
    expect(docLinks.length).toBeGreaterThan(0);
    for (const href of docLinks) {
      const [path, anchor] = href.split("#");
      const target = resolve(marketingRoot, `content${path}.mdx`);
      expect(existsSync(target), href).toBe(true);
      if (anchor === "if-recovery-does-not-work") {
        expect(readFileSync(target, "utf8")).toContain(
          "## If recovery does not work",
        );
      }
    }
    expect(
      links.every((href) => href.startsWith("/") || href.startsWith("#")),
    ).toBe(true);
  });
});
