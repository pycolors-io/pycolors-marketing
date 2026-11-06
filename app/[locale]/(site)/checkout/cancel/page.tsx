import { localizePageMetadata } from "@/lib/i18n/metadata";
import { useCopy } from "@/lib/i18n/use-copy";
import type { Metadata } from "next";
import { Link } from "@/lib/i18n/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CircleHelp,
  CreditCard,
  LifeBuoy,
  RefreshCcw,
  ShieldCheck,
} from "lucide-react";

import { Container } from "@/components/container";
import { MarketingLinkButton } from "@/components/marketing/cta-panel";
import { PageHero } from "@/components/marketing/page-hero";
import styles from "@/components/orders/checkout-cancel.module.css";

const metadata: Metadata = {
  title: "Checkout interrupted",
  description:
    "Find the right next step after an interrupted PyColors checkout: review payment uncertainty, recover purchase access or return to pricing.",
};

export default function CheckoutCancelPage() {
  const tSite = useCopy();

  return (
    <main id="content" tabIndex={-1} className={styles.page}>
      <Container className="pb-16 pt-28 sm:pb-24 sm:pt-32">
        <PageHero
          variant="compact"
          align="left"
          className={styles.hero}
          contentClassName="mx-0"
          badges={[
            {
              label: "Payment status unverified",
              icon: <CircleHelp className="size-3.5" aria-hidden="true" />,
            },
          ]}
          title={tSite("Checkout interrupted.")}
          description={tSite(
            "This page cannot confirm whether a payment went through. If you already attempted a payment, check your purchase email or contact support before paying again.",
          )}
        />

        <div className={styles.statusNote}>
          <ShieldCheck className="size-4 shrink-0" aria-hidden="true" />
          <p>
            {tSite(
              "Opening this page does not cancel a payment or change an existing order.",
            )}
          </p>
        </div>

        <section
          aria-labelledby="checkout-next-steps-heading"
          className={styles.nextSteps}
        >
          <div className={styles.sectionHeading}>
            <h2 id="checkout-next-steps-heading">
              {tSite("Before you try again")}
            </h2>
            <p>{tSite("Choose the situation that matches your purchase.")}</p>
          </div>
          <div className={styles.options}>
            <section
              aria-labelledby="checkout-support-heading"
              className={`${styles.option} ${styles.supportOption}`}
            >
              <div className={styles.optionHeader}>
                <span className={styles.icon}>
                  <LifeBuoy className="size-5" aria-hidden="true" />
                </span>
                <span className={styles.eyebrow}>
                  {tSite("Payment unclear")}
                </span>
              </div>
              <h3 id="checkout-support-heading">
                {tSite("Already tried to pay?")}
              </h3>
              <p className={styles.description}>
                {tSite(
                  "Check the email address used at checkout for your purchase confirmation or access link. If the payment status is unclear, contact support before starting another checkout.",
                )}
              </p>
              <div className={styles.situation}>
                {tSite(
                  "You see a payment or pending transaction but have no purchase confirmation.",
                )}
              </div>
              <MarketingLinkButton className={styles.action}>
                <Link href="/orders/support">{tSite("Contact support")}</Link>
              </MarketingLinkButton>
            </section>

            <section
              aria-labelledby="checkout-recovery-heading"
              className={styles.option}
            >
              <div className={styles.optionHeader}>
                <span className={styles.icon}>
                  <RefreshCcw className="size-5" aria-hidden="true" />
                </span>
                <span className={styles.eyebrow}>
                  {tSite("Purchase access")}
                </span>
              </div>
              <h3 id="checkout-recovery-heading">
                {tSite("Paid, but missing access?")}
              </h3>
              <p className={styles.description}>
                {tSite(
                  "Your payment was confirmed, but the access email or download is missing. Purchase recovery can help with eligible access.",
                )}
              </p>
              <div className={styles.situation}>
                {tSite(
                  "Request a fresh access link using the email from checkout and the product you purchased.",
                )}
              </div>
              <MarketingLinkButton variant="outline" className={styles.action}>
                <Link href="/orders/recover">
                  {tSite("Recover purchase access")}
                </Link>
              </MarketingLinkButton>
            </section>

            <section
              aria-labelledby="checkout-retry-heading"
              className={styles.option}
            >
              <div className={styles.optionHeader}>
                <span className={styles.icon}>
                  <CreditCard className="size-5" aria-hidden="true" />
                </span>
                <span className={styles.eyebrow}>
                  {tSite("Return to checkout")}
                </span>
              </div>
              <h3 id="checkout-retry-heading">
                {tSite("Payment declined or interrupted?")}
              </h3>
              <p className={styles.description}>
                {tSite(
                  "Follow the instructions on the payment page. If you have not completed a payment and are not waiting for a pending one, you can return to pricing to start checkout again.",
                )}
              </p>
              <div className={styles.situation}>
                {tSite(
                  "If the payment page or checkout button keeps failing, contact support before trying again.",
                )}
              </div>
              <MarketingLinkButton variant="outline" className={styles.action}>
                <Link href="/pricing">
                  <ArrowLeft className="size-4" aria-hidden="true" />
                  {tSite("Return to pricing")}
                </Link>
              </MarketingLinkButton>
            </section>
          </div>
        </section>

        <section
          aria-labelledby="checkout-guide-heading"
          className={styles.guide}
        >
          <span className={styles.guideIcon}>
            <BookOpen className="size-5" aria-hidden="true" />
          </span>
          <div>
            <h2 id="checkout-guide-heading">
              {tSite("Purchase help, step by step.")}
            </h2>
            <p>
              {tSite(
                "Read the Starter Pro guide for purchase confirmation, access emails and recovery.",
              )}
            </p>
          </div>
          <Link
            href="/docs/starter-pro/purchase-recovery"
            className={styles.textLink}
          >
            {tSite("Starter Pro purchase help")}
            <ArrowRight className="size-3.5 shrink-0" aria-hidden="true" />
          </Link>
        </section>
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
  return localizePageMetadata(metadata, "/checkout/cancel", locale);
}
