import * as React from 'react';
import Link from 'next/link';

import { Button, cn } from '@pycolors/ui';

import { BuyProductButton } from '@/components/pricing/buy-product-button';

type DocsUpgradeCTAProps = Readonly<{
  title?: string;
  description?: React.ReactNode;

  productSlug: string;
  buyLabel: string;

  secondaryHref?: string;
  secondaryLabel?: string;

  trustText?: string;
  showTrustText?: boolean;

  className?: string;
}>;

export function DocsUpgradeCTA({
  title,
  description,
  productSlug,
  buyLabel,
  secondaryHref,
  secondaryLabel,
  trustText = 'One-time payment · Instant access after purchase',
  showTrustText = true,
  className,
}: DocsUpgradeCTAProps) {
  return (
    <section
      className={cn(
        'not-prose my-8 rounded-[8px]',
        'border border-border-subtle bg-card',
        'p-5 shadow-none transition-all duration-200 sm:p-6',
        'hover:-translate-y-px',
        'hover:border-border',
        'hover:shadow-soft',
        className,
      )}
    >
      {title || description ? (
        <div className="max-w-3xl">
          {title ? (
            <h3 className="m-0 text-base font-semibold tracking-tight text-foreground sm:text-lg">
              {title}
            </h3>
          ) : null}

          {description ? (
            <div className="mt-2 text-sm leading-7 text-muted-foreground">
              {description}
            </div>
          ) : null}
        </div>
      ) : null}

      <div
        className={cn(
          'flex flex-col gap-3',
          title || description ? 'mt-5' : '',
          'sm:flex-row sm:items-center',
        )}
      >
        <BuyProductButton
          productSlug={productSlug}
          label={buyLabel}
          fullWidth
          showTrustText={false}
          className="w-full sm:w-auto"
        />
        {secondaryHref && secondaryLabel ? (
          <Button
            asChild
            variant="outline"
            className="h-11 w-full rounded-[5px] px-5 text-sm font-medium no-underline sm:w-auto"
          >
            <Link href={secondaryHref}>{secondaryLabel}</Link>
          </Button>
        ) : null}
      </div>

      {showTrustText ? (
        <p className="mt-3 text-xs leading-5 text-muted-foreground">
          {trustText}
        </p>
      ) : null}
    </section>
  );
}
