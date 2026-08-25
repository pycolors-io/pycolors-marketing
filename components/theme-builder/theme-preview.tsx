import * as React from "react";
import type { ThemeMode, ThemeModeResult } from "@pycolors/color-engine";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
  onModeChange: (mode: ThemeMode) => void;
}>;

/** A representative SaaS settings surface with variables scoped to this root. */
export function ThemePreview({ mode, theme, onModeChange }: ThemePreviewProps) {
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
      className="min-w-0 overflow-hidden rounded-[5px] border border-border bg-background text-foreground shadow-soft"
    >
      <div className="flex flex-col gap-3 border-b border-border bg-surface-elevated/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1" aria-hidden="true">
            <span className="size-2 rounded-full bg-destructive/70" />
            <span className="size-2 rounded-full bg-warning/80" />
            <span className="size-2 rounded-full bg-success/80" />
          </div>
          <p className="text-xs font-medium text-muted-foreground">
            Northstar · product preview
          </p>
        </div>
        <ThemeModeControl value={mode} onChange={onModeChange} />
      </div>

      <div className="space-y-5 p-4 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              02 · Preview the product
            </p>
            <h2
              id="theme-builder-preview-heading"
              className="text-xl font-semibold tracking-tight"
            >
              Scoped SaaS preview
            </h2>
            <p
              id="theme-builder-preview-description"
              className="max-w-2xl text-sm leading-6 text-muted-foreground"
            >
              A representative settings workspace using generated {mode} mode
              values. It is contrast-aware evidence, not an accessibility
              certification.
            </p>
          </div>
          <Badge
            variant="success"
            size="sm"
            className="w-fit whitespace-nowrap"
          >
            Workspace active
          </Badge>
        </div>

        <div className="overflow-hidden rounded-[5px] border border-border bg-card shadow-soft">
          <Card className="rounded-none border-0 bg-card shadow-none">
            <CardHeader className="gap-3 border-b border-border p-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-1">
                <CardTitle>Northstar workspace</CardTitle>
                <CardDescription>
                  Manage the project defaults used by your delivery team.
                </CardDescription>
              </div>
              <Badge variant="secondary" size="sm" className="w-fit">
                Pro plan
              </Badge>
            </CardHeader>

            <CardContent className="p-4">
              <Tabs defaultValue="settings" className="min-w-0">
                <TabsList
                  size="sm"
                  className="h-auto max-w-full justify-start gap-1 overflow-x-auto"
                >
                  <TabsTrigger value="settings" size="sm">
                    Settings
                  </TabsTrigger>
                  <TabsTrigger value="usage" size="sm">
                    Usage
                  </TabsTrigger>
                  <TabsTrigger value="team" size="sm">
                    Team
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="settings" className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input label="Workspace name" value="Northstar" readOnly />
                    <Input
                      label="Primary owner"
                      value="Avery Kim"
                      disabled
                      readOnly
                    />
                  </div>

                  <div className="grid gap-3 lg:grid-cols-3">
                    <Alert variant="success">
                      <AlertTitle>Changes saved</AlertTitle>
                      <AlertDescription>
                        Project defaults are ready to use.
                      </AlertDescription>
                    </Alert>
                    <Alert variant="warning">
                      <AlertTitle>Review seats</AlertTitle>
                      <AlertDescription>
                        Two invited teammates have not joined.
                      </AlertDescription>
                    </Alert>
                    <Alert variant="destructive">
                      <AlertTitle>Attention needed</AlertTitle>
                      <AlertDescription>
                        A sandbox integration needs reconnection.
                      </AlertDescription>
                    </Alert>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button type="button">Save workspace</Button>
                    <Button type="button" variant="outline">
                      Preview changes
                    </Button>
                    <Button type="button" variant="destructive">
                      Disconnect
                    </Button>
                    <Button type="button" variant="secondary" disabled>
                      Invite sent
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="usage" className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    This month&apos;s delivery workspace activity.
                  </p>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Metric</TableHead>
                        <TableHead>Current</TableHead>
                        <TableHead>Plan limit</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Projects</TableCell>
                        <TableCell>8</TableCell>
                        <TableCell>20</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Seats</TableCell>
                        <TableCell>14</TableCell>
                        <TableCell>25</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TabsContent>

                <TabsContent value="team" className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Collaborators with access to this workspace.
                  </p>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Member</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Avery Kim</TableCell>
                        <TableCell>Owner</TableCell>
                        <TableCell>
                          <Badge variant="success" size="sm">
                            Active
                          </Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Sam Patel</TableCell>
                        <TableCell>Editor</TableCell>
                        <TableCell>
                          <Badge variant="warning" size="sm">
                            Pending
                          </Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
