import { RootDocument } from "@/components/layout/root-document";
export { baseMetadata as metadata } from "@/components/layout/root-document";
export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootDocument>{children}</RootDocument>;
}
