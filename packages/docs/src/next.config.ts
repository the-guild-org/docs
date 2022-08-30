import type { NextConfig } from 'next';
import nextBundleAnalyzer from '@next/bundle-analyzer';
import nextra from 'nextra';
import { remarkMermaid } from './remark-mermaid.js';

export const withGuildDocs = ({
  themeConfig = './theme.config.tsx',
  ...nextConfig
}: NextConfig & { themeConfig?: string } = {}) => {
  const withBundleAnalyzer = nextBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
  });
  const withNextra = nextra({
    themeConfig,
    theme: '@theguild/components',
    unstable_staticImage: true,
    unstable_defaultShowCopyCode: true,
    mdxOptions: {
      remarkPlugins: [remarkMermaid],
    },
  });

  return withBundleAnalyzer(
    withNextra({
      reactStrictMode: true,
      swcMinify: true,
      ...nextConfig,
      experimental: {
        optimizeCss: true,
        newNextLinkBehavior: true,
        images: {
          allowFutureImage: true, // next/future/image
          ...nextConfig.experimental?.images,
        },
        ...nextConfig.experimental,
      },
    })
  );
};
