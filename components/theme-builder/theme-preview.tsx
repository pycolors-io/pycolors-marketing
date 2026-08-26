import * as React from "react";
import {
  Activity,
  ArrowUpRight,
  Bell,
  BriefcaseBusiness,
  ChevronRight,
  CreditCard,
  FolderKanban,
  LayoutDashboard,
  Plus,
  SearchIcon,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";

import type { ThemeMode, ThemeModeResult } from "@pycolors/color-engine";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Card,
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@pycolors/ui";

import { createThemePreviewVariables } from "./theme-preview-variables";
import { ThemeModeControl } from "./theme-mode-control";

type ThemePreviewProps = Readonly<{
  mode: ThemeMode;
  theme: ThemeModeResult;
  settingsOpen: boolean;
  onModeChange: (mode: ThemeMode) => void;
  settingsControl: React.ReactNode;
}>;

const navigation = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Projects", icon: FolderKanban, active: false },
  { label: "Team", icon: Users, active: false },
  { label: "Billing", icon: CreditCard, active: false },
  { label: "Settings", icon: Settings, active: false },
] as const;

const projects = [
  {
    name: "Orbit onboarding",
    initials: "OO",
    owner: "Avery Kim",
    status: "On track",
    updated: "12m ago",
  },
  {
    name: "Atlas platform",
    initials: "AP",
    owner: "Sam Patel",
    status: "In review",
    updated: "1h ago",
  },
  {
    name: "Pulse launch",
    initials: "PL",
    owner: "Morgan Lee",
    status: "Planning",
    updated: "Yesterday",
  },
] as const;

