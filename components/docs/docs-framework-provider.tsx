"use client";

import type { ComponentProps, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { FrameworkProvider, type Framework } from "fumadocs-core/framework";
import { useCopy } from "@/lib/i18n/use-copy";

function useDocsPathname() {
  const tSite = useCopy();
  // Next rewrites default-locale URLs to /en on the server only.
  // Fumadocs must match the same public page tree during hydration.
  return tSite.href(usePathname() ?? "/");
}

// Fumadocs allows absent href/src; Next requires them when rendering.
function DocsLink({
  href,
  prefetch,
  ...props
}: ComponentProps<NonNullable<Framework["Link"]>>) {
  return href === undefined ? (
    <a {...props} />
  ) : (
    <Link href={href} prefetch={prefetch} {...props} />
  );
}

function DocsImage({
  src,
  alt,
  width,
  height,
  ...props
}: ComponentProps<NonNullable<Framework["Image"]>>) {
  return src === undefined ? null : (
    <Image
      src={src}
      alt={alt ?? ""}
      width={width === undefined ? undefined : Number(width)}
      height={height === undefined ? undefined : Number(height)}
      {...props}
    />
  );
}

export function DocsFrameworkProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <FrameworkProvider
      usePathname={useDocsPathname}
      useParams={useParams}
      useRouter={useRouter}
      Link={DocsLink}
      Image={DocsImage}
    >
      {children}
    </FrameworkProvider>
  );
}
