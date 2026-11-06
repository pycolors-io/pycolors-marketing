import type { SiteLocale } from "@/lib/i18n/routing";
import { createProposalTemplate } from "./proposal-template";

export type ProposalBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] };

export type ProposalSection = {
  id: string;
  title: string;
  blocks: ProposalBlock[];
};

export type ProposalDocument = {
  title: string;
  introduction: string;
  sections: ProposalSection[];
};

export type ProposalInline = {
  text: string;
  bold?: boolean;
  href?: string;
};

/** Only the small, author-owned Markdown vocabulary used by this template. */
export function proposalInlines(text: string): ProposalInline[] {
  return text
    .split(/(\*\*[^*]+\*\*|\[[^\]]+\]\(https:\/\/[^)]+\))/g)
    .filter(Boolean)
    .map((part) => {
      if (part.startsWith("**")) return { text: part.slice(2, -2), bold: true };
      const link = part.match(/^\[([^\]]+)\]\((https:\/\/[^)]+)\)$/);
      return link ? { text: link[1]!, href: link[2]! } : { text: part };
    });
}

/** Shared content for the web preview and native, editable Word document. */
export function proposalDocument(locale: SiteLocale): ProposalDocument {
  const lines = createProposalTemplate(locale).trim().split("\n");
  const document: ProposalDocument = {
    title: lines[0]!.replace(/^# PYCOLORS · /, ""),
    introduction: lines[2]!.replace(/^\*\*|\*\*$/g, ""),
    sections: [],
  };
  let section: ProposalSection | undefined;
  for (let index = 3; index < lines.length; index++) {
    const line = lines[index]!.trim();
    if (!line) continue;
    if (line.startsWith("## ")) {
      section = {
        id: `section-${document.sections.length + 1}`,
        title: line.replace(/^## \d+\. /, ""),
        blocks: [],
      };
      document.sections.push(section);
    } else if (section && line.startsWith("|")) {
      const cells = (row: string) =>
        row
          .split("|")
          .slice(1, -1)
          .map((cell) => cell.trim());
      const table: Extract<ProposalBlock, { type: "table" }> = {
        type: "table",
        headers: cells(line),
        rows: [],
      };
      index++; // Column separators, authored alongside the header.
      while (lines[index + 1]?.startsWith("|"))
        table.rows.push(cells(lines[++index]!));
      section.blocks.push(table);
    } else if (section && line.startsWith("- ")) {
      const last = section.blocks.at(-1);
      if (last?.type === "list") last.items.push(line.slice(2));
      else section.blocks.push({ type: "list", items: [line.slice(2)] });
    } else if (section) section.blocks.push({ type: "paragraph", text: line });
  }
  return document;
}
