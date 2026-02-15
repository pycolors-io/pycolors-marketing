import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  EmptyState,
} from '@pycolors/ui';

export function DataTableEmpty() {
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell colSpan={4}>
            <EmptyState
              title="No results"
              description="Try adjusting your filters."
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
