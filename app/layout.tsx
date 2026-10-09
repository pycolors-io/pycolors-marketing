import type { Metadata } from "next";
import { RootProvider } from "fumadocs-ui/provider/next";
import { Analytics } from "@vercel/analytics/react";

import "./global.css";
import { geistSans, geistMono } from "./fonts";
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
import { SITE_PALETTE_INIT_SCRIPT } from "@/lib/site-palette";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export const metadata: Metadata = {
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
      inLanguage: "en",
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

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
      data-scroll-behavior="smooth"
      data-site-palette="pycolors"
    >
      <head>
        <script
          id="site-palette-init"
          dangerouslySetInnerHTML={{ __html: SITE_PALETTE_INIT_SCRIPT }}
        />
        <JsonLd id="pycolors-site" data={siteJsonLd} />
      </head>

      <body className="flex min-h-screen flex-col">
        <RootProvider
          theme={{
            defaultTheme: "dark",
            enableSystem: true,
          }}
        >
          {children}
          <ConsentGatedGtm gtmId={GTM_ID} />
          <PrivacyConsentBanner />
        </RootProvider>
        <Analytics />
      </body>
    </html>
  );
}
