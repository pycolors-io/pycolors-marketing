/** Metadata for the release already announced in the public Changelog. */
export const LATEST_MARKETING_RELEASE = {
  version: "1.33.0",
  dateISO: "2026-11-13",
  dateLabel: "Fri 13 Nov 2026",
} as const;

export const MARKETING_RELEASE_HREF = `/changelog#release-v${LATEST_MARKETING_RELEASE.version.replaceAll(".", "-")}`;
