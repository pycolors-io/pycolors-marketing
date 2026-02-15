import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight,
  Boxes,
  LayoutTemplate,
  Sparkles,
  Workflow,
  ShieldCheck,
  FileText,
  Zap,
  ExternalLink,
  PackageCheck,
  CreditCard,
  LifeBuoy,
  Eye,
} from 'lucide-react';

import { Container } from '@/components/container';
import { Badge, Button, Card, cn } from '@pycolors/ui';
import { Footer } from '@/components/footer';
import { SiteHeader } from '@/components/layout/site-header';

export const metadata: Metadata = {
  title: 'Templates',
  description:
    'Premium templates built on PyColors UI — production-ready layouts that help you ship SaaS faster with clean structure, tokens, and docs.',
  alternates: { canonical: '/templates' },
  openGraph: {
    title: 'Templates · PyColors',
    description:
      'Premium templates built on PyColors UI — production-ready layouts that help you ship SaaS faster with clean structure, tokens, and docs.',
    url: '/templates',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Templates · PyColors',
    description:
      'Premium templates built on PyColors UI — production-ready layouts that help you ship SaaS faster.',
    images: ['/seo/twitter-main.png'],
  },
};

const focusRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';

type TemplateStatus = 'Available' | 'Early' | 'Planned';

type Template = {
  name: string;
  description: string;
  status: TemplateStatus;
  href: string;
  tags: string[];
  priceLabel?: string;
  demoUrl?: string;
  buyUrl?: string;
  includes?: string[];
  migrationNote?: string;
};

const templates: Template[] = [
  {
    name: 'NA-AI Landing Page',
    description:
      'A commercial landing page template for AI and SaaS products. Designed for clarity, conversion, and real-world usage.',
    status: 'Early',
    href: '/templates/na-ai',
    tags: ['Landing', 'SaaS', 'Next.js', 'Tailwind'],
    demoUrl: 'https://na-ai-landing-template.vercel.app/',
    buyUrl: 'https://pycolors.gumroad.com',
    priceLabel: 'Premium',
    includes: [
      'Clean sections + real navigation patterns',
      'Tokens + spacing conventions aligned with PyColors UI direction',
      'README + setup steps + structure you can extend',
    ],
    migrationNote:
      'Usable today — progressive alignment with PyColors UI continues.',
  },
];

const principles = [
  {
    title: 'Production-first',
    description:
      'Opinionated starting points meant for real products — not demo-only kits.',
    icon: <Workflow className="h-4 w-4" aria-hidden="true" />,
  },
  {
    title: 'Built on PyColors UI direction',
    description:
      'Semantic tokens, consistent structure, docs-first mindset — designed to scale.',
    icon: <Sparkles className="h-4 w-4" aria-hidden="true" />,
  },
  {
    title: 'Blocks → Templates → Products',
    description:
      'Templates evolve into sellable, product-grade packaging with repeatable launches.',
    icon: <Boxes className="h-4 w-4" aria-hidden="true" />,
  },
];

const trust = [
  {
    title: 'Structured & documented',
    description:
      'Each template ships with a README, setup steps, and a predictable project structure.',
    icon: <FileText className="h-4 w-4" aria-hidden="true" />,
  },
  {
    title: 'Accessibility & tokens',
    description:
      'Sane defaults (focus states, spacing, semantics) so you ship without rebuilding foundations.',
    icon: <ShieldCheck className="h-4 w-4" aria-hidden="true" />,
  },
  {
    title: 'Fast integration',
    description:
      'Drop into a real Next.js app quickly, then adapt to your brand and constraints.',
    icon: <Zap className="h-4 w-4" aria-hidden="true" />,
  },
];

const whatYouGet = [
  {
    title: 'Production layout',
    description:
      'Real sections, real navigation patterns, and sensible UI density — built for shipping.',
    icon: <PackageCheck className="h-4 w-4" aria-hidden="true" />,
  },
  {
    title: 'Commercial-ready',
    description:
      'License guidance, packaging mindset, and a structure designed for distribution.',
    icon: <CreditCard className="h-4 w-4" aria-hidden="true" />,
  },
  {
    title: 'Support path',
    description:
      'Issues/requests tracked publicly so improvements are transparent and prioritized.',
    icon: <LifeBuoy className="h-4 w-4" aria-hidden="true" />,
  },
];

