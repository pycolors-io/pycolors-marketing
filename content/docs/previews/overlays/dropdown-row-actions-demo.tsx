import { useCopy } from "@/lib/i18n/use-copy";
import {
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@pycolors/ui";
import { MoreHorizontal } from "lucide-react";

export function DropdownRowActionsDemo() {
  const tSite = useCopy();

  return (
    <div className="mt-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            aria-label={tSite("Open row actions")}
            title={tSite("Actions")}
          >
            <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start">
          <DropdownMenuItem>{tSite("Edit")}</DropdownMenuItem>
          <DropdownMenuItem>{tSite("Archive")}</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive">
            {tSite("Delete")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <p className="mt-2 text-xs text-muted-foreground">
        {tSite("Tip: destructive actions should open a confirmation Dialog.")}
      </p>
    </div>
  );
}
