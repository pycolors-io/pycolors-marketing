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
};

export function BuyStarterProButton({
  className,
  fullWidth = true,
  size = 'lg',
  variant = 'default',
  label = 'Buy Starter Pro',
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
        err instanceof Error
          ? err.message
          : 'Unexpected checkout error.';

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
          'h-11 rounded-xl px-6 text-sm font-medium w-full sm:w-full cursor-pointer',
          fullWidth && 'w-full',
          className,
        )}
        aria-busy={isLoading}
      >
        {isLoading ? (
          <>
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            Redirecting...
          </>
        ) : (
          <>
            {label}
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>

      {error ? (
        <p className="text-sm leading-6 text-red-600">{error}</p>
      ) : null}
    </div>
  );
}
