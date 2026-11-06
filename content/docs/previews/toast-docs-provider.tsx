"use client";

import { useCopy } from "@/lib/i18n/use-copy";
import { ToastProvider, ToastViewport } from "@pycolors/ui";
import * as React from "react";

export function ToastDocsProvider({ children }: { children: React.ReactNode }) {
  const tSite = useCopy();

  return (
    <ToastProvider>
      {tSite(children)}

      <ToastViewport className="fixed bottom-4 right-4 z-50 flex w-90 max-w-[calc(100vw-2rem)] flex-col gap-2 outline-none" />
    </ToastProvider>
  );
}
