import { DocsThemeConfig, Navbar } from 'nextra-theme-docs';
import { FooterExtended, mdxComponents, Header } from './components';

const REQUIRED_PROPERTIES: (keyof DocsThemeConfig)[] = ['docsRepositoryBase', 'getNextSeoProps'];

export function defineConfig(config: DocsThemeConfig): DocsThemeConfig {
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
      defaultMenuCollapsed: true,
    },
    project: {
      link: `${url.origin}/${org}/${repoName}`, // GitHub link in the navbar
    },
    head: null,
    ...config,
    components: {
      ...mdxComponents,
      ...config.components,
    },
  };
}
