import { useRouter } from 'next/router';
import { DocsThemeConfig, Navbar, useConfig } from 'nextra-theme-docs';
import { FooterExtended, mdxComponents } from './components';
import { addGuildCompanyMenu } from './components/company-menu';
import { GuildUnifiedLogo } from './components/guild-navbar';
import { ThemeSwitcherButton } from './components/theme-switcher';

export function defineConfig(
  config: DocsThemeConfig &
    (
      | {
          websiteName: string;
          description: string;
        }
      | {
          titleSuffix?: string;
          title: string;
          description: string;
          productLogo: {
            name: string;
            tagline: string;
          };
          ogImage: (props: { title: string; description?: string }) => string;
        }
    ),
): DocsThemeConfig {
  if (!config.docsRepositoryBase) {
    throw new Error('Missing required "docsRepositoryBase" property');
  }

  const url = new URL(config.docsRepositoryBase as string);
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
    footer: {
      component: <FooterExtended />,
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
        description = 'websiteName' in config
          ? `${config.websiteName} Documentation`
          : `Documentation${config.titleSuffix}`,
        type = 'website',
        canonical = siteUrl &&
          `${siteUrl}${
            // we disallow trailing slashes
            // TODO: don't do this if `trailingSlashes: true`
            asPath === '/'
              ? // homepage
                ''
              : asPath.startsWith('/?')
                ? // homepage with search params (remove just slash)
                  asPath.slice(1)
                : // other pages
                  asPath
          }`,
        image = 'ogImage' in config
          ? config.ogImage({
              title: pageTitle,
              description: frontMatter.description ?? description,
            })
          : `https://og-image.the-guild.dev/?product=${config.websiteName}&title=${encodeURI(
              pageTitle,
            )}`,
      } = frontMatter;

      const title =
        'websiteName' in config
          ? `${pageTitle} (${config.websiteName})`
          : `${pageTitle}${config.titleSuffix}`;

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
          {'websiteName' in config ? (
            <meta property="og:site_name" content={config.websiteName} />
          ) : null}
          <meta property="og:image" content={image} />
          <meta property="og:image:alt" content={pageTitle} />

          {'websiteName' in config ? (
            <meta content={config.websiteName} name="apple-mobile-web-app-title" />
          ) : null}
          {'websiteName' in config ? (
            <meta content={config.websiteName} name="application-name" />
          ) : null}
          <meta name="robots" content="index,follow" />
        </>
      );
    },
    logoLink: false,
    logo: (
      <GuildUnifiedLogo
        description={'productLogo' in config ? config.productLogo.tagline : config.description}
        title={'productLogo' in config ? config.productLogo.name : config.websiteName}
      >
        {config.logo}
      </GuildUnifiedLogo>
    ),
    navbar: {
      extraContent: <ThemeSwitcherButton />,
      ...(config.logo && {
        component: props => <Navbar items={addGuildCompanyMenu(props.items)} />,
      }),
    },
    ...config,
    components: {
      ...mdxComponents,
      ...config.components,
    },
  };
}
