import * as React from 'react';

type DocsPageShellProps = {
  children: React.ReactNode;
};

export function DocsPageShell({ children }: DocsPageShellProps) {
  return (
    <section className="space-y-8 max-w-3xl mb-10">
      {children}
    </section>
  );
}
