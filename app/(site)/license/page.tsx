import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowDown,
  ArrowRight,
  Check,
  FileText,
  GitBranch,
  Layers3,
  Mail,
  PanelsTopLeft,
  Scale,
  X,
} from "lucide-react";
import { Badge } from "@pycolors/ui";
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
  title: "Commercial License for SaaS Templates & Starters",
  description:
    "Understand the commercial licensing terms for PyColors templates, Starter Free, Starter Pro, UI systems, open-source repositories, and production-ready SaaS products.",
  alternates: {
    canonical: "/license",
  },

  openGraph: {
    title: "Commercial License for SaaS Templates & Starters",
    description:
      "Learn how PyColors products can be used across open-source repositories, premium templates, Starter Free, Starter Pro, commercial SaaS products, and client work.",
    url: "/license",
    siteName: "PyColors",
    type: "website",

    images: ["/seo/og-main.png"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Commercial License for SaaS Templates & Starters",
    description:
      "Commercial licensing for PyColors SaaS templates, starters, UI systems, and production-ready developer products.",
    images: ["/seo/twitter-main.png"],
  },
};

type LicenseSection = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly items: readonly string[];
};

const COMPANY = { name: "Py Colors SASU", email: "contact@pycolors.com" };

const sections: LicenseSection[] = [
  {
    id: "open-source",
    title: "1. Open-source packages and public repositories",
    description:
      "PyColors publishes public packages and repositories such as PyColors UI, PyColors Tokens, Starter Free, and other public mirrors.",
    items: [
      "Each public repository is governed by the license file included in that repository.",
      "If a repository includes an MIT license, that license applies only to the code covered by that repository.",
      "Open-source access does not grant rights to paid products, private repositories, premium templates, Starter Pro, private releases, commercial downloads, or future paid offers.",
      "Brand assets, trademarks, product names, logos, domains, and commercial positioning remain the property of Py Colors SASU unless explicitly licensed.",
      "Public mirrors may be read-only and may not represent the full private PyColors monorepo or paid product scope.",
    ],
  },
  {
    id: "starter-free",
    title: "2. Starter Free",
    description:
      "Starter Free is a public, free product intended for SaaS UX validation, product exploration, and learning from production-shaped interfaces.",
    items: [
      "Starter Free may be used according to the license included in its public repository.",
      "You may use Starter Free as a starting point for personal projects, internal experiments, and commercial products when the repository license allows it.",
      "Starter Free does not include the private Starter Pro source code, production authentication, Stripe billing, private delivery flows, or paid product assets.",
      "The name PyColors, product branding, logos, and commercial positioning may not be reused in a way that implies official partnership, endorsement, or product origin.",
      "Starter Free may reference upgrade paths to Starter Pro, but those paid foundations are governed by separate commercial terms.",
    ],
  },
  {
    id: "templates",
    title: "3. Premium templates",
    description:
      "NA-AI Landing is licensed under the PyColors Standard Commercial License included in its source package. Other templates are governed by their own delivered license.",
    items: [
      NA_AI_USAGE_SUMMARY,
      "Employees, contractors, freelancers, and collaborators may work with the template on the same final project. This does not give them standalone access for unrelated projects.",
      "Clients may use the final deployed project. Extracting, redistributing, reselling, or reusing the template for unrelated projects requires their own license and remains subject to its restrictions.",
      "You may not resell, redistribute, sublicense, publish, share, or repackage the source code as a template, starter, boilerplate, UI kit, marketplace asset, or downloadable product.",
      "You may not create a competing commercial template, starter, UI kit, or component product substantially based on the paid template source code.",
      "The NA-AI Landing license also prohibits using its source, assets, or documentation to train AI models or code generators. Your purchase covers the frontend template, not backend implementation or managed services.",
    ],
  },
  {
    id: "starter-pro",
    title: "4. Starter Pro",
    description:
      "Starter Pro is a paid SaaS foundation that includes production-oriented auth, billing, protected app structure, and commercial source code access.",
    items: [
      STARTER_PRO_USAGE_SUMMARY,
      "You may build SaaS products, internal tools, and client applications. You may not transfer the Starter Pro source code as a standalone client deliverable or share it outside the licensed entity.",
      "You may modify the source code for your own product implementation.",
      "You may not resell, redistribute, sublicense, publish, share, or repackage Starter Pro as a competing starter, SaaS boilerplate, template kit, UI kit, private marketplace asset, or downloadable product.",
      "Starter Pro includes foundations, not a finished SaaS business. Your product logic, market-specific workflows, customer acquisition, compliance choices, and final production decisions remain your responsibility.",
      "Keep the LICENSE file delivered with your purchase. Updates, access, and support are described in section 6; delivery and consumer rights are covered by the Terms of Service.",
    ],
  },
  {
    id: "restrictions",
    title: "5. Restrictions across paid products",
    description:
      "These restrictions protect PyColors paid products and keep the ecosystem commercially sustainable.",
    items: [
      "No resale or redistribution of paid source code, ZIP files, private repositories, premium assets, or private release materials.",
      "No sublicensing or white-label resale of the product itself.",
      "No public or private sharing of paid source code outside the authorized project, company, or permitted internal team use.",
      "No creation of competing commercial starters, UI kits, template packs, block libraries, boilerplates, or downloadable derivative products based substantially on PyColors paid products.",
      "No removal of license notices where preservation is required.",
      "No use of PyColors trademarks, names, logos, or product identity in a way that implies official affiliation, partnership, endorsement, or product origin without written permission.",
    ],
  },
  {
    id: "updates-support",
    title: "6. Updates, access, and support",
    description:
      "Updates and support vary depending on the product, purchase type, and commercial offer.",
    items: [
      "Open-source repositories may receive public updates without any service-level commitment.",
      "Premium template purchases generally include the product version delivered at purchase time, plus any update rights explicitly described on the product page or checkout page.",
      "Starter Pro may include broader update access, private documentation, or support depending on the purchased offer.",
      "Future updates, premium drops, private releases, or additional products are included only when explicitly stated in the purchased offer.",
      PURCHASE_SUPPORT_SUMMARY,
    ],
  },
];

