'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@pycolors/ui';

export type AppNavItem = {
  label: string;
  href: string;
};

const DEFAULT_NAV: AppNavItem[] = [
  { label: 'Dashboard', href: '/app/dashboard' },
  { label: 'Settings', href: '/app/settings' },
  { label: 'Projects', href: '/app/projects' },
];

export function AppNav({
  items = DEFAULT_NAV,
  onNavigate,
}: {
  items?: AppNavItem[];
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {items.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              'block rounded-md px-3 py-2 text-sm transition-colors',
              isActive
                ? 'bg-accent text-accent-foreground'
                : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground',
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
