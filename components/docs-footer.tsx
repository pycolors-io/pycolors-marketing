'use client';

import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { ThemeToggle } from 'fumadocs-ui/components/layout/theme-toggle';

import { Container } from '@/components/container';
import { cn } from '@pycolors/ui';
import { UI_VERSION, APP_VERSION } from '@/lib/version';

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

const CURRENT_YEAR = new Date().getFullYear();

type FooterLink = {
  readonly label: string;
  readonly href: string;
  readonly external?: boolean;
  readonly ariaLabel?: string;
};

const GROUPS: Array<{
  title: string;
  links: FooterLink[];
}> = [
  {
    title: 'Products',
    links: [
      { label: 'Starter Free', href: '/starters/free' },
      { label: 'Starter Pro', href: '/starters/pro' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'UI Library', href: '/ui' },
      { label: 'Compare Starters', href: '/starters' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Docs', href: '/docs' },
      { label: 'Guides', href: '/guides' },
      { label: 'Patterns', href: '/docs/patterns' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Trust',
    links: [
      { label: 'Changelog', href: '/changelog' },
      { label: 'Roadmap', href: '/roadmap' },
      { label: 'License', href: '/license' },
      { label: 'Terms', href: '/terms' },
      { label: 'Privacy', href: '/privacy' },
    ],
  },
];

const EXTERNAL: FooterLink[] = [
  {
    label: 'PyColors UI',
    href: 'https://github.com/pycolors-io/pycolors-ui',
    external: true,
    ariaLabel: 'Open PyColors UI repository on GitHub',
  },
  {
    label: 'Starter Free',
    href: 'https://github.com/pycolors-io/pycolors-starter-free',
    external: true,
    ariaLabel: 'Open PyColors Starter Free repository on GitHub',
  },
];

function FooterLinkItem(link: FooterLink) {
  if (link.external) {
    return (
      <a
        key={link.label}
        href={link.href}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={
          link.ariaLabel ?? `${link.label} (opens in a new tab)`
        }
        className={cn(
          'inline-flex items-center gap-1 rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground',
          focusRing,
        )}
      >
        {link.label}
        <ExternalLink className="h-4 w-4" aria-hidden="true" />
      </a>
    );
  }

  return (
    <Link
      key={link.label}
      href={link.href}
      className={cn(
        'inline-block rounded-sm text-sm text-muted-foreground transition-colors hover:text-foreground',
        focusRing,
      )}
    >
      {link.label}
    </Link>
  );
}

export function DocsFooter() {
  return (
    <footer className="w-full border-t border-border/60 bg-background">
      <div className="relative z-10 max-w-fd-container mx-auto">
        <Container>
          <div className="py-16 sm:py-20">
            <section className="grid gap-10 lg:grid-cols-[1.05fr_1.4fr]">
              <div className="space-y-5">
                <div className="space-y-3">
                  <div className="font-brand text-xl font-semibold tracking-tight">
                    PyColors
                  </div>

                  <p className="max-w-sm text-sm leading-7 text-muted-foreground">
                    Documentation for building production-shaped SaaS
                    products faster with UI, patterns, and stronger
                    starter foundations.
                  </p>
                </div>

                <nav
                  className="flex flex-wrap gap-x-4 gap-y-2"
                  aria-label="External links"
                >
                  {EXTERNAL.map(FooterLinkItem)}
                </nav>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
                {GROUPS.map((group) => (
                  <div key={group.title} className="space-y-3">
                    <div className="text-sm font-medium text-foreground">
                      {group.title}
                    </div>

                    <nav
                      className="flex flex-col gap-2"
                      aria-label={`${group.title} links`}
                    >
                      {group.links.map(FooterLinkItem)}
                    </nav>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-10 flex flex-col gap-4 border-t border-border/60 pt-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
              <div className="text-xs text-muted-foreground">
                © {CURRENT_YEAR} PyColors · UI {UI_VERSION} · App{' '}
                {APP_VERSION}
              </div>

              <div className="flex items-center justify-center sm:justify-end">
                <ThemeToggle
                  mode="light-dark-system"
                  className="bg-background/70 px-1.5 opacity-80 transition-all duration-200 hover:bg-accent/30 hover:opacity-100"
                />
              </div>
            </section>
          </div>
        </Container>
      </div>
    </footer>
  );
}
