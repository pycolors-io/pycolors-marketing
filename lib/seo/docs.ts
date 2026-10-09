import type { Metadata } from "next";
import { SITE_NAME } from "./website";

/** Each document overrides the section layout's canonical and social metadata. */
export function createDocsMetadata({
  title,
  description,
  url,
  image,
}: Readonly<{
  title: string;
  description?: string;
  url: string;
  image: string;
}>): Metadata {
  const socialTitle = title.includes(SITE_NAME)
    ? title
    : `${title} · Docs · ${SITE_NAME}`;

  return {
    title: { absolute: socialTitle },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: socialTitle,
      description,
      url,
      images: [{ url: image, width: 1200, height: 630, alt: socialTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [{ url: image, alt: socialTitle }],
    },
  };
}
