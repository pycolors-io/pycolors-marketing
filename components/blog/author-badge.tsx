type AuthorBadgeProps = {
  name: string;
};

export function AuthorBadge({ name }: AuthorBadgeProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full border bg-muted text-sm font-semibold">
        {name.slice(0, 2).toUpperCase()}
      </div>

      <div className="space-y-0.5">
        <p className="text-sm font-medium text-foreground">{name}</p>
        <p className="text-xs text-muted-foreground">
          Founder of PyColors
        </p>
      </div>
    </div>
  );
}
