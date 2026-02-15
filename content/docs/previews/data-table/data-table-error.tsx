import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Alert,
  AlertTitle,
  AlertDescription,
} from '@pycolors/ui';

export function DataTableError() {
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell colSpan={4}>
            <Alert variant="destructive">
              <AlertTitle>Failed to load data</AlertTitle>
              <AlertDescription>
                Please try again later.
              </AlertDescription>
            </Alert>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
