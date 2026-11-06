import { useCopy } from "@/lib/i18n/use-copy";
import { SiteHeader } from "@/components/layout/site-header";

import { Footer } from "@/components/footer";

export default function MarketingLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const tSite = useCopy();

  return (
    <>
      <div className="site-frame relative flex min-h-screen flex-col overflow-x-clip">
        <SiteHeader />
        <div className="flex-1 bg-background text-foreground">
          {tSite(children)}
        </div>
        <Footer />
      </div>
    </>
  );
}
