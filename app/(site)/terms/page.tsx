import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  CreditCard,
  FileText,
  Scale,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

import { Container } from '@/components/container';
import { Badge, Button, Card, CardContent } from '@pycolors/ui';
import { Breadcrumb } from '@/components/seo/breadcrumb';

export const metadata: Metadata = {
  title: 'Terms of Service for SaaS Products & Templates',
  description:
    'Terms of Service for PyColors covering SaaS products, templates, Starter Free, Starter Pro, public repositories, payments, licensing, digital downloads, and commercial usage.',
  alternates: {
    canonical: '/terms',
  },

  openGraph: {
    title: 'Terms of Service for SaaS Products & Templates',
    description:
      'Review the Terms of Service governing PyColors templates, SaaS starters, open-source repositories, digital products, payments, licensing, and commercial usage.',
    url: '/terms',
    siteName: 'PyColors',
    type: 'website',
    images: ['/seo/og-main.png'],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service for SaaS Products & Templates',
    description:
      'Terms governing PyColors SaaS products, templates, developer tools, licensing, payments, and commercial usage.',
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

type SectionProps = {
  readonly title: string;
  readonly children: React.ReactNode;
};

function Section({ title, children }: SectionProps) {
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

export default function TermsPage() {
  return (
    <Container className="py-18">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Terms', href: '/terms' },
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
              Terms & commercial rules
            </Badge>
          </div>

          <h1 className="font-brand mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Terms of Service
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-balance text-sm leading-7 text-muted-foreground sm:text-base">
            These Terms govern access to the PyColors website,
            documentation, public repositories, Starter Free, premium
            templates, Starter Pro, checkout flows, digital downloads,
            and related commercial products operated by Py Colors
            SASU.
          </p>

          <p className="mt-3 text-xs text-muted-foreground">
            Last updated: {LAST_UPDATED}
          </p>
        </header>

        <section className="mx-auto mt-10 w-full max-w-6xl">
          <div className="grid gap-4 sm:grid-cols-3">
            <PrincipleCard
              icon={Scale}
              title="Clear product scope"
              description="Separate rules for open-source packages, free starters, paid templates, and commercial source-code products."
            />

            <PrincipleCard
              icon={ShieldCheck}
              title="Commercial trust"
              description="Clear expectations around payments, access, licenses, usage rights, and redistribution restrictions."
            />

            <PrincipleCard
              icon={Sparkles}
              title="Built for growth"
              description="Terms designed for a growing developer platform selling templates, starters, and SaaS foundations."
            />
          </div>
        </section>

        <section className="mx-auto mt-10 w-full max-w-6xl space-y-4">
          <Section title="1. Who we are">
            <p>
              These Terms are provided by{' '}
              <span className="font-medium text-foreground">
                {COMPANY.name}
              </span>
              , located at {COMPANY.addressLine1},{' '}
              {COMPANY.postalCode}, {COMPANY.country}.
            </p>

            <p>
              Product, licensing, commercial usage, and support
              questions can be sent to{' '}
              <a
                className="underline underline-offset-4 hover:text-foreground"
                href={`mailto:${COMPANY.email}`}
              >
                {COMPANY.email}
              </a>
              .
            </p>
          </Section>

          <Section title="2. Scope of these Terms">
            <p>These Terms apply to:</p>

            <ul className="list-disc space-y-1 pl-5">
              <li>the public website at pycolors.io;</li>
              <li>
                documentation, guides, blog posts, examples,
                changelogs, and roadmaps;
              </li>
              <li>
                public repositories and public mirrors published by
                PyColors;
              </li>
              <li>Starter Free and other free PyColors resources;</li>
              <li>premium templates, including NA-AI Landing;</li>
              <li>
                Starter Pro and other paid source-code products;
              </li>
              <li>
                checkout flows, downloads, order recovery, and
                customer support interactions.
              </li>
            </ul>
          </Section>

          <Section title="3. Acceptance of the Terms">
            <p>
              By accessing the website, browsing content, downloading
              a resource, using a public repository, purchasing a
              product, or using any PyColors commercial offer, you
              agree to these Terms.
            </p>

            <p>
              If you use PyColors on behalf of a company, client, or
              other legal entity, you represent that you have
              authority to bind that entity to these Terms.
            </p>
          </Section>

          <Section title="4. Product categories">
            <p>
              PyColors offers different product categories. They do
              not all include the same rights, support, updates, or
              technical scope.
            </p>

            <ul className="list-disc space-y-1 pl-5">
              <li>
                <span className="font-medium text-foreground">
                  Open-source packages
                </span>{' '}
                are governed by their repository license.
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Starter Free
                </span>{' '}
                is a free product for SaaS UX validation and learning.
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Premium templates
                </span>{' '}
                are paid frontend templates delivered as digital
                source-code products.
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Starter Pro
                </span>{' '}
                is a paid SaaS foundation with commercial source-code
                access.
              </li>
            </ul>

            <p>
              The specific scope of a product is defined on the
              applicable product page, pricing page, checkout page,
              invoice, download page, or written order terms.
            </p>
          </Section>

          <Section title="5. Accounts and access">
            <p>
              Certain features may require a checkout session, order
              claim flow, download token, account, login, or email
              access.
            </p>

            <ul className="list-disc space-y-1 pl-5">
              <li>
                You must provide accurate and current information.
              </li>
              <li>
                You are responsible for maintaining access to the
                email address used for purchase.
              </li>
              <li>
                You are responsible for activity under your account or
                access link unless caused by our own fault.
              </li>
              <li>
                We may restrict access if we reasonably believe there
                is fraud, abuse, non-payment, security risk, or
                violation of these Terms.
              </li>
            </ul>
          </Section>

          <Section title="6. Open-source packages and public repositories">
            <p>
              Public repositories such as PyColors UI, PyColors
              Tokens, Starter Free, and related mirrors may be
              available as open-source or public repositories.
            </p>

            <p>
              Their use is governed by the license included in the
              relevant repository. These Terms still apply to your use
              of the website, branding, documentation, commercial
              pages, support, and any paid products connected to the
              ecosystem.
            </p>

            <p>
              Open-source availability does not grant rights to paid
              products, private repositories, premium downloads,
              private assets, Starter Pro, or future commercial offers
              unless explicitly stated.
            </p>
          </Section>

          <Section title="7. Premium templates">
            <p>
              Premium templates, including{' '}
              <span className="font-medium text-foreground">
                NA-AI Landing
              </span>
              , are commercial digital products delivered
              electronically.
            </p>

            <p>
              Unless explicitly stated otherwise, premium templates
              are frontend-focused codebases. They do not include
              backend APIs, authentication, database infrastructure,
              Stripe payments, CMS integration, managed hosting, or
              custom implementation work.
            </p>

            <p>
              Your use of premium templates is subject to the{' '}
              <Link
                className="underline underline-offset-4 hover:text-foreground"
                href="/license"
              >
                License
              </Link>{' '}
              page and any product-specific terms shown during
              checkout or delivery.
            </p>
          </Section>

          <Section title="8. Starter Pro">
            <p>
              Starter Pro is a paid source-code product designed to
              help developers launch a real SaaS faster with
              production-oriented foundations.
            </p>

            <p>
              Starter Pro may include authentication, Stripe billing,
              protected app architecture, database foundations,
              delivery flows, and documentation depending on the
              version and offer purchased.
            </p>

            <p>
              Starter Pro is not a finished SaaS business. You remain
              responsible for your own product logic, customer
              onboarding, compliance, security review, deployment,
              monitoring, copy, positioning, and market-specific
              workflows.
            </p>
          </Section>

          <Section title="9. Payments, taxes, and billing providers">
            <p>
              Payments may be processed by third-party providers such
              as Stripe or another checkout provider used by PyColors.
            </p>

            <ul className="list-disc space-y-1 pl-5">
              <li>
                You agree to provide valid payment information where
                required.
              </li>
              <li>
                You authorize the billing provider to charge the
                applicable price and taxes.
              </li>
              <li>Taxes may be added where required by law.</li>
              <li>
                Card processing, fraud checks, chargebacks, disputes,
                and payment security may be handled by the relevant
                payment provider.
              </li>
            </ul>
          </Section>

          <Section title="10. Digital delivery, refunds, and cancellations">
            <p>
              PyColors paid products are digital products that may be
              delivered immediately after purchase through a download,
              claim page, private access flow, or email-based recovery
              flow.
            </p>

            <p>
              Because digital products can be accessed immediately,
              refunds may be limited or unavailable unless required by
              applicable law or explicitly stated on the product page,
              checkout page, or order terms.
            </p>

            <p>
              For subscriptions or access plans introduced in the
              future, cancellation and renewal terms will be shown on
              the relevant pricing page, checkout page, order form, or
              account area.
            </p>

            <p>
              Nothing in these Terms excludes mandatory consumer
              rights that cannot be waived under applicable law.
            </p>
          </Section>

          <Section title="11. License, intellectual property, and ownership">
            <p>
              PyColors products are licensed, not sold, except to the
              limited extent required by applicable law.
            </p>

            <p>
              Py Colors SASU retains all rights, title, and interest
              in the website, products, source materials,
              documentation, private product packaging, brand
              identity, trademarks, logos, product names, and related
              intellectual property.
            </p>

            <p>
              Purchasing a product does not transfer ownership of the
              product itself and does not permit redistribution,
              resale, sublicensing, or publication beyond the license
              granted for that product.
            </p>
          </Section>

          <Section title="12. Acceptable use">
            <p>You must not:</p>

            <ul className="list-disc space-y-1 pl-5">
              <li>
                resell, redistribute, leak, publish, or share paid
                source code, premium assets, private files, or
                download links in violation of the applicable license;
              </li>
              <li>
                create competing commercial templates, starters, UI
                kits, boilerplates, or downloadable products
                substantially based on paid PyColors products;
              </li>
              <li>
                use the website or products for unlawful, fraudulent,
                abusive, or harmful activity;
              </li>
              <li>
                attempt to interfere with platform security,
                availability, or integrity;
              </li>
              <li>
                scrape, crawl, or automate access in a way that harms
                operations or bypasses access controls;
              </li>
              <li>
                misrepresent PyColors products as your own framework,
                toolkit, starter, or commercial package for resale;
              </li>
              <li>
                use PyColors branding in a way that implies
                partnership, endorsement, or official origin without
                permission.
              </li>
            </ul>
          </Section>

          <Section title="13. Third-party services">
            <p>
              PyColors may rely on third-party services for hosting,
              payments, analytics, email delivery, storage,
              deployment, and operations.
            </p>

            <p>
              Your use of features connected to those services may
              also be subject to the relevant third-party terms and
              policies.
            </p>
          </Section>

          <Section title="14. Availability and product changes">
            <p>
              We may update, improve, suspend, replace, rename,
              repackage, or remove parts of the website,
              documentation, pricing, products, product lineup,
              roadmap, or access model at any time.
            </p>

            <p>
              We aim to maintain continuity and clarity, but we do not
              guarantee that every free, public, or commercial feature
              will remain available indefinitely in the same form.
            </p>
          </Section>

          <Section title="15. Disclaimer">
            <p>
              The website and products are provided on an{' '}
              <span className="font-medium text-foreground">
                “as is”
              </span>{' '}
              and{' '}
              <span className="font-medium text-foreground">
                “as available”
              </span>{' '}
              basis, except where otherwise required by law.
            </p>

            <p>
              You are responsible for evaluating whether a product is
              suitable for your technical, legal, operational,
              security, accessibility, compliance, and business
              requirements.
            </p>
          </Section>

          <Section title="16. Limitation of liability">
            <p>
              To the maximum extent permitted by law, Py Colors SASU
              will not be liable for indirect, incidental, special,
              consequential, punitive, or loss-of-profit damages, or
              for loss of data, business interruption, or loss of
              goodwill arising from or related to your use of the
              website or products.
            </p>

            <p>
              To the maximum extent permitted by law, our aggregate
              liability for any claim related to a paid product will
              not exceed the amount you paid to us for the specific
              product or offer giving rise to the claim during the
              twelve months preceding the event.
            </p>

            <p>
              Some jurisdictions do not allow certain limitations of
              liability. In that case, the limitation applies only to
              the maximum extent permitted by applicable law.
            </p>
          </Section>

          <Section title="17. Termination">
            <p>
              We may suspend or terminate access to the website,
              account areas, downloads, premium resources, or future
              commercial services if you materially breach these Terms
              or the applicable license.
            </p>

            <p>
              Sections relating to intellectual property, payment
              obligations, restrictions, disclaimers, liability, and
              governing law will survive termination where applicable.
            </p>
          </Section>

          <Section title="18. Governing law and international use">
            <p>
              These Terms are governed by the laws of{' '}
              <span className="font-medium text-foreground">
                France
              </span>
              , without regard to conflict-of-law principles.
            </p>

            <p>
              PyColors may be used internationally, but you are
              responsible for complying with local laws applicable to
              your own business and use case.
            </p>
          </Section>

          <Section title="19. Changes to these Terms">
            <p>
              We may update these Terms from time to time. The “Last
              updated” date reflects the current version.
            </p>

            <p>
              Product-specific pages, pricing pages, checkout pages,
              invoices, or written commercial agreements may include
              additional or more specific terms for the relevant
              product.
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
                    Need product usage details?
                  </p>

                  <p className="mt-1 text-sm leading-7 text-muted-foreground">
                    Review the license, pricing, and privacy policy
                    before using PyColors products in production.
                  </p>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row lg:justify-end">
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-[5px]"
                  >
                    <Link href="/license">
                      License
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
                      Privacy Policy
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
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
                    <CreditCard
                      className="h-4 w-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                    Product, billing, or license question?
                  </div>

                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    Contact PyColors at{' '}
                    <a
                      className="underline underline-offset-4 hover:text-foreground"
                      href={`mailto:${COMPANY.email}`}
                    >
                      {COMPANY.email}
                    </a>
                    .
                  </p>
                </div>

                <Button
                  asChild
                  variant="outline"
                  className="rounded-[5px]"
                >
                  <a href={`mailto:${COMPANY.email}`}>
                    Contact
                    <ArrowRight
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                  </a>
                </Button>
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
