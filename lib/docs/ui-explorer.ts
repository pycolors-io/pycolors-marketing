// Stable public story IDs verified against the production Explorer catalog.
// Keep this explicit: documentation guides do not necessarily have a story.
export const uiExplorerStories: Readonly<Record<string, string>> = {
  alert: "components-alert--default",
  badge: "components-badge--default",
  button: "components-button--default",
  card: "components-card--default",
  checkbox: "components-checkbox--default",
  dialog: "components-dialog--default",
  "dropdown-menu": "components-dropdown-menu--default",
  "empty-state": "components-empty-state--default",
  input: "components-input--default",
  pagination: "components-pagination--default",
  "password-input": "components-password-input--default",
  separator: "components-separator--default",
  sheet: "components-sheet--default",
  skeleton: "components-skeleton--default",
  table: "components-table--default",
  tabs: "components-tabs--default",
  textarea: "components-textarea--default",
  toast: "components-toast--default",
};

export function getUiExplorerUrl(slug: readonly string[] = []) {
  if (slug.length !== 2 || slug[0] !== "ui") return undefined;
  const family = slug[1];
  if (!family || !Object.hasOwn(uiExplorerStories, family)) return undefined;
  return `https://ui.pycolors.io/?path=/story/${uiExplorerStories[family]}`;
}
