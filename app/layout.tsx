import type { Metadata } from 'next';
import Script from 'next/script';
import { RootProvider } from 'fumadocs-ui/provider/next';

import './global.css';
import { inter } from './fonts';
import { JsonLd } from '@/components/seo/json-ld';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const SITE_URL = 'https://pycolors.io';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'PyColors',
    template: '%s · PyColors',
  },
  description:
    'PyColors is a production-shaped SaaS ecosystem for developers: UI system, SaaS starter, templates, guides, and patterns to build real products faster.',
  applicationName: 'PyColors',
  creator: 'PyColors',
  publisher: 'PyColors',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.png', type: 'image/png' },
    ],
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    type: 'website',
    siteName: 'PyColors',
    title: 'PyColors',
    description:
      'Build SaaS products faster with PyColors — a minimal UI system, SaaS starter, templates, and guides.',
    url: SITE_URL,
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PyColors',
    description:
      'Build SaaS products faster with PyColors — UI system, SaaS starter, templates, and guides.',
    images: ['/seo/twitter-main.png'],
  },
};

const siteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'PyColors',
      description:
        'PyColors is a SaaS ecosystem for developers: UI system, SaaS starter, guides, templates, and patterns to build real products faster.',
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
      name: 'PyColors',
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

        {GTM_ID ? (
          <Script
            id="gtm"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_ID}');
              `,
            }}
          />
        ) : null}
      </head>

      <body className="flex min-h-screen flex-col">
        {GTM_ID ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        ) : null}

        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
