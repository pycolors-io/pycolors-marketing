import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  Cookie,
  Database,
  FileText,
  Mail,
  ShieldCheck,
} from "lucide-react";

import { Container } from "@/components/container";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { PageHero } from "@/components/marketing/page-hero";
import { MarketingLinkButton } from "@/components/marketing/cta-panel";
import styles from "@/components/marketing/legal-page.module.css";
import privacyStyles from "@/components/marketing/privacy-page.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy for SaaS Products & Developer Tools",
  description:
    "Learn how PyColors collects, uses, stores, and protects data across SaaS products, developer tools, templates, starters, checkout flows, analytics, downloads, and support operations.",
  alternates: {
    canonical: "/privacy",
  },

  openGraph: {
    title: "Privacy Policy for SaaS Products & Developer Tools",
    description:
      "Understand how PyColors handles privacy, analytics, payments, digital delivery, support, account systems, and developer platform operations.",
    url: "/privacy",
    siteName: "PyColors",
    type: "website",
    images: ["/seo/og-main.png"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy for SaaS Products & Developer Tools",
    description:
      "Privacy and data handling for PyColors SaaS products, templates, starters, developer tools, and checkout systems.",
    images: ["/seo/twitter-main.png"],
  },
};

const COMPANY = {
  name: "Py Colors SASU",
  email: "contact@pycolors.io",
  addressLine1: "6 rue d’Armaillé",
  postalCode: "75017 Paris",
  country: "France",
};

const LAST_UPDATED = "May 14, 2026";

