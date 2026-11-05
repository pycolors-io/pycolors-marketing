// Keep the saved appearance in sync with RootProvider's class/theme configuration.
(() => {
  const root = globalThis.document.documentElement;
  let theme = "system";
  let palette = "pycolors";
  try {
    theme = globalThis.localStorage.getItem("theme") || "system";
    palette = globalThis.localStorage.getItem("pycolors:site-palette:v1");
  } catch {
    // Storage may be unavailable; the system preference still applies.
  }
  root.dataset.sitePalette =
    palette === "monochrome" ? "monochrome" : "pycolors";
  const resolved =
    theme === "light" || theme === "dark"
      ? theme
      : globalThis.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
  root.classList.remove("light", "dark");
  root.classList.add(resolved);
  root.style.colorScheme = resolved;
})();
