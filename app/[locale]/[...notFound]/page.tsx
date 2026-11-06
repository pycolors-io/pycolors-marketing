import { notFound } from "next/navigation";
import { getCopy } from "@/lib/i18n/server-copy";
import { isLocale } from "@/lib/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const tSite = await getCopy(isLocale(locale) ? locale : "en");
  return {
    title: tSite("Page not found"),
    robots: { index: false, follow: false },
  };
}

// Keep unmatched localized URLs inside the locale document and its providers.
export default function UnmatchedPage() {
  notFound();
}
