import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';

import { cn } from '@pycolors/ui';

type DocsLinksVariant = 'steps' | 'list' | 'compact' | 'grid';

type DocsLinksTone = 'primary' | 'platform' | 'success' | 'neutral';

type DocsLinksItem = Readonly<{
  title: string;
  href: string;
  description?: string;
  icon?: React.ElementType;
  eyebrow?: string;
  badge?: string;
  badges?: readonly string[];
  external?: boolean;
  tone?: DocsLinksTone;
}>;

type DocsLinksProps = Readonly<{
  items: readonly DocsLinksItem[];
  variant?: DocsLinksVariant;
  tone?: DocsLinksTone;
  className?: string;
}>;

const toneStyles: Record<
  DocsLinksTone,
  {
    accent: string;
    icon: string;
    hover: string;
    text: string;
  }
> = {
  primary: {
    accent: 'bg-primary/[0.04]',
    icon: 'border-primary/10 bg-primary/[0.05] text-primary/80 group-hover:border-primary/20 group-hover:bg-primary/[0.08]',
    hover: 'hover:bg-primary/[0.025]',
    text: 'group-hover:text-primary',
  },
  platform: {
    accent: 'bg-platform/[0.04]',
    icon: 'border-platform/10 bg-platform/[0.05] text-platform/80 group-hover:border-platform/20 group-hover:bg-platform/[0.08]',
    hover: 'hover:bg-platform/[0.025]',
    text: 'group-hover:text-platform',
  },
  success: {
    accent: 'bg-success/[0.04]',
    icon: 'border-success/10 bg-success/[0.05] text-success/80 group-hover:border-success/20 group-hover:bg-success/[0.08]',
    hover: 'hover:bg-success/[0.025]',
    text: 'group-hover:text-success',
  },
  neutral: {
    accent: 'bg-muted/30',
    icon: 'border-border-subtle bg-muted/30 text-muted-foreground group-hover:bg-muted/40 group-hover:text-foreground',
    hover: 'hover:bg-muted/25',
    text: 'group-hover:text-foreground',
  },
};

export function DocsLinks({
  items,
  variant = 'steps',
  tone = 'primary',
  className,
}: DocsLinksProps) {
  const isGrid = variant === 'grid';
  const isCompact = variant === 'compact';

  return (
    <div
      className={cn(
        'not-prose my-2',
        isGrid
          ? 'grid gap-3 sm:grid-cols-2'
          : [
              'overflow-hidden rounded-[5px]',
              'border border-border-subtle bg-card shadow-soft',
            ],
        isCompact && 'my-2',
        className,
      )}
    >
      {items.map((item, index) => (
        <DocsLinksItemRow
          key={item.href}
          item={item}
          index={index}
          variant={variant}
          tone={item.tone ?? tone}
        />
      ))}
    </div>
  );
}

type DocsLinksItemRowProps = Readonly<{
  item: DocsLinksItem;
  index: number;
  variant: DocsLinksVariant;
  tone: DocsLinksTone;
}>;

function DocsLinksItemRow({
  item,
  index,
  variant,
  tone,
}: DocsLinksItemRowProps) {
  const Icon = item.icon;
  const isSteps = variant === 'steps';
  const isList = variant === 'list';
  const isCompact = variant === 'compact';
  const isGrid = variant === 'grid';
  const styles = toneStyles[tone];
  const TrailingIcon = item.external ? ExternalLink : ArrowRight;

  const className = cn(
    'group relative grid items-start gap-4 no-underline',
    'transition-colors duration-200',
    styles.hover,
    isGrid
      ? [
          'grid-cols-[32px_1fr_auto] rounded-[5px]',
          'border border-border-subtle bg-card p-4 shadow-soft',
          'hover:border-border',
          'sm:p-5',
        ]
      : [
          'border-b border-border-subtle px-4 py-4 last:border-b-0',
          'sm:px-5',
          isCompact
            ? 'grid-cols-[24px_1fr] py-3'
            : 'grid-cols-[32px_1fr_auto]',
        ],
  );

  const content = (
    <>
      <span
        className={cn(
          'pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity',
          styles.accent,
          'group-hover:opacity-100',
        )}
      />

      <span
        className={cn(
          'flex shrink-0 items-center justify-center rounded-[5px]',
          'border text-xs font-medium transition-colors duration-200',
          isCompact ? 'size-6' : 'size-7',
          styles.icon,
        )}
        aria-hidden="true"
      >
        {isSteps ? index + 1 : null}
        {(isList || isGrid) && Icon ? (
          <Icon className="size-3.5" />
        ) : null}
        {isCompact ? <ArrowRight className="size-3.5" /> : null}
      </span>

      <span className="min-w-0">
        {item.eyebrow ? (
          <span className="mb-1 block text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
            {item.eyebrow}
          </span>
        ) : null}

        <span className="flex min-w-0 flex-wrap items-center gap-2">
          <span
            className={cn(
              'block text-sm font-medium tracking-tight text-foreground',
              'transition-colors',
              !isGrid && 'truncate',
              styles.text,
            )}
          >
            {item.title}
          </span>

          {item.badge ? (
            <DocsLinksBadge>{item.badge}</DocsLinksBadge>
          ) : null}
        </span>

        {item.description ? (
          <span
            className={cn(
              'mt-1.5 block text-sm leading-6 text-muted-foreground',
              isCompact && 'mt-1 leading-5',
            )}
          >
            {item.description}
          </span>
        ) : null}

        {item.badges?.length ? (
          <span className="mt-3 flex flex-wrap gap-1.5">
            {item.badges.map((badge) => (
              <DocsLinksBadge key={badge}>{badge}</DocsLinksBadge>
            ))}
          </span>
        ) : null}
      </span>

      {!isCompact ? (
        <TrailingIcon
          className={cn(
            'mt-1 size-4 shrink-0 text-muted-foreground',
            'transition-all duration-200',
            item.external
              ? 'group-hover:text-foreground'
              : 'group-hover:translate-x-0.5',
            styles.text,
          )}
          aria-hidden="true"
        />
      ) : null}
    </>
  );

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noreferrer"
        className={className}
        aria-label={`${item.title} opens in a new tab`}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={item.href} className={className}>
      {content}
    </Link>
  );
}

type DocsLinksBadgeProps = Readonly<{
  children: React.ReactNode;
}>;

function DocsLinksBadge({ children }: DocsLinksBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full',
        'border border-border-subtle bg-muted/30',
        'px-2 py-0.5',
        'text-[11px] font-medium leading-4 text-muted-foreground',
      )}
    >
      {children}
    </span>
  );
}
