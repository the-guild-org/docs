import path from 'node:path';
import { StorybookConfig } from '@storybook/core-common';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { Configuration } from 'webpack';

const config: StorybookConfig = {
  stories: ['../packages/*/src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
    {
      name: 'storybook-addon-next',
      options: {
        nextConfigPath: path.resolve(__dirname, 'next.config.cjs'),
      },
    },
    'storybook-dark-mode', // addon to have toolbar for dark/light mode
    'storybook-addon-swc',
  ],
  typescript: {
    reactDocgen: false,
  },
  env(config: Record<string, unknown>) {
    return {
      ...config,
      NEXT_PUBLIC_ALGOLIA_APP_ID: 'ANRJKXZTRW',
      NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY: 'a5522203ca95675199cc21edf09e6d75',
      NEXT_PUBLIC_ALGOLIA_INDEX_NAME: 'searchv2_main',
    };
  },
  webpackFinal(config: Configuration) {
    config.resolve ||= {};
    config.resolve.plugins ||= [];
    config.resolve.plugins.push(
      new TsconfigPathsPlugin({
        extensions: config.resolve.extensions,
      }),
    );
    config.resolve.fallback = {
      ...config.resolve.fallback,
      url: false,
    };

    config.module.rules.unshift({
      test: /\.svg$/,
      loader: '@svgr/webpack',
      options: {
        svgo: false, // otherwise svg width/height will don't affect
      },
    });

    return config;
  },
  features: {
    previewMdx2: true,
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: { fastRefresh: true },
  },
  core: {
    disableTelemetry: true,
  },
};

export default config;
