import Link from "next/link";
import { ArrowRight, CreditCard, LifeBuoy, Shield } from "lucide-react";

import { Badge, Button, Card, CardContent, CardHeader } from "@pycolors/ui";

export default function CheckoutCancelPage() {
  return (
    <main className="mx-auto mt-10 max-w-4xl px-6 py-16 sm:py-20">
      <div className="overflow-hidden rounded-[28px] border bg-card shadow-xl shadow-black/5">
        <div className="border-b bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.10),transparent_35%)] px-6 py-10 sm:px-8 sm:py-12">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              className="rounded-full px-3 py-1 text-xs font-medium"
            >
              Checkout interrupted
            </Badge>

            <Badge className="rounded-full px-3 py-1 text-xs font-medium">
              Payment status unverified
            </Badge>
          </div>

          <h1 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Checkout interrupted
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            This page cannot confirm whether a payment went through. If you
            already attempted a payment, check your purchase email or contact
            support before paying again.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[1.05fr_0.95fr]">
          <Card className="rounded-[28px] border-2 shadow-sm shadow-black/5">
            <CardHeader className="space-y-4">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border bg-muted/30">
                <CreditCard className="h-5 w-5" />
              </div>

              <h2 className="text-2xl font-semibold tracking-tight">
                Before you try again
              </h2>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="rounded-2xl border bg-muted/20 p-4">
                <p className="text-sm font-medium">
                  Payment declined or interrupted
                </p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  Follow the instructions on the payment page. If you have not
                  completed a payment and are not waiting for a pending one, you
                  can return to pricing to start checkout again.
                </p>
              </div>

              <div className="rounded-2xl border bg-muted/20 p-4">
                <p className="text-sm font-medium">Already tried to pay?</p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  Check the email address used at checkout for your purchase
                  confirmation or access link. If the payment status is unclear,
                  contact support before starting another checkout.
                </p>
              </div>

              <div className="grid gap-3">
                <Button
                  asChild
                  size="lg"
                  className="h-auto min-h-11 whitespace-normal rounded-xl px-4 text-sm font-medium"
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
                  className="h-auto min-h-11 whitespace-normal rounded-xl px-4 text-sm font-medium"
                >
                  <Link href="/orders/recover">Recover purchase access</Link>
                </Button>
              </div>

              <p className="text-xs leading-6 text-muted-foreground">
                Opening this page does not cancel a payment or change an
                existing order.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="rounded-[28px] border">
              <CardHeader>
                <h2 className="text-lg font-semibold tracking-tight">
                  When to ask for help
                </h2>
              </CardHeader>

              <CardContent className="space-y-4 text-sm leading-7 text-muted-foreground">
                <div className="flex items-start gap-3">
                  <Shield className="mt-0.5 h-5 w-5 shrink-0" />
                  <p>
                    You see a payment or pending transaction but have no
                    purchase confirmation.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <CreditCard className="mt-0.5 h-5 w-5 shrink-0" />
                  <p>The payment page or checkout button keeps failing.</p>
                </div>

                <div className="flex items-start gap-3">
                  <LifeBuoy className="mt-0.5 h-5 w-5 shrink-0" />
                  <p>
                    Your payment was confirmed, but the access email or download
                    is missing. Purchase recovery can help with eligible access.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[28px] border">
              <CardHeader>
                <h2 className="text-lg font-semibold tracking-tight">
                  Purchase help
                </h2>
              </CardHeader>

              <CardContent className="space-y-3">
                <Button
                  asChild
                  variant="outline"
                  className="h-auto min-h-10 w-full whitespace-normal rounded-xl"
                >
                  <Link href="/docs/starter-pro/purchase-recovery">
                    Starter Pro purchase help
                  </Link>
                </Button>

                <Button asChild className="w-full rounded-xl">
                  <Link href="/orders/support">Contact support</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
