import { AppLayout } from '@/components/layout/app/app-layout';
import { AppSidebar } from '@/components/layout/app/app-sidebar';

export default function AppGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout sidebar={<AppSidebar />}>{children}</AppLayout>;
}
