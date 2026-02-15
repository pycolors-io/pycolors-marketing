'use client';

import * as React from 'react';

import {
  Button,
  Toast,
  ToastTitle,
  ToastDescription,
} from '@pycolors/ui';

type ToastVariant = 'default' | 'success' | 'warning' | 'destructive';

function useToastController() {
  const [open, setOpen] = React.useState(false);
  const [payload, setPayload] = React.useState<{
    variant: ToastVariant;
    title: string;
    description?: string;
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

/**
 * One trigger button demo
 *
 * IMPORTANT:
 * - This preview intentionally does NOT render <ToastProvider> or <ToastViewport>.
 * - In docs, wrap the page with a single provider + fixed viewport (bottom-right).
 */
export function ToastTriggerPreview() {
  const { open, setOpen, payload, trigger } = useToastController();

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          trigger({
            variant: 'success',
            title: 'Changes saved',
            description: 'Your settings were updated.',
          })
        }
      >
        Trigger toast
      </Button>

      <Toast
        open={open}
        onOpenChange={setOpen}
        variant={payload.variant}
        duration={2500}
      >
        <div className="min-w-0">
          <ToastTitle>{payload.title}</ToastTitle>
          {payload.description ? (
            <ToastDescription>{payload.description}</ToastDescription>
          ) : null}
        </div>
      </Toast>
    </div>
  );
}

/**
 * Variant buttons demo (recommended for docs)
 *
 * IMPORTANT:
 * - No Provider / Viewport here.
 * - The docs page owns the single ToastViewport so toasts appear bottom-right like a real app.
 */
export function ToastVariantsPreview() {
  const { open, setOpen, payload, trigger } = useToastController();

  return (
    <div className="grid w-full max-w-sm grid-cols-2 gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          trigger({ variant: 'default', title: 'Default' })
        }
      >
        Default
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          trigger({
            variant: 'success',
            title: 'Success',
            description: 'Everything looks good.',
          })
        }
      >
        Success
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          trigger({
            variant: 'warning',
            title: 'Warning',
            description: 'Check your inputs before continuing.',
          })
        }
      >
        Warning
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          trigger({
            variant: 'destructive',
            title: 'Destructive',
            description: 'Something went wrong.',
          })
        }
      >
        Destructive
      </Button>

      <Toast
        open={open}
        onOpenChange={setOpen}
        variant={payload.variant}
        duration={payload.variant === 'success' ? 2200 : 3000}
      >
        <div className="min-w-0">
          <ToastTitle>{payload.title}</ToastTitle>
          {payload.description ? (
            <ToastDescription>{payload.description}</ToastDescription>
          ) : null}
        </div>
      </Toast>
    </div>
  );
}
