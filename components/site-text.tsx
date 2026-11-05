import type { ReactNode } from "react";
import { useCopy } from "@/lib/i18n/use-copy";
/** A text-only boundary for reusable JSX data declared outside a component. */
export function SiteText({ text }: { text: ReactNode }) {
  const tSite = useCopy();
  return tSite(text);
}
