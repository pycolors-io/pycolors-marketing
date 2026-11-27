import Image from "next/image";
import { getPublicProduct } from "@/lib/products/public-catalog";
import { getCopy } from "@/lib/i18n/server-copy";
import { Link } from "@/lib/i18n/navigation";
import { containerClassName } from "@/components/container";
import { z } from "zod";
import {
  BadgeCheck,
  BookOpen,
  Check,
  CircleHelp,
  FileText,
  LifeBuoy,
  Mail,
} from "lucide-react";

import { Badge, Card, CardContent, CardHeader } from "@pycolors/ui";
import { SiteButton as Button } from "@/components/site-button";
import { MoneyPathPageEvent } from "@/components/analytics/money-path-event";
import styles from "@/components/orders/checkout-success.module.css";

type CheckoutSuccessPageProps = {
  searchParams: Promise<{
    session_id?: string | string[];
  }>;
};

const checkoutSessionSchema = z.object({
  ok: z.literal(true),
  session: z.object({
    id: z.string().min(1),
    status: z.enum(["open", "complete", "expired"]).nullable(),
    paymentStatus: z.enum(["paid", "unpaid", "no_payment_required"]).nullable(),
    productSlug: z.string().nullable(),
    productName: z.string().min(1),
    // Zod strips unknown fields, including emails from older API versions.
    amountTotal: z.number().int().nonnegative(),
    currency: z.string().regex(/^[a-z]{3}$/i),
  }),
});

type CheckoutSessionResponse = z.infer<typeof checkoutSessionSchema>;

function getUnconfirmedMessage(session?: CheckoutSessionResponse["session"]) {
  if (session?.paymentStatus === "unpaid") {
    if (session.status === "complete") {
      return {
        title: "Your payment is still pending.",
        description:
          "Your checkout is complete, but payment has not been confirmed. Check again shortly. Access is sent after payment and delivery are processed.",
      };
    }
    if (session.status === "open") {
      return {
        title: "Your checkout is not complete.",
        description:
          "Return to your original checkout to continue. If you believe you have already paid, check your claim email or contact support before making another payment.",
      };
    }
    if (session.status === "expired") {
      return {
        title: "This checkout has expired.",
        description:
          "This checkout can no longer be completed. If you believe you have already paid, check your claim email or contact support before starting another checkout.",
      };
    }
  }

  return {
    title: "We could not confirm your payment.",
    description:
      "Payment details are unavailable or could not be confirmed. This does not mean your payment failed. Check your claim email or contact support before trying another payment.",
  };
}

function formatSessionReference(sessionId?: string) {
  if (!sessionId) return null;

  if (sessionId.length <= 28) return sessionId;

  return `${sessionId.slice(0, 14)}...${sessionId.slice(-10)}`;
}

function formatAmount(amountTotal: number, currency: string, locale = "en") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amountTotal / 100);
}

function getProductDocsHref(productSlug: string | null) {
  if (productSlug === "na-ai-landing")
    return "/docs/templates/na-ai-landing/setup";
  return getPublicProduct(productSlug)?.docsHref ?? "/docs";
}

function getProductGuidance(productSlug: string | null) {
  switch (productSlug) {
    case "starter-pro-mobile":
      return {
        title: "Set up Starter Pro Mobile",
        description:
          "Open your purchased archive and follow the Mobile guide for the included backend and native source. Configure and validate your own services before deployment.",
        href: "/docs/starter-pro/mobile",
        cta: "Open the Mobile setup guide",
      };
    case "starter-pro-fullstack":
      return {
        title: "Set up Starter Pro Fullstack",
        description:
          "Follow the Fullstack guide to run Web and Mobile against the same backend, accounts and data. Configure and validate your own services before deployment.",
        href: "/docs/starter-pro/fullstack",
        cta: "Open the Fullstack setup guide",
      };
    case "na-ai-landing":
      return {
        title: "Set up NA-AI Landing",
        description:
          "Follow the NA-AI guide to customize your purchased landing page and prepare your deployment.",
        href: "/docs/templates/na-ai-landing/setup",
        cta: "Open the NA-AI setup guide",
      };
    case "starter-pro":
      return {
        title: "Set up Starter Pro",
        description:
          "After you download from your claim email, follow Getting Started. Use purchase recovery if you need to resend your access link.",
        href: "/docs/starter-pro/getting-started",
        cta: "Open Getting Started",
      };
    default:
      return {
        title: "Recommended next step",
        description:
          "Start with the product documentation and use purchase recovery if your claim email is delayed.",
        href: "/docs",
        cta: "Open documentation",
      };
  }
}

