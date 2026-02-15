'use client';

import * as React from 'react';
import {
  Button,
  Toast,
  ToastTitle,
  ToastDescription,
} from '@pycolors/ui';
import { useToastController } from './use-toast-controller';

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export function OptimisticToggleDemo() {
  const { open, setOpen, payload, trigger } = useToastController();
  const [enabled, setEnabled] = React.useState(false);
  const [pending, setPending] = React.useState(false);

  const onToggle = React.useCallback(async () => {
    if (pending) return;

    const prev = enabled;

    // optimistic
    setEnabled(!prev);
    setPending(true);

    try {
      await sleep(700);
      if (Math.random() < 0.25) throw new Error('toggle_failed');

      trigger({
        variant: 'success',
        title: 'Updated',
        description: `Setting is now ${!prev ? 'enabled' : 'disabled'}.`,
      });
    } catch {
      // rollback
      setEnabled(prev);

      trigger({
        variant: 'destructive',
        title: 'Update failed',
        description: 'Your change was not saved. Please retry.',
        actionLabel: 'Retry',
        onAction: () => void onToggle(),
      });
    } finally {
      setPending(false);
    }
  }, [enabled, pending, trigger]);

  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/20 p-4">
      <div className="text-sm">
        Feature:{' '}
        <span className="font-medium">
          {enabled ? 'Enabled' : 'Disabled'}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={() => void onToggle()}
          disabled={pending}
        >
          {pending ? 'Updating…' : 'Toggle'}
        </Button>

        <Toast
          open={open}
          onOpenChange={setOpen}
          variant={payload.variant}
          duration={3600}
        >
          <div className="min-w-0">
            <ToastTitle>{payload.title}</ToastTitle>
            {payload.description ? (
              <ToastDescription>
                {payload.description}
              </ToastDescription>
            ) : null}

            {payload.actionLabel && payload.onAction ? (
              <div className="mt-2 flex justify-end">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => payload.onAction?.()}
                >
                  {payload.actionLabel}
                </Button>
              </div>
            ) : null}
          </div>
        </Toast>
      </div>
    </div>
  );
}
