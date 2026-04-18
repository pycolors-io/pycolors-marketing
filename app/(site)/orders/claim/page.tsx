import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  Download,
  LifeBuoy,
  Lock,
  Package,
  Shield,
} from 'lucide-react';

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@pycolors/ui';

type ClaimOrderPageProps = {
  readonly searchParams: Promise<{
    readonly token?: string;
  }>;
};

type ClaimResponse = {
  ok: true;
  claim: {
    productName: string;
    orderReference: string;
    customerEmail: string;
    paidAt: string | null;
  };
};

function StatusShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <main className="mx-auto mt-10 max-w-5xl px-6 py-16 sm:py-20">
      <div className="overflow-hidden rounded-4xl border bg-card shadow-xl shadow-black/5">
        <div className="border-b bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.10),transparent_35%)] px-6 py-10 sm:px-8">
          <Badge
            variant="outline"
            className="rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em]"
          >
            PyColors Access
          </Badge>

          <h1 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            {description}
          </p>
        </div>

        {children ? (
          <div className="px-6 py-8 sm:px-8 sm:py-10">{children}</div>
        ) : null}
      </div>
    </main>
  );
}

async function getClaim(
  token: string,
): Promise<ClaimResponse | null> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!apiBaseUrl) {
    throw new Error('Missing NEXT_PUBLIC_API_BASE_URL.');
  }

  const response = await fetch(
    `${apiBaseUrl}/api/v1/claims/${token}`,
    {
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as ClaimResponse;

  if (!data.ok) {
    return null;
  }

  return data;
}

export default async function ClaimOrderPage({
  searchParams,
}: ClaimOrderPageProps) {
  const { token } = await searchParams;

  if (!token) {
    return (
      <StatusShell
        title="Invalid access link"
        description="This claim link is missing the required access token. Open the email you received after purchase and use the original access button again."
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/pricing">Back to pricing</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="mailto:support@pycolors.io">
              Contact support
            </Link>
          </Button>
        </div>
      </StatusShell>
    );
  }

  const result = await getClaim(token);

  if (!result) {
    return (
      <StatusShell
        title="Access link expired or invalid"
        description="This link is no longer valid. If you purchased Starter Pro recently, contact support and include your order email so we can re-issue your access link."
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="mailto:support@pycolors.io?subject=Starter%20Pro%20access%20help">
              Contact support
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/pricing">Back to pricing</Link>
          </Button>
        </div>
      </StatusShell>
    );
  }

  const { productName, orderReference, customerEmail, paidAt } =
    result.claim;

  const formattedPaidAt = paidAt
    ? new Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(new Date(paidAt))
    : null;

  const downloadUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/downloads/${token}`;

  return (
    <main className="mx-auto mt-10 max-w-5xl px-6 py-16 sm:py-20">
      <div className="overflow-hidden rounded-4xl border bg-card shadow-xl shadow-black/5">
        <div className="border-b bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.10),transparent_35%)] px-6 py-10 sm:px-8 sm:py-12">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="rounded-full px-3 py-1 text-xs font-medium">
              Access ready
            </Badge>
            <Badge
              variant="outline"
              className="rounded-full px-3 py-1 text-xs font-medium"
            >
              Starter Pro delivery
            </Badge>
          </div>

          <h1 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Your Starter Pro access is ready.
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            Your order has been verified and your download is
            available below. Keep this page for reference until you
            have downloaded and stored your package safely.
          </p>
        </div>

        <div className="grid gap-6 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="rounded-[28px] border-2 shadow-sm shadow-black/5">
            <CardHeader className="space-y-4">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border bg-muted/30">
                <Download className="h-5 w-5" />
              </div>

              <CardTitle className="text-2xl">
                Download Starter Pro
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="rounded-2xl border bg-muted/20 p-4">
                <div className="flex items-start gap-3">
                  <Package className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Product</p>
                    <p className="mt-1 text-sm leading-7 text-muted-foreground">
                      {productName}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border bg-muted/20 p-4">
                <div className="flex items-start gap-3">
                  <Lock className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">
                      Secure access
                    </p>
                    <p className="mt-1 text-sm leading-7 text-muted-foreground">
                      This download link is tied to your purchase
                      entitlement and is delivered through a protected
                      token flow.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="h-11 rounded-xl px-6 text-sm font-medium"
                >
                  <Link href={downloadUrl}>
                    Download Starter Pro
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-11 rounded-xl px-6 text-sm font-medium"
                >
                  <Link href="/docs/starter-pro">Read the docs</Link>
                </Button>
              </div>

              <p className="text-xs leading-6 text-muted-foreground">
                Save your downloaded package in a secure location
                after download. If the link stops working or you need
                help, contact support with your order reference.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="rounded-[28px] border">
              <CardHeader>
                <CardTitle className="text-lg">
                  Order summary
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <div className="flex items-start justify-between gap-4">
                  <span>Order reference</span>
                  <span className="font-mono text-foreground">
                    {orderReference}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <span>Customer</span>
                  <span className="text-right text-foreground">
                    {customerEmail}
                  </span>
                </div>

                {formattedPaidAt ? (
                  <div className="flex items-start justify-between gap-4">
                    <span>Paid on</span>
                    <span className="text-right text-foreground">
                      {formattedPaidAt}
                    </span>
                  </div>
                ) : null}

                <div className="flex items-start justify-between gap-4">
                  <span>Status</span>
                  <span className="inline-flex items-center gap-2 font-medium text-foreground">
                    <BadgeCheck className="h-4 w-4" />
                    Access verified
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[28px] border">
              <CardHeader>
                <CardTitle className="text-lg">
                  What to do next
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4 text-sm leading-7 text-muted-foreground">
                <div className="flex items-start gap-3">
                  <Shield className="mt-0.5 h-5 w-5 shrink-0" />
                  <p>
                    Download and store your package safely before
                    sharing it across your workflow.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <Package className="mt-0.5 h-5 w-5 shrink-0" />
                  <p>
                    Read the Starter Pro documentation before wiring
                    Stripe, auth, or production envs.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <LifeBuoy className="mt-0.5 h-5 w-5 shrink-0" />
                  <p>
                    If you need help, contact support and include your
                    order reference so we can help quickly.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                variant="outline"
                className="rounded-xl"
              >
                <Link href="mailto:support@pycolors.io?subject=Starter%20Pro%20support">
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
