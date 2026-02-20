import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  transpilePackages: ['@pycolors/ui', '@pycolors/tokens'],

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.shields.io',
        pathname: '/npm/**',
      },
    ],

    dangerouslyAllowSVG: true,

    contentSecurityPolicy:
      "default-src 'self'; img-src 'self' https: data:; sandbox;",
  },
};

export default withMDX(config);
