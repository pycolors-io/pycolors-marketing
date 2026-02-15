'use client';

import * as React from 'react';

export type ToastVariant =
  | 'default'
  | 'success'
  | 'warning'
  | 'destructive';

export function useToastController() {
  const [open, setOpen] = React.useState(false);
  const [payload, setPayload] = React.useState<{
    variant: ToastVariant;
    title: string;
    description?: string;
    actionLabel?: string;
    onAction?: (() => void) | undefined;
  }>({
    variant: 'default',
    title: 'Default',
  });

  const trigger = React.useCallback((next: typeof payload) => {
    setPayload(next);
    setOpen(false);
    requestAnimationFrame(() => setOpen(true));
  }, []);

  return { open, setOpen, payload, trigger };
}
