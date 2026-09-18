"use client";

import * as React from "react";
import {
  Button,
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@pycolors/ui";

export function SaveToastExample() {
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);

  return (
    <ToastProvider>
      <Button ref={triggerRef} type="button" onClick={() => setOpen(true)}>
        Simulate successful save
      </Button>
      <Toast
        open={open}
        onOpenChange={setOpen}
        variant="success"
        duration={5000}
      >
        <div className="min-w-0">
          <ToastTitle>Settings saved</ToastTitle>
          <ToastDescription>
            This confirmation is a local preview.
          </ToastDescription>
        </div>
        <ToastClose asChild>
          <Button
            type="button"
            size="sm"
            variant="outline"
            aria-label="Dismiss notification"
            onClick={() => triggerRef.current?.focus()}
          >
            Dismiss
          </Button>
        </ToastClose>
      </Toast>
      <ToastViewport className="fixed bottom-4 right-4 z-50 m-0 flex w-80 max-w-[calc(100vw-2rem)] list-none flex-col gap-2 p-0 outline-none" />
    </ToastProvider>
  );
}
