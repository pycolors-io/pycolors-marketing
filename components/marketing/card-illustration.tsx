import type { ReactNode } from "react";
import {
  ArrowRight,
  Bell,
  Box,
  Check,
  ChevronDown,
  ChevronsUpDown,
  Circle,
  Code2,
  FileCode2,
  Folder,
  FolderOpen,
  LayoutDashboard,
  LockKeyhole,
  MoreHorizontal,
  MousePointer2,
  Plus,
  Search,
  Settings2,
  Terminal,
  X,
} from "lucide-react";
import { cn } from "@pycolors/ui";
import styles from "./card-illustration.module.css";

export type MarketingIllustrationKind =
  | "components"
  | "tokens"
  | "composition"
  | "architecture"
  | "workflow"
  | "actions"
  | "forms"
  | "overlays"
  | "data"
  | "feedback"
  | "structure";

function Window({
  label,
  icon = <Box />,
  children,
  className,
}: Readonly<{
  label: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}>) {
  return (
    <div className={cn(styles.window, className)}>
      <div className={styles.windowHeader}>
        <span>
          {icon}
          {label}
        </span>
        <MoreHorizontal />
      </div>
      {children}
    </div>
  );
}

function DataRows() {
  return (
    <div className={styles.table}>
      <div className={styles.tableHeader}>
        <span>Project</span>
        <span>Status</span>
      </div>
      {["Customer portal", "Design system", "Marketing site"].map(
        (name, index) => (
          <div key={name} className={styles.tableRow}>
            <span>
              <span className={styles.projectMark}>{index + 1}</span>
              {name}
            </span>
            <span className={index === 0 ? styles.statusActive : styles.status}>
              <span />
              {index === 0 ? "Active" : "Draft"}
            </span>
          </div>
        ),
      )}
    </div>
  );
}

function Dashboard() {
  return (
    <Window label="Workspace" icon={<LayoutDashboard />}>
      <div className={styles.dashboard}>
        <div className={styles.sidebar}>
          <span className={styles.selected}>
            <LayoutDashboard />
            Overview
          </span>
          <span>
            <Folder />
            Projects
          </span>
          <span>
            <Settings2 />
            Settings
          </span>
          <span className={styles.sidebarAccount}>
            <span />
            Your team
          </span>
        </div>
        <div className={styles.dashboardBody}>
          <div className={styles.inline}>
            <strong>Overview</strong>
            <Plus />
          </div>
          <div className={styles.metrics}>
            <div>
              <span>Projects</span>
              <strong>12</strong>
              <i />
            </div>
            <div>
              <span>Activity</span>
              <strong>86%</strong>
              <i />
            </div>
          </div>
          <div className={styles.chart}>
            {[36, 54, 42, 68, 60, 83, 72, 94].map((height, index) => (
              <i key={index} style={{ height: `${height}%` }} />
            ))}
          </div>
        </div>
      </div>
    </Window>
  );
}

