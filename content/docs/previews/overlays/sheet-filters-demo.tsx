import { useCopy } from "@/lib/i18n/use-copy";
import {
  Button,
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Input,
} from "@pycolors/ui";

export function SheetFiltersDemo() {
  const tSite = useCopy();

  return (
    <div className="mt-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">{tSite("Open filters")}</Button>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle>{tSite("Filters")}</SheetTitle>
            <SheetDescription>
              {tSite("Advanced options live here. Apply explicitly.")}
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-4">
            <Input
              label={tSite("Search")}
              placeholder={tSite("Acme, billing, logs…")}
            />
            <div className="flex gap-2">
              <Button className="flex-1">{tSite("Apply")}</Button>
              <Button variant="outline" className="flex-1">
                {tSite("Reset")}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
