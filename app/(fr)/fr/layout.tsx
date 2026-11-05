import { RootDocument, baseMetadata } from "@/components/layout/root-document";
import { FrenchHeader } from "@/components/layout/french-header";
import { FrenchFooter } from "@/components/layout/french-footer";
export const metadata = baseMetadata;
export default function FrenchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RootDocument locale="fr">
      <div className="site-frame relative flex min-h-screen flex-col overflow-x-clip">
        <FrenchHeader />
        <div className="flex-1 bg-background text-foreground">{children}</div>
        <FrenchFooter />
      </div>
    </RootDocument>
  );
}
