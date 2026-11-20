import type { Metadata } from "next";
import { StarterProPlatformPage } from "@/components/starters/starter-pro-platform-page";
import { localizePageMetadata } from "@/lib/i18n/metadata";

const metadata: Metadata = {
  title: "Starter Pro Mobile — native source and backend",
  description:
    "Native iOS and Android source with a compatible backend. One-time source licence, including VAT. No Web purchase required.",
  alternates: { canonical: "/starters/mobile" },
  openGraph: {
    title: "Starter Pro Mobile — native source and backend",
    description:
      "Native iOS and Android source with a compatible backend. One-time source licence, including VAT. No Web purchase required.",
    url: "/starters/mobile",
    siteName: "PyColors",
    type: "website",
    images: ["/seo/og-main.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Starter Pro Mobile — native source and backend",
    description:
      "Native iOS and Android source with a compatible backend. One-time source licence, including VAT. No Web purchase required.",
    images: ["/seo/twitter-main.png"],
  },
};

export default function StarterMobilePage() {
  return <StarterProPlatformPage productSlug="starter-pro-mobile" />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return localizePageMetadata(metadata, "/starters/mobile", locale);
}
