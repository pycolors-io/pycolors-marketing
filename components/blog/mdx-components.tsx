import type { MDXComponents } from "mdx/types";
import defaultComponents from "fumadocs-ui/mdx";
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";
import Link from "next/link";
import { Alert, Badge, Card, CardContent, cn } from "@pycolors/ui";
import styles from "./blog-article.module.css";

export function getBlogMDXComponents(
  components?: MDXComponents,
): MDXComponents {
  return {
    ...defaultComponents,
    pre: (props) => (
      <CodeBlock
        {...props}
        title={props.title || "Code example"}
        className={cn(props.className, styles.codeBlock)}
        viewportProps={{
          "aria-label": props.title ? `Code: ${props.title}` : "Code example",
          className: styles.codeViewport,
        }}
      >
        <Pre>{props.children}</Pre>
      </CodeBlock>
    ),
    a: ({ href = "", children, ...props }) => {
      const isInternal = href.startsWith("/") && !href.startsWith("//");
      const isExternal = /^(https?:)?\/\//.test(href);

      if (isInternal) {
        return (
          <Link href={href} {...props}>
            {children}
          </Link>
        );
      }

      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer noopener" : undefined}
          {...props}
        >
          {children}
        </a>
      );
    },
    table: ({ children, className, ...props }) => (
      <div
        role="region"
        aria-label="Article table"
        tabIndex={0}
        className="my-8 max-w-full overflow-x-auto rounded-[5px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        <table {...props} className={cn("min-w-[32rem]", className)}>
          {children}
        </table>
      </div>
    ),
    Callout: ({
      title,
      children,
    }: {
      title: string;
      children: React.ReactNode;
    }) => (
      <Alert role="note">
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
