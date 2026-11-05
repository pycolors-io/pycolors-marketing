import { useCopy } from "@/lib/i18n/use-copy";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  EmptyState,
} from "@pycolors/ui";

export function DataTableEmpty() {
  const tSite = useCopy();

  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell colSpan={4}>
            <EmptyState
              title={tSite("No results")}
              description={tSite("Try adjusting your filters.")}
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
