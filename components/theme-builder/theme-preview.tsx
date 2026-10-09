import * as React from "react";
import {
  Activity,
  ArrowUpRight,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
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
import styles from "./theme-preview.module.css";

export type ThemePreviewView = Readonly<{
  query: string;
  projectTab: "active" | "planned";
  period: "week" | "month";
}>;
export const INITIAL_THEME_PREVIEW_VIEW: ThemePreviewView = {
  query: "",
  projectTab: "active",
  period: "week",
};

type ThemePreviewProps = Readonly<{
  mode: ThemeMode;
  theme: ThemeModeResult;
  view: ThemePreviewView;
  onViewChange: (view: ThemePreviewView) => void;
  embedded?: boolean;
  fullScreen?: boolean;
  fontFamily?: string;
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
    client: "Orbit Labs",
    owner: "Avery Kim",
    avatar: "AK",
    status: "On track",
    progress: 78,
    tasks: "28 of 36 tasks",
    due: "In 3 days",
    category: "active",
  },
  {
    name: "Atlas platform",
    initials: "AP",
    client: "Atlas Finance",
    owner: "Sam Patel",
    avatar: "SP",
    status: "In review",
    progress: 92,
    tasks: "46 of 50 tasks",
    due: "Tomorrow",
    category: "active",
  },
  {
    name: "Pulse launch",
    initials: "PL",
    client: "Pulse Health",
    owner: "Morgan Lee",
    avatar: "ML",
    status: "At risk",
    progress: 45,
    tasks: "18 of 40 tasks",
    due: "In 2 days",
    category: "active",
  },
  {
    name: "Nova design system",
    initials: "ND",
    client: "Nova Studio",
    owner: "Jordan Chen",
    avatar: "JC",
    status: "On track",
    progress: 64,
    tasks: "16 of 25 tasks",
    due: "Next week",
    category: "active",
  },
  {
    name: "Meridian portal",
    initials: "MP",
    client: "Meridian Co.",
    owner: "Avery Kim",
    avatar: "AK",
    status: "Planning",
    progress: 0,
    tasks: "0 of 24 tasks",
    due: "Next month",
    category: "planned",
  },
  {
    name: "Beacon analytics",
    initials: "BA",
    client: "Beacon Data",
    owner: "Sam Patel",
    avatar: "SP",
    status: "Planning",
    progress: 0,
    tasks: "0 of 32 tasks",
    due: "Next month",
    category: "planned",
  },
] as const;
const activity = [
  {
    initials: "SP",
    name: "Sam Patel",
    action: "requested a review",
    project: "Atlas platform",
    time: "12 min ago",
  },
  {
    initials: "AK",
    name: "Avery Kim",
    action: "completed 4 tasks",
    project: "Orbit onboarding",
    time: "38 min ago",
  },
  {
    initials: "ML",
    name: "Morgan Lee",
    action: "updated the timeline",
    project: "Pulse launch",
    time: "1 hour ago",
  },
  {
    initials: "JC",
    name: "Jordan Chen",
    action: "published new components",
    project: "Nova design system",
    time: "2 hours ago",
  },
] as const;
const periods = {
  week: {
    label: "Last 7 days",
    previous: 126,
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    values: [12, 18, 15, 24, 20, 28, 31],
  },
  month: {
    label: "Last 30 days",
    previous: 430,
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    values: [96, 112, 126, 148],
  },
} as const;

