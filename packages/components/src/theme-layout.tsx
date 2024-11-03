import { ComponentProps, FC, ReactNode } from 'react';
import { Metadata } from 'next';
import { Layout, Navbar } from 'nextra-theme-docs';
import { Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import { Footer } from './components/footer';
import { getNavbarLogo } from './components/guild-navbar-logo';
import { MoonIcon } from './components/icons';
import { ThemeSwitcherButton } from './components/theme-switcher';
import { siteOrigin, siteUrl } from './constants';
import { PRODUCTS } from './products';

type LP = ComponentProps<typeof Layout>;

type LayoutProps = Omit<LP, 'navbar' | 'footer' | 'children' | 'docsRepositoryBase' | 'pageMap'> &
  Partial<Pick<LP, 'navbar' | 'footer' | 'pageMap'>> &
  Required<Pick<LP, 'docsRepositoryBase'>>;

const companyItem = {
  type: 'menu',
  title: 'Company',
  items: {
    about: { title: 'About', href: `${siteOrigin}/about-us` },
    blog: { title: 'Blog', href: `${siteOrigin}/blog` },
    contact: { title: 'Contact', href: `${siteOrigin}/#get-in-touch` },
  },
};

const productsItems = {
  type: 'menu',
  title: 'Products',
  items: Object.fromEntries(
    Object.values(PRODUCTS).map(product => [
      product.name,
      {
        title: (
          <span className="inline-flex items-center gap-2" title={product.title}>
            <product.logo className="size-7 shrink-0" />
            {product.name}
          </span>
        ),
        href: product.href,
      },
    ]),
  ),
};

export const GuildLayout: FC<{
  children: ReactNode;
  websiteName: string;
  description: string;
  /**
   * In case you want to pass the html props, like overriding default `class`
   */
  htmlProps?: ComponentProps<'html'>;
  /**
   * Nextra's `<Head>` component props
   */
  headProps?: ComponentProps<typeof Head>;
  /**
   * Navbar logo, `null` is used in The Guild Blog
   */
  logo: ComponentProps<typeof Navbar>['logo'] | null;
  /**
   * Nextra's Docs Theme `<Layout>` component props
   */
  layoutProps: LayoutProps;
  /**
   * Nextra's Docs Theme `<Navbar>` component props
   */
  navbarProps?: LayoutProps;
}> = async ({
  children,
  websiteName,
  description,
  htmlProps,
  headProps,
  logo,
  layoutProps,
  navbarProps,
}) => {
  const url = new URL(layoutProps.docsRepositoryBase);
  const [, org, repoName] = url.pathname.split('/');

  const [meta, ...pageMap] = await getPageMap();

  const pageMapWithCompanyMenu = [
    {
      data: {
        // Add for every website except The Guild Blog
        ...(siteOrigin && { company: companyItem }),
        products: productsItems,
        ...meta.data,
      },
    },
    // Add for every website except The Guild Blog
    ...(siteOrigin ? [{ name: 'company', route: '#', ...companyItem }] : []),
    { name: 'products', route: '#', ...productsItems },
    ...pageMap,
  ];

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
            <Navbar
              logo={getNavbarLogo({ logo, websiteName, description })}
              logoLink={false}
              // GitHub link in the navbar
              projectLink={`${url.origin}/${org}/${repoName}`}
              {...navbarProps}
            >
              <ThemeSwitcherButton>
                {/* Provide icon as `children` so icon will be server component */}
                <MoonIcon className="fill-transparent stroke-gray-500 dark:fill-gray-100 dark:stroke-gray-100" />
              </ThemeSwitcherButton>
            </Navbar>
          }
          editLink="Edit this page on GitHub"
          {...layoutProps}
          pageMap={pageMapWithCompanyMenu}
          feedback={{
            labels: 'kind/docs',
            ...layoutProps.feedback,
          }}
          sidebar={{
            defaultMenuCollapseLevel: 1,
            ...layoutProps.sidebar,
          }}
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
      url: siteUrl,
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
    ...additionalMetadata,
  };
}
