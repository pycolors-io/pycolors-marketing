import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight,
  Boxes,
  Check,
  CreditCard,
  ExternalLink,
  FileText,
  LayoutTemplate,
  LifeBuoy,
  PackageCheck,
  Rocket,
  ShieldCheck,
  Sparkles,
  Workflow,
  Zap,
} from 'lucide-react';

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  cn,
} from '@pycolors/ui';

import { Container } from '@/components/container';
import { PageHero } from '@/components/marketing/page-hero';

export const metadata: Metadata = {
  title: 'Next.js SaaS Templates',
  description:
    'Premium Next.js SaaS templates for AI products, analytics platforms, developer tools, and startup launches. Full source code, commercial usage, SEO foundations, and production-shaped UI built for modern SaaS applications.',
  alternates: {
    canonical: '/templates',
  },
  openGraph: {
    title: 'Next.js SaaS Templates',

    description:
      'Launch polished SaaS and AI products faster with premium Next.js templates, production-ready UI, SEO foundations, and commercial-ready source code.',
    url: '/templates',
    siteName: 'PyColors',
    type: 'website',
    images: ['/seo/og-main.png'],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Next.js SaaS Templates',
    description:
      'Premium templates built for modern SaaS, AI, analytics, and developer products.',
    images: ['/seo/twitter-main.png'],
  },
};

type TemplateStatus = 'Available' | 'Coming soon';

type Template = {
  readonly name: string;
  readonly description: string;
  readonly status: TemplateStatus;
  readonly href: string;
  readonly tags: readonly string[];
  readonly priceLabel: string;
  readonly demoUrl?: string;
  readonly buyHref?: string;
  readonly includes: readonly string[];
  readonly note: string;
};

const templates: readonly Template[] = [
  {
    name: 'NA-AI Landing',
    description:
      'Premium AI/SaaS landing page template built with Next.js, Tailwind CSS, shadcn/ui, charts, pricing, FAQ, SEO foundations, and commercial-ready structure.',
    status: 'Available',
    href: '/templates/na-ai-landing',
    tags: ['AI', 'Landing page', 'Next.js', 'Tailwind', 'SaaS'],
    priceLabel: '49 €',
    demoUrl: 'https://na-ai.pycolors.io',
    buyHref: '/api/checkout/na-ai-landing',
    includes: [
      'Complete Next.js landing page source code',
      'Dark/light mode, pricing, FAQ, testimonials, analytics sections',
      'Commercial usage for personal and client projects',
    ],
    note: 'Sold directly by PyColors with instant access after purchase.',
  },
];

const principles = [
  {
    title: 'Built for real launches',
    description:
      'Templates are shaped for commercial products, not just portfolio screenshots.',
    icon: Rocket,
  },
  {
    title: 'Production-minded structure',
    description:
      'Clean sections, predictable conventions, and code you can extend without fighting the template.',
    icon: Workflow,
  },
  {
    title: 'Part of the PyColors ecosystem',
    description:
      'Templates connect naturally with PyColors UI, Starter Free, Starter Pro, docs, and future bundles.',
    icon: Boxes,
  },
] as const;

const valueItems = [
  {
    title: 'Full source code',
    description:
      'Own the code, customize the design, adapt the sections, and deploy with your preferred workflow.',
    icon: PackageCheck,
  },
  {
    title: 'Commercial usage',
    description:
      'Use templates for your own projects or client work according to the PyColors license.',
    icon: CreditCard,
  },
  {
    title: 'SEO-ready baseline',
    description:
      'Metadata, page structure, and marketing sections are designed to support a serious launch.',
    icon: FileText,
  },
  {
    title: 'Fast integration',
    description:
      'Start from a polished baseline instead of rebuilding hero, pricing, FAQ, testimonials, and UI states.',
    icon: Zap,
  },
] as const;

