import type { ComponentType, ReactNode } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Code2,
  ExternalLink,
  FileArchive,
  FileText,
  Gauge,
  Image as ImageIcon,
  Lock,
  Package,
  RefreshCcw,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
  Boxes,
  Check,
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
import { PRODUCT_DISPLAY } from '@/lib/products/public-catalog';

import { Container } from '@/components/container';
import { Breadcrumb } from '@/components/seo/breadcrumb';
import { PageHero } from '@/components/marketing/page-hero';
import { BuyProductButton } from '@/components/pricing/buy-product-button';
import {
  JsonLd,
  generateProductOfferJsonLd,
} from '@/components/seo/json-ld';
import { TemplateStickyCta } from '@/components/templates/template-sticky-cta';

export const metadata: Metadata = {
  title: 'AI SaaS Landing Page Template for Next.js',
  description:
    'Premium AI SaaS landing page template built with Next.js, Tailwind CSS, shadcn/ui, charts, pricing sections, FAQ, dark mode, SEO foundations, and commercial-ready source code.',
  alternates: {
    canonical: '/templates/na-ai-landing',
  },

  openGraph: {
    title: 'AI SaaS Landing Page Template for Next.js',
    description:
      'Launch a polished AI or SaaS landing page faster with modern Next.js architecture, production-ready UI, SEO foundations, and commercial-ready source code.',
    url: '/templates/na-ai-landing',
    siteName: 'PyColors',
    type: 'website',
    images: ['/seo/og-main.png'],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'AI SaaS Landing Page Template for Next.js',
    description:
      'Premium AI and SaaS landing page template built for modern product launches.',
    images: ['/seo/twitter-main.png'],
  },
};

const PRODUCT = {
  slug: 'na-ai-landing',
  name: 'NA-AI Landing',
  price: PRODUCT_DISPLAY['na-ai-landing'].priceLabel,
  regularPrice: PRODUCT_DISPLAY['na-ai-landing'].regularPriceLabel,
  demoUrl: 'https://na-ai.pycolors.io',
} as const;

const naAiLandingJsonLd = generateProductOfferJsonLd({
  product: PRODUCT_DISPLAY['na-ai-landing'],
  canonicalPath: '/templates/na-ai-landing',
  description:
    'Premium AI and SaaS landing page template built for modern Next.js product launches.',
});

const SCREENSHOTS = [
  {
    src: '/templates/na-ai/na-ai-analytics-workspace-dark.webp',
    alt: 'NA-AI Landing template full page preview in dark mode',
    label: 'Dark mode',
  },
  {
    src: '/templates/na-ai/na-ai-analytics-workspace-light.webp',
    alt: 'NA-AI Landing template full page preview in light mode',
    label: 'Light mode',
  },
] as const;

const highlights = [
  {
    title: 'Built for AI/SaaS launches',
    description:
      'A focused landing page for AI tools, analytics products, SaaS platforms, and early product validation.',
    icon: Rocket,
  },
  {
    title: 'Commercial-ready source code',
    description:
      'Get the full template source code, adapt the copy, customize the UI, and deploy it for your own product.',
    icon: Package,
  },
  {
    title: 'Designed to convert',
    description:
      'Hero, features, integrations, testimonials, pricing, FAQ, and trust sections are already structured.',
    icon: Gauge,
  },
  {
    title: 'SEO and launch baseline',
    description:
      'Includes metadata, responsive structure, dark/light mode, and clean content architecture for launch.',
    icon: FileText,
  },
] as const;

const included = [
  'Complete Next.js App Router project structure',
  'TypeScript setup',
  'Tailwind CSS v4 styling',
  'shadcn/ui + Radix UI primitives',
  'Framer Motion animations',
  'Data-driven architecture with TypeScript config files',
  'Dark and light mode',
  'Hero, feature sections, integrations, testimonials, and FAQ',
  'AI-native, security, and revenue insight sections',
  'Pricing section with monthly/yearly toggle',
  'Pricing comparison table',
  'Analytics-style sections with charts',
  'Frontend contact/sales form structure',
  'SEO baseline with Open Graph, sitemap, and robots',
  'Responsive marketing layout',
  'Setup documentation included',
  'Commercial usage for personal and client projects',
] as const;

const notIncluded = [
  'Authentication',
  'Database',
  'Backend API',
  'Stripe billing',
  'Email delivery',
  'User dashboard',
] as const;

