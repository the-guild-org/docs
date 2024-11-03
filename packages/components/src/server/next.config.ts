/**
 * https://github.com/shuding/nextra/issues/3583#issuecomment-2442923480
 * This file can't be exported from `server/index.js` because `next.config.ts` requires `"require"`
 * be defined in `package.json`. I added it for this file to work. But since `server/index.js`
 * contains a lot of packages we need to be sure each of them has `"require"` defined in `package.json`.
 **/
import { createRequire } from 'node:module';
import path from 'node:path';
import { NextConfig } from 'next';
import nextra, { NextraConfig } from 'nextra';
import { Plugin } from 'unified';
import nextBundleAnalyzer from '@next/bundle-analyzer';
import { applyUnderscoreRedirects } from './underscore-redirects.js';

const warnings = new Set<string>();

const require = createRequire(import.meta.url);

const rehypeCheckFrontMatter: Plugin = () => (_ast, file) => {
  const [filePath] = file.history;
  // Skip if no file path (e.g. dynamic mdx without filePath provided)
  if (!filePath) return;
  const { description } = file.data.frontMatter as Record<string, string>;
  const relativePath = path.relative(process.cwd(), filePath);
  const fileName = path.parse(relativePath).name;

  const isPage =
    (relativePath.startsWith('app/') && fileName === 'page') ||
    relativePath.startsWith('/content/');
  if (!isPage) return;

  function warnOnce(message: string) {
    const msg = `[@theguild/components] SEO issue in "${relativePath}": ${message}`;
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

export const defaultNextraOptions: NextraConfig = {
  defaultShowCopyCode: true,
  whiteListTagsStyling: ['iframe', 'video', 'source'],
  search: {
    codeblocks: true,
  },
  mdxOptions: {
    // Check front matter only in production (when Webpack is used)
    // Should be rehype since frontMatter is attached in remark plugins
    rehypePlugins: process.env.NODE_ENV === 'production' ? [rehypeCheckFrontMatter] : [],
  },
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
  const withNextra = nextra({ ...defaultNextraOptions, ...nextraConfig });

  const nextraClientPath = path.relative(
    process.cwd(),
    path.join(require.resolve('nextra/package.json'), '..', 'dist', 'client'),
  );

  return withBundleAnalyzer(
    withNextra({
      reactStrictMode: true,
      poweredByHeader: false,
      basePath: process.env.NEXT_BASE_PATH,
      ...nextConfig,
      env: {
        SITE_URL: process.env.SITE_URL || '',
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
        turbo: {
          resolveAlias: {
            // Fixes when Turbopack is enabled: Module not found: Can't resolve '@theguild/remark-mermaid/mermaid'
            '@theguild/remark-mermaid/mermaid': path.relative(
              process.cwd(),
              path.join(
                require.resolve('@theguild/remark-mermaid/package.json'),
                '..',
                'dist',
                'mermaid.js',
              ),
            ),
            'nextra/components': path.join(nextraClientPath, 'components', 'index.js'),
            'nextra/setup-page': path.join(nextraClientPath, 'setup-page.js'),
          },
        },
      },
      images: {
        unoptimized: true, // doesn't work with `next export`,
        ...nextConfig.images,
      },
    }),
  );
}
