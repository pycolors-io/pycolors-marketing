'use client';

import * as React from 'react';
import { Container } from '@/components/container';

export interface MarketingShellProps {
  children: React.ReactNode;
}

export function MarketingShell({ children }: MarketingShellProps) {
  return (
    <div className="flex flex-col bg-background text-foreground">
      <main id="main" className="flex-1 flex items-center">
        <Container>{children}</Container>
      </main>
    </div>
  );
}
