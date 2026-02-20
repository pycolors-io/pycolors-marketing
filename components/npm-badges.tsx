'use client';

import Image from 'next/image';
import { cn } from '@pycolors/ui';

type BadgeKind = 'version' | 'downloads' | 'license';

const BADGES: {
  kind: BadgeKind;
  path: (pkg: string) => string;
  alt: (pkg: string) => string;
  width: number;
  height: number;
}[] = [
  {
    kind: 'version',
    path: (pkg) => `/npm/v/${encodeURIComponent(pkg)}`,
    alt: (pkg) => `${pkg} npm version`,
    width: 92,
    height: 20,
  },
  {
    kind: 'downloads',
    path: (pkg) => `/npm/dm/${encodeURIComponent(pkg)}`,
    alt: (pkg) => `${pkg} npm downloads`,
    width: 120,
    height: 20,
  },
  {
    kind: 'license',
    path: (pkg) => `/npm/l/${encodeURIComponent(pkg)}`,
    alt: (pkg) => `${pkg} license`,
    width: 88,
    height: 20,
  },
];

export function NpmBadges({
  packageName,
  size = 'sm',
  className,
}: {
  packageName: string;
  size?: 'sm' | 'md';
  className?: string;
}) {
  const height = size === 'md' ? 22 : 20;

  return (
    <div
      className={cn('flex flex-wrap items-center gap-2', className)}
    >
      {BADGES.map((b) => (
        <Image
          key={b.kind}
          src={`https://img.shields.io${b.path(packageName)}`}
          alt={b.alt(packageName)}
          width={200}
          height={60}
          style={{ width: 'auto', height }}
          unoptimized
          priority={false}
        />
      ))}
    </div>
  );
}
