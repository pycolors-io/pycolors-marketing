import { cn } from '@pycolors/ui';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Container({
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full', className)} {...props}>
      {children}
    </div>
  );
}
