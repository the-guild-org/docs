/* eslint-disable react-hooks/rules-of-hooks -- false positive */
import { DocsThemeConfig, Navbar, useConfig } from 'nextra-theme-docs';
import { useRouter } from 'next/router';
import { FooterExtended, mdxComponents, Header } from './components';
import { PRODUCTS, ProductType } from './products';

export function defineConfig({
  siteName: originalSiteName,
  ...config
}: DocsThemeConfig & { siteName: string }): DocsThemeConfig {
  if (!originalSiteName) {
    throw new Error('Missing required "siteName" property');
  }
  if (!config.docsRepositoryBase) {
    throw new Error('Missing required "docsRepositoryBase" property');
  }

  const url = new URL(config.docsRepositoryBase as string);
  const [, org, repoName] = url.pathname.split('/');

  const product = PRODUCTS[originalSiteName as ProductType];
  const siteName = product
    ? `${['ANGULAR', 'KITQL'].includes(originalSiteName) ? '' : 'GraphQL '}${product.name}`
    : originalSiteName;
  const siteUrl = process.env.SITE_URL;

  return {
    editLink: {
      text: 'Edit this page on GitHub',
    },
    feedback: {
      content: 'Question? Give us feedback →',
      labels: 'kind/docs',
    },
    footer: {
      component: <FooterExtended />,
    },
    navbar: {
      component: props => (
        <>
          <Header accentColor="#1cc8ee" searchBarProps={{ version: 'v2' }} />
          <Navbar {...props} />
        </>
      ),
    },
    search: {
      component: null,
    },
    sidebar: {
      defaultMenuCollapseLevel: 1,
    },
    project: {
      link: `${url.origin}/${org}/${repoName}`, // GitHub link in the navbar
    },
    head: null,
    logo: product?.logo && (
      <>
        <product.logo className="mr-1.5 h-9 w-9" />
        <div>
          <h1 className="text-sm font-medium">{siteName}</h1>
          <h2 className="hidden text-xs sm:block">{product.title}</h2>
        </div>
      </>
    ),
    ...config,
    components: {
      ...mdxComponents,
      ...config.components,
    },
    getNextSeoProps() {
      const { frontMatter, title } = useConfig();
      const { asPath } = useRouter();
      const nextSeoProps = config.getNextSeoProps?.();
      return {
        titleTemplate: `%s – ${siteName}`,
        description: frontMatter.description || `${siteName} Documentation`,
        twitter: {
          cardType: 'summary_large_image',
          site: 'https://the-guild.dev',
          handle: '@TheGuildDev',
        },
        canonical: frontMatter.canonical || (siteUrl && `${siteUrl}${asPath}`),
        openGraph: {
          siteName,
          images: [
            {
              url:
                frontMatter.image ||
                `https://open-graph-image.theguild.workers.dev/?product=${originalSiteName}&title=${encodeURI(title)}`,
              alt: frontMatter.description || title,
            },
          ],
        },
        ...nextSeoProps,
        additionalMetaTags: [
          { content: siteName, name: 'apple-mobile-web-app-title' },
          { content: siteName, name: 'application-name' },
          ...(nextSeoProps?.additionalMetaTags || []),
        ],
      };
    },
  };
}
