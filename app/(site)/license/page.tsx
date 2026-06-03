import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight,
  FileText,
  Lock,
  Scale,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

import { Container } from '@/components/container';
import { Badge, Button, Card, CardContent } from '@pycolors/ui';
import { Breadcrumb } from '@/components/seo/breadcrumb';

export const metadata: Metadata = {
  title: 'Commercial License for SaaS Templates & Starters',
  description:
    'Understand the commercial licensing terms for PyColors templates, Starter Free, Starter Pro, UI systems, open-source repositories, and production-ready SaaS products.',
  alternates: {
    canonical: '/license',
  },

  openGraph: {
    title: 'Commercial License for SaaS Templates & Starters',
    description:
      'Learn how PyColors products can be used across open-source repositories, premium templates, Starter Free, Starter Pro, commercial SaaS products, and client work.',
    url: '/license',
    siteName: 'PyColors',
    type: 'website',

    images: ['/seo/og-main.png'],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Commercial License for SaaS Templates & Starters',
    description:
      'Commercial licensing for PyColors SaaS templates, starters, UI systems, and production-ready developer products.',
    images: ['/seo/twitter-main.png'],
  },
};

type LicenseSection = {
  readonly title: string;
  readonly description: string;
  readonly items: readonly string[];
};

const COMPANY = {
  name: 'Py Colors SASU',
  email: 'contact@pycolors.com',
};

const LAST_UPDATED = 'May 14, 2026';

const principles = [
  {
    title: 'Clear usage rights',
    description:
      'Each PyColors product category has a defined scope so builders, freelancers, agencies, and teams know what they can use, modify, and ship.',
    icon: Scale,
  },
  {
    title: 'Commercial confidence',
    description:
      'Paid products are designed for real commercial work while protecting the value of PyColors source code, templates, and private product assets.',
    icon: ShieldCheck,
  },
  {
    title: 'Sustainable ecosystem',
    description:
      'Open-source foundations support adoption. Paid products fund maintenance, documentation, product development, and future releases.',
    icon: Sparkles,
  },
] as const;

