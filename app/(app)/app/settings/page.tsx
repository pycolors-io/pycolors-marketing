import { AppShell } from '@/components/layout/app/app-shell';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@pycolors/ui';

export default function SettingsPage() {
  return (
    <AppShell
      title="Settings"
      description="Manage your workspace preferences."
      actions={<Button size="sm">Save</Button>}
    >
      <Tabs defaultValue="profile">
        <TabsList aria-label="Settings sections">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="workspace">Workspace</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                Personal information for your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input label="Full name" placeholder="John Doe" />
              <Input
                label="Email"
                type="email"
                placeholder="you@company.com"
              />
            </CardContent>
            <CardFooter className="justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="workspace">
          <Card>
            <CardHeader>
              <CardTitle>Workspace</CardTitle>
              <CardDescription>
                Settings shared across your organization.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input label="Workspace name" placeholder="Acme Inc." />
              <Input
                label="Support email"
                type="email"
                placeholder="support@acme.com"
              />
            </CardContent>
            <CardFooter className="justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing</CardTitle>
              <CardDescription>
                Plan, invoices, and payment method.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Billing content placeholder.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
