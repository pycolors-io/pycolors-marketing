'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  LifeBuoy,
  Mail,
  RefreshCcw,
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

import { recoverStarterProAccess } from '@/lib/api/client';

export default function RecoverOrderPage() {
  const [email, setEmail] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    try {
      setIsLoading(true);
      setError(null);

      await recoverStarterProAccess({ email });

      setDone(true);
      setIsLoading(false);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Unable to resend access link.';

      setError(message);
      setIsLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-5xl mt-10 px-6 py-16 sm:py-20">
      <div className="overflow-hidden rounded-4xl border bg-card shadow-xl shadow-black/5">
        <div className="border-b bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.10),transparent_35%)] px-6 py-10 sm:px-8 sm:py-12">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="rounded-full px-3 py-1 text-xs font-medium">
              Access recovery
            </Badge>
            <Badge
              variant="outline"
              className="rounded-full px-3 py-1 text-xs font-medium"
            >
              Starter Pro support
            </Badge>
          </div>

          <h1 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Didn’t receive your access?
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            If you completed your purchase but did not receive your
            Starter Pro access email, you can request a new secure
            access link here.
          </p>
        </div>

        <div className="grid gap-6 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[1.05fr_0.95fr]">
          <Card className="rounded-[28px] border-2 shadow-sm shadow-black/5">
            <CardHeader className="space-y-4">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border bg-muted/30">
                <RefreshCcw className="h-5 w-5" />
              </div>

              <CardTitle className="text-2xl">
                Resend your access link
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {done ? (
                <div className="rounded-2xl border bg-muted/20 p-5">
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">
                        Check your email
                      </p>
                      <p className="mt-1 text-sm leading-7 text-muted-foreground">
                        If an order exists for this email, a new
                        access link has been sent.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium"
                      >
                        Purchase email
                      </label>

                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        value={email}
                        onChange={(event) =>
                          setEmail(event.target.value)
                        }
                        placeholder="you@example.com"
                        className="h-11 w-full rounded-xl border bg-background px-4 text-sm outline-none transition focus:border-foreground/30"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      size="lg"
                      className="h-11 rounded-xl px-6 text-sm font-medium"
                    >
                      {isLoading
                        ? 'Sending...'
                        : 'Resend access link'}
                      {!isLoading ? (
                        <ArrowRight className="ml-2 h-4 w-4" />
                      ) : null}
                    </Button>
                  </form>

                  {error ? (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                      {error}
                    </div>
                  ) : null}
                </>
              )}

              <p className="text-xs leading-6 text-muted-foreground">
                Use the same email address you used during checkout.
                If an order exists, we will send a fresh access link.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-6">
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
                    We validate the request against your purchase
                    entitlement before generating a new secure access
                    link.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0" />
                  <p>
                    If your order exists, a new email is sent with
                    your claim link and delivery instructions.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <RefreshCcw className="mt-0.5 h-5 w-5 shrink-0" />
                  <p>
                    This flow is designed to recover access without
                    exposing your order publicly.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[28px] border">
              <CardHeader>
                <CardTitle className="text-lg">
                  Need manual help?
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4 text-sm leading-7 text-muted-foreground">
                <div className="flex items-start gap-3">
                  <LifeBuoy className="mt-0.5 h-5 w-5 shrink-0" />
                  <p>
                    If you still do not receive your access email,
                    contact support and include the email used during
                    checkout.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-xl"
                  >
                    <Link href="mailto:support@pycolors.io?subject=Starter%20Pro%20access%20recovery">
                      Contact support
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="ghost"
                    className="rounded-xl"
                  >
                    <Link href="/access">Back to pricing</Link>
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
