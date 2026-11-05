"use client";

import { useCopy } from "@/lib/i18n/use-copy";
import * as React from "react";
import { Container } from "@/components/container";

export interface MarketingShellProps {
  children: React.ReactNode;
}

export function MarketingShell({ children }: MarketingShellProps) {
  const tSite = useCopy();

  return (
    <div className="flex flex-col bg-background text-foreground">
      <main id="main" className="flex-1 flex items-center">
        <Container>{tSite(children)}</Container>
      </main>
    </div>
  );
}
