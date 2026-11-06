import { isLocale } from "@/lib/i18n/routing";
import { createProposalDocx } from "@/lib/quotes/proposal-docx";

export const dynamic = "force-static";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale: requestedLocale } = await params;
  const locale = isLocale(requestedLocale) ? requestedLocale : "en";
  return new Response(new Uint8Array(createProposalDocx(locale)), {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename="pycolors-proposal-template-${locale}.docx"`,
      "X-Robots-Tag": "noindex",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
