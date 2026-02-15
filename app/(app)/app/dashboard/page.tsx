import { AppShell } from '@/components/layout/app/app-shell';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@pycolors/ui';

export default function DashboardPage() {
  return (
    <AppShell
      title="Dashboard"
      description="Overview of your workspace activity."
      actions={
        <>
          <Button variant="outline" size="sm">
            Export
          </Button>
          <Button size="sm">New report</Button>
        </>
      }
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">€12,480</div>
            <p className="mt-1 text-sm text-muted-foreground">
              +8.2% vs previous
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active users</CardTitle>
            <CardDescription>Currently online</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">128</div>
            <p className="mt-1 text-sm text-muted-foreground">
              Peak today: 312
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Errors</CardTitle>
            <CardDescription>Last 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">3</div>
            <p className="mt-1 text-sm text-muted-foreground">
              All resolved
            </p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
