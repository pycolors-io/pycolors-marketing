import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  FileText,
  LifeBuoy,
  Mail,
  ReceiptText,
  RefreshCcw,
  ShieldCheck,
} from "lucide-react";

import { Container } from "@/components/container";
import { MarketingLinkButton } from "@/components/marketing/cta-panel";
import { PageHero } from "@/components/marketing/page-hero";
import { SupportEmail } from "@/components/marketing/support-email";
import styles from "@/components/marketing/purchase-support.module.css";

export const metadata: Metadata = {
  title: "Purchase support",
  description: "Get help with a PyColors purchase, access email or download.",
};

const requestDetails = [
  {
    title: "Checkout email",
    description: "The email address used at checkout.",
  },
  {
    title: "Product & purchase date",
    description: "The product name and approximate purchase date.",
  },
  {
    title: "Order reference",
    description: "Your order reference, if available.",
  },
  {
    title: "What happened",
    description: "The error you see and the steps you already tried.",
  },
] as const;

const supportTopics = [
  { href: "#recovery", label: "Access & downloads", icon: RefreshCcw },
  { href: "#documents", label: "Receipts & invoices", icon: ReceiptText },
  { href: "#refunds", label: "Withdrawal & refunds", icon: FileText },
] as const;

export default function PurchaseSupportPage() {
  return (
    <main id="content" tabIndex={-1} className={styles.page}>
      <Container className="max-w-7xl pb-16 pt-24 sm:pb-24 sm:pt-28 lg:px-6 xl:px-0">
        <div className={styles.heroLayout}>
          <PageHero
            variant="compact"
            align="left"
            className={styles.hero}
            contentClassName="mx-0"
            badges={[
              {
                label: "Purchase support",
                icon: <LifeBuoy className="size-3.5" aria-hidden="true" />,
              },
            ]}
            title="Get help with your purchase"
            description="A missing access email, an unavailable download or a payment question. Find the right next step for your PyColors purchase."
            extra={
              <p className={styles.accountNote}>
                <ShieldCheck className="size-4 shrink-0" aria-hidden="true" />
                You do not need a PyColors account.
              </p>
            }
          />
          <nav aria-label="Purchase support topics" className={styles.topicNav}>
            <p className={styles.eyebrow}>Find the right help</p>
            {supportTopics.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} className={styles.topicLink}>
                <Icon className="size-4 shrink-0" aria-hidden="true" />
                <span>{label}</span>
                <ArrowRight className="size-3.5 shrink-0" aria-hidden="true" />
              </Link>
            ))}
          </nav>
        </div>

        <div className={styles.supportGrid}>
          <section
            aria-labelledby="contact-heading"
            className={`${styles.supportCard} ${styles.contactCard}`}
          >
            <div className={styles.cardHeading}>
              <span className={styles.icon}>
                <Mail className="size-5" aria-hidden="true" />
              </span>
              <span className={styles.eyebrow}>
                Purchase & payment questions
              </span>
            </div>
            <h2 id="contact-heading">Email purchase support</h2>
            <p className={styles.description}>
              Contact us about a payment, an unavailable download or the wrong
              product. If you believe you already paid, contact support before
              purchasing again.
            </p>
            <SupportEmail email="support@pycolors.com" />
            <div className={styles.cardAction}>
              <MarketingLinkButton>
                <a href="mailto:support@pycolors.com?subject=PyColors%20purchase%20support">
                  Write to support
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </MarketingLinkButton>
            </div>
            <p className={styles.caption}>
              This opens your email app; it does not send a request. If nothing
              opens, copy the address above into your email service and use the
              subject “PyColors purchase support”.
            </p>
          </section>

          <section
            id="recovery"
            tabIndex={-1}
            aria-labelledby="recovery-heading"
            className={`${styles.supportCard} ${styles.recoveryCard}`}
          >
            <div className={styles.cardHeading}>
              <span className={styles.icon}>
                <RefreshCcw className="size-5" aria-hidden="true" />
              </span>
              <span className={styles.eyebrow}>Purchase access</span>
            </div>
            <h2 id="recovery-heading">Missing or expired access link?</h2>
            <p className={styles.description}>
              You can request a fresh link with the checkout email. If recovery
              already failed or shows another product, contact support using the
              details on this page.
            </p>
            <div className={styles.recoveryNote}>
              <p className="font-medium text-foreground">
                No longer have access to that inbox?
              </p>
              <p>
                Mention that in your support message. The recovery form cannot
                change the purchase email.
              </p>
            </div>
            <div className={styles.cardAction}>
              <MarketingLinkButton variant="outline">
                <Link href="/orders/recover">
                  Recover purchase access
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </MarketingLinkButton>
            </div>
            <p className={styles.caption}>
              The recovery confirmation does not prove an email was delivered.
            </p>
          </section>
        </div>

        <section
          aria-labelledby="details-heading"
          className={styles.preparation}
        >
          <div className={styles.preparationHeader}>
            <div>
              <span className={styles.eyebrow}>Before you write</span>
              <h2 id="details-heading">Include these details</h2>
              <p className={styles.description}>
                A few details help us understand your purchase and the issue.
                You can still contact us if you do not have an order reference.
              </p>
            </div>
            <p className={styles.caption}>
              Support can review your purchase and access issue. No
              response-time or resolution-time guarantee is promised.
            </p>
          </div>
          <ol className={styles.detailsList}>
            {requestDetails.map((detail, index) => (
              <li key={detail.title}>
                <span className={styles.detailNumber} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{detail.title}</h3>
                  <p>{detail.description}</p>
                </div>
              </li>
            ))}
          </ol>
          <aside
            aria-labelledby="privacy-heading"
            className={styles.privacyNote}
          >
            <ShieldCheck
              className="mt-0.5 size-4 shrink-0"
              aria-hidden="true"
            />
            <div>
              <h3 id="privacy-heading">Keep purchase details private</h3>
              <p>
                Share purchase details only in your support email, not in a
                public issue or comment.
              </p>
              <p>
                Do not send passwords, payment card details, API keys, or
                claim/download links. Remove those details from screenshots too.
                Access links grant access to your purchase and must stay
                private.
              </p>
            </div>
          </aside>
        </section>

        <div className={styles.resources}>
          <section
            id="documents"
            tabIndex={-1}
            aria-labelledby="documents-heading"
            className={styles.resourceCard}
          >
            <ReceiptText
              className="size-5 text-muted-foreground"
              aria-hidden="true"
            />
            <h2 id="documents-heading">Need a receipt or invoice?</h2>
            <p className={styles.description}>
              Your product access email and order reference are separate from a
              payment receipt or invoice. For a missing document or a
              billing-detail question, email support using the details above. If
              a particular document is required before you buy, ask us to
              confirm what is available first.
            </p>
            <Link
              href="/docs/starter-pro/purchase-documents"
              className={styles.textLink}
            >
              Starter Pro receipts and invoices
              <ArrowRight className="size-3.5 shrink-0" aria-hidden="true" />
            </Link>
          </section>

          <section
            id="refunds"
            tabIndex={-1}
            aria-labelledby="refunds-heading"
            className={styles.resourceCard}
          >
            <FileText
              className="size-5 text-muted-foreground"
              aria-hidden="true"
            />
            <h2 id="refunds-heading">
              Withdrawal, refunds, or a product problem?
            </h2>
            <p className={styles.description}>
              Digital delivery does not automatically remove consumer rights.
              Read the terms for the applicable withdrawal conditions, an
              optional request model, and conformity remedies. A statutory
              withdrawal does not require you to give a reason. You can send it
              to contact@pycolors.com or the postal address listed in the terms.
            </p>
            <Link
              href="/terms#terms-delivery-refunds"
              className={styles.textLink}
            >
              Withdrawal and refund conditions
              <ArrowRight className="size-3.5 shrink-0" aria-hidden="true" />
            </Link>
          </section>
        </div>
      </Container>
    </main>
  );
}
