export const DOCS_NEW_BADGE_DAYS = 30;
export const DAY_IN_MS = 24 * 60 * 60 * 1000;

/** Publication dates use UTC calendar days, independently of lastUpdated. */
export function isNewDoc(
  publishedAt: string | undefined,
  now: number,
): boolean {
  if (!publishedAt || !/^\d{4}-\d{2}-\d{2}$/.test(publishedAt)) return false;

  const published = Date.parse(`${publishedAt}T00:00:00.000Z`);
  if (
    !Number.isFinite(published) ||
    new Date(published).toISOString().slice(0, 10) !== publishedAt
  ) {
    return false;
  }

  return now >= published && now < published + DOCS_NEW_BADGE_DAYS * DAY_IN_MS;
}
