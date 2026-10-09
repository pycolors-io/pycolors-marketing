"use client";

import * as React from "react";
import { FolderOpen, Save, X } from "lucide-react";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastViewport,
} from "@pycolors/ui";
import { SiteButton as Button } from "@/components/site-button";
import type { ThemeBuilderState } from "./theme-builder-state";
import type { ThemeFont } from "./theme-typography";
import { downloadThemeFile } from "./theme-file";
import {
  createThemeConfigurationFile,
  MAX_THEME_CONFIGURATION_BYTES,
  THEME_CONFIGURATION_SIZE_ERROR,
  parseThemeConfiguration,
  type RestoredThemeConfiguration,
} from "./theme-configuration";

export function ThemeConfigurationControls({
  state,
  font,
  onRestore,
}: Readonly<{
  state: ThemeBuilderState;
  font: ThemeFont;
  onRestore: (configuration: RestoredThemeConfiguration) => void;
}>) {
  const input = React.useRef<HTMLInputElement>(null);
  const operation = React.useRef(0);
  const currentEditor = React.useRef({ state, font });
  const [reading, setReading] = React.useState(false);
  const [notice, setNotice] = React.useState({
    message: "",
    error: false,
    id: 0,
  });
  const [noticeOpen, setNoticeOpen] = React.useState(false);
  const hasErrors =
    Object.keys(state.fieldErrors).length > 0 || !!state.generationError;
  React.useEffect(
    () => () => {
      operation.current += 1;
    },
    [],
  );
  React.useEffect(() => {
    currentEditor.current = { state, font };
  }, [state, font]);

  function showNotice(next: { message: string; error: boolean }) {
    setNotice((previous) => ({ ...next, id: previous.id + 1 }));
    setNoticeOpen(true);
  }

  function saveConfiguration() {
    try {
      downloadThemeFile(createThemeConfigurationFile(state, font));
      showNotice({
        message:
          "Configuration download requested. Keep the file to reopen your theme.",
        error: false,
      });
    } catch {
      showNotice({
        message: "The configuration could not be downloaded. Please try again.",
        error: true,
      });
    }
  }

  async function openConfiguration(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = "";
    if (!file) return;
    const current = ++operation.current;
    if (file.size > MAX_THEME_CONFIGURATION_BYTES) {
      showNotice({
        message: THEME_CONFIGURATION_SIZE_ERROR,
        error: true,
      });
      setReading(false);
      return;
    }
    setReading(true);
    setNoticeOpen(false);
    try {
      const result = parseThemeConfiguration(await file.text());
      if (current !== operation.current) return;
      if (
        currentEditor.current.state !== state ||
        currentEditor.current.font !== font
      ) {
        showNotice({
          message:
            "Your settings changed while this file was opening. Open it again to apply the configuration.",
          error: true,
        });
        return;
      }
      if (!result.ok) {
        showNotice({ message: result.message, error: true });
        return;
      }
      onRestore(result.value);
      showNotice({
        message:
          "Configuration opened. Colors, font, and preview mode restored.",
        error: false,
      });
    } catch {
      if (current === operation.current)
        showNotice({
          message: "This file could not be read. Your theme has not changed.",
          error: true,
        });
    } finally {
      if (current === operation.current) setReading(false);
    }
  }

  return (
    <div
      role="group"
      aria-label="Theme configuration"
      className="flex min-w-0 flex-col gap-2"
    >
      <div className="flex flex-wrap gap-2">
        <input
          ref={input}
          type="file"
          accept=".json,application/json"
          aria-label="Open theme configuration file"
          hidden
          onChange={openConfiguration}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="rounded-[5px]"
          disabled={reading}
          onClick={() => input.current?.click()}
        >
          <FolderOpen aria-hidden="true" />
          {reading ? "Opening…" : "Open configuration"}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="rounded-[5px]"
          disabled={hasErrors || reading}
          aria-describedby={
            hasErrors ? "theme-configuration-invalid" : undefined
          }
          onClick={saveConfiguration}
        >
          <Save aria-hidden="true" />
          Save configuration
        </Button>
      </div>
      {hasErrors ? (
        <p
          id="theme-configuration-invalid"
          className="max-w-sm text-xs text-muted-foreground"
        >
          Finish the highlighted fields before saving a configuration.
        </p>
      ) : null}
      <ToastProvider>
        <Toast
          key={notice.id}
          open={noticeOpen}
          onOpenChange={setNoticeOpen}
          role={notice.error ? "alert" : "status"}
          variant={notice.error ? "destructive" : "default"}
          duration={notice.error ? Infinity : 6000}
          className="rounded-[5px]"
        >
          <ToastDescription className="min-w-0 text-sm leading-6">
            {notice.message}
          </ToastDescription>
          <ToastClose asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="shrink-0"
              aria-label="Dismiss configuration notification"
            >
              <X aria-hidden="true" />
            </Button>
          </ToastClose>
        </Toast>
        <ToastViewport
          label="Theme configuration notifications"
          className="fixed right-4 bottom-4 z-50 m-0 flex w-96 max-w-[calc(100vw-2rem)] list-none flex-col gap-2 p-0 outline-none"
        />
      </ToastProvider>
    </div>
  );
}
