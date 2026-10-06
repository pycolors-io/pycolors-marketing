import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  LifeBuoy,
  Mail,
  PackageOpen,
  RefreshCcw,
  ShieldCheck,
} from "lucide-react";

import { Container } from "@/components/container";
import { MarketingLinkButton } from "@/components/marketing/cta-panel";
import { PageHero } from "@/components/marketing/page-hero";
import { PurchaseRecoveryForm } from "@/components/orders/purchase-recovery-form";
import styles from "@/components/orders/purchase-recovery.module.css";

export const metadata: Metadata = {
  title: "Recover purchase access",
  description:
    "Request a fresh access link for your PyColors purchase using the email from checkout.",
};

const recoverySteps = [
  {
    title: "We check your purchase access",
    description:
      "We validate the request against your purchase entitlement before sending a new access link.",
    icon: ShieldCheck,
  },
  {
    title: "Check your inbox",
    description:
      "For eligible access, the new claim email contains a link to your product and download instructions. Access links expire 24 hours after they are issued.",
    icon: Mail,
  },
  {
    title: "Open the link for your product",
    description:
      "Choose the product you want to recover, then check its name in the new claim email before downloading. If you still need help, contact support before purchasing again.",
    icon: PackageOpen,
  },
] as const;

export default function RecoverOrderPage() {
  return (
    <main id="content" tabIndex={-1} className={styles.page}>
      <Container className="max-w-7xl pb-16 pt-24 sm:pb-24 sm:pt-28 lg:px-6 xl:px-0">
        <Link href="/orders/support" className={styles.backLink}>
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          Purchase support
        </Link>
        <PageHero
          variant="compact"
          align="left"
          className={styles.hero}
          contentClassName="mx-0"
          badges={[
            {
              label: "Access recovery",
              icon: <RefreshCcw className="size-3.5" aria-hidden="true" />,
            },
          ]}
          title="Recover your purchase access."
          description="Missing your claim email or using an expired access link? Request a fresh link with the email used at checkout and select your product."
          extra={
            <p className={styles.accountNote}>
              <ShieldCheck className="size-4 shrink-0" aria-hidden="true" />
              No account or new purchase is needed.
            </p>
          }
        />

        <div className={styles.workspace}>
          <PurchaseRecoveryForm />

          <div className={styles.guidance}>
            <section
              aria-labelledby="recovery-steps-heading"
              className={styles.stepsPanel}
            >
              <div className={styles.sectionHeader}>
                <div>
                  <p className={styles.eyebrow}>From request to download</p>
                  <h2 id="recovery-steps-heading">What happens next</h2>
                </div>
                <span className={styles.expiryLabel}>
                  <Clock3 className="size-3.5" aria-hidden="true" />
                  24-hour access links
                </span>
              </div>
              <ol className={styles.steps}>
                {recoverySteps.map(({ title, description, icon: Icon }) => (
                  <li key={title}>
                    <span className={styles.stepIcon}>
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <div>
                      <h3>{title}</h3>
                      <p>{description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section
              aria-labelledby="recovery-help-heading"
              className={styles.helpPanel}
            >
              <div className={styles.helpHeading}>
                <LifeBuoy
                  className="size-4 text-muted-foreground"
                  aria-hidden="true"
                />
                <h2 id="recovery-help-heading">Need manual help?</h2>
              </div>
              <p className={styles.description}>
                If you still do not receive your claim email, email{" "}
                <a
                  href="mailto:support@pycolors.com?subject=PyColors%20access%20recovery"
                  className={styles.inlineLink}
                >
                  support@pycolors.com
                </a>{" "}
                and include the checkout email, product name, and order
                reference if available.
              </p>
              <p className={styles.description}>
                No longer have access to that inbox? Mention it in your support
                message. The recovery form cannot change the purchase email.
              </p>
              <div className={styles.supportAction}>
                <MarketingLinkButton variant="outline">
                  <Link href="/orders/support">
                    Contact support
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </MarketingLinkButton>
                <p>No response-time guarantee is promised.</p>
              </div>
            </section>
          </div>
        </div>

        <div className={styles.pageNote}>
          <p>
            <ShieldCheck className="size-4 shrink-0" aria-hidden="true" />
            Keep your purchase details private. Do not share passwords, card
            details, or access links.
          </p>
          <Link href="/pricing" className={styles.textLink}>
            Back to pricing
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </main>
  );
}
