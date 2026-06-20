import type { Metadata } from 'next';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { Analytics } from '@vercel/analytics/react';

import './global.css';
import { inter } from './fonts';
import { JsonLd } from '@/components/seo/json-ld';
import {
  SITE_NAME,
  SITE_URL,
  SITE_DESCRIPTION,
  SITE_DEFAULT_OG_IMAGE,
  SITE_DEFAULT_TWITTER_IMAGE,
} from '@/lib/seo/website';
import { PrivacyConsentBanner } from '@/components/privacy/privacy-consent-banner';
import { ConsentGatedGtm } from '@/components/privacy/consent-gated-gtm';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  creator: SITE_NAME,
  publisher: SITE_NAME,
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.png', type: 'image/png', sizes: '64x64' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [SITE_DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [SITE_DEFAULT_TWITTER_IMAGE],
  },
};

const siteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      alternateName: ['PyColors UI', 'pycolors.io'],
      inLanguage: 'en',
      publisher: {
        '@id': `${SITE_URL}/#organization`,
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      description:
        'PyColors builds tools, starters, UI systems, and templates to help developers ship SaaS products faster.',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
      sameAs: ['https://github.com/pycolors-io'],
    },
  ],
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={inter.className}
    >
      <head>
        <JsonLd id="pycolors-site" data={siteJsonLd} />
      </head>

      <body className="flex min-h-screen flex-col">
        <RootProvider
          theme={{
            defaultTheme: 'dark',
            enableSystem: false,
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
