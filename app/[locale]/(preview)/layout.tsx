import { useCopy } from "@/lib/i18n/use-copy";
export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tSite = useCopy();

  return <>{tSite(children)}</>;
}
