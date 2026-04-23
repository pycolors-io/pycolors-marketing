import * as React from 'react';
import { getPageImage, source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/mdx-components';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { DocsPageShell } from '@/components/shells/docs-page-shell';

type MDXContentProps = {
  components?: ReturnType<typeof getMDXComponents>;
};

export default async function Page(
  props: PageProps<'/docs/[[...slug]]'>,
) {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) notFound();

  const MdxContent = page.data
    .body as React.ComponentType<MDXContentProps>;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsPageShell full={page.data.full}>
        <header className="space-y-3">
          <DocsTitle className="font-brand text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {page.data.title}
          </DocsTitle>

          {page.data.description ? (
            <DocsDescription className="max-w-xl text-[15px] leading-6 text-muted-foreground">
              {page.data.description}
            </DocsDescription>
          ) : null}
        </header>

        <DocsBody className="docs-prose">
          <MdxContent
            components={getMDXComponents({
              a: createRelativeLink(source, page),
            })}
          />
        </DocsBody>
      </DocsPageShell>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<'/docs/[[...slug]]'>,
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}