function Pill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-muted/40 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
      {label}
    </span>
  );
}

function StatusBadge({ status }: { status: TemplateStatus }) {
  const variant =
    status === 'Available'
      ? 'secondary'
      : status === 'Early'
        ? 'outline'
        : 'outline';

  const label =
    status === 'Available'
      ? 'Available'
      : status === 'Early'
        ? 'Early access'
        : 'Planned';

  return (
    <Badge variant={variant} className="text-[11px]">
      {label}
    </Badge>
  );
}

function TemplateCard({ t }: { t: Template }) {
  return (
    <Card className="p-6 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-brand text-lg font-semibold tracking-tight">
              {t.name}
            </h3>
            <StatusBadge status={t.status} />
            {t.priceLabel ? <Pill label={t.priceLabel} /> : null}
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {t.description}
          </p>
        </div>

        <div className="hidden sm:block">
          <LayoutTemplate
            className="h-5 w-5 text-muted-foreground"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {t.tags.map((tag) => (
          <Pill key={tag} label={tag} />
        ))}
      </div>

      {t.includes?.length ? (
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          {t.includes.slice(0, 3).map((it) => (
            <li key={it} className="flex gap-2">
              <span
                className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/60"
                aria-hidden="true"
              />
              <span className="text-pretty">{it}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        <Button asChild className={cn(focusRing)}>
          <Link href={t.href}>
            View details{' '}
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>

        {t.demoUrl ? (
          <Button asChild variant="outline" className={cn(focusRing)}>
            <a
              href={t.demoUrl}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`Open ${t.name} demo (opens in a new tab)`}
            >
              Live demo{' '}
              <Eye className="ml-2 h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        ) : null}

        {t.buyUrl ? (
          <Button
            asChild
            variant="secondary"
            className={cn(focusRing)}
          >
            <a
              href={t.buyUrl}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`Buy ${t.name} (opens in a new tab)`}
            >
              Get it{' '}
              <ExternalLink
                className="ml-2 h-4 w-4"
                aria-hidden="true"
              />
            </a>
          </Button>
        ) : null}
      </div>

      {t.migrationNote ? (
        <p className="mt-4 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">Status:</span>{' '}
          {t.migrationNote}
        </p>
      ) : null}
    </Card>
  );
}

export default function TemplatesPage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <SiteHeader />

      <main className="flex-1 bg-background text-foreground">
        <Container className="py-20 sm:py-20 lg:py-24">
          {/* HERO */}
          <header className="mx-auto w-full max-w-4xl text-center">
            <div className="flex justify-center">
              <Badge variant="secondary" className="gap-2">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Premium templates
              </Badge>
            </div>

            <h1 className="font-brand mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Ship SaaS faster with templates
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-balance text-sm text-muted-foreground sm:text-base">
              Production-ready layouts built on the PyColors UI
              direction — designed to reduce setup time, keep
              structure clean, and avoid design debt.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild className={cn(focusRing)}>
                <Link href="#templates">
                  Browse templates{' '}
                  <ArrowRight
                    className="ml-2 h-4 w-4"
                    aria-hidden="true"
                  />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className={cn(focusRing)}
              >
                <Link href="/ui">See the UI foundation</Link>
              </Button>

              <Button
                asChild
                variant="secondary"
                className={cn(focusRing)}
              >
                <a
                  href="https://pycolors.gumroad.com"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="Open PyColors on Gumroad (opens in a new tab)"
                >
                  Get on Gumroad{' '}
                  <ExternalLink
                    className="ml-2 h-4 w-4"
                    aria-hidden="true"
                  />
                </a>
              </Button>
            </div>

            <p className="mx-auto mt-6 max-w-2xl text-balance text-xs text-muted-foreground">
              Templates are designed for real deployment — not
              screenshots.
            </p>
          </header>

          <section className="mx-auto mt-10 w-full max-w-5xl">
            <div className="grid gap-4 sm:grid-cols-3">
              {principles.map((p) => (
                <Card key={p.title} className="p-5">
                  <div className="inline-flex items-center gap-2 text-sm font-medium">
                    {p.icon}
                    {p.title}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {p.description}
                  </p>
                </Card>
              ))}
            </div>
          </section>

          <section className="mx-auto mt-10 w-full max-w-5xl">
            <Card className="p-6 sm:p-7">
              <div className="space-y-2">
                <h2 className="font-brand text-lg font-semibold tracking-tight">
                  What you get (practical, not marketing)
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Clean structure, predictable conventions, and a path
                  to ship quickly without rebuilding foundations.
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {whatYouGet.map((t) => (
                  <div key={t.title} className="space-y-2">
                    <div className="inline-flex items-center gap-2 text-sm font-medium">
                      {t.icon}
                      {t.title}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {trust.map((t) => (
                  <div key={t.title} className="space-y-2">
                    <div className="inline-flex items-center gap-2 text-sm font-medium">
                      {t.icon}
                      {t.title}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button
                  asChild
                  variant="outline"
                  className={cn(focusRing)}
                >
                  <Link href="/license">
                    License details{' '}
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
                  <Link href="/docs">
                    Read the docs{' '}
                    <ArrowRight
                      className="ml-2 h-4 w-4"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>
              </div>
            </Card>
          </section>

          <section className="mx-auto mt-10 w-full max-w-5xl">
            <Card className="p-6 sm:p-7">
              <div className="space-y-2">
                <h2 className="font-brand text-lg font-semibold tracking-tight">
                  License snapshot
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Keep this section short and confidence-building.
                  Full details live on the License page.
                </p>
              </div>

              <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                {[
                  'Use in commercial projects (details in License).',
                  'Clear distribution rules for templates/starter packaging.',
                  'Updates shipped progressively with roadmap visibility.',
                ].map((it) => (
                  <li key={it} className="flex gap-2">
                    <span
                      className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/60"
                      aria-hidden="true"
                    />
                    <span className="text-pretty">{it}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild className={cn(focusRing)}>
                  <Link href="/license">
                    Read license{' '}
                    <ArrowRight
                      className="ml-2 h-4 w-4"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className={cn(focusRing)}
                >
                  <Link href="/ui">UI foundation</Link>
                </Button>
              </div>
            </Card>
          </section>

          <section
            id="templates"
            className="mx-auto mt-10 w-full max-w-5xl space-y-4"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-brand text-lg font-semibold tracking-tight">
                  Available templates
                </h2>
                <p className="text-sm text-muted-foreground">
                  Designed for shipping today, improved progressively.
                </p>
              </div>
              <div className="text-xs text-muted-foreground">
                {templates.length} template
                {templates.length === 1 ? '' : 's'}
              </div>
            </div>

            <div className="grid gap-4">
              {templates.map((t) => (
                <TemplateCard key={t.name} t={t} />
              ))}
            </div>

            <p className="text-xs text-muted-foreground">
              Each template includes a README, setup steps, and a
              clean structure — built for real deployment.
            </p>
          </section>

          <section className="mx-auto mt-10 w-full max-w-5xl">
            <Card className="p-6 sm:p-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <div className="text-sm font-medium">
                    Want to influence what ships next?
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Requests and issues help prioritize templates,
                    blocks, and future commercial releases.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button
                    asChild
                    variant="outline"
                    className={cn(focusRing)}
                  >
                    <a
                      href="https://github.com/pycolors-io/pycolors-ui/issues"
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label="Open PyColors UI issues on GitHub (opens in a new tab)"
                    >
                      Open an issue{' '}
                      <ExternalLink
                        className="ml-2 h-4 w-4"
                        aria-hidden="true"
                      />
                    </a>
                  </Button>

                  <Button asChild className={cn(focusRing)}>
                    <Link href="/changelog">
                      View changelog{' '}
                      <ArrowRight
                        className="ml-2 h-4 w-4"
                        aria-hidden="true"
                      />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              Templates ship progressively — early releases improve
              fast as PyColors UI evolves.
            </p>
          </section>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
