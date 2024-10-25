const path = require('node:path');

const base = require('@theguild/tailwind-config/postcss.config');

module.exports = {
  ...base,
  plugins: {
    ...base.plugins,
    tailwindcss: {
      // Without an absolute path here, tsup building components can't find the config.
      config: path.join(__dirname, 'tailwind.config.ts'),
    },
  },
};
