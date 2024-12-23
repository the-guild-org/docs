import { ComponentProps, FC, ReactElement, ReactNode } from 'react';
import { Metadata } from 'next';
import { PageMapItem } from 'nextra';
import { Layout, Navbar } from 'nextra-theme-docs';
import { Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import { Anchor } from '../components';
import { HiveFooter } from '../components/hive-footer';
import { HiveNavigation } from '../components/hive-navigation';
import { siteOrigin, siteUrl } from '../constants';
import { PRODUCTS } from '../products';

type LP = ComponentProps<typeof Layout>;

type LayoutProps = Omit<LP, 'navbar' | 'footer' | 'children' | 'docsRepositoryBase' | 'pageMap'> &
  Partial<Pick<LP, 'navbar' | 'footer' | 'pageMap'>> &
  Required<Pick<LP, 'docsRepositoryBase'>>;

type NP = ComponentProps<typeof HiveNavigation>;

type NavbarProps = Omit<NP, 'productName'> & Partial<Pick<NP, 'productName'>>;

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
  navbarProps: NavbarProps;
  pageMap?: PageMapItem[];
  search?: ReactElement;
}> = async ({
  children,
  websiteName,
  description,
  htmlProps,
  headProps,
  logo,
  layoutProps,
  navbarProps,
  search,
  ...props
}) => {
  const [meta, ...pageMap] = props.pageMap || (await getPageMap());

  const pageMapWithCompanyMenu = [
    {
      data: {
        // Add for every website except The Guild Blog
        ...(siteOrigin && { company: companyItem }),
        products: productsItems,
        // @ts-expect-error -- fixme
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
          footer={
            <HiveFooter
              logo={
                <div className="flex items-center gap-3">
                  {logo}
                  <span className="text-2xl/[1.2] font-medium tracking-[-0.16px]">
                    {websiteName}
                  </span>
                </div>
              }
              description={description}
            />
          }
          search={search}
          navbar={
            <HiveNavigation
              className="max-w-[90rem]"
              productName={websiteName}
              navLinks={[]}
              search={search}
              {...navbarProps}
              logo={
                <Anchor
                  href="/"
                  className="hive-focus -m-2 flex shrink-0 items-center gap-3 rounded-md p-2"
                >
                  {logo}
                  <span className="text-2xl font-medium tracking-[-0.16px]">{websiteName}</span>
                </Anchor>
              }
            />
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
    applicationName: websiteName,
    appleWebApp: {
      title: websiteName,
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      // https://github.com/vercel/next.js/discussions/50189#discussioncomment-10826632
      canonical: './',
    },
    metadataBase: new URL(siteUrl!),
    ...additionalMetadata,
    openGraph: {
      siteName: websiteName,
      type: 'website',
      images: `https://og-image.the-guild.dev/?product=${productName}`,
      // https://github.com/vercel/next.js/discussions/50189#discussioncomment-10826632
      url: './',
      locale: 'en_US',
      ...additionalMetadata.openGraph,
    },
  };
}
