import { PRODUCT_COMPONENT_VERSIONS } from "./public-catalog.generated";
import type { PublicProductSlug } from "./public-catalog";

type ProductRelease = {
  slug: PublicProductSlug;
  name: string;
  description: string;
  artwork: string;
  packageVersion: string;
  includedComponents: readonly string[];
  links: readonly { label: string; href: string }[];
};

/**
 * Documented archive versions follow the producer: Starter packages use the
 * Web/backend version, while NA-AI uses its template version. These references
 * are not a receipt for an active buyer download or a native app release.
 */
export const DOCUMENTED_PRODUCT_RELEASES = [
  {
    slug: "starter-pro",
    name: "Starter Pro Web",
    description: "Your Web application and its compatible backend.",
    artwork: "/images/starters/pro/concepts/delivery-case-test-v1.png",
    packageVersion: PRODUCT_COMPONENT_VERSIONS.web,
    includedComponents: ["Web", "Backend"],
    links: [
      {
        label: "Read Web release notes",
        href: "/docs/starter-pro/releases-history",
      },
      {
        label: "Web update guide",
        href: "/docs/starter-pro/customization-and-upgrades",
      },
    ],
  },
  {
    slug: "starter-pro-mobile",
    name: "Starter Pro Mobile",
    description: "Native Mobile source, with a compatible backend.",
    artwork: "/images/starters/pro/concepts/connected-workspace-test-v1.png",
    packageVersion: PRODUCT_COMPONENT_VERSIONS.web,
    includedComponents: ["Mobile", "Backend"],
    links: [
      { label: "Read the Mobile guide", href: "/docs/starter-pro/mobile" },
    ],
  },
  {
    slug: "starter-pro-fullstack",
    name: "Starter Pro Fullstack",
    description: "Web and Mobile, with one shared backend.",
    artwork: "/images/starters/pro/concepts/source-stack-test-v1.png",
    packageVersion: PRODUCT_COMPONENT_VERSIONS.web,
    includedComponents: ["Web", "Mobile", "Backend"],
    links: [
      {
        label: "Read Web release notes",
        href: "/docs/starter-pro/releases-history",
      },
      {
        label: "Read the Fullstack guide",
        href: "/docs/starter-pro/fullstack",
      },
    ],
  },
  {
    slug: "na-ai-landing",
    name: "NA-AI Landing",
    description: "A focused landing-page template for your product.",
    artwork: "/images/starters/pro/concepts/workflow-path-test-v1.png",
    packageVersion: PRODUCT_COMPONENT_VERSIONS.naAi,
    includedComponents: ["Template"],
    links: [
      {
        label: "Read NA-AI release notes",
        href: "/docs/templates/na-ai-landing/releases-history",
      },
      {
        label: "NA-AI customization guide",
        href: "/docs/templates/na-ai-landing/customization",
      },
    ],
  },
] as const satisfies readonly ProductRelease[];
