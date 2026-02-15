import {
  Button,
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Input,
} from '@pycolors/ui';

export function SheetFiltersDemo() {
  return (
    <div className="mt-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Open filters</Button>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription>
              Advanced options live here. Apply explicitly.
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-4">
            <Input
              label="Search"
              placeholder="Acme, billing, logs…"
            />
            <div className="flex gap-2">
              <Button className="flex-1">Apply</Button>
              <Button variant="outline" className="flex-1">
                Reset
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
