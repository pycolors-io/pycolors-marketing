// @vitest-environment node
import { describe, expect, it } from "vitest";
import { createProposalTemplate } from "@/lib/quotes/proposal-template";
import {
  proposalDocument,
  proposalInlines,
} from "@/lib/quotes/proposal-document";
import { createProposalDocx } from "@/lib/quotes/proposal-docx";
import { unzipSync, strFromU8 } from "fflate";
import { LEGAL_COMPANY } from "@/lib/products/commercial-policy";
import { GET } from "@/app/[locale]/(site)/request-a-quote/template/word/route";
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
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      );
      expect(response.headers.get("content-disposition")).toContain(
        `pycolors-proposal-template-${locale}.docx`,
      );
      expect(response.headers.get("x-robots-tag")).toBe("noindex");
      expect(response.headers.get("x-content-type-options")).toBe("nosniff");
      const bytes = new Uint8Array(await response.arrayBuffer());
      const files = unzipSync(bytes);
      const documentXml = strFromU8(files["word/document.xml"]!);
      const text = createProposalTemplate(locale);
      const document = proposalDocument(locale);
      expect(document.sections).toHaveLength(10);
      expect(
        document.sections
          .flatMap((section) => section.blocks)
          .filter((block) => block.type === "table"),
      ).toHaveLength(4);
      for (const section of document.sections)
        expect(documentXml).toContain(section.title);
      expect(documentXml.match(/<w:tbl>/g)).toHaveLength(4);
      expect(documentXml).toContain("<w:tblHeader/>");
      expect(documentXml).not.toContain("**");
      expect(Object.keys(files).some((name) => /vba|macro/i.test(name))).toBe(
        false,
      );
      expect(strFromU8(files["word/styles.xml"]!)).toContain(
        'w:styleId="Title"',
      );
      expect(strFromU8(files["word/_rels/document.xml.rels"]!)).toContain(
        localizedHref("/terms", locale),
      );
      expect(createProposalDocx(locale)).toEqual(bytes);
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
    expect(localizedHref("/request-a-quote/template/word", "fr")).toBe(
      "/fr/demande-de-devis/modele/word",
    );
  });
  it("preserves placeholders and only interprets the template's own inline markup", () => {
    expect(
      proposalInlines(
        "Client: [complete] **Scope** [terms](https://pycolors.io/terms)",
      ),
    ).toEqual([
      { text: "Client: [complete] " },
      { text: "Scope", bold: true },
      { text: " " },
      { text: "terms", href: "https://pycolors.io/terms" },
    ]);
    expect(proposalInlines("[bad](javascript:alert(1))")).toEqual([
      { text: "[bad](javascript:alert(1))" },
    ]);
  });
});
