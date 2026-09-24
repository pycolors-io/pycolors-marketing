// @vitest-environment node
// Source and content contracts; these checks do not render the Marketing page.

import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { starterProBuyerFaqs } from "../../lib/products/starter-pro-buyer-faq";

const marketingRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

function findFaq(question: string) {
  const faq = starterProBuyerFaqs.find((item) => item.question === question);

  if (!faq) {
    throw new Error(`Missing buyer FAQ: ${question}`);
  }

  return faq;
}

describe("Starter Pro buyer FAQ", () => {
  it("gives each unique question a concrete next action", () => {
    const questions = starterProBuyerFaqs.map((faq) => faq.question);

    expect(questions.length).toBeGreaterThan(0);
    expect(new Set(questions).size).toBe(questions.length);

    for (const faq of starterProBuyerFaqs) {
      expect(faq.question.trim()).not.toBe("");
      expect(faq.answer.trim()).not.toBe("");
      expect(faq.links.length).toBeGreaterThan(0);
      expect(new Set(faq.links.map((link) => link.href)).size).toBe(
        faq.links.length,
      );

      for (const link of faq.links) {
        expect(link.label.trim()).not.toBe("");
        expect(link.label).not.toMatch(/^(click here|learn more)$/iu);
      }
    }
  });

  it("resolves every FAQ link to an existing public destination", () => {
    for (const faq of starterProBuyerFaqs) {
      for (const { href } of faq.links) {
        expect(href).toMatch(/^\/[a-z0-9/-]+$/u);

        const path = href.startsWith("/docs/")
          ? resolve(marketingRoot, "content/docs", `${href.slice(6)}.mdx`)
          : resolve(marketingRoot, "app/(site)", href.slice(1), "page.tsx");

        expect(existsSync(path), `Missing FAQ destination: ${href}`).toBe(true);
      }
    }
  });

  it("separates setup and source access from production readiness", () => {
    const preparation = findFaq("What should I prepare before local setup?");
    const timing = findFaq("How long before I can start?");
    const production = findFaq("Is Starter Pro production-ready?");
    const billing = findFaq("Is Stripe already integrated?");

    expect(preparation.answer).toContain("downloaded release");
    expect(preparation.answer).toContain("local PostgreSQL");
    expect(preparation.answer).toContain("does not provision");
    expect(timing.answer).toContain("suggested checkpoints");
    expect(timing.answer).toContain(
      "not a setup-time or email-delivery guarantee",
    );
    expect(production.answer).toContain("not a production launch");
    expect(production.answer).toContain("does not deploy or operate your SaaS");
    expect(billing.answer).toContain("test mode");
    expect(billing.answer).toContain("alone does not validate payments");
  });

  it("keeps recovery separate from payment and inbox delivery", () => {
    const payment = findFaq("What happens after payment?");
    const recovery = findFaq("What if I do not receive my purchase email?");

    expect(payment.answer).toContain("before paying again");
    expect(payment.answer).toContain("does not complete an unpaid checkout");
    expect(payment.links.map((link) => link.href)).toContain("/orders/support");
    expect(recovery.answer).toContain("does not prove an email arrived");
    expect(recovery.answer).toContain("before buying again");
    expect(recovery.links.map((link) => link.href)).toEqual(
      expect.arrayContaining(["/orders/recover", "/orders/support"]),
    );
  });

  it("preserves existing commercial and support boundaries", () => {
    for (const question of [
      "Do I own the source code?",
      "Can I use it commercially?",
      "Can I use it for client projects?",
    ]) {
      expect(findFaq(question).links.map((link) => link.href)).toContain(
        "/license",
      );
    }

    expect(findFaq("Do I get future Starter Pro updates?").answer).toContain(
      "subject to continued product availability",
    );
    expect(findFaq("What if local setup fails?").answer).toContain(
      "No response-time SLA is promised",
    );
    expect(findFaq("What is the refund policy?").answer).toContain(
      "unless required by applicable law",
    );
    expect(
      findFaq("What is the refund policy?").links.map((link) => link.href),
    ).toContain("/terms");
  });

  it("uses the shared content in the existing FAQ section", () => {
    const page = readFileSync(
      resolve(marketingRoot, "app/(site)/starters/pro/page.tsx"),
      "utf8",
    );
    const section = page.match(
      /<section id="buyer-faq"[\s\S]*?<\/section>/u,
    )?.[0];

    expect(page).toContain("@/lib/products/starter-pro-buyer-faq");
    expect(page).not.toMatch(/["']use client["']/u);
    expect(page).not.toContain("const faqs =");
    expect(section).toBeDefined();
    expect(section).toContain("starterProBuyerFaqs.map");
    expect(section).toContain("{faq.question}");
    expect(section).toContain("{faq.answer}");
    expect(section).toContain("faq.links.map");
    expect(section).toContain("<ul");
    expect(section).toContain("<li key={link.href}>");
    expect(section).toContain("href={link.href}");
    expect(section).toContain("{link.label}");
  });
});
