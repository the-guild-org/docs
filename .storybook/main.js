module.exports = {
  stories: [
    '../packages/components/src/components/**/*.stories.mdx',
    '../packages/components/src/components/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
};
