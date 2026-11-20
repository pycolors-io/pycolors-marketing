import { z } from "zod";

const captureSchema = z.object({
  ok: z.literal(true),
  emails: z
    .array(
      z.object({
        id: z.string().min(1).max(200),
        createdAt: z.string().max(64),
        to: z.union([
          z.string().max(500),
          z.array(z.string().max(500)).max(10),
        ]),
        subject: z.string().max(1000),
        html: z.string().max(250_000),
        kind: z.string().max(100),
        orderReference: z.string().max(200).nullable().optional(),
        productSlug: z.string().max(100).nullable().optional(),
      }),
    )
    .max(50),
});

export function parseCapturedEmails(value: unknown) {
  const result = captureSchema.safeParse(value);
  return result.success ? result.data.emails : null;
}

/** Return only one same-application claim destination, never an arbitrary email link. */
export function capturedClaimHref(html: string, appBase: string | undefined) {
  if (!appBase) return null;
  try {
    const base = new URL(appBase);
    if (
      base.username ||
      base.password ||
      !["https:", "http:"].includes(base.protocol)
    )
      return null;
    const destinations = new Set<string>();
    for (const match of html.matchAll(/\bhref\s*=\s*["']([^"'<>]+)["']/gi)) {
      const url = new URL(match[1], base);
      const tokens = url.searchParams.getAll("token");
      if (
        url.origin !== base.origin ||
        url.username ||
        url.password ||
        url.hash ||
        !/^\/(?:en\/|fr\/)?orders\/claim$/.test(url.pathname) ||
        url.searchParams.size !== 1 ||
        tokens.length !== 1 ||
        !/^[a-zA-Z0-9_-]{1,512}$/.test(tokens[0])
      )
        continue;
      destinations.add(
        `${url.pathname}?token=${encodeURIComponent(tokens[0])}`,
      );
    }
    return destinations.size === 1 ? [...destinations][0] : null;
  } catch {
    return null;
  }
}

/** Render inert source, not arbitrary active email HTML or refresh directives. */
export function isolatedEmailPreview(html: string) {
  const escaped = html
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
  return (
    "<!doctype html><meta http-equiv=\"Content-Security-Policy\" content=\"default-src 'none'; style-src 'unsafe-inline'; img-src data:; form-action 'none'; base-uri 'none'; script-src 'none'\"><pre style=\"white-space:pre-wrap;overflow-wrap:anywhere;font:13px/1.6 monospace\">" +
    escaped +
    "</pre>"
  );
}
