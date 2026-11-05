import { useCopy } from "@/lib/i18n/use-copy";
import { cn } from "@pycolors/ui";

/** Shares the global Docs frame with marketing, blog and site chrome. */
export const containerClassName =
  "mx-auto w-full max-w-(--site-frame-width) px-4 sm:px-6 lg:px-8";

type ContainerProps = Readonly<
  React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
  }
>;

export function Container({ className, children, ...props }: ContainerProps) {
  const tSite = useCopy();

  return (
    <div className={cn(containerClassName, className)} {...props}>
      {tSite(children)}
    </div>
  );
}
