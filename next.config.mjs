import createNextIntlPlugin from "next-intl/plugin";
import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // Keep locale rewrites on the incoming origin (including loopback production tests).
  skipProxyUrlNormalize: true,
  // Multiple static root documents provide the correct initial EN/FR language.
  experimental: { globalNotFound: true },
  transpilePackages: ["@pycolors/ui", "@pycolors/tokens"],

  images: {
    // Detailed product captures opt in; other images retain the default quality.
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.shields.io",
        pathname: "/npm/**",
      },
    ],

    dangerouslyAllowSVG: true,

    contentSecurityPolicy:
      "default-src 'self'; img-src 'self' https: data:; sandbox;",
  },
};

export default withNextIntl(withMDX(config));
