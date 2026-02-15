'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ExternalLink, Menu, X } from 'lucide-react';
import { LargeSearchToggle } from 'fumadocs-ui/components/layout/search-toggle';
import { ThemeToggle } from 'fumadocs-ui/components/layout/theme-toggle';

import { cn } from '@pycolors/ui';
import { PRIMARY_NAV_ITEMS } from '@/lib/layout.shared';
import { Container } from '@/components/container';
import { Logo } from '../logo';

type DocsLink = {
  label: string;
  href: string;
};

interface SiteHeaderProps {
  docsLinks?: DocsLink[];
}

function matchPathname(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

export function SiteHeader({ docsLinks = [] }: SiteHeaderProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const openBtnRef = React.useRef<HTMLButtonElement>(null);
  const closeBtnRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const activeHref = React.useMemo(() => {
    if (!pathname) return null;

    const matches = PRIMARY_NAV_ITEMS.filter((i) =>
      matchPathname(pathname, i.href),
    );

    matches.sort((a, b) => b.href.length - a.href.length);
    return matches[0]?.href ?? null;
  }, [pathname]);

  // ESC to close
  React.useEffect(() => {
    if (!isMenuOpen) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        window.setTimeout(() => openBtnRef.current?.focus(), 0);
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMenuOpen]);

  // Body scroll lock + focus when opened
  React.useEffect(() => {
    if (!isMenuOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    window.setTimeout(
      () => closeBtnRef.current?.focus({ preventScroll: true }),
      0,
    );

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isMenuOpen]);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/70 bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">
      <Container className="flex h-16 items-center gap-3">
        <Logo />

        <nav
          className="ml-6 hidden flex-1 items-center gap-1 text-sm font-medium md:flex"
          aria-label="Primary navigation"
        >
          {PRIMARY_NAV_ITEMS.map((item) => {
            const isCurrent = activeHref === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isCurrent ? 'page' : undefined}
                className={cn(
                  'rounded-md px-3 py-2 transition-colors',
                  'text-muted-foreground hover:text-foreground hover:bg-accent/30',
                  isCurrent && 'bg-accent/30 text-foreground',
                  focusRing,
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 sm:flex">
            <LargeSearchToggle className={cn('w-60', focusRing)} />
            <ThemeToggle
              mode="light-dark-system"
              className={cn(
                'inline-flex h-9 items-center rounded-full border border-border px-1',
                focusRing,
              )}
            />
          </div>

          <a
            href="https://github.com/pycolors-io/pycolors-ui"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Open the PyColors UI repository on GitHub"
            className={cn(
              'hidden h-9 items-center gap-1.5 rounded-md border border-border px-3 text-xs font-semibold',
              'transition-colors hover:bg-accent hover:text-accent-foreground md:inline-flex',
              focusRing,
            )}
          >
            GitHub
            <ExternalLink
              className="h-3.5 w-3.5"
              aria-hidden="true"
            />
          </a>

          <button
            ref={openBtnRef}
            type="button"
            className={cn(
              'inline-flex h-9 w-9 items-center justify-center rounded-md border border-border md:hidden',
              'transition-colors hover:bg-accent/40',
              focusRing,
            )}
            aria-label={
              isMenuOpen
                ? 'Close navigation menu'
                : 'Open navigation menu'
            }
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            aria-haspopup="menu"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </Container>

      {isMenuOpen ? (
        <Container
          id="mobile-nav"
          className="border-t border-border bg-background/95 px-4 pb-6 pt-3 shadow-lg backdrop-blur supports-backdrop-filter:bg-background/60 md:hidden"
        >
          <button
            ref={closeBtnRef}
            type="button"
            className="sr-only"
            aria-label="Close menu"
            onClick={() => setIsMenuOpen(false)}
          />

          <nav
            className="flex flex-col gap-1"
            aria-label="Mobile navigation"
          >
            {PRIMARY_NAV_ITEMS.map((item) => {
              const isCurrent = activeHref === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isCurrent ? 'page' : undefined}
                  className={cn(
                    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    'text-muted-foreground hover:bg-muted hover:text-foreground',
                    isCurrent && 'bg-muted text-foreground',
                    focusRing,
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {docsLinks.length > 0 && (
            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Documentation
              </p>
              <div className="mt-2 max-h-64 space-y-1 overflow-y-auto pr-1">
                {docsLinks.map((doc) => (
                  <Link
                    key={doc.href}
                    href={doc.href}
                    className={cn(
                      'block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors',
                      'hover:bg-muted hover:text-foreground',
                      focusRing,
                    )}
                  >
                    {doc.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4 flex flex-col gap-3">
            <LargeSearchToggle
              className={cn(
                'w-full justify-between rounded-md border border-border px-3 py-2 text-sm font-medium',
                focusRing,
              )}
            />

            <div className="flex items-center justify-between rounded-md border border-border px-3 py-2 text-sm font-medium">
              <span>Theme</span>
              <ThemeToggle
                mode="light-dark-system"
                className={cn(
                  'inline-flex items-center rounded-full border border-border px-1',
                  focusRing,
                )}
              />
            </div>

            <a
              href="https://github.com/pycolors-io/pycolors-ui"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Open the PyColors UI repository on GitHub"
              className={cn(
                'inline-flex h-11 items-center justify-center gap-2 rounded-md border border-border text-sm font-semibold',
                'transition-colors hover:bg-accent hover:text-accent-foreground',
                focusRing,
              )}
            >
              GitHub
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </Container>
      ) : null}
    </header>
  );
}
