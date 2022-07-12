// import { StorybookConfig } from '@storybook/core-common';
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  stories: ['../packages/*/src/**/*.stories.mdx', '../packages/*/src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-dark-mode', // addon to have toolbar for dark/light mode
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  typescript: {
    reactDocgen: false,
  },
  env(config) {
    return {
      ...config,
      NEXT_PUBLIC_ALGOLIA_APP_ID: 'ANRJKXZTRW',
      NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY: 'a5522203ca95675199cc21edf09e6d75',
      NEXT_PUBLIC_ALGOLIA_INDEX_NAME: 'searchv2_main',
    };
  },
  webpackFinal(config) {
    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      new TsconfigPathsPlugin({
        extensions: config.resolve.extensions,
      }),
    ];
    return config;
  },
  features: {
    previewMdx2: true,
  },
};
