import Link from 'next/link';
import {
  ArrowRight,
  Blocks,
  CheckCircle2,
  Rocket,
  Sparkles,
} from 'lucide-react';

import { Badge, Button, Card, cn } from '@pycolors/ui';
import { BlogCTA } from '@/types/blog';

type ArticleCTAProps = {
  readonly cta?: BlogCTA;
};

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

const variantLabel: Record<
  NonNullable<BlogCTA['variant']>,
  string
> = {
  free: 'Starter Free',
  pro: 'Starter Pro',
  blocks: 'Advanced Blocks',
};

const variantIcon: Record<
  NonNullable<BlogCTA['variant']>,
  React.ComponentType<{ className?: string }>
> = {
  free: Rocket,
  pro: Sparkles,
  blocks: Blocks,
};

export function ArticleCTA({ cta }: ArticleCTAProps) {
  if (!cta) {
    return null;
  }

  const variant = cta.variant ?? 'free';
  const label = variantLabel[variant];
  const Icon = variantIcon[variant];
  const isPro = variant === 'pro';

  return (
    <Card
      className={cn(
        'relative overflow-hidden rounded-[5px]',
        'px-7 py-8 sm:px-10 sm:py-10 lg:px-12',
        'backdrop-blur-sm',
        isPro
          ? 'border border-pro-border-subtle bg-pro-surface/90 shadow-medium'
          : 'border border-border-subtle bg-background/45 shadow-soft',
      )}
    >
      {isPro ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        />
      ) : null}

      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-center">
        <div className="space-y-6">
          <Badge
            variant="outline"
            className={cn(
              'gap-1.5 rounded-[5px] px-2.5 py-1 text-[11px] font-medium',
              isPro
                ? 'border-pro-border-subtle bg-pro-surface-muted'
                : 'border-border-subtle bg-background/60',
            )}
          >
            <Icon className="h-3.5 w-3.5" aria-hidden="true" />
            {label}
          </Badge>

          <div className="max-w-2xl space-y-3">
            <h2 className="font-brand text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
              Turn this article into shipping leverage.
            </h2>

            <p className="text-sm leading-7 text-muted-foreground sm:text-[15px]">
              Use the reasoning from this article to move faster with
              the PyColors product path: learn the pattern, validate
              with Starter Free, and upgrade when implementation
              wiring becomes the bottleneck.
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-3">
            {[
              'Read the logic',
              'Validate the surface',
              'Upgrade when ready',
            ].map((item) => (
              <div
                key={item}
                className={cn(
                  'flex items-center gap-2 rounded-[5px]',
                  'border border-border-subtle',
                  'bg-background/50',
                  'px-3 py-2.5',
                  'text-xs text-muted-foreground',
                )}
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:w-full">
          <Button
            asChild
            className={cn(
              'h-10 w-full rounded-[5px] text-sm font-medium',
              focusRing,
            )}
          >
            <Link href={cta.href}>
              {cta.label}
              <ArrowRight
                className="ml-2 h-4 w-4"
                aria-hidden="true"
              />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className={cn(
              'h-10 w-full rounded-[5px] text-sm font-medium',
              focusRing,
            )}
          >
            <Link href="/guides">Read Guides</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
