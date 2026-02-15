import * as React from 'react';
import { Button, cn } from '@pycolors/ui';

export interface AppHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
  hideUserMenu?: boolean;

  /** Optional: mobile nav trigger (drawer button) */
  mobileNav?: React.ReactNode;
}

export function AppHeader({
  title,
  description,
  actions,
  className,
  hideUserMenu = false,
  mobileNav,
}: AppHeaderProps) {
  return (
    <header
      className={cn(
        'flex flex-col gap-3 md:flex-row md:items-center md:justify-between',
        className,
      )}
    >
      <div className="flex items-start gap-3">
        {/* Mobile nav button */}
        {mobileNav ? (
          <div className="md:hidden">{mobileNav}</div>
        ) : null}

        <div className="min-w-0">
          <h1 className="truncate text-lg font-semibold leading-tight tracking-tight">
            {title}
          </h1>
          {description ? (
            <p className="mt-1 text-sm text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {actions ? (
          <div className="flex items-center gap-2">{actions}</div>
        ) : null}

        {!hideUserMenu ? (
          <Button variant="outline" size="sm" aria-label="User menu">
            User
          </Button>
        ) : null}
      </div>
    </header>
  );
}