const ecosystemRows = [
  {
    product: 'Templates',
    bestFor:
      'Launching focused SaaS, AI, or marketing pages quickly.',
    label: 'Explore NA-AI Landing',
    href: '/templates/na-ai-landing',
  },
  {
    product: 'PyColors UI',
    bestFor:
      'Building consistent SaaS interfaces with production-ready React primitives.',
    label: 'Browse UI components',
    href: '/ui',
  },
  {
    product: 'Starter Free',
    bestFor: 'Validating SaaS UX surfaces before backend complexity.',
    label: 'See Starter Free',
    href: '/starters/free',
  },
  {
    product: 'Starter Pro',
    bestFor:
      'Launching with auth, billing, protected routes, and database foundations.',
    label: 'Upgrade to Pro',
    href: '/starters/pro',
  },
] as const;

const trustItems = [
  {
    title: 'Direct PyColors checkout',
    description:
      'No marketplace dependency. Purchase, access, and delivery stay inside the PyColors product experience.',
    icon: ShieldCheck,
  },
  {
    title: 'Clear upgrade path',
    description:
      'Use templates for focused pages, then move to Starter Pro when auth, billing, and app foundations matter.',
    icon: Sparkles,
  },
  {
    title: 'Actively maintained',
    description:
      'Templates improve progressively with the PyColors design system, changelog, and roadmap.',
    icon: LifeBuoy,
  },
] as const;

