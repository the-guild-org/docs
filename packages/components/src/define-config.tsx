import { useRouter } from 'next/router';
import { DocsThemeConfig, Navbar, useConfig } from 'nextra-theme-docs';
import { Anchor, FooterExtended, Header, mdxComponents } from './components';
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
    ? `${['ANGULAR', 'KITQL', 'FETS'].includes(originalSiteName) ? '' : 'GraphQL '}${product.name}`
    : originalSiteName;
  const siteUrl = process.env.SITE_URL;

  return {
    banner: {
      content: (
        <span className="text-xs">
          Catch the highlights of GraphQLConf 2023!{' '}
          <Anchor href="https://graphql.org/conf/schedule" className="underline">
            Click for recordings
          </Anchor>
          . Or check out our{' '}
          <Anchor href="https://the-guild.dev/blog/graphqlconf-2023-recap" className="underline">
            recap blog post
          </Anchor>
          .
        </span>
      ),
      key: 'graphql-conf-2023',
    },
    editLink: {
      content: 'Edit this page on GitHub',
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
          <Header accentColor="#1cc8ee" />
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
    head: function useHead() {
      const { frontMatter, title: pageTitle } = useConfig();
      const { asPath } = useRouter();

      const {
        description = `${siteName} Documentation`,
        type = 'website',
        canonical = siteUrl &&
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
          }`,
        image = `https://og-image.the-guild.dev/?product=${originalSiteName}&title=${encodeURI(
          pageTitle,
        )}`,
      } = frontMatter;

      const title = `${pageTitle} – ${siteName}`;

      return (
        <>
          <title>{title}</title>
          <meta property="og:title" content={title} />
          {description && (
            <>
              <meta name="description" content={description} />
              <meta property="og:description" content={description} />
            </>
          )}
          {canonical && (
            <>
              <link rel="canonical" href={canonical} />
              <meta property="og:url" content={canonical} />
            </>
          )}

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="https://the-guild.dev" />
          <meta name="twitter:creator" content="@TheGuildDev" />

          <meta property="og:type" content={type} />
          <meta property="og:site_name" content={siteName} />
          <meta property="og:image" content={image} />
          <meta property="og:image:alt" content={pageTitle} />

          <meta content={siteName} name="apple-mobile-web-app-title" />
          <meta content={siteName} name="application-name" />
          <meta name="robots" content="index,follow" />
        </>
      );
    },
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
  };
}
