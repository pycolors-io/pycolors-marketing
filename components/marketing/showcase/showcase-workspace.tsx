"use client";

import * as React from "react";
import {
  Badge,
  Button,
  EmptyState,
  Separator,
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
import { Archive, ArrowUpRight, Check, Circle, Folder } from "lucide-react";
import {
  projectsForFilter,
  showcaseProjects,
  type ShowcaseFilter,
  type ShowcaseProjectId,
} from "./showcase-fixtures";

const filters = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "archived", label: "Archived" },
] as const;

/** One local state boundary; all content also has deterministic server markup. */
export function ShowcaseWorkspace() {
  const [filter, setFilter] = React.useState<ShowcaseFilter>("all");
  const [selectedId, setSelectedId] = React.useState<ShowcaseProjectId | null>(
    "customer-portal",
  );
  const [announcement, setAnnouncement] = React.useState("");
  const allTab = React.useRef<HTMLButtonElement>(null);
  const detailId = React.useId();
  const detailHeadingId = React.useId();
  const visibleProjects = projectsForFilter(filter);
  const selected = showcaseProjects.find(
    (project) => project.id === selectedId,
  );
  const reviewed = selected?.areas.filter((area) => area.reviewed).length ?? 0;

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

  return (
    <Tabs value={filter} onValueChange={changeFilter} className="min-w-0">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-subtle px-4 py-4 sm:px-6">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Folder aria-hidden="true" className="size-4 text-muted-foreground" />
          Projects
          <span className="font-mono text-xs text-muted-foreground">
            {showcaseProjects.length}
          </span>
        </div>
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
      </div>
      {filters.map(({ value }) => (
        <TabsContent
          key={value}
          value={value}
          className="m-0 min-w-0 focus-visible:ring-inset"
        >
          <div className="grid min-w-0 lg:grid-cols-3">
            <div className="min-h-112 min-w-0 px-4 py-6 sm:px-6 lg:col-span-2 lg:py-8">
              <div className="mb-5 flex items-baseline justify-between gap-3">
                <h3 className="text-sm font-semibold">Your projects</h3>
                <span className="text-xs text-muted-foreground">
                  {visibleProjects.length} shown
                </span>
              </div>
              {visibleProjects.length ? (
                <Table aria-label="Projects" className="table-fixed">
                  <TableHeader>
                    <TableRow className="hover:bg-transparent motion-reduce:transition-none">
                      <TableHead className="w-2/3 px-3">Project</TableHead>
                      <TableHead className="px-2 sm:px-4">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {visibleProjects.map((project) => {
                      const isSelected = project.id === selectedId;
                      return (
                        <TableRow
                          key={project.id}
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
                              onClick={() => {
                                setSelectedId(project.id);
                                setAnnouncement(`${project.name} selected.`);
                              }}
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
                                <Folder className="size-4" />
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
                              </span>
                            </Button>
                          </TableCell>
                          <TableCell className="px-2 py-3 sm:px-4">
                            <Badge
                              variant="outline"
                              className="h-auto min-h-6 max-w-full rounded-[4px] px-2 py-1 text-xs motion-reduce:transition-none"
                            >
                              {project.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
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
              <p className="mt-5 text-xs leading-5 text-muted-foreground">
                Select a project to inspect its interface review.
              </p>
            </div>
            <section
              id={detailId}
              aria-labelledby={detailHeadingId}
              className="min-h-128 min-w-0 border-t border-border-subtle bg-surface-muted/40 px-4 py-6 sm:px-6 lg:border-t-0 lg:border-l lg:py-8"
            >
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Project detail
              </p>
              <h3
                id={detailHeadingId}
                className="break-words text-xl font-semibold tracking-tight"
              >
                {selected?.name ?? "No project selected"}
              </h3>
              {selected ? (
                <>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Demo interface review
                  </p>
                  <div className="mt-7 flex items-baseline gap-2">
                    <span className="font-mono text-3xl font-medium tracking-tight">
                      {reviewed}
                      <span className="text-base text-muted-foreground">
                        {" "}
                        / {selected.areas.length}
                      </span>
                    </span>
                    <span className="text-xs text-muted-foreground">
                      areas reviewed
                    </span>
                  </div>
                  <div aria-hidden="true" className="mt-3 flex gap-1.5">
                    {selected.areas.map((area) => (
                      <span
                        key={area.name}
                        className={cn(
                          "h-1.5 flex-1 rounded-full",
                          area.reviewed ? "bg-primary" : "bg-border",
                        )}
                      />
                    ))}
                  </div>
                  <Separator className="my-6" />
                  <ul aria-label="Interface review areas" className="space-y-5">
                    {selected.areas.map((area) => (
                      <li key={area.name} className="flex items-start gap-3">
                        {area.reviewed ? (
                          <Check
                            aria-hidden="true"
                            className="mt-0.5 size-4 shrink-0 text-primary"
                          />
                        ) : (
                          <Circle
                            aria-hidden="true"
                            className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                          />
                        )}
                        <div className="min-w-0">
                          <p className="text-sm font-medium">{area.name}</p>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {area.reviewed ? "Reviewed" : "To review"}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-7 flex items-start gap-2 text-xs leading-5 text-muted-foreground">
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
