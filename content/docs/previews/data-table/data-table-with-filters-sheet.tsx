import { useCopy } from "@/lib/i18n/use-copy";
import {
  Button,
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Pagination,
} from "@pycolors/ui";
import { Eye } from "lucide-react";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@pycolors/ui";

export function DataTableWithFiltersSheet() {
  const tSite = useCopy();

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">{tSite("Filters")}</Button>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle>{tSite("Filters")}</SheetTitle>
            <SheetDescription>
              {tSite("Narrow results by status, plan, date range, etc.")}
            </SheetDescription>
          </SheetHeader>

          {/* filters UI */}
          <div className="mt-6 space-y-4">{/* ... */}</div>
        </SheetContent>
      </Sheet>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{tSite("Name")}</TableHead>
            <TableHead>{tSite("Status")}</TableHead>
            <TableHead className="text-right">{tSite("Actions")}</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell>{tSite("Acme")}</TableCell>
            <TableCell>{tSite("Active")}</TableCell>
            <TableCell className="text-right">
              <Button size="sm" variant="ghost">
                <Eye className="mr-2 h-4 w-4" aria-hidden="true" />
                {tSite("View")}
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Pagination />
    </>
  );
}
