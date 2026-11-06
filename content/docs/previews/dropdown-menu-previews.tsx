"use client";

import { useCopy } from "@/lib/i18n/use-copy";
import * as React from "react";

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
} from "@pycolors/ui";

/**
 * Client-only previews for the Dropdown Menu docs page.
 * Keep hooks + event handlers out of the MDX file to avoid Server Component errors.
 */

export function CheckboxMenuPreview() {
  const tSite = useCopy();

  const [enabled, setEnabled] = React.useState(true);
  const [pinned, setPinned] = React.useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          {tSite("Options")}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        <DropdownMenuCheckboxItem
          checked={enabled}
          onCheckedChange={(v) => setEnabled(Boolean(v))}
        >
          {tSite("Enabled")}
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          checked={pinned}
          onCheckedChange={(v) => setPinned(Boolean(v))}
        >
          {tSite("Pinned")}
        </DropdownMenuCheckboxItem>

        <DropdownMenuSeparator />

        <DropdownMenuCheckboxItem checked disabled>
          {tSite("Disabled option")}
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function RadioMenuPreview() {
  const tSite = useCopy();

  const [theme, setTheme] = React.useState("system");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          {tSite("Theme")}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        <DropdownMenuLabel>{tSite("Appearance")}</DropdownMenuLabel>

        <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
          <DropdownMenuRadioItem value="system">
            {tSite("System")}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="light">
            {tSite("Light")}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">
            {tSite("Dark")}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator />

        <DropdownMenuRadioItem value="contrast" disabled>
          {tSite("High contrast (soon)")}
        </DropdownMenuRadioItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
