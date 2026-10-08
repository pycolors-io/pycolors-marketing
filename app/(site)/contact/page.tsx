import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  FileText,
  LifeBuoy,
  Mail,
  MessageSquareText,
  ReceiptText,
  RefreshCcw,
  SlidersHorizontal,
} from "lucide-react";

import { Container } from "@/components/container";
import { MarketingLinkButton } from "@/components/marketing/cta-panel";
import { PageHero } from "@/components/marketing/page-hero";
import { SupportEmail } from "@/components/marketing/support-email";
import styles from "@/components/marketing/contact.module.css";

const description =
  "Ask about PyColors products, licenses or your next project. Already purchased? Find purchase support and access recovery in one place.";

export const metadata: Metadata = {
  title: "Contact PyColors",
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact PyColors",
    description,
    url: "/contact",
    siteName: "PyColors",
    images: ["/seo/og-main.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact PyColors",
    description,
    images: ["/seo/twitter-main.png"],
  },
};

const resources = [
  {
    title: "Compare products",
    description: "Find the right starting point.",
    href: "/pricing",
    icon: SlidersHorizontal,
  },
  {
    title: "Understand the license",
    description: "Review usage and permissions.",
    href: "/license",
    icon: FileText,
  },
  {
    title: "Explore the docs",
    description: "Installation, examples and guides.",
    href: "/docs",
    icon: BookOpen,
  },
] as const;

export default function ContactPage() {
  return (
    <main id="content" tabIndex={-1} className={styles.page}>
      <Container className="pb-16 pt-24 sm:pb-24 sm:pt-28">
        <PageHero
          variant="compact"
          align="left"
          contentClassName="mx-0 max-w-4xl"
          className={styles.hero}
          badges={[{ label: "Get in touch" }]}
          title="Contact PyColors."
          description="Choose your next starting point, clarify a product detail or get help with a purchase. Let’s find the right next step."
        />

        <div className={styles.contactGrid}>
          <section
            aria-labelledby="general-contact-heading"
            className={`${styles.card} ${styles.generalCard}`}
          >
            <div className={styles.cardHeader}>
              <span className={styles.icon}>
                <Mail className="size-5" aria-hidden="true" />
              </span>
              <span className={styles.eyebrow}>
                Product & general enquiries
              </span>
            </div>
            <h2 id="general-contact-heading">Find the right starting point.</h2>
            <p className={styles.description}>
              Choosing a starter, checking a license or exploring PyColors? Tell
              us what you are building and what you would like to clarify.
            </p>
            <SupportEmail
              email="contact@pycolors.com"
              label="Email PyColors directly"
              copyLabel="Copy contact email"
            />
            <div className={styles.action}>
              <MarketingLinkButton>
                <a href="mailto:contact@pycolors.com?subject=PyColors%20enquiry">
                  Write to PyColors
                </a>
              </MarketingLinkButton>
              <p className={styles.caption}>
                Opens your email app. If nothing opens, copy the address above.
              </p>
            </div>
            <div className={styles.messageNote}>
              <MessageSquareText
                className="size-4 shrink-0"
                aria-hidden="true"
              />
              <p>
                <strong>A helpful first message</strong>
                The product, a little project context and your question.
              </p>
            </div>
          </section>

          <section
            aria-labelledby="purchase-contact-heading"
            className={`${styles.card} ${styles.purchaseCard}`}
          >
            <div className={styles.cardHeader}>
              <span className={styles.icon}>
                <LifeBuoy className="size-5" aria-hidden="true" />
              </span>
              <span className={styles.eyebrow}>Purchase support</span>
            </div>
            <h2 id="purchase-contact-heading">Already have a purchase?</h2>
            <p className={styles.description}>
              Get help with a payment, an invoice or a download. Purchase
              support brings the right contact details and next steps together.
            </p>
            <div className={styles.purchaseDetails}>
              <ReceiptText className="size-4 shrink-0" aria-hidden="true" />
              <div>
                <p className={styles.detailTitle}>
                  Have your purchase details handy.
                </p>
                <p className={styles.detailDescription}>
                  Your checkout email, product name and order reference, if
                  available.
                </p>
              </div>
            </div>
            <div className={styles.action}>
              <MarketingLinkButton variant="outline">
                <Link href="/orders/support">Visit purchase support</Link>
              </MarketingLinkButton>
              <p className={styles.caption}>
                You do not need a PyColors account to ask for help.
              </p>
            </div>
            <Link href="/orders/recover" className={styles.recovery}>
              <RefreshCcw className="size-4 shrink-0" aria-hidden="true" />
              <span className="min-w-0">
                <span className={styles.recoveryLabel}>
                  Missing or expired access link?
                </span>
                <span className={styles.recoveryTitle}>
                  Recover purchase access
                </span>
              </span>
              <ArrowRight
                className="ml-auto size-4 shrink-0"
                aria-hidden="true"
              />
            </Link>
          </section>
        </div>

        <nav
          aria-labelledby="contact-resources-heading"
          className={styles.resources}
        >
          <div className={styles.resourcesHeader}>
            <span className={styles.eyebrow}>Keep exploring</span>
            <h2 id="contact-resources-heading">A few answers, already here.</h2>
            <p>Compare the options and see how everything fits together.</p>
          </div>
          <ul className={styles.resourceGrid}>
            {resources.map(({ title, description, href, icon: Icon }) => (
              <li key={href}>
                <Link href={href} className={styles.resourceLink}>
                  <Icon className="size-4 shrink-0" aria-hidden="true" />
                  <span className="min-w-0">
                    <span className={styles.resourceTitle}>{title}</span>
                    <span className={styles.resourceDescription}>
                      {description}
                    </span>
                  </span>
                  <ArrowRight
                    className="ml-auto size-3.5 shrink-0"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </main>
  );
}
