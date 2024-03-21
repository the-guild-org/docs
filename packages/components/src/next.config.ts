import { NextConfig } from 'next';
import withVideos from 'next-videos';
import nextra, { NextraConfig } from 'nextra';
import remarkMdxDisableExplicitJsx from 'remark-mdx-disable-explicit-jsx';
import nextBundleAnalyzer from '@next/bundle-analyzer';
import { applyUnderscoreRedirects } from './underscore-redirects';

export const defaultRemarkPlugins = [
  [
    // replace <iframe />, <video />, <source /> tags in MDX
    remarkMdxDisableExplicitJsx,
    { whiteList: ['iframe', 'video', 'source'] },
  ],
] as any;

export function withGuildDocs({
  nextraConfig,
  ...nextConfig
}: NextConfig & { nextraConfig?: NextraConfig } = {}) {
  if (nextConfig.webpack?.toString().includes('applyUnderscoreRedirects')) {
    throw new Error(
      '`applyUnderscoreRedirects` in `nextConfig.webpack` was already configured, remove it from your config',
    );
  }

  const withBundleAnalyzer = nextBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
  });
  const withNextra = nextra({
    theme: 'nextra-theme-docs',
    defaultShowCopyCode: true,
    mdxOptions: {
      remarkPlugins: defaultRemarkPlugins,
    },
    search: {
      codeblocks: true,
    },
    ...nextraConfig,
    themeConfig: nextraConfig?.themeConfig || './theme.config.tsx',
  });
  const siteUrl = process.env.SITE_URL || '';

  return withBundleAnalyzer(
    withVideos(
      withNextra({
        reactStrictMode: true,
        poweredByHeader: false,
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
          ...nextConfig.experimental,
        },
        images: {
          unoptimized: true, // doesn't work with `next export`,
          ...nextConfig.images,
        },
      }),
    ),
  );
}
