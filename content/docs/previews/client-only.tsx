"use client";

import { useCopy } from "@/lib/i18n/use-copy";
import * as React from "react";

export function ClientOnly({
  children,
  fallback = null,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const tSite = useCopy();

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);
  if (!mounted) return fallback;

  return <>{tSite(children)}</>;
}
