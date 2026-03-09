import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';

import { getDocsNavLinks, source } from '@/lib/source';
import { baseOptions } from '@/lib/layout.shared';
import { SiteHeader } from '@/components/layout/site-header';
import { ToastDocsProvider } from '@/content/docs/previews/toast-docs-provider';
import { DocsFooter } from '@/components/docs-footer';
import { JsonLd } from '@/components/seo/json-ld';
import { generateBreadcrumbJsonLd } from '@/lib/seo/breadcrumb';

export const metadata: Metadata = {
  alternates: { canonical: '/docs' },

  title: {
    default: 'Docs',
    template: '%s · Docs · PyColors UI',
  },
  description:
    'Official documentation for PyColors UI. Components, design tokens, patterns, and best practices to build production-ready SaaS interfaces.',

  openGraph: {
    type: 'website',
    siteName: 'PyColors UI',
    title: 'PyColors UI Documentation',
    description:
      'Components, tokens, patterns, and best practices for production-ready SaaS interfaces.',
    url: '/docs',
    images: ['/seo/og-main.png'],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'PyColors UI Documentation',
    description:
      'Components, tokens, and patterns for building modern SaaS UIs.',
    images: ['/seo/twitter-main.png'],
  },
};

export default function Layout({
  children,
}: {
  children: ReactNode;
}) {
  const docsLinks = getDocsNavLinks();

  const breadcrumb = generateBreadcrumbJsonLd([
    { label: 'Home', href: '/' },
    { label: 'Docs', href: '/docs' },
  ]);

  return (
    <>
      <JsonLd id="docs-breadcrumb" data={breadcrumb} />

      <div className="flex min-h-screen flex-col">
        <div className="flex-1">
          <DocsLayout
            tree={source.pageTree}
            {...baseOptions()}
            nav={{
              enabled: true,
              component: <SiteHeader docsLinks={docsLinks} />,
            }}
            sidebar={{ collapsible: false }}
          >
            <ToastDocsProvider>{children}</ToastDocsProvider>
          </DocsLayout>
        </div>
        <DocsFooter />
      </div>
    </>
  );
}
