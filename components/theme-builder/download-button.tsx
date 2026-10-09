"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { SiteButton as Button } from "@/components/site-button";
import { downloadThemeFile, type ThemeFile } from "./theme-file";

export function DownloadButton({
  file,
  label,
}: Readonly<{ file: ThemeFile; label: string }>) {
  const [result, setResult] = useState<{
    content: string;
    fileName: string;
    message: string;
    error: boolean;
  } | null>(null);
  const current =
    result?.content === file.content && result.fileName === file.fileName
      ? result
      : null;

  function handleDownload() {
    try {
      downloadThemeFile(file);
      setResult({ ...file, message: "Download requested.", error: false });
    } catch {
      setResult({
        ...file,
        message:
          "Download could not start. Use Copy or select the code instead.",
        error: true,
      });
    }
  }

  return (
    <div className="flex flex-col items-start gap-1.5">
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="rounded-[5px]"
        onClick={handleDownload}
      >
        <Download aria-hidden="true" />
        {label}
      </Button>
      <p
        role="status"
        aria-live="polite"
        className={`max-w-64 text-xs ${current?.error ? "text-destructive" : "text-muted-foreground"} empty:hidden`}
      >
        {current?.message ?? ""}
      </p>
    </div>
  );
}
