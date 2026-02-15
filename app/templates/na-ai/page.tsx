import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  Package,
  BadgeCheck,
  CheckCircle2,
  Boxes,
  Users,
  Rocket,
  FileArchive,
  RefreshCcw,
  Image as ImageIcon,
} from 'lucide-react';

import { Container } from '@/components/container';
import { Badge, Button, Card, cn } from '@pycolors/ui';

import { Footer } from '@/components/footer';
import { SiteHeader } from '@/components/layout/site-header';

export const metadata: Metadata = {
  title: 'NA-AI Landing Page Template · PyColors',
  description:
    'A premium AI/SaaS landing page template (Next.js) — production-ready structure, modern stack, commercial license included.',
  alternates: { canonical: '/templates/na-ai' },
  openGraph: {
    title: 'NA-AI · Templates · PyColors',
    description:
      'Premium AI analytics landing page template (Next.js). Production-ready structure, modern stack, commercial license included.',
    url: '/templates/na-ai',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NA-AI · Templates · PyColors',
    description:
      'Premium AI analytics landing page template (Next.js). Production-ready structure, modern stack, commercial license included.',
    images: ['/seo/twitter-main.png'],
  },
};

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

const PRODUCT = {
  name: 'NA-AI',
  title: 'NA-AI — Premium AI Analytics Landing Page (Next.js)',
  subtitle:
    'A commercial landing page template for SaaS & AI products.',
  status: 'Available',
  note: 'Early template — progressive migration to PyColors UI continues.',
  price: '$49',
  demoUrl: 'https://na-ai-landing-template.vercel.app',
  buyUrl:
    'https://pycolors.gumroad.com/l/na-ai-nextjs-landing?layout=profile',
};

const SCREENSHOTS: Array<{
  src: string;
  alt: string;
  hint?: string;
}> = [
  {
    src: '/templates/na-ai/na-ai-analytics-workspace-dark.webp',
    alt: 'NA-AI landing page template — full layout (dark mode)',
    hint: 'Dark mode · full layout',
  },
  {
    src: '/templates/na-ai/na-ai-analytics-workspace-light.webp',
    alt: 'NA-AI landing page template — full layout (light mode)',
    hint: 'Light mode · full layout',
  },
];

const highlights = [
  {
    title: 'Built to ship',
    description:
      'Designed as a real product foundation — clean structure, solid UX, and scalable sections.',
    icon: <Sparkles className="h-4 w-4" aria-hidden="true" />,
  },
  {
    title: 'Production-ready bundle',
    description:
      'Full source code delivered as a template you can customize and deploy quickly.',
    icon: <Package className="h-4 w-4" aria-hidden="true" />,
  },
  {
    title: 'Commercial license',
    description:
      'Use for personal projects and client work. No redistribution.',
    icon: <ShieldCheck className="h-4 w-4" aria-hidden="true" />,
  },
];

const perfectFor = [
  {
    title: 'SaaS & AI launches',
    description:
      'Marketing sites that need clarity, structure, and fast iteration.',
    icon: <Rocket className="h-4 w-4" aria-hidden="true" />,
  },
  {
    title: 'Indie hackers',
    description:
      'Ship a real landing page in hours — then tailor messaging later.',
    icon: <Users className="h-4 w-4" aria-hidden="true" />,
  },
  {
    title: 'Agencies & client work',
    description:
      'A repeatable baseline you can rebrand without rebuilding foundations.',
    icon: <Boxes className="h-4 w-4" aria-hidden="true" />,
  },
];

const included = [
  'Next.js (App Router) project structure',
  'TypeScript + Tailwind CSS v4',
  'shadcn/ui + Radix UI components',
  'Hero, features, integrations, testimonials, FAQ',
  'Pricing comparison table + monthly/yearly toggle',
  'Data-driven architecture (no hardcoded copy)',
  'Contact / sales form (frontend-only)',
  'Dark / Light mode (system-aware)',
  'SEO baseline (OG, sitemap, robots)',
  'Frontend-only (no auth/backend)',
];

const stack = [
  'Next.js (App Router)',
  'TypeScript',
  'Tailwind CSS v4',
  'shadcn/ui + Radix UI',
  'Framer Motion',
  'Recharts',
  'Lucide Icons',
];

const license = [
  'Commercial license included (personal + client work).',
  'No reselling / redistribution.',
  'No source sharing.',
];

