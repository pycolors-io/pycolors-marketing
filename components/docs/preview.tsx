'use client';

import { cn } from '@pycolors/ui';
import * as React from 'react';

export function Preview({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-lg border bg-card text-card-foreground p-4 shadow-sm',
        className,
      )}
      {...props}
    />
  );
}
