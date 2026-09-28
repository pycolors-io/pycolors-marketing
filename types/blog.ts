export type BlogCTA = {
  label: string;
  href: string;
  /** Omitted variants retain the legacy Starter Free presentation. */
  variant?: "free" | "pro" | "blocks" | "theme-builder";
};

export type BlogPost = {
  slug: string;
  url: string;
  title: string;
  description: string;
  author: string;
  category: string;
  tags: string[];
  date: string;
  featured?: boolean;
  readingTime?: string;
  cover?: string;
  cta?: BlogCTA;
};
