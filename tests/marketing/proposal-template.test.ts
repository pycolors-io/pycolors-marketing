// @vitest-environment node
import { describe, expect, it } from "vitest";
import { createProposalTemplate } from "@/lib/quotes/proposal-template";
import { LEGAL_COMPANY } from "@/lib/products/commercial-policy";
import { GET } from "@/app/[locale]/(site)/request-a-quote/template/route";
import { localizedHref } from "@/lib/i18n/routing";

describe("editable implementation proposal", () => {
  it.each(["en", "fr"] as const)(
    "downloads a blank, complete %s proposal without customer or agreed-price claims",
    async (locale) => {
      const response = await GET(
        new Request("https://pycolors.io/request-a-quote/template"),
        { params: Promise.resolve({ locale }) },
      );
      expect(response.status).toBe(200);
      expect(response.headers.get("content-type")).toBe(
        "text/markdown; charset=utf-8",
      );
      expect(response.headers.get("content-disposition")).toContain(
        `pycolors-proposal-template-${locale}.md`,
      );
      expect(response.headers.get("x-robots-tag")).toBe("noindex");
      expect(response.headers.get("x-content-type-options")).toBe("nosniff");
      const text = await response.text();
      expect(text).toBe(createProposalTemplate(locale));
      expect(text.match(/^## /gm)).toHaveLength(10);
      expect(text).toContain(LEGAL_COMPANY.name);
      expect(text).toContain(LEGAL_COMPANY.vatNumber);
      expect(text).toContain(
        `https://pycolors.io${localizedHref("/terms", locale)}`,
      );
      expect(text).not.toMatch(/[\u2047\ufffd]/);
      expect(text).not.toMatch(
        /(?:Total TTC|Total including VAT).*\d[\d ,]* €/,
      );
      expect(text).toContain(
        locale === "fr" ? "Modèle vierge" : "Blank template",
      );
    },
  );
  it("keeps the downloadable document linked to the French quote route", () => {
    expect(localizedHref("/request-a-quote/template", "fr")).toBe(
      "/fr/demande-de-devis/modele",
    );
    expect(localizedHref("/fr/demande-de-devis/modele", "en")).toBe(
      "/request-a-quote/template",
    );
  });
});
