import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { Container } from '@/components/container';

export function DocsFooter() {
  return (
    <footer className="relative mt-10 border-t border-border bg-background">
      <Container className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <div>© 2026 PyColors · Docs</div>

          <nav
            className="flex flex-wrap items-center gap-4"
            aria-label="Documentation footer links"
          >
            <Link
              href="/"
              className="transition-colors hover:text-foreground"
            >
              PyColors
            </Link>

            <Link
              href="/docs/ui"
              className="transition-colors hover:text-foreground"
            >
              UI Docs
            </Link>

            <Link
              href="/docs/saas-starter"
              className="transition-colors hover:text-foreground"
            >
              Starter Docs
            </Link>

            <a
              href="https://github.com/pycolors-io/pycolors-ui"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open PyColors UI repository on GitHub"
              className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
            >
              UI Repo
              <ExternalLink className="h-3.5 w-3.5" />
            </a>

            <a
              href="https://github.com/pycolors-io/pycolors-starter-free"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open PyColors Starter repository on GitHub"
              className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
            >
              Starter Repo
              <ExternalLink className="h-3.5 w-3.5" />
            </a>

            <Link
              href="/license"
              className="transition-colors hover:text-foreground"
            >
              License
            </Link>

            <Link
              href="/terms"
              className="transition-colors hover:text-foreground"
            >
              Terms
            </Link>

            <Link
              href="/privacy"
              className="transition-colors hover:text-foreground"
            >
              Privacy
            </Link>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
