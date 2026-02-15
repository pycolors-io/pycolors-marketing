import * as React from 'react';
import { cn } from '@pycolors/ui';
import { AppHeader } from '@/components/layout/app/app-header';
import { AppMobileNav } from '@/components/layout/app/app-mobile-nav';

export interface AppShellProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  hideUserMenu?: boolean;
}

export function AppShell({
  title,
  description,
  actions,
  children,
  className,
  contentClassName,
  hideUserMenu = false,
}: AppShellProps) {
  return (
    <section
      className={cn('flex min-w-0 flex-1 flex-col', className)}
    >
      <AppHeader
        title={title}
        description={description}
        actions={actions}
        hideUserMenu={hideUserMenu}
        mobileNav={<AppMobileNav />}
      />

      <div className={cn('mt-6 min-w-0 flex-1', contentClassName)}>
        {children}
      </div>
    </section>
  );
}
