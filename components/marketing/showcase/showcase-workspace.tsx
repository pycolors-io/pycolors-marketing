"use client";

import * as React from "react";
import {
  Badge,
  Button,
  EmptyState,
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
  cn,
} from "@pycolors/ui";
import {
  Archive,
  ArrowUpRight,
  BookOpen,
  Check,
  Circle,
  Folder,
  LayoutDashboard,
  UsersRound,
  Columns3,
  Rows3,
  Activity,
  CircleDot,
  ChevronDown,
} from "lucide-react";
import {
  projectsForFilter,
  showcaseProjects,
  showcaseAreaDescriptions,
  type ShowcaseFilter,
  type ShowcaseProjectId,
} from "./showcase-fixtures";

const filters = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "archived", label: "Archived" },
] as const;

const projectIcons = {
  "customer-portal": LayoutDashboard,
  "team-workspace": UsersRound,
  "help-center": BookOpen,
};

type ShowcaseProject = (typeof showcaseProjects)[number];

function ProjectBoard({
  projects,
  selectedId,
  detailId,
  onSelect,
}: {
  projects: readonly ShowcaseProject[];
  selectedId: ShowcaseProjectId | null;
  detailId: string;
  onSelect: (project: ShowcaseProject) => void;
}) {
  return (
    <ul aria-label="Projects board" className="grid gap-3 sm:grid-cols-2">
      {(["Active", "Review"] as const).map((status) => {
        const column = projects.filter((project) => project.status === status);
        return (
          <li
            key={status}
            className="min-w-0 rounded-[5px] border border-border-subtle bg-surface-muted/30 p-2.5"
          >
            <div className="mb-3 flex items-center justify-between gap-2 px-1 pt-1">
              <span className="text-xs font-medium">{status}</span>
              <span className="font-mono text-[10px] text-muted-foreground">
                {column.length}
              </span>
            </div>
            {column.length ? (
              <ul className="space-y-2.5">
                {column.map((project) => {
                  const Icon = projectIcons[project.id];
                  const reviewed = project.areas.filter(
                    (area) => area.reviewed,
                  ).length;
                  const isSelected = project.id === selectedId;
                  const coverageId = `${detailId}-${project.id}-board-coverage`;
                  return (
                    <li key={project.id}>
                      <Button
                        type="button"
                        variant="ghost"
                        aria-label={`Open ${project.name}`}
                        aria-pressed={isSelected}
                        aria-controls={detailId}
                        aria-describedby={coverageId}
                        onClick={() => onSelect(project)}
                        className={cn(
                          "block h-auto w-full whitespace-normal rounded-[5px] border bg-background p-3.5 text-left motion-reduce:transition-none",
                          isSelected
                            ? "border-primary/30 bg-primary/[0.03] hover:bg-primary/5"
                            : "border-border-subtle hover:bg-background",
                        )}
                        data-showcase-project="board"
                      >
                        <span className="mb-3 flex items-center justify-between gap-2">
                          <span data-showcase-project-icon aria-hidden="true">
                            <Icon
                              aria-hidden="true"
                              className={cn(
                                "size-4",
                                isSelected
                                  ? "text-primary"
                                  : "text-muted-foreground",
                              )}
                            />
                          </span>
                          <ArrowUpRight
                            aria-hidden="true"
                            className="size-3 text-muted-foreground"
                          />
                        </span>
                        <span className="block text-xs font-semibold leading-5">
                          {project.name}
                        </span>
                        <span
                          className={cn(
                            "mt-1 block text-[10px] font-normal",
                            isSelected
                              ? "text-primary"
                              : "text-muted-foreground",
                          )}
                        >
                          {isSelected
                            ? "Selected project"
                            : "View review details"}
                        </span>
                        <span
                          id={coverageId}
                          className="mt-4 block border-t border-border-subtle pt-2.5 text-[10px] font-normal text-muted-foreground"
                        >
                          {reviewed} of {project.areas.length} areas reviewed
                        </span>
                      </Button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="px-1 py-6 text-[11px] leading-5 text-muted-foreground">
                No projects in this view.
              </p>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function ProjectStatus({ status }: { status: "Active" | "Review" }) {
  return (
    <Badge
      variant="outline"
      className="h-auto min-h-6 max-w-full gap-1.5 rounded-[4px] border-border-subtle bg-background px-2 py-1 text-[11px] motion-reduce:transition-none"
    >
      <span
        aria-hidden="true"
        className={cn(
          "hidden size-1.5 shrink-0 rounded-full sm:block",
          status === "Active" ? "bg-success" : "bg-warning",
        )}
      />
      {status}
    </Badge>
  );
}

/** One local state boundary; all content also has deterministic server markup. */
export function ShowcaseWorkspace() {
  const [filter, setFilter] = React.useState<ShowcaseFilter>("all");
  const [selectedId, setSelectedId] = React.useState<ShowcaseProjectId | null>(
    "customer-portal",
  );
  const [announcement, setAnnouncement] = React.useState("");
  const [view, setView] = React.useState<"table" | "board">("table");
  const [mobileDetailsOpen, setMobileDetailsOpen] = React.useState(false);
  const allTab = React.useRef<HTMLButtonElement>(null);
  const detailId = React.useId();
  const detailHeadingId = React.useId();
  const visibleProjects = projectsForFilter(filter);
  const selected = showcaseProjects.find(
    (project) => project.id === selectedId,
  );
  const SelectedIcon = selected ? projectIcons[selected.id] : Folder;
  const reviewed = selected?.areas.filter((area) => area.reviewed).length ?? 0;
  const nextArea = selected?.areas.find((area) => !area.reviewed);
  const workspaceSummary = [
    { label: "Projects", value: showcaseProjects.length, icon: Folder },
    {
      label: "Active",
      icon: Activity,
      value: showcaseProjects.filter((project) => project.status === "Active")
        .length,
    },
    {
      label: "In review",
      icon: CircleDot,
      value: showcaseProjects.filter((project) => project.status === "Review")
        .length,
    },
  ];

  function changeFilter(value: string) {
    if (value !== "all" && value !== "active" && value !== "archived") return;
    const projects = projectsForFilter(value);
    setFilter(value);
    setSelectedId((current) =>
      projects.some((project) => project.id === current)
        ? current
        : (projects[0]?.id ?? null),
    );
    setAnnouncement("");
  }

  function recover() {
    changeFilter("all");
    allTab.current?.focus();
  }

  function selectProject(project: ShowcaseProject) {
    setSelectedId(project.id);
    setMobileDetailsOpen(true);
    setAnnouncement(`${project.name} selected.`);
  }

  return (
    <Tabs value={filter} onValueChange={changeFilter} className="min-w-0">
      <div
        data-showcase-toolbar
        className="flex flex-wrap items-center justify-between gap-4 border-b border-border-subtle px-4 py-4 sm:px-6"
      >
        <div className="flex items-center gap-2 text-sm font-medium">
          <span data-showcase-workspace-icon aria-hidden="true">
            <Folder className="size-4" />
          </span>
          Projects
          <span className="font-mono text-xs text-muted-foreground">
            {showcaseProjects.length}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <TabsList
            aria-label="Filter projects"
            className="h-auto min-h-12 max-w-full flex-wrap rounded-[5px] bg-surface-muted p-1"
          >
            {filters.map(({ value, label }) => (
              <TabsTrigger
                key={value}
                value={value}
                ref={value === "all" ? allTab : undefined}
                className="min-h-11 min-w-11 rounded-[3px] px-3 motion-reduce:transition-none"
              >
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div
            role="group"
            aria-label="Project layout"
            className="flex max-w-full rounded-[5px] border border-border-subtle bg-background p-1"
          >
            {(
              [
                { value: "table", label: "Table", icon: Rows3 },
                { value: "board", label: "Board", icon: Columns3 },
              ] as const
            ).map(({ value: layout, label, icon: Icon }) => (
              <Button
                key={layout}
                type="button"
                variant="ghost"
                size="sm"
                aria-pressed={view === layout}
                onClick={() => setView(layout)}
                className={cn(
                  "min-h-11 gap-1.5 rounded-[3px] px-2.5 text-xs motion-reduce:transition-none [@media(pointer:fine)]:min-h-8",
                  view === layout
                    ? "bg-surface-muted text-foreground"
                    : "text-muted-foreground",
                )}
              >
                <Icon className="size-3.5" aria-hidden="true" />
                {label}
              </Button>
            ))}
          </div>
        </div>
      </div>
      {filters.map(({ value }) => (
        <TabsContent
          key={value}
          value={value}
          className="m-0 min-w-0 focus-visible:ring-inset"
        >
          <div className="grid min-w-0 lg:grid-cols-3">
            <div
              data-showcase-panel="projects"
              className="min-h-112 min-w-0 px-4 py-6 sm:px-6 lg:col-span-2 lg:py-8"
            >
              <div className="mb-4 flex items-baseline justify-between gap-3">
                <h3 className="text-sm font-semibold">Workspace overview</h3>
                <span className="text-xs text-muted-foreground">
                  All projects
                </span>
              </div>
              <dl
                aria-label="Workspace totals"
                data-showcase-metrics
                className="mb-6 grid grid-cols-3 gap-2 sm:gap-3"
              >
                {workspaceSummary.map(({ label, value: count, icon: Icon }) => (
                  <div
                    key={label}
                    className="min-w-0 rounded-[5px] border border-border-subtle bg-background px-3 py-3.5 sm:px-4"
                  >
                    <dt className="flex items-center justify-between gap-1 text-[10px] leading-4 text-muted-foreground sm:text-[11px]">
                      {label}
                      <Icon
                        className="hidden size-3.5 sm:block"
                        aria-hidden="true"
                      />
                    </dt>
                    <dd className="mt-2 font-mono text-2xl font-medium tracking-tight sm:text-[28px]">
                      {count}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mb-3 flex items-baseline justify-between gap-3">
                <h4 className="text-xs font-medium">Your projects</h4>
                <span className="text-[11px] text-muted-foreground">
                  {visibleProjects.length} shown
                </span>
              </div>
              <div key={view} data-showcase-view={view}>
                {visibleProjects.length ? (
                  view === "board" ? (
                    <ProjectBoard
                      projects={visibleProjects}
                      selectedId={selectedId}
                      detailId={detailId}
                      onSelect={selectProject}
                    />
                  ) : (
                    <Table aria-label="Projects" className="table-fixed">
                      <TableHeader>
                        <TableRow className="hover:bg-transparent motion-reduce:transition-none">
                          <TableHead className="w-2/3 px-3 sm:w-[52%]">
                            Project
                          </TableHead>
                          <TableHead className="hidden px-3 sm:table-cell sm:w-[26%]">
                            Interface review
                          </TableHead>
                          <TableHead className="px-2 sm:px-3">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {visibleProjects.map((project) => {
                          const isSelected = project.id === selectedId;
                          const ProjectIcon = projectIcons[project.id];
                          const projectReviewed = project.areas.filter(
                            (area) => area.reviewed,
                          ).length;
                          const coverageId = `${detailId}-${project.id}-coverage`;
                          return (
                            <TableRow
                              key={project.id}
                              data-showcase-selected={isSelected}
                              className={cn(
                                "motion-reduce:transition-none",
                                isSelected && "bg-primary/5 hover:bg-primary/5",
                              )}
                            >
                              <TableCell className="p-2 sm:p-3">
                                <Button
                                  type="button"
                                  variant="ghost"
                                  aria-label={`Open ${project.name}`}
                                  aria-pressed={isSelected}
                                  aria-controls={detailId}
                                  aria-describedby={coverageId}
                                  onClick={() => selectProject(project)}
                                  className="h-auto min-h-16 w-full min-w-0 justify-start gap-3 whitespace-normal rounded-[3px] px-2 py-3 text-left motion-reduce:transition-none"
                                >
                                  <span
                                    aria-hidden="true"
                                    className={cn(
                                      "hidden size-9 shrink-0 items-center justify-center rounded-[4px] border sm:flex",
                                      isSelected
                                        ? "border-primary/25 bg-primary/10 text-primary"
                                        : "border-border-subtle bg-surface",
                                    )}
                                  >
                                    <ProjectIcon className="size-4" />
                                  </span>
                                  <span className="min-w-0">
                                    <span className="block break-words text-sm font-semibold leading-5">
                                      {project.name}
                                    </span>
                                    <span
                                      className={cn(
                                        "mt-1 block text-xs font-normal",
                                        isSelected
                                          ? "text-primary"
                                          : "text-muted-foreground",
                                      )}
                                    >
                                      {isSelected
                                        ? "Selected project"
                                        : "View review details"}
                                    </span>
                                    <span
                                      aria-hidden="true"
                                      className="mt-1 block text-[10px] font-normal text-muted-foreground sm:hidden"
                                    >
                                      {projectReviewed} of{" "}
                                      {project.areas.length} reviewed
                                    </span>
                                  </span>
                                </Button>
                              </TableCell>
                              <TableCell className="hidden px-3 py-3 sm:table-cell">
                                <span
                                  id={coverageId}
                                  className="text-[11px] text-muted-foreground"
                                >
                                  {projectReviewed} of {project.areas.length}{" "}
                                  reviewed
                                </span>
                                <div
                                  aria-hidden="true"
                                  className="mt-2 flex max-w-24 gap-1"
                                >
                                  {project.areas.map((area) => (
                                    <span
                                      key={area.name}
                                      className={cn(
                                        "h-1 flex-1 rounded-full",
                                        area.reviewed
                                          ? "bg-primary"
                                          : "bg-border",
                                      )}
                                    />
                                  ))}
                                </div>
                              </TableCell>
                              <TableCell className="px-2 py-3 sm:px-3">
                                <ProjectStatus status={project.status} />
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  )
                ) : (
                  <EmptyState
                    ariaLive="off"
                    icon={<Archive aria-hidden="true" className="size-6" />}
                    title="No archived projects"
                    description="Nothing in this demo workspace has been archived. Return to all projects to continue the interface review."
                    action={
                      <Button
                        type="button"
                        onClick={recover}
                        className="min-h-11 whitespace-normal motion-reduce:transition-none"
                      >
                        Show all projects
                      </Button>
                    }
                    className="min-h-72 rounded-[5px] border-border-subtle bg-surface-muted/30 px-4"
                  />
                )}
              </div>
              <div className="mt-5 flex items-start gap-2 text-xs leading-5 text-muted-foreground">
                <ArrowUpRight
                  aria-hidden="true"
                  className="mt-0.5 size-3.5 shrink-0"
                />
                <p>
                  Select a project to inspect its interface review. Progress
                  tracks the three checklist areas for each demo project.
                </p>
              </div>
            </div>
            <button
              type="button"
              aria-expanded={mobileDetailsOpen}
              aria-controls={detailId}
              onClick={() => setMobileDetailsOpen((open) => !open)}
              className="flex min-h-11 w-full items-center justify-between gap-3 border-t border-border-subtle px-4 py-3 text-xs font-medium text-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring lg:hidden"
            >
              {mobileDetailsOpen
                ? "Hide project details"
                : "Show project details"}
              <ChevronDown
                aria-hidden="true"
                className={cn("size-3.5", mobileDetailsOpen && "rotate-180")}
              />
            </button>
            <section
              id={detailId}
              aria-labelledby={detailHeadingId}
              data-showcase-panel="detail"
              className={cn(
                "min-h-128 min-w-0 border-t border-border-subtle bg-surface-muted/40 px-4 py-6 sm:px-6 lg:block lg:border-t-0 lg:border-l lg:py-8",
                !mobileDetailsOpen && "hidden",
              )}
            >
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  Project detail
                </p>
                {selected && <ProjectStatus status={selected.status} />}
              </div>
              <div key={selectedId ?? "empty"} data-showcase-detail>
                <div className="flex items-center gap-3">
                  <span data-showcase-detail-icon aria-hidden="true">
                    <SelectedIcon className="size-5" strokeWidth={1.5} />
                  </span>
                  <h3
                    id={detailHeadingId}
                    className="break-words text-xl font-semibold tracking-tight"
                  >
                    {selected?.name ?? "No project selected"}
                  </h3>
                </div>
                {selected ? (
                  <>
                    <p className="mt-2 text-xs leading-5 text-muted-foreground">
                      {selected.description}
                    </p>
                    <div data-showcase-review>
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <span className="text-xs font-medium">
                          Demo interface review
                        </span>
                        <span className="font-mono text-2xl font-medium tracking-tight">
                          {reviewed}
                          <span className="text-base text-muted-foreground">
                            {" "}
                            / {selected.areas.length}
                          </span>
                        </span>
                      </div>
                      <div aria-hidden="true" className="mt-3 flex gap-1.5">
                        {selected.areas.map((area) => (
                          <span
                            key={area.name}
                            data-showcase-progress={
                              area.reviewed ? "reviewed" : "pending"
                            }
                            className={cn(
                              "h-1.5 flex-1 rounded-full",
                              area.reviewed ? "bg-primary" : "bg-border",
                            )}
                          />
                        ))}
                      </div>
                      <p className="mt-2 text-[11px] text-muted-foreground">
                        {reviewed} of {selected.areas.length} areas reviewed ·{" "}
                        {selected.areas.length - reviewed} remaining
                      </p>
                    </div>
                    <ul
                      aria-label="Interface review areas"
                      className="mt-5 divide-y divide-border-subtle"
                    >
                      {selected.areas.map((area) => (
                        <li
                          key={area.name}
                          className="flex items-center gap-2.5 py-3 first:pt-0 last:pb-0"
                        >
                          <span
                            aria-hidden="true"
                            className={cn(
                              "flex size-6 shrink-0 items-center justify-center rounded-full border",
                              area.reviewed
                                ? "border-primary/20 bg-primary/5 text-primary"
                                : "border-border-subtle bg-background text-muted-foreground",
                            )}
                          >
                            {area.reviewed ? (
                              <Check aria-hidden="true" className="size-3" />
                            ) : (
                              <Circle aria-hidden="true" className="size-2.5" />
                            )}
                          </span>
                          <div className="flex min-w-0 flex-1 flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                            <p className="text-xs font-medium">{area.name}</p>
                            <p className="text-[10px] text-muted-foreground">
                              {area.reviewed ? "Reviewed" : "To review"}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                    {nextArea && (
                      <div
                        data-showcase-next
                        className="mt-5 rounded-[5px] border border-primary/15 bg-background/70 p-3.5"
                      >
                        <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                          Next area to review
                        </p>
                        <p className="mt-2 text-xs font-semibold">
                          {nextArea.name}
                        </p>
                        <p className="mt-1 text-[11px] leading-5 text-muted-foreground">
                          {showcaseAreaDescriptions[nextArea.name]}
                        </p>
                      </div>
                    )}
                    <p className="mt-5 flex items-start gap-2 text-[10px] leading-5 text-muted-foreground">
                      <ArrowUpRight
                        aria-hidden="true"
                        className="mt-0.5 size-3.5 shrink-0"
                      />
                      Read-only checklist · no changes are saved
                    </p>
                  </>
                ) : (
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Show all projects to inspect a project’s interface review.
                  </p>
                )}
              </div>
            </section>
          </div>
        </TabsContent>
      ))}
      <p
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </p>
    </Tabs>
  );
}
