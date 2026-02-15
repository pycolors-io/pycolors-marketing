'use client';

import * as React from 'react';
import {
  Button,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Toast,
  ToastTitle,
  ToastDescription,
} from '@pycolors/ui';
import { useToastController } from './use-toast-controller';

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export function DeleteWithUndoToastDemo() {
  const { open, setOpen, payload, trigger } = useToastController();
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const [deleted, setDeleted] = React.useState(false);
  const undoRef = React.useRef<null | (() => void)>(null);

  const onDelete = React.useCallback(async () => {
    setDialogOpen(false);

    // optimistic delete
    setDeleted(true);

    const undo = () => setDeleted(false);
    undoRef.current = undo;

    trigger({
      variant: 'warning',
      title: 'Item deleted',
      description: 'You can undo this action.',
      actionLabel: 'Undo',
      onAction: undo,
    });

    await sleep(900);

    // simulate failure
    if (Math.random() < 0.25) {
      // rollback
      setDeleted(false);
      trigger({
        variant: 'destructive',
        title: 'Delete failed',
        description: 'Please retry.',
        actionLabel: 'Retry',
        onAction: () => void onDelete(),
      });
    }
  }, [trigger]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/20 p-4">
        <div className="text-sm">
          Status:{' '}
          <span className="font-medium">
            {deleted ? 'Deleted' : 'Active'}
          </span>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="destructive" disabled={deleted}>
              Delete
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete item</DialogTitle>
              <DialogDescription>
                This action removes the item. Undo is available for a
                short time.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => void onDelete()}
              >
                Confirm delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Toast
        open={open}
        onOpenChange={setOpen}
        variant={payload.variant}
        duration={4200}
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
