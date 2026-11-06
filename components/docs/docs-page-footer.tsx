"use client";

import { useCopy } from "@/lib/i18n/use-copy";
import * as React from "react";
import { Link } from "@/lib/i18n/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";

import { cn } from "@pycolors/ui";

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
  className,
}: DocsPageFooterProps) {
  const tSite = useCopy();

  const [feedback, setFeedback] = React.useState<"up" | "down" | null>(null);

  return (
    <footer
      className={cn(
        "mt-14 border-t border-border-subtle pt-8 sm:mt-16",
        className,
      )}
    >
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

      <div
        className={cn(
          "mt-6 rounded-lg border border-border-subtle",
          "bg-card bg-linear-to-br from-primary/[0.035] to-transparent p-5 sm:p-6",
        )}
      >
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

      {showFeedback ? (
        <div className="mt-15 mb-5 flex justify-center">
          <div
            className={cn(
              "inline-flex items-center gap-2 rounded-full",
              "border border-border-subtle bg-card px-4 py-2",
              "shadow-off",
            )}
          >
            <span className="text-xs font-medium text-muted-foreground">
              {tSite("Was this helpful?")}
            </span>

            <FeedbackButton
              active={feedback === "up"}
              label={tSite("Yes")}
              onClick={() => setFeedback("up")}
              icon={ThumbsUp}
            />

            <FeedbackButton
              active={feedback === "down"}
              label={tSite("No")}
              onClick={() => setFeedback("down")}
              icon={ThumbsDown}
            />
          </div>
        </div>
      ) : null}
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
        "group rounded-lg border border-border-subtle bg-card p-4 sm:p-5",
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

type FeedbackButtonProps = Readonly<{
  active: boolean;
  label: string;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
}>;

function FeedbackButton({
  active,
  label,
  onClick,
  icon: Icon,
}: FeedbackButtonProps) {
  const tSite = useCopy();

  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "inline-flex h-7 items-center gap-1.5 rounded-full border px-2.5 cursor-pointer",
        "text-xs font-medium transition",
        active
          ? "border-primary bg-primary/10 text-foreground"
          : "border-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      <span className="sr-only sm:not-sr-only">{tSite(label)}</span>
    </button>
  );
}
