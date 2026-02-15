import { docs } from 'fumadocs-mdx:collections/server';
import { type InferPageType, loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { flattenTree } from 'fumadocs-core/page-tree';

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
});

export function getPageImage(page: InferPageType<typeof source>) {
  const segments = [...page.slugs, 'image.png'];

  return {
    segments,
    url: `/og/docs/${segments.join('/')}`,
  };
}

export async function getLLMText(page: InferPageType<typeof source>) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title}

${processed}`;
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
