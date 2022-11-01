import { DocsThemeConfig, Navbar, useConfig } from 'nextra-theme-docs';
import { FooterExtended, mdxComponents, Header } from './components';
import { PRODUCTS, ProductType } from './products';

export function defineConfig({ siteName, ...config }: DocsThemeConfig & { siteName: string }): DocsThemeConfig {
  if (!siteName) {
    throw new Error(`Missing required "siteName" property`);
  }
  if (!config.docsRepositoryBase) {
    throw new Error(`Missing required "docsRepositoryBase" property`);
  }

  const url = new URL(config.docsRepositoryBase as string);
  const [, org, repoName] = url.pathname.split('/');

  const product = PRODUCTS[siteName as ProductType];
  if (product) {
    siteName = product.name;
  }
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
    navbar: props => (
      <>
        <Header accentColor="#1cc8ee" themeSwitch searchBarProps={{ version: 'v2' }} />
        <Navbar {...props} />
      </>
    ),
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
          <h1 className="md:text-md text-sm font-medium">{product.name}</h1>
          <h2 className="hidden text-xs sm:block">{product.title}</h2>
        </div>
      </>
    ),
    ...config,
    // remove chat option when https://github.com/shuding/nextra/pull/947 will be merged
    chat: {
      icon: null,
      ...config.chat,
    },
    components: {
      ...mdxComponents,
      ...config.components,
    },
    getNextSeoProps() {
      // eslint-disable-next-line react-hooks/rules-of-hooks -- false positive
      const { frontMatter } = useConfig();
      const nextSeoProps = config.getNextSeoProps?.();
      return {
        siteName,
        titleTemplate: `%s – ${siteName}`,
        description: frontMatter.description || `${siteName} Documentation`,
        images: [
          {
            url: frontMatter.image,
            alt: frontMatter.description || frontMatter.title,
          },
        ],
        twitter: {
          cardType: 'summary_large_image',
          site: 'https://the-guild.dev',
          handle: '@TheGuildDev',
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
