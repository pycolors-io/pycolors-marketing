'use client';

import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

import { Container } from '@/components/container';
import { Button, cn } from '@pycolors/ui';
import { UI_VERSION, APP_VERSION } from '@/lib/version';
import { BuyStarterProButton } from '@/components/pricing/buy-starter-pro-button';

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
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Docs', href: '/docs' },
      { label: 'Guides', href: '/guides' },
      { label: 'Patterns', href: '/ui/patterns' },
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

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border bg-background">
      <Container className="mx-auto max-w-6xl">
        <div className="py-16 sm:py-20">
          <section className="border-b border-border/60 pb-14 sm:pb-16">
            <div className="mx-auto max-w-3xl text-center">
              <div className="space-y-4">
                <p className="text-sm font-medium text-muted-foreground">
                  PyColors
                </p>

                <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                  Build the product surface first.{' '}
                  <span className="block text-muted-foreground">
                    Upgrade when the business layer matters.
                  </span>
                </h2>

                <p className="mx-auto max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                  Start with Starter Free to validate faster. Move to
                  Starter Pro when auth, billing, and launch-ready
                  foundations become the real bottleneck.
                </p>
              </div>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button
                  asChild
                  variant="outline"
                  className="h-11 rounded-xl px-6 text-sm font-medium"
                >
                  <Link href="/starters/free">Starter Free</Link>
                </Button>

                <BuyStarterProButton
                  fullWidth={false}
                  label="Buy Starter Pro"
                />
              </div>
            </div>
          </section>

          <section className="grid gap-12 pt-12 sm:pt-14 lg:grid-cols-[1.1fr_1.4fr]">
            <div className="space-y-5">
              <div className="space-y-3">
                <div className="font-brand text-xl font-semibold tracking-tight">
                  PyColors
                </div>

                <p className="max-w-sm text-sm leading-7 text-muted-foreground">
                  Production-first SaaS system for developers who want
                  clearer product surfaces, stronger foundations, and
                  faster paths to launch.
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

          <section className="mt-12 flex flex-col gap-3 border-t border-border/60 pt-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <div className="text-xs text-muted-foreground">
              © {CURRENT_YEAR} PyColors
            </div>

            <div className="text-[11px] text-muted-foreground">
              UI v{UI_VERSION} · App v{APP_VERSION}
            </div>
          </section>
        </div>
      </Container>
    </footer>
  );
}
