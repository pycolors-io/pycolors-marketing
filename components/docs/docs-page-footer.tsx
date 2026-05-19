'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react';

import { cn } from '@pycolors/ui';

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
  ctaTitle = 'Ready to go further?',
  ctaDescription = 'Move from docs to production-ready UI, templates, and SaaS foundations.',
  showFeedback = false,
  className,
}: DocsPageFooterProps) {
  const [feedback, setFeedback] = React.useState<
    'up' | 'down' | null
  >(null);

  return (
    <footer
      className={cn(
        'mt-12 border-t border-border-subtle pt-8',
        className,
      )}
    >
      <nav
        aria-label="Docs pagination"
        className="grid gap-3 md:grid-cols-2"
      >
        {previous ? (
          <DocsFooterNavCard
            href={previous.url}
            label="Previous"
            title={previous.title}
            direction="previous"
          />
        ) : (
          <div className="hidden md:block" />
        )}

        {next ? (
          <DocsFooterNavCard
            href={next.url}
            label="Next"
            title={next.title}
            direction="next"
          />
        ) : null}
      </nav>

      <div
        className={cn(
          'mt-8 rounded-[5px] border border-border-subtle',
          'bg-card p-5 shadow-soft sm:p-6',
        )}
      >
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Next step
            </div>

            <p className="mt-2 text-sm font-semibold tracking-tight text-foreground">
              {ctaTitle}
            </p>

            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {ctaDescription}
            </p>
          </div>

          <Link
            href={ctaHref}
            className={cn(
              'inline-flex h-11 w-full items-center justify-center gap-2',
              'rounded-[5px] border border-transparent bg-primary px-5',
              'text-sm font-medium text-primary-foreground no-underline',
              'shadow-soft transition-all duration-200',
              'hover:bg-brand-primary-hover hover:shadow-medium',
              'focus-visible:outline-none focus-visible:ring-2',
              'focus-visible:ring-ring focus-visible:ring-offset-2',
              'focus-visible:ring-offset-background sm:w-auto',
            )}
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {showFeedback ? (
        <div className="mt-15 mb-5 flex justify-center">
          <div
            className={cn(
              'inline-flex items-center gap-2 rounded-full',
              'border border-border-subtle bg-card px-4 py-2',
              'shadow-soft',
            )}
          >
            <span className="text-xs font-medium text-muted-foreground">
              Was this helpful?
            </span>

            <FeedbackButton
              active={feedback === 'up'}
              label="Yes"
              onClick={() => setFeedback('up')}
              icon={ThumbsUp}
            />

            <FeedbackButton
              active={feedback === 'down'}
              label="No"
              onClick={() => setFeedback('down')}
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
  direction: 'previous' | 'next';
}>;

function DocsFooterNavCard({
  href,
  label,
  title,
  direction,
}: DocsFooterNavCardProps) {
  const isNext = direction === 'next';

  return (
    <Link
      href={href}
      className={cn(
        'group rounded-[5px] border border-border-subtle bg-card p-4',
        'no-underline shadow-soft transition-all duration-200',
        'hover:border-border-strong hover:bg-surface-muted hover:shadow-medium',
        isNext && 'md:text-right',
      )}
    >
      <div
        className={cn(
          'flex items-center gap-2 text-xs font-medium text-muted-foreground',
          isNext && 'md:justify-end',
        )}
      >
        {!isNext ? <ArrowLeft className="h-3.5 w-3.5" /> : null}
        {label}
        {isNext ? <ArrowRight className="h-3.5 w-3.5" /> : null}
      </div>

      <div className="mt-2 text-sm font-medium leading-6 text-foreground">
        {title}
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
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'inline-flex h-7 items-center gap-1.5 rounded-full border px-2.5 cursor-pointer',
        'text-xs font-medium transition',
        active
          ? 'border-primary bg-primary/10 text-foreground'
          : 'border-transparent text-muted-foreground hover:bg-muted hover:text-foreground',
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      <span className="sr-only sm:not-sr-only">{label}</span>
    </button>
  );
}
