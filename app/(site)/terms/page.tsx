import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  CreditCard,
  FileText,
  Layers3,
  Mail,
  Scale,
} from "lucide-react";
import { Container } from "@/components/container";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { PageHero } from "@/components/marketing/page-hero";
import { MarketingLinkButton } from "@/components/marketing/cta-panel";
import {
  LEGAL_REVISION,
  NA_AI_USAGE_SUMMARY,
  STARTER_PRO_USAGE_SUMMARY,
  PURCHASE_SUPPORT_SUMMARY,
} from "@/lib/products/commercial-policy";
import styles from "@/components/marketing/legal-page.module.css";

export const metadata: Metadata = {
  title: "Terms of Service for SaaS Products & Templates",
  description:
    "Terms of Service for PyColors covering SaaS products, templates, Starter Free, Starter Pro, public repositories, payments, licensing, digital downloads, and commercial usage.",
  alternates: {
    canonical: "/terms",
  },

  openGraph: {
    title: "Terms of Service for SaaS Products & Templates",
    description:
      "Review the Terms of Service governing PyColors templates, SaaS starters, open-source repositories, digital products, payments, licensing, and commercial usage.",
    url: "/terms",
    siteName: "PyColors",
    type: "website",
    images: ["/seo/og-main.png"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Terms of Service for SaaS Products & Templates",
    description:
      "Terms governing PyColors SaaS products, templates, developer tools, licensing, payments, and commercial usage.",
    images: ["/seo/twitter-main.png"],
  },
};

const COMPANY = {
  name: "Py Colors SASU",
  email: "contact@pycolors.com",
  addressLine1: "6 rue d’Armaillé",
  postalCode: "75017 Paris",
  country: "France",
};

const sections = [
  {
    id: "company",
    title: "1. Who we are",
    content: (
      <>
        <p>
          These Terms are provided by{" "}
          <span className="font-medium text-foreground">{COMPANY.name}</span>,
          located at {COMPANY.addressLine1}, {COMPANY.postalCode},{" "}
          {COMPANY.country}.
        </p>

        <p>
          Product, licensing, commercial usage, and support questions can be
          sent to{" "}
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
    title: "2. Scope of these Terms",
    content: (
      <>
        <p>These Terms apply to:</p>

        <ul className={styles.clauses}>
          <li>the public website at pycolors.io;</li>
          <li>
            documentation, guides, blog posts, examples, changelogs, and
            roadmaps;
          </li>
          <li>public repositories and public mirrors published by PyColors;</li>
          <li>Starter Free and other free PyColors resources;</li>
          <li>premium templates, including NA-AI Landing;</li>
          <li>Starter Pro and other paid source-code products;</li>
          <li>
            checkout flows, downloads, order recovery, and customer support
            interactions.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "acceptance",
    title: "3. Acceptance of the Terms",
    content: (
      <>
        <p>
          These Terms govern your use of the PyColors website and services. A
          purchase is subject to the product description, license, price, and
          commercial terms presented for that order. Keep a copy of those terms
          and your purchase documents.
        </p>
        <p>
          If you purchase or use a product on behalf of a company or another
          legal entity, you must be authorized to act for that entity. Browsing
          this website or accepting these Terms does not by itself waive
          statutory consumer rights.
        </p>
      </>
    ),
  },
  {
    id: "categories",
    title: "4. Product categories",
    content: (
      <>
        <p>
          PyColors offers different product categories. They do not all include
          the same rights, support, updates, or technical scope.
        </p>

        <ul className={styles.clauses}>
          <li>
            <span className="font-medium text-foreground">
              Open-source packages
            </span>{" "}
            are governed by their repository license.
          </li>
          <li>
            <span className="font-medium text-foreground">Starter Free</span> is
            a free product for SaaS UX validation and learning.
          </li>
          <li>
            <span className="font-medium text-foreground">
              Premium templates
            </span>{" "}
            are paid frontend templates delivered as digital source-code
            products.
          </li>
          <li>
            <span className="font-medium text-foreground">Starter Pro</span> is
            a paid SaaS foundation with commercial source-code access.
          </li>
        </ul>

        <p>
          The specific scope of a product is defined on the applicable product
          page, pricing page, checkout page, invoice, download page, or written
          order terms.
        </p>
      </>
    ),
  },
  {
    id: "access",
    title: "5. Accounts and access",
    content: (
      <>
        <p>
          Certain features may require a checkout session, order claim flow,
          download token, account, login, or email access.
        </p>

        <ul className={styles.clauses}>
          <li>You must provide accurate and current information.</li>
          <li>
            You are responsible for maintaining access to the email address used
            for purchase.
          </li>
          <li>
            You are responsible for activity under your account or access link
            unless caused by our own fault.
          </li>
          <li>
            We may restrict access if we reasonably believe there is fraud,
            abuse, non-payment, security risk, or violation of these Terms.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "open-source",
    title: "6. Open-source packages and public repositories",
    content: (
      <>
        <p>
          Public repositories such as PyColors UI, PyColors Tokens, Starter
          Free, and related mirrors may be available as open-source or public
          repositories.
        </p>

        <p>
          Their use is governed by the license included in the relevant
          repository. These Terms still apply to your use of the website,
          branding, documentation, commercial pages, support, and any paid
          products connected to the ecosystem.
        </p>

        <p>
          Open-source availability does not grant rights to paid products,
          private repositories, premium downloads, private assets, Starter Pro,
          or future commercial offers unless explicitly stated.
        </p>
      </>
    ),
  },
  {
    id: "templates",
    title: "7. Premium templates",
    content: (
      <>
        <p>
          NA-AI Landing is a commercial frontend template delivered as a
          downloadable source-code package. {NA_AI_USAGE_SUMMARY}
        </p>
        <p>
          It does not include backend APIs, authentication, database
          infrastructure, Stripe integration, managed hosting, or custom
          implementation. Any additional template is governed by its own product
          description and delivered license.
        </p>
        <p>
          See the{" "}
          <Link className={styles.inlineLink} href="/license#license-templates">
            template license
          </Link>{" "}
          for collaboration, client use, and redistribution rules.
        </p>
      </>
    ),
  },
  {
    id: "starter-pro",
    title: "8. Starter Pro",
    content: (
      <>
        <p>
          Starter Pro is a source-code foundation for building a SaaS product,
          with authentication, billing, database, protected routes, and setup
          documentation as described on its product page. It is not a hosted
          service or a finished SaaS business.
        </p>
        <p>{STARTER_PRO_USAGE_SUMMARY}</p>
        <p>
          You configure and operate your own application and third-party
          accounts. Your product logic, customer onboarding, security review,
          compliance, deployment, monitoring, and service costs remain your
          responsibility.
        </p>
        <p>
          See the{" "}
          <Link
            className={styles.inlineLink}
            href="/license#license-updates-support"
          >
            updates and support terms
          </Link>{" "}
          and the{" "}
          <Link
            className={styles.inlineLink}
            href="/docs/starter-pro/what-is-included"
          >
            included foundations
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    id: "payments",
    title: "9. Payments, taxes, and billing providers",
    content: (
      <>
        <p>
          The current NA-AI Landing and Starter Pro offers are one-time
          purchases. Buying either product does not create a recurring PyColors
          subscription. Hosting, databases, email, payment processing, and other
          services you use for your own project are separate costs.
        </p>
        <p>
          Payments are processed through Stripe. Review the product, currency,
          final amount, discounts, and any applicable taxes displayed at
          checkout before paying. A later price change does not change the price
          of an order already placed.
        </p>
        <p>
          Provide accurate billing and email details. For purchase documents or
          a billing correction, follow the{" "}
          <Link
            className={styles.inlineLink}
            href="/docs/starter-pro/purchase-documents"
          >
            purchase documents guide
          </Link>{" "}
          or contact{" "}
          <Link className={styles.inlineLink} href="/orders/support">
            purchase support
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    id: "delivery-refunds",
    title: "10. Digital delivery, refunds, and cancellations",
    content: (
      <>
        <h3>Delivery and missing access</h3>
        <p>
          After payment is confirmed and the order is processed, access is
          delivered through a secure link sent to the checkout email address.
          Use that link to claim and download the purchased package. A payment
          confirmation does not guarantee that the email has reached your inbox.
        </p>
        <p>
          If an access link is missing or expired, use{" "}
          <Link className={styles.inlineLink} href="/orders/recover">
            purchase recovery
          </Link>{" "}
          with the checkout email. If payment or access remains uncertain,
          contact{" "}
          <Link className={styles.inlineLink} href="/orders/support">
            purchase support
          </Link>{" "}
          before paying again. Recovery does not complete an unpaid checkout.
        </p>
        <h3>Consumer withdrawal rights</h3>
        <p>
          Where French consumer withdrawal rules apply, you normally have 14
          days from conclusion of the contract to withdraw without giving a
          reason. Digital delivery does not automatically remove this right.
          Other mandatory protections, including an extended deadline when
          required withdrawal information was not provided, remain applicable.
        </p>
        <p>
          For paid digital content supplied without a physical medium, the
          exception applies only if delivery begins before the withdrawal period
          ends, you have expressly consented in advance to that early supply,
          you have acknowledged that you will lose your withdrawal right, and
          confirmation of that agreement has been provided on a durable medium,
          such as email. Accepting these Terms alone is not that separate
          consent.
        </p>
        <h3>How to make a request</h3>
        <p>
          To withdraw where that right applies, send an unambiguous statement to{" "}
          <a className={styles.inlineLink} href="mailto:contact@pycolors.com">
            contact@pycolors.com
          </a>{" "}
          or to our postal address in section 1 before the applicable deadline.
          You may use the optional model below. Including your checkout email,
          product, and order reference, if available, helps us locate the order.
          No explanation is required to exercise a statutory withdrawal right.
        </p>
        <blockquote className={styles.requestTemplate}>
          <p>
            To: Py Colors SASU, 6 rue d’Armaillé, 75017 Paris, France;
            contact@pycolors.com.
          </p>
          <p>
            I hereby notify you that I withdraw from my contract for the
            following digital product: [product].
          </p>
          <p>
            Ordered on: [date]. Consumer name: [name]. Consumer address:
            [address].
          </p>
          <p>Date: [date]. Signature: [only if sent on paper].</p>
        </blockquote>
        <p>
          When a statutory withdrawal is validly exercised, reimbursement is due
          within 14 days of notification, using the original payment method
          unless you expressly agree otherwise, without reimbursement fees. For
          a duplicate payment, missing delivery, or a product problem, contact{" "}
          <Link className={styles.inlineLink} href="/orders/support">
            purchase support
          </Link>
          .
        </p>
        <p>
          Outside statutory rights or a specific written offer, these Terms do
          not promise a separate satisfaction or change-of-mind refund period.
          Nothing in these Terms excludes mandatory consumer rights that cannot
          be waived under applicable law. Conformity remedies in section 15
          remain separate from withdrawal.
        </p>
      </>
    ),
  },
  {
    id: "license",
    title: "11. License, intellectual property, and ownership",
    content: (
      <>
        <p>
          You receive a license to use the purchased PyColors source code;
          purchase does not transfer ownership of that underlying code or the
          PyColors brand. The{" "}
          <Link className={styles.inlineLink} href="/license">
            License page
          </Link>{" "}
          explains the product-specific rights and restrictions.
        </p>
        <p>
          You retain your rights in the original code, content, data, and
          branding you create. Incorporating PyColors code does not remove the
          conditions that apply to that code. Third-party and open-source
          components retain their own licenses and required notices.
        </p>
        <p>
          Paid-product restrictions do not replace or narrow the rights granted
          by an applicable open-source license. PyColors names, logos, and
          trademarks may not be used to imply an official affiliation without
          permission.
        </p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "12. Acceptable use",
    content: (
      <>
        <p>You must not:</p>

        <ul className={styles.clauses}>
          <li>
            resell, redistribute, leak, publish, or share paid source code,
            premium assets, private files, or download links in violation of the
            applicable license;
          </li>
          <li>
            create competing commercial templates, starters, UI kits,
            boilerplates, or downloadable products substantially based on paid
            PyColors products;
          </li>
          <li>
            use the website or products for unlawful, fraudulent, abusive, or
            harmful activity;
          </li>
          <li>
            attempt to interfere with platform security, availability, or
            integrity;
          </li>
          <li>
            scrape, crawl, or automate access in a way that harms operations or
            bypasses access controls;
          </li>
          <li>
            misrepresent PyColors products as your own framework, toolkit,
            starter, or commercial package for resale;
          </li>
          <li>
            use PyColors branding in a way that implies partnership,
            endorsement, or official origin without permission.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "third-parties",
    title: "13. Third-party services",
    content: (
      <>
        <p>
          PyColors may rely on third-party services for hosting, payments,
          analytics, email delivery, storage, deployment, and operations.
        </p>

        <p>
          Your use of features connected to those services may also be subject
          to the relevant third-party terms and policies.
        </p>
      </>
    ),
  },
  {
    id: "availability",
    title: "14. Availability and product changes",
    content: (
      <>
        <p>
          Website content, product descriptions, prices, and future offers may
          change. A later website edit does not by itself reduce the rights
          agreed for an existing purchase. Keep the license and terms supplied
          with your order.
        </p>
        <p>
          The continued availability of a product, download service, or public
          resource is not guaranteed indefinitely. Any change remains subject to
          existing contractual commitments and mandatory law. Changes to a
          roadmap do not turn unshipped features into a purchase entitlement.
        </p>
        <p>{PURCHASE_SUPPORT_SUMMARY}</p>
      </>
    ),
  },
  {
    id: "disclaimer",
    title: "15. Product responsibilities and consumer guarantees",
    content: (
      <>
        <p>
          You are responsible for evaluating the product against the published
          requirements and configuring it for your own technical, security,
          accessibility, operational, and business needs. Except for applicable
          contractual commitments and mandatory guarantees, the source code is
          provided on an “as is” and “as available” basis.
        </p>
        <p>
          If you buy as a consumer, mandatory legal guarantees remain
          applicable. Under the French legal guarantee of conformity for a
          one-time supply of digital content, the seller is responsible for
          non-conformity existing at supply and appearing within two years of
          that supply. This is distinct from optional future features or
          commercial support.
        </p>
        <p>
          You may request conformity without charge, undue delay, or significant
          inconvenience. A price reduction or termination may be available under
          the statutory conditions, including where conformity is refused or
          cannot be achieved as required. Contact{" "}
          <a className={styles.inlineLink} href="mailto:contact@pycolors.com">
            contact@pycolors.com
          </a>{" "}
          with the product and the problem encountered. Required conformity and
          security updates are not excluded by discretionary feature-update
          terms.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    title: "16. Limitation of liability",
    content: (
      <>
        <p>
          To the maximum extent permitted by law, Py Colors SASU will not be
          liable for indirect, incidental, special, consequential, punitive, or
          loss-of-profit damages, or for loss of data, business interruption, or
          loss of goodwill arising from or related to your use of the website or
          products.
        </p>

        <p>
          To the maximum extent permitted by law, our aggregate liability for
          any claim related to a paid product will not exceed the amount you
          paid to us for the specific product or offer giving rise to the claim
          during the twelve months preceding the event.
        </p>

        <p>
          Some jurisdictions do not allow certain limitations of liability. In
          that case, the limitation applies only to the maximum extent permitted
          by applicable law.
        </p>
      </>
    ),
  },
  {
    id: "termination",
    title: "17. Termination",
    content: (
      <>
        <p>
          We may suspend or terminate access to the website, account areas,
          downloads, premium resources, or future commercial services if you
          materially breach these Terms or the applicable license.
        </p>

        <p>
          Sections relating to intellectual property, payment obligations,
          restrictions, disclaimers, liability, and governing law will survive
          termination where applicable.
        </p>
      </>
    ),
  },
  {
    id: "governing-law",
    title: "18. Governing law and international use",
    content: (
      <>
        <p>
          These Terms are governed by the laws of France. If you are a consumer,
          this choice does not deprive you of mandatory protections or access to
          courts available under applicable consumer law, including those of
          your country of habitual residence where applicable.
        </p>
        <p>
          You remain responsible for the laws applicable to the products and
          services you build with PyColors. For a purchase complaint, contact
          <a className={styles.inlineLink} href="mailto:contact@pycolors.com">
            {" "}
            contact@pycolors.com
          </a>{" "}
          so that we can review the issue. Seeking an amicable resolution does
          not prevent you from exercising statutory remedies.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "19. Changes to these Terms",
    content: (
      <>
        <p>
          The “Last updated” date identifies this page version. Product-specific
          licenses and expressly agreed order terms may provide additional or
          more specific terms for the relevant product, subject to mandatory
          law.
        </p>
        <p>
          Updated website terms do not automatically replace the terms of an
          earlier purchase or remove rights already granted. Keep your purchase
          documents and the LICENSE file supplied with your product. Contact us
          if a summary and your order documents appear inconsistent.
        </p>
      </>
    ),
  },
] as const;

export default function TermsPage() {
  return (
    <main id="content" tabIndex={-1} className={styles.page}>
      <Container className="pb-16 pt-24 sm:pb-20 sm:pt-28">
        <div className="w-full min-w-0">
          <Breadcrumb
            className={`mb-8 ${styles.breadcrumb}`}
            items={[
              { label: "Home", href: "/" },
              { label: "Terms", href: "/terms" },
            ]}
          />
          <div className={styles.heroLayout}>
            <PageHero
              variant="compact"
              align="left"
              badges={[
                {
                  label: "Terms & commercial rules",
                  icon: <Scale className="size-3.5" aria-hidden="true" />,
                },
              ]}
              title="Terms of Service"
              description="These Terms govern access to the PyColors website, documentation, public repositories, Starter Free, premium templates, Starter Pro, checkout flows, digital downloads, and related commercial products operated by Py Colors SASU."
              className={styles.hero}
              actions={
                <>
                  <MarketingLinkButton>
                    <Link href="#terms-document">
                      Read the terms
                      <ArrowDown className="size-4" aria-hidden="true" />
                    </Link>
                  </MarketingLinkButton>
                  <Link href="#terms-contact" className={styles.textLink}>
                    Questions about these terms
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                </>
              }
            />
            <aside
              aria-label="Terms document information"
              className={styles.documentInfo}
            >
              <FileText className="size-5 text-primary" aria-hidden="true" />
              <dl className="mt-6 space-y-5">
                <div>
                  <dt>Last updated</dt>
                  <dd>
                    <time dateTime={LEGAL_REVISION.date}>
                      {LEGAL_REVISION.label}
                    </time>
                  </dd>
                </div>
                <div>
                  <dt>Published by</dt>
                  <dd>{COMPANY.name}</dd>
                </div>
              </dl>
              <Link href="/license" className={`${styles.textLink} mt-5`}>
                Commercial license
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </aside>
          </div>

          <nav
            aria-label="Find a topic in the terms"
            className={styles.productNav}
          >
            {[
              {
                href: "#terms-categories",
                label: "Products & access",
                detail: "Product categories and accounts",
                icon: Layers3,
              },
              {
                href: "#terms-payments",
                label: "Payments & delivery",
                detail: "Billing, downloads and refunds",
                icon: CreditCard,
              },
              {
                href: "#terms-license",
                label: "Usage & responsibility",
                detail: "Licenses and acceptable use",
                icon: Scale,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={styles.productLink}
                >
                  <span className={styles.iconFrame}>
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium">
                      {item.label}
                    </span>
                    <span className="mt-1 block text-xs leading-6 text-muted-foreground">
                      {item.detail}
                    </span>
                  </span>
                  <ArrowRight
                    className="ml-auto size-3.5 shrink-0 text-muted-foreground"
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </nav>
          <div className={styles.termsNote}>
            <FileText
              className="size-4 shrink-0 text-muted-foreground"
              aria-hidden="true"
            />
            <p>
              Product-specific license files, checkout terms, invoices, and
              written commercial agreements may define additional or more
              specific rights.
            </p>
            <Link
              href="#terms-changes"
              className={`${styles.textLink} shrink-0`}
            >
              Read section 19
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div id="terms-document" className={styles.readingLayout}>
            <aside className={styles.sidebar}>
              <p className="mb-2 flex items-center gap-2 text-xs font-semibold">
                <FileText
                  className="size-3.5 text-muted-foreground"
                  aria-hidden="true"
                />
                On this page
              </p>
              <p
                id="terms-navigation-hint"
                className="mb-4 text-[11px] leading-5 text-muted-foreground"
              >
                Scroll to browse all 19 sections.
              </p>
              <nav
                aria-label="Terms sections"
                aria-describedby="terms-navigation-hint"
                tabIndex={0}
                className={styles.longToc}
              >
                <ol className={styles.toc}>
                  {sections.map((section) => (
                    <li key={section.id}>
                      <Link href={`#terms-${section.id}`}>
                        <span
                          className="font-mono text-[10px] text-muted-foreground"
                          aria-hidden="true"
                        >
                          {section.title.split(". ")[0]!.padStart(2, "0")}
                        </span>
                        <span>
                          {section.title.split(". ").slice(1).join(". ")}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ol>
              </nav>
              <div className={styles.sidebarContact}>
                <p className="text-xs text-muted-foreground">
                  Need clarification?
                </p>
                <Link href="#terms-contact" className={styles.textLink}>
                  Contact PyColors
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>
            </aside>
            <div className={styles.licenseBody}>
              {sections.map((section) => (
                <section
                  key={section.id}
                  id={`terms-${section.id}`}
                  aria-labelledby={`terms-${section.id}-heading`}
                  className={styles.legalSection}
                >
                  <h2 id={`terms-${section.id}-heading`}>{section.title}</h2>
                  <div className={styles.sectionContent}>{section.content}</div>
                </section>
              ))}
              <section
                aria-labelledby="terms-resources-heading"
                className={`${styles.legalSection} ${styles.contactPanel}`}
              >
                <span className={styles.iconFrame}>
                  <FileText className="size-4" aria-hidden="true" />
                </span>
                <h2 id="terms-resources-heading">
                  Need product usage details?
                </h2>
                <p>
                  Review the license, pricing, and privacy policy before using
                  PyColors products in production.
                </p>
                <nav
                  aria-label="Related pages"
                  className="mt-4 flex flex-wrap gap-x-6 gap-y-1"
                >
                  <Link href="/license" className={styles.textLink}>
                    License
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                  <Link href="/pricing" className={styles.textLink}>
                    Pricing
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                  <Link href="/privacy" className={styles.textLink}>
                    Privacy Policy
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                </nav>
              </section>
              <section
                id="terms-contact"
                aria-labelledby="terms-contact-heading"
                className={`${styles.legalSection} ${styles.contactRow}`}
              >
                <div>
                  <h2
                    id="terms-contact-heading"
                    className="flex items-center gap-3"
                  >
                    <Mail
                      className="size-4 shrink-0 text-muted-foreground"
                      aria-hidden="true"
                    />
                    Product, billing, or license question?
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    Contact PyColors at{" "}
                    <a
                      href={`mailto:${COMPANY.email}`}
                      className={styles.emailLink}
                    >
                      {COMPANY.email}
                    </a>
                    .
                  </p>
                </div>
                <MarketingLinkButton variant="outline">
                  <a href={`mailto:${COMPANY.email}`}>Contact</a>
                </MarketingLinkButton>
              </section>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
