const { plugins, ...prettierConfig } = require('@theguild/prettier-config');

module.exports = {
  ...prettierConfig,
  plugins: [...plugins, require('prettier-plugin-tailwindcss')],
  overrides: [
    ...prettierConfig.overrides,
    {
      files: '*.svg',
      options: {
        parser: 'html',
      },
    },
  ],
};
