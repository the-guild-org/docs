import { DocsThemeConfig, Navbar } from 'nextra-theme-docs';
import { FooterExtended, mdxComponents, Header } from './components';

const REQUIRED_PROPERTIES: (keyof DocsThemeConfig)[] = ['docsRepositoryBase', 'head', 'logo', 'project', 'titleSuffix'];

export function defineConfig(config: DocsThemeConfig): DocsThemeConfig {
  for (const prop of REQUIRED_PROPERTIES) {
    if (!config[prop]) {
      throw new Error(`Missing required "${prop}" property`);
    }
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
      defaultMenuCollapsed: true,
    },
    ...config,
    components: {
      ...mdxComponents,
      ...config.components,
    },
  };
}
