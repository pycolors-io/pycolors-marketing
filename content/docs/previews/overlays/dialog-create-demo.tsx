import {
  Button,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Input,
} from '@pycolors/ui';

export function DialogCreateDemo() {
  return (
    <div className="mt-6">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Create project</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create project</DialogTitle>
            <DialogDescription>
              Short, focused flow. Keep it predictable.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            <Input label="Name" placeholder="Acme" />
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Create</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
