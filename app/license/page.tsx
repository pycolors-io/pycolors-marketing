import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Scale,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

import { Container } from '@/components/container';

import { Footer } from '@/components/footer';
import { SiteHeader } from '@/components/layout/site-header';
import { Card, Badge, Button } from '@pycolors/ui';

export const metadata: Metadata = {
  title: 'License',
  description:
    'Licensing information for PyColors. Understand what is free, what is commercial, and how PyColors products can be used in real-world projects.',
  openGraph: {
    title: 'License · PyColors',
    description:
      'Clear licensing rules for PyColors UI and premium templates.',
    url: '/license',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'License · PyColors',
    description:
      'Clear licensing rules for PyColors UI and premium templates.',
    images: ['/seo/twitter-main.png'],
  },
};

type LicenseSection = {
  title: string;
  description: string;
  items: string[];
};

/* -------------------------------------------------------------------------- */
/* PYCOLORS UI — FREE FOUNDATION                                               */
/* -------------------------------------------------------------------------- */

const freeToday: LicenseSection = {
  title: 'PyColors UI — what’s free',
  description:
    'PyColors UI is the public, documentation-first foundation of the ecosystem.',
  items: [
    'Core UI components shipped as part of the free PyColors UI foundation.',
    'Documentation (Preview / Usage / Code / Props).',
    'Examples, patterns, and public pages (Changelog, Roadmap).',
    'Bug fixes and stability patches within the v1.x line.',
  ],
};

const mayBecomeCommercial: LicenseSection = {
  title: 'What may become commercial',
  description:
    'As PyColors evolves into a sustainable ecosystem, some parts may be introduced under a commercial license.',
  items: [
    'Premium UI components and advanced patterns.',
    'Blocks libraries (marketing & SaaS sections).',
    'Premium templates and starter kits.',
    'Commercial packaging and distribution assets.',
    'Priority support and higher-touch assistance.',
  ],
};

/* -------------------------------------------------------------------------- */
/* TEMPLATES — COMMERCIAL LICENSE                                              */
/* -------------------------------------------------------------------------- */

const templatesLicense: LicenseSection = {
  title: 'Templates license (NA-AI)',
  description:
    'Commercial license included with every template purchase. Clear rules, no ambiguity.',
  items: [
    '✔ Use for personal and commercial projects.',
    '✔ Client work is allowed.',
    '✖ Reselling or redistributing the template is not allowed.',
    '✖ Sharing the source code publicly or privately is not permitted.',
  ],
};

const principles = [
  {
    title: 'Clarity over complexity',
    description:
      'Licensing should be readable, explicit, and practical.',
    icon: <Scale className="h-4 w-4" aria-hidden="true" />,
  },
  {
    title: 'Trust & sustainability',
    description:
      'Clear boundaries enable long-term maintenance and consistent releases.',
    icon: <ShieldCheck className="h-4 w-4" aria-hidden="true" />,
  },
  {
    title: 'Docs-first mindset',
    description:
      'Every shipped artifact — free or paid — must be documented and production-ready.',
    icon: <Sparkles className="h-4 w-4" aria-hidden="true" />,
  },
];

function SectionCard({ section }: { section: LicenseSection }) {
  return (
    <Card className="p-6 sm:p-7">
      <div className="space-y-2">
        <h2 className="font-brand text-lg font-semibold tracking-tight">
          {section.title}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {section.description}
        </p>
      </div>

      <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
        {section.items.map((it) => (
          <li key={it} className="flex gap-2">
            <span
              className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/60"
              aria-hidden="true"
            />
            <span className="text-pretty">{it}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default function LicensePage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <SiteHeader />

      <main className="flex-1 bg-background text-foreground">
        <Container className="py-20 sm:py-20 lg:py-24">
          {/* HEADER */}
          <header className="mx-auto w-full max-w-4xl text-center">
            <div className="flex justify-center">
              <Badge variant="secondary" className="gap-2">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-muted-foreground/60" />
                Licensing & usage
              </Badge>
            </div>

            <h1 className="font-brand mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              License
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-balance text-sm text-muted-foreground sm:text-base">
              This page explains how PyColors products can be used
              today — and how licensing is structured across the
              ecosystem.
            </p>
          </header>

          {/* PRINCIPLES */}
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

          {/* PYCOLORS UI */}
          <section className="mx-auto mt-10 w-full max-w-5xl">
            <div className="grid gap-4 sm:grid-cols-2">
              <SectionCard section={freeToday} />
              <SectionCard section={mayBecomeCommercial} />
            </div>
          </section>

          {/* TEMPLATES LICENSE */}
          <section className="mx-auto mt-10 w-full max-w-5xl">
            <SectionCard section={templatesLicense} />
          </section>

          {/* CURRENT STATUS */}
          <section className="mx-auto mt-10 w-full max-w-5xl">
            <Card className="p-6 sm:p-7">
              <div className="space-y-2">
                <div className="text-sm font-medium">
                  Current status
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  PyColors UI (foundation) is currently public and
                  free to explore.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Templates (such as NA-AI) are distributed under a
                  separate commercial license, included with each
                  purchase.
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                <Button asChild variant="outline">
                  <Link href="/changelog">
                    View changelog
                    <ArrowRight
                      className="ml-2 h-4 w-4"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>
                <Button asChild>
                  <a
                    href="https://github.com/pycolors-io/pycolors-ui"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    View repository
                    <ArrowRight
                      className="ml-2 h-4 w-4"
                      aria-hidden="true"
                    />
                  </a>
                </Button>
              </div>
            </Card>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              This page is informational and does not replace the
              license included with paid products.
            </p>
          </section>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
