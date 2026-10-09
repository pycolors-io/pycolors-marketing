import { useId, type CSSProperties } from "react";
import { Check, Settings2 } from "lucide-react";
import {
  SCALE_STEPS,
  type ThemeMode,
  type ThemeModeResult,
} from "@pycolors/color-engine";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Card,
  Checkbox,
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@pycolors/ui";
import { createThemePreviewVariables } from "./theme-preview-variables";
import styles from "./theme-preview.module.css";

export type ThemeComponentsState = Readonly<{
  name: string;
  savedName: string | null;
  activity: boolean;
  summary: boolean;
  action: string;
  tab: "overview" | "activity";
}>;

export const INITIAL_THEME_COMPONENTS_STATE: ThemeComponentsState = {
  name: "Northstar Studio",
  savedName: null,
  activity: true,
  summary: false,
  action: "",
  tab: "overview",
};

export function ThemeComponentsPreview({
  theme,
  mode,
  fontFamily,
  view,
  onViewChange,
}: Readonly<{
  theme: ThemeModeResult;
  mode: ThemeMode;
  fontFamily: string;
  view: ThemeComponentsState;
  onViewChange: (view: ThemeComponentsState) => void;
}>) {
  const id = useId();
  const style = {
    ...createThemePreviewVariables(theme),
    fontFamily,
    "--font-sans": fontFamily,
  } as CSSProperties;
  const label = "text-xs font-medium text-muted-foreground";

  return (
    <section
      aria-labelledby={`${id}-heading`}
      data-theme-builder-components={mode}
      style={style}
      className={`${styles.preview} min-w-0 bg-background text-foreground`}
    >
      <header className="flex flex-wrap items-start justify-between gap-4 px-5 pt-6 sm:px-7 sm:pt-7">
        <div>
          <h2
            id={`${id}-heading`}
            className="text-xl font-semibold tracking-tight sm:text-2xl"
          >
            Your theme in use
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
            One palette, across buttons, forms, navigation, and content. Try the
            components below.
          </p>
        </div>
        <span className="inline-flex min-h-7 items-center gap-2 text-xs text-muted-foreground">
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-primary"
          />
          Interactive demo
        </span>
      </header>

      <div className={`${styles.componentScales} px-5 pt-6 sm:px-7`}>
        {(["accent", "neutral"] as const).map((family) => (
          <div key={family} className="min-w-0">
            <div className="mb-2 flex justify-between gap-3 text-[11px] text-muted-foreground">
              <span>{family === "accent" ? "Accent" : "Neutral"}</span>
              <span>12 shades</span>
            </div>
            <div
              role="img"
              aria-label={`Twelve ${family} shades in the current preview`}
              className="grid h-5 grid-cols-12 gap-0.5 overflow-hidden rounded-[3px]"
            >
              {SCALE_STEPS.map((step) => (
                <span
                  key={step}
                  style={{
                    backgroundColor: theme.scales[family][step].srgbHex,
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={`${styles.componentGallery} p-5 sm:p-7`}>
        <div className={`${styles.galleryControls} min-w-0 space-y-6`}>
          <section aria-labelledby={`${id}-actions`}>
            <h3 id={`${id}-actions`} className={label}>
              Actions & feedback
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {(
                [
                  ["default", "Primary"],
                  ["secondary", "Secondary"],
                  ["outline", "Outline"],
                  ["destructive", "Destructive"],
                ] as const
              ).map(([variant, text]) => (
                <Button
                  key={variant}
                  type="button"
                  variant={variant}
                  size="sm"
                  className={`${styles.compactControl} h-auto max-w-full whitespace-normal rounded-[5px] px-3 py-2 text-xs`}
                  onClick={() => onViewChange({ ...view, action: text })}
                >
                  {text}
                </Button>
              ))}
              <Button
                type="button"
                disabled
                size="sm"
                className={`${styles.compactControl} h-auto rounded-[5px] px-3 py-2 text-xs`}
              >
                Disabled
              </Button>
            </div>
            <p
              role="status"
              className="mt-3 min-h-5 text-xs leading-5 text-muted-foreground"
            >
              {view.action
                ? `${view.action} action previewed.`
                : "Each action is a local demo."}
            </p>
            <Alert
              className="mt-4 rounded-[5px] border-border/50 shadow-none"
              variant="success"
              ariaLive="off"
            >
              <div className="flex items-start gap-2.5">
                <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                <div>
                  <AlertTitle aria-level={4}>Ready for review</AlertTitle>
                  <AlertDescription>
                    Your team can review the latest changes.
                  </AlertDescription>
                </div>
              </div>
            </Alert>
          </section>

          <section aria-labelledby={`${id}-notifications`}>
            <h3 id={`${id}-notifications`} className={label}>
              Notifications
            </h3>
            <div className="mt-3 divide-y divide-border/40 overflow-hidden rounded-[5px] border border-border/50">
              {(
                [
                  [
                    "activity",
                    "Project activity",
                    "Updates when your team makes progress.",
                  ],
                  [
                    "summary",
                    "Weekly summary",
                    "A recap of tasks, milestones, and delivery.",
                  ],
                ] as const
              ).map(([field, title, description]) => (
                <label
                  key={field}
                  htmlFor={`${id}-${field}`}
                  className="flex min-h-16 cursor-pointer items-start gap-3 p-4"
                >
                  <Checkbox
                    id={`${id}-${field}`}
                    checked={view[field]}
                    onCheckedChange={(checked) =>
                      onViewChange({ ...view, [field]: checked === true })
                    }
                    className="mt-0.5 shrink-0"
                  />
                  <span className="min-w-0">
                    <span className="block text-sm font-medium">{title}</span>
                    <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                      {description}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </section>
          <div
            className="flex flex-wrap gap-2"
            aria-label="Status label examples"
          >
            <Badge variant="success">Active</Badge>
            <Badge variant="warning">In review</Badge>
            <Badge variant="outline">Draft</Badge>
          </div>
        </div>

        <div
          className={`${styles.galleryForm} min-w-0 rounded-[5px] p-4 sm:p-6`}
        >
          <Card className="rounded-[5px] border border-border/50 bg-background p-5 shadow-none sm:p-6">
            <div className="mb-5 flex size-10 items-center justify-center rounded-[5px] bg-primary/10 text-primary">
              <Settings2 aria-hidden="true" className="size-5" />
            </div>
            <h3 className="text-xl font-semibold tracking-tight">
              Workspace settings
            </h3>
            <p className="mt-2 text-xs leading-6 text-muted-foreground">
              Inputs, focus, and validation in one place.
            </p>
            <form
              className="mt-6 space-y-5"
              onSubmit={(event) => {
                event.preventDefault();
                onViewChange({ ...view, savedName: view.name });
              }}
            >
              <Input
                id={`${id}-name`}
                label="Workspace display name"
                value={view.name}
                maxLength={64}
                required
                onChange={(event) =>
                  onViewChange({ ...view, name: event.target.value })
                }
                helperText="A sample field for your theme preview."
              />
              <Input
                id={`${id}-validation`}
                label="Validation example"
                value="incomplete@email"
                readOnly
                error="Enter a valid email address."
              />
              <Button
                type="submit"
                className="h-auto min-h-11 w-full whitespace-normal rounded-[5px] px-4 py-2.5 text-sm"
                disabled={!view.name.trim()}
              >
                Save demo settings
              </Button>
              <p
                role="status"
                className="min-h-10 text-xs leading-5 text-muted-foreground"
              >
                {view.savedName === view.name
                  ? "Demo settings saved in this preview."
                  : "Changes stay in this preview."}
              </p>
            </form>
          </Card>
        </div>

        <div className={`${styles.galleryContent} min-w-0 space-y-6`}>
          <section aria-labelledby={`${id}-navigation`}>
            <h3 id={`${id}-navigation`} className={label}>
              Navigation & content
            </h3>
            <Tabs
              value={view.tab}
              onValueChange={(tab) => {
                if (tab === "overview" || tab === "activity")
                  onViewChange({ ...view, tab });
              }}
              className="mt-3"
            >
              <TabsList
                aria-label="Component demo navigation"
                className="h-auto w-full justify-start gap-4 rounded-none border-b border-border/50 bg-transparent p-0"
              >
                {(["overview", "activity"] as const).map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className={`${styles.compactControl} rounded-none border-b-2 border-transparent px-2 text-xs data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none`}
                  >
                    {tab === "overview" ? "Overview" : "Activity"}
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsContent value="overview" className="min-h-24">
                <div className="flex min-w-0 items-center gap-3 py-3">
                  <span
                    aria-hidden="true"
                    className="grid size-10 shrink-0 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
                  >
                    N
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {view.savedName ?? INITIAL_THEME_COMPONENTS_STATE.name}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Sample team workspace
                    </p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="activity" className="min-h-24">
                <ul className="space-y-3 py-2 text-xs">
                  <li className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="size-1.5 rounded-full bg-primary"
                    />
                    Design review completed
                  </li>
                  <li className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="size-1.5 rounded-full bg-muted-foreground"
                    />
                    Theme tokens updated
                  </li>
                </ul>
              </TabsContent>
            </Tabs>
          </section>

          <section
            aria-labelledby={`${id}-type`}
            className="border-t border-border/40 pt-5"
          >
            <h3 id={`${id}-type`} className={label}>
              Type & hierarchy
            </h3>
            <p className="mt-4 text-2xl font-semibold tracking-tight">
              Make room for great work.
            </p>
            <p className="mt-3 border-l-2 border-primary/40 pl-4 text-sm leading-7 text-muted-foreground">
              Bring your projects, people, and progress into one place.{" "}
              <span className="font-medium text-primary">
                A shared visual language
              </span>{" "}
              makes every detail feel connected.
            </p>
          </section>
          <dl className="space-y-3 border-t border-border/40 pt-5 text-[11px]">
            {(["background", "foreground", "primary"] as const).map((role) => (
              <div
                key={role}
                className="flex items-center justify-between gap-3"
              >
                <dt className="font-mono text-muted-foreground">--{role}</dt>
                <dd className="flex items-center gap-2 font-mono">
                  <span
                    aria-hidden="true"
                    className="size-3 rounded-[3px] border border-border/50"
                    style={{ backgroundColor: theme.semantic[role].srgbHex }}
                  />
                  {theme.semantic[role].srgbHex.toUpperCase()}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
