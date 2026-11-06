import { useCopy } from "@/lib/i18n/use-copy";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Alert,
  AlertTitle,
  AlertDescription,
} from "@pycolors/ui";

export function DataTableError() {
  const tSite = useCopy();

  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell colSpan={4}>
            <Alert variant="destructive">
              <AlertTitle>{tSite("Failed to load data")}</AlertTitle>
              <AlertDescription>
                {tSite("Please try again later.")}
              </AlertDescription>
            </Alert>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
