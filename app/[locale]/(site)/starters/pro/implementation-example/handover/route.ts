import { getCopy } from "@/lib/i18n/server-copy";
import { isLocale } from "@/lib/i18n/routing";
import {
  createExampleHandover,
  implementationExample,
} from "@/lib/products/implementation-example";

export const dynamic = "force-static";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;
  const t = await getCopy(isLocale(locale) ? locale : "en");
  return new Response(createExampleHandover(t, t.href), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": `attachment; filename="${implementationExample.filename}"`,
      "X-Content-Type-Options": "nosniff",
      "X-Robots-Tag": "noindex",
    },
  });
}