function Scene({ kind }: Readonly<{ kind: MarketingIllustrationKind }>) {
  switch (kind) {
    case "components":
      return (
        <Window label="@pycolors/ui" icon={<Code2 />}>
          <div className={styles.componentGrid}>
            <div className={styles.componentTile}>
              <span className={styles.caption}>Action</span>
              <span className={styles.primaryButton}>
                Continue
                <ArrowRight />
              </span>
            </div>
            <div className={styles.componentTile}>
              <span className={styles.caption}>Selection</span>
              <div className={styles.inline}>
                <span className={styles.checkbox}>
                  <Check />
                </span>
                <span>Selected</span>
                <span className={styles.toggle} />
              </div>
            </div>
            <div className={styles.componentTile}>
              <span className={styles.caption}>Input</span>
              <span className={styles.field}>
                <Search />
                Search…
              </span>
            </div>
            <div className={styles.componentTile}>
              <span className={styles.caption}>Status</span>
              <span className={styles.statusActive}>
                <span />
                Active
              </span>
            </div>
          </div>
        </Window>
      );
    case "tokens":
      return (
        <Window label="Semantic colors" icon={<Circle />}>
          <div className={styles.paletteBody}>
            <div className={styles.palette}>
              {[12, 24, 40, 60, 80, 100].map((strength) => (
                <span
                  key={strength}
                  style={{
                    background: `color-mix(in oklab, var(--primary) ${strength}%, var(--background))`,
                  }}
                />
              ))}
            </div>
            <div className={styles.paletteLabels}>
              <span>Subtle</span>
              <span>Accent</span>
            </div>
            <div className={styles.themeSamples}>
              <div>
                <span>Surface</span>
                <i />
                <span className={styles.sampleAction}>
                  Continue
                  <ArrowRight />
                </span>
              </div>
              <div className={styles.invertedSample}>
                <span>Contrast</span>
                <i />
                <span className={styles.sampleAction}>
                  Continue
                  <ArrowRight />
                </span>
              </div>
            </div>
          </div>
        </Window>
      );
    case "composition":
      return (
        <div className={styles.composition}>
          <div className={styles.compositionLayer}>
            <span className={styles.layerLabel}>
              <Box />
              Primitives
            </span>
            <span className={styles.miniButton}>
              <Plus />
              Button
            </span>
            <span className={styles.miniChip}>Badge</span>
            <span className={styles.miniField} />
          </div>
          <div className={styles.connector}>
            <span />
          </div>
          <div className={styles.compositionLayer}>
            <span className={styles.layerLabel}>
              <LayoutDashboard />
              Blocks
            </span>
            <div className={styles.miniLayout}>
              <i />
              <span />
              <span />
            </div>
            <div className={styles.miniLayout}>
              <i />
              <span />
              <span />
            </div>
          </div>
          <div className={styles.connector}>
            <span />
          </div>
          <div
            className={cn(styles.compositionLayer, styles.compositionResult)}
          >
            <span className={styles.layerLabel}>
              <Folder />
              Application
            </span>
            <span className={styles.composedScreen}>
              <i />
              <span />
              <span />
              <span />
            </span>
            <Check className={styles.accentIcon} />
          </div>
        </div>
      );
    case "architecture":
      return (
        <Window label="Project structure" icon={<FolderOpen />}>
          <div className={styles.fileTree}>
            <span>
              <FolderOpen />
              app<span className={styles.fileHint}>App Router</span>
            </span>
            <div className={styles.fileBranch}>
              <span>
                <FileCode2 />
                layout.tsx<span className={styles.fileHint}>Shell</span>
              </span>
              <span>
                <FileCode2 />
                page.tsx<span className={styles.fileHint}>Entry</span>
              </span>
              <span className={styles.fileSelected}>
                <Folder />
                dashboard<span className={styles.fileHint}>Routes</span>
              </span>
            </div>
            <span>
              <Folder />
              components<span className={styles.fileHint}>Shared UI</span>
            </span>
          </div>
        </Window>
      );
    case "workflow":
      return (
        <Window label="Local development" icon={<Terminal />}>
          <div className={styles.terminalBody}>
            <div>
              <span className={styles.prompt}>$</span>
              <code>pnpm install</code>
              <Check />
            </div>
            <div>
              <span className={styles.prompt}>$</span>
              <code>pnpm dev</code>
              <Check />
            </div>
            <span className={styles.terminalHint}>
              <span />
              localhost:3000
            </span>
            <div>
              <span className={styles.prompt}>$</span>
              <code>pnpm verify</code>
              <span className={styles.caret} />
            </div>
            <div className={styles.checks}>
              {["Lint", "Types", "Build"].map((label) => (
                <span key={label}>
                  <Check />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </Window>
      );
    case "actions":
      return (
        <div className={styles.actionScene}>
          <div className={styles.actionBar}>
            <span className={styles.primaryButton}>
              <Plus />
              Create project
            </span>
            <span className={styles.secondaryButton}>
              Options
              <ChevronDown />
            </span>
          </div>
          <div className={styles.menu}>
            <span className={styles.caption}>Project actions</span>
            <span className={styles.menuSelected}>
              <Folder />
              Open project
              <ArrowRight />
            </span>
            <span>
              <Settings2 />
              Project settings
            </span>
            <span>
              <Bell />
              Notifications<span className={styles.shortcut}>N</span>
            </span>
          </div>
          <MousePointer2 className={styles.cursor} />
        </div>
      );
    case "forms":
      return (
        <Window label="Project settings" icon={<Settings2 />}>
          <div className={styles.formBody}>
            <span className={styles.fieldLabel}>Project name</span>
            <span className={cn(styles.field, styles.focusedField)}>
              Customer portal
              <Check />
            </span>
            <div className={styles.formBottom}>
              <div>
                <span className={styles.fieldLabel}>Visibility</span>
                <span className={styles.field}>
                  <LockKeyhole />
                  Private
                  <ChevronsUpDown />
                </span>
              </div>
              <span className={styles.selection}>
                <span className={styles.checkbox}>
                  <Check />
                </span>
                Notify team
              </span>
            </div>
          </div>
        </Window>
      );
    case "overlays":
      return (
        <div className={styles.overlayScene}>
          <div className={styles.overlayBackdrop}>
            <div />
            <div />
            <div />
            <div />
          </div>
          <Window
            label="Edit project"
            icon={<Folder />}
            className={styles.dialog}
          >
            <X className={styles.closeIcon} />
            <div className={styles.dialogBody}>
              <span className={styles.fieldLabel}>Project name</span>
              <span className={styles.field}>Customer portal</span>
              <div className={styles.dialogActions}>
                <span className={styles.secondaryButton}>Cancel</span>
                <span className={styles.primaryButton}>
                  Save
                  <Check />
                </span>
              </div>
            </div>
          </Window>
        </div>
      );
    case "data":
      return (
        <Window label="Projects" icon={<Folder />}>
          <DataRows />
          <div className={styles.tableFooter}>
            <span>3 projects</span>
            <span>
              01<span className={styles.muted}> / 04</span>
              <ArrowRight />
            </span>
          </div>
        </Window>
      );
    case "feedback":
      return (
        <div className={styles.feedbackStack}>
          <div className={styles.notificationGhost} />
          <div className={styles.notification}>
            <span className={styles.notificationIcon}>
              <Check />
            </span>
            <div>
              <strong>Changes saved</strong>
              <span>Project settings updated.</span>
            </div>
            <X />
          </div>
          <div className={styles.upload}>
            <div className={styles.inline}>
              <span>Uploading files</span>
              <span className={styles.muted}>3 of 4</span>
            </div>
            <div className={styles.progress}>
              <span />
            </div>
            <span className={styles.caption}>
              Your workspace stays available.
            </span>
          </div>
        </div>
      );
    case "structure":
      return <Dashboard />;
  }
}

/** Decorative, server-rendered UI drawings. Every apparent control is inert. */
export function MarketingCardIllustration({
  kind,
}: Readonly<{ kind: MarketingIllustrationKind }>) {
  return (
    <div className={styles.stage} aria-hidden="true">
      <Scene kind={kind} />
    </div>
  );
}
