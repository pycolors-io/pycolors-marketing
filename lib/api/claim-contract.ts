import { z } from "zod";
import {
  COMMERCE_TERMS_VERSION,
  UPGRADE_DISPLAY,
} from "@/lib/products/public-catalog";

const upgradeSchema = z
  .object({
    eligible: z.literal(true),
    available: z.boolean(),
    targetProductSlug: z.literal("starter-pro-fullstack"),
    offerKey: z.enum(["web-to-fullstack", "mobile-to-fullstack"]),
    amountTotal: z.number().int().nonnegative(),
    currency: z.literal("eur"),
    termsVersion: z.literal(COMMERCE_TERMS_VERSION),
  })
  .refine(
    (value) =>
      value.amountTotal === UPGRADE_DISPLAY[value.offerKey].amountTotal,
  );

const responseSchema = z.object({
  ok: z.literal(true),
  claim: z.object({
    productSlug: z.string().nullable(),
    productName: z.string().min(1),
    downloadAvailable: z.boolean().default(false),
    orderReference: z.string().min(1),
    customerEmail: z.string(),
    paidAt: z.string().nullable(),
    upgrade: z.unknown().optional(),
  }),
});

export type VerifiedPurchaseUpgrade = z.infer<typeof upgradeSchema>;

/** An invalid upgrade never disables valid original purchase access. */
export function parseClaimResponse(input: unknown) {
  const result = responseSchema.safeParse(input);
  if (!result.success) return null;
  const { upgrade: rawUpgrade, ...claim } = result.data.claim;
  const upgrade = upgradeSchema.safeParse(rawUpgrade);
  return {
    ok: true as const,
    claim: {
      ...claim,
      upgrade:
        upgrade.success &&
        UPGRADE_DISPLAY[upgrade.data.offerKey].sourceProductSlug ===
          claim.productSlug
          ? upgrade.data
          : null,
    },
  };
}
