// @vitest-environment node
// Documentation contracts only; no purchase, email, or download is executed.

import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { PRODUCT_DISPLAY } from "../../lib/products/public-catalog";

const marketingRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const guide = readFileSync(
  resolve(marketingRoot, "content/docs/starter-pro/delivery.mdx"),
  "utf8",
);
const text = guide.replace(/\s+/gu, " ");

function section(heading: string) {
  const start = guide.indexOf(heading);
  if (start < 0) {
    throw new Error(`Missing delivery section: ${heading}`);
  }
  const end = guide.indexOf("\n## ", start + heading.length);
  return guide.slice(start, end < 0 ? undefined : end);
}

describe("Starter Pro purchase delivery guidance", () => {
  it("distinguishes the purchased ZIP from the buyer's own SaaS", () => {
    expect(text).toContain("Starter Pro ZIP bought from PyColors");
    expect(text).toContain("do not need a PyColors account");
    expect(text).toContain("does not configure subscriptions");
    expect(text).toContain("does not provision or deploy your SaaS");
  });

  it("orders payment, email, claim, and download before setup", () => {
    const journey = section("## From payment to your ZIP");
    const steps = Array.from(
      journey.matchAll(/^(\d)\. \*\*([^*]+)\*\*/gm),
      ([, number, title]) => `${number}. ${title}`,
    );

    expect(steps).toEqual([
      "1. Complete checkout and check confirmation.",
      "2. Find the claim email.",
      "3. Open the original access link.",
      "4. Download, save, and start setup.",
    ]);
    expect(journey).toContain("**Download [product name]**");
    expect(journey).toContain("(#match-your-archive)");
  });

  it("keeps payment, inbox delivery, and download evidence separate", () => {
    expect(text).toContain("A browser redirect alone does not prove payment");
    expect(text).toContain("Email delivery can fail");
    expect(text).toContain("separate steps");
    expect(text).toContain(
      "An access-ready page does not prove that the file finished downloading",
    );
    expect(text).toContain("24 hours after they are issued");
    expect(guide).not.toContain("createDownloadToken(");
    expect(guide).not.toContain("payment_intent.succeeded");
    expect(guide).not.toContain("invoice.payment_succeeded");
  });

  it("provides failure paths without encouraging duplicate payment", () => {
    const failures = section("## When a delivery step fails");

    expect(failures).toContain("### Payment is pending or uncertain");
    expect(failures).toContain("### No claim email arrives");
    expect(failures).toContain('### The page says "Invalid access link"');
    expect(failures).toContain('### The page says "Access link unavailable"');
    expect(failures).toContain("### The download fails after access is ready");
    expect(text).toContain("before paying again");
    expect(text).toContain("Recovery does not complete an unpaid checkout");
    expect(text).toContain("A recovery confirmation does not prove");
    expect(text).toContain("cannot restore inactive purchase access");
    expect(text).toContain("selected product only");
    expect(text).not.toContain("most recent active purchase access");
  });

  it("keeps support information safe and bounded", () => {
    const support = section("## Ask for purchase support safely");
    const supportText = support.replace(/\s+/gu, " ");

    expect(support).toContain("/orders/support");
    expect(supportText).toContain("order reference if available");
    expect(supportText).toContain(
      "Do not send passwords, payment card details",
    );
    expect(supportText).toContain("API keys, or claim/download links");
    expect(supportText).toContain("Remove those details from screenshots");
    expect(supportText).toContain(
      "no response-time or resolution-time guarantee is promised",
    );
    expect(supportText).toContain("does not resend receipts or invoices");
  });

  it.each(["en", "fr"])(
    "routes each order to its matching guide in %s",
    (locale) => {
      const suffix = locale === "fr" ? ".fr.mdx" : ".mdx";
      const docs = resolve(marketingRoot, "content/docs/starter-pro");
      const delivery = readFileSync(resolve(docs, "delivery" + suffix), "utf8");
      const recovery = readFileSync(
        resolve(docs, "purchase-recovery" + suffix),
        "utf8",
      );
      const rows = delivery.split("\n").filter((line) => line.startsWith("|"));
      for (const slug of [
        "starter-pro",
        "starter-pro-mobile",
        "starter-pro-fullstack",
      ] as const) {
        const offer = PRODUCT_DISPLAY[slug];
        const matches = rows.filter(
          (row) => row.split("|")[1]?.trim() === offer.name,
        );
        expect(matches, offer.name).toHaveLength(1);
        expect(matches[0]).toContain("`" + slug + "`");
        expect(matches[0]).toContain("(" + offer.docsHref + ")");
      }
      expect(delivery).toContain("[#match-your-archive]");
      expect(recovery).toContain(
        "(/docs/starter-pro/delivery#match-your-archive)",
      );
      for (const guideText of [delivery, recovery]) {
        expect(guideText).not.toMatch(
          /(?:choose|choisi(?:r|ssez))\s+\*\*PyColors Starter Pro\*\*/iu,
        );
      }
    },
  );

  it.each(["en", "fr"])(
    "resolves guide links to public destinations in %s",
    (locale) => {
      const suffix = locale === "fr" ? ".fr.mdx" : ".mdx";
      const sources = ["delivery", "purchase-recovery"].map((name) =>
        readFileSync(
          resolve(marketingRoot, "content/docs/starter-pro", name + suffix),
          "utf8",
        ),
      );
      const links = Array.from(
        sources.join("\n").matchAll(/\]\(([^)]+)\)|href:\s*"([^"]+)"/gu),
        ([, markdownHref, componentHref]) =>
          markdownHref ?? componentHref ?? "",
      );

      expect(links).toEqual(
        expect.arrayContaining([
          "/orders/recover",
          "/orders/support",
          "/docs/starter-pro/purchase-recovery",
          "/docs/starter-pro/purchase-documents",
          "/docs/starter-pro/getting-started",
        ]),
      );
      for (const href of new Set(links)) {
        if (href === "#match-your-archive") {
          expect(sources[0]).toContain("[#match-your-archive]");
          continue;
        }
        expect(href).toMatch(/^\/[a-z0-9/-]+(?:#[a-z0-9-]+)?$/u);
        const [route, fragment] = href.split("#");
        const path = route.startsWith("/docs/")
          ? resolve(marketingRoot, `content${route}${suffix}`)
          : resolve(
              marketingRoot,
              "app/[locale]/(site)",
              route.slice(1),
              "page.tsx",
            );

        expect(existsSync(path), `Missing delivery destination: ${href}`).toBe(
          true,
        );
        if (fragment) {
          const destination = readFileSync(path, "utf8");
          expect(destination).toContain(
            route.startsWith("/docs/") ? `[#${fragment}]` : `id="${fragment}"`,
          );
        }
      }
    },
  );
});
