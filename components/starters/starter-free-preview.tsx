"use client";

import { useState, type ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@pycolors/ui";

type StarterFreePreviewProps = Readonly<{
  screens: readonly Readonly<{
    id: string;
    label: string;
    content: ReactNode;
  }>[];
}>;

/** The route supplies server-rendered figures; only tab selection is client-side. */
export function StarterFreePreview({ screens }: StarterFreePreviewProps) {
  const [active, setActive] = useState(screens[0]?.id ?? "");

  return (
    <Tabs
      value={active}
      onValueChange={setActive}
      className="gap-0 overflow-hidden rounded-[5px] border border-border-subtle bg-background"
    >
      <TabsList
        aria-label="Starter Free screens"
        className="grid h-auto w-full grid-cols-3 gap-0 rounded-none border-b border-border-subtle bg-transparent p-0 sm:flex sm:justify-start"
      >
        {screens.map((screen) => (
          <TabsTrigger
            key={screen.id}
            value={screen.id}
            className="min-h-11 flex-none rounded-none border-0 border-b-2 border-transparent px-4 py-3 text-xs text-muted-foreground shadow-none transition-colors hover:bg-surface-muted/50 hover:text-foreground focus-visible:ring-inset focus-visible:ring-offset-0 data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none sm:px-6 sm:text-sm"
          >
            {screen.label}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="grid min-w-0">
        {screens.map((screen) => (
          <TabsContent
            key={screen.id}
            value={screen.id}
            forceMount
            aria-hidden={active !== screen.id}
            inert={active !== screen.id}
            tabIndex={active === screen.id ? 0 : -1}
            className={`col-start-1 row-start-1 m-0 min-w-0 rounded-none focus-visible:ring-inset focus-visible:ring-offset-0 ${active === screen.id ? "visible" : "invisible"}`}
          >
            {screen.content}
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
}
