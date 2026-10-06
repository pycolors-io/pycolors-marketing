export type ThemeFile = Readonly<{
  content: string;
  fileName: string;
  mediaType: string;
}>;

/** Request a local download; the browser owns the final save destination. */
export function downloadThemeFile(file: ThemeFile): void {
  const blob = new Blob([file.content], {
    type: `${file.mediaType};charset=utf-8`,
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = file.fileName;
  link.hidden = true;
  try {
    document.body.append(link);
    link.click();
  } finally {
    link.remove();
    // Let the browser consume the URL before releasing it, including Safari.
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}
