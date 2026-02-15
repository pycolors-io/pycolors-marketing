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

export function SaveWithToastDemo() {
  const { open, setOpen, payload, trigger } = useToastController();
  const [isSaving, setIsSaving] = React.useState(false);

  const onSave = React.useCallback(async () => {
    setIsSaving(true);

    try {
      await sleep(850);
      if (Math.random() < 0.3) throw new Error('save_failed');

      trigger({
        variant: 'success',
        title: 'Changes saved',
        description: 'Your settings were updated.',
      });
    } catch {
      trigger({
        variant: 'destructive',
        title: 'Couldn’t save changes',
        description: 'Please retry.',
        actionLabel: 'Retry',
        onAction: () => void onSave(),
      });
    } finally {
      setIsSaving(false);
    }
  }, [trigger]);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <Button onClick={() => void onSave()} disabled={isSaving}>
          {isSaving ? 'Saving…' : 'Save changes'}
        </Button>

        <span className="text-xs text-muted-foreground">
          Inline state + toast result
        </span>
      </div>

      <Toast
        open={open}
        onOpenChange={setOpen}
        variant={payload.variant}
        duration={payload.variant === 'success' ? 2200 : 3200}
      >
        <div className="min-w-0">
          <ToastTitle>{payload.title}</ToastTitle>
          {payload.description ? (
            <ToastDescription>{payload.description}</ToastDescription>
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
  );
}