const stack = [
  'Next.js 16+ App Router',
  'React',
  'TypeScript',
  'Tailwind CSS v4',
  'shadcn/ui',
  'Radix UI',
  'Framer Motion',
  'Recharts',
  'Lucide Icons',
] as const;

const useCases = [
  {
    title: 'AI product launch',
    description:
      'Present an AI assistant, analytics layer, automation platform, or workflow product with a polished SaaS page.',
    icon: Sparkles,
  },
  {
    title: 'Indie SaaS validation',
    description:
      'Ship the marketing surface first, validate interest, collect leads, then build the product behind it.',
    icon: Users,
  },
  {
    title: 'Client landing pages',
    description:
      'Use it as a repeatable baseline for agencies or freelance work without rebuilding common sections.',
    icon: Boxes,
  },
] as const;

const delivery = [
  'Instant access after purchase',
  'ZIP delivery with full source code',
  'Setup instructions included',
  'Ready to deploy on Vercel or similar platforms',
] as const;

const license = [
  'Commercial usage included',
  'Use for personal projects and client work',
  'No reselling, redistribution, or source sharing',
] as const;

const faqs = [
  {
    question: 'Is NA-AI Landing a full SaaS app?',
    answer:
      'No. NA-AI Landing is a frontend marketing template. It is designed for landing pages, product validation, and commercial presentation — not authentication, billing, or backend logic.',
  },
  {
    question: 'Can I use it for client work?',
    answer:
      'Yes. Commercial usage is included for personal and client projects, as long as you do not resell or redistribute the template source code itself.',
  },
  // {
  //   question: 'Is the template connected to PyColors UI?',
  //   answer:
  //     'The template follows the PyColors product direction and will progressively align with PyColors UI components and tokens as the ecosystem evolves.',
  // },
  {
    question:
      'What should I choose between this template and Starter Pro?',
    answer:
      'Choose NA-AI Landing when you need a polished marketing page. Choose Starter Pro when you need real authentication, Stripe billing, protected routes, database foundations, and SaaS app wiring.',
  },
  {
    question: 'What do I receive after purchase?',
    answer:
      'You receive a ZIP package containing the full source code and setup documentation, ready to run locally and deploy on Vercel or a similar platform.',
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

function CheckItem({ children }: { readonly children: ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-sm text-muted-foreground">
      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border border-border-subtle bg-surface">
        <Check className="h-3.5 w-3.5 text-foreground" />
      </span>
      <span className="leading-6">{children}</span>
    </li>
  );
}

function Pill({ children }: { readonly children: ReactNode }) {
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
  readonly icon: ComponentType<{ className?: string }>;
}) {
  return (
    <Card className="rounded-[5px] border border-border-subtle bg-surface shadow-soft transition-colors hover:border-border hover:bg-surface-elevated">
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

function ScreenshotGrid() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {SCREENSHOTS.map((screenshot) => (
        <Card
          key={screenshot.src}
          className="group overflow-hidden rounded-[5px] border border-border-subtle bg-surface shadow-soft transition-colors hover:border-border"
        >
          <div className="border-b border-border-subtle bg-surface-muted px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-medium">
                  {screenshot.label}
                </span>
              </div>

              <span className="text-[11px] text-muted-foreground">
                Full layout preview
              </span>
            </div>
          </div>

          <div className="relative overflow-hidden bg-background">
            <Image
              src={screenshot.src}
              alt={screenshot.alt}
              width={1400}
              height={900}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.012]"
            />
          </div>
        </Card>
      ))}
    </div>
  );
}

