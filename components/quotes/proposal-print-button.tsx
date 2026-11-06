"use client";

import { Printer } from "lucide-react";
import { SiteButton } from "@/components/site-button";
import { useCopy } from "@/lib/i18n/use-copy";

export function ProposalPrintButton() {
  const tSite = useCopy();
  return (
    <SiteButton variant="ghost" size="sm" onClick={() => window.print()}>
      <Printer aria-hidden="true" />
      {tSite("Print / Save PDF")}
    </SiteButton>
  );
}
