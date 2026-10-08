import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";

import { source } from "@/lib/source";
import { baseOptions } from "@/lib/layout.shared";
import { ToastDocsProvider } from "@/content/docs/previews/toast-docs-provider";
import { DocsFooter } from "@/components/docs-footer";
import { JsonLd } from "@/components/seo/json-ld";
import { generateBreadcrumbJsonLd } from "@/lib/seo/breadcrumb";
import { DocsHeader } from "@/components/docs-header";
import {
  DocsSidebarItem,
  DocsSidebarPublications,
} from "@/components/docs/docs-sidebar-items";

export const metadata: Metadata = {
  alternates: {
    canonical: "/docs",
  },
  title: {
    default: "Next.js SaaS Documentation",
    template: "%s · Docs · PyColors",
  },
  description:
    "Official PyColors documentation for building modern Next.js SaaS products with UI foundations, SaaS patterns, Starter Free, Starter Pro, authentication, billing, and production-ready architecture.",

  openGraph: {
    type: "website",
    siteName: "PyColors",
    title: "Next.js SaaS Documentation",
    description:
      "Official PyColors docs for UI foundations, SaaS patterns, Starter Free, Starter Pro, authentication, billing, and production-ready Next.js architecture.",
    url: "/docs",
    images: ["/seo/og-main.png"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Next.js SaaS Documentation",
    description:
      "Documentation for building modern Next.js SaaS products faster with PyColors.",
    images: ["/seo/twitter-main.png"],
  },
};

function SidebarBanner() {
  return (
    <Link
      href="/docs"
      className="group flex items-start gap-3 rounded-md border border-border-subtle bg-card p-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <BookOpen
        className="mt-0.5 size-4 shrink-0 text-primary"
        aria-hidden="true"
      />
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium text-foreground">
          Documentation
        </span>
        <span className="mt-1 block text-xs leading-5 text-muted-foreground">
          Setup, components, and guides.
        </span>
      </span>
      <ArrowUpRight
        className="mt-0.5 size-3.5 shrink-0 text-muted-foreground group-hover:text-foreground"
        aria-hidden="true"
      />
    </Link>
  );
}

export default function Layout({ children }: { readonly children: ReactNode }) {
  const publicationDates = Object.fromEntries(
    source
      .getPages()
      .flatMap((page) =>
        page.data.publishedAt ? [[page.url, page.data.publishedAt]] : [],
      ),
  );

  const docsTree = {
    ...source.pageTree,
    children: source.pageTree.children.filter(
      (item) => item.type !== "page" || item.url !== "/docs",
    ),
  };

  const breadcrumb = generateBreadcrumbJsonLd([
    { label: "Home", href: "/" },
    { label: "Docs", href: "/docs" },
  ]);

  return (
    <>
      <JsonLd id="docs-breadcrumb" data={breadcrumb} />

      <div className="min-h-screen">
        <DocsSidebarPublications dates={publicationDates}>
          <DocsLayout
            tree={docsTree}
            {...baseOptions()}
            containerProps={{
              style: {
                "--fd-banner-height": "var(--fd-nav-height)",
              } as CSSProperties,
            }}
            nav={{
              enabled: true,
              component: <DocsHeader />,
            }}
            sidebar={{
              collapsible: false,
              banner: <SidebarBanner />,
              components: { Item: DocsSidebarItem },
            }}
          >
            <ToastDocsProvider>
              <div className="docs-shell contents">{children}</div>
            </ToastDocsProvider>
          </DocsLayout>
        </DocsSidebarPublications>
        <DocsFooter />
      </div>
    </>
  );
}
