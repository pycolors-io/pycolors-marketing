'use client';

import * as React from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Input,
} from '@pycolors/ui';

function validateName(value: string) {
  const v = value.trim();
  if (v.length === 0) return 'Project name is required.';
  if (v.length < 2)
    return 'Project name must be at least 2 characters.';
  if (v.length > 48)
    return 'Project name must be at most 48 characters.';
  return null;
}

export function RenameProjectDialog({
  open,
  onOpenChange,
  initialName,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialName: string;
  onConfirm: (nextName: string) => void;
}) {
  const [name, setName] = React.useState(initialName);
  const [touched, setTouched] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setName(initialName);
      setTouched(false);
    }
  }, [open, initialName]);

  const error = touched ? validateName(name) : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename project</DialogTitle>
          <DialogDescription>
            Choose a clear name for this project.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <Input
            label="Project name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setTouched(true)}
            error={error ?? undefined}
            helperText={
              !error
                ? '2–48 characters. Use something memorable.'
                : undefined
            }
            autoFocus
          />
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              const err = validateName(name);
              setTouched(true);
              if (err) return;
              onConfirm(name.trim());
              onOpenChange(false);
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
