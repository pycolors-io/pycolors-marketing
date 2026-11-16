"use client";

import { useId, useState } from "react";
import { CircleHelp, Mail, ThumbsDown, ThumbsUp } from "lucide-react";
import { Textarea } from "@pycolors/ui";
import { Link } from "@/lib/i18n/navigation";
import { useCopy } from "@/lib/i18n/use-copy";
import { docsPageContext } from "@/lib/docs/page-context";
import styles from "./docs-design.module.css";

const ratings = [
  { value: "yes", label: "Yes", icon: ThumbsUp },
  { value: "partly", label: "Partly", icon: CircleHelp },
  { value: "no", label: "No", icon: ThumbsDown },
] as const;
export function DocsFeedback({
  pageTitle,
  pageUrl,
}: Readonly<{ pageTitle: string; pageUrl: string }>) {
  const tSite = useCopy();
  const id = useId();
  const [rating, setRating] = useState<
    (typeof ratings)[number]["value"] | null
  >(null);
  const [comment, setComment] = useState("");
  const selected = ratings.find((item) => item.value === rating);
  const subject = tSite("Documentation feedback: {title}", {
    title: pageTitle,
  });
  const body = [
    tSite("Page: {url}", { url: docsPageContext(pageUrl, tSite.locale).url }),
    tSite("Helpful: {rating}", {
      rating: selected ? tSite(selected.label) : "",
    }),
    "",
    comment.trim(),
  ].join("\n");
  const href =
    "mailto:contact@pycolors.com?subject=" +
    encodeURIComponent(subject) +
    "&body=" +
    encodeURIComponent(body);
  return (
    <section className={styles.feedback} aria-labelledby={id}>
      <div className={styles.feedbackTop}>
        <h2 id={id}>{tSite("Was this helpful?")}</h2>
        <div
          role="group"
          aria-labelledby={id}
          className={styles.feedbackRatings}
        >
          {ratings.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              type="button"
              aria-pressed={rating === value}
              onClick={() => setRating(value)}
            >
              <Icon aria-hidden="true" />
              {tSite(label)}
            </button>
          ))}
        </div>
      </div>
      {rating ? (
        <div className={styles.feedbackForm}>
          <label htmlFor={id + "-comment"}>
            {tSite("What could we clarify? (optional)")}
          </label>
          <Textarea
            id={id + "-comment"}
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            maxLength={1000}
            rows={3}
          />
          <div className={styles.feedbackActions}>
            <a href={href}>
              <Mail aria-hidden="true" />
              {tSite("Share feedback by email")}
            </a>
            <Link href="/contact">{tSite("Other contact options")}</Link>
          </div>
          <p>
            {tSite(
              "Opens your email app with the page and your feedback. Review the message before sending.",
            )}
          </p>
        </div>
      ) : null}
    </section>
  );
}
