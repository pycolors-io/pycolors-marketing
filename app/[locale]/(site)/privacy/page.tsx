import { localizePageMetadata } from "@/lib/i18n/metadata";
import { SiteText } from "@/components/site-text";
import { useCopy } from "@/lib/i18n/use-copy";
import type { Metadata } from "next";
import { Link } from "@/lib/i18n/navigation";
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
import { PrivacyConsentSettings } from "@/components/privacy/privacy-consent-banner";
import {
  LEGAL_COMPANY as COMPANY,
  LEGAL_REVISION,
} from "@/lib/products/commercial-policy";
import styles from "@/components/marketing/legal-page.module.css";
import privacyStyles from "@/components/marketing/privacy-page.module.css";

const metadata: Metadata = {
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

const sections = [
  {
    id: "controller",
    title: "1. Controller",
    content: (
      <>
        <p>
          <SiteText
            text={
              "The data controller for pycolors.io and related commercial operations described in this policy is"
            }
          />
          {<SiteText text={" "} />}
          <span className="font-medium text-foreground">
            {<SiteText text={COMPANY.name} />}
          </span>
          ,{<SiteText text={" "} />}
          {<SiteText text={COMPANY.addressLine1} />},{" "}
          {<SiteText text={COMPANY.postalCode} />},{" "}
          {<SiteText text={COMPANY.country} />}.
        </p>
        <p>
          <SiteText text={"Company registration: "} />
          {<SiteText text={COMPANY.registration} />}
          <SiteText text={". SIREN: "} />
          {<SiteText text={COMPANY.siren} />}
          <SiteText text={". Full company identifiers are available in the"} />
          {<SiteText text={" "} />}
          <Link className={styles.inlineLink} href="/terms#terms-company">
            <SiteText text={"company details"} />
          </Link>
          .
        </p>

        <p>
          <SiteText
            text={
              "Privacy, product, commercial usage, and support requests can be sent to"
            }
          />
          {<SiteText text={" "} />}
          <a className={styles.inlineLink} href={`mailto:${COMPANY.email}`}>
            {<SiteText text={COMPANY.email} />}
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
        <p>
          <SiteText
            text={"This policy covers personal data processed through:"}
          />
        </p>

        <ul className={styles.clauses}>
          <li>
            <SiteText text={"the public website at pycolors.io;"} />
          </li>
          <li>
            <SiteText
              text={
                "documentation, guides, examples, blog posts, roadmap, and changelog pages;"
              }
            />
          </li>
          <li>
            <SiteText
              text={
                "contact forms, support requests, product inquiries, and email communications;"
              }
            />
          </li>
          <li>
            <SiteText
              text={
                "analytics and technical measurement used to improve the website and products;"
              }
            />
          </li>
          <li>
            <SiteText
              text={
                "premium product purchases, checkout flows, invoices, order recovery, and digital delivery;"
              }
            />
          </li>
          <li>
            <SiteText
              text={
                "the public Starter Pro demo at pro-demo.pycolors.io, including its temporary workspace and session;"
              }
            />
          </li>
        </ul>

        <p>
          <SiteText
            text={
              "When you deploy purchased source in your own accounts, you control that application's data and providers. This policy describes the services operated by PyColors; it does not replace the privacy information for your own product."
            }
          />
        </p>

        <p>
          <SiteText
            text={
              "Third-party providers used for payments, hosting, analytics, email, or storage may also process personal data under their own privacy policies."
            }
          />
        </p>
      </>
    ),
  },
  {
    id: "data",
    title: "3. Data we may collect",
    content: (
      <>
        <p>
          <SiteText
            text={
              "A project brief includes your name, email, selected service, indicative budget and description. Company and desired timeline are optional. We use these details to assess and respond to the request; do not include credentials or confidential customer data."
            }
          />
        </p>
        <p>
          <SiteText
            text={
              "The public demo creates a temporary generated identity and workspace. Changes you make to example projects, tasks or comments are stored in that workspace. Session cookies, workspace identifiers and derived address keys support access and abuse prevention. Do not enter real personal, payment or confidential data in the demo."
            }
          />
        </p>
        <ul className={styles.clauses}>
          <li>
            <span className="font-medium text-foreground">
              <SiteText text={"Contact data"} />
            </span>
            {<SiteText text={" "} />}
            <SiteText
              text={
                "such as name, email address, company name, and the content of messages you send."
              }
            />
          </li>

          <li>
            <span className="font-medium text-foreground">
              <SiteText text={"Usage data"} />
            </span>{" "}
            <SiteText
              text={
                " such as pages viewed, browser type, device type, referral source, approximate region, interactions, and analytics events."
              }
            />
          </li>

          <li>
            <span className="font-medium text-foreground">
              <SiteText text={"Transaction data"} />
            </span>
            {<SiteText text={" "} />}
            <SiteText
              text={
                "such as product purchased, order status, billing metadata, invoice information, tax-related metadata, payment provider identifiers, and download or claim status."
              }
            />
          </li>

          <li>
            <span className="font-medium text-foreground">
              <SiteText text={"Account or access data"} />
            </span>
            {<SiteText text={" "} />}
            <SiteText
              text={
                "such as login identifiers, customer identifiers, role information, product entitlement, access token state, or subscription status if account features are used."
              }
            />
          </li>

          <li>
            <span className="font-medium text-foreground">
              <SiteText text={"Technical and security data"} />
            </span>
            {<SiteText text={" "} />}
            <SiteText
              text={
                "such as logs, IP-related security signals, error diagnostics, anti-abuse signals, and operational telemetry."
              }
            />
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
        <p>
          <SiteText text={"We may collect data:"} />
        </p>

        <ul className={styles.clauses}>
          <li>
            <SiteText
              text={
                "directly from you when you contact us, request support, or make a purchase;"
              }
            />
          </li>
          <li>
            <SiteText
              text={
                "automatically when you browse the website or interact with product pages;"
              }
            />
          </li>
          <li>
            <SiteText
              text={
                "from payment and commerce providers when a checkout, payment, refund, invoice, or dispute is created;"
              }
            />
          </li>
          <li>
            <SiteText
              text={
                "from hosting, analytics, email, storage, or infrastructure providers used to operate PyColors."
              }
            />
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
        <p>
          <SiteText text={"We may use personal data to:"} />
        </p>

        <ul className={styles.clauses}>
          <li>
            <SiteText
              text={
                "operate, maintain, and secure the website and product infrastructure;"
              }
            />
          </li>
          <li>
            <SiteText
              text={
                "deliver digital products, downloads, order access, and customer support;"
              }
            />
          </li>
          <li>
            <SiteText
              text={
                "process purchases, taxes, invoices, refunds, disputes, and billing operations;"
              }
            />
          </li>
          <li>
            <SiteText
              text={"respond to inquiries and manage customer relationships;"}
            />
          </li>
          <li>
            <SiteText
              text={
                "improve messaging, conversion flows, documentation, product quality, and roadmap decisions;"
              }
            />
          </li>
          <li>
            <SiteText
              text={
                "measure demand, traffic, product interest, and growth across the PyColors ecosystem;"
              }
            />
          </li>
          <li>
            <SiteText
              text={
                "prevent fraud, abuse, unauthorized sharing, license misuse, and security risks;"
              }
            />
          </li>
          <li>
            <SiteText
              text={
                "comply with legal, tax, accounting, and business obligations."
              }
            />
          </li>
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
          <SiteText
            text={
              "Depending on the context, PyColors may process personal data based on:"
            }
          />
        </p>

        <ul className={styles.clauses}>
          <li>
            <SiteText text={"your consent, where required;"} />
          </li>
          <li>
            <SiteText
              text={
                "performance of a contract or steps taken at your request before entering into a contract;"
              }
            />
          </li>
          <li>
            <SiteText
              text={
                "legitimate interests, including operating, securing, improving, and commercializing PyColors;"
              }
            />
          </li>
          <li>
            <SiteText
              text={
                "compliance with legal obligations, including tax, accounting, and fraud prevention requirements."
              }
            />
          </li>
        </ul>
        <p>
          <SiteText
            text={
              "Responding to a requested quote is a pre-contractual step; fulfilling an order and providing its support are contractual purposes. Billing records may also be required for legal obligations. Access controls and abuse prevention support our legitimate interest in securing the service. Optional Google tags use the browser choice described below."
            }
          />
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "7. Cookies and analytics",
    content: (
      <>
        <p>
          <SiteText
            text={
              "Browser storage remembers your light, dark or system theme, your colour palette and your optional Google tracking choice. These preferences remain in that browser until you change them or clear site data. Demo session and workspace cookies provide access to the temporary workspace."
            }
          />
        </p>

        <p>
          <SiteText
            text={"Audience measurement and optional Google tags are separate:"}
          />
        </p>

        <ul className={styles.clauses}>
          <li>
            <SiteText
              text={
                "Vercel Web Analytics provides aggregated page-view measurement and is loaded separately from the optional Google tag controls. Vercel documents its cookie-free measurement and the data involved in its"
              }
            />
            {<SiteText text={" "} />}
            <a
              className={styles.inlineLink}
              href="https://vercel.com/docs/analytics/privacy-policy"
            >
              <SiteText text={"analytics privacy documentation"} />
            </a>
            <SiteText
              text={
                ". Rejecting optional Google tags does not disable this separate integration."
              }
            />
          </li>
          <li>
            <SiteText
              text={
                "Where Google Tag Manager is configured, it loads only after you choose Accept optional. Its configured tags may include Google Analytics. You can reopen this choice below and select Reject optional; after a previous acceptance the page reloads to unload the previously loaded tags. This does not erase data already sent."
              }
            />
          </li>
        </ul>

        <p>
          <SiteText
            text={
              "Where legally required, optional analytics or non-essential cookies should only be activated after appropriate consent."
            }
          />
        </p>
        <PrivacyConsentSettings />
      </>
    ),
  },
  {
    id: "payments",
    title: "8. Payments and commerce providers",
    content: (
      <>
        <p>
          <SiteText
            text={
              "Payments are processed by third-party providers rather than directly by PyColors."
            }
          />
        </p>

        <ul className={styles.clauses}>
          <li>
            <span className="font-medium text-foreground">
              <SiteText text={"Stripe"} />
            </span>{" "}
            <SiteText
              text={
                " may process product purchases, invoices, payment status, customer records, taxes, refunds, and disputes."
              }
            />
          </li>

          <li>
            <SiteText
              text={
                "Other payment or commerce providers may be used for specific products, historical purchases, or future commercial offers."
              }
            />
          </li>
        </ul>

        <p>
          <SiteText
            text={
              "PyColors may receive transaction-related information from those providers, such as purchase confirmation, billing status, country, tax data, invoice data, refund state, dispute status, and product entitlement. PyColors does not store full payment card numbers on its servers."
            }
          />
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
          <SiteText
            text={
              "Paid products may be delivered through claim pages, download links, access tokens, customer emails, private storage, or order recovery flows."
            }
          />
        </p>

        <p>
          <SiteText
            text={
              "To provide and protect digital delivery, PyColors may process order identifiers, customer email, product entitlement, download token status, access logs, and related security signals."
            }
          />
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
          <SiteText
            text={
              "If you contact PyColors, purchase a product, request support, or use a product access flow, we may send transactional, operational, onboarding, support, security, billing, or product-related emails."
            }
          />
        </p>

        <p>
          <SiteText
            text={
              "Resend handles transactional email delivery, including product access, recovery and project brief transmission. A submitted project brief is forwarded to PyColors with your email as the reply address. It is not a newsletter subscription. Marketing emails, if introduced, require their own applicable basis and unsubscribe controls."
            }
          />
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
          <SiteText
            text={
              "We may share personal data with service providers only where reasonably necessary to operate PyColors."
            }
          />
        </p>

        <p>
          <SiteText text={"These providers may include:"} />
        </p>

        <ul className={styles.clauses}>
          <li>
            <SiteText
              text={
                "Vercel for hosting, private download storage and Web Analytics;"
              }
            />
          </li>
          <li>
            <SiteText
              text={
                "Google for configured optional tags after the recorded choice;"
              }
            />
          </li>
          <li>
            <SiteText text={"payment and billing providers, such as Stripe;"} />
          </li>
          <li>
            <SiteText
              text={
                "Resend for transactional email and project brief transmission;"
              }
            />
          </li>
          <li>
            <SiteText
              text={
                "Neon for the isolated public Pro demo's PostgreSQL database;"
              }
            />
          </li>
          <li>
            <SiteText
              text={"storage, logging, security, and operational providers;"}
            />
          </li>
          <li>
            <SiteText
              text={
                "professional advisors where required for accounting, legal, tax, or compliance purposes."
              }
            />
          </li>
        </ul>

        <p>
          <SiteText
            text={
              "We do not sell personal data in the ordinary meaning of that term."
            }
          />
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
          <SiteText
            text={
              "PyColors is based in France and may serve users internationally. Some service providers may process data outside your country of residence, including outside the European Economic Area."
            }
          />
        </p>

        <p>
          <SiteText
            text={
              "Where required, PyColors aims to rely on appropriate transfer mechanisms such as contractual safeguards provided by the relevant vendor."
            }
          />
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
          <SiteText
            text={
              "We retain personal data only for as long as reasonably necessary for the purposes described in this policy, including support, security, contractual, tax, legal, accounting, and anti-fraud needs."
            }
          />
        </p>

        <ul className={styles.clauses}>
          <li>
            <SiteText
              text={
                "project briefs and correspondence are kept while assessing and responding to the request, then where needed for an agreed engagement, support or a dispute. The submitted email and provider delivery records are separate from the temporary request-limiting counters;"
              }
            />
          </li>
          <li>
            <SiteText
              text={
                "transaction records may be retained for accounting, tax, fraud prevention, and legal compliance;"
              }
            />
          </li>
          <li>
            <SiteText
              text={
                "download and access data may be retained to provide order recovery and protect paid products;"
              }
            />
          </li>
          <li>
            <SiteText
              text={
                "analytics and infrastructure logs follow the configured provider retention. This page does not equate a provider's visitor-session lifetime with deletion of its aggregate statistics;"
              }
            />
          </li>
          <li>
            <SiteText
              text={
                "account or entitlement data may be retained while access remains active and for a reasonable period afterward."
              }
            />
          </li>
        </ul>
        <p>
          <SiteText
            text={
              "Public Pro demo access expires after two hours. Expired workspaces and their generated identities are eligible for the next cleanup run; removal is not guaranteed at the exact expiry instant. The cleanup also removes demo-start rate-limit records older than 24 hours. Infrastructure logs and provider backups have separate retention."
            }
          />
        </p>
        <p>
          <SiteText
            text={
              "Quote-request rate-limit counters are held in application-instance memory, use derived address and email keys, and expire after 15 minutes. Expired counters are discarded when subsequent requests are processed; restarting an instance also clears them. This is not the retention period of your emailed project brief. Contact us for a deletion request or details of the retention applicable to your case."
            }
          />
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "14. Security",
    content: (
      <>
        <p>
          <SiteText
            text={
              "We use reasonable technical and organizational measures to protect personal data, including access controls, secure providers, operational monitoring, and security practices appropriate for a small digital product business."
            }
          />
        </p>

        <p>
          <SiteText
            text={
              "No method of transmission or storage is completely secure. You should also protect your own devices, credentials, deployment environments, and downloaded source code."
            }
          />
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
          <SiteText
            text={
              "Depending on your location, you may have rights such as access, correction, deletion, restriction, objection, portability, and withdrawal of consent where consent is the basis for processing."
            }
          />
        </p>

        <p>
          <SiteText text={"To exercise your rights, contact"} />
          {<SiteText text={" "} />}
          <a className={styles.inlineLink} href={`mailto:${COMPANY.email}`}>
            {<SiteText text={COMPANY.email} />}
          </a>
          .
        </p>

        <p>
          <SiteText
            text={
              "You may also have the right to lodge a complaint with a data protection authority, including the"
            }
          />
          {<SiteText text={" "} />}
          <a
            className={styles.inlineLink}
            href="https://www.cnil.fr/fr/plaintes"
          >
            <SiteText text={"CNIL"} />
          </a>
          {<SiteText text={" "} />}
          <SiteText text={"in France."} />
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
          <SiteText
            text={
              "PyColors products and services are intended for professionals, founders, developers, agencies, product teams, and business users. They are not directed to children."
            }
          />
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
          <SiteText
            text={
              "We may update this Privacy Policy from time to time to reflect product evolution, legal requirements, provider changes, new checkout flows, new account features, or new commercial products."
            }
          />
        </p>

        <p>
          <SiteText
            text={"The “Last updated” date reflects the current version."}
          />
        </p>
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
  const tSite = useCopy();

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
              title={tSite("Privacy Policy")}
              description={tSite(
                "This Privacy Policy explains what personal data PyColors may collect, how it is used, when it may be shared, and what rights you may have when using the website, documentation, products, checkout flows, downloads, and support channels.",
              )}
              actions={
                <>
                  <MarketingLinkButton>
                    <a href="#privacy-document">
                      {tSite("Read the policy")}
                      <ArrowDown size={16} aria-hidden="true" />
                    </a>
                  </MarketingLinkButton>
                  <a href="#privacy-rights" className={styles.textLink}>
                    {tSite("Your privacy rights")}
                    <ArrowRight size={14} aria-hidden="true" />
                  </a>
                </>
              }
            />
            <aside
              aria-label={tSite("Privacy document information")}
              className={`${styles.documentInfo} ${privacyStyles.documentInfo}`}
            >
              <FileText size={20} className="text-primary" aria-hidden="true" />
              <dl className="mt-6 space-y-5">
                <div>
                  <dt>{tSite("Last updated")}</dt>
                  <dd>
                    <time dateTime={LEGAL_REVISION.date}>
                      {tSite(LEGAL_REVISION.label)}
                    </time>
                  </dd>
                </div>
                <div>
                  <dt>{tSite("Data controller")}</dt>
                  <dd>{tSite(COMPANY.name)}</dd>
                </div>
                <div>
                  <dt>{tSite("Contact")}</dt>
                  <dd>
                    <a
                      href={`mailto:${COMPANY.email}`}
                      className={privacyStyles.documentEmail}
                    >
                      {tSite(COMPANY.email)}
                    </a>
                  </dd>
                </div>
              </dl>
            </aside>
          </div>

          <nav
            aria-label={tSite("Find a topic in the privacy policy")}
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
                  <span className="block text-sm font-medium">
                    {tSite(title)}
                  </span>
                  <span className="mt-1 block text-xs leading-6 text-muted-foreground">
                    {tSite(description)}
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
                {tSite("On this page")}
              </p>
              <p
                id="privacy-navigation-hint"
                className="mb-4 text-[11px] leading-5 text-muted-foreground"
              >
                {tSite("Scroll to browse all 17 sections.")}
              </p>
              <nav
                aria-label={tSite("Privacy sections")}
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
                          {tSite(String(index + 1).padStart(2, "0"))}
                        </span>
                        <span>
                          {tSite(section.title.split(". ").slice(1).join(". "))}
                        </span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
              <div className={styles.sidebarContact}>
                <p className="text-xs text-muted-foreground">
                  {tSite("Privacy question or request?")}
                </p>
                <a href="#privacy-contact" className={styles.textLink}>
                  {tSite("Contact PyColors")}
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
                  <h2 id={`privacy-${section.id}-heading`}>
                    {tSite(section.title)}
                  </h2>
                  <div className={styles.sectionContent}>
                    {tSite(section.content)}
                  </div>
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
                  {tSite("A question about your data?")}
                </h2>
                <p>
                  {tSite(
                    "Privacy, product, commercial usage, and support requests can be sent to",
                  )}
                  {tSite(" ")}
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className={styles.emailLink}
                  >
                    {tSite(COMPANY.email)}
                  </a>
                  .
                </p>
                <a href="#privacy-rights" className={styles.textLink}>
                  {tSite("Review your rights")}
                  <ArrowRight size={14} aria-hidden="true" />
                </a>
              </section>

              <section
                aria-labelledby="privacy-related-heading"
                className={`${styles.legalSection} ${privacyStyles.related}`}
              >
                <h2 id="privacy-related-heading">
                  {tSite("Need rules for commercial usage and purchases?")}
                </h2>
                <p>
                  {tSite(
                    "Review the Terms and License pages before using PyColors products in production or client work.",
                  )}
                </p>
                <nav
                  aria-label={tSite("Related legal pages")}
                  className="mt-4 flex flex-wrap gap-x-6 gap-y-1"
                >
                  <Link href="/terms" className={styles.textLink}>
                    {tSite("Terms of Service")}
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                  <Link href="/license" className={styles.textLink}>
                    {tSite("Commercial license")}
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </nav>
                <p className={privacyStyles.footnote}>
                  {tSite(
                    "Product-specific checkout pages, invoices, license files, and written agreements may include additional or more specific information.",
                  )}
                </p>
              </section>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return localizePageMetadata(metadata, "/privacy", locale);
}
