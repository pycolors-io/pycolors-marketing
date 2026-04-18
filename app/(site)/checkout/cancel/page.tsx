import Link from 'next/link';
import {
  ArrowRight,
  CreditCard,
  LifeBuoy,
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

export default function CheckoutCancelPage() {
  return (
    <main className="mx-auto mt-10 max-w-4xl px-6 py-16 sm:py-20">
      <div className="overflow-hidden rounded-[32px] border bg-card shadow-xl shadow-black/5">
        <div className="border-b bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.10),transparent_35%)] px-6 py-10 sm:px-8 sm:py-12">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              className="rounded-full px-3 py-1 text-xs font-medium"
            >
              Checkout canceled
            </Badge>
            <Badge className="rounded-full px-3 py-1 text-xs font-medium">
              No payment captured
            </Badge>
          </div>

          <h1 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Your checkout was not completed.
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            No payment was captured and no order was created. You can
            return to Starter Pro pricing, review the offer again, and
            restart checkout whenever you are ready.
          </p>
        </div>

        <div className="grid gap-6 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[1.05fr_0.95fr]">
          <Card className="rounded-[28px] border-2 shadow-sm shadow-black/5">
            <CardHeader className="space-y-4">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border bg-muted/30">
                <CreditCard className="h-5 w-5" />
              </div>

              <CardTitle className="text-2xl">
                You can restart checkout at any time
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="rounded-2xl border bg-muted/20 p-4">
                <p className="text-sm font-medium">What happened</p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  The payment flow was interrupted before completion.
                  Your card was not charged and your Starter Pro
                  access was not issued.
                </p>
              </div>

              <div className="rounded-2xl border bg-muted/20 p-4">
                <p className="text-sm font-medium">What to do next</p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  Return to the pricing page, review Starter Pro
                  again, and restart checkout when you want to
                  continue.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="h-11 rounded-xl px-6 text-sm font-medium"
                >
                  <Link href="/pricing">
                    Return to pricing
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-11 rounded-xl px-6 text-sm font-medium"
                >
                  <Link href="/starters/pro">Review Starter Pro</Link>
                </Button>
              </div>

              <p className="text-xs leading-6 text-muted-foreground">
                Canceling checkout does not create any billing
                commitment. You remain free to restart later.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="rounded-[28px] border">
              <CardHeader>
                <CardTitle className="text-lg">
                  Why buyers come back later
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4 text-sm leading-7 text-muted-foreground">
                <div className="flex items-start gap-3">
                  <Shield className="mt-0.5 h-5 w-5 shrink-0" />
                  <p>
                    They want to review the offer one more time before
                    buying.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <CreditCard className="mt-0.5 h-5 w-5 shrink-0" />
                  <p>
                    They need to restart the payment flow with a
                    different card or device.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <LifeBuoy className="mt-0.5 h-5 w-5 shrink-0" />
                  <p>
                    They want to confirm scope, delivery, or
                    documentation before completing checkout.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[28px] border">
              <CardHeader>
                <CardTitle className="text-lg">
                  Helpful next steps
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-3">
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-xl"
                >
                  <Link href="/docs/starter-pro">Read the docs</Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-xl"
                >
                  <Link href="/upgrade">Compare Free vs Pro</Link>
                </Button>

                <Button
                  asChild
                  variant="ghost"
                  className="w-full rounded-xl"
                >
                  <Link href="mailto:support@pycolors.io?subject=Starter%20Pro%20checkout%20question">
                    Contact support
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
