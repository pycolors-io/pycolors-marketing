import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Cookie,
  CreditCard,
  Database,
  FileText,
  Scale,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

import { Container } from '@/components/container';
import { Badge, Button, Card, CardContent } from '@pycolors/ui';
import { Breadcrumb } from '@/components/seo/breadcrumb';

export const metadata: Metadata = {
  title: 'Privacy Policy for SaaS Products & Developer Tools',
  description:
    'Learn how PyColors collects, uses, stores, and protects data across SaaS products, developer tools, templates, starters, checkout flows, analytics, downloads, and support operations.',
  alternates: {
    canonical: '/privacy',
  },

  openGraph: {
    title: 'Privacy Policy for SaaS Products & Developer Tools',
    description:
      'Understand how PyColors handles privacy, analytics, payments, digital delivery, support, account systems, and developer platform operations.',
    url: '/privacy',
    siteName: 'PyColors',
    type: 'website',
    images: ['/seo/og-main.png'],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy for SaaS Products & Developer Tools',
    description:
      'Privacy and data handling for PyColors SaaS products, templates, starters, developer tools, and checkout systems.',
    images: ['/seo/twitter-main.png'],
  },
};

const COMPANY = {
  name: 'Py Colors SASU',
  email: 'contact@pycolors.io',
  addressLine1: '6 rue d’Armaillé',
  postalCode: '75017 Paris',
  country: 'France',
};

const LAST_UPDATED = 'May 14, 2026';

function Section({
  title,
  children,
}: {
  readonly title: string;
  readonly children: React.ReactNode;
}) {
  return (
    <Card className="rounded-[5px] border border-border-subtle bg-surface shadow-soft">
      <CardContent className="p-6 sm:p-7">
        <h2 className="font-brand text-lg font-semibold tracking-tight">
          {title}
        </h2>

        <div className="mt-3 space-y-3 text-sm leading-7 text-muted-foreground">
          {children}
        </div>
      </CardContent>
    </Card>
  );
}

