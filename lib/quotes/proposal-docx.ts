import { strToU8, zipSync } from "fflate";
import type { SiteLocale } from "@/lib/i18n/routing";
import {
  proposalDocument,
  proposalInlines,
  type ProposalBlock,
} from "./proposal-document";

const W = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";
const R = "http://schemas.openxmlformats.org/officeDocument/2006/relationships";
const XML = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';
const xml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;",
      })[character]!,
  );

/** Native OOXML text and tables, using the app's existing ZIP dependency. No macros or external assets. */
export function createProposalDocx(locale: SiteLocale): Uint8Array {
  const document = proposalDocument(locale);
  const hyperlinks = new Map<string, string>();
  const runs = (text: string) =>
    proposalInlines(text)
      .map((part) => {
        const run = `<w:r>${part.bold || part.href ? `<w:rPr>${part.bold ? "<w:b/>" : '<w:u w:val="single"/>'}</w:rPr>` : ""}<w:t xml:space="preserve">${xml(part.text)}</w:t></w:r>`;
        if (!part.href) return run;
        if (!hyperlinks.has(part.href))
          hyperlinks.set(part.href, `link${hyperlinks.size + 1}`);
        return `<w:hyperlink r:id="${hyperlinks.get(part.href)}">${run}</w:hyperlink>`;
      })
      .join("");
  const paragraph = (text: string, style = "Normal", properties = "") =>
    `<w:p><w:pPr><w:pStyle w:val="${style}"/>${properties}</w:pPr>${runs(text)}</w:p>`;
  const table = (
    block: Extract<ProposalBlock, { type: "table" }>,
    section: number,
  ) => {
    const widths =
      section === 3
        ? [1200, 1980, 2100, 1960, 2120]
        : section === 4
          ? [1700, 2550, 2310, 1400, 1400]
          : section === 6
            ? [1300, 1900, 1920, 1800, 1290, 1150]
            : [2700, 1860, 1500, 1650, 1650];
    const rows = [block.headers, ...block.rows]
      .map(
        (row, index) =>
          `<w:tr><w:trPr><w:cantSplit/>${index === 0 ? "<w:tblHeader/>" : ""}</w:trPr>${row.map((cell, column) => `<w:tc><w:tcPr><w:tcW w:w="${widths[column]}" w:type="dxa"/><w:vAlign w:val="center"/>${index === 0 ? '<w:shd w:fill="F3F3F3"/>' : ""}</w:tcPr>${paragraph(index === 0 ? `**${cell}**` : cell, "TableText", (column === 0 && section === 3) || (section === 6 && [0, 5].includes(column)) ? '<w:jc w:val="center"/>' : "")}</w:tc>`).join("")}</w:tr>`,
      )
      .join("");
    return `<w:tbl><w:tblPr><w:tblW w:w="9360" w:type="dxa"/><w:tblLayout w:type="fixed"/><w:tblBorders>${["top", "left", "bottom", "right", "insideH", "insideV"].map((side) => `<w:${side} w:val="single" w:sz="4" w:color="D9D9D9"/>`).join("")}</w:tblBorders><w:tblCellMar><w:top w:w="110" w:type="dxa"/><w:left w:w="120" w:type="dxa"/><w:bottom w:w="110" w:type="dxa"/><w:right w:w="120" w:type="dxa"/></w:tblCellMar></w:tblPr><w:tblGrid>${widths.map((width) => `<w:gridCol w:w="${width}"/>`).join("")}</w:tblGrid>${rows}</w:tbl>${paragraph("", "TableSpace")}`;
  };
  const body = [
    paragraph(document.title, "Title"),
    paragraph(document.introduction, "Introduction"),
    ...document.sections.flatMap((section, index) => [
      [2, 4, 6, 8].includes(index)
        ? '<w:p><w:pPr><w:spacing w:after="0" w:line="20" w:lineRule="exact"/></w:pPr><w:r><w:br w:type="page"/></w:r></w:p>'
        : "",
      paragraph(
        `${String(index + 1).padStart(2, "0")}  ${section.title}`,
        "Heading1",
      ),
      ...section.blocks.map((block) => {
        if (block.type === "table") return table(block, index + 1);
        if (block.type === "paragraph") return paragraph(block.text);
        return block.items
          .map((item) =>
            paragraph(
              item,
              "ListParagraph",
              `${index === 9 ? "<w:keepNext/>" : ""}<w:numPr><w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr>`,
            ),
          )
          .join("");
      }),
    ]),
  ].join("");

  const styles = `${XML}<w:styles xmlns:w="${W}">
    <w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/><w:color w:val="000000"/><w:sz w:val="22"/><w:lang w:val="${locale === "fr" ? "fr-FR" : "en-GB"}"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="120" w:line="276" w:lineRule="auto"/><w:widowControl/></w:pPr></w:pPrDefault></w:docDefaults>
    <w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/></w:style>
    <w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:basedOn w:val="Normal"/><w:pPr><w:keepNext/><w:spacing w:after="220"/></w:pPr><w:rPr><w:b/><w:color w:val="000000"/><w:sz w:val="46"/></w:rPr></w:style>
    <w:style w:type="paragraph" w:styleId="Introduction"><w:name w:val="Introduction"/><w:basedOn w:val="Normal"/><w:pPr><w:spacing w:after="240"/></w:pPr><w:rPr><w:color w:val="555555"/></w:rPr></w:style>
    <w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:pPr><w:keepNext/><w:keepLines/><w:spacing w:before="280" w:after="140"/><w:outlineLvl w:val="0"/></w:pPr><w:rPr><w:b/><w:color w:val="000000"/><w:sz w:val="26"/></w:rPr></w:style>
    <w:style w:type="paragraph" w:styleId="ListParagraph"><w:name w:val="List Paragraph"/><w:basedOn w:val="Normal"/><w:pPr><w:spacing w:after="100"/></w:pPr></w:style>
    <w:style w:type="paragraph" w:styleId="TableText"><w:name w:val="Table text"/><w:basedOn w:val="Normal"/><w:pPr><w:spacing w:before="0" w:after="0" w:line="252" w:lineRule="auto"/></w:pPr><w:rPr><w:sz w:val="19"/></w:rPr></w:style>
    <w:style w:type="paragraph" w:styleId="TableSpace"><w:name w:val="Table spacing"/><w:basedOn w:val="Normal"/><w:pPr><w:spacing w:before="0" w:after="0" w:line="100" w:lineRule="exact"/></w:pPr><w:rPr><w:sz w:val="4"/></w:rPr></w:style>
    <w:style w:type="paragraph" w:styleId="Header"><w:name w:val="Header"/><w:basedOn w:val="Normal"/><w:rPr><w:b/><w:color w:val="000000"/><w:sz w:val="18"/></w:rPr></w:style>
    <w:style w:type="paragraph" w:styleId="Footer"><w:name w:val="Footer"/><w:basedOn w:val="Normal"/><w:pPr><w:jc w:val="right"/></w:pPr><w:rPr><w:color w:val="555555"/><w:sz w:val="16"/></w:rPr></w:style>
  </w:styles>`;
  const relationship = (
    id: string,
    type: string,
    target: string,
    external = false,
  ) =>
    `<Relationship Id="${id}" Type="${R}/${type}" Target="${xml(target)}"${external ? ' TargetMode="External"' : ""}/>`;
  const files: Record<string, string> = {
    "[Content_Types].xml": `${XML}<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/>${[
      ["document", "document.main"],
      ["styles", "styles"],
      ["settings", "settings"],
      ["numbering", "numbering"],
      ["header1", "header"],
      ["footer1", "footer"],
    ]
      .map(
        ([part, type]) =>
          `<Override PartName="/word/${part}.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.${type}+xml"/>`,
      )
      .join(
        "",
      )}<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/></Types>`,
    "_rels/.rels": `${XML}<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${relationship("document", "officeDocument", "word/document.xml")}<Relationship Id="core" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/></Relationships>`,
    "word/document.xml": `${XML}<w:document xmlns:w="${W}" xmlns:r="${R}"><w:body>${body}<w:sectPr><w:headerReference w:type="default" r:id="header"/><w:footerReference w:type="default" r:id="footer"/><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440" w:header="720" w:footer="720"/></w:sectPr></w:body></w:document>`,
    "word/styles.xml": styles,
    "word/settings.xml": `${XML}<w:settings xmlns:w="${W}"><w:defaultTabStop w:val="720"/><w:updateFields w:val="true"/></w:settings>`,
    "word/numbering.xml": `${XML}<w:numbering xmlns:w="${W}"><w:abstractNum w:abstractNumId="0"><w:multiLevelType w:val="singleLevel"/><w:lvl w:ilvl="0"><w:start w:val="1"/><w:numFmt w:val="bullet"/><w:lvlText w:val="•"/><w:lvlJc w:val="left"/><w:pPr><w:tabs><w:tab w:val="num" w:pos="240"/></w:tabs><w:ind w:left="240" w:hanging="240"/></w:pPr></w:lvl></w:abstractNum><w:num w:numId="1"><w:abstractNumId w:val="0"/></w:num></w:numbering>`,
    "word/header1.xml": `${XML}<w:hdr xmlns:w="${W}">${paragraph("PYCOLORS", "Header")}</w:hdr>`,
    "word/footer1.xml": `${XML}<w:ftr xmlns:w="${W}"><w:p><w:pPr><w:pStyle w:val="Footer"/></w:pPr><w:r><w:t>${xml(locale === "fr" ? "Modèle vierge" : "Blank template")} · </w:t></w:r><w:fldSimple w:instr="PAGE"/><w:r><w:t xml:space="preserve"> / </w:t></w:r><w:fldSimple w:instr="NUMPAGES"/></w:p></w:ftr>`,
    "word/_rels/document.xml.rels": `${XML}<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${["styles", "settings", "numbering"].map((type) => relationship(type, type, `${type}.xml`)).join("")}${relationship("header", "header", "header1.xml")}${relationship("footer", "footer", "footer1.xml")}${[...hyperlinks].map(([href, id]) => relationship(id, "hyperlink", href, true)).join("")}</Relationships>`,
    "docProps/core.xml": `${XML}<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/"><dc:title>${xml(document.title)}</dc:title><dc:creator>PyColors</dc:creator><dc:language>${locale}</dc:language></cp:coreProperties>`,
  };
  // Fixed ZIP timestamps make downloads reproducible across builds.
  return zipSync(
    Object.fromEntries(
      Object.entries(files).map(([name, content]) => [
        name,
        [strToU8(content), { mtime: new Date("2020-01-01T00:00:00Z") }],
      ]),
    ),
    { level: 6 },
  );
}
