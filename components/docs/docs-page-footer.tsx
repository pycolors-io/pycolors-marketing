'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  ThumbsDown,
  ThumbsUp,
  Sparkles,
} from 'lucide-react';

type NavItem = {
  title: string;
  url: string;
};

type DocsPageFooterProps = Readonly<{
  previous?: NavItem | null;
  next?: NavItem | null;
  ctaLabel: string;
  ctaHref: string;
}>;

export function DocsPageFooter({
  previous,
  next,
  ctaLabel,
  ctaHref,
}: DocsPageFooterProps) {
  const [feedback, setFeedback] = React.useState<
    'up' | 'down' | null
  >(null);

  return (
    <footer className="mt-5 border-t border-border/50 pt-10">
      {/* =========================
          Prev / Next
      ========================= */}
      <div className="grid gap-4 md:grid-cols-2">
        {previous ? (
          <Link
            href={previous.url}
            className="group relative overflow-hidden rounded-2xl border border-border/60 bg-muted/20 p-5 transition-all duration-200 hover:border-border hover:bg-accent/30"
          >
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ArrowLeft className="h-3.5 w-3.5" />
              Previous
            </div>

            <div className="mt-2 text-sm font-medium text-foreground">
              {previous.title}
            </div>

            {/* subtle hover glow */}
            <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-linear-to-r from-transparent via-white/5 to-transparent" />
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link
            href={next.url}
            className="group relative overflow-hidden rounded-2xl border border-border/60 bg-muted/20 p-5 text-right transition-all duration-200 hover:border-border hover:bg-accent/30"
          >
            <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
              Next
              <ArrowRight className="h-3.5 w-3.5" />
            </div>

            <div className="mt-2 text-sm font-medium text-foreground">
              {next.title}
            </div>

            <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-linear-to-l from-transparent via-white/5 to-transparent" />
          </Link>
        ) : null}
      </div>

      {/* =========================
          CTA BLOCK (premium)
      ========================= */}
      <div className="mt-10 rounded-2xl border border-border/60 bg-linear-to-b from-muted/30 to-background p-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Left content */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5" />
              Next step
            </div>

            <p className="text-sm font-medium text-foreground">
              Ready to go further?
            </p>

            <p className="max-w-md text-sm text-muted-foreground">
              Move from documentation to a real production setup with
              authentication, billing, and backend foundations already
              wired.
            </p>

            {/* Feedback inline */}
            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs text-muted-foreground">
                Was this helpful?
              </span>

              <button
                type="button"
                onClick={() => setFeedback('up')}
                className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs transition ${
                  feedback === 'up'
                    ? 'border-primary bg-primary/10 text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <ThumbsUp className="h-3 w-3" />
              </button>

              <button
                type="button"
                onClick={() => setFeedback('down')}
                className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs transition ${
                  feedback === 'down'
                    ? 'border-primary bg-primary/10 text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <ThumbsDown className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* CTA */}
          <div className="flex shrink-0">
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-all hover:opacity-90"
            >
              {ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
