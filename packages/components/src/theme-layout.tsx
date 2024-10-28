import type { ComponentProps, FC, ReactNode } from 'react';
import { Metadata } from 'next';
import { Layout, Navbar } from 'nextra-theme-docs';
import { Head } from 'nextra/components';
import { Footer } from './components/footer';
import { MoonIcon } from './components/icons';
import { ThemeSwitcherButton } from './components/theme-switcher';

type LayoutProps = ComponentProps<typeof Layout>;

export const GuildLayout: FC<{
  children: ReactNode;
  logo: ComponentProps<typeof Navbar>['logo'];
  /**
   * In case you want to pass the html props
   */
  htmlProps?: ComponentProps<'html'>;
  /**
   * Nextra's <Head> component props
   */
  headProps?: ComponentProps<typeof Head>;
  /**
   * Nextra's Docs Theme <Layout> component props
   */
  layoutProps: Omit<LayoutProps, 'navbar' | 'footer' | 'children'> &
    Partial<Pick<LayoutProps, 'navbar' | 'footer'>>;
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
          footer={<Footer />}
          navbar={
            <Navbar logo={logo}>
              <ThemeSwitcherButton>
                {/* Provide icon as `children` so icon will be server component */}
                <MoonIcon className="fill-transparent stroke-gray-500 dark:fill-gray-100 dark:stroke-gray-100" />
              </ThemeSwitcherButton>
            </Navbar>
          }
          {...layoutProps}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
};

export function getDefaultMetadata({
  websiteName,
  description = `${websiteName} Documentation`,
  productName,
  ...additionalMetadata
}: {
  description?: string;
  websiteName: string;
  productName: string;
} & Metadata): Metadata {
  const siteUrl = process.env.SITE_URL
  return {
    description,
    title: {
      // Use `absolute` title if `metadata.title` was not provided in the page
      absolute: websiteName,
      template: `%s | ${websiteName}`,
    },
    twitter: {
      card: 'summary_large_image',
      site: 'https://the-guild.dev',
      creator: '@TheGuildDev',
    },
    openGraph: {
      siteName: websiteName,
      type: 'website',
      images: `https://og-image.the-guild.dev/?product=${productName}`,
      url: siteUrl
    },
    applicationName: websiteName,
    appleWebApp: {
      title: websiteName,
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: siteUrl,
    },
    ...additionalMetadata
  };
}
