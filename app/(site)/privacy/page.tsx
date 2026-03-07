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
    'Privacy Policy for PyColors covering website visitors, waitlists, product inquiries, analytics, premium purchases, future accounts, and international users.',
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: 'Privacy · PyColors',
    description:
      'Learn how PyColors collects, uses, stores, and protects personal data across its website, digital products, and future premium services.',
    url: '/privacy',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy · PyColors',
    description:
      'Learn how PyColors collects, uses, stores, and protects personal data across its website, digital products, and future premium services.',
    images: ['/seo/twitter-main.png'],
  },
};

const COMPANY = {
  name: 'Py Colors SASU',
  email: 'legal@pycolors.io',
  addressLine1: '6 rue d’Armaillé',
  postalCode: '75017 Paris',
  country: 'France',
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
  const LAST_UPDATED = 'March 7, 2026';

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
              This policy explains what personal data PyColors may
              collect, how it is used, when it is shared, and what
              choices and rights you may have.
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
                  Minimal collection
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  We aim to collect only the data needed to operate,
                  improve, secure, and commercialize the business.
                </p>
              </Card>
              <Card className="p-5">
                <div className="inline-flex items-center gap-2 text-sm font-medium">
                  <Scale className="h-4 w-4" aria-hidden="true" />
                  Legitimate use
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Data is used for product operations, analytics,
                  communication, support, billing, and growth.
                </p>
              </Card>
              <Card className="p-5">
                <div className="inline-flex items-center gap-2 text-sm font-medium">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                  Growth-ready privacy
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Written to support a modern international SaaS and
                  digital product business.
                </p>
              </Card>
            </div>
          </section>

          <section className="mx-auto mt-10 w-full max-w-5xl space-y-4">
            <Section title="1. Controller">
              <p>
                The data controller for pycolors.io and related
                commercial operations described in this policy is{' '}
                <span className="font-medium text-foreground">
                  {COMPANY.name}
                </span>
                ,
                {` ${COMPANY.addressLine1}, ${COMPANY.postalCode}, ${COMPANY.country}.`}
              </p>
              <p>
                Privacy requests can be sent to{' '}
                <a
                  className="underline underline-offset-4 hover:text-foreground"
                  href={`mailto:${COMPANY.email}`}
                >
                  {COMPANY.email}
                </a>
                .
              </p>
            </Section>

            <Section title="2. What this policy covers">
              <p>
                This policy covers personal data processed through:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  the public website and documentation at pycolors.io;
                </li>
                <li>
                  waitlists, contact forms, email communications, and
                  product inquiries;
                </li>
                <li>analytics and cookies used on the website;</li>
                <li>
                  premium product purchases and billing-related
                  workflows;
                </li>
                <li>
                  future accounts, premium access areas, or
                  subscription services operated by PyColors.
                </li>
              </ul>
              <p>
                Third-party platforms such as Gumroad, Stripe, Google,
                Vercel, and SendGrid may also process personal data
                under their own privacy policies.
              </p>
            </Section>

            <Section title="3. Data we may collect">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <span className="font-medium text-foreground">
                    Contact data
                  </span>{' '}
                  such as name, email address, company name, and the
                  content of messages you send to us.
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    Usage data
                  </span>{' '}
                  such as pages viewed, browser type, device type,
                  referrer, approximate region, interactions, and
                  basic event analytics.
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    Transaction data
                  </span>{' '}
                  such as purchase status, product purchased, billing
                  metadata, and order-related identifiers provided by
                  payment platforms.
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    Account data
                  </span>{' '}
                  for future premium or SaaS features, such as login
                  identifiers, role information, subscription status,
                  or workspace-related metadata.
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    Technical and security data
                  </span>{' '}
                  such as logs, IP-related security signals, abuse
                  prevention data, and operational diagnostics.
                </li>
              </ul>
            </Section>

            <Section title="4. How we collect data">
              <p>We may collect data:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  directly from you when you contact us, join a
                  waitlist, or make a purchase;
                </li>
                <li>automatically when you browse the website;</li>
                <li>
                  from payment and commerce providers when a
                  transaction is completed or attempted;
                </li>
                <li>
                  from analytics, hosting, or email infrastructure
                  providers used to operate the business.
                </li>
              </ul>
            </Section>

            <Section title="5. Why we use personal data">
              <p>We may use personal data to:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  operate, maintain, and secure the website and
                  product infrastructure;
                </li>
                <li>
                  deliver open-source resources, digital products, and
                  future premium access;
                </li>
                <li>
                  process purchases, billing operations, and order
                  follow-up;
                </li>
                <li>
                  respond to inquiries, provide support, and manage
                  customer relationships;
                </li>
                <li>
                  improve messaging, conversion flows, feature
                  prioritization, documentation, and product quality;
                </li>
                <li>
                  measure demand, interest, and growth across the
                  PyColors ecosystem;
                </li>
                <li>
                  prevent fraud, abuse, unauthorized sharing, and
                  misuse of paid products;
                </li>
                <li>
                  comply with legal, accounting, and tax obligations.
                </li>
              </ul>
            </Section>

            <Section title="6. Legal bases">
              <p>
                Depending on the context, we process personal data on
                one or more of the following legal bases:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>your consent, where required;</li>
                <li>
                  performance of a contract or steps taken at your
                  request before entering into a contract;
                </li>
                <li>
                  our legitimate interests, including operating,
                  securing, improving, and commercializing the
                  business;
                </li>
                <li>compliance with legal obligations.</li>
              </ul>
              <p>
                <span className="font-medium text-foreground">
                  Legal review recommended:
                </span>{' '}
                if you later add marketing automation, retargeting, or
                complex ad attribution, this section should be
                expanded.
              </p>
            </Section>

            <Section title="7. Cookies and analytics">
              <p>
                PyColors may use cookies or similar technologies for
                site functionality, analytics, performance monitoring,
                conversion measurement, and abuse prevention.
              </p>
              <p>Current tools and providers may include:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Vercel for hosting and infrastructure-related
                  telemetry;
                </li>
                <li>
                  Google Analytics for website analytics and traffic
                  measurement;
                </li>
                <li>
                  other strictly necessary technical cookies required
                  for site operation or future account access.
                </li>
              </ul>
              <p>
                Where legally required, optional analytics or
                non-essential cookies should only be activated after
                appropriate consent.
              </p>
              <p>
                <span className="font-medium text-foreground">
                  Legal / implementation review recommended:
                </span>{' '}
                if GA is active for EU users, the cookie banner and
                consent mode should match actual implementation.
              </p>
            </Section>

            <Section title="8. Payments and commerce providers">
              <p>
                Payments are processed by third-party providers rather
                than directly by PyColors.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <span className="font-medium text-foreground">
                    Gumroad
                  </span>{' '}
                  currently processes the purchase of the NA-AI
                  premium landing page template.
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    Stripe
                  </span>{' '}
                  may process current or future premium purchases,
                  subscriptions, invoices, and billing operations.
                </li>
              </ul>
              <p>
                We may receive transaction-related information from
                those providers, such as purchase confirmation,
                billing status, country, tax data, or refund/dispute
                status. We do not store full payment card numbers on
                PyColors servers.
              </p>
            </Section>

            <Section title="9. Email communications">
              <p>
                If you contact us, join a waitlist, request access, or
                purchase a product, we may send transactional,
                operational, onboarding, support, or product-related
                emails.
              </p>
              <p>
                Email delivery may be handled through{' '}
                <span className="font-medium text-foreground">
                  SendGrid
                </span>
                .
              </p>
              <p>
                Marketing emails, if later introduced, should include
                clear unsubscribe options where required by law.
              </p>
            </Section>

            <Section title="10. Data sharing">
              <p>
                We may share personal data with service providers only
                where reasonably necessary to operate the business.
              </p>
              <p>These may include providers for:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>hosting and infrastructure (such as Vercel);</li>
                <li>analytics (such as Google Analytics);</li>
                <li>
                  commerce and payments (such as Gumroad and Stripe);
                </li>
                <li>
                  email delivery and communication (such as SendGrid);
                </li>
                <li>security, logging, or operational support.</li>
              </ul>
              <p>
                We do not sell personal data in the ordinary meaning
                of that term.
              </p>
            </Section>

            <Section title="11. International data transfers">
              <p>
                Because PyColors serves international users and relies
                on global service providers, personal data may be
                processed outside your country of residence, including
                outside the European Economic Area.
              </p>
              <p>
                Where required, we aim to rely on appropriate transfer
                mechanisms such as contractual safeguards provided by
                the relevant vendor.
              </p>
              <p>
                <span className="font-medium text-foreground">
                  Legal review recommended:
                </span>{' '}
                if you want strong GDPR positioning, add a more
                precise list of transfer safeguards per vendor.
              </p>
            </Section>

            <Section title="12. Retention">
              <p>
                We retain personal data only for as long as reasonably
                necessary for the purposes described in this policy,
                including support, security, contractual, tax, legal,
                and accounting needs.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  contact messages may be retained to manage ongoing
                  conversations or support history;
                </li>
                <li>
                  transaction records may be retained for accounting,
                  fraud prevention, and legal compliance;
                </li>
                <li>
                  analytics data may be retained according to the
                  settings of the applicable analytics provider;
                </li>
                <li>
                  future account data may be retained while an account
                  or subscription remains active and for a reasonable
                  period afterward.
                </li>
              </ul>
            </Section>

            <Section title="13. Security">
              <p>
                We use reasonable technical and organizational
                measures to protect personal data, but no method of
                transmission or storage is completely secure.
              </p>
              <p>
                You should also protect your own devices, credentials,
                and project environments when using PyColors products.
              </p>
            </Section>

            <Section title="14. Your rights">
              <p>
                Depending on your location, you may have rights such
                as access, correction, deletion, restriction,
                objection, portability, and withdrawal of consent
                where consent is the basis for processing.
              </p>
              <p>
                To exercise your rights, contact{' '}
                <a
                  className="underline underline-offset-4 hover:text-foreground"
                  href={`mailto:${COMPANY.email}`}
                >
                  {COMPANY.email}
                </a>
                .
              </p>
              <p>
                You may also have the right to lodge a complaint with
                a data protection authority.
              </p>
            </Section>

            <Section title="15. Children">
              <p>
                PyColors products and services are intended for
                professionals, founders, developers, agencies, product
                teams, and business users. They are not directed to
                children.
              </p>
            </Section>

            <Section title="16. Changes to this policy">
              <p>
                We may update this Privacy Policy from time to time to
                reflect product evolution, legal requirements, new
                providers, new premium features, or new account and
                subscription models.
              </p>
              <p>
                The “Last updated” date reflects the current version.
              </p>
            </Section>

            <Card className="p-6 sm:p-7">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-muted-foreground">
                  Need rules for commercial usage and purchases?
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