const sections: LicenseSection[] = [
  {
    title: '1. Open-source packages and public repositories',
    description:
      'PyColors publishes public packages and repositories such as PyColors UI, PyColors Tokens, Starter Free, and other public mirrors.',
    items: [
      'Each public repository is governed by the license file included in that repository.',
      'If a repository includes an MIT license, that license applies only to the code covered by that repository.',
      'Open-source access does not grant rights to paid products, private repositories, premium templates, Starter Pro, private releases, commercial downloads, or future paid offers.',
      'Brand assets, trademarks, product names, logos, domains, and commercial positioning remain the property of Py Colors SASU unless explicitly licensed.',
      'Public mirrors may be read-only and may not represent the full private PyColors monorepo or paid product scope.',
    ],
  },
  {
    title: '2. Starter Free',
    description:
      'Starter Free is a public, free product intended for SaaS UX validation, product exploration, and learning from production-shaped interfaces.',
    items: [
      'Starter Free may be used according to the license included in its public repository.',
      'You may use Starter Free as a starting point for personal projects, internal experiments, and commercial products when the repository license allows it.',
      'Starter Free does not include the private Starter Pro source code, production authentication, Stripe billing, private delivery flows, or paid product assets.',
      'The name PyColors, product branding, logos, and commercial positioning may not be reused in a way that implies official partnership, endorsement, or product origin.',
      'Starter Free may reference upgrade paths to Starter Pro, but those paid foundations are governed by separate commercial terms.',
    ],
  },
  {
    title: '3. Premium templates',
    description:
      'Premium templates, including NA-AI Landing, are commercial digital products sold directly by PyColors.',
    items: [
      'A valid purchase grants a non-exclusive, non-transferable commercial license to use the purchased template for one end product, unless the product page or checkout terms explicitly state otherwise.',
      'Client work is allowed for the licensed project.',
      'You may modify the template source code for your own product or for a permitted client deliverable.',
      'You may not resell, redistribute, sublicense, publish, share, or repackage the source code as a template, starter, boilerplate, UI kit, marketplace asset, or downloadable product.',
      'You may not create a competing commercial template, starter, UI kit, or component product substantially based on the paid template source code.',
      'A template purchase does not include backend implementation, authentication, payments, database logic, CMS integration, or any feature not explicitly listed on the product page.',
    ],
  },
  {
    title: '4. Starter Pro',
    description:
      'Starter Pro is a paid SaaS foundation that includes production-oriented auth, billing, protected app structure, and commercial source code access.',
    items: [
      'A valid Starter Pro purchase grants commercial usage rights for the purchased source code according to the scope shown on the product page, checkout, invoice, or order terms.',
      'You may use Starter Pro to build your own SaaS product or a permitted client project.',
      'You may modify the source code for your own product implementation.',
      'You may not resell, redistribute, sublicense, publish, share, or repackage Starter Pro as a competing starter, SaaS boilerplate, template kit, UI kit, private marketplace asset, or downloadable product.',
      'Starter Pro includes foundations, not a finished SaaS business. Your product logic, market-specific workflows, customer acquisition, compliance choices, and final production decisions remain your responsibility.',
      'Access, updates, support, and delivery rights depend on the commercial offer purchased at the time of checkout.',
    ],
  },
  {
    title: '5. Restrictions across paid products',
    description:
      'These restrictions protect PyColors paid products and keep the ecosystem commercially sustainable.',
    items: [
      'No resale or redistribution of paid source code, ZIP files, private repositories, premium assets, or private release materials.',
      'No sublicensing or white-label resale of the product itself.',
      'No public or private sharing of paid source code outside the authorized project, company, or permitted internal team use.',
      'No creation of competing commercial starters, UI kits, template packs, block libraries, boilerplates, or downloadable derivative products based substantially on PyColors paid products.',
      'No removal of license notices where preservation is required.',
      'No use of PyColors trademarks, names, logos, or product identity in a way that implies official affiliation, partnership, endorsement, or product origin without written permission.',
    ],
  },
  {
    title: '6. Updates, access, and support',
    description:
      'Updates and support vary depending on the product, purchase type, and commercial offer.',
    items: [
      'Open-source repositories may receive public updates without any service-level commitment.',
      'Premium template purchases generally include the product version delivered at purchase time, plus any update rights explicitly described on the product page or checkout page.',
      'Starter Pro may include broader update access, private documentation, or support depending on the purchased offer.',
      'Future updates, premium drops, private releases, or additional products are included only when explicitly stated in the purchased offer.',
      'Unless expressly included, support is provided on a reasonable-effort basis and does not constitute managed services, consulting, implementation, or guaranteed response time.',
    ],
  },
];

