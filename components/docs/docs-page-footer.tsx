"use client";

import { useCopy } from "@/lib/i18n/use-copy";
import { Link } from "@/lib/i18n/navigation";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

import { cn } from "@pycolors/ui";
import styles from "./docs-design.module.css";
import { DocsFeedback } from "./docs-feedback";

type NavItem = Readonly<{
  title: string;
  url: string;
}>;

type DocsPageFooterProps = Readonly<{
  previous?: NavItem | null;
  next?: NavItem | null;
  ctaLabel: string;
  ctaHref: string;
  ctaTitle?: string;
  ctaDescription?: string;
  showFeedback?: boolean;
  pageTitle?: string;
  pageUrl?: string;
  className?: string;
}>;

export function DocsPageFooter({
  previous,
  next,
  ctaLabel,
  ctaHref,
  ctaTitle = "Ready to go further?",
  ctaDescription = "Move from docs to production-ready UI, templates, and SaaS foundations.",
  showFeedback = false,
  pageTitle = "Documentation",
  pageUrl = "/docs",
  className,
}: DocsPageFooterProps) {
  const tSite = useCopy();

  return (
    <footer className={cn(styles.articleFooter, className)}>
      {previous || next ? (
        <p className="mb-4 text-xs font-medium text-muted-foreground">
          {tSite("Continue reading")}
        </p>
      ) : null}
      <nav
        aria-label={tSite("Docs pagination")}
        className="grid gap-3 md:grid-cols-2"
      >
        {previous ? (
          <DocsFooterNavCard
            href={previous.url}
            label={tSite("Previous")}
            title={tSite(previous.title)}
            direction="previous"
          />
        ) : (
          <div className="hidden md:block" />
        )}

        {next ? (
          <DocsFooterNavCard
            href={next.url}
            label={tSite("Next")}
            title={tSite(next.title)}
            direction="next"
          />
        ) : null}
      </nav>

      {showFeedback ? (
        <DocsFeedback pageTitle={pageTitle} pageUrl={pageUrl} />
      ) : null}

      <div className={styles.continueCard}>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Sparkles
                className="h-3.5 w-3.5 text-primary"
                aria-hidden="true"
              />
              {tSite("Continue building")}
            </div>

            <p className="mt-2 text-base font-semibold leading-6 tracking-tight text-foreground">
              {tSite(ctaTitle)}
            </p>

            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {tSite(ctaDescription)}
            </p>
          </div>

          <Link
            href={ctaHref}
            className={cn(
              "inline-flex h-10 w-full shrink-0 items-center justify-center gap-2 whitespace-nowrap",
              "site-primary-action rounded-md border border-transparent bg-primary px-5",
              "text-sm font-medium text-primary-foreground no-underline",
              "transition-colors duration-200 motion-reduce:transition-none",
              "hover:bg-brand-primary-hover",
              "focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-ring focus-visible:ring-offset-2",
              "focus-visible:ring-offset-background lg:w-auto",
            )}
          >
            {tSite(ctaLabel)}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

type DocsFooterNavCardProps = Readonly<{
  href: string;
  label: string;
  title: string;
  direction: "previous" | "next";
}>;

function DocsFooterNavCard({
  href,
  label,
  title,
  direction,
}: DocsFooterNavCardProps) {
  const tSite = useCopy();

  const isNext = direction === "next";

  return (
    <Link
      href={href}
      className={cn(
        styles.paginationCard,
        "group",
        "no-underline transition-colors duration-200 motion-reduce:transition-none",
        "hover:border-border hover:bg-muted/25",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        isNext && "md:text-right",
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2 text-xs font-medium text-muted-foreground",
          isNext && "md:justify-end",
        )}
      >
        {!isNext ? (
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        ) : null}
        {tSite(label)}
        {isNext ? (
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        ) : null}
      </div>

      <div className="mt-2 text-sm font-medium leading-6 text-foreground">
        {tSite(title)}
      </div>
    </Link>
  );
}
