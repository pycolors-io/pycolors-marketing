'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, LayoutTemplate, Lock } from 'lucide-react';
import { ThemeToggle } from 'fumadocs-ui/components/layout/theme-toggle';

import { Container } from '@/components/container';
import { Button, cn } from '@pycolors/ui';
import { UI_VERSION, APP_VERSION } from '@/lib/version';
import { BuyStarterProButton } from '@/components/pricing/buy-starter-pro-button';
import { Logo } from './logo';

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
      { label: 'Starter Pro', href: '/starters/pro' },
      { label: 'Starter Free', href: '/starters/free' },
      { label: 'Compare Starters', href: '/starters' },
      { label: 'Upgrade', href: '/upgrade' },
      { label: 'Templates', href: '/templates' },
      {
        label: 'NA-AI Landing',
        href: '/templates/na-ai-landing',
      },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    title: 'Platform',
    links: [
      { label: 'PyColors UI', href: '/ui' },
      { label: 'Patterns', href: '/ui/patterns' },
      { label: 'Examples', href: '/ui/examples' },
      { label: 'Docs', href: '/docs' },
      { label: 'Guides', href: '/guides' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Changelog', href: '/changelog' },
      { label: 'Roadmap', href: '/roadmap' },
      { label: 'Recover purchase', href: '/orders/recover' },
      { label: 'Open Source', href: '/open-source' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
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
  const className = cn(
    'inline-flex items-center gap-1 rounded-[5px] text-sm text-muted-foreground transition-colors hover:text-foreground',
    focusRing,
  );

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
        className={className}
      >
        {link.label}
        <ExternalLink className="h-4 w-4" aria-hidden="true" />
      </a>
    );
  }

  return (
    <Link key={link.label} href={link.href} className={className}>
      {link.label}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="w-full border-t border-border-subtle bg-background">
      <div className="mx-auto max-w-fd-container">
        <Container>
          <div className="py-12 sm:py-16">
            <section className="border-b border-border-subtle pb-14 sm:pb-16">
              <div className="mx-auto max-w-4xl text-center">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  PyColors
                </p>

                <h2 className="mt-4 text-balance text-xl font-semibold tracking-tight sm:text-4xl">
                  Launch the page. Validate the product.{' '}
                  <span className="block text-muted-foreground">
                    Wire commerce when it matters.
                  </span>
                </h2>

                <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                  Start with a premium template, validate with Starter
                  Free, then move to Starter Pro when authentication,
                  secure checkout, purchase recovery, and protected
                  SaaS foundations should already be handled.
                </p>

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <Button
                    asChild
                    variant="outline"
                    className="h-11 rounded-[5px] px-6 text-sm font-medium"
                  >
                    <Link href="/templates/na-ai-landing">
                      <LayoutTemplate
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                      NA-AI Landing
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="h-11 rounded-[5px] px-6 text-sm font-medium"
                  >
                    <Link href="/starters/free">Starter Free</Link>
                  </Button>

                  <BuyStarterProButton fullWidth={false} />
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Secure checkout</span>
                  <span>·</span>
                  <span>Purchase recovery</span>
                  <span>·</span>
                  <span>Templates from 49 €</span>
                  <span>·</span>
                  <span>Starter Pro 199 €</span>
                  <span>·</span>
                  <span>Instant access after purchase</span>
                </div>
              </div>
            </section>

            <section className="grid gap-12 pt-12 sm:pt-14 lg:grid-cols-[1.1fr_1.4fr]">
              <div className="space-y-5">
                <div className="space-y-3">
                  <Logo />

                  <p className="max-w-sm text-sm leading-7 text-muted-foreground">
                    A premium developer platform for building SaaS
                    products with templates, UI systems,
                    commerce-ready foundations, and production-ready
                    foundations.
                  </p>
                  <div className="pt-2">
                    <a
                      href="https://www.producthunt.com/posts/pycolors"
                      target="_blank"
                      rel="noreferrer noopener"
                      className={cn(
                        'inline-flex transition-opacity hover:opacity-90',
                        focusRing,
                      )}
                    >
                      <Image
                        src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1166981"
                        alt="PyColors on Product Hunt"
                        width={220}
                        height={38}
                        unoptimized
                        className="rounded-[5px]"
                      />
                    </a>
                  </div>
                </div>

                <nav
                  className="flex flex-wrap gap-x-4 gap-y-2"
                  aria-label="External links"
                >
                  {EXTERNAL.map(FooterLinkItem)}
                </nav>
              </div>

              <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
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

            <section className="mt-12 flex flex-col gap-4 border-t border-border-subtle pt-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
              <div className="text-xs text-muted-foreground">
                © {CURRENT_YEAR} PyColors · UI {UI_VERSION} · App{' '}
                {APP_VERSION}
              </div>

              <div className="flex items-center justify-center sm:justify-end">
                <ThemeToggle
                  mode="light-dark"
                  className={cn(
                    'h-8 border border-border-subtle/80 bg-surface/60 backdrop-blur-sm',
                    'rounded-[20px] px-1 shadow-sm',
                    'opacity-80 transition-all duration-200 ease-out',
                    'hover:border-border hover:bg-accent/30 hover:opacity-100',
                    'cursor-pointer',
                    '[&_button]:h-6.5',
                    '[&_button]:w-6.5',
                    '[&_button]:rounded-[4px]',
                    '[&_button]:bg-transparent',
                    '[&_button]:transition-all',
                    '[&_button]:duration-200',
                    '[&_button:hover]:bg-accent/50',
                    '[&_button]:cursor-pointer',
                  )}
                />
              </div>
            </section>
          </div>
        </Container>
      </div>
    </footer>
  );
}