/** A branded, root-scoped Northstar application preview. */
export function ThemePreview({
  mode,
  theme,
  settingsOpen,
  onModeChange,
  settingsControl,
}: ThemePreviewProps) {
  const style = React.useMemo(
    () => createThemePreviewVariables(theme) as React.CSSProperties,
    [theme],
  );

  return (
    <section
      aria-labelledby="theme-builder-preview-heading"
      aria-describedby="theme-builder-preview-description"
      data-theme-builder-preview={mode}
      style={style}
      className={
        settingsOpen
          ? "relative z-30 min-w-0 overflow-visible rounded-[5px] border border-border bg-background text-foreground"
          : "relative min-w-0 overflow-hidden rounded-[5px] border border-border bg-background text-foreground"
      }
    >
      <header className="relative z-30 flex min-h-14 flex-wrap items-center gap-3 border-b border-border bg-background/80 px-4 py-3 backdrop-blur supports-backdrop-filter:bg-background/60 sm:px-5">
        <div className="flex min-w-0 items-center gap-2.5">
          <span
            aria-hidden="true"
            className="grid size-7 shrink-0 place-items-center rounded-[4px] bg-primary text-xs font-semibold text-primary-foreground"
          >
            N
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-tight">
              Northstar
            </p>
            <p className="truncate text-[11px] text-muted-foreground">
              Avery&apos;s workspace
            </p>
          </div>
        </div>

        <div className="ml-auto flex flex-wrap items-center justify-end gap-1.5">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="rounded-[4px]"
            aria-label="View notifications"
          >
            <Bell aria-hidden="true" />
          </Button>
          {settingsControl}
          <ThemeModeControl value={mode} onChange={onModeChange} />
        </div>
      </header>

      <div className="grid min-w-0 md:grid-cols-[9.5rem_minmax(0,1fr)]">
        <nav
          aria-label="Northstar workspace"
          className="border-b border-border bg-background p-2 md:border-r md:border-b-0 md:p-3"
        >
          <div className="flex gap-1 overflow-x-auto md:flex-col md:overflow-visible">
            {navigation.map(({ label, icon: Icon, active }) => (
              <a
                key={label}
                href="#northstar-overview"
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "flex shrink-0 items-center gap-2 rounded-[4px] bg-primary px-2.5 py-2 text-xs font-medium text-primary-foreground"
                    : "flex shrink-0 items-center gap-2 rounded-[4px] px-2.5 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                }
              >
                <Icon className="size-3.5" aria-hidden="true" />
                {label}
              </a>
            ))}
          </div>

          <div className="mt-5 hidden rounded-[4px] border border-primary/30 bg-primary/5 p-3 md:block">
            <div className="flex items-center gap-1.5 text-primary">
              <Sparkles className="size-3.5" aria-hidden="true" />
              <p className="text-xs font-medium">Pro workspace</p>
            </div>
            <p className="mt-2 text-[11px] leading-4 text-muted-foreground">
              6 days left in the annual planning window.
            </p>
          </div>
        </nav>

        <div id="northstar-overview" className="min-w-0 p-4 sm:p-5">
          <div className="flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-1">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-primary">
                Northstar workspace
              </p>
              <h2
                id="theme-builder-preview-heading"
                className="text-lg font-semibold tracking-tight"
              >
                Dashboard
              </h2>
              <p
                id="theme-builder-preview-description"
                className="text-sm text-muted-foreground"
              >
                A focused view of delivery, capacity, and client work.
              </p>
            </div>
            <Button type="button" size="sm" className="w-fit rounded-[4px]">
              <Plus aria-hidden="true" />
              New project
            </Button>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Card className="rounded-[4px] border-primary/35 bg-primary/5 shadow-none">
              <div className="p-3.5">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-medium text-muted-foreground">
                    Active projects
                  </p>
                  <span className="size-2 rounded-full bg-primary" />
                </div>
                <p className="mt-3 text-2xl font-semibold tracking-tight">12</p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  3 shipping this week
                </p>
              </div>
            </Card>

            <Card className="rounded-[4px] border-border bg-card shadow-none">
              <div className="p-3.5">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-medium text-muted-foreground">
                    Team capacity
                  </p>
                  <Users
                    className="size-3.5 text-muted-foreground"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-3 text-2xl font-semibold tracking-tight">
                  86%
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  4 seats available
                </p>
              </div>
            </Card>

            <Card className="rounded-[4px] border-border bg-card shadow-none">
              <div className="p-3.5">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-medium text-muted-foreground">
                    Delivery health
                  </p>
                  <Activity
                    className="size-3.5 text-muted-foreground"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-3 text-2xl font-semibold tracking-tight">
                  98%
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  All client milestones on track
                </p>
              </div>
            </Card>

            <Card className="rounded-[4px] border-border bg-card shadow-none">
              <div className="p-3.5">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-medium text-muted-foreground">
                    Plan status
                  </p>
                  <Badge variant="success" size="sm">
                    Healthy
                  </Badge>
                </div>
                <p className="mt-3 text-2xl font-semibold tracking-tight">
                  Pro
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Renews Sep 14, 2026
                </p>
              </div>
            </Card>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.65fr)_minmax(15rem,0.85fr)]">
            <Card className="min-w-0 rounded-[4px] border-border bg-card shadow-none">
              <div className="flex flex-col gap-3 border-b border-border p-3.5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-sm font-semibold">Delivery board</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Your most active client work.
                  </p>
                </div>
                <Input
                  aria-label="Filter Northstar projects"
                  placeholder="Filter"
                  size="sm"
                  leftIcon={
                    <SearchIcon className="size-3.5" aria-hidden="true" />
                  }
                  className="w-full sm:w-36"
                />
              </div>

              <Tabs defaultValue="active" className="min-w-0">
                <div className="flex items-center justify-between gap-2 px-3.5 pt-3">
                  <TabsList size="sm" className="h-8 bg-muted/70 p-0.5">
                    <TabsTrigger
                      value="active"
                      size="sm"
                      className="px-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
                    >
                      Active
                    </TabsTrigger>
                    <TabsTrigger value="planned" size="sm" className="px-2">
                      Planned
                    </TabsTrigger>
                  </TabsList>
                  <a
                    href="#northstar-projects"
                    className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                  >
                    All projects
                    <ChevronRight className="size-3.5" aria-hidden="true" />
                  </a>
                </div>

                <TabsContent value="active" className="mt-3">
                  <Table
                    aria-label="Active Northstar projects"
                    id="northstar-projects"
                  >
                    <TableHeader>
                      <TableRow>
                        <TableHead>Project</TableHead>
                        <TableHead>Owner</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Updated</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {projects.map((project) => (
                        <TableRow key={project.name}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="grid size-6 shrink-0 place-items-center rounded-[3px] bg-primary/10 text-[9px] font-semibold text-primary">
                                {project.initials}
                              </span>
                              <span className="whitespace-nowrap font-medium">
                                {project.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="whitespace-nowrap text-muted-foreground">
                            {project.owner}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                project.status === "On track"
                                  ? "default"
                                  : "secondary"
                              }
                              size="sm"
                              className="whitespace-nowrap"
                            >
                              {project.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="whitespace-nowrap text-right text-muted-foreground">
                            {project.updated}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent
                  value="planned"
                  className="px-3.5 pb-3.5 text-sm text-muted-foreground"
                >
                  Planning opens after the current delivery cycle closes.
                </TabsContent>
              </Tabs>
            </Card>

            <div className="space-y-4">
              <Card className="rounded-[4px] border-border bg-card shadow-none">
                <div className="p-3.5">
                  <div className="flex items-center gap-2">
                    <Activity
                      className="size-3.5 text-primary"
                      aria-hidden="true"
                    />
                    <h3 className="text-sm font-semibold">Live activity</h3>
                  </div>
                  <ol className="mt-3 space-y-3">
                    <li className="border-l border-primary pl-2.5 text-[11px] leading-4 text-muted-foreground">
                      Sam moved Atlas platform to review.
                    </li>
                    <li className="border-l border-border pl-2.5 text-[11px] leading-4 text-muted-foreground">
                      Morgan invited two new collaborators.
                    </li>
                    <li className="border-l border-border pl-2.5 text-[11px] leading-4 text-muted-foreground">
                      Billing report is ready to review.
                    </li>
                  </ol>
                </div>
              </Card>

              <Alert
                variant="warning"
                ariaLive="off"
                className="rounded-[4px] p-3.5"
              >
                <AlertTitle className="text-xs">Usage update</AlertTitle>
                <AlertDescription className="mt-1 text-[11px] leading-4">
                  82% of this month&apos;s delivery capacity is assigned.
                </AlertDescription>
                <Button
                  type="button"
                  variant="link"
                  size="sm"
                  className="mt-2 h-auto px-0 text-xs text-primary"
                >
                  Review plan
                  <ArrowUpRight aria-hidden="true" />
                </Button>
              </Alert>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3 rounded-[4px] border border-primary/30 bg-primary/5 p-3.5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-2.5">
              <span className="grid size-7 shrink-0 place-items-center rounded-[3px] bg-primary text-primary-foreground">
                <BriefcaseBusiness className="size-3.5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-medium">
                  Keep the annual plan on track
                </p>
                <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
                  Add collaborator capacity before the next delivery cycle.
                </p>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-fit border-primary/35 bg-background"
            >
              Manage plan
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
