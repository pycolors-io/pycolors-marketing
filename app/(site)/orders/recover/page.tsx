"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, LifeBuoy, Mail, RefreshCcw, Shield } from "lucide-react";

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  Input,
} from "@pycolors/ui";

import { recoverCommerceAccess } from "@/lib/api/client";
import { trackMoneyPathEvent } from "@/lib/analytics";

export default function RecoverOrderPage() {
  const [email, setEmail] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    trackMoneyPathEvent({
      event: "recovery_page_viewed",
      page: "/orders/recover",
      status: "viewed",
    });
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setIsLoading(true);
      setError(null);

      await recoverCommerceAccess({ email });

      setDone(true);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to resend access link.";

      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="mx-auto mt-10 max-w-5xl px-6 py-16 sm:py-20">
      <div className="overflow-hidden rounded-[28px] border bg-card shadow-xl shadow-black/5">
        <div className="border-b bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.10),transparent_35%)] px-6 py-10 sm:px-8 sm:py-12">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="rounded-full px-3 py-1 text-xs font-medium">
              Access recovery
            </Badge>
            <Badge
              variant="outline"
              className="rounded-full px-3 py-1 text-xs font-medium"
            >
              Product access support
            </Badge>
          </div>

          <h1 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Didn’t receive your access?
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            Missing your claim email or using an expired access link? Request a
            fresh link with the email used at checkout. No account or new
            purchase is needed.
          </p>
        </div>

        <div className="grid gap-6 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[1.05fr_0.95fr]">
          <Card className="rounded-[28px] border-2 shadow-sm shadow-black/5">
            <CardHeader className="space-y-4">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border bg-muted/30">
                <RefreshCcw className="h-5 w-5" />
              </div>

              <h2 className="text-2xl font-semibold tracking-tight">
                Resend your access link
              </h2>
            </CardHeader>

            <CardContent className="space-y-6">
              {done ? (
                <div
                  role="status"
                  className="rounded-2xl border bg-muted/20 p-5"
                >
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Check your email</p>
                      <p className="mt-1 text-sm leading-7 text-muted-foreground">
                        If eligible purchase access is found and the request can
                        be processed, we send a new claim email. This
                        confirmation does not verify a purchase or email
                        delivery. Check your inbox and spam folder.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      label="Purchase email"
                      placeholder="you@example.com"
                      size="lg"
                    />

                    <Button
                      type="submit"
                      disabled={isLoading}
                      size="lg"
                      className="h-11 rounded-xl px-6 text-sm font-medium"
                    >
                      {isLoading ? "Sending..." : "Resend access link"}
                      {!isLoading ? (
                        <ArrowRight className="ml-2 h-4 w-4" />
                      ) : null}
                    </Button>
                  </form>

                  {error ? (
                    <div
                      role="alert"
                      className="rounded-2xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive"
                    >
                      {error}
                      <p className="mt-2">
                        Check your connection and try again later. If the error
                        continues, contact support before making another
                        purchase.
                      </p>
                    </div>
                  ) : null}
                </>
              )}

              <p className="text-xs leading-6 text-muted-foreground">
                Use the same email address you used during checkout. Repeated
                requests may be temporarily limited. If you have tried several
                times, wait at least 30 minutes before trying again, or contact
                support.
              </p>
              <Link
                href="/docs/starter-pro/purchase-recovery"
                className="text-sm font-medium underline underline-offset-4"
              >
                Starter Pro purchase recovery guide
              </Link>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="rounded-[28px] border">
              <CardHeader>
                <h2 className="text-lg font-semibold leading-none tracking-tight">
                  What happens next
                </h2>
              </CardHeader>

              <CardContent className="space-y-4 text-sm leading-7 text-muted-foreground">
                <div className="flex items-start gap-3">
                  <Shield className="mt-0.5 h-5 w-5 shrink-0" />
                  <p>
                    We validate the request against your purchase entitlement
                    before sending a new access link.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0" />
                  <p>
                    For eligible access, the new claim email contains a link to
                    your product and download instructions. Access links expire
                    24 hours after they are issued.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <RefreshCcw className="mt-0.5 h-5 w-5 shrink-0" />
                  <p>
                    Open the latest claim email and check the product name
                    before downloading. If it points to a different purchase,
                    contact support for the product you need.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[28px] border">
              <CardHeader>
                <h2 className="text-lg font-semibold leading-none tracking-tight">
                  Need manual help?
                </h2>
              </CardHeader>

              <CardContent className="space-y-4 text-sm leading-7 text-muted-foreground">
                <div className="flex items-start gap-3">
                  <LifeBuoy className="mt-0.5 h-5 w-5 shrink-0" />
                  <p>
                    If you still do not receive your claim email, email{" "}
                    <Link
                      href="mailto:support@pycolors.com?subject=PyColors%20access%20recovery"
                      className="font-medium text-foreground underline underline-offset-4"
                    >
                      support@pycolors.com
                    </Link>{" "}
                    and include the checkout email, product name, and order
                    reference if available. Do not share passwords, card
                    details, or access links. No response-time guarantee is
                    promised.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button asChild variant="outline" className="rounded-xl">
                    <Link href="/orders/support">Contact support</Link>
                  </Button>

                  <Button asChild variant="ghost" className="rounded-xl">
                    <Link href="/pricing">Back to pricing</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
