import { useCopy } from "@/lib/i18n/use-copy";
import Image from "next/image";
import { productStudio } from "@/lib/showcase/product-studio";

export function ProductStudioCapture({
  view = "dashboard",
  sizes = "(min-width: 1536px) 1440px, 95vw",
  priority = false,
}: Readonly<{
  view?: keyof typeof productStudio.images;
  sizes?: string;
  priority?: boolean;
}>) {
  const tSite = useCopy();

  const media = productStudio.images[view];
  return (
    <div
      role="img"
      aria-label={tSite(media.alt)}
      className="overflow-hidden rounded-sm border border-border-subtle bg-surface"
    >
      <Image
        src={media.light}
        alt=""
        aria-hidden="true"
        width={2880}
        height={2200}
        quality={100}
        sizes={sizes}
        priority={priority}
        className="h-auto w-full dark:hidden"
      />
      <Image
        src={media.dark}
        alt=""
        aria-hidden="true"
        width={2880}
        height={2200}
        quality={100}
        sizes={sizes}
        className="hidden h-auto w-full dark:block"
      />
    </div>
  );
}
