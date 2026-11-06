import { useCopy } from "@/lib/i18n/use-copy";
import {
  Button,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Input,
} from "@pycolors/ui";

export function DialogCreateDemo() {
  const tSite = useCopy();

  return (
    <div className="mt-6">
      <Dialog>
        <DialogTrigger asChild>
          <Button>{tSite("Create project")}</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>{tSite("Create project")}</DialogTitle>
            <DialogDescription>
              {tSite("Short, focused flow. Keep it predictable.")}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            <Input label={tSite("Name")} placeholder={tSite("Acme")} />
            <div className="flex justify-end gap-2">
              <Button variant="outline">{tSite("Cancel")}</Button>
              <Button>{tSite("Create")}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
