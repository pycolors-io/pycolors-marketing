'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { MoreHorizontal } from 'lucide-react';

import {
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@pycolors/ui';

import { ConfirmDeleteDialog } from '@/components/app/projects/confirm-delete-dialog';
import { RenameProjectDialog } from '@/components/app/projects/rename-project-dialog';

export function ProjectRowActions({
  projectId,
  projectName,
}: {
  projectId: string;
  projectName: string;
}) {
  const router = useRouter();

  const [openDelete, setOpenDelete] = React.useState(false);
  const [openRename, setOpenRename] = React.useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon-sm"
            aria-label="Row actions"
          >
            <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem
            onSelect={() => router.push(`/app/projects/${projectId}`)}
          >
            Open
          </DropdownMenuItem>

          <DropdownMenuItem onSelect={() => setOpenRename(true)}>
            Rename
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onSelect={() => console.log('archive', projectId)}
          >
            Archive
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onSelect={() => setOpenDelete(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <RenameProjectDialog
        open={openRename}
        onOpenChange={setOpenRename}
        initialName={projectName}
        onConfirm={(nextName) => {
          console.log('rename:', projectId, '=>', nextName);
        }}
      />

      <ConfirmDeleteDialog
        open={openDelete}
        onOpenChange={setOpenDelete}
        projectName={projectName}
        onConfirm={() => {
          console.log('delete:', projectId);
        }}
      />
    </>
  );
}
