"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@pycolors/ui";
import { Container } from "@/components/container";
import { Logo } from "@/components/logo";
import { SiteButton } from "@/components/site-button";
import { MobileMenuAppearance } from "@/components/appearance-controls";
import { LanguageSwitcher } from "./language-switcher";
const links = [
  ["Starter Pro", "/fr/starters/pro"],
  ["Tarifs", "/fr/tarifs"],
  ["Documentation · EN", "/docs/starter-pro"],
  ["Démo · EN", "/demo"],
] as const;
export function FrenchHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const navigation = (
    <>
      {links.map(([label, href]) => (
        <Link
          key={href}
          href={href}
          hrefLang={href.startsWith("/fr") ? "fr" : "en"}
          onClick={() => setOpen(false)}
          aria-current={pathname === href ? "page" : undefined}
          className="inline-flex min-h-11 items-center rounded-sm px-3 text-[13px] text-muted-foreground hover:text-foreground aria-[current=page]:text-foreground focus-visible:outline-2 focus-visible:outline-ring lg:min-h-8"
        >
          {label}
        </Link>
      ))}
    </>
  );
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <header className="sticky top-0 z-40 border-b border-border-subtle bg-background/95 backdrop-blur-sm">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-14 focus:rounded-sm focus:bg-background focus:p-3"
        >
          Aller au contenu
        </a>
        <Container>
          <div className="flex h-(--site-header-height) items-center gap-4">
            <Logo href="/fr" />
            <nav
              aria-label="Navigation principale"
              className="ml-auto hidden items-center lg:flex"
            >
              {navigation}
            </nav>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <LanguageSwitcher locale="fr" />
              <SiteButton asChild className="hidden lg:inline-flex">
                <Link href="/fr/demande-de-devis">Parlons de votre projet</Link>
              </SiteButton>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label="Ouvrir le menu de navigation"
                  className="inline-flex size-11 items-center justify-center rounded-sm border border-border-subtle lg:hidden"
                >
                  <Menu className="size-4" aria-hidden="true" />
                </button>
              </SheetTrigger>
            </div>
          </div>
        </Container>
      </header>
      <SheetContent
        aria-describedby={undefined}
        className="flex flex-col bg-background p-6 [&>button:last-child]:hidden"
      >
        <SheetClose asChild>
          <button
            type="button"
            aria-label="Fermer le menu"
            className="absolute right-3 top-3 inline-flex size-11 items-center justify-center rounded-sm focus-visible:outline-2 focus-visible:outline-ring"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </SheetClose>
        <SheetTitle>Explorer PyColors</SheetTitle>
        <nav
          aria-label="Navigation mobile"
          className="flex flex-col items-start gap-2 py-4"
        >
          {navigation}
        </nav>
        <SiteButton asChild>
          <Link href="/fr/demande-de-devis" onClick={() => setOpen(false)}>
            Demander un devis
          </Link>
        </SiteButton>
        <div className="mt-auto">
          <MobileMenuAppearance locale="fr" />
        </div>
      </SheetContent>
    </Sheet>
  );
}
