"use client";

import { useRef, type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { ArrowUpRight, Plus, X } from "lucide-react";
import { Link } from "@/lib/i18n/navigation";
import { useCopy } from "@/lib/i18n/use-copy";
import styles from "./starter-pro-included-dialog.module.css";

/** The route owns the inclusion content; Radix owns modal focus and dismissal. */
export function StarterProIncludedDialog({
  title,
  description,
  technology,
  artwork,
  href,
  guide,
  children,
}: Readonly<{
  title: string;
  description: string;
  technology: string;
  artwork: string;
  href: string;
  guide: string;
  children: ReactNode;
}>) {
  const tSite = useCopy();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          ref={triggerRef}
          type="button"
          className={styles.trigger}
          aria-label={tSite("Included in the source: {value0}", {
            value0: title,
          })}
        >
          <span>{tSite("Included in the source")}</span>
          <span className={styles.plus}>
            <Plus aria-hidden="true" />
          </span>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content
          className={styles.dialog}
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            closeRef.current?.focus({ preventScroll: true });
          }}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            triggerRef.current?.focus({ preventScroll: true });
          }}
        >
          <div className={styles.closeBar}>
            <Dialog.Close asChild>
              <button
                ref={closeRef}
                type="button"
                className={styles.close}
                aria-label={tSite("Close")}
              >
                <X aria-hidden="true" />
              </button>
            </Dialog.Close>
          </div>
          <div className={styles.hero}>
            <div>
              <p className={styles.eyebrow}>{technology}</p>
              <Dialog.Title className={styles.title}>{title}</Dialog.Title>
              <Dialog.Description className={styles.description}>
                {description}
              </Dialog.Description>
            </div>
            <div className={styles.artwork} aria-hidden="true">
              <Image
                src={artwork}
                alt=""
                fill
                sizes="(min-width: 768px) 320px, 65vw"
                className="object-contain"
              />
            </div>
          </div>
          <div className={styles.content}>
            <h3>{tSite("Included in the source")}</h3>
            {children}
          </div>
          <div className={styles.footer}>
            <Link href={href}>
              {guide}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
            <Dialog.Close asChild>
              <button type="button">{tSite("Close")}</button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
