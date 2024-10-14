import path from 'node:path';
import { NextConfig } from 'next';
import withVideos from 'next-videos';
import nextra, { NextraConfig } from 'nextra';
import remarkMdxDisableExplicitJsx from 'remark-mdx-disable-explicit-jsx';
import { Plugin } from 'unified';
import nextBundleAnalyzer from '@next/bundle-analyzer';
import { applyUnderscoreRedirects } from './underscore-redirects';

type MdxOptions = Exclude<NextraConfig['mdxOptions'], undefined>;

export const defaultRemarkPlugins: MdxOptions['remarkPlugins'] = [
  [
    // replace <iframe />, <video />, <source /> tags in MDX
    remarkMdxDisableExplicitJsx,
    { whiteList: ['iframe', 'video', 'source'] },
  ],
];

const warnings = new Set<string>();

const rehypeCheckFrontMatter: Plugin<[]> = () => (_ast, file) => {
  const { description } = file.data.frontMatter as Record<string, string>;
  const filePath = path.relative(process.cwd(), file.history[0]);

  // Ignore warning for partial mdx files
  if (!filePath.includes('/pages/')) return;

  function warnOnce(message: string) {
    const msg = `[@theguild/components] SEO issue in "${filePath}": ${message}`;
    if (!warnings.has(msg)) {
      warnings.add(msg);
      // eslint-disable-next-line no-console
      console.warn(msg);
    }
  }

  if (!description) {
    warnOnce('The description is missing');
  } else if (description.length > 160) {
    warnOnce(
      `The description "${description}" is too long, should be less than 160 characters, not ${description.length}`,
    );
  } else if (description.length < 50) {
    warnOnce(
      `The description "${description}" is too short, should be more than 50 characters, not ${description.length}`,
    );
  }
};

// this won't be emitted if it's inline in parens
export interface WithGuildDocsOptions extends NextConfig {
  nextraConfig?: NextraConfig;
}
export function withGuildDocs({ nextraConfig, ...nextConfig }: WithGuildDocsOptions = {}) {
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
      // Should be rehype since frontMatter is attached in remark plugins
      rehypePlugins: [rehypeCheckFrontMatter],
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
