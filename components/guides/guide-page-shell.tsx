import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { Badge } from "@pycolors/ui";
import { Container } from "@/components/container";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import type { BreadcrumbItem } from "@/lib/seo/breadcrumb";
import { OnThisPageInline, type TocItem } from "./on-this-page-inline";
import styles from "./guide-article.module.css";

type GuideLink = Readonly<{ title: string; href: string }>;
type GuidePageShellProps = Readonly<{
  badge?: string;
  title: string;
  description: string;
  tags?: string[];
  toc: TocItem[];
  children: ReactNode;
  breadcrumb?: BreadcrumbItem[];
  documentation?: GuideLink;
  relatedGuides?: readonly GuideLink[];
}>;

/** Shared reading layout for the eight public marketing guides. */
export function GuidePageShell({
  badge = "Guide",
  title,
  description,
  tags = ["Next.js", "SaaS"],
  toc,
  children,
  breadcrumb,
  documentation,
  relatedGuides = [],
}: GuidePageShellProps) {
  const items = breadcrumb?.length
    ? breadcrumb
    : [
        { label: "Home", href: "/" },
        { label: "Guides", href: "/guides" },
        { label: title, href: "#" },
      ];
  return (
    <main
      id="content"
      tabIndex={-1}
      className={`${styles.page} bg-background text-foreground`}
    >
      <Container className="pb-16 pt-24 sm:pt-28">
        <Breadcrumb className={`${styles.breadcrumb} mb-8`} items={items} />
        <header className="border-b border-border-subtle pb-10 sm:pb-12">
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <Badge
              variant="outline"
              className="rounded-[5px] px-2.5 py-1 text-[11px]"
            >
              {badge}
            </Badge>
            {tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
            <span aria-hidden="true">/</span>
            <span>{toc.length} sections</span>
          </div>
          <h1
            id="guide-title"
            className="mt-5 max-w-4xl text-balance font-brand text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl"
          >
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-[15px] leading-7 text-muted-foreground sm:text-base sm:leading-8">
            {description}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-1">
            <Link href="/guides" className={styles.textLink}>
              <ArrowLeft className="size-3.5" aria-hidden="true" /> All guides
            </Link>
            {documentation ? (
              <Link href={documentation.href} className={styles.textLink}>
                <BookOpen className="size-3.5" aria-hidden="true" />{" "}
                {documentation.title}
              </Link>
            ) : null}
          </div>
        </header>
        <div className="grid items-start gap-8 pt-8 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-12 xl:gap-20">
          <aside className="min-w-0 lg:sticky lg:top-24 lg:col-start-2 lg:row-start-1">
            <OnThisPageInline items={toc} />
          </aside>
          <article
            aria-labelledby="guide-title"
            className={`${styles.body} min-w-0 lg:col-start-1 lg:row-start-1`}
          >
            {children}
            {relatedGuides.length ? (
              <section
                aria-labelledby="related-guides-title"
                className="border-t border-border-subtle pt-10 sm:pt-12"
              >
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Continue reading
                </p>
                <h2
                  id="related-guides-title"
                  className="mt-3 text-2xl font-semibold tracking-heading"
                >
                  Connect the next part of your product.
                </h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {relatedGuides.map((guide) => (
                    <Link
                      key={guide.href}
                      href={guide.href}
                      className="group flex flex-col justify-between gap-6 rounded-[5px] border border-border-subtle p-5 transition-colors hover:bg-surface-muted/30 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                    >
                      <h3 className="text-base font-medium leading-7">
                        {guide.title}
                      </h3>
                      <span
                        className="flex items-center justify-between text-xs text-muted-foreground"
                        aria-hidden="true"
                      >
                        Read guide <ArrowRight className="size-4" />
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            ) : null}
          </article>
        </div>
      </Container>
    </main>
  );
}
