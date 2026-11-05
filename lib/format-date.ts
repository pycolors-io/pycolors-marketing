export function formatDate(date?: string, locale = "en") {
  if (!date) return undefined;

  return new Intl.DateTimeFormat(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}
