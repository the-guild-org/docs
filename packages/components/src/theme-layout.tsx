import type { ComponentProps, FC, ReactNode } from 'react';
import { Layout, Navbar } from 'nextra-theme-docs';
import { Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import { Footer } from './components/footer';
import { ThemeSwitcherButton } from './components/theme-switcher';

export const GuildLayout: FC<{
  children: ReactNode;
  logo: ComponentProps<typeof Navbar>['logo'];
  /**
   * In case you want to override the html props
   */
  htmlProps?: ComponentProps<'html'>;
  /**
   * Nextra's <Head> component props
   */
  headProps?: ComponentProps<typeof Head>;
  /**
   * Nextra's Docs Theme <Layout> component props
   */
  layoutProps?: ComponentProps<typeof Layout>;
}> = async ({ children, logo, htmlProps, layoutProps, headProps }) => {
  return (
    <html lang="en" dir="ltr" {...htmlProps}>
      <Head {...headProps} />
      <body>
        <Layout
          pageMap={await getPageMap()}
          navbar={
            <Navbar logo={logo}>
              <ThemeSwitcherButton />
            </Navbar>
          }
          footer={<Footer />}
          {...layoutProps}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
};
