import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import clientKeys from "@/messages/client-keys.json";
import fr from "@/messages/fr.json";
import { docsUI } from "@/lib/i18n/docs";
import { RootProvider } from "fumadocs-ui/provider/next";
import { Analytics } from "@vercel/analytics/react";

import "@/app/global.css";
import { geistSans, geistMono } from "@/app/fonts";
import { JsonLd } from "@/components/seo/json-ld";
import {
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  SITE_DESCRIPTION,
  SITE_DEFAULT_OG_IMAGE,
  SITE_DEFAULT_TWITTER_IMAGE,
} from "@/lib/seo/website";
import { PrivacyConsentBanner } from "@/components/privacy/privacy-consent-banner";
import { ConsentGatedGtm } from "@/components/privacy/consent-gated-gtm";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const clientFrenchMessages = {
  site: Object.fromEntries(
    clientKeys.map((key) => [key, fr.site[key as keyof typeof fr.site]]),
  ),
};

export const baseMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  creator: SITE_NAME,
  publisher: SITE_NAME,
  icons: {
    icon: [
      { url: "/favicon.ico?v=2", sizes: "16x16 32x32 48x48" },
      { url: "/favicon.svg?v=2", type: "image/svg+xml" },
      { url: "/favicon.png?v=2", type: "image/png", sizes: "64x64" },
    ],
    apple: [{ url: "/apple-touch-icon.png?v=2", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest?v=2",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [SITE_DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SITE_DEFAULT_TWITTER_IMAGE],
  },
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      alternateName: ["PyColors UI", "pycolors.io"],
      inLanguage: ["en", "fr"],
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png?v=2`,
        width: 512,
        height: 512,
      },
      sameAs: ["https://github.com/pycolors-io"],
    },
  ],
};

export function RootDocument({
  children,
  locale = "en",
}: {
  children: React.ReactNode;
  locale?: "en" | "fr";
}) {
  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
      data-scroll-behavior="smooth"
      data-site-palette="pycolors"
    >
      {/* eslint-disable-next-line @next/next/no-head-element -- Shared App Router root document; native head preserves pre-hydration palette setup. */}
      <head>
        <script
          id="site-appearance-init"
          src="/site-appearance.js"
          async
          blocking="render"
        />
        <JsonLd id="pycolors-site" data={siteJsonLd} />
      </head>

      <body className="flex min-h-screen flex-col">
        <NextIntlClientProvider
          locale={locale}
          timeZone="UTC"
          messages={locale === "fr" ? clientFrenchMessages : { site: {} }}
        >
          <RootProvider
            i18n={docsUI.provider(locale)}
            theme={{
              defaultTheme: "system",
              enableSystem: true,
              attribute: "class",
              storageKey: "theme",
              // Initialization is a shared render-blocking resource in the head.
              // Keep next-themes' inline bootstrap inert on client remounts.
              scriptProps: { type: "text/plain" },
            }}
          >
            {children}
            <ConsentGatedGtm gtmId={GTM_ID} />
            <PrivacyConsentBanner locale={locale} />
          </RootProvider>
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
