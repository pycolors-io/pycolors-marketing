import { useCopy } from "@/lib/i18n/use-copy";
import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { FullSearchTrigger } from "fumadocs-ui/layouts/shared/slots/search-trigger";
import { Link } from "@/lib/i18n/navigation";
import { ArrowUpRight, BookOpen } from "lucide-react";

import { baseMetadata } from "@/components/layout/root-document";

import { source } from "@/lib/source";
import { baseOptions } from "@/lib/layout.shared";
import { ToastDocsProvider } from "@/content/docs/previews/toast-docs-provider";
import { DocsFooter } from "@/components/docs-footer";
import { JsonLd } from "@/components/seo/json-ld";
import { generateBreadcrumbJsonLd } from "@/lib/seo/breadcrumb";
import { DocsHeader } from "@/components/docs-header";
import { DocsAssistant } from "@/components/docs/docs-assistant";
import { DocsFrameworkProvider } from "@/components/docs/docs-framework-provider";
import styles from "@/components/docs/docs-design.module.css";
import {
  DocsSidebarItem,
  DocsSidebarNavTitle,
  DocsSidebarPublications,
} from "@/components/docs/docs-sidebar-items";

export const metadata: Metadata = {
  ...baseMetadata,
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
  const tSite = useCopy();

  return (
    <div className={styles.sidebarStart}>
      <FullSearchTrigger
        className={styles.sidebarSearch}
        aria-label={tSite("Search the documentation")}
      />
      <Link href="/docs" className={styles.sidebarBanner}>
        <BookOpen className="size-4 shrink-0" aria-hidden="true" />
        <span className="flex-1 text-[13px] font-medium">
          {tSite("Documentation")}
        </span>
        <ArrowUpRight className="size-3.5" aria-hidden="true" />
      </Link>
      <DocsAssistant className={styles.sidebarAssistant} />
    </div>
  );
}

export default function Layout({ children }: { readonly children: ReactNode }) {
  const tSite = useCopy();

  const tree = source.getPageTree(tSite.locale);
  const publicationDates = Object.fromEntries(
    source
      .getPages(tSite.locale)
      .flatMap((page) =>
        page.data.publishedAt ? [[page.url, page.data.publishedAt]] : [],
      ),
  );

  const docsTree = {
    ...tree,
    children: tree.children.filter(
      (item) => item.type !== "page" || item.url !== tSite.href("/docs"),
    ),
  };

  const breadcrumb = generateBreadcrumbJsonLd([
    { label: "Home", href: "/" },
    { label: "Docs", href: "/docs" },
  ]);

  return (
    <>
      <JsonLd id="docs-breadcrumb" data={breadcrumb} />

      <div className={`site-frame relative min-h-screen ${styles.frame}`}>
        <DocsFrameworkProvider>
          <DocsSidebarPublications dates={publicationDates}>
            <DocsLayout
              tree={docsTree}
              {...baseOptions()}
              slots={{ navTitle: DocsSidebarNavTitle }}
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
                <div className="docs-shell contents">{tSite(children)}</div>
              </ToastDocsProvider>
            </DocsLayout>
          </DocsSidebarPublications>
        </DocsFrameworkProvider>
        <DocsFooter />
      </div>
    </>
  );
}
