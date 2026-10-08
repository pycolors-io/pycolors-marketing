import type { ComponentProps } from "react";
import { Button, cn } from "@pycolors/ui";

type SiteButtonProps = ComponentProps<typeof Button>;

const sizes = {
  default: "min-h-8 px-3 py-1 text-[13px] has-[>svg]:px-2.5",
  sm: "min-h-7 gap-1 px-2.5 py-0.5 text-xs has-[>svg]:px-2",
  lg: "min-h-9 px-3 py-1.5 text-sm has-[>svg]:px-3",
  icon: "min-h-8 w-8 p-0 max-sm:min-w-11 [@media(pointer:coarse)]:min-w-11",
  "icon-sm":
    "min-h-7 w-7 p-0 max-sm:min-w-11 [@media(pointer:coarse)]:min-w-11",
  "icon-lg":
    "min-h-9 w-9 p-0 max-sm:min-w-11 [@media(pointer:coarse)]:min-w-11",
} as const;

/** App-owned sizing; product examples continue to use the public Button. */
export function SiteButton({
  size = "default",
  className,
  ...props
}: SiteButtonProps) {
  return (
    <Button
      {...props}
      size={size}
      className={cn(
        "h-auto min-w-0 max-w-full gap-1.5 whitespace-normal text-center leading-5 shadow-none transition-colors duration-150 motion-reduce:transition-none max-sm:min-h-11 [@media(pointer:coarse)]:min-h-11",
        sizes[size ?? "default"],
        className,
      )}
    />
  );
}
