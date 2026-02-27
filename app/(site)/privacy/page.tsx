import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Scale,
} from 'lucide-react';

import { Container } from '@/components/container';
import { Badge, Button, Card } from '@pycolors/ui';

export const metadata: Metadata = {
  title: 'Privacy',
  description:
    'Privacy Policy for PyColors. Learn what data is collected and how it is used.',
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: 'Privacy · PyColors',
    description:
      'Privacy Policy for PyColors. Learn what data is collected and how it is used.',
    url: '/privacy',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy · PyColors',
    description:
      'Privacy Policy for PyColors. Learn what data is collected and how it is used.',
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

export default function PrivacyPage() {
  const LAST_UPDATED = 'February 27, 2026';

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <main className="flex-1 bg-background text-foreground">
        <Container className="py-20 sm:py-20 lg:py-24">
          <header className="mx-auto w-full max-w-4xl text-center">
            <div className="flex justify-center">
              <Badge variant="secondary" className="gap-2">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-muted-foreground/60" />
                Privacy & data
              </Badge>
            </div>

            <h1 className="font-brand mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Privacy Policy
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-balance text-sm text-muted-foreground sm:text-base">
              This policy explains what data PyColors may collect, why
              it is collected, and how you can control it.
            </p>

            <p className="mt-3 text-xs text-muted-foreground">
              Last updated: {LAST_UPDATED}
            </p>
          </header>

          <section className="mx-auto mt-10 w-full max-w-5xl">
            <div className="grid gap-4 sm:grid-cols-3">
              <Card className="p-5">
                <div className="inline-flex items-center gap-2 text-sm font-medium">
                  <ShieldCheck
                    className="h-4 w-4"
                    aria-hidden="true"
                  />
                  Minimal data
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Collect only what’s needed to run and improve the
                  site.
                </p>
              </Card>
              <Card className="p-5">
                <div className="inline-flex items-center gap-2 text-sm font-medium">
                  <Scale className="h-4 w-4" aria-hidden="true" />
                  Control
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  You keep control of optional analytics and
                  marketing.
                </p>
              </Card>
              <Card className="p-5">
                <div className="inline-flex items-center gap-2 text-sm font-medium">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  Transparency
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Clear, readable explanations — no legal maze.
                </p>
              </Card>
            </div>
          </section>

          <section className="mx-auto mt-10 w-full max-w-5xl space-y-4">
            <Section title="1. What this covers">
              <p>
                This Privacy Policy covers data handled on{' '}
                <span className="font-medium text-foreground">
                  pycolors.io
                </span>
                . Purchases made on third-party platforms (e.g.,
                Gumroad) are governed by their privacy policies too.
              </p>
            </Section>

            <Section title="2. Data we may collect">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <span className="font-medium text-foreground">
                    Usage data
                  </span>{' '}
                  (pages visited, basic device info, referrer) to
                  improve performance and UX.
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    Contact data
                  </span>{' '}
                  if you reach out (email, message content).
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    Purchase-related data
                  </span>{' '}
                  is handled by the checkout platform (e.g., Gumroad).
                </li>
              </ul>
              <p>
                PyColors aims to keep collection minimal. If analytics
                are enabled, they should be used in an aggregated way
                whenever possible.
              </p>
            </Section>

            <Section title="3. Cookies & analytics">
              <p>
                The website may use cookies or similar technologies
                for:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Basic functionality (when applicable)</li>
                <li>
                  Measuring traffic and product interest (analytics)
                </li>
                <li>Preventing abuse and ensuring reliability</li>
              </ul>
              <p>
                If a cookie banner or preferences UI is present, you
                can control optional analytics there.
              </p>
            </Section>

            <Section title="4. How data is used">
              <ul className="list-disc pl-5 space-y-1">
                <li>Run the website and deliver content</li>
                <li>Improve pages, docs, and product messaging</li>
                <li>Respond to messages and requests</li>
                <li>Maintain security and prevent abuse</li>
              </ul>
            </Section>

            <Section title="5. Data sharing">
              <p>
                Data may be processed by service providers used to
                operate the website (hosting, analytics, email).
                PyColors does not sell personal data.
              </p>
              <p>
                Purchases of premium templates are processed by the
                checkout provider (e.g., Gumroad), which may handle
                billing and delivery.
              </p>
            </Section>

            <Section title="6. Data retention">
              <p>
                Data is kept only as long as necessary for the
                purposes described above. Contact emails may be
                retained to provide support and maintain a history of
                requests.
              </p>
            </Section>

            <Section title="7. Your rights">
              <p>
                Depending on your location, you may have rights such
                as access, correction, deletion, and objection to
                processing. If you want to exercise these rights,
                contact PyColors via the website contact channel (or
                the email listed on the product/checkout page).
              </p>
            </Section>

            <Section title="8. Changes">
              <p>
                This policy may be updated. The “Last updated” date
                will reflect the latest version.
              </p>
            </Section>

            <Card className="p-6 sm:p-7">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-muted-foreground">
                  Want the usage rules for templates?
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button asChild variant="outline">
                    <Link href="/terms">
                      Terms
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
