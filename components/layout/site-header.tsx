'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  FileText,
  Github,
  Menu,
  Package,
  Sparkles,
  X,
} from 'lucide-react';
import { LargeSearchToggle } from 'fumadocs-ui/components/layout/search-toggle';
import { ThemeToggle } from 'fumadocs-ui/components/layout/theme-toggle';

import { Button, cn } from '@pycolors/ui';
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

type MobileMenuItem = {
  label: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string;
};

type MobileMenuSection = {
  title: string;
  items: MobileMenuItem[];
};

const HEADER_HEIGHT = 64;

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

function matchPathname(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader({ docsLinks = [] }: SiteHeaderProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const openBtnRef = React.useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = React.useRef<HTMLAnchorElement>(null);
  const mobileNavRef = React.useRef<HTMLDialogElement>(null);

  const closeMenu = React.useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const toggleMenu = React.useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  React.useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  const activeHref = React.useMemo(() => {
    if (!pathname) return null;

    const matches = PRIMARY_NAV_ITEMS.filter((item) =>
      matchPathname(pathname, item.href),
    );

    matches.sort((a, b) => b.href.length - a.href.length);
    return matches[0]?.href ?? null;
  }, [pathname]);

  React.useEffect(() => {
    if (!isMenuOpen) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeMenu();
        openBtnRef.current?.focus();
        return;
      }

      if (e.key !== 'Tab') return;

      const container = mobileNavRef.current;
      if (!container) return;

      const focusable = Array.from(
        container.querySelectorAll<HTMLElement>(
          [
            'a[href]',
            'button:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            '[tabindex]:not([tabindex="-1"])',
          ].join(','),
        ),
      ).filter(
        (element) =>
          !element.hasAttribute('disabled') &&
          element.getAttribute('aria-hidden') !== 'true',
      );

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isMenuOpen, closeMenu]);

  React.useEffect(() => {
    if (!isMenuOpen) return;

    const body = document.body;
    const scrollY = window.scrollY;

    const previousPosition = body.style.position;
    const previousTop = body.style.top;
    const previousWidth = body.style.width;
    const previousOverflow = body.style.overflow;

    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.width = '100%';
    body.style.overflow = 'hidden';

    const timer = window.setTimeout(() => {
      mobileNavRef.current?.focus();
      firstMobileLinkRef.current?.focus({ preventScroll: true });
    }, 0);

    return () => {
      window.clearTimeout(timer);

      body.style.position = previousPosition;
      body.style.top = previousTop;
      body.style.width = previousWidth;
      body.style.overflow = previousOverflow;

      window.scrollTo(0, scrollY);
    };
  }, [isMenuOpen]);

  const mobileSections = React.useMemo<MobileMenuSection[]>(() => {
    const productItems: MobileMenuItem[] = [
      ...PRIMARY_NAV_ITEMS.map((item) => ({
        label: item.label,
        href: item.href,
        icon: <Package aria-hidden="true" className="h-4 w-4" />,
      })),
      {
        label: 'Starter Free',
        href: '/starters/free',
        icon: <Sparkles aria-hidden="true" className="h-4 w-4" />,
        badge: 'Free',
      },
      {
        label: 'Starter Pro',
        href: '/starters/pro',
        icon: <Sparkles aria-hidden="true" className="h-4 w-4" />,
        badge: '199 €',
      },
      {
        label: 'Pricing',
        href: '/access',
        icon: <ChevronRight aria-hidden="true" className="h-4 w-4" />,
      },
    ];

    const resourceItems: MobileMenuItem[] = [
      {
        label: 'Documentation',
        href: '/docs',
        icon: <BookOpen aria-hidden="true" className="h-4 w-4" />,
      },
      {
        label: 'Blog',
        href: '/blog',
        icon: <FileText aria-hidden="true" className="h-4 w-4" />,
        badge: 'New',
      },
      ...docsLinks.map((doc) => ({
        label: doc.label,
        href: doc.href,
        icon: <ChevronRight aria-hidden="true" className="h-4 w-4" />,
      })),
    ];

    const socialProofItems: MobileMenuItem[] = [
      {
        label: 'GitHub',
        href: 'https://github.com/pycolors',
        icon: <Github aria-hidden="true" className="h-4 w-4" />,
      },
      {
        label: 'Changelog',
        href: '/changelog',
        icon: <ChevronRight aria-hidden="true" className="h-4 w-4" />,
      },
    ];

    return [
      { title: 'Product', items: productItems },
      { title: 'Resources', items: resourceItems },
      { title: 'Proof', items: socialProofItems },
    ];
  }, [docsLinks]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <a
          href="#content"
          className={cn(
            'sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[60]',
            'rounded-md border border-border bg-background px-3 py-2 text-sm',
            focusRing,
          )}
        >
          Skip to content
        </a>

        <Container className="px-4 sm:px-6 lg:px-8">
          <section className="flex h-16 items-center gap-3">
            <div className="flex shrink-0 items-center gap-3">
              <Logo />
            </div>

            <nav
              aria-label="Primary"
              className="ml-4 hidden flex-1 items-center gap-1 text-sm font-medium md:flex"
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
                      'text-muted-foreground hover:bg-accent/30 hover:text-foreground',
                      isCurrent && 'bg-accent/30 text-foreground',
                      focusRing,
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden items-center gap-2 md:flex">
              <LargeSearchToggle className="w-52" />

              <ThemeToggle
                mode="light-dark"
                className="inline-flex h-9 items-center rounded-full border px-1"
              />

              <Button asChild size="sm" variant="outline">
                <Link href="/starters/free">Starter Free</Link>
              </Button>

              <Button asChild size="sm">
                <Link href="/starters/pro">
                  Starter Pro
                  <ArrowRight
                    aria-hidden="true"
                    className="ml-2 h-4 w-4"
                  />
                </Link>
              </Button>
            </div>

            <div className="ml-auto flex items-center gap-2 md:hidden">
              <ThemeToggle
                mode="light-dark"
                className="inline-flex h-9 items-center rounded-full border px-1"
              />

              <button
                ref={openBtnRef}
                type="button"
                onClick={toggleMenu}
                aria-label={
                  isMenuOpen
                    ? 'Close navigation menu'
                    : 'Open navigation menu'
                }
                aria-expanded={isMenuOpen}
                aria-controls="mobile-navigation"
                className={cn(
                  'inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background/80',
                  focusRing,
                )}
              >
                {isMenuOpen ? (
                  <X aria-hidden="true" className="h-5 w-5" />
                ) : (
                  <Menu aria-hidden="true" className="h-5 w-5" />
                )}
              </button>
            </div>
          </section>
        </Container>
      </header>

      {isMenuOpen && (
        <div className="md:hidden">
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={closeMenu}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
            style={{ top: HEADER_HEIGHT }}
          />

          <dialog
            ref={mobileNavRef}
            id="mobile-navigation"
            open
            aria-labelledby="mobile-navigation-title"
            className={cn(
              'fixed inset-x-0 z-50 m-0 flex max-h-none max-w-none flex-col overflow-hidden border-t border-border bg-background p-0 text-inherit md:hidden',
              'backdrop:hidden',
            )}
            style={{
              top: HEADER_HEIGHT,
              height: `calc(100dvh - ${HEADER_HEIGHT}px)`,
            }}
          >
            <h2 id="mobile-navigation-title" className="sr-only">
              Mobile navigation
            </h2>

            <div
              className={cn(
                'min-h-0 flex-1 overflow-y-auto overscroll-contain',
                '[-webkit-overflow-scrolling:touch]',
              )}
            >
              <Container className="px-4 pb-6 pt-4">
                <div className="flex min-w-0 flex-col gap-6 pb-6">
                  <div className="rounded-2xl border border-border/60 bg-muted/20 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-foreground">
                          Build with PyColors
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Start with a credible product surface today,
                          then move to real auth, real billing, and
                          stronger business foundations when you are
                          ready to launch.
                        </p>
                      </div>

                      <span className="inline-flex rounded-full border border-border/60 bg-background px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        Product-first
                      </span>
                    </div>
                  </div>

                  {mobileSections.map((section, sectionIndex) => (
                    <section
                      key={section.title}
                      className="rounded-2xl border border-border/60 bg-muted/20 p-3"
                    >
                      <p className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        {section.title}
                      </p>

                      <nav
                        aria-label={section.title}
                        className="flex flex-col gap-1"
                      >
                        {section.items.map((item, itemIndex) => {
                          const isCurrent =
                            item.href.startsWith('/') &&
                            activeHref === item.href;
                          const isExternal =
                            item.href.startsWith('http');

                          return (
                            <Link
                              key={`${section.title}-${item.href}-${item.label}`}
                              href={item.href}
                              ref={
                                sectionIndex === 0 && itemIndex === 0
                                  ? firstMobileLinkRef
                                  : undefined
                              }
                              aria-current={
                                isCurrent ? 'page' : undefined
                              }
                              target={
                                isExternal ? '_blank' : undefined
                              }
                              rel={
                                isExternal
                                  ? 'noreferrer noopener'
                                  : undefined
                              }
                              onClick={closeMenu}
                              className={cn(
                                'group flex items-center justify-between rounded-xl px-3 py-3 transition-colors',
                                isCurrent
                                  ? 'bg-accent text-foreground'
                                  : 'text-muted-foreground hover:bg-background hover:text-foreground',
                                focusRing,
                              )}
                            >
                              <span className="flex min-w-0 items-center gap-3">
                                <span
                                  aria-hidden="true"
                                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-background"
                                >
                                  {item.icon}
                                </span>

                                <span className="truncate text-sm font-medium">
                                  {item.label}
                                </span>
                              </span>

                              <span className="flex items-center gap-2">
                                {item.badge ? (
                                  <span className="inline-flex rounded-full border border-border/60 bg-background px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-foreground">
                                    {item.badge}
                                  </span>
                                ) : null}

                                <ChevronRight
                                  aria-hidden="true"
                                  className="h-4 w-4 opacity-60 transition-transform group-hover:translate-x-0.5"
                                />
                              </span>
                            </Link>
                          );
                        })}
                      </nav>
                    </section>
                  ))}

                  <div className="rounded-2xl border border-border/60 bg-muted/20 p-4">
                    <p className="text-sm font-semibold text-foreground">
                      Why PyColors
                    </p>

                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                      <li>• Validate product shape first</li>
                      <li>
                        • Upgrade when wiring becomes the bottleneck
                      </li>
                      <li>• Move faster from idea to launch</li>
                    </ul>

                    <div className="mt-4">
                      <LargeSearchToggle className="w-full" />
                    </div>
                  </div>
                </div>
              </Container>
            </div>

            <div className="border-t border-border bg-background/95 px-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-4 backdrop-blur">
              <div className="flex flex-col gap-3">
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-center"
                >
                  <Link href="/starters/free" onClick={closeMenu}>
                    Starter Free
                  </Link>
                </Button>

                <Button asChild className="w-full justify-center">
                  <Link href="/starters/pro" onClick={closeMenu}>
                    Starter Pro
                    <ArrowRight
                      aria-hidden="true"
                      className="ml-2 h-4 w-4"
                    />
                  </Link>
                </Button>
              </div>
            </div>
          </dialog>
        </div>
      )}
    </>
  );
}
