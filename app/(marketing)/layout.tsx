import type { Metadata } from 'next';

import { SiteHeader } from '@/components/layout/site-header';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://pycolors.io'),
  alternates: { canonical: '/' },
  title: {
    default: 'PyColors',
    template: '%s · PyColors',
  },
  description:
    'PyColors is a product ecosystem for shipping real SaaS: a minimal UI system, premium templates, and production-ready starters.',
  openGraph: {
    title: 'PyColors',
    description:
      'A product ecosystem for shipping real SaaS: UI system, premium templates, and production-ready starters.',
    url: '/',
    siteName: 'PyColors',
    images: ['/seo/og-main.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PyColors',
    description:
      'A product ecosystem for shipping real SaaS: UI system, premium templates, and production-ready starters.',
    images: ['/seo/twitter-main.png'],
  },
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <SiteHeader />
      <main className="flex-1 bg-background text-foreground pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}
