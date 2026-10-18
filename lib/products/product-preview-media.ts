/**
 * Verified, repository-owned product captures used in commercial discovery.
 * These are example interfaces, not evidence of customer activity or deployment.
 */
export const PRODUCT_PREVIEW_MEDIA = {
  "na-ai-landing": {
    light: "/templates/na-ai/na-ai-analytics-workspace-light.webp",
    dark: "/templates/na-ai/na-ai-analytics-workspace-dark.webp",
    alt: "NA-AI Landing template with illustrative analytics content",
    caption: "Landing page template · Illustrative content",
  },
  "starter-free": {
    light: "/images/starters/free/product-preview/dashboard-light.png",
    dark: "/images/starters/free/product-preview/dashboard-dark.png",
    alt: "Starter Free dashboard with example projects and metrics",
    caption: "Runnable frontend · Mock data",
  },
  "starter-pro": {
    light: "/images/starters/pro/dashboard-pycolors.png",
    dark: "/images/starters/pro/dashboard-dark-pycolors.png",
    alt: "Starter Pro dashboard with sample projects and workspace metrics",
    caption: "SaaS foundation · Demo workspace",
  },
} as const;

export type ProductPreviewId = keyof typeof PRODUCT_PREVIEW_MEDIA;
