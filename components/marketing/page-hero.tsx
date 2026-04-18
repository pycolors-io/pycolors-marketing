import * as React from 'react';
import { Badge, cn } from '@pycolors/ui';

type PageHeroBadge = {
  label: string;
  variant?: 'secondary' | 'outline';
  icon?: React.ComponentType<{ className?: string }>;
};

export type PageHeroProps = {
  badges?: PageHeroBadge[];
  title: string;
  subtitle?: string;
  description?: string;
  actions?: React.ReactNode;
  pills?: string[];
  className?: string;
  contentClassName?: string;
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
  className,
  contentClassName,
  align = 'center',
  maxWidth = '4xl',
}: PageHeroProps) {
  const isCentered = align === 'center';
  const maxWidthClass = getMaxWidthClass(maxWidth);

  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-[40px] bg-card px-6 py-12 shadow-lg shadow-black/5 sm:px-8 lg:px-12 lg:py-16',
        className,
      )}
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.10),transparent_35%)]" />

      <div
        className={cn(
          'mx-auto',
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
            )}
          >
            {badges.map((badge) => {
              const Icon = badge.icon;

              return (
                <Badge
                  key={`${badge.label}-${badge.variant ?? 'secondary'}`}
                  variant={badge.variant ?? 'outline'}
                  className="gap-2 rounded-full"
                >
                  {Icon ? (
                    <Icon
                      className="h-3.5 w-3.5"
                      aria-hidden="true"
                    />
                  ) : null}
                  {badge.label}
                </Badge>
              );
            })}
          </div>
        ) : null}

        <h1 className="mt-8 text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
          {title}
          {subtitle ? (
            <span className="block text-muted-foreground">
              {subtitle}
            </span>
          ) : null}
        </h1>

        {description ? (
          <p
            className={cn(
              'mt-6 text-base leading-8 text-muted-foreground sm:text-lg',
              isCentered && 'mx-auto max-w-2xl',
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
            )}
          >
            {actions}
          </div>
        ) : null}

        {pills.length > 0 ? (
          <div
            className={cn(
              'mt-8 flex flex-wrap gap-2',
              isCentered ? 'justify-center' : 'justify-start',
            )}
          >
            {pills.map((pill) => (
              <Pill key={pill}>{pill}</Pill>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
