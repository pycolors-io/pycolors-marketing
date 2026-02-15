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
} from '@pycolors/ui';

import { Table } from 'lucide-react';

export function getMDXComponents(
  components?: MDXComponents,
): MDXComponents {
  return {
    ...defaultMdxComponents,

    // Native integration of Fumadocs CodeBlock (recommended)
    // All ```tsx into .mdx go through this wrapper
    pre: ({ ref: _ref, ...props }) => (
      <CodeBlock {...props}>
        <Pre>{props.children}</Pre>
      </CodeBlock>
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

    // Fumadocs (docs UI)
    Tabs: DocsTabs,
    Tab,

    //UI Tabs exposed under explicit names
    UITabs,
    TabsList,
    TabsTrigger,
    TabsContent,
    ...components,
  };
}
