import * as React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { cn } from '@pycolors/ui';

type DocsDecisionGridTone =
  | 'platform'
  | 'primary'
  | 'success'
  | 'pro'
  | 'neutral';

type DocsDecisionGridItem = Readonly<{
  title: string;
  description: React.ReactNode;
  icon?: React.ElementType;
  eyebrow?: string;
  items?: readonly React.ReactNode[];
  href?: string;
  cta?: string;
  tone?: DocsDecisionGridTone;
}>;

type DocsDecisionGridProps = Readonly<{
  items: readonly DocsDecisionGridItem[];
  columns?: 2 | 3 | 4;
  tone?: DocsDecisionGridTone;
  className?: string;
}>;

const toneStyles: Record<
  DocsDecisionGridTone,
  {
    card: string;
    icon: string;
    eyebrow: string;
    bullet: string;
    glow: string;
    cta: string;
  }
> = {
  platform: {
    card: 'border-border-subtle bg-card',
    icon: 'border-platform/10 bg-platform/[0.06] text-platform',
    eyebrow: 'border-platform/10 bg-platform/[0.05] text-platform',
    bullet: 'bg-platform/65',
    glow: 'from-platform/[0.14]',
    cta: 'text-platform',
  },
  primary: {
    card: 'border-border-subtle bg-card',
    icon: 'border-primary/10 bg-primary/[0.06] text-primary',
    eyebrow: 'border-primary/10 bg-primary/[0.05] text-primary',
    bullet: 'bg-primary/65',
    glow: 'from-primary/[0.14]',
    cta: 'text-primary',
  },
  success: {
    card: 'border-border-subtle bg-card',
    icon: 'border-success/10 bg-success/[0.06] text-success',
    eyebrow: 'border-success/10 bg-success/[0.05] text-success',
    bullet: 'bg-success/65',
    glow: 'from-success/[0.14]',
    cta: 'text-success',
  },
  pro: {
    card: 'border-pro-border-subtle bg-pro-surface',
    icon: 'border-pro-border-subtle bg-pro-surface-muted text-primary',
    eyebrow:
      'border-pro-border-subtle bg-pro-surface-muted text-primary',
    bullet: 'bg-primary/65',
    glow: 'from-primary/[0.18]',
    cta: 'text-primary',
  },
  neutral: {
    card: 'border-border-subtle bg-card',
    icon: 'border-border-subtle bg-muted/35 text-muted-foreground',
    eyebrow: 'border-border-subtle bg-muted/35 text-muted-foreground',
    bullet: 'bg-muted-foreground/45',
    glow: 'from-muted/40',
    cta: 'text-foreground',
  },
};

const columnStyles: Record<
  NonNullable<DocsDecisionGridProps['columns']>,
  string
> = {
  2: 'md:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'md:grid-cols-2 xl:grid-cols-4',
};

export function DocsDecisionGrid({
  items,
  columns = 3,
  tone = 'platform',
  className,
}: DocsDecisionGridProps) {
  return (
    <div
      className={cn(
        'not-prose my-7 grid grid-cols-1 gap-3.5',
        columnStyles[columns],
        className,
      )}
    >
      {items.map((item) => (
        <DocsDecisionCard
          key={`${item.title}-${item.href ?? 'static'}`}
          item={item}
          tone={item.tone ?? tone}
        />
      ))}
    </div>
  );
}

type DocsDecisionCardProps = Readonly<{
  item: DocsDecisionGridItem;
  tone: DocsDecisionGridTone;
}>;

function DocsDecisionCard({ item, tone }: DocsDecisionCardProps) {
  const Icon = item.icon;
  const styles = toneStyles[tone];

  const card = (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-[8px]',
        'border p-4 shadow-soft transition-all duration-200 sm:p-5',
        'hover:-translate-y-0.5 hover:border-border hover:shadow-medium',
        styles.card,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {item.eyebrow ? (
            <span
              className={cn(
                'mb-3 inline-flex w-fit items-center rounded-[5px] border px-2 py-0.5',
                'text-[10px] font-medium leading-4 tracking-wide',
                styles.eyebrow,
              )}
            >
              {item.eyebrow}
            </span>
          ) : null}

          <h3 className="m-0 text-[15px] font-semibold tracking-[-0.02em] text-foreground">
            {item.title}
          </h3>
        </div>

        {Icon ? (
          <span
            className={cn(
              'flex size-8 shrink-0 items-center justify-center rounded-[5px] border',
              'shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]',
              styles.icon,
            )}
            aria-hidden="true"
          >
            <Icon className="size-3.5" />
          </span>
        ) : null}
      </div>

      <div
        className={cn(
          'mt-2.5 text-[13px] leading-6 text-muted-foreground',
          '[&_code]:rounded-[4px] [&_code]:border [&_code]:border-border-subtle',
          '[&_code]:bg-muted/40 [&_code]:px-1.5 [&_code]:py-0.5',
          '[&_code]:font-mono [&_code]:text-[11px] [&_code]:font-medium',
          '[&_code]:text-foreground',
        )}
      >
        {item.description}
      </div>

      {item.items?.length ? (
        <ul className="docs-list-none m-0 mt-4 space-y-2 p-0">
          {item.items.map((listItem, index) => (
            <li
              key={`${item.title}-${index}`}
              className="grid grid-cols-[8px_1fr] items-start gap-2"
            >
              <span
                className={cn(
                  'mt-[0.6rem] size-1 rounded-full',
                  styles.bullet,
                )}
                aria-hidden="true"
              />

              <span className="min-w-0 text-[13px] leading-6 text-muted-foreground">
                {listItem}
              </span>
            </li>
          ))}
        </ul>
      ) : null}

      {item.cta ? (
        <div className="mt-auto pt-6">
          <span
            className={cn(
              'inline-flex items-center gap-1.5 text-[13px] font-medium',
              'transition-colors group-hover:text-foreground',
              styles.cta,
            )}
          >
            {item.cta.replace(/\s*→$/, '')}
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      ) : null}
    </article>
  );

  if (!item.href) {
    return card;
  }

  return (
    <Link
      href={item.href}
      className={cn(
        'block h-full rounded-[5px] no-underline',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        'focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      )}
    >
      {card}
    </Link>
  );
}
