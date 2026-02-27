import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Scale,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

import { Container } from '@/components/container';
import { Badge, Button, Card } from '@pycolors/ui';

export const metadata: Metadata = {
  title: 'Terms',
  description:
    'Terms of Service for PyColors. Understand the rules for using the website and purchasing digital products.',
  alternates: { canonical: '/terms' },
  openGraph: {
    title: 'Terms · PyColors',
    description:
      'Terms of Service for PyColors. Digital products, licenses, and usage rules.',
    url: '/terms',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms · PyColors',
    description:
      'Terms of Service for PyColors. Digital products, licenses, and usage rules.',
    images: ['/seo/twitter-main.png'],
  },
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="p-6 sm:p-7">
      <h2 className="font-brand text-lg font-semibold tracking-tight">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-sm text-muted-foreground leading-relaxed">
        {children}
      </div>
    </Card>
  );
}

export default function TermsPage() {
  const LAST_UPDATED = 'February 27, 2026';

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <main className="flex-1 bg-background text-foreground">
        <Container className="py-20 sm:py-20 lg:py-24">
          <header className="mx-auto w-full max-w-4xl text-center">
            <div className="flex justify-center">
              <Badge variant="secondary" className="gap-2">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-muted-foreground/60" />
                Terms & usage
              </Badge>
            </div>

            <h1 className="font-brand mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Terms of Service
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-balance text-sm text-muted-foreground sm:text-base">
              These Terms govern the use of the PyColors website and
              the purchase and use of PyColors digital products
              (templates, starters, and related assets).
            </p>

            <p className="mt-3 text-xs text-muted-foreground">
              Last updated: {LAST_UPDATED}
            </p>
          </header>

          <section className="mx-auto mt-10 w-full max-w-5xl">
            <div className="grid gap-4 sm:grid-cols-3">
              <Card className="p-5">
                <div className="inline-flex items-center gap-2 text-sm font-medium">
                  <Scale className="h-4 w-4" aria-hidden="true" />
                  Clarity
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Simple rules you can rely on.
                </p>
              </Card>
              <Card className="p-5">
                <div className="inline-flex items-center gap-2 text-sm font-medium">
                  <ShieldCheck
                    className="h-4 w-4"
                    aria-hidden="true"
                  />
                  Trust
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Clear boundaries for purchases and usage.
                </p>
              </Card>
              <Card className="p-5">
                <div className="inline-flex items-center gap-2 text-sm font-medium">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  Docs-first
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Every shipped asset aims to be production-ready.
                </p>
              </Card>
            </div>
          </section>

          <section className="mx-auto mt-10 w-full max-w-5xl space-y-4">
            <Section title="1. About PyColors">
              <p>
                PyColors provides a public website, documentation, and
                digital products (including premium templates sold via
                third-party platforms such as Gumroad).
              </p>
              <p>
                By accessing the website or purchasing a product, you
                agree to these Terms.
              </p>
            </Section>

            <Section title="2. Website usage">
              <p>
                You may browse and use the website for personal or
                professional evaluation. You must not misuse the
                website, attempt to disrupt it, or access it using
                automated means in a way that harms availability.
              </p>
            </Section>

            <Section title="3. Digital products (templates, starters, assets)">
              <p>
                When you purchase a PyColors digital product, you
                receive access to source code and assets under the
                applicable license terms shown on the product page and
                on the{' '}
                <Link
                  className="underline underline-offset-4 hover:text-foreground"
                  href="/license"
                >
                  License
                </Link>{' '}
                page.
              </p>
              <p>
                Digital products are delivered electronically and
                require basic technical knowledge to use. Unless
                explicitly stated, products are frontend-only and do
                not include backend services, hosting, or third-party
                subscriptions.
              </p>
            </Section>

            <Section title="4. License & restrictions">
              <p>The license defines what you can do. In general:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Using the product for personal and commercial
                  projects is typically allowed.
                </li>
                <li>Client work is typically allowed.</li>
                <li>
                  Reselling, redistributing, or sharing the source
                  code is not allowed.
                </li>
              </ul>
              <p>
                For the authoritative rules, refer to the{' '}
                <Link
                  className="underline underline-offset-4 hover:text-foreground"
                  href="/license"
                >
                  License page
                </Link>{' '}
                and the product checkout/license terms.
              </p>
            </Section>

            <Section title="5. Payments, delivery, refunds">
              <p>
                Payments for premium products are handled by the
                platform indicated on the product page (e.g.,
                Gumroad). Delivery happens immediately or shortly
                after purchase via download access.
              </p>
              <p>
                Because digital products are delivered instantly,
                refunds may be limited. If a refund policy is stated
                on the checkout platform, that policy applies.
              </p>
            </Section>

            <Section title="6. Support">
              <p>
                Unless explicitly included, support is best-effort and
                provided via public channels (documentation, GitHub
                issues for open-source repositories).
              </p>
              <p>
                Paid support, priority assistance, or higher-touch
                help may be introduced under commercial terms.
              </p>
            </Section>

            <Section title="7. Disclaimer">
              <p>
                PyColors products are provided “as is”. While quality
                is a goal, you are responsible for reviewing and
                validating the code for your use case, security, and
                compliance requirements.
              </p>
            </Section>

            <Section title="8. Changes">
              <p>
                These Terms may be updated over time. The “Last
                updated” date will reflect the latest version.
              </p>
            </Section>

            <Card className="p-6 sm:p-7">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-muted-foreground">
                  Want to understand data handling?
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button asChild variant="outline">
                    <Link href="/privacy">
                      Privacy policy
                      <ArrowRight
                        className="ml-2 h-4 w-4"
                        aria-hidden="true"
                      />
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link href="/license">
                      License
                      <ArrowRight
                        className="ml-2 h-4 w-4"
                        aria-hidden="true"
                      />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </section>
        </Container>
      </main>
    </div>
  );
}
