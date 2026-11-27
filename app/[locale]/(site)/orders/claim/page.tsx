import { parseClaimResponse } from "@/lib/api/claim-contract";
import { getPublicProduct } from "@/lib/products/public-catalog";
import { PurchaseUpgrade } from "@/components/orders/purchase-upgrade";
import { useCopy } from "@/lib/i18n/use-copy";
import { getCopy } from "@/lib/i18n/server-copy";
import { Link } from "@/lib/i18n/navigation";
import { containerClassName } from "@/components/container";
import { Suspense } from "react";
import { CircleCheck, Download } from "lucide-react";
import { Badge, Card, CardContent } from "@pycolors/ui";
import { OrderInvoice } from "@/components/orders/order-invoice";
import { SiteButton as Button } from "@/components/site-button";
import { MoneyPathPageEvent } from "@/components/analytics/money-path-event";

type ClaimOrderPageProps = {
  readonly searchParams: Promise<{
    readonly token?: string;
  }>;
};

type ClaimResponse = NonNullable<ReturnType<typeof parseClaimResponse>>;

function getProductPageHref(productSlug: string | null) {
  return getPublicProduct(productSlug)?.href ?? "/pricing";
}

function StatusShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  const tSite = useCopy();

  return (
    <main
      id="content"
      tabIndex={-1}
      className={`${containerClassName} mt-10 py-16 sm:py-20`}
    >
      <div className="overflow-hidden rounded-[28px] border bg-card shadow-xl shadow-black/5">
        <div className="border-b bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.10),transparent_35%)] px-6 py-10 sm:px-8">
          <Badge
            variant="outline"
            className="rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em]"
          >
            {tSite("PyColors Access")}
          </Badge>

          <h1 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            {tSite(title)}
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            {tSite(description)}
          </p>
        </div>

        {children ? (
          <div className="px-6 py-8 sm:px-8 sm:py-10">{tSite(children)}</div>
        ) : null}
      </div>
    </main>
  );
}

async function getClaim(token: string): Promise<ClaimResponse | null> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!apiBaseUrl) {
    console.error("[orders/claim] Missing NEXT_PUBLIC_API_BASE_URL.");
    return null;
  }

  try {
    const response = await fetch(
      `${apiBaseUrl}/api/v1/claims/${encodeURIComponent(token)}`,
      {
        cache: "no-store",
        signal: AbortSignal.timeout(10_000),
      },
    );

    if (!response.ok) return null;

    return parseClaimResponse(await response.json());
  } catch {
    if (process.env.NODE_ENV === "development") {
      console.info("[orders/claim] claim API unavailable.");
    }
    return null;
  }
}

