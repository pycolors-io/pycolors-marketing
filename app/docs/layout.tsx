import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';

import { getDocsNavLinks, source } from '@/lib/source';
import { baseOptions } from '@/lib/layout.shared';
import { ToastDocsProvider } from '@/content/docs/previews/toast-docs-provider';
import { DocsFooter } from '@/components/docs-footer';
import { JsonLd } from '@/components/seo/json-ld';
import { generateBreadcrumbJsonLd } from '@/lib/seo/breadcrumb';
import { DocsHeader } from '@/components/docs-header';

export const metadata: Metadata = {
  alternates: {
    canonical: '/docs',
  },
  title: {
    default: 'Next.js SaaS Documentation',
    template: '%s · Docs · PyColors',
  },
  description:
    'Official PyColors documentation for building modern Next.js SaaS products with UI foundations, SaaS patterns, Starter Free, Starter Pro, authentication, billing, and production-ready architecture.',

  openGraph: {
    type: 'website',
    siteName: 'PyColors',
    title: 'Next.js SaaS Documentation',
    description:
      'Official PyColors docs for UI foundations, SaaS patterns, Starter Free, Starter Pro, authentication, billing, and production-ready Next.js architecture.',
    url: '/docs',
    images: ['/seo/og-main.png'],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Next.js SaaS Documentation',
    description:
      'Documentation for building modern Next.js SaaS products faster with PyColors.',
    images: ['/seo/twitter-main.png'],
  },
};

function SidebarBanner() {
  return (
    <div className="rounded-[5px] border border-border-subtle bg-surface px-3 py-2.5">
      <div className="space-y-1">
        <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          PyColors
        </div>

        <p className="text-xs leading-5 text-muted-foreground">
          Templates, UI primitives, and production-ready SaaS
          foundations.
        </p>
      </div>
    </div>
  );
}

export default function Layout({
  children,
}: {
  readonly children: ReactNode;
}) {
  const docsLinks = getDocsNavLinks();

  const docsTree = {
    ...source.pageTree,
    children: source.pageTree.children.filter(
      (item) => item.type !== 'page' || item.url !== '/docs',
    ),
  };

  const breadcrumb = generateBreadcrumbJsonLd([
    { label: 'Home', href: '/' },
    { label: 'Docs', href: '/docs' },
  ]);

  return (
    <>
      <JsonLd id="docs-breadcrumb" data={breadcrumb} />

      <div className="min-h-screen">
        <DocsLayout
          tree={docsTree}
          {...baseOptions()}
          nav={{
            enabled: true,
            component: <DocsHeader docsLinks={docsLinks} />,
          }}
          sidebar={{
            collapsible: false,
            banner: <SidebarBanner />,
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
