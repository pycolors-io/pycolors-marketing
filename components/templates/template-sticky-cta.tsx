'use client';

import * as React from 'react';
import Link from 'next/link';
import { ChevronUp, ExternalLink, Sparkles, X } from 'lucide-react';

import { Badge, Button, cn } from '@pycolors/ui';

import { Container } from '@/components/container';
import { BuyProductButton } from '@/components/pricing/buy-product-button';

type TemplateStickyCtaProps = {
  readonly productSlug: string;
  readonly name: string;
  readonly price: string;
  readonly demoUrl: string;
};

export function TemplateStickyCta({
  productSlug,
  name,
  price,
  demoUrl,
}: TemplateStickyCtaProps) {
  const [visible, setVisible] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);

  React.useEffect(() => {
    const timeout = window.setTimeout(() => {
      setVisible(true);
    }, 4000);

    return () => window.clearTimeout(timeout);
  }, []);

  function handleClose() {
    setCollapsed(true);
  }

  function handleOpen() {
    setCollapsed(false);
  }

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-50 transition-all duration-700 ease-out',
        visible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-full opacity-0',
      )}
      aria-hidden={!visible}
    >
      {collapsed ? (
        <div className="pointer-events-auto flex justify-end px-4 pb-4">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handleOpen}
            className="h-10 rounded-[5px] border-border-subtle bg-background/90 px-4 shadow-medium backdrop-blur-xl"
            aria-label="Open sticky purchase bar"
          >
            <Sparkles className="h-4 w-4" />
            {name}
            <ChevronUp className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="border-t border-border-subtle bg-background/85 shadow-[0_-16px_40px_rgba(0,0,0,0.12)] backdrop-blur-xl">
          <Container className="py-3">
            <div className="mx-auto flex max-w-6xl flex-col gap-3 rounded-[5px] border border-border-subtle bg-surface/80 px-4 py-3 shadow-soft sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 flex-1 items-start gap-3">
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[5px] border border-pro-border bg-pro-surface-muted">
                  <Sparkles className="h-4 w-4 text-muted-foreground" />
                </span>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="truncate text-sm font-medium">
                      {name}
                    </span>

                    <span className="text-sm text-muted-foreground">
                      · {price}
                    </span>

                    <Badge
                      variant="outline"
                      className="rounded-[5px] border-success-border-subtle bg-success-muted text-[11px]"
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

                  <p className="mt-1 text-xs text-muted-foreground">
                    Production-ready landing page template built for
                    AI and SaaS launches.
                  </p>
                </div>
              </div>

              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
                <BuyProductButton
                  productSlug={productSlug}
                  label="Buy now"
                  size="sm"
                  fullWidth={false}
                  className="h-9 px-4"
                />

                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="h-9 rounded-[5px] px-4"
                >
                  <Link
                    href={demoUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Demo
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>

                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={handleClose}
                  className="h-9 w-9 shrink-0 rounded-[5px] text-muted-foreground hover:text-foreground"
                  aria-label="Close sticky purchase bar"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Container>
        </div>
      )}
    </div>
  );
}
