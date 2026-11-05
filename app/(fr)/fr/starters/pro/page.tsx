import { PRODUCT_DISPLAY } from "@/lib/products/public-catalog";
import { frenchMetadata } from "@/lib/i18n/routes";
import { FrenchStarterPro } from "@/components/marketing/french-commercial-pages";
export const metadata = frenchMetadata(
  "starterPro",
  "Starter SaaS Next.js avec authentification et Stripe",
  `Découvrez PyColors Starter Pro : Auth.js, Stripe, Prisma, PostgreSQL, équipes, projets et guides acheteur. Licence source à ${PRODUCT_DISPLAY["starter-pro"].priceLabel} et accompagnement distinct.`,
);
export default FrenchStarterPro;