export default async function ClaimOrderPage({
  searchParams,
}: ClaimOrderPageProps) {
  const tSite = await getCopy();

  const params = await searchParams;
  const token = typeof params.token === "string" ? params.token : undefined;

  if (!token) {
    return (
      <StatusShell
        title={tSite("Invalid access link")}
        description={tSite(
          "This access link is missing the required token. Open your claim email from purchase and use the original access link again.",
        )}
      >
        <MoneyPathPageEvent
          event="claim_page_viewed"
          page="/orders/claim"
          status="missing_token"
        />
        <div className="flex flex-wrap gap-3">
          <Button className="site-primary-action" asChild>
            <Link href="/pricing">{tSite("Back to pricing")}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/orders/support">{tSite("Contact support")}</Link>
          </Button>
        </div>
      </StatusShell>
    );
  }

  const result = await getClaim(token);

  if (!result) {
    return (
      <StatusShell
        title={tSite("Access link unavailable")}
        description={tSite(
          "We could not verify this access link right now. The delivery service may be temporarily unavailable, expired, or invalid. Please try again shortly or contact support with your purchase email.",
        )}
      >
        <MoneyPathPageEvent
          event="claim_page_viewed"
          page="/orders/claim"
          status="unavailable"
        />
        <div className="flex flex-wrap gap-3">
          <Button className="site-primary-action" asChild>
            <Link href="/orders/support">{tSite("Contact support")}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/orders/recover">{tSite("Resend access link")}</Link>
          </Button>
        </div>
      </StatusShell>
    );
  }

  const { productSlug, productName, orderReference, customerEmail, paidAt } =
    result.claim;

  const formattedPaidAt = paidAt
    ? new Intl.DateTimeFormat(tSite.locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(paidAt))
    : null;

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error("Missing NEXT_PUBLIC_API_BASE_URL.");
  }

  const encodedToken = encodeURIComponent(token);
  const downloadUrl = `${apiBaseUrl}/api/v1/downloads/${encodedToken}`;
  const invoiceEndpoint = `${apiBaseUrl}/api/v1/claims/${encodedToken}/invoice`;
  const retryHref = tSite.href("/orders/claim") + "?token=" + encodedToken;
  const { downloadAvailable } = result.claim;

  return (
    <main
      id="content"
      tabIndex={-1}
      className={`${containerClassName} pb-12 pt-[calc(var(--site-header-height)+2rem)] sm:pb-16 sm:pt-[calc(var(--site-header-height)+3rem)] lg:pt-[calc(var(--site-header-height)+3.5rem)]`}
    >
      <MoneyPathPageEvent
        event="claim_page_viewed"
        productSlug={productSlug}
        productName={productName}
        page="/orders/claim"
        status="ready"
      />
      <div className="mx-auto max-w-2xl space-y-6 sm:space-y-8">
        <header className="space-y-2">
          <h1 className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <CircleCheck
              aria-hidden="true"
              className="size-5 shrink-0 text-success"
            />
            {tSite("Purchase confirmed")}
          </h1>
          <p className="break-words text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            {productName}
          </p>
        </header>
        <Card className="gap-0 overflow-hidden border-primary/25 bg-card py-0">
          <CardContent className="space-y-4 p-5 sm:p-7">
            <h2 className="text-lg font-semibold tracking-tight">
              {tSite("Your download")}
            </h2>
            {downloadAvailable ? (
              <Button
                size="lg"
                asChild
                className="site-primary-action min-h-12 w-full whitespace-normal px-5 text-center sm:w-auto"
              >
                <a href={downloadUrl} referrerPolicy="no-referrer">
                  <Download className="size-5 shrink-0" aria-hidden="true" />
                  {tSite("Download {product}", { product: productName })}
                </a>
              </Button>
            ) : (
              <div role="status" className="space-y-2 text-sm">
                <p>
                  {tSite("Your product download is temporarily unavailable.")}
                </p>
                <a href={retryHref} className="underline underline-offset-4">
                  {tSite("Check download again")}
                </a>
              </div>
            )}
          </CardContent>
          <div
            id="invoice"
            className="scroll-mt-[calc(var(--site-header-height)+1rem)] border-t border-border bg-surface-muted/30 px-5 py-3 sm:px-7"
          >
            <Suspense
              fallback={
                <p role="status" className="text-sm text-muted-foreground">
                  {tSite("Checking your invoice…")}
                </p>
              }
            >
              <OrderInvoice
                endpoint={invoiceEndpoint}
                retryHref={retryHref + "#invoice"}
              />
            </Suspense>
          </div>
        </Card>
        <section aria-labelledby="order-summary-title" className="space-y-4">
          <h2 id="order-summary-title" className="text-lg font-semibold">
            {tSite("Order summary")}
          </h2>
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <div className="min-w-0">
              <dt className="text-muted-foreground">
                {tSite("Order reference")}
              </dt>
              <dd className="break-all font-mono">{orderReference}</dd>
            </div>
            <div className="min-w-0">
              <dt className="text-muted-foreground">{tSite("Customer")}</dt>
              <dd className="break-all">{customerEmail}</dd>
            </div>
            {formattedPaidAt && (
              <div>
                <dt className="text-muted-foreground">{tSite("Paid on")}</dt>
                <dd>{formattedPaidAt}</dd>
              </div>
            )}
          </dl>
        </section>
        <nav
          aria-label={tSite("Purchase resources")}
          className="flex flex-wrap gap-x-6 gap-y-1 border-t pt-3 text-sm underline underline-offset-4 [&_a]:inline-flex [&_a]:min-h-11 [&_a]:items-center"
        >
          <Link href={getPublicProduct(productSlug)?.docsHref ?? "/docs"}>
            {tSite("Start setup")}
          </Link>
          <Link href={getProductPageHref(productSlug)}>
            {tSite("View product page")}
          </Link>
          <Link href="/orders/support">{tSite("Contact support")}</Link>
        </nav>
        {result.claim.upgrade && (
          <PurchaseUpgrade upgrade={result.claim.upgrade} token={token} />
        )}
      </div>
    </main>
  );
}
