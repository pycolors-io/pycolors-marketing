import type { Metadata } from "next";
import Link from "next/link";
import { LifeBuoy, Mail, RefreshCcw } from "lucide-react";

import { Button, Card, CardContent, CardHeader } from "@pycolors/ui";

export const metadata: Metadata = {
  title: "Purchase support",
  description: "Get help with a PyColors purchase, access email or download.",
};

export default function PurchaseSupportPage() {
  return (
    <main className="mx-auto mt-10 max-w-5xl px-6 py-16 sm:py-20">
      <div className="max-w-3xl space-y-4">
        <LifeBuoy
          className="h-8 w-8 text-muted-foreground"
          aria-hidden="true"
        />
        <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Get help with your purchase
        </h1>
        <p className="text-sm leading-7 text-muted-foreground sm:text-base">
          Contact us about a PyColors payment, missing access email, unavailable
          download or the wrong product. You do not need a PyColors account. If
          you believe you already paid, contact support before purchasing again.
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold tracking-tight">
              Email purchase support
            </h2>
          </CardHeader>
          <CardContent className="space-y-5 text-sm leading-7">
            <p className="text-muted-foreground">
              Send your request to{" "}
              <a
                href="mailto:support@pycolors.com"
                className="break-all font-medium text-foreground underline underline-offset-4"
              >
                support@pycolors.com
              </a>
              .
            </p>
            <Button asChild>
              <a href="mailto:support@pycolors.com?subject=PyColors%20purchase%20support">
                <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
                Write to support
              </a>
            </Button>
            <p className="text-muted-foreground">
              This opens your email app; it does not send a request. If nothing
              opens, copy the address above into your email service and use the
              subject “PyColors purchase support”.
            </p>
            <p className="text-muted-foreground">
              Support can review your purchase and access issue. No
              response-time or resolution-time guarantee is promised. If you
              cannot access the checkout inbox, mention that in your message;
              the recovery form cannot change the purchase email.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold tracking-tight">
              Include these details
            </h2>
          </CardHeader>
          <CardContent className="space-y-5 text-sm leading-7 text-muted-foreground">
            <ul className="list-disc space-y-2 pl-5">
              <li>The email address used at checkout.</li>
              <li>The product name and approximate purchase date.</li>
              <li>Your order reference, if available.</li>
              <li>The error you see and the steps you already tried.</li>
            </ul>
            <p>
              You can still contact us if you do not have an order reference.
              Share purchase details only in your support email, not in a public
              issue or comment.
            </p>
            <p>
              Do not send passwords, payment card details, API keys, or
              claim/download links. Remove those details from screenshots too.
              Access links grant access to your purchase and must stay private.
            </p>
          </CardContent>
        </Card>
      </div>

      <section aria-labelledby="recovery-heading" className="mt-8 space-y-4">
        <h2
          id="recovery-heading"
          className="text-xl font-semibold tracking-tight"
        >
          Missing or expired access link?
        </h2>
        <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
          You can request a fresh link with the checkout email. If recovery
          already failed or shows another product, contact support using the
          details above. The recovery confirmation does not prove an email was
          delivered.
        </p>
        <Button asChild variant="outline">
          <Link href="/orders/recover">
            <RefreshCcw className="mr-2 h-4 w-4" aria-hidden="true" />
            Recover purchase access
          </Link>
        </Button>
      </section>
    </main>
  );
}
