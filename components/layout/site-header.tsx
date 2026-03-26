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
  Star,
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

function isUpgradeContext(pathname: string | null) {
  if (!pathname) return false;
  return (
    pathname.startsWith('/upgrade') ||
    pathname.startsWith('/waitlist')
  );
}

export function SiteHeader({ docsLinks = [] }: SiteHeaderProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const openBtnRef = React.useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = React.useRef<HTMLAnchorElement>(null);
  const lastScrollYRef = React.useRef(0);

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
        closeMenu();
        openBtnRef.current?.focus();
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMenuOpen, closeMenu]);

  React.useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previousHtmlOverscrollBehavior =
      html.style.overscrollBehavior;
    const previousBodyOverscrollBehavior =
      body.style.overscrollBehavior;

    if (isMenuOpen) {
      html.style.overflow = 'hidden';
      body.style.overflow = 'hidden';
      html.style.overscrollBehavior = 'none';
      body.style.overscrollBehavior = 'none';

      const timer = window.setTimeout(() => {
        firstMobileLinkRef.current?.focus({ preventScroll: true });
      }, 0);

      return () => {
        window.clearTimeout(timer);
        html.style.overflow = previousHtmlOverflow;
        body.style.overflow = previousBodyOverflow;
        html.style.overscrollBehavior =
          previousHtmlOverscrollBehavior;
        body.style.overscrollBehavior =
          previousBodyOverscrollBehavior;
      };
    }

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      html.style.overscrollBehavior = previousHtmlOverscrollBehavior;
      body.style.overscrollBehavior = previousBodyOverscrollBehavior;
    };
  }, [isMenuOpen]);

  const showWaitlistCta = isUpgradeContext(pathname);

  const mobileSections = React.useMemo<MobileMenuSection[]>(() => {
    const productItems: MobileMenuItem[] = [
      ...PRIMARY_NAV_ITEMS.map((item) => ({
        label: item.label,
        href: item.href,
        icon: <Package className="h-4 w-4" />,
      })),
    ];

    const resourceItems: MobileMenuItem[] = [
      {
        label: 'Documentation',
        href: '/docs',
        icon: <BookOpen className="h-4 w-4" />,
      },
      {
        label: 'Blog',
        href: '/blog',
        icon: <FileText className="h-4 w-4" />,
        badge: 'New',
      },
      ...docsLinks.map((doc) => ({
        label: doc.label,
        href: doc.href,
        icon: <ChevronRight className="h-4 w-4" />,
      })),
    ];

    const socialProofItems: MobileMenuItem[] = [
      {
        label: 'GitHub',
        href: 'https://github.com/pycolors',
        icon: <Github className="h-4 w-4" />,
      },
      {
        label: 'Changelog',
        href: '/changelog',
        icon: <Star className="h-4 w-4" />,
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

            <nav className="ml-4 hidden flex-1 items-center gap-1 text-sm font-medium md:flex">
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
                <Link href="/starters/free">Start Free</Link>
              </Button>

              <Button asChild size="sm">
                <Link
                  href={showWaitlistCta ? '/waitlist' : '/upgrade'}
                >
                  {showWaitlistCta ? 'Join waitlist' : 'Explore PRO'}
                  <ArrowRight className="ml-2 h-4 w-4" />
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
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
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
            aria-label="Close menu overlay"
            onClick={closeMenu}
            className="fixed inset-0 top-16 z-40 bg-background/80 backdrop-blur-sm"
          />

          <div
            id="mobile-navigation"
            className={cn(
              'fixed inset-x-0 top-16 z-50',
              `h-[calc(100dvh-${HEADER_HEIGHT}px)] overflow-y-auto`,
              'overscroll-contain touch-pan-y border-t border-border bg-background',
              '[-webkit-overflow-scrolling:touch]',
            )}
          >
            <Container className="px-4 pb-6 pt-4">
              <div className="flex min-h-full min-w-0 flex-col">
                <div className="flex flex-1 min-h-0 flex-col gap-6 pb-6">
                  <div className="rounded-2xl border border-border/60 bg-muted/20 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-foreground">
                          Build faster with PyColors
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Production-ready UI, starter kits, docs, and
                          product systems built to help teams ship
                          faster.
                        </p>
                      </div>

                      <span className="inline-flex rounded-full border border-border/60 bg-background px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        Premium
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

                      <nav className="flex flex-col gap-1">
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
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-background">
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

                                <ChevronRight className="h-4 w-4 opacity-60 transition-transform group-hover:translate-x-0.5" />
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
                      <li>• Production-ready SaaS UI</li>
                      <li>• Faster path from idea to launch</li>
                      <li>
                        • Clear upgrade path from free to premium
                      </li>
                    </ul>

                    <div className="mt-4">
                      <LargeSearchToggle className="w-full" />
                    </div>
                  </div>
                </div>

                <div className="sticky bottom-0 z-10 -mx-4 mt-auto border-t border-border bg-background/95 px-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-4 backdrop-blur">
                  <div className="flex flex-col gap-3">
                    <Button
                      asChild
                      variant="outline"
                      className="w-full justify-center"
                    >
                      <Link href="/starters/free" onClick={closeMenu}>
                        Start Free
                      </Link>
                    </Button>

                    <Button asChild className="w-full justify-center">
                      <Link
                        href={
                          showWaitlistCta ? '/waitlist' : '/upgrade'
                        }
                        onClick={closeMenu}
                      >
                        {showWaitlistCta
                          ? 'Join waitlist'
                          : 'Explore PRO'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </div>
      )}
    </>
  );
}
