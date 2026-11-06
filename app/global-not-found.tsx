import { RootDocument } from "@/components/layout/root-document";
import NotFoundPage from "@/components/marketing/not-found-page";
export { baseMetadata as metadata } from "@/components/layout/root-document";

export default function GlobalNotFound() {
  return (
    <RootDocument>
      <NotFoundPage />
    </RootDocument>
  );
}
