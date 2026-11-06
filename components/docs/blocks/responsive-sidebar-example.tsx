"use client";

import { useCopy } from "@/lib/i18n/use-copy";
import { Link } from "@/lib/i18n/navigation";
import { useId, useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  FolderKanban,
  LayoutDashboard,
  Plus,
  Users,
} from "lucide-react";
import { Badge, Button } from "@pycolors/ui";
import { ResponsiveSidebar } from "@/content/blocks/app-shells/responsive-sidebar";

const initialProjects = [
  { id: "website", name: "Website redesign", team: "Design", progress: 72 },
  {
    id: "platform",
    name: "Platform release",
    team: "Engineering",
    progress: 48,
  },
  { id: "brand", name: "Brand guidelines", team: "Marketing", progress: 100 },
];

export function ResponsiveSidebarExample() {
  const tSite = useCopy();

  const id = useId();
  const contentId = `workspace-${id}`;
  const [active, setActive] = useState("overview");
  const [projects, setProjects] = useState(initialProjects);
  const [message, setMessage] = useState(
    "Fictional workspace · Changes stay in this preview.",
  );
  const title =
    active === "projects"
      ? "Projects"
      : active === "team"
        ? "Team"
        : "Overview";

  return (
    <div className="not-prose overflow-hidden rounded-[5px] border border-border">
      <ResponsiveSidebar
        mobileTriggerLabel={tSite("Open navigation")}
        skipToContentLabel={tSite("Skip to content")}
        activeItemId={active}
        brand={
          <div className="flex min-w-0 items-center gap-3 py-3">
            <span
              aria-hidden="true"
              className="grid size-8 shrink-0 place-items-center rounded-md bg-foreground text-sm font-semibold text-background"
            >
              {tSite("N")}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">
                {tSite("Northstar")}
              </p>
              <p className="text-[11px] text-muted-foreground">
                {tSite("Team workspace")}
              </p>
            </div>
          </div>
        }
        className="min-h-[35rem] [&_[data-slot=responsive-sidebar-desktop]]:h-auto [&_[data-slot=responsive-sidebar-desktop]]:self-stretch [&_[data-slot=responsive-sidebar-desktop]]:bg-background"
        contentAs="div"
        contentId={contentId}
        headerTitle={<p className="text-sm font-medium">{tSite(title)}</p>}
        headerActions={
          <Button
            type="button"
            className="h-auto min-h-10 gap-1.5 px-3 text-xs"
            onClick={() => {
              setProjects((current) => [
                ...current,
                {
                  id: `demo-${current.length}`,
                  name: tSite("Demo project {value0}", {
                    value0: current.length - initialProjects.length + 1,
                  }),
                  team: "Your team",
                  progress: 0,
                },
              ]);
              setActive("projects");
              setMessage(
                "Demo project added locally. Nothing is saved or sent.",
              );
            }}
          >
            <Plus aria-hidden="true" className="size-3.5" />{" "}
            {tSite(" Add demo project")}
          </Button>
        }
        items={[
          {
            id: "overview",
            label: tSite("Overview"),
            href: `#${contentId}`,
            icon: <LayoutDashboard className="size-4" />,
          },
        ]}
        groups={[
          {
            id: "workspace",
            label: tSite("Workspace"),
            items: [
              {
                id: "projects",
                label: tSite("Projects"),
                href: `#${contentId}`,
                icon: <FolderKanban className="size-4" />,
                badge: projects.length,
              },
              {
                id: "team",
                label: tSite("Team"),
                href: `#${contentId}`,
                icon: <Users className="size-4" />,
                badge: "3",
              },
            ],
          },
          {
            id: "resources",
            label: tSite("Resources"),
            items: [
              {
                id: "guide",
                label: tSite("Integration guide"),
                href: tSite.href("/docs/blocks/app-shells/responsive-sidebar"),
                icon: <BookOpen className="size-4" />,
              },
            ],
          },
        ]}
        renderLink={({
          item,
          active: selected,
          className,
          children,
          onNavigate,
        }) => (
          <a
            href={item.href}
            aria-current={selected ? "page" : undefined}
            className={className}
            onClick={(event) => {
              if (item.id !== "guide") {
                event.preventDefault();
                setActive(item.id);
              }
              onNavigate();
            }}
          >
            {tSite(children)}
          </a>
        )}
        mobileTitle={tSite("Workspace navigation")}
        mobileDescription={tSite("Explore the fictional Northstar workspace.")}
        navigationLabel={tSite("Preview workspace navigation")}
        sidebarFooter={
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="grid size-8 shrink-0 place-items-center rounded-full bg-secondary text-[11px] font-medium text-secondary-foreground"
            >
              {tSite("AL")}
            </span>
            <div className="min-w-0">
              <p className="text-xs font-medium">{tSite("Alex Lee")}</p>
              <p className="text-[11px] text-muted-foreground">
                {tSite("Workspace admin · Demo")}
              </p>
            </div>
          </div>
        }
      >
        <div className="space-y-6 p-4 sm:p-6">
          <div>
            <p className="text-lg font-semibold tracking-tight">
              {tSite(
                active === "overview"
                  ? "Your workspace, at a glance."
                  : active === "team"
                    ? "The people behind the work."
                    : "Move your next release forward.",
              )}
            </p>
            <p className="mt-1 text-xs leading-6 text-muted-foreground">
              {tSite(
                active === "team"
                  ? "A shared space for design, engineering and marketing."
                  : "Keep track of projects and the work that matters next.",
              )}
            </p>
          </div>
          {active === "overview" ? (
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border">
              {[
                { label: tSite("Active projects"), value: projects.length },
                { label: tSite("Team members"), value: 3 },
              ].map((metric) => (
                <div key={metric.label} className="min-w-0 bg-card p-4">
                  <dt className="text-xs text-muted-foreground">
                    {tSite(metric.label)}
                  </dt>
                  <dd className="mt-2 text-2xl font-semibold tabular-nums">
                    {tSite(metric.value)}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
          {active === "team" ? (
            <ul className="divide-y divide-border overflow-hidden rounded-md border border-border bg-card">
              {[
                { name: "Alex Lee", role: "Workspace admin" },
                { name: "Sam Rivera", role: "Designer" },
                { name: "Jordan Park", role: "Engineer" },
              ].map((member) => (
                <li
                  key={member.name}
                  className="flex flex-wrap items-center justify-between gap-2 p-4"
                >
                  <span className="text-sm font-medium">
                    {tSite(member.name)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {tSite(member.role)}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="overflow-hidden rounded-md border border-border bg-card">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3">
                <p className="text-xs font-medium">
                  {tSite("Project activity")}
                </p>
                <Badge variant="outline" className="rounded-md text-[10px]">
                  {tSite(projects.length)} {tSite(" projects")}
                </Badge>
              </div>
              <ul className="divide-y divide-border">
                {projects.map((project) => (
                  <li key={project.id} className="space-y-3 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="break-words text-sm font-medium">
                          {tSite(project.name)}
                        </p>
                        <p className="mt-1 text-[11px] text-muted-foreground">
                          {tSite(project.team)}
                        </p>
                      </div>
                      <span className="text-[11px] text-muted-foreground tabular-nums">
                        {tSite(project.progress)}
                        {tSite("% complete")}
                      </span>
                    </div>
                    <progress
                      aria-label={tSite("{value0} completion", {
                        value0: tSite(project.name),
                      })}
                      value={project.progress}
                      max={100}
                      className="block h-1 w-full overflow-hidden rounded-full border-0 bg-muted accent-primary [&::-moz-progress-bar]:bg-primary [&::-webkit-progress-bar]:bg-muted [&::-webkit-progress-value]:bg-primary"
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p
              className="text-[11px] leading-5 text-muted-foreground"
              role="status"
            >
              {tSite(message)}
            </p>
            <Link
              className="inline-flex min-h-10 items-center gap-1 text-xs text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
              href="/docs/blocks"
            >
              {tSite("Explore Blocks")}
              {tSite(" ")}
              <ArrowUpRight aria-hidden="true" className="size-3" />
            </Link>
          </div>
        </div>
      </ResponsiveSidebar>
    </div>
  );
}
