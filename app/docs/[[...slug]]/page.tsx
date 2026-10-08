import * as React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { DocsBody, DocsPage } from "fumadocs-ui/page";

import { getPageImage, source } from "@/lib/source";
import { getMDXComponents } from "@/mdx-components";
import { DocsPageShell } from "@/components/shells/docs-page-shell";
import { DocsPageFooter } from "@/components/docs/docs-page-footer";
import { DocsPageHeader } from "@/components/docs/docs-page-header";
import { UiExplorerLink } from "@/components/docs/ui-explorer-link";
import { formatDate } from "@/lib/format-date";
import { getPrevNextFromTree } from "@/lib/docs-navigation";

type MDXContentProps = {
  components?: ReturnType<typeof getMDXComponents>;
};

function getBreadcrumbs(slug?: string[]) {
  const items = [{ label: "Docs", href: "/docs" }];

  if (!slug || slug.length === 0) {
    return items;
  }

  let currentPath = "/docs";

  for (const segment of slug) {
    currentPath += `/${segment}`;

    items.push({
      label: segment
        .replaceAll("-", " ")
        .replace(/\b\w/g, (char) => char.toUpperCase()),
      href: currentPath,
    });
  }

  return items.map((item, index) => ({
    ...item,
    href: index === items.length - 1 ? undefined : item.href,
  }));
}

function getFooterCta(slug?: string[]) {
  const path = slug?.join("/") ?? "";

  if (path.startsWith("starter-pro")) {
    return {
      ctaLabel: "View pricing",
      ctaHref: "/pricing",
      ctaTitle: "Choose the right starting point",
      ctaDescription:
        "Compare what is included before choosing a product for your project.",
    };
  }

  if (path.startsWith("starter")) {
    return {
      ctaLabel: "Explore Starter Pro",
      ctaHref: "/starters/pro",
      ctaTitle: "Ready to connect real services?",
      ctaDescription:
        "Review the authentication, billing, and backend foundation included in Starter Pro.",
    };
  }

  if (path.startsWith("patterns")) {
    return {
      ctaLabel: "See Starter Pro",
      ctaHref: "/docs/starter-pro",
      ctaTitle: "Connect your interface to an application",
      ctaDescription:
        "Explore how Starter Pro brings product screens together with authentication and billing.",
    };
  }

  if (path.startsWith("ui")) {
    return {
      ctaLabel: "Explore Patterns",
      ctaHref: "/docs/patterns",
      ctaTitle: "Put these components to work",
      ctaDescription:
        "Follow patterns for forms, data views, and feedback in a complete product flow.",
    };
  }

  return {
    ctaLabel: "Explore Starter Free",
    ctaHref: "/docs/starter",
    ctaTitle: "Explore a complete frontend",
    ctaDescription:
      "See how components and blocks fit together in Starter Free, with demo data and product flows.",
  };
}

export default async function Page(props: PageProps<"/docs/[[...slug]]">) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  const breadcrumbs = getBreadcrumbs(params.slug);

  if (!page) notFound();

  const MdxContent = page.data.body as React.ComponentType<MDXContentProps>;
  const isDocsHome = page.url === "/docs";
  const showDefaultHeader = page.data.hero !== true;
  const footerCta = getFooterCta(params.slug);

  const { previous, next } = getPrevNextFromTree(source.pageTree, page.url);

  const toc =
    Array.isArray(page.data.toc) && page.data.toc.length > 0
      ? page.data.toc.filter((item) => item.depth <= 2)
      : [];

  return (
    <DocsPage
      toc={toc}
      full={page.data.full}
      breadcrumb={{ enabled: false }}
      tableOfContentPopover={isDocsHome ? { enabled: false } : undefined}
      footer={{
        enabled: !isDocsHome,
        component: (
          <DocsPageFooter previous={previous} next={next} {...footerCta} />
        ),
      }}
    >
      <DocsPageShell full={page.data.full}>
        {showDefaultHeader ? (
          <DocsPageHeader
            title={page.data.title}
            description={page.data.description}
            lastUpdated={formatDate(page.data.lastUpdated)}
            appliesTo={page.data.appliesTo}
            breadcrumbs={breadcrumbs}
          />
        ) : null}

        <UiExplorerLink slug={params.slug} toc={page.data.toc} />

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
  props: PageProps<"/docs/[[...slug]]">,
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
