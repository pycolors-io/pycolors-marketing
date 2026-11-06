import { useCopy } from "@/lib/i18n/use-copy";
import {
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@pycolors/ui";
import { MoreHorizontal, Pencil, Archive, Trash2 } from "lucide-react";

export function DataTableRowActionsMenu() {
  const tSite = useCopy();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={tSite("Open row actions")}
        >
          <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={8}>
        <DropdownMenuItem>
          <Pencil className="mr-2 h-4 w-4" aria-hidden="true" />
          {tSite("Edit")}
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Archive className="mr-2 h-4 w-4" aria-hidden="true" />
          {tSite("Archive")}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="text-destructive focus:text-destructive">
          <Trash2 className="mr-2 h-4 w-4" aria-hidden="true" />
          {tSite("Delete")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
