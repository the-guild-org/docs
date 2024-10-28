import { addGuildCompanyMenu } from './components/company-menu';

export function defineConfig({ websiteName, description, logo, ...config }: any) {
  if (!config.docsRepositoryBase) {
    throw new Error('Missing required "docsRepositoryBase" property');
  }

  const url = new URL(config.docsRepositoryBase);
  const [, org, repoName] = url.pathname.split('/');

  return {
    editLink: {
      content: 'Edit this page on GitHub',
    },
    feedback: {
      content: 'Question? Give us feedback →',
      labels: 'kind/docs',
    },
    project: {
      link: `${url.origin}/${org}/${repoName}`, // GitHub link in the navbar
    },
  };
}
