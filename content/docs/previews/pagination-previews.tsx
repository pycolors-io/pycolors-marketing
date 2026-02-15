'use client';

import * as React from 'react';

import {
  Badge,
  Button,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  buildPaginationRange,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from '@pycolors/ui';

/* -----------------------------------------------------------------------------
 * Basic pagination (stateful preview)
 * -------------------------------------------------------------------------- */

export function PaginationBasicExample() {
  const [page, setPage] = React.useState(1);
  const totalPages = 12;

  const tokens = buildPaginationRange({ page, totalPages });

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm text-muted-foreground">
        Page{' '}
        <span className="font-medium text-foreground">{page}</span> /{' '}
        <span className="font-medium text-foreground">
          {totalPages}
        </span>
      </p>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            />
          </PaginationItem>

          {tokens.map((t) =>
            t.type === 'ellipsis' ? (
              <PaginationItem key={t.key}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={t.value}>
                <PaginationLink
                  isActive={Boolean(t.isActive)}
                  onClick={() => setPage(t.value)}
                >
                  {t.value}
                </PaginationLink>
              </PaginationItem>
            ),
          )}

          <PaginationItem>
            <PaginationNext
              disabled={page === totalPages}
              onClick={() =>
                setPage((p) => Math.min(totalPages, p + 1))
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

/* -----------------------------------------------------------------------------
 * Table + pagination (mock data preview)
 * -------------------------------------------------------------------------- */

type Project = {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'archived';
  updatedAt: string;
};

const mockProjects: Project[] = Array.from({ length: 23 }).map(
  (_, i) => {
    const n = i + 1;
    const status =
      n % 3 === 0 ? 'paused' : n % 5 === 0 ? 'archived' : 'active';

    return {
      id: `p_${String(n).padStart(3, '0')}`,
      name: `Project ${n}`,
      status,
      updatedAt: '2026-01-21',
    };
  },
);

function statusBadge(status: Project['status']) {
  if (status === 'active')
    return <Badge variant="success">Active</Badge>;
  if (status === 'paused')
    return <Badge variant="warning">Paused</Badge>;
  return <Badge variant="muted">Archived</Badge>;
}

export function ProjectsTableWithPagination() {
  const pageSize = 5;
  const [page, setPage] = React.useState(1);

  const totalPages = Math.max(
    1,
    Math.ceil(mockProjects.length / pageSize),
  );
  const safePage = Math.min(page, totalPages);

  const start = (safePage - 1) * pageSize;
  const end = start + pageSize;

  const rows = mockProjects.slice(start, end);
  const tokens = buildPaginationRange({ page: safePage, totalPages });

  return (
    <div className="space-y-4">
      <Table>
        <TableCaption>
          <i>Mock data — swap with Prisma later.</i>
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead className="w-[140px] text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((p) => (
            <TableRow key={p.id}>
              <TableCell className="font-medium">{p.name}</TableCell>
              <TableCell>{statusBadge(p.status)}</TableCell>
              <TableCell className="text-muted-foreground">
                {p.updatedAt}
              </TableCell>
              <TableCell className="text-right">
                <Button size="sm" variant="outline">
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Showing{' '}
          <span className="font-medium text-foreground">
            {start + 1}
          </span>
          {'–'}
          <span className="font-medium text-foreground">
            {Math.min(end, mockProjects.length)}
          </span>{' '}
          of{' '}
          <span className="font-medium text-foreground">
            {mockProjects.length}
          </span>
        </p>

        <Pagination className="justify-start sm:justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                disabled={safePage === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              />
            </PaginationItem>

            {tokens.map((t) =>
              t.type === 'ellipsis' ? (
                <PaginationItem key={t.key}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={t.value}>
                  <PaginationLink
                    isActive={Boolean(t.isActive)}
                    onClick={() => setPage(t.value)}
                  >
                    {t.value}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}

            <PaginationItem>
              <PaginationNext
                disabled={safePage === totalPages}
                onClick={() =>
                  setPage((p) => Math.min(totalPages, p + 1))
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
