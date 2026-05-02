import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Scale,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

import { Container } from '@/components/container';
import { Badge, Button, Card, CardContent } from '@pycolors/ui';
import { Breadcrumb } from '@/components/seo/breadcrumb';

export const metadata: Metadata = {
  title: 'Terms',
  description:
    'Terms of Service for PyColors covering website usage, public repositories, premium templates, future PRO products, payments, subscriptions, accounts, and commercial usage.',
  alternates: { canonical: '/terms' },
  openGraph: {
    title: 'Terms · PyColors',
    description:
      'Terms of Service for the PyColors ecosystem, including public repositories, digital products, future SaaS offers, and commercial usage rules.',
    url: '/terms',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms · PyColors',
    description:
      'Terms of Service for the PyColors ecosystem, including public repositories, digital products, future SaaS offers, and commercial usage rules.',
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

const LAST_UPDATED = 'March 7, 2026';

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
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
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
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
    <Container className="py-20 sm:py-20 lg:py-24">
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
            documentation, public repository ecosystem, premium
            templates, future PRO products, bundled offers, and
            related commercial services made available by Py Colors
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
              title="Product clarity"
              description="Separate rules for open-source repositories, templates, and premium access."
            />
            <PrincipleCard
              icon={ShieldCheck}
              title="Commercial trust"
              description="Clear expectations around payments, accounts, licenses, and acceptable use."
            />
            <PrincipleCard
              icon={Sparkles}
              title="Scalable structure"
              description="Written for a growing international SaaS and digital product business."
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
              For legal or commercial questions, you can contact us at{' '}
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
                documentation, guides, examples, changelogs, roadmaps,
                and public content;
              </li>
              <li>
                the public repository ecosystem and public mirrors
                published by or for PyColors;
              </li>
              <li>premium templates sold by PyColors;</li>
              <li>
                future commercial products such as UI PRO, Starter
                PRO, bundled access, subscriptions, and related
                premium drops;
              </li>
              <li>
                any waitlist, account area, support interaction, or
                purchase flow operated by or for PyColors.
              </li>
            </ul>
          </Section>

          <Section title="3. Acceptance of the Terms">
            <p>
              By accessing the website, browsing public content,
              downloading an open-source resource, joining a waitlist,
              creating an account, purchasing a product, or using any
              PyColors commercial offer, you agree to these Terms.
            </p>
            <p>
              If you are using PyColors on behalf of a company,
              client, or other legal entity, you represent that you
              have authority to bind that entity to these Terms.
            </p>
          </Section>

          <Section title="4. Product categories">
            <p>
              PyColors may offer different categories of products and
              access models. They do not all work the same way.
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <span className="font-medium text-foreground">
                  Open-source repositories
                </span>{' '}
                are governed by their repository license for the
                repository scope.
              </li>
              <li>
                <span className="font-medium text-foreground">
                  Premium templates
                </span>{' '}
                are commercial digital products delivered as code or
                assets.
              </li>
              <li>
                <span className="font-medium text-foreground">
                  PRO products and bundle offers
                </span>{' '}
                may include one-time purchases, subscriptions,
                seat-based access, bundled access, or update-based
                entitlements.
              </li>
            </ul>
            <p>
              The specific commercial scope of a product or offer is
              defined on the applicable sales page, access page,
              checkout page, invoice, or order flow.
            </p>
          </Section>

          <Section title="5. Accounts and access">
            <p>
              Certain current or future features may require an
              account, login, invite, or paid access.
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                You must provide accurate and current information.
              </li>
              <li>
                You are responsible for maintaining the
                confidentiality of your credentials.
              </li>
              <li>
                You are responsible for activity occurring under your
                account, unless caused by our own fault.
              </li>
              <li>
                We may suspend or restrict access if we reasonably
                believe there is misuse, fraud, abuse, non-payment,
                security risk, or violation of these Terms.
              </li>
            </ul>
          </Section>

          <Section title="6. Open-source repositories">
            <p>
              PyColors UI, tokens, tooling, Starter Free, and public
              mirrors may be available as open-source or public
              repositories.
            </p>
            <p>
              Their use is governed by the license included in the
              relevant repository. These Terms still apply to your use
              of the website, branding, waitlists, account-related
              features, and any commercial services surrounding those
              repositories.
            </p>
            <p>
              Open-source availability does not grant rights over
              premium products, paid source code, private
              repositories, brand assets, or future commercial offers
              unless explicitly stated.
            </p>
          </Section>

          <Section title="7. Premium templates">
            <p>
              PyColors may sell premium templates, including the
              current Gumroad product{' '}
              <span className="font-medium text-foreground">
                NA-AI — Premium AI Analytics Landing Page (Next.js)
              </span>
              .
            </p>
            <p>
              Premium templates are digital products delivered
              electronically. Unless explicitly stated, they are
              frontend-focused codebases and do not include hosted
              services, backend logic, authentication, database
              infrastructure, or ongoing custom development.
            </p>
            <p>
              Your use of a premium template is subject to the{' '}
              <Link
                className="underline underline-offset-4 hover:text-foreground"
                href="/license"
              >
                License
              </Link>{' '}
              page and any product-specific license terms shown at
              checkout.
            </p>
          </Section>

          <Section title="8. PRO products, access plans, and subscriptions">
            <p>
              PyColors may introduce premium products and access plans
              such as UI PRO, Starter PRO, All-In Access,
              subscriptions, member-only access, or future commercial
              drops.
            </p>
            <p>
              These offers may include recurring billing, update
              access windows, private repositories, premium
              documentation, support tiers, seat limits, usage limits,
              or bundle entitlements.
            </p>
            <p>
              Specific commercial terms displayed on a product page,
              access page, pricing page, checkout page, invoice, or
              order form supplement these Terms and control for the
              relevant product or offer.
            </p>
          </Section>

          <Section title="9. Payments, taxes, and billing providers">
            <p>
              Payments may be processed by third-party providers such
              as Gumroad or Stripe, depending on the product.
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                You agree to provide valid payment information where
                required.
              </li>
              <li>
                You authorize the relevant billing provider to charge
                the applicable price, taxes, and recurring fees if the
                product or plan is subscription-based.
              </li>
              <li>Taxes may be added where required by law.</li>
              <li>
                Billing operations, card processing, fraud checks, and
                payment disputes may be handled by the relevant
                payment platform.
              </li>
            </ul>
          </Section>

          <Section title="10. Refunds and cancellations">
            <p>
              Because many PyColors products are digital products
              delivered immediately, refunds may be limited or
              unavailable.
            </p>
            <p>
              For the current Gumroad template, the checkout terms
              currently state:{' '}
              <span className="font-medium text-foreground">
                no refunds allowed
              </span>
              .
            </p>
            <p>
              For future products, subscriptions, or bundles, the
              refund and cancellation rules shown on the relevant
              checkout, order, pricing, or access page will apply.
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
              Py Colors SASU retains all right, title, and interest in
              and to the website, products, source materials,
              documentation, public and private product packaging,
              brand identity, trademarks, and related intellectual
              property, except for third-party components governed by
              their own licenses.
            </p>
            <p>
              Purchasing a product or access plan does not transfer
              ownership of the product itself or permit redistribution
              beyond the granted license.
            </p>
          </Section>

          <Section title="12. Acceptable use">
            <p>You must not:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                resell, redistribute, leak, or share paid source code,
                premium assets, private materials, or premium access
                in violation of the applicable license;
              </li>
              <li>
                use the website or products for unlawful, fraudulent,
                or abusive activity;
              </li>
              <li>
                attempt to interfere with platform security,
                availability, or integrity;
              </li>
              <li>
                scrape, crawl, or automate access to the website in a
                way that harms operations or bypasses access controls;
              </li>
              <li>
                misrepresent PyColors products as your own framework,
                toolkit, starter, or commercial package for resale;
              </li>
              <li>
                use PyColors brand assets, product naming, or
                positioning in a way that implies official affiliation
                or endorsement without permission.
              </li>
            </ul>
          </Section>

          <Section title="13. Third-party services">
            <p>
              PyColors may rely on third-party services including
              hosting, analytics, payments, email delivery, and other
              operational providers.
            </p>
            <p>
              Your use of features connected to those providers may
              also be subject to the relevant third-party terms and
              policies.
            </p>
          </Section>

          <Section title="14. Availability and changes">
            <p>
              We may update, improve, suspend, replace, or remove any
              part of the website, public content, product lineup,
              pricing, features, roadmap, or access model at any time.
            </p>
            <p>
              We aim for continuity and clarity, but we do not
              guarantee that every free, public, or future feature
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
              You are responsible for evaluating whether a product or
              access plan is suitable for your technical, legal,
              operational, security, accessibility, and compliance
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
              liability for any claim related to paid products or paid
              access will not exceed the amount you paid to us for the
              specific product or offer giving rise to the claim
              during the twelve months preceding the event.
            </p>
            <p>
              <span className="font-medium text-foreground">
                Legal review recommended:
              </span>{' '}
              this limitation clause should be reviewed by counsel for
              enforceability in your main markets.
            </p>
          </Section>

          <Section title="17. Termination">
            <p>
              We may suspend or terminate access to the website,
              account areas, premium resources, or future commercial
              services if you materially breach these Terms or the
              applicable license.
            </p>
            <p>
              Sections relating to intellectual property, payment
              obligations, disclaimers, liability, and governing law
              will survive termination where applicable.
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
            <p>
              <span className="font-medium text-foreground">
                Legal review recommended:
              </span>{' '}
              choose whether you want a specific court venue clause or
              a mediation / arbitration clause for international B2B
              disputes.
            </p>
          </Section>

          <Section title="19. Changes to these Terms">
            <p>
              We may update these Terms from time to time. The “Last
              updated” date reflects the current version.
            </p>
            <p>
              Material changes may also be reflected through the
              relevant sales page, access page, or checkout flow for
              the applicable product or offer.
            </p>
          </Section>

          <Card className="rounded-[5px] border border-border-subtle bg-surface shadow-medium">
            <CardContent className="p-6 sm:p-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Need product usage details?
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Review licensing scope and privacy policy.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
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
        </section>
      </div>
    </Container>
  );
}
