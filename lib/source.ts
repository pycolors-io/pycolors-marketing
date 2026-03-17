import { blog, docs } from 'fumadocs-mdx:collections/server';
import { type InferPageType, loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { flattenTree } from 'fumadocs-core/page-tree';
import { toFumadocsSource } from 'fumadocs-mdx/runtime/server';

export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export const blogSource = loader({
  baseUrl: '/blog',
  source: toFumadocsSource(blog, []),
});

export function getPageImage(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url: `/og/docs/${segments.join('/')}`,
  };
}

type ProcessedPageData = {
  title?: string;
  getText?: (type?: 'raw' | 'processed') => Promise<string>;
};

export async function getLLMText(page: InferPageType<typeof source>) {
  const data = page.data as unknown as ProcessedPageData;

  const processed = data.getText
    ? await data.getText('processed')
    : '';

  const title = data.title ?? 'Untitled';

  return `# ${title}

${processed}`.trim();
}

export type DocsNavLink = {
  label: string;
  href: string;
};

export function getDocsNavLinks(): DocsNavLink[] {
  const nodes = flattenTree(source.pageTree.children ?? []);

  return nodes.map((item) => ({
    label: typeof item.name === 'string' ? item.name : item.url,
    href: item.url,
  }));
}
