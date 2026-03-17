import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Technical articles from PyColors about SaaS architecture, product UX, Next.js, design systems, and production-ready implementation decisions.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog · PyColors',
    description:
      'Technical articles from PyColors about SaaS architecture, product UX, Next.js, design systems, and production-ready implementation decisions.',
    url: '/blog',
    images: ['/seo/og-main.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog · PyColors',
    description:
      'Technical articles from PyColors about SaaS architecture, product UX, Next.js, design systems, and production-ready implementation decisions.',
    images: ['/seo/twitter-main.png'],
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
