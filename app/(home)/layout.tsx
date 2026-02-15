import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import { SiteHeader } from '@/components/layout/site-header';
import { getDocsNavLinks } from '@/lib/source';
import { Footer } from '@/components/footer';
export default function Layout({ children }: LayoutProps<'/'>) {
  const docsLinks = getDocsNavLinks();

  return (
    <HomeLayout
      {...baseOptions()}
      nav={{
        enabled: true,
        component: <SiteHeader docsLinks={docsLinks} />,
      }}
    >
      {children}
      <Footer />
    </HomeLayout>
  );
}
