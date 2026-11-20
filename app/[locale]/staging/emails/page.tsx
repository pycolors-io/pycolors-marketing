import { Link } from "@/lib/i18n/navigation";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCopy } from "@/lib/i18n/server-copy";
import {
  capturedClaimHref,
  isolatedEmailPreview,
  parseCapturedEmails,
} from "@/lib/staging/email-capture";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const metadata: Metadata = {
  title: "Staging email capture",
  robots: { index: false, follow: false },
};

// This route is a Server Component. The bearer credential is used only in this
// server-to-server request and is never passed to a Client Component or logged.
export default async function StagingEmailsPage() {
  const token = process.env.STAGING_CAPTURE_TOKEN;
  if (process.env.COMMERCE_ENVIRONMENT !== "staging" || !token) notFound();
  const tSite = await getCopy();
  let emails: ReturnType<typeof parseCapturedEmails> = null;
  const api = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (api) {
    try {
      const response = await fetch(`${api}/api/internal/staging/emails`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
        signal: AbortSignal.timeout(10_000),
      });
      if (response.ok) emails = parseCapturedEmails(await response.json());
    } catch {
      // Do not expose provider responses, addresses, private links or headers.
    }
  }
  const appBase =
    process.env.APP_BASE_URL?.trim() || process.env.NEXT_PUBLIC_APP_URL;
  return (
    <main id="content" className="mx-auto max-w-5xl px-5 py-10">
      <h1 className="text-3xl font-semibold">
        {tSite("Staging email capture")}
      </h1>
      <p className="mt-4 text-sm text-muted-foreground">
        {tSite(
          "Test environment only. These messages were captured without sending an email. Captured content and purchase access links are private.",
        )}
      </p>
      <Link
        href="/staging/emails"
        prefetch={false}
        className="mt-4 inline-flex min-h-11 items-center rounded-md underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-ring"
      >
        {tSite("Refresh captured messages")}
      </Link>
      {emails === null ? (
        <p role="status" className="mt-6">
          {tSite(
            "Captured messages are unavailable. Check the staging server configuration.",
          )}
        </p>
      ) : emails.length === 0 ? (
        <p role="status" className="mt-6">
          {tSite("No messages captured yet.")}
        </p>
      ) : (
        <div className="mt-8 space-y-6">
          {emails.map((email) => {
            const claimHref = capturedClaimHref(email.html, appBase);
            return (
              <article
                key={email.id}
                className="rounded-md border border-border-subtle p-5"
              >
                <h2 className="text-xl font-semibold">{email.subject}</h2>
                <dl className="mt-4 grid gap-2 text-sm">
                  <div>
                    <dt className="inline font-medium">{tSite("To")}: </dt>
                    <dd className="inline">
                      {Array.isArray(email.to) ? email.to.join(", ") : email.to}
                    </dd>
                  </div>
                  <div>
                    <dt className="inline font-medium">
                      {tSite("Captured at")}:{" "}
                    </dt>
                    <dd className="inline">
                      <time dateTime={email.createdAt}>{email.createdAt}</time>
                    </dd>
                  </div>
                  <div>
                    <dt className="inline font-medium">{tSite("Product")}: </dt>
                    <dd className="inline">{email.productSlug ?? "—"}</dd>
                  </div>
                  <div>
                    <dt className="inline font-medium">
                      {tSite("Order reference")}:{" "}
                    </dt>
                    <dd className="inline">{email.orderReference ?? "—"}</dd>
                  </div>
                </dl>
                {claimHref ? (
                  <a
                    href={claimHref}
                    referrerPolicy="no-referrer"
                    className="mt-4 inline-flex min-h-11 items-center rounded-md px-3 text-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-ring"
                  >
                    {tSite("Open captured purchase access")}
                  </a>
                ) : null}
                <details className="mt-5">
                  <summary className="min-h-11 cursor-pointer py-3 text-sm font-medium">
                    {tSite("View captured message source")}
                  </summary>
                  <iframe
                    title={`${tSite("Captured message")}: ${email.subject}`}
                    sandbox=""
                    referrerPolicy="no-referrer"
                    tabIndex={-1}
                    loading="lazy"
                    srcDoc={isolatedEmailPreview(email.html)}
                    className="pointer-events-none mt-3 h-[32rem] w-full rounded-md border bg-white"
                  />
                </details>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}
