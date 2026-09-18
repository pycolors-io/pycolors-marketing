"use client";

import * as React from "react";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
} from "@pycolors/ui";

export function RenameProjectDialog() {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("Website");
  const [draft, setDraft] = React.useState(name);
  const [error, setError] = React.useState("");

  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen) {
      setDraft(name);
      setError("");
    }
    setOpen(nextOpen);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextName = draft.trim();
    if (!nextName) {
      setError("Enter a project name.");
      inputRef.current?.focus();
      return;
    }
    setName(nextName);
    setOpen(false);
  }

  return (
    <div className="space-y-4">
      <p role="status" className="break-words">
        Project: {name}
      </p>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button type="button" variant="outline">
            Rename project
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename project</DialogTitle>
            <DialogDescription>
              This preview updates local state only.
            </DialogDescription>
          </DialogHeader>
          <form noValidate onSubmit={handleSubmit} className="mt-4">
            <Input
              ref={inputRef}
              label="Project name"
              name="projectName"
              required
              maxLength={60}
              value={draft}
              onChange={(event) => {
                setDraft(event.target.value);
                setError("");
              }}
              error={error}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Save name</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
