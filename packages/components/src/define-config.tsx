import { DocsThemeConfig, Navbar, useConfig } from 'nextra-theme-docs';
import { FooterExtended, mdxComponents, Header } from './components';

const REQUIRED_PROPERTIES: (keyof DocsThemeConfig | 'siteName')[] = ['docsRepositoryBase', 'siteName'];

export function defineConfig(config: DocsThemeConfig & { siteName?: string }): DocsThemeConfig {
  for (const prop of REQUIRED_PROPERTIES) {
    if (!config[prop]) {
      throw new Error(`Missing required "${prop}" property`);
    }
  }
  const url = new URL(config.docsRepositoryBase as string);
  const [, org, repoName] = url.pathname.split('/');

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
      const { siteName } = config;
      const nextSeoProps = config.getNextSeoProps?.();
      if (!siteName) {
        return nextSeoProps || {};
      }
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
