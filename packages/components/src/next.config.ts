import { NextConfig } from 'next';
import nextBundleAnalyzer from '@next/bundle-analyzer';
import nextra from 'nextra';
import withVideos from 'next-videos';
import remarkMdxDisableExplicitJsx from 'remark-mdx-disable-explicit-jsx';
import { remarkMermaid } from './remark-mermaid';
import { applyUnderscoreRedirects } from './underscore-redirects';

export const withGuildDocs = ({
  themeConfig = './theme.config.tsx',
  whiteListDisableExplicitJsx = [],
  ...nextConfig
}: NextConfig & {
  themeConfig?: string;
  whiteListDisableExplicitJsx?: string[];
} = {}) => {
  if (nextConfig.webpack?.toString().includes('applyUnderscoreRedirects')) {
    throw new Error(
      '`applyUnderscoreRedirects` in `nextConfig.webpack` was already configured, remove it from your config'
    );
  }

  const withBundleAnalyzer = nextBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
  });
  const withNextra = nextra({
    themeConfig,
    theme: '@theguild/components',
    unstable_staticImage: true,
    unstable_defaultShowCopyCode: true,
    mdxOptions: {
      remarkPlugins: [
        [
          // replace <iframe />, <video />, <source /> tags in MDX
          remarkMdxDisableExplicitJsx,
          { whiteList: ['iframe', 'video', 'source', ...whiteListDisableExplicitJsx] },
        ],
        remarkMermaid,
      ],
    },
  });
  const siteUrl = process.env.SITE_URL || '';

  return withBundleAnalyzer(
    withVideos(
      withNextra({
        reactStrictMode: true,
        poweredByHeader: false,
        // TODO: Enable after https://github.com/vercel/next.js/issues/40750 will be fixed
        // swcMinify: true,
        basePath: process.env.NEXT_BASE_PATH,
        ...nextConfig,
        env: {
          SITE_URL: siteUrl,
          ...nextConfig.env,
        },
        webpack(config, meta) {
          applyUnderscoreRedirects(config, meta);
          return nextConfig.webpack?.(config, meta) || config;
        },
        experimental: {
          // TODO: Provoke white flash ⚪️💥 on initial loading with dark theme
          // optimizeCss: true,
          newNextLinkBehavior: true,
          ...nextConfig.experimental,
        },
        images: {
          unoptimized: true, // doesn't work with `next export`,
          ...nextConfig.images,
        },
      })
    )
  );
};
