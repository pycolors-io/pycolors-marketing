import { STARTER_PRO_MOBILE_PREVIEW } from "./starter-pro-mobile-preview";

/** Project discussion remains separate from purchasing a source licence. */
export const STARTER_PRO_ENQUIRIES = {
  mobile: {
    id: "starter-pro-mobile",
    product: STARTER_PRO_MOBILE_PREVIEW.name,
    href: "/contact?interest=starter-pro-mobile",
    action: "Discuss your Mobile project",
    heading: "Let's discuss your Mobile project.",
    subject: "Starter Pro Mobile enquiry",
    description:
      "Tell us about the native app you want to build. Starter Pro Mobile includes native source and a compatible backend; tailored implementation is a separate service.",
  },
  fullstack: {
    id: "starter-pro-fullstack",
    product: STARTER_PRO_MOBILE_PREVIEW.bundle.name,
    href: "/contact?interest=starter-pro-fullstack",
    action: "Discuss your Web and Mobile project",
    heading: "Let's discuss your Web and Mobile project.",
    subject: "Starter Pro Fullstack enquiry",
    description:
      "Tell us about your Web and native app needs. Starter Pro Fullstack includes Web, Mobile and a shared API source; tailored implementation is a separate service.",
  },
} as const;

/** Never reflect free-form query text or repeated parameters into an email. */
export function getStarterProEnquiry(value: string | string[] | undefined) {
  return Object.values(STARTER_PRO_ENQUIRIES).find(({ id }) => id === value);
}