const sections = [
  {
    id: "controller",
    title: "1. Controller",
    content: (
      <>
        <p>
          The data controller for pycolors.io and related commercial operations
          described in this policy is{" "}
          <span className="font-medium text-foreground">{COMPANY.name}</span>,{" "}
          {COMPANY.addressLine1}, {COMPANY.postalCode}, {COMPANY.country}.
        </p>

        <p>
          Privacy, product, commercial usage, and support requests can be sent
          to{" "}
          <a className={styles.inlineLink} href={`mailto:${COMPANY.email}`}>
            {COMPANY.email}
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "scope",
    title: "2. What this policy covers",
    content: (
      <>
        <p>This policy covers personal data processed through:</p>

        <ul className={styles.clauses}>
          <li>the public website at pycolors.io;</li>
          <li>
            documentation, guides, examples, blog posts, roadmap, and changelog
            pages;
          </li>
          <li>
            contact forms, support requests, product inquiries, and email
            communications;
          </li>
          <li>
            analytics and technical measurement used to improve the website and
            products;
          </li>
          <li>
            premium product purchases, checkout flows, invoices, order recovery,
            and digital delivery;
          </li>
          <li>
            future account areas, customer portals, download pages, or premium
            access systems operated by PyColors.
          </li>
        </ul>

        <p>
          Third-party providers used for payments, hosting, analytics, email, or
          storage may also process personal data under their own privacy
          policies.
        </p>
      </>
    ),
  },
  {
    id: "data",
    title: "3. Data we may collect",
    content: (
      <>
        <ul className={styles.clauses}>
          <li>
            <span className="font-medium text-foreground">Contact data</span>{" "}
            such as name, email address, company name, and the content of
            messages you send.
          </li>

          <li>
            <span className="font-medium text-foreground">Usage data</span> such
            as pages viewed, browser type, device type, referral source,
            approximate region, interactions, and analytics events.
          </li>

          <li>
            <span className="font-medium text-foreground">
              Transaction data
            </span>{" "}
            such as product purchased, order status, billing metadata, invoice
            information, tax-related metadata, payment provider identifiers, and
            download or claim status.
          </li>

          <li>
            <span className="font-medium text-foreground">
              Account or access data
            </span>{" "}
            such as login identifiers, customer identifiers, role information,
            product entitlement, access token state, or subscription status if
            account features are used.
          </li>

          <li>
            <span className="font-medium text-foreground">
              Technical and security data
            </span>{" "}
            such as logs, IP-related security signals, error diagnostics,
            anti-abuse signals, and operational telemetry.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "collection",
    title: "4. How we collect data",
    content: (
      <>
        <p>We may collect data:</p>

        <ul className={styles.clauses}>
          <li>
            directly from you when you contact us, request support, or make a
            purchase;
          </li>
          <li>
            automatically when you browse the website or interact with product
            pages;
          </li>
          <li>
            from payment and commerce providers when a checkout, payment,
            refund, invoice, or dispute is created;
          </li>
          <li>
            from hosting, analytics, email, storage, or infrastructure providers
            used to operate PyColors.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "purposes",
    title: "5. Why we use personal data",
    content: (
      <>
        <p>We may use personal data to:</p>

        <ul className={styles.clauses}>
          <li>
            operate, maintain, and secure the website and product
            infrastructure;
          </li>
          <li>
            deliver digital products, downloads, order access, and customer
            support;
          </li>
          <li>
            process purchases, taxes, invoices, refunds, disputes, and billing
            operations;
          </li>
          <li>respond to inquiries and manage customer relationships;</li>
          <li>
            improve messaging, conversion flows, documentation, product quality,
            and roadmap decisions;
          </li>
          <li>
            measure demand, traffic, product interest, and growth across the
            PyColors ecosystem;
          </li>
          <li>
            prevent fraud, abuse, unauthorized sharing, license misuse, and
            security risks;
          </li>
          <li>comply with legal, tax, accounting, and business obligations.</li>
        </ul>
      </>
    ),
  },
  {
    id: "legal-bases",
    title: "6. Legal bases",
    content: (
      <>
        <p>
          Depending on the context, PyColors may process personal data based on:
        </p>

        <ul className={styles.clauses}>
          <li>your consent, where required;</li>
          <li>
            performance of a contract or steps taken at your request before
            entering into a contract;
          </li>
          <li>
            legitimate interests, including operating, securing, improving, and
            commercializing PyColors;
          </li>
          <li>
            compliance with legal obligations, including tax, accounting, and
            fraud prevention requirements.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "cookies",
    title: "7. Cookies and analytics",
    content: (
      <>
        <p>
          PyColors may use cookies or similar technologies for site
          functionality, analytics, performance monitoring, conversion
          measurement, security, and abuse prevention.
        </p>

        <p>Current or future tools may include:</p>

        <ul className={styles.clauses}>
          <li>Vercel for hosting and infrastructure-related telemetry;</li>
          <li>
            Google Analytics or similar analytics tools for traffic and product
            measurement;
          </li>
          <li>
            strictly necessary cookies or storage required for checkout, account
            access, download flows, or security.
          </li>
        </ul>

        <p>
          Where legally required, optional analytics or non-essential cookies
          should only be activated after appropriate consent.
        </p>
      </>
    ),
  },
  {
    id: "payments",
    title: "8. Payments and commerce providers",
    content: (
      <>
        <p>
          Payments are processed by third-party providers rather than directly
          by PyColors.
        </p>

        <ul className={styles.clauses}>
          <li>
            <span className="font-medium text-foreground">Stripe</span> may
            process product purchases, invoices, payment status, customer
            records, taxes, refunds, and disputes.
          </li>

          <li>
            Other payment or commerce providers may be used for specific
            products, historical purchases, or future commercial offers.
          </li>
        </ul>

        <p>
          PyColors may receive transaction-related information from those
          providers, such as purchase confirmation, billing status, country, tax
          data, invoice data, refund state, dispute status, and product
          entitlement. PyColors does not store full payment card numbers on its
          servers.
        </p>
      </>
    ),
  },
  {
    id: "delivery",
    title: "9. Digital delivery and downloads",
    content: (
      <>
        <p>
          Paid products may be delivered through claim pages, download links,
          access tokens, customer emails, private storage, or order recovery
          flows.
        </p>

        <p>
          To provide and protect digital delivery, PyColors may process order
          identifiers, customer email, product entitlement, download token
          status, access logs, and related security signals.
        </p>
      </>
    ),
  },
  {
    id: "email",
    title: "10. Email communications",
    content: (
      <>
        <p>
          If you contact PyColors, purchase a product, request support, or use a
          product access flow, we may send transactional, operational,
          onboarding, support, security, billing, or product-related emails.
        </p>

        <p>
          Email delivery may be handled by third-party email providers.
          Marketing emails, if introduced, should include unsubscribe options
          where required by law.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "11. Data sharing",
    content: (
      <>
        <p>
          We may share personal data with service providers only where
          reasonably necessary to operate PyColors.
        </p>

        <p>These providers may include:</p>

        <ul className={styles.clauses}>
          <li>hosting and deployment providers, such as Vercel;</li>
          <li>
            analytics providers, such as Google Analytics or similar tools;
          </li>
          <li>payment and billing providers, such as Stripe;</li>
          <li>email delivery and communication providers;</li>
          <li>storage, logging, security, and operational providers;</li>
          <li>
            professional advisors where required for accounting, legal, tax, or
            compliance purposes.
          </li>
        </ul>

        <p>
          We do not sell personal data in the ordinary meaning of that term.
        </p>
      </>
    ),
  },
  {
    id: "transfers",
    title: "12. International data transfers",
    content: (
      <>
        <p>
          PyColors is based in France and may serve users internationally. Some
          service providers may process data outside your country of residence,
          including outside the European Economic Area.
        </p>

        <p>
          Where required, PyColors aims to rely on appropriate transfer
          mechanisms such as contractual safeguards provided by the relevant
          vendor.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "13. Retention",
    content: (
      <>
        <p>
          We retain personal data only for as long as reasonably necessary for
          the purposes described in this policy, including support, security,
          contractual, tax, legal, accounting, and anti-fraud needs.
        </p>

        <ul className={styles.clauses}>
          <li>
            contact messages may be retained to manage support and customer
            history;
          </li>
          <li>
            transaction records may be retained for accounting, tax, fraud
            prevention, and legal compliance;
          </li>
          <li>
            download and access data may be retained to provide order recovery
            and protect paid products;
          </li>
          <li>
            analytics data may be retained according to the settings of the
            applicable analytics provider;
          </li>
          <li>
            account or entitlement data may be retained while access remains
            active and for a reasonable period afterward.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "security",
    title: "14. Security",
    content: (
      <>
        <p>
          We use reasonable technical and organizational measures to protect
          personal data, including access controls, secure providers,
          operational monitoring, and security practices appropriate for a small
          digital product business.
        </p>

        <p>
          No method of transmission or storage is completely secure. You should
          also protect your own devices, credentials, deployment environments,
          and downloaded source code.
        </p>
      </>
    ),
  },
  {
    id: "rights",
    title: "15. Your rights",
    content: (
      <>
        <p>
          Depending on your location, you may have rights such as access,
          correction, deletion, restriction, objection, portability, and
          withdrawal of consent where consent is the basis for processing.
        </p>

        <p>
          To exercise your rights, contact{" "}
          <a className={styles.inlineLink} href={`mailto:${COMPANY.email}`}>
            {COMPANY.email}
          </a>
          .
        </p>

        <p>
          You may also have the right to lodge a complaint with a data
          protection authority.
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "16. Children",
    content: (
      <>
        <p>
          PyColors products and services are intended for professionals,
          founders, developers, agencies, product teams, and business users.
          They are not directed to children.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "17. Changes to this policy",
    content: (
      <>
        <p>
          We may update this Privacy Policy from time to time to reflect product
          evolution, legal requirements, provider changes, new checkout flows,
          new account features, or new commercial products.
        </p>

        <p>The “Last updated” date reflects the current version.</p>
      </>
    ),
  },
] as const;

const topics = [
  {
    id: "data",
    title: "Data & purposes",
    description: "What may be collected and how it is used",
    icon: Database,
  },
  {
    id: "cookies",
    title: "Cookies & analytics",
    description: "Technologies, measurement, and consent",
    icon: Cookie,
  },
  {
    id: "rights",
    title: "Your rights",
    description: "Your options and how to contact us",
    icon: ShieldCheck,
  },
] as const;

export default function PrivacyPage() {
  return (
    <main
      id="content"
      tabIndex={-1}
      className={`${styles.page} ${privacyStyles.page}`}
    >
      <Container className="pb-16 pt-24 sm:pb-20 sm:pt-28">
        <div className="w-full min-w-0">
          <Breadcrumb
            className={`mb-8 ${styles.breadcrumb}`}
            items={[
              { label: "Home", href: "/" },
              { label: "Privacy", href: "/privacy" },
            ]}
          />
          <div className={styles.heroLayout}>
            <PageHero
              variant="compact"
              align="left"
              className={styles.hero}
              badges={[
                {
                  label: "Privacy & data",
                  icon: <ShieldCheck size={14} aria-hidden="true" />,
                },
              ]}
              title="Privacy Policy"
              description="This Privacy Policy explains what personal data PyColors may collect, how it is used, when it may be shared, and what rights you may have when using the website, documentation, products, checkout flows, downloads, and support channels."
              actions={
                <>
                  <MarketingLinkButton>
                    <a href="#privacy-document">
                      Read the policy
                      <ArrowDown size={16} aria-hidden="true" />
                    </a>
                  </MarketingLinkButton>
                  <a href="#privacy-rights" className={styles.textLink}>
                    Your privacy rights
                    <ArrowRight size={14} aria-hidden="true" />
                  </a>
                </>
              }
            />
            <aside
              aria-label="Privacy document information"
              className={`${styles.documentInfo} ${privacyStyles.documentInfo}`}
            >
              <FileText size={20} className="text-primary" aria-hidden="true" />
              <dl className="mt-6 space-y-5">
                <div>
                  <dt>Last updated</dt>
                  <dd>
                    <time dateTime="2026-05-14">{LAST_UPDATED}</time>
                  </dd>
                </div>
                <div>
                  <dt>Data controller</dt>
                  <dd>{COMPANY.name}</dd>
                </div>
                <div>
                  <dt>Contact</dt>
                  <dd>
                    <a
                      href={`mailto:${COMPANY.email}`}
                      className={privacyStyles.documentEmail}
                    >
                      {COMPANY.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </aside>
          </div>

          <nav
            aria-label="Find a topic in the privacy policy"
            className={styles.productNav}
          >
            {topics.map(({ id, title, description, icon: Icon }) => (
              <a
                key={id}
                href={`#privacy-${id}`}
                className={styles.productLink}
              >
                <span className={styles.iconFrame}>
                  <Icon size={16} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium">{title}</span>
                  <span className="mt-1 block text-xs leading-6 text-muted-foreground">
                    {description}
                  </span>
                </span>
                <ArrowRight
                  className="ml-auto size-3.5 shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
              </a>
            ))}
          </nav>

          <div
            id="privacy-document"
            tabIndex={-1}
            className={`${styles.readingLayout} ${privacyStyles.readingLayout}`}
          >
            <aside className={styles.sidebar}>
              <p className="mb-2 flex items-center gap-2 text-xs font-semibold">
                <FileText
                  size={14}
                  className="text-muted-foreground"
                  aria-hidden="true"
                />
                On this page
              </p>
              <p
                id="privacy-navigation-hint"
                className="mb-4 text-[11px] leading-5 text-muted-foreground"
              >
                Scroll to browse all 17 sections.
              </p>
              <nav
                aria-label="Privacy sections"
                aria-describedby="privacy-navigation-hint"
                tabIndex={0}
                className={styles.longToc}
              >
                <ol className={styles.toc}>
                  {sections.map((section, index) => (
                    <li key={section.id}>
                      <a href={`#privacy-${section.id}`}>
                        <span
                          className="font-mono text-[10px] text-muted-foreground"
                          aria-hidden="true"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span>
                          {section.title.split(". ").slice(1).join(". ")}
                        </span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
              <div className={styles.sidebarContact}>
                <p className="text-xs text-muted-foreground">
                  Privacy question or request?
                </p>
                <a href="#privacy-contact" className={styles.textLink}>
                  Contact PyColors
                  <ArrowRight size={14} aria-hidden="true" />
                </a>
              </div>
            </aside>

            <div className={styles.licenseBody}>
              {sections.map((section) => (
                <section
                  key={section.id}
                  id={`privacy-${section.id}`}
                  tabIndex={-1}
                  aria-labelledby={`privacy-${section.id}-heading`}
                  className={styles.legalSection}
                >
                  <h2 id={`privacy-${section.id}-heading`}>{section.title}</h2>
                  <div className={styles.sectionContent}>{section.content}</div>
                </section>
              ))}

              <section
                id="privacy-contact"
                tabIndex={-1}
                aria-labelledby="privacy-contact-heading"
                className={`${styles.legalSection} ${styles.contactPanel}`}
              >
                <span className={styles.iconFrame}>
                  <Mail size={16} aria-hidden="true" />
                </span>
                <h2 id="privacy-contact-heading">
                  A question about your data?
                </h2>
                <p>
                  Privacy, product, commercial usage, and support requests can
                  be sent to{" "}
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className={styles.emailLink}
                  >
                    {COMPANY.email}
                  </a>
                  .
                </p>
                <a href="#privacy-rights" className={styles.textLink}>
                  Review your rights
                  <ArrowRight size={14} aria-hidden="true" />
                </a>
              </section>

              <section
                aria-labelledby="privacy-related-heading"
                className={`${styles.legalSection} ${privacyStyles.related}`}
              >
                <h2 id="privacy-related-heading">
                  Need rules for commercial usage and purchases?
                </h2>
                <p>
                  Review the Terms and License pages before using PyColors
                  products in production or client work.
                </p>
                <nav
                  aria-label="Related legal pages"
                  className="mt-4 flex flex-wrap gap-x-6 gap-y-1"
                >
                  <Link href="/terms" className={styles.textLink}>
                    Terms of Service
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                  <Link href="/license" className={styles.textLink}>
                    Commercial license
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </nav>
                <p className={privacyStyles.footnote}>
                  Product-specific checkout pages, invoices, license files, and
                  written agreements may include additional or more specific
                  information.
                </p>
              </section>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