function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
}: {
  readonly eyebrow?: string;
  readonly title: string;
  readonly description?: string;
  readonly align?: 'center' | 'left';
}) {
  return (
    <div
      className={cn(
        align === 'center'
          ? 'mx-auto max-w-3xl text-center'
          : 'max-w-3xl text-left',
      )}
    >
      {eyebrow ? (
        <Badge
          variant="outline"
          className="rounded-[5px] border-border-subtle bg-surface-muted px-3 py-1 text-[11px] uppercase tracking-[0.18em]"
        >
          {eyebrow}
        </Badge>
      ) : null}

      <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>

      {description ? (
        <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}

function CheckItem({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-3 text-sm text-muted-foreground">
      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border border-border-subtle bg-surface">
        <Check className="h-3.5 w-3.5 text-foreground" />
      </span>
      <span className="leading-6">{children}</span>
    </li>
  );
}

function Pill({ children }: { readonly children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-[5px] border border-border-subtle bg-surface-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
      {children}
    </span>
  );
}

function FeatureCard({
  title,
  description,
  icon: Icon,
}: {
  readonly title: string;
  readonly description: string;
  readonly icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Card className="rounded-[5px] border border-border-subtle bg-surface shadow-soft">
      <CardHeader className="space-y-4">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-[5px] border border-border-subtle bg-surface-muted">
          <Icon className="h-5 w-5 text-muted-foreground" />
        </div>

        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-sm leading-7 text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

function StatusBadge({
  status,
}: {
  readonly status: TemplateStatus;
}) {
  return (
    <Badge
      variant={status === 'Available' ? 'secondary' : 'outline'}
      className="rounded-[5px] text-[11px]"
    >
      {status}
    </Badge>
  );
}

function TemplateCard({ template }: { readonly template: Template }) {
  return (
    <Card className="group overflow-hidden rounded-[5px] border border-border-subtle bg-surface shadow-soft transition-all hover:border-border hover:bg-surface-elevated">
      <CardContent className="p-6 sm:p-7">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={template.status} />
              <Badge
                variant="outline"
                className="rounded-[5px] text-[11px]"
              >
                {template.priceLabel}
              </Badge>
              <Badge
                variant="outline"
                className="rounded-[5px] border-success-border-subtle bg-success-muted text-[11px]"
              >
                Instant access
              </Badge>
            </div>

            <div>
              <h3 className="text-2xl font-semibold tracking-tight">
                {template.name}
              </h3>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
                {template.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {template.tags.map((tag) => (
                <Pill key={tag}>{tag}</Pill>
              ))}
            </div>

            <ul className="grid gap-3 sm:grid-cols-3">
              {template.includes.map((item) => (
                <CheckItem key={item}>{item}</CheckItem>
              ))}
            </ul>

            <p className="text-xs leading-6 text-muted-foreground">
              <span className="font-medium text-foreground">
                Delivery:
              </span>{' '}
              {template.note}
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 lg:w-60">
            {template.buyHref ? (
              <Button
                asChild
                size="lg"
                className="h-11 rounded-[5px] px-6"
              >
                <Link href={template.buyHref}>
                  Buy now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            ) : null}

            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-11 rounded-[5px] px-6"
            >
              <Link href={template.href}>View details</Link>
            </Button>

            {template.demoUrl ? (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-11 rounded-[5px] px-6"
              >
                <a
                  href={template.demoUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Live demo
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function TemplatesPage() {
  return (
    <main className="bg-background text-foreground">
      <Container className="py-18">
        <div className="mx-auto max-w-6xl">
          <PageHero
            maxWidth="5xl"
            badges={[
              {
                label: 'Templates',
                variant: 'secondary',
              },
              {
                label: 'Premium Next.js products',
                variant: 'outline',
                icon: (
                  <LayoutTemplate
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  />
                ),
              },
              {
                label: 'Instant delivery',
                variant: 'outline',
              },
            ]}
            title="Launch polished SaaS pages without starting from a blank canvas."
            subtitle="Premium templates for AI, SaaS, and developer products."
            description="PyColors templates give you complete, commercial-ready source code with clean structure, modern UI, SEO foundations, and a direct upgrade path into the PyColors ecosystem."
            actions={
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                <Button
                  asChild
                  size="lg"
                  className="h-11 rounded-[5px] px-6"
                >
                  <Link href="/templates/na-ai-landing">
                    Explore NA-AI Landing
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-11 rounded-[5px] px-6"
                >
                  <Link href="/starters/pro">See Starter Pro</Link>
                </Button>
              </div>
            }
            pills={[
              'One-time payment',
              'Commercial usage',
              'Full source code',
              'SEO-ready baseline',
              'Built for real launches',
            ]}
          />
        </div>
      </Container>
      <section className="border-t border-border-subtle">
        <Container className="py-16 lg:py-20">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Why templates"
              title="Focused products for faster launches."
              description="Templates are the fastest entry point into the PyColors ecosystem: smaller than Starter Pro, more complete than a component block, and designed for builders who need a polished page today."
            />

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {principles.map((item) => (
                <FeatureCard key={item.title} {...item} />
              ))}
            </div>
          </div>
        </Container>
      </section>
      <section
        id="templates"
        className="border-t border-border-subtle"
      >
        <Container className="py-16 lg:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                align="left"
                eyebrow="Available now"
                title="Premium templates"
                description="Start with a commercial-ready page, then customize the product story, visuals, and sections for your own launch."
              />

              <div className="text-sm text-muted-foreground">
                {templates.length} template
                {templates.length === 1 ? '' : 's'}
              </div>
            </div>

            <div className="mt-10 grid gap-4">
              {templates.map((template) => (
                <TemplateCard
                  key={template.name}
                  template={template}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>
      <section className="border-t border-border-subtle">
        <Container className="py-16 lg:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
              <SectionHeading
                align="left"
                eyebrow="What you get"
                title="A practical template package, not just a visual mockup."
                description="Every template should reduce real launch friction: page structure, UI polish, responsive sections, SEO foundations, license clarity, and source code you can own."
              />

              <div className="grid gap-4 sm:grid-cols-2">
                {valueItems.map((item) => (
                  <FeatureCard key={item.title} {...item} />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
      <section className="border-t border-border-subtle">
        <Container className="py-16 lg:py-20">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Trust"
              title="Sold directly by PyColors."
              description="The goal is to keep discovery, checkout, delivery, updates, and support inside the PyColors experience — without sending buyers to an external marketplace."
            />

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {trustItems.map((item) => (
                <FeatureCard key={item.title} {...item} />
              ))}
            </div>

            <Card className="mt-6 rounded-[5px] border border-border-subtle bg-surface shadow-soft">
              <CardContent className="p-6 sm:p-7">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div className="max-w-3xl">
                    <p className="text-sm font-medium text-foreground">
                      Templates are one layer of the PyColors product
                      ladder.
                    </p>

                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      Buy a focused landing page when you need speed.
                      Choose Starter Pro when you need the full SaaS
                      foundation with authentication, billing,
                      protected routes, and production wiring.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button
                      asChild
                      variant="outline"
                      className="h-10 rounded-[5px]"
                    >
                      <Link href="/starters/pro">
                        View Starter Pro
                      </Link>
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      className="h-10 rounded-[5px]"
                    >
                      <Link href="/pricing">View pricing</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      <section className="border-t border-border-subtle">
        <Container className="py-16 lg:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <SectionHeading
                align="left"
                eyebrow="Ecosystem"
                title="Choose the right PyColors product for your stage."
                description="Start with focused templates, validate UX with Starter Free, then move to Starter Pro when the business layer becomes the bottleneck."
              />

              <div className="space-y-4">
                {ecosystemRows.map((row) => (
                  <Card
                    key={row.product}
                    className="group rounded-[5px] border border-border-subtle bg-surface shadow-soft transition-all hover:border-border hover:bg-surface-elevated"
                  >
                    <CardContent className="p-5 sm:p-6">
                      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                        <div className="space-y-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <div className="text-base font-medium tracking-tight">
                              {row.product}
                            </div>

                            {row.product === 'Starter Pro' ? (
                              <Badge
                                variant="outline"
                                className="rounded-[5px] border-pro-border bg-pro-surface-muted text-[11px]"
                              >
                                Production-ready
                              </Badge>
                            ) : null}

                            {row.product === 'Templates' ? (
                              <Badge
                                variant="outline"
                                className="rounded-[5px] border-platform-border-subtle bg-platform-muted text-[11px]"
                              >
                                Fast launch
                              </Badge>
                            ) : null}

                            {row.product === 'Starter Free' ? (
                              <Badge
                                variant="outline"
                                className="rounded-[5px] text-[11px]"
                              >
                                Free
                              </Badge>
                            ) : null}

                            {row.product === 'PyColors UI' ? (
                              <Badge
                                variant="outline"
                                className="rounded-[5px] text-[11px]"
                              >
                                Open source
                              </Badge>
                            ) : null}
                          </div>

                          <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
                            {row.bestFor}
                          </p>
                        </div>

                        <div className="flex shrink-0">
                          <Button
                            asChild
                            size="sm"
                            variant="outline"
                            className="rounded-[5px]"
                          >
                            <Link href={row.href}>
                              {row.label}
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>
      <section>
        <Container className="py-16 lg:py-24">
          <div className="mx-auto max-w-6xl rounded-[5px] border border-pro-border bg-pro-surface px-6 py-10 shadow-medium sm:px-10 sm:py-14">
            <div className="mx-auto max-w-3xl text-center">
              <Badge
                variant="outline"
                className="rounded-[5px] border-pro-border bg-pro-surface-muted px-3 py-1 text-[11px] uppercase tracking-[0.18em]"
              >
                Build faster
              </Badge>

              <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Start with a polished template. Upgrade when the
                business layer becomes the bottleneck.
              </h2>

              <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                Use PyColors templates to ship focused pages fast.
                Move to Starter Pro when authentication, billing,
                protected routes, and production SaaS architecture
                should already be handled.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <Pill>Templates from 49 €</Pill>
                <Pill>Starter Pro from 199 €</Pill>
                <Pill>Instant access</Pill>
                <Pill>Commercial usage</Pill>
              </div>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="h-11 rounded-[5px] px-6"
                >
                  <Link href="/templates/na-ai-landing">
                    Explore NA-AI Landing
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-11 rounded-[5px] px-6"
                >
                  <Link href="/starters/pro">See Starter Pro</Link>
                </Button>
              </div>
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Legal scope and usage terms are governed by{' '}
            <Link
              href="/license"
              className="underline underline-offset-4"
            >
              /license
            </Link>{' '}
            and{' '}
            <Link
              href="/terms"
              className="underline underline-offset-4"
            >
              /terms
            </Link>
            .
          </p>
        </Container>
      </section>
    </main>
  );
}
