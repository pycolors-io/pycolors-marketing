import type { MDXComponents } from 'mdx/types';
import defaultComponents from 'fumadocs-ui/mdx';
import Link from 'next/link';
import { Alert, Badge, Card, CardContent } from '@pycolors/ui';

export function getBlogMDXComponents(
  components?: MDXComponents,
): MDXComponents {
  return {
    ...defaultComponents,
    a: ({ href = '', children, ...props }) => {
      const isInternal = href.startsWith('/');

      if (isInternal) {
        return (
          <Link href={href} {...props}>
            {children}
          </Link>
        );
      }

      return (
        <a href={href} target="_blank" rel="noreferrer" {...props}>
          {children}
        </a>
      );
    },
    Callout: ({
      title,
      children,
    }: {
      title: string;
      children: React.ReactNode;
    }) => (
      <Alert>
        <div className="space-y-2">
          <p className="font-medium">{title}</p>
          <div>{children}</div>
        </div>
      </Alert>
    ),
    Note: ({ children }: { children: React.ReactNode }) => (
      <Card>
        <CardContent className="p-4">{children}</CardContent>
      </Card>
    ),
    Tag: ({ children }: { children: React.ReactNode }) => (
      <Badge variant="secondary">{children}</Badge>
    ),
    ...components,
  };
}
