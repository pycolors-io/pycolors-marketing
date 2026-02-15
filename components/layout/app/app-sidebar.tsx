import { AppNav } from '@/components/layout/app/app-nav';

export function AppSidebar() {
  return (
    <div className="space-y-6">
      <div>
        <div className="text-sm font-semibold">PyColors SaaS</div>
        <div className="text-xs text-muted-foreground">
          App skeleton
        </div>
      </div>

      <AppNav />
    </div>
  );
}
