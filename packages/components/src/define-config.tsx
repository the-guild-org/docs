import { useRouter } from 'next/router';
import { DocsThemeConfig, useConfig } from 'nextra-theme-docs';
import { Anchor, FooterExtended, mdxComponents } from './components';
import { GuildLogo, TheGuild } from './logos';

export function defineConfig({
  websiteName,
  description,
  logo,
  ...config
}: DocsThemeConfig & { websiteName: string; description: string }): DocsThemeConfig {
  if (!config.docsRepositoryBase) {
    throw new Error('Missing required "docsRepositoryBase" property');
  }

  const url = new URL(config.docsRepositoryBase as string);
  const [, org, repoName] = url.pathname.split('/');

  const siteUrl = process.env.SITE_URL;
  const logoComponent = logo || null;

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
        description = `${websiteName} Documentation`,
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
        image = `https://og-image.the-guild.dev/?product=${websiteName}&title=${encodeURI(
          pageTitle,
        )}`,
      } = frontMatter;

      const title = `${pageTitle} (${websiteName})`;

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
          <meta property="og:site_name" content={websiteName} />
          <meta property="og:image" content={image} />
          <meta property="og:image:alt" content={pageTitle} />

          <meta content={websiteName} name="apple-mobile-web-app-title" />
          <meta content={websiteName} name="application-name" />
          <meta name="robots" content="index,follow" />
        </>
      );
    },
    logoLink: false,
    logo: (
      <div className="flex items-center justify-center py-2">
        <Anchor
          title="View our website"
          className="flex items-center gap-x-1.5 text-black hover:opacity-75 dark:text-gray-100"
          href="https://the-guild.dev"
          target="_blank"
          sameSite={false}
        >
          <GuildLogo className="hidden h-9 w-9 md:block" />
          <TheGuild className="hidden w-11 md:block" />
        </Anchor>
        <div className="hidden cursor-default select-none p-6 md:block">
          <svg
            width="10"
            height="22"
            viewBox="0 0 10 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8.6001 0.833313L0.600097 20.8333" stroke="#0B0D11" />
          </svg>
        </div>
        {logoComponent ? (
          <Anchor
            title={websiteName}
            className="flex items-center gap-x-1.5 text-black hover:opacity-75 dark:text-gray-100"
            href="/"
          >
            {typeof logoComponent === 'function' ? logoComponent({}) : logoComponent}
            <div>
              <h1 className="text-sm font-bold leading-tight">{websiteName}</h1>
              <h2 className="hidden text-xs sm:block">{description}</h2>
            </div>
          </Anchor>
        ) : null}
      </div>
    ),
    ...config,
    components: {
      ...mdxComponents,
      ...config.components,
    },
  };
}