function PrincipleCard({
  icon: Icon,
  title,
  description,
}: {
  readonly icon: React.ComponentType<{ className?: string }>;
  readonly title: string;
  readonly description: string;
}) {
  return (
    <Card className="rounded-[5px] border border-border-subtle bg-surface shadow-soft">
      <CardContent className="p-5">
        <div className="inline-flex items-center gap-2 text-sm font-medium">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-[5px] border border-border-subtle bg-surface-muted text-primary">
            <Icon className="h-4 w-4" aria-hidden="true" />
          </span>
          {title}
        </div>

        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}

export default function PrivacyPage() {
  return (
    <Container className="py-18">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Privacy', href: '/privacy' },
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
              Privacy & data
            </Badge>
          </div>

          <h1 className="font-brand mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Privacy Policy
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-balance text-sm leading-7 text-muted-foreground sm:text-base">
            This Privacy Policy explains what personal data PyColors
            may collect, how it is used, when it may be shared, and
            what rights you may have when using the website,
            documentation, products, checkout flows, downloads, and
            support channels.
          </p>

          <p className="mt-3 text-xs text-muted-foreground">
            Last updated: {LAST_UPDATED}
          </p>
        </header>

        <section className="mx-auto mt-10 w-full max-w-6xl">
          <div className="grid gap-4 sm:grid-cols-3">
            <PrincipleCard
              icon={ShieldCheck}
              title="Minimal collection"
              description="PyColors aims to collect only the data needed to operate, secure, improve, and sell its products."
            />

            <PrincipleCard
              icon={Scale}
              title="Clear purpose"
              description="Data is used for product delivery, support, analytics, billing, fraud prevention, and legal obligations."
            />

            <PrincipleCard
              icon={Sparkles}
              title="Product-ready privacy"
              description="Structured for a growing developer platform selling templates, starters, and SaaS foundations."
            />
          </div>
        </section>

        <section className="mx-auto mt-10 w-full max-w-6xl space-y-4">
          <Section title="1. Controller">
            <p>
              The data controller for pycolors.io and related
              commercial operations described in this policy is{' '}
              <span className="font-medium text-foreground">
                {COMPANY.name}
              </span>
              , {COMPANY.addressLine1}, {COMPANY.postalCode},{' '}
              {COMPANY.country}.
            </p>

            <p>
              Privacy, product, commercial usage, and support requests
              can be sent to{' '}
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
            <p>This policy covers personal data processed through:</p>

            <ul className="list-disc space-y-1 pl-5">
              <li>the public website at pycolors.io;</li>
              <li>
                documentation, guides, examples, blog posts, roadmap,
                and changelog pages;
              </li>
              <li>
                contact forms, support requests, product inquiries,
                and email communications;
              </li>
              <li>
                analytics and technical measurement used to improve
                the website and products;
              </li>
              <li>
                premium product purchases, checkout flows, invoices,
                order recovery, and digital delivery;
              </li>
              <li>
                future account areas, customer portals, download
                pages, or premium access systems operated by PyColors.
              </li>
            </ul>

            <p>
              Third-party providers used for payments, hosting,
              analytics, email, or storage may also process personal
              data under their own privacy policies.
            </p>
          </Section>

          <Section title="3. Data we may collect">
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <span className="font-medium text-foreground">
                  Contact data
                </span>{' '}
                such as name, email address, company name, and the
                content of messages you send.
              </li>

              <li>
                <span className="font-medium text-foreground">
                  Usage data
                </span>{' '}
                such as pages viewed, browser type, device type,
                referral source, approximate region, interactions, and
                analytics events.
              </li>

              <li>
                <span className="font-medium text-foreground">
                  Transaction data
                </span>{' '}
                such as product purchased, order status, billing
                metadata, invoice information, tax-related metadata,
                payment provider identifiers, and download or claim
                status.
              </li>

              <li>
                <span className="font-medium text-foreground">
                  Account or access data
                </span>{' '}
                such as login identifiers, customer identifiers, role
                information, product entitlement, access token state,
                or subscription status if account features are used.
              </li>

              <li>
                <span className="font-medium text-foreground">
                  Technical and security data
                </span>{' '}
                such as logs, IP-related security signals, error
                diagnostics, anti-abuse signals, and operational
                telemetry.
              </li>
            </ul>
          </Section>

          <Section title="4. How we collect data">
            <p>We may collect data:</p>

            <ul className="list-disc space-y-1 pl-5">
              <li>
                directly from you when you contact us, request
                support, or make a purchase;
              </li>
              <li>
                automatically when you browse the website or interact
                with product pages;
              </li>
              <li>
                from payment and commerce providers when a checkout,
                payment, refund, invoice, or dispute is created;
              </li>
              <li>
                from hosting, analytics, email, storage, or
                infrastructure providers used to operate PyColors.
              </li>
            </ul>
          </Section>

          <Section title="5. Why we use personal data">
            <p>We may use personal data to:</p>

            <ul className="list-disc space-y-1 pl-5">
              <li>
                operate, maintain, and secure the website and product
                infrastructure;
              </li>
              <li>
                deliver digital products, downloads, order access, and
                customer support;
              </li>
              <li>
                process purchases, taxes, invoices, refunds, disputes,
                and billing operations;
              </li>
              <li>
                respond to inquiries and manage customer
                relationships;
              </li>
              <li>
                improve messaging, conversion flows, documentation,
                product quality, and roadmap decisions;
              </li>
              <li>
                measure demand, traffic, product interest, and growth
                across the PyColors ecosystem;
              </li>
              <li>
                prevent fraud, abuse, unauthorized sharing, license
                misuse, and security risks;
              </li>
              <li>
                comply with legal, tax, accounting, and business
                obligations.
              </li>
            </ul>
          </Section>

          <Section title="6. Legal bases">
            <p>
              Depending on the context, PyColors may process personal
              data based on:
            </p>

            <ul className="list-disc space-y-1 pl-5">
              <li>your consent, where required;</li>
              <li>
                performance of a contract or steps taken at your
                request before entering into a contract;
              </li>
              <li>
                legitimate interests, including operating, securing,
                improving, and commercializing PyColors;
              </li>
              <li>
                compliance with legal obligations, including tax,
                accounting, and fraud prevention requirements.
              </li>
            </ul>
          </Section>

          <Section title="7. Cookies and analytics">
            <p>
              PyColors may use cookies or similar technologies for
              site functionality, analytics, performance monitoring,
              conversion measurement, security, and abuse prevention.
            </p>

            <p>Current or future tools may include:</p>

            <ul className="list-disc space-y-1 pl-5">
              <li>
                Vercel for hosting and infrastructure-related
                telemetry;
              </li>
              <li>
                Google Analytics or similar analytics tools for
                traffic and product measurement;
              </li>
              <li>
                strictly necessary cookies or storage required for
                checkout, account access, download flows, or security.
              </li>
            </ul>

            <p>
              Where legally required, optional analytics or
              non-essential cookies should only be activated after
              appropriate consent.
            </p>
          </Section>

          <Section title="8. Payments and commerce providers">
            <p>
              Payments are processed by third-party providers rather
              than directly by PyColors.
            </p>

            <ul className="list-disc space-y-1 pl-5">
              <li>
                <span className="font-medium text-foreground">
                  Stripe
                </span>{' '}
                may process product purchases, invoices, payment
                status, customer records, taxes, refunds, and
                disputes.
              </li>

              <li>
                Other payment or commerce providers may be used for
                specific products, historical purchases, or future
                commercial offers.
              </li>
            </ul>

            <p>
              PyColors may receive transaction-related information
              from those providers, such as purchase confirmation,
              billing status, country, tax data, invoice data, refund
              state, dispute status, and product entitlement. PyColors
              does not store full payment card numbers on its servers.
            </p>
          </Section>

          <Section title="9. Digital delivery and downloads">
            <p>
              Paid products may be delivered through claim pages,
              download links, access tokens, customer emails, private
              storage, or order recovery flows.
            </p>

            <p>
              To provide and protect digital delivery, PyColors may
              process order identifiers, customer email, product
              entitlement, download token status, access logs, and
              related security signals.
            </p>
          </Section>

          <Section title="10. Email communications">
            <p>
              If you contact PyColors, purchase a product, request
              support, or use a product access flow, we may send
              transactional, operational, onboarding, support,
              security, billing, or product-related emails.
            </p>

            <p>
              Email delivery may be handled by third-party email
              providers. Marketing emails, if introduced, should
              include unsubscribe options where required by law.
            </p>
          </Section>

          <Section title="11. Data sharing">
            <p>
              We may share personal data with service providers only
              where reasonably necessary to operate PyColors.
            </p>

            <p>These providers may include:</p>

            <ul className="list-disc space-y-1 pl-5">
              <li>
                hosting and deployment providers, such as Vercel;
              </li>
              <li>
                analytics providers, such as Google Analytics or
                similar tools;
              </li>
              <li>payment and billing providers, such as Stripe;</li>
              <li>email delivery and communication providers;</li>
              <li>
                storage, logging, security, and operational providers;
              </li>
              <li>
                professional advisors where required for accounting,
                legal, tax, or compliance purposes.
              </li>
            </ul>

            <p>
              We do not sell personal data in the ordinary meaning of
              that term.
            </p>
          </Section>

          <Section title="12. International data transfers">
            <p>
              PyColors is based in France and may serve users
              internationally. Some service providers may process data
              outside your country of residence, including outside the
              European Economic Area.
            </p>

            <p>
              Where required, PyColors aims to rely on appropriate
              transfer mechanisms such as contractual safeguards
              provided by the relevant vendor.
            </p>
          </Section>

          <Section title="13. Retention">
            <p>
              We retain personal data only for as long as reasonably
              necessary for the purposes described in this policy,
              including support, security, contractual, tax, legal,
              accounting, and anti-fraud needs.
            </p>

            <ul className="list-disc space-y-1 pl-5">
              <li>
                contact messages may be retained to manage support and
                customer history;
              </li>
              <li>
                transaction records may be retained for accounting,
                tax, fraud prevention, and legal compliance;
              </li>
              <li>
                download and access data may be retained to provide
                order recovery and protect paid products;
              </li>
              <li>
                analytics data may be retained according to the
                settings of the applicable analytics provider;
              </li>
              <li>
                account or entitlement data may be retained while
                access remains active and for a reasonable period
                afterward.
              </li>
            </ul>
          </Section>

          <Section title="14. Security">
            <p>
              We use reasonable technical and organizational measures
              to protect personal data, including access controls,
              secure providers, operational monitoring, and security
              practices appropriate for a small digital product
              business.
            </p>

            <p>
              No method of transmission or storage is completely
              secure. You should also protect your own devices,
              credentials, deployment environments, and downloaded
              source code.
            </p>
          </Section>

          <Section title="15. Your rights">
            <p>
              Depending on your location, you may have rights such as
              access, correction, deletion, restriction, objection,
              portability, and withdrawal of consent where consent is
              the basis for processing.
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
              You may also have the right to lodge a complaint with a
              data protection authority.
            </p>
          </Section>

          <Section title="16. Children">
            <p>
              PyColors products and services are intended for
              professionals, founders, developers, agencies, product
              teams, and business users. They are not directed to
              children.
            </p>
          </Section>

          <Section title="17. Changes to this policy">
            <p>
              We may update this Privacy Policy from time to time to
              reflect product evolution, legal requirements, provider
              changes, new checkout flows, new account features, or
              new commercial products.
            </p>

            <p>
              The “Last updated” date reflects the current version.
            </p>
          </Section>

          <Card className="rounded-[5px] border border-border-subtle bg-surface shadow-medium">
            <CardContent className="p-6 sm:p-7">
              <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <div>
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-[5px] border border-border-subtle bg-surface-muted">
                    <FileText
                      className="h-4 w-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                  </div>

                  <p className="mt-5 text-sm font-medium text-foreground">
                    Need rules for commercial usage and purchases?
                  </p>

                  <p className="mt-1 text-sm leading-7 text-muted-foreground">
                    Review the Terms and License pages before using
                    PyColors products in production or client work.
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

                  <Button asChild className="rounded-[5px]">
                    <Link href="/license">
                      License
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

          <Card className="rounded-[5px] border border-border-subtle bg-surface shadow-soft">
            <CardContent className="p-6 sm:p-7">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
                    <Cookie
                      className="h-4 w-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                    Cookies
                  </div>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Used for functionality, analytics, security, and
                    future access flows where applicable.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
                    <CreditCard
                      className="h-4 w-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                    Payments
                  </div>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Payment data is processed by third-party providers
                    such as Stripe.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
                    <Database
                      className="h-4 w-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                    Access data
                  </div>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Order, entitlement, and download data may be used
                    to deliver paid products securely.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <p className="text-center text-xs leading-6 text-muted-foreground">
            Product-specific checkout pages, invoices, license files,
            and written agreements may include additional or more
            specific information.
          </p>
        </section>
      </div>
    </Container>
  );
}
