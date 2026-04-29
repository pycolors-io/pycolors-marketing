import * as React from 'react';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import { Link as LinkIcon } from 'lucide-react';
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';
import { Tabs as DocsTabs, Tab } from 'fumadocs-ui/components/tabs';
import {
  Cards as LinkCards,
  Card as LinkCard,
} from 'fumadocs-ui/components/card';

import { Preview } from '@/components/docs/preview';

import {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIndicator,
  AlertContent,
  Badge,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
  EmptyState,
  Input,
  Pagination,
  PasswordInput,
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  Skeleton,
  Tabs as UITabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Table,
} from '@pycolors/ui';

function getTextContent(children: unknown): string {
  if (typeof children === 'string' || typeof children === 'number') {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map(getTextContent).join('');
  }

  if (
    React.isValidElement<{ children?: React.ReactNode }>(children) &&
    children.props?.children
  ) {
    return getTextContent(children.props.children);
  }

  return '';
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replaceAll(/['’]/g, '')
    .replaceAll(/[^a-z0-9\s-]/g, '')
    .replaceAll(/\s+/g, '-')
    .replaceAll(/-+/g, '-');
}

function HeadingAnchor({ id }: Readonly<{ id: string }>) {
  return (
    <a
      href={`#${id}`}
      aria-label="Link to section"
      className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground/0 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:text-muted-foreground hover:text-foreground focus:opacity-100 focus:text-foreground focus:outline-none"
    >
      <LinkIcon className="h-3.5 w-3.5" />
      <span className="sr-only">Link to section</span>
    </a>
  );
}

export function getMDXComponents(
  components?: MDXComponents,
): MDXComponents {
  return {
    ...defaultMdxComponents,

    pre: (props) => (
      <CodeBlock
        {...props}
        className="my-6 rounded-2xl border border-border/60 bg-card shadow-sm"
      >
        <Pre>{props.children}</Pre>
      </CodeBlock>
    ),

    h1: ({ children, className, ...props }) => (
      <h1
        {...props}
        className={[
          'font-brand scroll-mt-28 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {children}
      </h1>
    ),

    h2: ({ children, id, className, ...props }) => {
      const headingId = id ?? slugify(getTextContent(children));

      return (
        <h2
          id={headingId}
          {...props}
          className={[
            'group mt-10 scroll-mt-28 pt-6 font-brand text-2xl font-semibold tracking-tight text-foreground sm:text-3xl',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <span className="inline-flex items-center">
            <span>{children}</span>
            <HeadingAnchor id={headingId} />
          </span>
        </h2>
      );
    },

    h3: ({ children, id, className, ...props }) => {
      const headingId = id ?? slugify(getTextContent(children));

      return (
        <h3
          id={headingId}
          {...props}
          className={[
            'group mt-8 scroll-mt-24 pt-4 font-brand text-xl font-semibold tracking-tight text-foreground sm:text-2xl',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <span className="inline-flex items-center">
            <span>{children}</span>
            <HeadingAnchor id={headingId} />
          </span>
        </h3>
      );
    },

    p: (props) => (
      <p
        {...props}
        className={[
          'text-[15px] leading-7 text-muted-foreground sm:text-base',
          props.className,
        ]
          .filter(Boolean)
          .join(' ')}
      />
    ),

    a: ({ href = '', ...props }) => {
      const isExternal = href.startsWith('http');
      const cls = [
        'font-medium text-foreground underline underline-offset-4 decoration-border transition-opacity hover:opacity-70',
        (props as { className?: string }).className,
      ]
        .filter(Boolean)
        .join(' ');

      if (isExternal) {
        return (
          <a
            {...props}
            href={href}
            target="_blank"
            rel="noreferrer"
            className={cls}
          />
        );
      }

      return <Link {...props} href={href} className={cls} />;
    },

    ul: (props) => (
      <ul
        {...props}
        className={[
          'my-4 ml-6 list-disc space-y-2 text-muted-foreground',
          props.className,
        ]
          .filter(Boolean)
          .join(' ')}
      />
    ),

    ol: (props) => (
      <ol
        {...props}
        className={[
          'my-4 ml-6 list-decimal space-y-2 text-muted-foreground',
          props.className,
        ]
          .filter(Boolean)
          .join(' ')}
      />
    ),

    li: (props) => (
      <li
        {...props}
        className={['leading-7', props.className]
          .filter(Boolean)
          .join(' ')}
      />
    ),

    hr: (props) => (
      <hr
        {...props}
        className={['my-8 border-border/40', props.className]
          .filter(Boolean)
          .join(' ')}
      />
    ),

    blockquote: (props) => (
      <blockquote
        {...props}
        className={[
          'my-6 rounded-r-xl border-l-2 border-primary/40 bg-muted/30 px-4 py-3 text-sm text-foreground/80',
          props.className,
        ]
          .filter(Boolean)
          .join(' ')}
      />
    ),

    table: (props) => (
      <div className="my-0">
        <table
          {...props}
          className={['w-full text-sm', props.className]
            .filter(Boolean)
            .join(' ')}
        />
      </div>
    ),

    th: (props) => (
      <th
        {...props}
        className={[
          'border-b border-border/60 bg-muted/40 px-4 py-3 text-left font-medium text-foreground',
          props.className,
        ]
          .filter(Boolean)
          .join(' ')}
      />
    ),

    td: (props) => (
      <td
        {...props}
        className={[
          'border-b border-border/40 px-4 py-3 align-top text-muted-foreground',
          props.className,
        ]
          .filter(Boolean)
          .join(' ')}
      />
    ),

    Alert,
    AlertTitle,
    AlertDescription,
    AlertIndicator,
    AlertContent,
    Preview,

    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
    DialogClose,

    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuCheckboxItem,
    DropdownMenuRadioItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuGroup,
    DropdownMenuPortal,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
    DropdownMenuRadioGroup,

    Badge,
    Button,
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
    EmptyState,
    Input,
    PasswordInput,
    Pagination,
    Sheet,
    SheetTrigger,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetFooter,
    SheetTitle,
    SheetDescription,
    Skeleton,
    Table,

    Tabs: DocsTabs,
    Tab,

    UITabs,
    TabsList,
    TabsTrigger,
    TabsContent,

    Cards: LinkCards,
    CardLink: LinkCard,

    ...components,
  };
}
