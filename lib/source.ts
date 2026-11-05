import { docsI18n } from "@/lib/i18n/docs";
import { blog, docs } from "fumadocs-mdx:collections/server";
import { type InferPageType, loader } from "fumadocs-core/source";
import { lucideIconsPlugin } from "fumadocs-core/source/lucide-icons";
import { flattenTree } from "fumadocs-core/page-tree";
import { toFumadocsSource } from "fumadocs-mdx/runtime/server";

export const source = loader({
  baseUrl: "/docs",
  i18n: docsI18n,
  source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export const blogSource = loader({
  baseUrl: "/blog",
  i18n: docsI18n,
  source: toFumadocsSource(blog, []),
});

export function getPageImage(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, "image.png"];

  return {
    segments,
    url: `/og/docs/${segments.join("/")}${page.locale === "fr" ? "?locale=fr" : ""}`,
  };
}

type ProcessedPageData = {
  title?: string;
  getText?: (type?: "raw" | "processed") => Promise<string>;
};

export async function getLLMText(page: InferPageType<typeof source>) {
  const data = page.data as unknown as ProcessedPageData;

  const processed = data.getText ? await data.getText("processed") : "";

  const title = data.title ?? "Untitled";

  return `# ${title}

${processed}`.trim();
}

export type DocsNavLink = {
  label: string;
  href: string;
};

export function getDocsNavLinks(locale: "en" | "fr" = "en"): DocsNavLink[] {
  const nodes = flattenTree(source.getPageTree(locale).children ?? []);

  return nodes.map((item) => ({
    label: typeof item.name === "string" ? item.name : item.url,
    href: item.url,
  }));
}