function SectionCard({
  section,
}: {
  readonly section: LicenseSection;
}) {
  return (
    <Card className="rounded-[5px] border border-border-subtle bg-surface shadow-soft">
      <CardContent className="p-6 sm:p-7">
        <div className="space-y-2">
          <h2 className="font-brand text-lg font-semibold tracking-tight">
            {section.title}
          </h2>

          <p className="text-sm leading-7 text-muted-foreground">
            {section.description}
          </p>
        </div>

        <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
          {section.items.map((item) => (
            <li key={item} className="flex gap-3">
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                aria-hidden="true"
              />
              <span className="leading-7 text-pretty">{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default function LicensePage() {
  return (
    <Container className="py-18">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'License', href: '/license' },
            ]}
          />
        </div>

        <header className="mx-auto w-full max-w-4xl text-center">
          <div className="flex justify-center">
            <Badge
              variant="secondary"
              className="gap-2 rounded-[5px]"
            >
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              Licensing & commercial use
            </Badge>
          </div>

          <h1 className="font-brand mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            License
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-balance text-sm leading-7 text-muted-foreground sm:text-base">
            This page explains how PyColors products can be used
            across open-source packages, Starter Free, premium
            templates, Starter Pro, and commercial projects.
          </p>

          <p className="mt-3 text-xs text-muted-foreground">
            Last updated: {LAST_UPDATED}
          </p>
        </header>

        <section className="mx-auto mt-10 w-full max-w-6xl">
          <div className="grid gap-4 sm:grid-cols-3">
            {principles.map((principle) => {
              const Icon = principle.icon;

              return (
                <Card
                  key={principle.title}
                  className="rounded-[5px] border border-border-subtle bg-surface shadow-soft"
                >
                  <CardContent className="p-5">
                    <div className="inline-flex items-center gap-2 text-sm font-medium">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-[5px] border border-border-subtle bg-surface-muted text-primary">
                        <Icon
                          className="h-4 w-4"
                          aria-hidden="true"
                        />
                      </span>
                      {principle.title}
                    </div>

                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {principle.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="mx-auto mt-10 w-full max-w-6xl">
          <Card className="rounded-[5px] border border-pro-border-subtle bg-pro-surface shadow-soft">
            <CardContent className="p-6 sm:p-7">
              <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                <div>
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-[5px] border border-pro-border bg-pro-surface-muted">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  </div>

                  <h2 className="mt-5 font-brand text-xl font-semibold tracking-tight">
                    Simple commercial summary
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    Paid PyColors products are built for real
                    projects, but the product source itself cannot be
                    resold, shared, repackaged, or turned into a
                    competing template or starter.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    {
                      title: 'Allowed',
                      items: [
                        'Use in your own commercial product',
                        'Use for permitted client work',
                        'Modify source code for the project',
                        'Deploy the final end product',
                      ],
                    },
                    {
                      title: 'Not allowed',
                      items: [
                        'Resell the source code',
                        'Share paid files publicly',
                        'Create competing templates',
                        'Redistribute as a boilerplate',
                      ],
                    },
                  ].map((group) => (
                    <div
                      key={group.title}
                      className="rounded-[5px] border border-border-subtle bg-surface p-4"
                    >
                      <p className="text-sm font-medium text-foreground">
                        {group.title}
                      </p>

                      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                        {group.items.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span
                              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                              aria-hidden="true"
                            />
                            <span className="leading-6">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mx-auto mt-4 w-full max-w-6xl space-y-4">
          {sections.map((section) => (
            <SectionCard key={section.title} section={section} />
          ))}

          <Card className="rounded-[5px] border border-border-subtle bg-surface shadow-soft">
            <CardContent className="space-y-3 p-6 text-sm leading-7 text-muted-foreground sm:p-7">
              <h2 className="font-brand text-lg font-semibold tracking-tight text-foreground">
                7. License priority
              </h2>

              <p>
                If there is any conflict between this page and a
                license shown in a specific repository, product page,
                checkout page, invoice, order form, or written
                commercial agreement, the more specific terms control
                for that repository, product, or offer.
              </p>

              <p>
                For example, an open-source repository license governs
                that repository, while a paid template or Starter Pro
                purchase is governed by the commercial terms attached
                to that purchase.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-[5px] border border-border-subtle bg-surface shadow-soft">
            <CardContent className="space-y-3 p-6 text-sm leading-7 text-muted-foreground sm:p-7">
              <h2 className="font-brand text-lg font-semibold tracking-tight text-foreground">
                8. No legal advice
              </h2>

              <p>
                This page is provided to explain PyColors commercial
                usage rules. It is not legal advice. For high-value,
                regulated, enterprise, agency, or redistribution
                scenarios, you should review the applicable terms with
                your own legal counsel before launch.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-[5px] border border-border-subtle bg-surface shadow-medium">
            <CardContent className="p-6 sm:p-7">
              <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <div className="space-y-3 text-sm leading-7 text-muted-foreground">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-[5px] border border-border-subtle bg-surface-muted">
                    <FileText
                      className="h-4 w-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                  </div>

                  <h2 className="font-brand text-lg font-semibold tracking-tight text-foreground">
                    9. Contact
                  </h2>

                  <p>
                    Licensing, commercial usage, and product questions
                    can be sent to{' '}
                    <a
                      className="underline underline-offset-4 hover:text-foreground"
                      href={`mailto:${COMPANY.email}`}
                    >
                      {COMPANY.email}
                    </a>
                    {'.'}
                  </p>

                  <p>
                    PyColors licensing is operated by {COMPANY.name}.
                  </p>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row lg:justify-end">
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-[5px]"
                  >
                    <Link href="/terms">
                      Terms
                      <ArrowRight
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="rounded-[5px]"
                  >
                    <Link href="/pricing">
                      Pricing
                      <ArrowRight
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                    </Link>
                  </Button>

                  <Button asChild className="rounded-[5px]">
                    <Link href="/privacy">
                      Privacy
                      <ArrowRight
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <p className="text-center text-xs leading-6 text-muted-foreground">
            Product-specific license files, checkout terms, invoices,
            and written commercial agreements may define additional or
            more specific rights.
          </p>
        </section>
      </div>
    </Container>
  );
}
