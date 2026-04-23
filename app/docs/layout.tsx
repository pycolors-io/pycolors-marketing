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
    template: '%s · Docs · PyColors',
  },
  description:
    'Official PyColors documentation. Build faster with production-shaped SaaS patterns, UI foundations, and Starter Pro guidance.',
  openGraph: {
    type: 'website',
    siteName: 'PyColors',
    title: 'PyColors Documentation',
    description:
      'Production-shaped documentation for PyColors, Starter Free, and Starter Pro.',
    url: '/docs',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PyColors Documentation',
    description:
      'Production-shaped docs for building SaaS products faster with PyColors.',
    images: ['/seo/twitter-main.png'],
  },
};

export default function Layout({
  children,
}: {
  readonly children: ReactNode;
}) {
  const docsLinks = getDocsNavLinks();

  const breadcrumb = generateBreadcrumbJsonLd([
    { label: 'Home', href: '/' },
    { label: 'Docs', href: '/docs' },
  ]);

  return (
    <>
      <JsonLd id="docs-breadcrumb" data={breadcrumb} />

      <div className="min-h-screen">
        <DocsLayout
          tree={source.pageTree}
          {...baseOptions()}
          nav={{
            enabled: true,
            component: <SiteHeader docsLinks={docsLinks} />,
          }}
          sidebar={{
            collapsible: false,
          }}
        >
          <ToastDocsProvider>
            <div className="docs-shell">{children}</div>
          </ToastDocsProvider>
        </DocsLayout>

        <DocsFooter />
      </div>
    </>
  );
}
