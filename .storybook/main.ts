import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { Configuration } from 'webpack';
import { StorybookConfig } from '@storybook/nextjs';

export default {
  stories: ['../packages/*/src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    'storybook-dark-mode', // addon to have toolbar for dark/light mode
  ],
  typescript: {
    reactDocgen: false,
  },
  env(config: Record<string, unknown>) {
    return config;
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

    config.module?.rules?.unshift({
      test: /\.svg$/,
      loader: '@svgr/webpack',
      options: {
        svgo: false, // otherwise setting SVG component width/height will don't affect
      },
    });

    return config;
  },
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
  staticDirs: ['./public'],
} satisfies StorybookConfig;
