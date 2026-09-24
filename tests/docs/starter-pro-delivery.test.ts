// @vitest-environment node
// Documentation contracts only; no purchase, email, or download is executed.

import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

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
    expect(journey).toContain("**Download package**");
    expect(journey).toContain("/docs/starter-pro/getting-started");
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
    expect(text).toContain("most recent active purchase access");
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

  it("resolves guide links to existing public destinations", () => {
    const links = Array.from(
      guide.matchAll(/\]\(([^)]+)\)|href:\s*"([^"]+)"/gu),
      ([, markdownHref, componentHref]) => markdownHref ?? componentHref,
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
      expect(href).toMatch(/^\/[a-z0-9/-]+$/u);
      if (!href) {
        throw new Error("Delivery link is missing its destination");
      }
      const path = href.startsWith("/docs/")
        ? resolve(marketingRoot, `content${href}.mdx`)
        : resolve(marketingRoot, "app/(site)", href.slice(1), "page.tsx");

      expect(existsSync(path), `Missing delivery destination: ${href}`).toBe(
        true,
      );
    }
  });
});
