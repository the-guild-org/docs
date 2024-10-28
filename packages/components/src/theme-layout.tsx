import type { ComponentProps, FC, ReactNode } from 'react';
import { Layout, Navbar } from 'nextra-theme-docs';
import { Head } from 'nextra/components';
// import { getPageMap } from 'nextra/page-map';
import { Footer } from './components/footer';
import { MoonIcon } from './components/icons';
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
    <html
      lang="en"
      // Required to be set for `nextra-theme-docs` styles
      dir="ltr"
      // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
      suppressHydrationWarning
      {...htmlProps}
    >
      <Head {...headProps} />
      <body>
        <Layout
          pageMap={[{ data: {} }]}
          navbar={
            <Navbar logo={logo}>
              <ThemeSwitcherButton>
                {/* Provide icon as `children` so it fill be server component */}
                <MoonIcon className="fill-transparent stroke-gray-500 dark:fill-gray-100 dark:stroke-gray-100" />
              </ThemeSwitcherButton>
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
