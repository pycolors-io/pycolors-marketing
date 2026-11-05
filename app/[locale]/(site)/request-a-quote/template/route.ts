import { isLocale } from "@/lib/i18n/routing";
import { createProposalTemplate } from "@/lib/quotes/proposal-template";

export const dynamic = "force-static";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale: candidate } = await params;
  const locale = isLocale(candidate) ? candidate : "en";
  return new Response(createProposalTemplate(locale), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": `attachment; filename="pycolors-proposal-template-${locale}.md"`,
      "X-Content-Type-Options": "nosniff",
      "X-Robots-Tag": "noindex",
    },
  });
}
