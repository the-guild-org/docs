import { NextConfig } from 'next';
import nextBundleAnalyzer from '@next/bundle-analyzer';
import nextra from 'nextra';
import withVideos from 'next-videos';
import { remarkMermaid } from './remark-mermaid.js';
import remarkMdxDisableExplicitJsx from 'remark-mdx-disable-explicit-jsx';

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
      remarkPlugins: [
        [
          //
          remarkMdxDisableExplicitJsx,
          { whiteList: ['video', 'iframe', 'source'] },
        ],
        remarkMermaid,
      ],
    },
  });

  return withBundleAnalyzer(
    withVideos(
      withNextra({
        reactStrictMode: true,
        swcMinify: true,
        ...nextConfig,
        experimental: {
          optimizeCss: true,
          newNextLinkBehavior: true,
          // @ts-expect-error -- TODO: check next version in Nextra and remove this
          images: {
            allowFutureImage: true, // next/future/image
            // @ts-expect-error -- TODO: check next version in Nextra and remove this
            ...nextConfig.experimental?.images,
          },
          ...nextConfig.experimental,
        },
      })
    )
  );
};
