"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronUp, ExternalLink, Sparkles, X } from "lucide-react";

import { Badge, Button, cn } from "@pycolors/ui";

import { Container } from "@/components/container";
import { BuyProductButton } from "@/components/pricing/buy-product-button";

type TemplateStickyCtaProps = {
  readonly productSlug: string;
  readonly name: string;
  readonly price: string;
  readonly demoUrl: string;
  readonly className?: string;
};

export function TemplateStickyCta({
  productSlug,
  name,
  price,
  demoUrl,
  className,
}: TemplateStickyCtaProps) {
  const [visible, setVisible] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);
  const toggleButtonRef = React.useRef<HTMLButtonElement>(null);
  const userToggled = React.useRef(false);

  React.useEffect(() => {
    if (userToggled.current) toggleButtonRef.current?.focus();
  }, [collapsed]);

  React.useEffect(() => {
    const timeout = window.setTimeout(() => {
      setVisible(true);
    }, 4000);

    return () => window.clearTimeout(timeout);
  }, []);

  function handleClose() {
    userToggled.current = true;
    setCollapsed(true);
  }

  function handleOpen() {
    userToggled.current = true;
    setCollapsed(false);
  }

  return (
    <div
      role="region"
      aria-label={`${name} purchase bar`}
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-0 z-40 pb-[env(safe-area-inset-bottom)] transition-[transform,opacity] duration-500 ease-out motion-reduce:transition-none",
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
      )}
      aria-hidden={!visible}
      inert={!visible}
    >
      {collapsed ? (
        <div className="flex justify-end px-4 pb-4">
          <Button
            ref={toggleButtonRef}
            type="button"
            size="sm"
            variant="outline"
            onClick={handleOpen}
            className="pointer-events-auto min-h-11 rounded-[5px] border-border-subtle bg-background/95 px-4 shadow-medium backdrop-blur-xl"
            aria-label="Open sticky purchase bar"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            {name}
            <ChevronUp className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      ) : (
        <div className="pointer-events-auto border-t border-border-subtle bg-background/90 backdrop-blur-xl">
          <Container className="py-3">
            <div
              className={cn(
                "relative flex w-full flex-col gap-3 rounded-[5px] border border-border-subtle bg-background px-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:gap-5",
                className,
              )}
            >
              <div className="flex min-w-0 flex-1 items-start gap-3">
                <span className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-[5px] border border-pro-border-subtle bg-pro-surface-muted sm:inline-flex">
                  <Sparkles
                    className="h-4 w-4 text-primary"
                    aria-hidden="true"
                  />
                </span>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="flex w-full flex-wrap items-center gap-2 pr-10 text-sm sm:w-auto sm:pr-0">
                      <span className="font-medium">{name}</span>
                      <span className="text-muted-foreground">· {price}</span>
                    </span>

                    <Badge
                      variant="outline"
                      className="site-success-surface rounded-[5px] border-success-border-subtle bg-success-muted text-[11px]"
                    >
                      Instant access
                    </Badge>

                    <Badge
                      variant="outline"
                      className="rounded-[5px] text-[11px]"
                    >
                      Commercial usage
                    </Badge>
                  </div>

                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    Production-ready landing page template built for AI and SaaS
                    launches.
                  </p>
                </div>
              </div>

              <div className="grid w-full grid-cols-2 items-start gap-2 lg:flex lg:w-auto lg:items-center">
                <BuyProductButton
                  productSlug={productSlug}
                  label="Buy now"
                  size="sm"
                  className="min-h-11 px-4 shadow-none hover:shadow-none"
                />

                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="min-h-11 rounded-[5px] px-4 shadow-none"
                >
                  <Link
                    href={demoUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label="Demo (opens in a new tab)"
                  >
                    Demo
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>

                <Button
                  ref={toggleButtonRef}
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={handleClose}
                  className="absolute right-2 top-2 size-11 shrink-0 rounded-[5px] text-muted-foreground hover:text-foreground lg:static"
                  aria-label="Close sticky purchase bar"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </Container>
        </div>
      )}
    </div>
  );
}
