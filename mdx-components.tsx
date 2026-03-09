import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock';
// Fumadocs Tabs (DOCS)
import { Tabs as DocsTabs, Tab } from 'fumadocs-ui/components/tabs';

// Custom components available in .mdx
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
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
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

import Link from 'next/link';

export function getMDXComponents(
  components?: MDXComponents,
): MDXComponents {
  return {
    ...defaultMdxComponents,

    pre: (props) => (
      <CodeBlock {...props}>
        <Pre>{props.children}</Pre>
      </CodeBlock>
    ),

    h1: (props) => (
      <h1
        {...props}
        className={[
          'font-brand text-4xl tracking-tight',
          'scroll-mt-24',
          props.className,
        ]
          .filter(Boolean)
          .join(' ')}
      />
    ),
    h2: (props) => (
      <h2
        {...props}
        className={[
          'mt-10 font-brand text-2xl font-semibold tracking-tight',
          'scroll-mt-24',
          props.className,
        ]
          .filter(Boolean)
          .join(' ')}
      />
    ),
    h3: (props) => (
      <h3
        {...props}
        className={[
          'mt-8 text-xl font-semibold tracking-tight',
          'scroll-mt-24',
          props.className,
        ]
          .filter(Boolean)
          .join(' ')}
      />
    ),
    p: (props) => (
      <p
        {...props}
        className={['leading-7 text-foreground/90', props.className]
          .filter(Boolean)
          .join(' ')}
      />
    ),

    a: ({ href = '', ...props }) => {
      const isExternal = href.startsWith('http');
      const cls = [
        'underline underline-offset-4 decoration-border',
        'hover:opacity-80',
        (props as any).className,
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
        className={['my-6 ml-6 list-disc space-y-2', props.className]
          .filter(Boolean)
          .join(' ')}
      />
    ),
    ol: (props) => (
      <ol
        {...props}
        className={[
          'my-6 ml-6 list-decimal space-y-2',
          props.className,
        ]
          .filter(Boolean)
          .join(' ')}
      />
    ),
    li: (props) => (
      <li
        {...props}
        className={['text-foreground/90', props.className]
          .filter(Boolean)
          .join(' ')}
      />
    ),

    hr: (props) => (
      <hr
        {...props}
        className={['my-10 border-border/60', props.className]
          .filter(Boolean)
          .join(' ')}
      />
    ),

    blockquote: (props) => (
      <blockquote
        {...props}
        className={[
          'my-6 border-l-2 border-border pl-4 text-foreground/80',
          props.className,
        ]
          .filter(Boolean)
          .join(' ')}
      />
    ),

    table: (props) => (
      <div className="my-6 overflow-x-auto">
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
          'border-b border-border/60 px-3 py-2 text-left font-medium',
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
          'border-b border-border/40 px-3 py-2 align-top',
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

    // Fumadocs Tabs (docs UI)
    Tabs: DocsTabs,
    Tab,

    // UI Tabs explicit
    UITabs,
    TabsList,
    TabsTrigger,
    TabsContent,

    ...components,
  };
}
