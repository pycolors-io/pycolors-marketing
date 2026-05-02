import { SiteHeader } from '@/components/layout/site-header';
import { Footer } from '@/components/footer';

export default function MarketingLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <SiteHeader />
      <div className="flex-1 bg-background text-foreground">
        {children}
      </div>
      <Footer />
    </div>
  );
}
