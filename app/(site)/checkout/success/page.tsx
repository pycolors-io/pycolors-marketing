import Link from "next/link";
import { z } from "zod";
import {
  ArrowRight,
  BadgeCheck,
  CreditCard,
  FileText,
  LifeBuoy,
  Mail,
  Shield,
} from "lucide-react";

import { Badge, Button, Card, CardContent, CardHeader } from "@pycolors/ui";
import { MoneyPathPageEvent } from "@/components/analytics/money-path-event";

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
    customerEmail: z.string().nullable(),
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

function formatAmount(amountTotal: number, currency: string) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amountTotal / 100);
}

function getProductDocsHref(productSlug: string | null) {
  switch (productSlug) {
    case "starter-pro":
      return "/docs/starter-pro/getting-started";
    case "na-ai-landing":
      return "/templates/na-ai-landing";
    default:
      return "/docs";
  }
}

function getProductGuidance(productSlug: string | null) {
  switch (productSlug) {
    case "na-ai-landing":
      return {
        title: "A natural next step",
        description:
          "NA-AI Landing gives you the public launch surface. When you are ready to wire authentication, billing, protected routes, and app foundations, Starter Pro is the next layer.",
        href: "/starters/pro",
        cta: "Explore Starter Pro",
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

    const result = checkoutSessionSchema.safeParse(await response.json());

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
      <main className="mx-auto mt-10 max-w-5xl px-6 py-16 sm:py-20">
        {pageEvent}
        <Card className="rounded-[28px]">
          <CardHeader className="space-y-4 p-6 sm:p-8">
            <Badge variant="outline" className="w-fit">
              Payment not confirmed
            </Badge>
            <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              {message.title}
            </h1>
            <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
              {message.description}
            </p>
          </CardHeader>
          <CardContent className="space-y-6 px-6 pb-6 sm:px-8 sm:pb-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {sessionId ? (
                <Button asChild>
                  <a
                    href={`/checkout/success?session_id=${encodeURIComponent(sessionId)}`}
                  >
                    Check payment status again
                  </a>
                </Button>
              ) : null}
              <Button asChild variant="outline">
                <Link href="/orders/recover">Recover purchase access</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="mailto:support@pycolors.com?subject=PyColors%20payment%20confirmation">
                  Contact support
                </Link>
              </Button>
            </div>
            <p className="text-sm leading-7 text-muted-foreground">
              Already have a claim email? Use its access link to download your
              product. Purchase recovery can resend access for an eligible order
              without another payment.
            </p>
            <Link
              href="/pricing"
              className="text-sm underline underline-offset-4"
            >
              Back to pricing
            </Link>
          </CardContent>
        </Card>
      </main>
    );
  }

  const shortReference = formatSessionReference(result.session.id);
  const { productName, productSlug, customerEmail, amountTotal, currency } =
    result.session;
  const amountLabel = formatAmount(amountTotal, currency);

  const docsHref = getProductDocsHref(productSlug);
  const guidance = getProductGuidance(productSlug);
  const supportSubject = encodeURIComponent(`${productName} order help`);

  return (
    <main className="mx-auto mt-10 max-w-5xl px-6 py-16 sm:py-20">
      {pageEvent}
      <div className="overflow-hidden rounded-[28px] border bg-card shadow-xl shadow-black/5">
        <div className="border-b bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.10),transparent_35%)] px-6 py-10 sm:px-8 sm:py-12">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="rounded-full px-3 py-1 text-xs font-medium">
              Payment received
            </Badge>

            <Badge
              variant="outline"
              className="rounded-full px-3 py-1 text-xs font-medium"
            >
              Checkout complete
            </Badge>
          </div>

          <h1 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Your payment is confirmed.
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            Your payment for {productName} was completed successfully. Your
            access link is sent by email after delivery is processed. Payment
            confirmation does not confirm that the email has arrived.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 px-4 py-8 sm:px-8 sm:py-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
          <Card className="rounded-[28px] border-2 shadow-sm shadow-black/5">
            <CardHeader className="space-y-4">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border bg-muted/30">
                <BadgeCheck className="h-5 w-5" aria-hidden="true" />
              </div>

              <h2 className="text-2xl font-semibold">Payment received</h2>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="rounded-2xl border bg-muted/20 p-4">
                <div className="flex items-start gap-3">
                  <CreditCard
                    className="mt-0.5 h-5 w-5 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-medium">Payment status</p>
                    <p className="mt-1 text-sm leading-7 text-muted-foreground">
                      Stripe reports this checkout as complete and paid.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border bg-muted/20 p-4">
                <div className="flex items-start gap-3">
                  <Mail
                    className="mt-0.5 h-5 w-5 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-medium">Claim email</p>
                    <p className="mt-1 text-sm leading-7 text-muted-foreground">
                      After delivery is processed, your claim email contains
                      your access link. Check your inbox and spam folder.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border bg-muted/20 p-4">
                <div className="flex items-start gap-3">
                  <FileText
                    className="mt-0.5 h-5 w-5 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-medium">What you receive</p>
                    <p className="mt-1 text-sm leading-7 text-muted-foreground">
                      Your claim email contains your access link and download
                      instructions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <div
                  className="inline-flex min-h-11 min-w-0 max-w-full items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
                  role="status"
                >
                  <Mail className="mr-2 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="min-w-0 break-all">
                    {customerEmail
                      ? `Check your inbox · ${customerEmail}`
                      : "Check your inbox"}
                  </span>
                </div>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-auto min-h-11 whitespace-normal rounded-xl px-6 text-sm font-medium"
                >
                  <Link href="/orders/recover">Resend access link</Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-auto min-h-11 whitespace-normal rounded-xl px-6 text-sm font-medium"
                >
                  <Link href={docsHref}>
                    Start setup
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>

              <p className="text-xs leading-6 text-muted-foreground">
                If your claim email does not arrive after a reasonable delay,
                email{" "}
                <Link
                  href={`mailto:support@pycolors.com?subject=${supportSubject}`}
                  className="font-medium text-foreground underline underline-offset-4"
                >
                  support@pycolors.com
                </Link>{" "}
                and include your checkout reference so we can help faster.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="rounded-[28px] border">
              <CardHeader>
                <h2 className="text-lg font-semibold">Checkout details</h2>
              </CardHeader>

              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <div className="flex items-start justify-between gap-4">
                  <span>Status</span>

                  <span className="inline-flex items-center gap-2 font-medium text-foreground">
                    <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                    Payment received
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <span>Product</span>

                  <span className="min-w-0 break-words text-right text-foreground [overflow-wrap:anywhere]">
                    {productName}
                  </span>
                </div>

                {amountLabel ? (
                  <div className="flex items-start justify-between gap-4">
                    <span>Amount</span>

                    <span className="min-w-0 break-words text-right text-foreground [overflow-wrap:anywhere]">
                      {amountLabel}
                    </span>
                  </div>
                ) : null}

                {customerEmail ? (
                  <div className="flex items-start justify-between gap-4">
                    <span>Customer</span>

                    <span className="min-w-0 break-words text-right text-foreground [overflow-wrap:anywhere]">
                      {customerEmail}
                    </span>
                  </div>
                ) : null}

                {shortReference ? (
                  <div className="flex items-start justify-between gap-4">
                    <span>Checkout reference</span>

                    <span
                      className="max-w-[220px] break-all text-right font-mono text-foreground"
                      title={result.session.id}
                    >
                      {shortReference}
                    </span>
                  </div>
                ) : null}
              </CardContent>
            </Card>

            <Card className="rounded-[28px] border">
              <CardHeader>
                <h2 className="text-lg font-semibold">What happens next</h2>
              </CardHeader>

              <CardContent className="space-y-4 text-sm leading-7 text-muted-foreground">
                <div className="flex items-start gap-3">
                  <Shield
                    className="mt-0.5 h-5 w-5 shrink-0"
                    aria-hidden="true"
                  />

                  <p>
                    Payment is confirmed by Stripe. Download access becomes
                    available after your order is processed.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <Mail
                    className="mt-0.5 h-5 w-5 shrink-0"
                    aria-hidden="true"
                  />

                  <p>
                    Open the access link in your claim email to download your
                    product, then follow its setup instructions.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <LifeBuoy
                    className="mt-0.5 h-5 w-5 shrink-0"
                    aria-hidden="true"
                  />

                  <p>
                    If anything looks wrong, email{" "}
                    <Link
                      href={`mailto:support@pycolors.com?subject=${supportSubject}`}
                      className="break-all font-medium text-foreground underline underline-offset-4"
                    >
                      support@pycolors.com
                    </Link>{" "}
                    with your checkout reference for faster help.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[28px] border">
              <CardHeader>
                <h2 className="text-lg font-semibold">{guidance.title}</h2>
              </CardHeader>

              <CardContent className="space-y-4 text-sm leading-7 text-muted-foreground">
                <p>{guidance.description}</p>

                <Button
                  asChild
                  variant="outline"
                  className="h-auto min-h-9 whitespace-normal rounded-xl"
                >
                  <Link href={guidance.href}>
                    {guidance.cta}
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <div className="flex flex-wrap gap-3">
              <Button asChild variant="outline" className="rounded-xl">
                <Link
                  href={`mailto:support@pycolors.com?subject=${supportSubject}`}
                >
                  Contact support
                </Link>
              </Button>

              <Button asChild variant="ghost" className="rounded-xl">
                <Link href="/pricing">Back to pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
