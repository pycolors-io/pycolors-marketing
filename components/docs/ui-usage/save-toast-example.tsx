"use client";

import { useCopy } from "@/lib/i18n/use-copy";
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
  const tSite = useCopy();

  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);

  return (
    <ToastProvider>
      <Button ref={triggerRef} type="button" onClick={() => setOpen(true)}>
        {tSite("Simulate successful save")}
      </Button>
      <Toast
        open={open}
        onOpenChange={setOpen}
        variant="success"
        duration={5000}
      >
        <div className="min-w-0">
          <ToastTitle>{tSite("Settings saved")}</ToastTitle>
          <ToastDescription>
            {tSite("This confirmation is a local preview.")}
          </ToastDescription>
        </div>
        <ToastClose asChild>
          <Button
            type="button"
            size="sm"
            variant="outline"
            aria-label={tSite("Dismiss notification")}
            onClick={() => triggerRef.current?.focus()}
          >
            {tSite("Dismiss")}
          </Button>
        </ToastClose>
      </Toast>
      <ToastViewport className="fixed bottom-4 right-4 z-50 m-0 flex w-80 max-w-[calc(100vw-2rem)] list-none flex-col gap-2 p-0 outline-none" />
    </ToastProvider>
  );
}
