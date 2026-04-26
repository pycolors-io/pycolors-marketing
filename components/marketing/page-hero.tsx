import * as React from 'react';
import { Badge, cn } from '@pycolors/ui';

type PageHeroBadge = {
  label: string;
  variant?: 'secondary' | 'outline';
  icon?: React.ReactNode;
};

export type PageHeroProps = {
  badges?: PageHeroBadge[];
  title: string;
  subtitle?: string;
  description?: string;
  actions?: React.ReactNode;
  pills?: string[];
  extra?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  badgesClassName?: string;
  actionsClassName?: string;
  pillsClassName?: string;
  extraClassName?: string;
  align?: 'center' | 'left';
  maxWidth?: '3xl' | '4xl' | '5xl';
};

function Pill({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <span className="inline-flex items-center rounded-md border border-border/60 bg-background/70 px-2.5 py-1 text-[11px] font-medium text-muted-foreground backdrop-blur">
      {children}
    </span>
  );
}

function getMaxWidthClass(maxWidth: PageHeroProps['maxWidth']) {
  switch (maxWidth) {
    case '3xl':
      return 'max-w-3xl';
    case '5xl':
      return 'max-w-5xl';
    case '4xl':
    default:
      return 'max-w-4xl';
  }
}

export function PageHero({
  badges = [],
  title,
  subtitle,
  description,
  actions,
  pills = [],
  extra,
  className,
  contentClassName,
  badgesClassName,
  actionsClassName,
  pillsClassName,
  extraClassName,
  align = 'center',
  maxWidth = '4xl',
}: PageHeroProps) {
  const isCentered = align === 'center';
  const maxWidthClass = getMaxWidthClass(maxWidth);

  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-2xl border border-border/60 bg-background px-6 py-14 shadow-sm sm:px-8 sm:py-16 lg:px-12 lg:py-20',
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_34%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
      />

      <div
        className={cn(
          'relative mx-auto',
          maxWidthClass,
          isCentered ? 'text-center' : 'text-left',
          contentClassName,
        )}
      >
        {badges.length > 0 ? (
          <div
            className={cn(
              'flex flex-wrap items-center gap-2',
              isCentered ? 'justify-center' : 'justify-start',
              badgesClassName,
            )}
          >
            {badges.map((badge) => (
              <Badge
                key={`${badge.label}-${badge.variant ?? 'secondary'}`}
                variant={badge.variant ?? 'outline'}
                className="gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-medium"
              >
                {badge.icon ? badge.icon : null}
                {badge.label}
              </Badge>
            ))}
          </div>
        ) : null}

        <h1
          className={cn(
            'text-balance font-brand text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[4rem] lg:leading-[1.02]',
            badges.length > 0 ? 'mt-7' : 'mt-0',
          )}
        >
          {title}

          {subtitle ? (
            <span className="mt-2 block text-muted-foreground">
              {subtitle}
            </span>
          ) : null}
        </h1>

        {description ? (
          <p
            className={cn(
              'mt-6 text-[15px] leading-7 text-muted-foreground sm:text-base',
              isCentered && 'mx-auto max-w-3xl',
              !isCentered && 'max-w-3xl',
            )}
          >
            {description}
          </p>
        ) : null}

        {actions ? (
          <div
            className={cn(
              'mt-8 flex flex-col gap-3 sm:flex-row',
              isCentered ? 'justify-center' : 'justify-start',
              actionsClassName,
            )}
          >
            {actions}
          </div>
        ) : null}

        {pills.length > 0 ? (
          <div
            className={cn(
              'mt-7 flex flex-wrap gap-2',
              isCentered ? 'justify-center' : 'justify-start',
              pillsClassName,
            )}
          >
            {pills.map((pill) => (
              <Pill key={pill}>{pill}</Pill>
            ))}
          </div>
        ) : null}

        {extra ? (
          <div className={cn('mt-10', extraClassName)}>{extra}</div>
        ) : null}
      </div>
    </section>
  );
}
