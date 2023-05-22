import { useRouter } from 'next/router';
import { DocsThemeConfig, Navbar, useConfig } from 'nextra-theme-docs';
import { FooterExtended, Header, mdxComponents } from './components';
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
      toggleButton: true,
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
    useNextSeoProps() {
      const { frontMatter, title } = useConfig();
      const { asPath } = useRouter();
      const nextSeoProps = config.useNextSeoProps?.();
      const type = frontMatter.type?.toLowerCase() ?? 'website';

      return {
        titleTemplate: `%s – ${siteName}`,
        description: frontMatter.description || `${siteName} Documentation`,
        twitter: {
          cardType: 'summary_large_image',
          site: 'https://the-guild.dev',
          handle: '@TheGuildDev',
        },
        canonical:
          frontMatter.canonical ||
          (siteUrl &&
            `${siteUrl}${
              // we disallow trailing slashes
              // TODO: dont do this if `trailingSlashes: true`
              asPath === '/'
                ? // homepage
                  ''
                : asPath.startsWith('/?')
                ? // homepage with search params (remove just slash)
                  asPath.slice(1)
                : // other pages
                  asPath
            }`),
        openGraph: {
          type,
          siteName,
          images: [
            {
              url:
                frontMatter.image ||
                `https://og-image.the-guild.dev/?product=${originalSiteName}&title=${encodeURI(
                  title,
                )}`,
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
