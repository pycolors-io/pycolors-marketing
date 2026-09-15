"use client";

import { Badge } from "@pycolors/ui";

import { SettingsPanel } from "@/content/blocks/account/settings-panel";
import {
  DataTable,
  type DataTableColumn,
} from "@/content/blocks/data/data-table";

type CatalogRecord = Readonly<{
  id: string;
  name: string;
  status: "Active" | "Paused";
}>;

const records = [
  { id: "workspace-1", name: "Northwind", status: "Active" },
  { id: "workspace-2", name: "Contoso", status: "Paused" },
  { id: "workspace-3", name: "Fabrikam", status: "Active" },
] as const satisfies readonly CatalogRecord[];

const columns = [
  {
    id: "name",
    header: "Workspace",
    cell: (record) => <span className="font-medium">{record.name}</span>,
  },
  {
    id: "status",
    header: "Status",
    cell: (record) => (
      <Badge variant={record.status === "Active" ? "success" : "muted"}>
        {record.status}
      </Badge>
    ),
  },
] satisfies readonly DataTableColumn<CatalogRecord>[];

export function CatalogDataTablePreview() {
  return (
    <DataTable
      caption="Example workspaces"
      columns={columns}
      emptyDescription="Add a workspace to begin."
      emptyTitle="No workspaces"
      getRowId={(record) => record.id}
      rows={records}
    />
  );
}

export function CatalogSettingsPanelPreview() {
  return (
    <SettingsPanel
      className="max-w-none"
      description="Application-owned profile values."
      onSubmit={(event) => event.preventDefault()}
      sections={[
        {
          id: "profile",
          title: "Profile",
          description: "Public workspace identity.",
          fields: [
            {
              id: "workspace-name",
              name: "workspaceName",
              label: "Workspace name",
              value: "Acme Studio",
              onValueChange: () => undefined,
              disabled: true,
            },
            {
              id: "workspace-url",
              name: "workspaceUrl",
              label: "Workspace URL",
              value: "acme.example",
              onValueChange: () => undefined,
              disabled: true,
            },
          ],
        },
      ]}
      submitDisabled
      submitLabel="Save changes"
      title="Workspace settings"
    />
  );
}