export default function NaAiTemplatePage() {
  return (
    <main className="bg-background pb-24 text-foreground">
      <JsonLd id="na-ai-landing-product-jsonld" data={naAiLandingJsonLd} />
      <Container className="py-18">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Templates', href: '/templates' },
                {
                  label: 'NA-AI Landing',
                  href: '/templates/na-ai-landing',
                },
              ]}
            />
          </div>

          <PageHero
            maxWidth="5xl"
            badges={[
              {
                label: 'NA-AI Landing',
                variant: 'secondary',
              },
              {
                label: `${PRODUCT.price} launch price`,
                variant: 'outline',
                icon: <Sparkles className="h-3.5 w-3.5" />,
              },
              {
                label: `${PRODUCT.regularPrice} regular price`,
                variant: 'outline',
              },
            ]}
            title="Launch a premium AI landing page faster."
            subtitle="A Next.js template built for AI, analytics, and SaaS products."
            description="NA-AI Landing helps you launch a premium AI or SaaS landing page in hours — with production-ready Next.js code, clean architecture, scalable content structure, polished UI, dark mode, SEO foundations, and commercial usage included."
            actions={
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                <BuyProductButton
                  productSlug={PRODUCT.slug}
                  label={`Buy NA-AI Landing — ${PRODUCT.price}`}
                  fullWidth={false}
                />

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-11 rounded-[5px] px-6"
                >
                  <Link
                    href={PRODUCT.demoUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Live demo
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            }
            pills={[
              'Next.js App Router',
              'Tailwind CSS v4',
              'Dark/light mode',
              'Full source code',
              'Instant access',
              'Commercial usage',
            ]}
            extraClassName="mx-auto max-w-6xl"
            extra={
              <Link
                href={PRODUCT.demoUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="group block"
                aria-label="Open NA-AI Landing live demo"
              >
                <div className="mx-auto mt-12 max-w-6xl overflow-hidden rounded-[5px] border border-border-subtle bg-surface shadow-medium transition-all duration-500 hover:border-border hover:shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
                  <div className="border-b border-border-subtle bg-surface-muted px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                      </div>

                      <span className="rounded-[5px] border border-border-subtle px-3 py-1 text-[11px] text-muted-foreground transition-colors group-hover:border-border group-hover:text-foreground">
                        Open live demo
                      </span>
                    </div>
                  </div>

                  <div className="relative aspect-video overflow-hidden bg-background">
                    <Image
                      src="/templates/na-ai/na-ai-analytics-workspace-dark.webp"
                      alt="NA-AI Landing template hero preview"
                      fill
                      priority
                      sizes="(min-width: 1024px) 960px, 100vw"
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.012]"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.16),transparent_35%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background/70 to-transparent" />
                  </div>
                </div>
              </Link>
            }
          />
        </div>
      </Container>

      <section className="border-t border-border-subtle">
        <Container className="py-16 lg:py-20">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Why it exists"
              title="Most builders lose time polishing the page before testing the offer."
              description="NA-AI Landing gives you the commercial surface first: a serious AI/SaaS landing page with sections, hierarchy, pricing, trust, and responsive UI already shaped."
            />

            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {highlights.map((highlight) => (
                <FeatureCard key={highlight.title} {...highlight} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-border-subtle">
        <Container className="py-16 lg:py-20">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Preview"
              title="A polished full-page landing experience."
              description="Use the template as a strong baseline, then adapt the product story, screenshots, colors, sections, and offer for your own AI or SaaS product."
            />

            <div className="mt-12">
              <ScreenshotGrid />
            </div>
          </div>
        </Container>
      </section>
      <section className="border-t border-border-subtle">
        <Container className="py-14 lg:py-16">
          <div className="mx-auto max-w-6xl">
            <Card className="rounded-[5px] border border-border-subtle bg-surface shadow-soft">
              <CardContent className="p-6 sm:p-7">
                <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        variant="outline"
                        className="rounded-[5px] border-platform-border-subtle bg-platform-muted text-[11px]"
                      >
                        Built with PyColors UI
                      </Badge>

                      <span className="text-[11px] text-muted-foreground">
                        @pycolors/ui
                      </span>
                    </div>

                    <div className="space-y-3">
                      <h2 className="text-balance text-2xl font-semibold tracking-tight">
                        Consistent product foundations from the start.
                      </h2>

                      <p className="text-sm leading-7 text-muted-foreground">
                        NA-AI Landing uses the same design tokens,
                        components, spacing system, and UI conventions
                        used across the PyColors ecosystem.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between gap-6">
                    <p className="text-sm leading-7 text-muted-foreground">
                      The template is designed to feel
                      production-ready from day one, with reusable
                      SaaS-oriented patterns instead of isolated
                      marketing sections.
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {[
                        'Semantic tokens',
                        'Tailwind v4',
                        'Accessible primitives',
                        'Production-ready patterns',
                      ].map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center rounded-[5px] border border-border-subtle bg-surface-muted px-2.5 py-1 text-[11px] text-muted-foreground"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 border-t border-border-subtle pt-5">
                      <Link
                        href="/ui"
                        className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
                      >
                        Explore PyColors UI
                        <ArrowRight className="h-4 w-4" />
                      </Link>

                      <a
                        href="https://github.com/pycolors-io/pycolors-ui"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        GitHub
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      <section className="border-t border-border-subtle">
        <Container className="py-16 lg:py-20">
          <div className="mx-auto max-w-5xl">
            <SectionHeading
              eyebrow="What is included"
              title="Everything you need to launch the marketing layer."
              description="NA-AI Landing is a polished frontend package for launching, validating, and presenting your AI or SaaS product without rebuilding the landing page foundation."
            />

            <Card className="mt-12 overflow-hidden rounded-[5px] border border-border-subtle bg-surface shadow-medium">
              <div className="border-b border-border-subtle bg-surface-muted px-5 py-4 sm:px-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Template package
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Full source code · Commercial usage · Instant
                      access
                    </p>
                  </div>

                  <Badge
                    variant="outline"
                    className="rounded-[5px] border-success-border-subtle bg-success-muted text-[11px]"
                  >
                    Included after purchase
                  </Badge>
                </div>
              </div>

              <CardContent className="p-0">
                <div className="grid divide-y divide-border-subtle">
                  {included.map((item) => (
                    <div
                      key={item}
                      className="group flex items-start justify-between gap-4 px-5 py-4 transition-colors hover:bg-surface-muted/60 sm:px-6"
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border border-border-subtle bg-background transition-colors group-hover:border-success-border-subtle group-hover:bg-success-muted">
                          <Check className="h-3.5 w-3.5 text-foreground" />
                        </span>

                        <span className="text-sm leading-6 text-muted-foreground group-hover:text-foreground">
                          {item}
                        </span>
                      </div>

                      <Badge
                        variant="outline"
                        className="hidden shrink-0 rounded-[5px] text-[11px] sm:inline-flex"
                      >
                        Included
                      </Badge>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border-subtle bg-pro-surface px-5 py-5 sm:px-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Need the full SaaS foundation?
                      </p>
                      <p className="mt-1 text-xs leading-6 text-muted-foreground">
                        NA-AI Landing handles the marketing page.
                        Starter Pro adds auth, billing, protected
                        routes, and database foundations.
                      </p>
                    </div>

                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="shrink-0 rounded-[5px]"
                    >
                      <Link href="/starters/pro">
                        See Starter Pro
                        <ArrowRight className="h-4 w-4" />
                      </Link>
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
            <div className="grid gap-4 lg:grid-cols-2">
              <Card className="rounded-[5px] border border-border-subtle bg-surface shadow-soft">
                <CardContent className="p-6 sm:p-7">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-[5px] border border-border-subtle bg-surface-muted">
                    <Code2 className="h-5 w-5 text-muted-foreground" />
                  </div>

                  <h2 className="mt-5 text-2xl font-semibold tracking-tight">
                    Modern frontend stack
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    Built with familiar tools for modern SaaS landing
                    pages and fast customization.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {stack.map((item) => (
                      <Pill key={item}>{item}</Pill>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-[5px] border border-border-subtle bg-surface shadow-soft">
                <CardContent className="p-6 sm:p-7">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-[5px] border border-border-subtle bg-surface-muted">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>

                  <h2 className="mt-5 text-2xl font-semibold tracking-tight">
                    Frontend-only by design
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    This template is focused on the marketing page.
                    For auth, billing, protected routes, and database
                    foundations, use Starter Pro.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {notIncluded.map((item) => (
                      <Pill key={item}>{item}</Pill>
                    ))}
                  </div>

                  <div className="mt-6">
                    <Button
                      asChild
                      variant="outline"
                      className="rounded-[5px]"
                    >
                      <Link href="/starters/pro">
                        See Starter Pro
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-border-subtle">
        <Container className="py-16 lg:py-20">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              eyebrow="Use cases"
              title="Built for builders who need the page before the platform."
              description="Use NA-AI Landing when your priority is to present, test, and sell the product story quickly."
            />

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {useCases.map((item) => (
                <FeatureCard key={item.title} {...item} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-border-subtle">
        <Container className="py-14 lg:py-16">
          <div className="mx-auto max-w-6xl">
            <Card className="overflow-hidden rounded-[5px] border border-border-subtle bg-surface shadow-medium">
              <div className="border-b border-border-subtle bg-surface-muted px-5 py-4 sm:px-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      After purchase
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Instant delivery, clear scope, and progressive
                      updates.
                    </p>
                  </div>

                  <Badge
                    variant="outline"
                    className="rounded-[5px] border-success-border-subtle bg-success-muted text-[11px]"
                  >
                    Direct PyColors delivery
                  </Badge>
                </div>
              </div>

              <CardContent className="p-0">
                <div className="grid divide-y divide-border-subtle lg:grid-cols-3 lg:divide-x lg:divide-y-0">
                  {[
                    {
                      icon: FileArchive,
                      title: 'Instant access',
                      description:
                        'Receive the full source code package after checkout.',
                    },
                    {
                      icon: Code2,
                      title: 'Setup included',
                      description:
                        'Project structure and setup instructions are included.',
                    },
                    {
                      icon: RefreshCcw,
                      title: 'Maintained',
                      description:
                        'The template improves progressively with PyColors.',
                    },
                  ].map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.title}
                        className="group p-5 transition-colors hover:bg-surface-muted/60 sm:p-6"
                      >
                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-[5px] border border-border-subtle bg-background transition-colors group-hover:border-border">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                        </div>

                        <p className="mt-4 text-sm font-medium text-foreground">
                          {item.title}
                        </p>

                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-border-subtle bg-surface-muted/50 px-5 py-4 sm:px-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs leading-6 text-muted-foreground">
                      Built as a focused frontend template. Follow
                      future improvements through the roadmap and
                      changelog.
                    </p>

                    <div className="flex gap-2">
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="rounded-[5px]"
                      >
                        <Link href="/roadmap">Roadmap</Link>
                      </Button>

                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="rounded-[5px]"
                      >
                        <Link href="/changelog">Changelog</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      <section className="border-t border-border-subtle">
        <Container className="py-12 lg:py-14">
          <div className="mx-auto max-w-6xl">
            <Card className="rounded-[5px] border border-border-subtle bg-surface shadow-soft">
              <CardContent className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                  <div className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
                    <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                    Commercial usage included
                  </div>

                  <span className="hidden text-border-subtle sm:inline">
                    —
                  </span>

                  <p className="text-sm text-muted-foreground">
                    Use in personal and client projects.
                  </p>

                  <span className="hidden text-border-subtle sm:inline">
                    —
                  </span>

                  <p className="text-sm text-muted-foreground">
                    No redistribution.
                  </p>
                </div>

                <Link
                  href="/license"
                  className="text-sm font-medium text-foreground transition-colors hover:text-primary"
                >
                  License details
                </Link>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      <section className="border-t border-border-subtle">
        <Container className="py-16 lg:py-20">
          <div className="mx-auto max-w-5xl">
            <SectionHeading
              eyebrow="FAQ"
              title="Questions before buying"
              description="Make the scope clear before purchase."
            />

            <div className="mt-12 grid gap-4 lg:grid-cols-2">
              {faqs.map((faq) => (
                <Card
                  key={faq.question}
                  className="rounded-[5px] border border-border-subtle bg-surface shadow-soft"
                >
                  <CardContent className="p-6">
                    <h3 className="text-base font-medium">
                      {faq.question}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
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
                Final decision
              </Badge>

              <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Start from a premium AI landing page. Spend your time
                on the offer.
              </h2>

              <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                Buy NA-AI Landing when you need a polished,
                commercial-ready marketing page for your AI or SaaS
                product.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <Pill>Launch price {PRODUCT.price}</Pill>
                <Pill>One-time payment</Pill>
                <Pill>Instant access</Pill>
                <Pill>Commercial usage</Pill>
              </div>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <BuyProductButton
                  productSlug={PRODUCT.slug}
                  label={`Buy NA-AI Landing — ${PRODUCT.price}`}
                  fullWidth={false}
                />

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-11 rounded-[5px] px-6"
                >
                  <Link
                    href={PRODUCT.demoUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Live demo
                    <ExternalLink className="h-4 w-4" />
                  </Link>
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

      <TemplateStickyCta
        productSlug={PRODUCT.slug}
        name={PRODUCT.name}
        price={PRODUCT.price}
        demoUrl={PRODUCT.demoUrl}
      />
    </main>
  );
}
