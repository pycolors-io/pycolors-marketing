import { SiteHeader } from '@/components/layout/site-header';
import { Footer } from '@/components/footer';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <SiteHeader />
      <main className="flex-1 bg-background text-foreground">
        {children}
      </main>
      <Footer />
    </div>
  );
}
