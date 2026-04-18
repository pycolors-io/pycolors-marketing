import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  CreditCard,
  FileText,
  LifeBuoy,
  Mail,
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

type CheckoutSuccessPageProps = {
  searchParams: Promise<{
    session_id?: string;
  }>;
};

function formatSessionReference(sessionId?: string) {
  if (!sessionId) {
    return null;
  }

  if (sessionId.length <= 28) {
    return sessionId;
  }

  return `${sessionId.slice(0, 14)}...${sessionId.slice(-10)}`;
}

export default async function CheckoutSuccessPage({
  searchParams,
}: CheckoutSuccessPageProps) {
  const { session_id } = await searchParams;
  const shortReference = formatSessionReference(session_id);

  return (
    <main className="mx-auto mt-10 max-w-5xl px-6 py-16 sm:py-20">
      <div className="overflow-hidden rounded-4xl border bg-card shadow-xl shadow-black/5">
        <div className="border-b bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.10),transparent_35%)] px-6 py-10 sm:px-8 sm:py-12">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="rounded-full px-3 py-1 text-xs font-medium">
              Payment received
            </Badge>
            <Badge
              variant="outline"
              className="rounded-full px-3 py-1 text-xs font-medium"
            >
              Starter Pro order confirmed
            </Badge>
          </div>

          <h1 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Your Starter Pro purchase is confirmed.
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            Your payment was completed successfully. We are now
            processing your Starter Pro access and preparing delivery.
            If everything is configured correctly, your access email
            should arrive shortly with your secure claim link.
          </p>
        </div>

        <div className="grid gap-6 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[1.08fr_0.92fr]">
          <Card className="rounded-[28px] border-2 shadow-sm shadow-black/5">
            <CardHeader className="space-y-4">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border bg-muted/30">
                <BadgeCheck className="h-5 w-5" />
              </div>

              <CardTitle className="text-2xl">
                Order successfully recorded
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="rounded-2xl border bg-muted/20 p-4">
                <div className="flex items-start gap-3">
                  <CreditCard className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">
                      Payment status
                    </p>
                    <p className="mt-1 text-sm leading-7 text-muted-foreground">
                      Your checkout completed successfully and your
                      order has been accepted for delivery.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border bg-muted/20 p-4">
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">
                      Access email
                    </p>
                    <p className="mt-1 text-sm leading-7 text-muted-foreground">
                      Your access email should arrive shortly once
                      delivery is completed. Keep this page available
                      until you receive it.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border bg-muted/20 p-4">
                <div className="flex items-start gap-3">
                  <FileText className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">
                      What you receive
                    </p>
                    <p className="mt-1 text-sm leading-7 text-muted-foreground">
                      Your email contains your secure claim link and
                      the next step to download your Starter Pro
                      package.
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
                  <Link href="/docs/starter-pro">
                    Read Starter Pro docs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-11 rounded-xl px-6 text-sm font-medium"
                >
                  <Link href="/orders/recover">Recover access</Link>
                </Button>
              </div>

              <p className="text-xs leading-6 text-muted-foreground">
                If your delivery email does not arrive after a
                reasonable delay, contact support and include your
                order reference so we can help faster.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="rounded-[28px] border">
              <CardHeader>
                <CardTitle className="text-lg">
                  Order reference
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <div className="flex items-start justify-between gap-4">
                  <span>Status</span>
                  <span className="inline-flex items-center gap-2 font-medium text-foreground">
                    <BadgeCheck className="h-4 w-4" />
                    Payment received
                  </span>
                </div>

                {shortReference ? (
                  <div className="flex items-start justify-between gap-4">
                    <span>Checkout reference</span>
                    <span
                      className="max-w-[220px] break-all text-right font-mono text-foreground"
                      title={session_id}
                    >
                      {shortReference}
                    </span>
                  </div>
                ) : null}
              </CardContent>
            </Card>

            <Card className="rounded-[28px] border">
              <CardHeader>
                <CardTitle className="text-lg">
                  What happens next
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4 text-sm leading-7 text-muted-foreground">
                <div className="flex items-start gap-3">
                  <Shield className="mt-0.5 h-5 w-5 shrink-0" />
                  <p>
                    Your purchase is verified through Stripe and
                    processed through a protected backend flow.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0" />
                  <p>
                    You receive an access email containing your secure
                    claim link and delivery instructions.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <LifeBuoy className="mt-0.5 h-5 w-5 shrink-0" />
                  <p>
                    If anything looks wrong, contact support with your
                    checkout reference for faster help.
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
                <Link href="mailto:support@pycolors.io?subject=Starter%20Pro%20order%20help">
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
