'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, LoaderCircle } from 'lucide-react';

import { Button, cn } from '@pycolors/ui';
import { createStarterProCheckout } from '@/lib/api/client';

type BuyStarterProButtonProps = {
  className?: string;
  fullWidth?: boolean;
  size?: 'default' | 'sm' | 'lg' | 'icon';
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link';
  label?: string;
  loadingLabel?: string;
  trustText?: string;
  showTrustText?: boolean;
};

export function BuyStarterProButton({
  className,
  fullWidth = true,
  size = 'lg',
  variant = 'default',
  label = 'Buy Starter Pro — 199 €',
  loadingLabel = 'Redirecting to secure checkout...',
  trustText = 'One-time payment · Instant access after purchase',
  showTrustText = false,
}: BuyStarterProButtonProps) {
  const router = useRouter();

  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function handleBuy() {
    try {
      setIsLoading(true);
      setError(null);

      const url = await createStarterProCheckout();

      router.push(url);
    } catch (err) {
      const message =
        err instanceof Error && err.message
          ? err.message
          : 'Checkout could not be opened right now. Please try again.';

      setError(message);
      setIsLoading(false);
    }
  }

  return (
    <div className={cn('space-y-2', fullWidth && 'w-full')}>
      <Button
        type="button"
        onClick={handleBuy}
        disabled={isLoading}
        size={size}
        variant={variant}
        className={cn(
          'h-11 rounded-[5px] px-6 text-sm font-medium transition-all duration-200 cursor-pointer ',
          'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          fullWidth && 'w-full',
          variant === 'default' && [
            'border border-transparent',
            'bg-primary text-primary-foreground',
            'shadow-soft',
            'hover:bg-brand-primary-hover',
            'hover:shadow-medium',
          ],
          variant === 'outline' && [
            'border border-border-subtle',
            'bg-background',
            'hover:bg-surface-muted',
          ],
          variant === 'secondary' && [
            'border border-border-subtle',
            'bg-surface-muted',
            'hover:bg-surface',
          ],
          className,
        )}
        aria-busy={isLoading}
        aria-live="polite"
      >
        {isLoading ? (
          <>
            <LoaderCircle
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
            {loadingLabel}
          </>
        ) : (
          <>
            {label}
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </>
        )}
      </Button>

      {showTrustText ? (
        <p className="text-xs text-muted-foreground">{trustText}</p>
      ) : null}

      {error ? (
        <p className="text-sm leading-6 text-destructive">{error}</p>
      ) : null}
    </div>
  );
}