const sectionLinks = [
  ...sections.map((section) => ({ id: section.id, title: section.title })),
  { id: "priority", title: "7. License priority" },
  { id: "legal-advice", title: "8. Your product and third-party code" },
  { id: "contact", title: "9. Contact" },
];

export default function LicensePage() {
  return (
    <main id="content" tabIndex={-1} className={styles.page}>
      <Container className="pb-16 pt-24 sm:pb-20 sm:pt-28">
        <div className="w-full min-w-0">
          <Breadcrumb
            className={`mb-8 ${styles.breadcrumb}`}
            items={[
              { label: "Home", href: "/" },
              { label: "License", href: "/license" },
            ]}
          />
          <div className={styles.heroLayout}>
            <PageHero
              variant="compact"
              align="left"
              badges={[
                {
                  label: "Licensing & commercial use",
                  icon: <Scale className="size-3.5" aria-hidden="true" />,
                },
              ]}
              title="License"
              description="This page explains how PyColors products can be used across open-source packages, Starter Free, premium templates, Starter Pro, and commercial projects."
              className={styles.hero}
              actions={
                <>
                  <MarketingLinkButton>
                    <Link href="#license-terms">
                      Read the license
                      <ArrowDown className="size-4" aria-hidden="true" />
                    </Link>
                  </MarketingLinkButton>
                  <Link href="#license-contact" className={styles.textLink}>
                    Licensing questions
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                </>
              }
            />
            <aside
              aria-label="License document information"
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
              <Link href="/terms" className={`${styles.textLink} mt-5`}>
                Terms of Service
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </aside>
          </div>

          <nav
            aria-label="Find your product license"
            className={styles.productNav}
          >
            {[
              {
                href: "#license-open-source",
                label: "Open-source & Starter Free",
                detail: "Repository licenses",
                icon: GitBranch,
              },
              {
                href: "#license-templates",
                label: "Premium templates",
                detail: "Commercial template terms",
                icon: PanelsTopLeft,
              },
              {
                href: "#license-starter-pro",
                label: "Starter Pro",
                detail: "Commercial starter terms",
                icon: Layers3,
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

          <section
            aria-labelledby="license-summary-heading"
            className={styles.summary}
          >
            <div className={styles.summaryIntro}>
              <Badge variant="outline" className="bg-background">
                At a glance
              </Badge>
              <h2
                id="license-summary-heading"
                className="mt-4 text-2xl font-semibold tracking-heading"
              >
                Simple commercial summary
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Build and deploy real products with the purchased source. Team
                and client access follow the product-specific rules below; the
                source cannot be sold or distributed as a standalone template,
                starter, or development kit.
              </p>
            </div>
            <div className={styles.summaryGroups}>
              {[
                {
                  title: "Allowed",
                  icon: Check,
                  items: [
                    "Use in your own commercial product",
                    "Use for permitted client work",
                    "Modify source code for the project",
                    "Deploy the final end product",
                  ],
                },
                {
                  title: "Not allowed",
                  icon: X,
                  items: [
                    "Resell the source code",
                    "Share paid files publicly",
                    "Create competing templates",
                    "Redistribute as a boilerplate",
                  ],
                },
              ].map((group) => {
                const Icon = group.icon;
                return (
                  <div key={group.title} className={styles.summaryGroup}>
                    <h3 className="text-sm font-semibold">{group.title}</h3>
                    <ul className="mt-5 space-y-4">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="flex gap-2.5 text-xs leading-6 text-muted-foreground"
                        >
                          <span className={styles.listIcon}>
                            <Icon className="size-3" aria-hidden="true" />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
            <div className={styles.summaryFootnote}>
              <p>
                This summary describes the current products. Keep the license
                and terms supplied with your purchase; earlier rights and
                mandatory consumer protections remain applicable.
              </p>
              <Link
                href="#license-priority"
                className={`${styles.textLink} shrink-0`}
              >
                Read license priority
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>
          </section>

          <div id="license-terms" className={styles.readingLayout}>
            <aside className={styles.sidebar}>
              <nav aria-label="License sections">
                <p className="mb-4 flex items-center gap-2 text-xs font-semibold">
                  <FileText
                    className="size-3.5 text-muted-foreground"
                    aria-hidden="true"
                  />
                  On this page
                </p>
                <ol className={styles.toc}>
                  {sectionLinks.map((section) => (
                    <li key={section.id}>
                      <Link href={`#license-${section.id}`}>
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
                <Link href="#license-contact" className={styles.textLink}>
                  Contact PyColors
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>
            </aside>
            <div className={styles.licenseBody}>
              {sections.map((section) => (
                <section
                  key={section.id}
                  id={`license-${section.id}`}
                  aria-labelledby={`license-${section.id}-heading`}
                  className={styles.legalSection}
                >
                  <h2 id={`license-${section.id}-heading`}>{section.title}</h2>
                  <p className={styles.description}>{section.description}</p>
                  <ul className={styles.clauses}>
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              ))}

              <section
                id="license-priority"
                aria-labelledby="license-priority-heading"
                className={styles.legalSection}
              >
                <h2 id="license-priority-heading">7. License priority</h2>
                <p>
                  The license delivered with the purchased product defines its
                  source-code usage rights, together with any specific written
                  agreement for that order. Open-source code is governed by its
                  own repository license. Applicable mandatory law always takes
                  precedence.
                </p>
                <p>
                  Keep your LICENSE file and purchase documents. A later edit to
                  this page does not automatically remove rights granted with an
                  earlier purchase. If the product page, checkout, order terms,
                  or supplied license appear inconsistent, contact us for
                  clarification; this summary does not cancel a specific
                  commitment made for your purchase.
                </p>
              </section>
              <section
                id="license-legal-advice"
                aria-labelledby="license-legal-advice-heading"
                className={styles.legalSection}
              >
                <h2 id="license-legal-advice-heading">
                  8. Your product and third-party code
                </h2>
                <p>
                  You retain your rights in the original code, content, data,
                  and branding you create. The underlying PyColors source code
                  remains subject to its license. Buying source access does not
                  transfer ownership of the PyColors product or brand.
                </p>
                <p>
                  Open-source and third-party components keep their own licenses
                  and notices. These paid-product restrictions do not narrow
                  rights granted by those licenses. Mandatory consumer rights,
                  including applicable conformity and security-update
                  obligations, are not excluded by these terms.
                </p>
              </section>
              <section
                id="license-contact"
                aria-labelledby="license-contact-heading"
                className={`${styles.legalSection} ${styles.contactPanel}`}
              >
                <span className={styles.iconFrame}>
                  <Mail className="size-4" aria-hidden="true" />
                </span>
                <h2 id="license-contact-heading">9. Contact</h2>
                <p>
                  Licensing, commercial usage, and product questions can be sent
                  to{" "}
                  <a
                    className={styles.emailLink}
                    href={`mailto:${COMPANY.email}`}
                  >
                    {COMPANY.email}
                  </a>
                  .
                </p>
                <p>PyColors licensing is operated by {COMPANY.name}.</p>
                <p>
                  For missing downloads, billing questions, or a refund request,
                  use{" "}
                  <Link className={styles.inlineLink} href="/orders/support">
                    purchase support
                  </Link>
                  . Delivery and withdrawal conditions are explained in the{" "}
                  <Link
                    className={styles.inlineLink}
                    href="/terms#terms-delivery-refunds"
                  >
                    Terms of Service
                  </Link>
                  .
                </p>
              </section>
              <nav
                aria-label="Related pages"
                className="flex flex-wrap items-center gap-x-6 gap-y-1 border-t border-border-subtle py-4"
              >
                <Link className={styles.textLink} href="/terms">
                  Terms
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
                <Link className={styles.textLink} href="/privacy">
                  Privacy
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
                <Link
                  className={`${styles.textLink} sm:ml-auto`}
                  href="/pricing"
                >
                  Pricing
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
