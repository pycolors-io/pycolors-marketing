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

function Pill({ children }: { readonly children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border/70 bg-background/70 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
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
        'relative overflow-hidden rounded-[38px] bg-card px-6 py-12 shadow-lg shadow-black/5 sm:px-8 sm:py-14 lg:px-12 lg:py-18',
        className,
      )}
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.10),transparent_35%)]" />

      <div
        className={cn(
          'mx-auto',
          maxWidthClass,
          isCentered ? 'text-center' : 'text-left',
          contentClassName,
        )}
      >
        {/* Badges */}
        {badges.length > 0 && (
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
                className="gap-2 rounded-full"
              >
                {badge.icon ? badge.icon : null}
                {badge.label}
              </Badge>
            ))}
          </div>
        )}

        {/* Title */}
        <h1
          className={cn(
            'text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl',
            badges.length > 0 ? 'mt-8' : 'mt-0',
          )}
        >
          {title}
          {subtitle && (
            <span className="mt-2 block text-muted-foreground">
              {subtitle}
            </span>
          )}
        </h1>

        {/* Description */}
        {description && (
          <p
            className={cn(
              'mt-6 text-base leading-8 text-muted-foreground sm:text-lg',
              isCentered && 'mx-auto max-w-3xl',
              !isCentered && 'max-w-3xl',
            )}
          >
            {description}
          </p>
        )}

        {/* Actions */}
        {actions && (
          <div
            className={cn(
              'mt-8 flex flex-col gap-3 sm:flex-row',
              isCentered ? 'justify-center' : 'justify-start',
              actionsClassName,
            )}
          >
            {actions}
          </div>
        )}

        {/* Extra (stats, blocks, etc.) */}
        {extra && (
          <div className={cn('mt-10', extraClassName)}>{extra}</div>
        )}

        {/* Pills */}
        {pills.length > 0 && (
          <div
            className={cn(
              'mt-8 flex flex-wrap gap-2',
              isCentered ? 'justify-center' : 'justify-start',
              pillsClassName,
            )}
          >
            {pills.map((pill) => (
              <Pill key={pill}>{pill}</Pill>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
