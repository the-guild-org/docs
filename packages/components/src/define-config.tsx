import { usePathname } from 'next/navigation';
import { useConfig } from 'nextra-theme-docs';
import { getNavbarLogo } from './components';
import { addGuildCompanyMenu } from './components/company-menu';

export interface GuildDocsThemeConfig {
  websiteName: string;
  description: string;
}

export function defineConfig({ websiteName, description, logo, ...config }: any) {
  if (!config.docsRepositoryBase) {
    throw new Error('Missing required "docsRepositoryBase" property');
  }

  const url = new URL(config.docsRepositoryBase);
  const [, org, repoName] = url.pathname.split('/');

  const siteUrl = process.env.SITE_URL;

  return {
    editLink: {
      content: 'Edit this page on GitHub',
    },
    feedback: {
      content: 'Question? Give us feedback →',
      labels: 'kind/docs',
    },
    sidebar: {
      defaultMenuCollapseLevel: 1,
      toggleButton: true,
    },
    project: {
      link: `${url.origin}/${org}/${repoName}`, // GitHub link in the navbar
    },
    head: function useHead() {
      // @ts-expect-error -- this hook no longer return frontMatter and title
      const { frontMatter, title: pageTitle } = useConfig();
      const pathname = usePathname();

      const {
        canonical = siteUrl &&
          `${siteUrl}${
            // we disallow trailing slashes
            // TODO: dont do this if `trailingSlashes: true`
            pathname === '/'
              ? // homepage
                ''
              : pathname.startsWith('/?')
                ? // homepage with search params (remove just slash)
                  pathname.slice(1)
                : // other pages
                  pathname
          }`,
        image = `https://og-image.the-guild.dev/?product=${websiteName}&title=${encodeURI(
          pageTitle,
        )}`,
      } = frontMatter;

      return (
        <>
          {canonical && [
            <link key={3} rel="canonical" href={canonical} />,
            <meta key={4} property="og:url" content={canonical} />,
          ]}
          <meta property="og:image" content={image} />
          <meta property="og:image:alt" content={pageTitle} />

          <meta content={websiteName} name="apple-mobile-web-app-title" />
          <meta content={websiteName} name="application-name" />
          <meta name="robots" content="index,follow" />
        </>
      );
    },
    logoLink: false,
    logo: getNavbarLogo(logo, websiteName, description),
  };
}
