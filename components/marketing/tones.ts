/**
 * Shared tone vocabulary for the Marketing composition layer.
 *
 * Tones map to the existing PyColors product-ladder semantics and reuse the
 * semantic `@pycolors/tokens` surfaces. They never introduce a second token
 * taxonomy and never carry meaning on their own: every toned component still
 * communicates its meaning through text.
 */
export type MarketingTone = "neutral" | "pro" | "platform" | "success";

/** Tones approved for navigation and conversion surfaces. */
export type MarketingNavigationTone = Extract<MarketingTone, "neutral" | "pro">;

/**
 * Heading level supplied by the surrounding page hierarchy, so shared cards
 * and panels never break heading order.
 */
export type MarketingHeadingLevel = 2 | 3 | 4;

export const marketingSurfaceToneClass: Record<MarketingTone, string> = {
  neutral: "border-border-subtle bg-surface",
  pro: "border-pro-border-subtle bg-pro-surface",
  platform: "border-platform-border-subtle bg-platform-muted/40",
  success: "border-success-border-subtle bg-success-muted/40",
};

export const marketingPillToneClass: Record<MarketingTone, string> = {
  neutral: "border-border-subtle bg-surface-muted text-muted-foreground",
  pro: "border-pro-border-subtle bg-pro-surface-muted text-foreground",
  platform: "border-platform-border-subtle bg-platform-muted text-foreground",
  success: "border-success-border-subtle bg-success-muted text-foreground",
};
