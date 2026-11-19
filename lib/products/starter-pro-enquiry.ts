import { STARTER_PRO_MOBILE_PREVIEW } from "./starter-pro-mobile-preview";

/** Discussion context only: these destinations do not create a purchase offer. */
export const STARTER_PRO_ENQUIRIES = {
  mobile: {
    id: "starter-pro-mobile",
    product: STARTER_PRO_MOBILE_PREVIEW.name,
    href: "/contact?interest=starter-pro-mobile",
    action: "Discuss your Mobile project",
    heading: "Let's discuss your Mobile project.",
    subject: "Starter Pro Mobile enquiry",
    description:
      "Tell us about the native app you want to build and the scope you would like to discuss. Mobile is not on sale; availability and final terms are still to be announced.",
  },
  fullstack: {
    id: "starter-pro-fullstack",
    product: STARTER_PRO_MOBILE_PREVIEW.bundle.name,
    href: "/contact?interest=starter-pro-fullstack",
    action: "Discuss your Web and Mobile project",
    heading: "Let's discuss your Web and Mobile project.",
    subject: "Starter Pro Fullstack enquiry",
    description:
      "Tell us about your Web and native app needs. Fullstack is a proposed bundle, not a purchase offer; final scope, availability and terms are still to be announced.",
  },
} as const;

/** Never reflect free-form query text or repeated parameters into an email. */
export function getStarterProEnquiry(value: string | string[] | undefined) {
  return Object.values(STARTER_PRO_ENQUIRIES).find(({ id }) => id === value);
}
