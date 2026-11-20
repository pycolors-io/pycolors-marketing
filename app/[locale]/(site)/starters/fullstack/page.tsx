import type { Metadata } from "next";
import { StarterProPlatformPage } from "@/components/starters/starter-pro-platform-page";
import { localizePageMetadata } from "@/lib/i18n/metadata";

const metadata: Metadata = {
  title: "Starter Pro Fullstack — Web, Mobile and shared API",
  description:
    "Web and native Mobile source with a shared API, accounts and data. One-time source licence, including VAT.",
  alternates: { canonical: "/starters/fullstack" },
  openGraph: {
    title: "Starter Pro Fullstack — Web, Mobile and shared API",
    description:
      "Web and native Mobile source with a shared API, accounts and data. One-time source licence, including VAT.",
    url: "/starters/fullstack",
    siteName: "PyColors",
    type: "website",
    images: ["/seo/og-main.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Starter Pro Fullstack — Web, Mobile and shared API",
    description:
      "Web and native Mobile source with a shared API, accounts and data. One-time source licence, including VAT.",
    images: ["/seo/twitter-main.png"],
  },
};

export default function StarterFullstackPage() {
  return <StarterProPlatformPage productSlug="starter-pro-fullstack" />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return localizePageMetadata(metadata, "/starters/fullstack", locale);
}
