import * as React from 'react';

import { cn } from '@pycolors/ui';

type DocsFeatureGridTone =
  | 'primary'
  | 'platform'
  | 'success'
  | 'danger'
  | 'neutral';

type DocsFeatureGridItem = Readonly<{
  title: string;
  description: React.ReactNode;
  icon?: React.ElementType;
  eyebrow?: string;
  tone?: DocsFeatureGridTone;
}>;

type DocsFeatureGridProps = Readonly<{
  items: readonly DocsFeatureGridItem[];
  columns?: 2 | 3 | 4;
  tone?: DocsFeatureGridTone;
  className?: string;
}>;

const toneStyles: Record<
  DocsFeatureGridTone,
  {
    icon: string;
    accent: string;
    eyebrow: string;
  }
> = {
  primary: {
    icon: 'border-primary/10 bg-primary/[0.06] text-primary',
    accent: 'from-primary/[0.10]',
    eyebrow: 'border-primary/10 bg-primary/[0.05] text-primary/80',
  },
  platform: {
    icon: 'border-platform/10 bg-platform/[0.06] text-platform',
    accent: 'from-platform/[0.10]',
    eyebrow: 'border-platform/10 bg-platform/[0.05] text-platform/80',
  },
  success: {
    icon: 'border-success/10 bg-success/[0.06] text-success',
    accent: 'from-success/[0.10]',
    eyebrow: 'border-success/10 bg-success/[0.05] text-success/80',
  },
  danger: {
    icon: 'border-destructive/10 bg-destructive/[0.06] text-destructive',
    accent: 'from-destructive/[0.10]',
    eyebrow:
      'border-destructive/10 bg-destructive/[0.05] text-destructive/80',
  },
  neutral: {
    icon: 'border-border-subtle bg-muted/30 text-muted-foreground',
    accent: 'from-muted/45',
    eyebrow: 'border-border-subtle bg-muted/30 text-muted-foreground',
  },
};

const columnStyles: Record<
  NonNullable<DocsFeatureGridProps['columns']>,
  string
> = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-2 xl:grid-cols-4',
};

export function DocsFeatureGrid({
  items,
  columns = 3,
  tone = 'platform',
  className,
}: DocsFeatureGridProps) {
  return (
    <div
      className={cn(
        'not-prose my-8 grid gap-3',
        columnStyles[columns],
        className,
      )}
    >
      {items.map((item) => (
        <DocsFeatureGridCard
          key={`${item.title}-${String(item.eyebrow ?? '')}`}
          item={item}
          tone={item.tone ?? tone}
        />
      ))}
    </div>
  );
}

type DocsFeatureGridCardProps = Readonly<{
  item: DocsFeatureGridItem;
  tone: DocsFeatureGridTone;
}>;

function DocsFeatureGridCard({
  item,
  tone,
}: DocsFeatureGridCardProps) {
  const Icon = item.icon;
  const styles = toneStyles[tone];

  return (
    <section
      className={cn(
        'group relative overflow-hidden rounded-[8px]',
        'border border-border-subtle bg-card p-4 ',
        'transition-colors duration-200',
        'hover:border-border hover:bg-muted/18',
        'sm:p-5',
      )}
    >
      <div
        className={cn(
          'pointer-events-none absolute inset-x-0 top-0 h-px',
          'bg-linear-to-r via-transparent to-transparent',
          styles.accent,
        )}
      />

      {item.eyebrow ? (
        <span
          className={cn(
            'mb-4 inline-flex items-center rounded-full border',
            'px-2 py-0.5 text-[11px] font-medium leading-4',
            styles.eyebrow,
          )}
        >
          {item.eyebrow}
        </span>
      ) : null}

      {Icon ? (
        <div
          className={cn(
            'mb-4 flex size-8 items-center justify-center rounded-[5px]',
            'border',
            styles.icon,
          )}
          aria-hidden="true"
        >
          <Icon className="size-4" />
        </div>
      ) : null}

      <h3 className="m-0 text-sm font-semibold tracking-tight text-foreground">
        {item.title}
      </h3>

      <div
        className={cn(
          'mt-2 max-w-none text-sm leading-6 text-muted-foreground',
          '[&_code]:rounded-[4px]',
          '[&_code]:border [&_code]:border-border-subtle',
          '[&_code]:bg-muted/40',
          '[&_code]:px-1.5 [&_code]:py-0.5',
          '[&_code]:font-mono [&_code]:text-[12px]',
          '[&_code]:font-medium [&_code]:text-foreground',
        )}
      >
        {item.description}
      </div>
    </section>
  );
}
