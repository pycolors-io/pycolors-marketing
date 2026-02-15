import * as React from 'react';
import { cn } from '@pycolors/ui';

export interface AppLayoutProps {
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  children: React.ReactNode;
  className?: string;

  /**
   * Optional: if you want the header to be sticky.
   * Keep false by default for simplicity.
   */
  stickyHeader?: boolean;
}

export function AppLayout({
  sidebar,
  header,
  children,
  className,
  stickyHeader = false,
}: AppLayoutProps) {
  return (
    <div className={cn('min-h-screen bg-background', className)}>
      <div className="mx-auto flex min-h-screen w-full">
        {/* Sidebar */}
        {sidebar ? (
          <aside className="hidden w-64 shrink-0 border-r border-border/60 bg-background md:block">
            <div className="sticky top-0 h-screen overflow-y-auto p-4">
              {sidebar}
            </div>
          </aside>
        ) : null}

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Header */}
          {header ? (
            <div
              className={cn(
                'border-b border-border/60 bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60',
                stickyHeader && 'sticky top-0 z-20',
              )}
            >
              <div className="px-4 py-4 md:px-6">{header}</div>
            </div>
          ) : null}

          {/* Content */}
          <main className="min-w-0 flex-1 px-4 py-6 md:px-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
