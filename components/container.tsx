import { cn } from "@pycolors/ui";

/** Shared outer frame for marketing pages and both site headers/footers. */
export const containerClassName =
  "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";

type ContainerProps = Readonly<
  React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
  }
>;

export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div className={cn(containerClassName, className)} {...props}>
      {children}
    </div>
  );
}
