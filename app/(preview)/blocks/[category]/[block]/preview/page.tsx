import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlockCatalogPreview } from "@/components/marketing/blocks/block-catalog-preview";
import { BlockStandalonePreview } from "@/components/marketing/blocks/block-standalone-preview";
import { BLOCKS_CATALOG } from "@/lib/blocks/catalog";

type PreviewPageProps = Readonly<{
  params: Promise<{ category: string; block: string }>;
}>;

function findBlock(category: string, block: string) {
  return BLOCKS_CATALOG.find((entry) => entry.id === `${category}/${block}`);
}

export function generateStaticParams() {
  return BLOCKS_CATALOG.map((entry) => {
    const [category, block] = entry.id.split("/");
    return { category, block };
  });
}

export async function generateMetadata({
  params,
}: PreviewPageProps): Promise<Metadata> {
  const { category, block } = await params;
  const entry = findBlock(category, block);

  return {
    title: entry ? `${entry.title} preview — PyColors Blocks` : "Block preview",
    robots: { index: false, follow: false },
  };
}

export default async function BlockPreviewPage({ params }: PreviewPageProps) {
  const { category, block } = await params;
  const entry = findBlock(category, block);

  if (!entry) notFound();

  return (
    <BlockStandalonePreview
      preview={<BlockCatalogPreview blockId={block} />}
      title={entry.title}
    />
  );
}
