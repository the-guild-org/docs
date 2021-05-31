module.exports = {
  stories: [
    '../packages/components/src/components/**/*.stories.mdx',
    '../packages/components/src/components/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-postcss',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  babel: async (options) => {
    const { plugins = [] } = options
    return {
      ...options,
      plugins: [
        ...plugins,
        [
          require.resolve('@babel/plugin-proposal-private-property-in-object'),
          { loose: true },
        ],
      ]
    }
  },
};
