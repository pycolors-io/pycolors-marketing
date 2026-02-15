'use client';

import * as React from 'react';

import {
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@pycolors/ui';

/**
 * Client-only previews for the Dropdown Menu docs page.
 * Keep hooks + event handlers out of the MDX file to avoid Server Component errors.
 */

export function CheckboxMenuPreview() {
  const [enabled, setEnabled] = React.useState(true);
  const [pinned, setPinned] = React.useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          Options
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        <DropdownMenuCheckboxItem
          checked={enabled}
          onCheckedChange={(v) => setEnabled(Boolean(v))}
        >
          Enabled
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          checked={pinned}
          onCheckedChange={(v) => setPinned(Boolean(v))}
        >
          Pinned
        </DropdownMenuCheckboxItem>

        <DropdownMenuSeparator />

        <DropdownMenuCheckboxItem checked disabled>
          Disabled option
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function RadioMenuPreview() {
  const [theme, setTheme] = React.useState('system');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          Theme
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>

        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={setTheme}
        >
          <DropdownMenuRadioItem value="system">
            System
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="light">
            Light
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">
            Dark
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator />

        <DropdownMenuRadioItem value="contrast" disabled>
          High contrast (soon)
        </DropdownMenuRadioItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
