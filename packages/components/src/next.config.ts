import { NextConfig } from 'next';
import nextBundleAnalyzer from '@next/bundle-analyzer';
import nextra from 'nextra';
import withVideos from 'next-videos';
import remarkMdxDisableExplicitJsx from 'remark-mdx-disable-explicit-jsx';
import { remarkMermaid } from './remark-mermaid.js';
import { applyUnderscoreRedirects } from './underscore-redirects.js';

export const withGuildDocs = ({
  themeConfig = './theme.config.tsx',
  ...nextConfig
}: NextConfig & { themeConfig?: string } = {}) => {
  if ('webpack' in nextConfig) {
    throw new Error(
      '`nextConfig.webpack` is already specified, remove it to avoid overwrite `applyUnderscoreRedirects` setting'
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
          { whiteList: ['iframe', 'video', 'source'] },
        ],
        remarkMermaid,
      ],
    },
  });

  const basePath = process.env.NEXT_BASE_PATH;

  return withBundleAnalyzer(
    withVideos(
      withNextra({
        reactStrictMode: true,
        swcMinify: true,
        basePath,
        webpack(config, meta) {
          applyUnderscoreRedirects(config, meta);
          return config;
        },
        ...nextConfig,
        experimental: {
          optimizeCss: true,
          newNextLinkBehavior: true,
          ...nextConfig.experimental,
        },
        ...(basePath && {
          images: {
            unoptimized: true, // doesn't work with `next export`,
            ...nextConfig.images,
          },
        }),
      })
    )
  );
};
