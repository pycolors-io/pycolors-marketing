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
  title: { default: 'PyColors', template: '%s · PyColors' },
  description:
    'PyColors is a product ecosystem for shipping real SaaS — a minimal UI system, premium templates, and production-ready starters, built in public.',
  applicationName: 'PyColors',
  creator: 'PyColors',
  publisher: 'PyColors',
  alternates: {
    canonical: '/',
  },
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
      'PyColors is a product ecosystem for shipping real SaaS — a minimal UI system, premium templates, and production-ready starters, built in public.',
    url: SITE_URL,
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PyColors',
    description:
      'PyColors is a product ecosystem for shipping real SaaS — a minimal UI system, premium templates, and production-ready starters, built in public.',
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
      alternateName: 'PyColors UI',
      description:
        'Product ecosystem for shipping real SaaS — UI system, templates, and production-ready starters.',
      inLanguage: 'en',
      publisher: {
        '@id': `${SITE_URL}/#organization`,
      },
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'PyColors',
      url: SITE_URL,
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
