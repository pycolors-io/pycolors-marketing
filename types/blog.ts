export type BlogCTA = {
  label: string;
  href: string;
  variant?: 'free' | 'pro' | 'blocks';
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