function getProductArtwork(productSlug: string | null) {
  switch (productSlug) {
    case "starter-pro":
      return "/images/starters/pro/concepts/delivery-case-test-v1.png";
    case "starter-pro-mobile":
      return "/images/starters/pro/concepts/connected-workspace-test-v1.png";
    case "starter-pro-fullstack":
      return "/images/starters/pro/concepts/source-stack-test-v1.png";
    case "na-ai-landing":
      return "/images/starters/pro/concepts/workflow-path-test-v1.png";
    default:
      return null;
  }
}

async function getCheckoutSession(
  sessionId: string,
): Promise<CheckoutSessionResponse | null> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!apiBaseUrl) {
    console.error("[checkout/success] Missing NEXT_PUBLIC_API_BASE_URL.");
    return null;
  }

  try {
    const response = await fetch(
      `${apiBaseUrl}/api/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
      {
        cache: "no-store",
        signal: AbortSignal.timeout(10_000),
      },
    );

    if (!response.ok) return null;

    const result = await response.json().then((payload: unknown) => {
      // Development RSC diagnostics can retain the decoded JSON by reference.
      // Erase the legacy field there too, before projecting the public summary.
      if (
        payload !== null &&
        typeof payload === "object" &&
        "session" in payload &&
        payload.session !== null &&
        typeof payload.session === "object"
      ) {
        Reflect.deleteProperty(payload.session, "customerEmail");
      }
      return checkoutSessionSchema.safeParse(payload);
    });

    return result.success && result.data.session.id === sessionId
      ? result.data
      : null;
  } catch {
    if (process.env.NODE_ENV === "development") {
      console.info("[checkout/success] checkout session API unavailable.");
    }
    return null;
  }
}

export default async function CheckoutSuccessPage({
  searchParams,
}: CheckoutSuccessPageProps) {
  const tSite = await getCopy();

  const { session_id } = await searchParams;
  const sessionId =
    typeof session_id === "string" && session_id.trim()
      ? session_id
      : undefined;
  const result = sessionId ? await getCheckoutSession(sessionId) : null;

  const pageEvent = (
    <MoneyPathPageEvent
      event="checkout_success_viewed"
      productSlug={result?.session.productSlug ?? null}
      productName={result?.session.productName ?? null}
      page="/checkout/success"
      status={result?.session.paymentStatus ?? null}
    />
  );

  if (
    result?.session.status !== "complete" ||
    result.session.paymentStatus !== "paid"
  ) {
    const message = getUnconfirmedMessage(result?.session);

    return (
      <main
        id="content"
        tabIndex={-1}
        className={`${containerClassName} ${styles.page}`}
      >
        {tSite(pageEvent)}
        <Card className={styles.unconfirmed}>
          <CircleHelp className={styles.unconfirmedIcon} aria-hidden="true" />
          <CardHeader className="space-y-4 p-6 sm:p-8">
            <Badge variant="outline" className="w-fit">
              {tSite("Payment not confirmed")}
            </Badge>
            <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              {tSite(message.title)}
            </h1>
            <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
              {tSite(message.description)}
            </p>
          </CardHeader>
          <CardContent className="space-y-6 px-6 pb-6 sm:px-8 sm:pb-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {sessionId ? (
                <Button className="site-primary-action" asChild>
                  <a
                    href={`/checkout/success?session_id=${encodeURIComponent(sessionId)}`}
                  >
                    {tSite("Check payment status again")}
                  </a>
                </Button>
              ) : null}
              <Button asChild variant="outline">
                <Link href="/orders/recover">
                  {tSite("Recover purchase access")}
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/orders/support">{tSite("Contact support")}</Link>
              </Button>
            </div>
            <p className="text-sm leading-7 text-muted-foreground">
              {tSite(
                "Already have a claim email? Use its access link to download your product. Purchase recovery can resend access for an eligible order without another payment.",
              )}
            </p>
            <Link
              href="/pricing"
              className="text-sm underline underline-offset-4"
            >
              {tSite("Back to pricing")}
            </Link>
          </CardContent>
        </Card>
      </main>
    );
  }

  const shortReference = formatSessionReference(result.session.id);
  const { productName, productSlug, amountTotal, currency } = result.session;
  const amountLabel = formatAmount(amountTotal, currency, tSite.locale);
  const artwork = getProductArtwork(productSlug);

  const docsHref = getProductDocsHref(productSlug);
  const guidance = getProductGuidance(productSlug);
  const supportSubject = encodeURIComponent(`${productName} order help`);

  return (
    <main
      id="content"
      tabIndex={-1}
      className={`${containerClassName} ${styles.page}`}
    >
      {tSite(pageEvent)}
      <div className={styles.hero}>
        <header className={styles.intro}>
          <span className={styles.confirmationMark}>
            <Check aria-hidden="true" />
          </span>
          <p className={styles.eyebrow}>{tSite("Checkout complete")}</p>
          <h1>{tSite("Your payment is confirmed.")}</h1>
          <p className={styles.thankYou}>
            {tSite("Thank you for choosing PyColors.")}
          </p>
          <p className={styles.description}>
            {tSite(
              "Open the secure link in your purchase email to download your product and access its invoice.",
            )}
          </p>
          <div className={styles.actions}>
            <Button asChild size="lg" className={styles.primaryAction}>
              <Link href={docsHref}>
                <BookOpen className="size-4" aria-hidden="true" />
                {tSite("Start setup")}
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className={styles.secondaryAction}
            >
              <Link href="/orders/recover">{tSite("Resend access link")}</Link>
            </Button>
          </div>
          <div className={styles.inboxNote}>
            <Mail className="size-4 shrink-0" aria-hidden="true" />
            <div>
              <p role="status">{tSite("Check your inbox")}</p>
              <p>
                {tSite(
                  "Payment confirmation does not confirm that the email has arrived.",
                )}
              </p>
            </div>
          </div>
        </header>

        <section
          className={styles.receipt}
          aria-labelledby="checkout-details-heading"
        >
          <div className={styles.receiptHeader}>
            <h2 id="checkout-details-heading">{tSite("Checkout details")}</h2>
            <span className={styles.paidLabel}>
              <BadgeCheck className="size-4" aria-hidden="true" />
              {tSite("Payment received")}
            </span>
          </div>
          {artwork ? (
            <div className={styles.artwork}>
              <Image
                src={artwork}
                alt=""
                width={320}
                height={320}
                sizes="(max-width: 639px) 200px, 240px"
              />
            </div>
          ) : null}
          <p className={styles.productLabel}>{tSite("Product")}</p>
          <p className={styles.productName}>{tSite(productName)}</p>
          <dl className={styles.receiptDetails}>
            <div className={styles.amountRow}>
              <dt>{tSite("Amount")}</dt>
              <dd>{amountLabel}</dd>
            </div>
            {shortReference ? (
              <div>
                <dt>{tSite("Checkout reference")}</dt>
                <dd className={styles.reference} title={result.session.id}>
                  {shortReference}
                </dd>
              </div>
            ) : null}
          </dl>
        </section>
      </div>

      <section
        className={styles.nextSteps}
        aria-labelledby="checkout-next-heading"
      >
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>{tSite("What happens next")}</p>
          <h2 id="checkout-next-heading">
            {tSite("Your next step is in your inbox.")}
          </h2>
        </div>
        <div className={styles.steps}>
          <div className={styles.step}>
            <span className={styles.stepIcon}>
              <Mail aria-hidden="true" />
            </span>
            <h3>{tSite("Claim email")}</h3>
            <p>
              {tSite(
                "After delivery is processed, your claim email contains your access link. Check your inbox and spam folder.",
              )}
            </p>
          </div>
          <div className={styles.step}>
            <span className={styles.stepIcon}>
              <FileText aria-hidden="true" />
            </span>
            <h3>{tSite("What you receive")}</h3>
            <p>
              {tSite(
                "Your claim email contains your access link and download instructions.",
              )}
            </p>
          </div>
          <div className={styles.step}>
            <span className={styles.stepIcon}>
              <BookOpen aria-hidden="true" />
            </span>
            <h3>{tSite(guidance.title)}</h3>
            <p>{tSite(guidance.description)}</p>
            <Link href={guidance.href} className={styles.textLink}>
              {tSite(guidance.cta)}
            </Link>
          </div>
        </div>
      </section>

      <div className={styles.support}>
        <div>
          <LifeBuoy className="size-5 shrink-0" aria-hidden="true" />
          <p>
            {tSite("If anything looks wrong, email")}{" "}
            <a
              href={`mailto:support@pycolors.com?subject=${supportSubject}`}
              className={styles.textLink}
            >
              {tSite("support@pycolors.com")}
            </a>{" "}
            {tSite("with your checkout reference for faster help.")}
          </p>
        </div>
        <div className={styles.supportLinks}>
          <Link href="/orders/support" className={styles.textLink}>
            {tSite("Contact support")}
          </Link>
          <Link href="/pricing" className={styles.textLink}>
            {tSite("Back to pricing")}
          </Link>
        </div>
      </div>
    </main>
  );
}