/** A local sample workspace; its colors are scoped to this preview only. */
export function ThemePreview({
  mode,
  theme,
  view,
  onViewChange,
  embedded = false,
  fullScreen = false,
  fontFamily,
}: ThemePreviewProps) {
  const id = React.useId();
  const style = React.useMemo(
    () =>
      ({
        ...createThemePreviewVariables(theme),
        ...(fontFamily ? { fontFamily, "--font-sans": fontFamily } : {}),
      }) as React.CSSProperties,
    [theme, fontFamily],
  );
  const period = periods[view.period];
  const completed = period.values.reduce((total, value) => total + value, 0);
  const growth = ((completed / period.previous - 1) * 100).toFixed(1);
  const chartMax = Math.ceil(Math.max(...period.values) / 10) * 10;
  const query = view.query.trim().toLowerCase();
  const cardSurface =
    mode === "light"
      ? "bg-background text-foreground"
      : "bg-card text-card-foreground";
  const filteredProjects = projects.filter(
    (project) =>
      project.category === view.projectTab &&
      `${project.name} ${project.client} ${project.owner} ${project.status}`
        .toLowerCase()
        .includes(query),
  );

  return (
    <section
      aria-labelledby={`${id}-heading`}
      aria-describedby={`${id}-description`}
      data-theme-builder-preview={mode}
      style={style}
      className={`${styles.preview} ${fullScreen ? styles.expanded : ""} relative min-w-0 overflow-hidden bg-background text-foreground ${embedded ? "" : "rounded-[5px] border border-border/50"}`}
    >
      <header className="flex min-h-16 flex-wrap items-center gap-3 border-b border-border/50 px-4 py-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span
            aria-hidden="true"
            className="grid size-8 shrink-0 place-items-center rounded-[5px] bg-primary text-sm font-semibold text-primary-foreground"
          >
            N
          </span>
          <div>
            <p className="text-sm font-semibold tracking-tight">Northstar</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              Avery&apos;s workspace
            </p>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <span className="rounded border border-border/50 px-1.5 py-0.5 text-[10px] text-muted-foreground">
            Demo data
          </span>
          <div
            className="hidden -space-x-1.5 items-center sm:flex"
            aria-label="Avery Kim, Sam Patel, and Morgan Lee"
          >
            {["AK", "SP", "ML"].map((initials) => (
              <span
                key={initials}
                className="grid size-7 place-items-center rounded-full border-2 border-background bg-muted text-[9px] font-medium text-muted-foreground"
              >
                {initials}
              </span>
            ))}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="relative rounded-[4px]"
            aria-label="View notifications"
          >
            <Bell aria-hidden="true" />
            <span
              aria-hidden="true"
              className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-primary"
            />
          </Button>
        </div>
      </header>
      <div className={styles.layout}>
        <nav aria-label="Northstar workspace" className={styles.navigation}>
          <div className={styles.links}>
            {navigation.map(({ label, icon: Icon, active }) => (
              <a
                key={label}
                href={`#${id}-${label === "Projects" ? "projects" : "overview"}`}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "flex shrink-0 items-center gap-2 rounded-[4px] bg-primary px-2.5 py-2.5 text-xs font-medium text-primary-foreground"
                    : "flex shrink-0 items-center gap-2 rounded-[4px] px-2.5 py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                }
              >
                <Icon className="size-3.5" aria-hidden="true" />
                {label}
              </a>
            ))}
          </div>
          <div
            className={`${styles.workspacePlan} mt-8 rounded-[4px] border border-border/50 bg-muted/15 p-3`}
          >
            <div className="flex items-center gap-1.5 text-foreground">
              <Sparkles className="size-3.5 text-primary" aria-hidden="true" />
              <p className="text-xs font-medium">Pro workspace</p>
            </div>
            <p className="mt-3 text-[11px] text-muted-foreground">
              8 of 12 seats used
            </p>
            <div
              className="mt-2 h-1 overflow-hidden rounded-full bg-muted"
              aria-hidden="true"
            >
              <div className="h-full w-2/3 rounded-full bg-primary" />
            </div>
            <p className="mt-3 text-[10px] leading-4 text-muted-foreground">
              Room for your next collaborators.
            </p>
          </div>
        </nav>
        <div id={`${id}-overview`} className="min-w-0 bg-muted/15 p-3.5 sm:p-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] text-muted-foreground">
                Workspace <span aria-hidden="true">/</span> Overview
              </p>
              <h2
                id={`${id}-heading`}
                className="mt-2 text-xl font-semibold tracking-tight"
              >
                Dashboard
              </h2>
              <p
                id={`${id}-description`}
                className="mt-1 text-xs leading-5 text-muted-foreground"
              >
                Your team&apos;s delivery, capacity, and upcoming work.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <label className="inline-flex min-h-9 items-center gap-1.5 rounded-[4px] border border-border bg-background pl-2.5 text-xs">
                <CalendarDays
                  className="size-3.5 text-muted-foreground"
                  aria-hidden="true"
                />
                <span className="sr-only">Activity period</span>
                <select
                  value={view.period}
                  onChange={(event) =>
                    onViewChange({
                      ...view,
                      period: event.target.value === "month" ? "month" : "week",
                    })
                  }
                  className="min-h-9 max-w-full rounded-[4px] bg-background pr-2 text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <option value="week">Last 7 days</option>
                  <option value="month">Last 30 days</option>
                </select>
              </label>
              <Button type="button" size="sm" className="min-h-9 rounded-[4px]">
                <Plus aria-hidden="true" />
                New project
              </Button>
            </div>
          </div>
          <div className={`${styles.stats} mt-5`}>
            {[
              {
                label: "Active projects",
                value: "12",
                detail: "3 shipping this week",
                change: "+2 this month",
                icon: FolderKanban,
              },
              {
                label: "Completed tasks",
                value: String(completed),
                detail: period.label,
                change: `+${growth}% vs previous`,
                icon: Check,
              },
              {
                label: "Team capacity",
                value: "86%",
                detail: "8 active team members",
                change: "4 seats available",
                icon: Users,
              },
              {
                label: "Delivery health",
                value: "98%",
                detail: "Milestones delivered on time",
                change: "+4% this month",
                icon: Activity,
              },
            ].map(({ label, value, detail, change, icon: Icon }, index) => (
              <Card
                key={label}
                className={`min-w-0 rounded-[5px] shadow-none ${index === 0 ? "border-primary/20 bg-primary/5" : `border-border/50 ${cardSurface}`}`}
              >
                <div className="p-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[11px] font-medium text-muted-foreground">
                      {label}
                    </p>
                    <Icon
                      className="size-3.5 shrink-0 text-muted-foreground"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mt-3 text-2xl font-semibold tracking-tight tabular-nums">
                    {value}
                  </p>
                  <p className="mt-2 text-[10px] font-medium text-foreground">
                    {change}
                  </p>
                  <p className="mt-1 text-[10px] leading-4 text-muted-foreground">
                    {detail}
                  </p>
                </div>
              </Card>
            ))}
          </div>
          <div className={`${styles.insights} mt-4`}>
            <Card
              className={`min-w-0 rounded-[5px] border-border/50 shadow-none ${cardSurface}`}
            >
              <figure className="p-4">
                <figcaption className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold">Delivery activity</h3>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      Completed tasks · {period.label.toLowerCase()}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-foreground">
                    <ArrowUpRight
                      className="size-3.5 text-primary"
                      aria-hidden="true"
                    />
                    {growth}%
                  </span>
                </figcaption>
                <svg
                  viewBox="0 0 560 210"
                  role="img"
                  aria-label={`Completed tasks: ${period.labels.map((label, index) => `${label} ${period.values[index]}`).join(", ")}. Total ${completed}.`}
                  className="mt-4 w-full"
                >
                  {[0, 1, 2, 3, 4].map((step) => (
                    <g key={step}>
                      <line
                        x1="35"
                        x2="548"
                        y1={20 + step * 35}
                        y2={20 + step * 35}
                        stroke="var(--border)"
                        strokeOpacity="0.5"
                        strokeDasharray="3 4"
                      />
                      <text
                        x="25"
                        y={24 + step * 35}
                        textAnchor="end"
                        fill="var(--muted-foreground)"
                        fontSize="10"
                      >
                        {Math.round(chartMax * (1 - step / 4))}
                      </text>
                    </g>
                  ))}
                  {period.values.map((value, index) => {
                    const slot = 500 / period.values.length;
                    const height = (value / chartMax) * 140;
                    return (
                      <g key={period.labels[index]}>
                        <rect
                          x={42 + index * slot + slot * 0.2}
                          y={160 - height}
                          width={slot * 0.6}
                          height={height}
                          rx="3"
                          fill="var(--primary)"
                          opacity={index === period.values.length - 1 ? 1 : 0.7}
                        >
                          <title>{`${period.labels[index]}: ${value} tasks completed`}</title>
                        </rect>
                        <text
                          x={42 + index * slot + slot / 2}
                          y="184"
                          textAnchor="middle"
                          fill="var(--muted-foreground)"
                          fontSize="10"
                        >
                          {period.labels[index]}
                        </text>
                      </g>
                    );
                  })}
                </svg>
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border/40 pt-3 text-[10px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      aria-hidden="true"
                      className="size-1.5 rounded-full bg-primary"
                    />
                    Completed tasks
                  </span>
                  <span>{period.previous} in the previous period</span>
                </div>
              </figure>
            </Card>
            <Card
              className={`rounded-[5px] border-border/50 p-4 shadow-none ${cardSurface}`}
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-semibold">Upcoming milestones</h3>
                <Clock3
                  aria-hidden="true"
                  className="size-3.5 text-muted-foreground"
                />
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">
                What needs your attention next.
              </p>
              <ul className="mt-4 divide-y divide-border/40">
                {[
                  {
                    day: "Tomorrow",
                    title: "Platform handoff",
                    project: "Atlas platform",
                    status: "Review",
                  },
                  {
                    day: "In 2 days",
                    title: "Launch readiness",
                    project: "Pulse launch",
                    status: "At risk",
                  },
                  {
                    day: "In 3 days",
                    title: "Onboarding release",
                    project: "Orbit onboarding",
                    status: "On track",
                  },
                ].map((milestone) => (
                  <li
                    key={milestone.title}
                    className="py-3 first:pt-0 last:pb-0"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[10px] text-muted-foreground">
                        {milestone.day}
                      </span>
                      <Badge
                        variant={
                          milestone.status === "At risk"
                            ? "warning"
                            : "secondary"
                        }
                        size="sm"
                      >
                        {milestone.status}
                      </Badge>
                    </div>
                    <p className="mt-2 text-xs font-medium">
                      {milestone.title}
                    </p>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      {milestone.project}
                    </p>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
          <div className={`${styles.projectGrid} mt-4`}>
            <Card
              className={`min-w-0 overflow-hidden rounded-[5px] border-border/50 shadow-none ${cardSurface}`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/40 p-4">
                <div>
                  <h3 className="text-sm font-semibold">Delivery board</h3>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Recent projects across your workspace.
                  </p>
                </div>
                <Input
                  aria-label="Filter Northstar projects"
                  placeholder="Search projects..."
                  size="sm"
                  value={view.query}
                  onChange={(event) =>
                    onViewChange({ ...view, query: event.target.value })
                  }
                  leftIcon={
                    <SearchIcon className="size-3.5" aria-hidden="true" />
                  }
                  className="w-full sm:w-44"
                />
              </div>
              <Tabs
                value={view.projectTab}
                onValueChange={(value) =>
                  onViewChange({
                    ...view,
                    projectTab: value === "planned" ? "planned" : "active",
                  })
                }
                className="min-w-0"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 px-4 pt-3">
                  <TabsList
                    size="sm"
                    aria-label="Project status"
                    className="h-8 bg-muted/70 p-0.5"
                  >
                    <TabsTrigger
                      value="active"
                      size="sm"
                      className="px-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      Active <span className="ml-1 opacity-70">4</span>
                    </TabsTrigger>
                    <TabsTrigger value="planned" size="sm" className="px-2">
                      Planned <span className="ml-1 opacity-70">2</span>
                    </TabsTrigger>
                  </TabsList>
                  <span className="text-[10px] tabular-nums text-muted-foreground">
                    {filteredProjects.length} project
                    {filteredProjects.length === 1 ? "" : "s"}
                  </span>
                </div>
                <TabsContent
                  value={view.projectTab}
                  className={`${styles.projectTable} mt-3`}
                >
                  <Table aria-label="Northstar projects" id={`${id}-projects`}>
                    <TableHeader className="bg-muted/15">
                      <TableRow className="border-border/40 hover:bg-transparent">
                        <TableHead>Project</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Owner</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead className="text-right">Due</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProjects.map((project) => (
                        <TableRow
                          key={project.name}
                          className="border-border/40"
                        >
                          <TableCell>
                            <div className="flex items-center gap-2.5">
                              <span
                                aria-hidden="true"
                                className="grid size-7 shrink-0 place-items-center rounded-[4px] border border-primary/20 bg-primary/10 text-[9px] font-semibold text-foreground"
                              >
                                {project.initials}
                              </span>
                              <div>
                                <p className="whitespace-nowrap text-xs font-medium">
                                  {project.name}
                                </p>
                                <p className="mt-1 whitespace-nowrap text-[10px] text-muted-foreground">
                                  {project.client}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                project.status === "At risk"
                                  ? "warning"
                                  : project.status === "On track"
                                    ? "success"
                                    : "secondary"
                              }
                              size="sm"
                              className="whitespace-nowrap"
                            >
                              {project.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-[11px] text-muted-foreground">
                              <span
                                aria-hidden="true"
                                className="grid size-5 shrink-0 place-items-center rounded-full bg-muted text-[8px] font-medium"
                              >
                                {project.avatar}
                              </span>
                              {project.owner}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="min-w-24">
                              <div className="flex items-center justify-between gap-2 text-[10px]">
                                <span className="text-muted-foreground">
                                  {project.tasks}
                                </span>
                                <span className="tabular-nums">
                                  {project.progress}%
                                </span>
                              </div>
                              <div
                                role="progressbar"
                                aria-label={`${project.name} completion`}
                                aria-valuenow={project.progress}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                className="mt-1.5 h-1 overflow-hidden rounded-full bg-muted"
                              >
                                <div
                                  className="h-full rounded-full bg-primary"
                                  style={{ width: `${project.progress}%` }}
                                />
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="whitespace-nowrap text-right text-[11px] text-muted-foreground">
                            {project.due}
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredProjects.length === 0 ? (
                        <TableRow className="hover:bg-transparent">
                          <TableCell colSpan={5} className="py-10 text-center">
                            <FolderKanban
                              aria-hidden="true"
                              className="mx-auto size-5 text-muted-foreground"
                            />
                            <p className="mt-2 text-sm font-medium">
                              No matching projects
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                              Try a project, client, or teammate name.
                            </p>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="mt-3"
                              onClick={() =>
                                onViewChange({ ...view, query: "" })
                              }
                            >
                              Clear search
                            </Button>
                          </TableCell>
                        </TableRow>
                      ) : null}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
              <div className="border-t border-border/40 px-4 py-3 text-[10px] text-muted-foreground">
                Preview data · Changes here do not affect your exported theme.
              </div>
            </Card>
            <Card
              className={`rounded-[5px] border-border/50 p-4 shadow-none ${cardSurface}`}
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-semibold">Live activity</h3>
                <Activity
                  className="size-3.5 text-primary"
                  aria-hidden="true"
                />
              </div>
              <ol className="mt-4 space-y-5">
                {activity.map((item) => (
                  <li key={item.name} className="flex gap-2.5">
                    <span
                      aria-hidden="true"
                      className="grid size-7 shrink-0 place-items-center rounded-full bg-muted text-[9px] font-medium text-muted-foreground"
                    >
                      {item.initials}
                    </span>
                    <div>
                      <p className="text-[11px] leading-5">
                        <span className="font-medium">{item.name}</span>{" "}
                        <span className="text-muted-foreground">
                          {item.action}
                        </span>
                      </p>
                      <p className="text-[11px] text-foreground">
                        {item.project}
                      </p>
                      <p className="mt-1 text-[10px] text-muted-foreground">
                        {item.time}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-5 border-t border-border/40 pt-4 text-[11px] text-muted-foreground">
                All activity is from this demo workspace.
              </div>
            </Card>
          </div>
          <details
            className={`group mt-4 rounded-[5px] border border-border/50 ${cardSurface}`}
          >
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 rounded-[5px] px-4 py-3 text-xs font-medium focus-visible:outline-2 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
              <span>
                Component states{" "}
                <span className="ml-1 font-normal text-muted-foreground">
                  · Forms, empty states, and focus
                </span>
              </span>
              <ChevronDown
                className="size-4 shrink-0 transition-transform group-open:rotate-180 motion-reduce:transition-none"
                aria-hidden="true"
              />
            </summary>
            <div className="border-t border-border/40 p-3.5">
              <section
                aria-labelledby={`${id}-interface-states`}
                className={styles.states}
              >
                <Card
                  className={`rounded-[4px] border-border/50 shadow-none ${cardSurface}`}
                >
                  <div className="p-3.5">
                    <h3
                      id={`${id}-interface-states`}
                      className="text-sm font-semibold"
                    >
                      Form validation
                    </h3>
                    <p className="mt-1 text-[11px] leading-4 text-muted-foreground">
                      Test field labels, errors, and helper text.
                    </p>
                    <Input
                      id={`${id}-workspace-url`}
                      label="Workspace URL"
                      defaultValue="northstar"
                      error="Use a public hostname before inviting clients."
                      className="mt-3"
                    />
                  </div>
                </Card>

                <Card
                  className={`rounded-[4px] border-border/50 shadow-none ${cardSurface}`}
                >
                  <div className="p-3.5">
                    <h3 className="text-sm font-semibold">Empty state</h3>
                    <p className="mt-1 text-[11px] leading-4 text-muted-foreground">
                      Test quiet surfaces without losing hierarchy.
                    </p>
                    <div className="mt-3 rounded-[4px] border border-dashed border-border/50 bg-muted/15 p-3 text-center">
                      <FolderKanban
                        className="mx-auto size-4 text-muted-foreground"
                        aria-hidden="true"
                      />
                      <p className="mt-2 text-xs font-medium">
                        No pending reviews
                      </p>
                      <p className="mt-1 text-[11px] leading-4 text-muted-foreground">
                        New client feedback will appear here.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card
                  className={`rounded-[4px] border-border/50 shadow-none ${cardSurface}`}
                >
                  <div className="p-3.5">
                    <h3 className="text-sm font-semibold">
                      Focus-ready action
                    </h3>
                    <p className="mt-1 text-[11px] leading-4 text-muted-foreground">
                      Test the visible keyboard focus treatment.
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-5 rounded-[4px] ring-2 ring-ring ring-offset-2 ring-offset-background"
                    >
                      Invite teammate
                    </Button>
                  </div>
                </Card>
              </section>
            </div>
          </details>
          <Alert
            variant="warning"
            ariaLive="off"
            className="mt-4 rounded-[5px] p-3.5"
          >
            <AlertTitle className="text-xs">Usage update</AlertTitle>
            <AlertDescription className="mt-1 text-[11px] leading-5">
              86% of this month&apos;s delivery capacity is assigned. Review
              upcoming work before adding another project.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </section>
  );
}
