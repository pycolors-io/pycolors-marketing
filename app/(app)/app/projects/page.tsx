import { AppShell } from '@/components/layout/app/app-shell';
import {
  Badge,
  Button,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  TableEmpty,
} from '@pycolors/ui';

import { ProjectRowActions } from '@/components/app/projects/project-row-actions';

type Project = {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'archived';
  updatedAt: string;
};

const mockProjects: Project[] = [
  {
    id: 'p_001',
    name: 'PyColors UI',
    status: 'active',
    updatedAt: '2026-01-18',
  },
  {
    id: 'p_002',
    name: 'Analytics Dashboard',
    status: 'paused',
    updatedAt: '2026-01-12',
  },
  {
    id: 'p_003',
    name: 'Billing Sync',
    status: 'archived',
    updatedAt: '2025-12-30',
  },
];

function statusBadge(status: Project['status']) {
  if (status === 'active')
    return <Badge variant="success">Active</Badge>;
  if (status === 'paused')
    return <Badge variant="warning">Paused</Badge>;
  return <Badge variant="muted">Archived</Badge>;
}

export default function ProjectsPage() {
  const projects = mockProjects; // swap with real data later
  const isLoading = false;

  return (
    <AppShell
      title="Projects"
      description="Your projects and their current status."
      actions={<Button size="sm">New project</Button>}
    >
      <Table>
        <TableCaption>
          Mock data for now — hook up Prisma later.
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead className="w-[120px] text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableEmpty
              colSpan={4}
              title="Loading…"
              description="Fetching projects…"
            />
          ) : projects.length === 0 ? (
            <TableEmpty
              colSpan={4}
              title="No projects yet"
              description="Create your first project to get started."
            />
          ) : (
            projects.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">
                  {p.name}
                </TableCell>
                <TableCell>{statusBadge(p.status)}</TableCell>
                <TableCell className="text-muted-foreground">
                  {p.updatedAt}
                </TableCell>
                <TableCell className="text-right">
                  <ProjectRowActions
                    projectId={p.id}
                    projectName={p.name}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </AppShell>
  );
}