const delivery = [
  'Delivered as a ZIP with full source code.',
  'Includes setup instructions + project structure guide.',
  'Designed for quick deploy on Vercel (or similar).',
];

const updates = [
  { label: 'Last update', value: 'v0.1 (early release baseline)' },
  {
    label: 'Next',
    value:
      'Progressive alignment with PyColors UI components & tokens',
  },
  { label: 'Cadence', value: 'Shipped progressively (see roadmap)' },
];

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
      {items.map((it) => (
        <li key={it} className="flex gap-2">
          <CheckCircle2
            className="mt-0.5 h-4 w-4 shrink-0 text-foreground/70"
            aria-hidden="true"
          />
          <span className="text-pretty">{it}</span>
        </li>
      ))}
    </ul>
  );
}

function ScreenshotGrid() {
  return (
    <Card className="p-6 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h2 className="font-brand text-lg font-semibold tracking-tight">
            Screenshots
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Full layout preview in dark and light mode — real
            production UI, not mockups.
          </p>
        </div>
        <ImageIcon
          className="hidden h-5 w-5 text-muted-foreground sm:block"
          aria-hidden="true"
        />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {SCREENSHOTS.map((s) => (
          <div key={s.src} className="space-y-2">
            <div className="relative overflow-hidden rounded-lg border border-border bg-muted/20">
              <Image
                src={s.src}
                alt={s.alt}
                width={1400}
                height={900}
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="h-auto w-full"
                priority={false}
              />
            </div>
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs text-muted-foreground">{s.alt}</p>
              {s.hint ? (
                <Badge variant="outline" className="text-[11px]">
                  {s.hint}
                </Badge>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default function NaAiTemplatePage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <SiteHeader />

      <main className="flex-1 bg-background text-foreground">
        <Container className="py-20 sm:py-20 lg:py-24">
          <header className="mx-auto w-full max-w-4xl text-center">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary" className="gap-2">
                <span
                  className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500"
                  aria-hidden="true"
                />
                Templates
              </Badge>

              <Badge variant="outline" className="text-[11px]">
                {PRODUCT.status}
              </Badge>

              <span className="text-xs text-muted-foreground">
                {PRODUCT.price}
              </span>
            </div>

            <h1 className="font-brand mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              {PRODUCT.title}
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-balance text-sm text-muted-foreground sm:text-base">
              {PRODUCT.subtitle}
            </p>

            <p className="mx-auto mt-2 max-w-2xl text-balance text-xs text-muted-foreground">
              {PRODUCT.note}
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild className={cn(focusRing)}>
                <a
                  href={PRODUCT.buyUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Buy NA-AI on Gumroad (opens in a new tab)"
                >
                  Buy NA-AI
                  <ExternalLink
                    className="ml-2 h-4 w-4"
                    aria-hidden="true"
                  />
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className={cn(focusRing)}
              >
                <a
                  href={PRODUCT.demoUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Open NA-AI live demo (opens in a new tab)"
                >
                  Live demo
                  <ExternalLink
                    className="ml-2 h-4 w-4"
                    aria-hidden="true"
                  />
                </a>
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2">
              <Link
                href="/templates"
                className={cn(
                  'rounded-md text-xs text-muted-foreground transition-colors hover:text-foreground',
                  focusRing,
                )}
                aria-label="Back to Templates"
              >
                ← Back to Templates
              </Link>

              <Link
                href="/license"
                className={cn(
                  'rounded-md text-xs text-muted-foreground transition-colors hover:text-foreground',
                  focusRing,
                )}
                aria-label="Read licensing information"
              >
                License →
              </Link>
            </div>
          </header>

          <section className="mx-auto mt-10 w-full max-w-5xl">
            <div className="grid gap-4 sm:grid-cols-3">
              {highlights.map((h) => (
                <Card key={h.title} className="p-5">
                  <div className="inline-flex items-center gap-2 text-sm font-medium">
                    {h.icon}
                    {h.title}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {h.description}
                  </p>
                </Card>
              ))}
            </div>
          </section>

          <section className="mx-auto mt-10 w-full max-w-5xl">
            <ScreenshotGrid />
          </section>

          <section className="mx-auto mt-10 w-full max-w-5xl">
            <Card className="p-6 sm:p-7">
              <div className="space-y-2">
                <h2 className="font-brand text-lg font-semibold tracking-tight">
                  Perfect for
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The fastest path to a clean, commercial landing page
                  for AI/SaaS.
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {perfectFor.map((p) => (
                  <div key={p.title} className="space-y-2">
                    <div className="inline-flex items-center gap-2 text-sm font-medium">
                      {p.icon}
                      {p.title}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          <section className="mx-auto mt-10 w-full max-w-5xl">
            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="p-6 sm:p-7">
                <h2 className="font-brand text-lg font-semibold tracking-tight">
                  What’s included
                </h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  A focused set of sections and patterns for SaaS/AI
                  launches — without backend complexity.
                </p>
                <BulletList items={included} />
              </Card>

              <Card className="p-6 sm:p-7">
                <h2 className="font-brand text-lg font-semibold tracking-tight">
                  Tech stack
                </h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Modern defaults with sensible architecture and UI
                  primitives.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {stack.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center rounded-full border border-border bg-muted/40 px-2 py-0.5 text-[11px] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-6 rounded-lg border border-border bg-muted/30 p-4">
                  <div className="inline-flex items-center gap-2 text-sm font-medium">
                    <BadgeCheck
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                    Notes
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Frontend-only by design — no authentication,
                    database, or API included.
                  </p>
                </div>
              </Card>
            </div>
          </section>

          <section className="mx-auto mt-10 w-full max-w-5xl">
            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="p-6 sm:p-7">
                <div className="inline-flex items-center gap-2 text-sm font-medium">
                  <FileArchive
                    className="h-4 w-4"
                    aria-hidden="true"
                  />
                  Delivery
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  What you receive after purchase.
                </p>
                <BulletList items={delivery} />
              </Card>

              <Card className="p-6 sm:p-7">
                <div className="inline-flex items-center gap-2 text-sm font-medium">
                  <RefreshCcw
                    className="h-4 w-4"
                    aria-hidden="true"
                  />
                  Updates
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  The template improves progressively as PyColors
                  grows.
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {updates.map((u) => (
                    <div
                      key={u.label}
                      className="rounded-lg border border-border bg-muted/20 px-3 py-2"
                    >
                      <div className="text-[11px] text-muted-foreground">
                        {u.label}
                      </div>
                      <div className="mt-1 text-xs font-medium">
                        {u.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Button
                    asChild
                    variant="outline"
                    className={cn(focusRing)}
                  >
                    <Link href="/roadmap">
                      View roadmap{' '}
                      <ArrowRight
                        className="ml-2 h-4 w-4"
                        aria-hidden="true"
                      />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="secondary"
                    className={cn(focusRing)}
                  >
                    <Link href="/changelog">
                      Changelog{' '}
                      <ArrowRight
                        className="ml-2 h-4 w-4"
                        aria-hidden="true"
                      />
                    </Link>
                  </Button>
                </div>
              </Card>
            </div>
          </section>

          <section className="mx-auto mt-10 w-full max-w-5xl">
            <Card className="p-6 sm:p-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-2">
                  <h2 className="font-brand text-lg font-semibold tracking-tight">
                    License summary
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Clear rules so you can ship confidently.
                  </p>
                  <BulletList items={license} />
                </div>

                <div className="flex flex-col gap-2 sm:items-end">
                  <Button asChild className={cn(focusRing)}>
                    <a
                      href={PRODUCT.buyUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label="Buy NA-AI on Gumroad (opens in a new tab)"
                    >
                      Buy NA-AI
                      <ArrowRight
                        className="ml-2 h-4 w-4"
                        aria-hidden="true"
                      />
                    </a>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className={cn(focusRing)}
                  >
                    <Link href="/license">Read full license</Link>
                  </Button>
                </div>
              </div>
            </Card>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              NA-AI is sold on Gumroad. This page is a curated product
              hub and evolves as PyColors UI grows.
            </p>
          </section>

          <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/80 backdrop-blur">
            <Container className="py-3">
              <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                <div className="text-sm">
                  <span className="font-medium">
                    {PRODUCT.name} — Landing Page
                  </span>{' '}
                  <span className="text-muted-foreground">
                    · {PRODUCT.price}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button asChild size="sm" className={cn(focusRing)}>
                    <a
                      href={PRODUCT.buyUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Buy{' '}
                      <ExternalLink
                        className="ml-2 h-4 w-4"
                        aria-hidden="true"
                      />
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className={cn(focusRing)}
                  >
                    <a
                      href={PRODUCT.demoUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Demo{' '}
                      <ExternalLink
                        className="ml-2 h-4 w-4"
                        aria-hidden="true"
                      />
                    </a>
                  </Button>
                </div>
              </div>
            </Container>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
