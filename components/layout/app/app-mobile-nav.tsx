'use client';

import * as React from 'react';
import { Menu } from 'lucide-react';
import {
  Button,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@pycolors/ui';

import { AppNav } from '@/components/layout/app/app-nav';

export function AppMobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon-sm"
          aria-label="Open navigation"
        >
          <Menu className="h-4 w-4" aria-hidden="true" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-80 p-4">
        <SheetHeader className="mb-4">
          <SheetTitle>PyColors SaaS</SheetTitle>
        </SheetHeader>

        <AppNav onNavigate={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
