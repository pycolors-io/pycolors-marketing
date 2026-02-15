import type { Metadata } from 'next';
import Script from 'next/script';
import { RootProvider } from 'fumadocs-ui/provider/next';

import './global.css';
import { inter } from './fonts';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export const metadata: Metadata = {
  metadataBase: new URL('https://pycolors.io'),
  title: { default: 'PyColors', template: '%s · PyColors' },
  description:
    'PyColors is a product ecosystem for shipping real SaaS — a minimal UI system, premium templates, and production-ready starters, built in public.',
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
      'PyColors is a product ecosystem for shipping real SaaS — a minimal UI system, premium templates, and production-ready starters, built in public.',
    url: '/',
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
