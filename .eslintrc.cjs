module.exports = {
  root: true,
  ignorePatterns: ['__fixtures__'],
  extends: [
    '@theguild',
    '@theguild/eslint-config/react',
    '@theguild/eslint-config/json',
    '@theguild/eslint-config/yml',
    // '@theguild/eslint-config/mdx',
    'plugin:tailwindcss/recommended',
    'plugin:storybook/recommended',
  ],
  rules: {
    'tailwindcss/classnames-order': 'off', // conflicts with official prettier-plugin-tailwindcss and tailwind v3
    // set more strict to highlight in editor
    'tailwindcss/enforces-shorthand': 'error',
    'tailwindcss/migration-from-tailwind-2': 'error',
    'tailwindcss/no-custom-classname': 'error',
    'prefer-destructuring': ['error', { object: true }],
    'prefer-template': 'error',
    '@typescript-eslint/array-type': ['error', { readonly: 'generic' }],
    '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'no-type-imports' }],

    // TODO: fix below
    '@typescript-eslint/no-explicit-any': 'warn',
    'jsx-a11y/click-events-have-key-events': 'warn',
    'jsx-a11y/no-static-element-interactions': 'warn',
    // enable without breaking existing iframes
    'react/iframe-missing-sandbox': 'off',
  },
  settings: {
    tailwindcss: {
      callees: ['clsx', 'cn', 'cva', 'cx'],
      config: 'tailwind.config.ts',
      whitelist: [
        // TODO: find a way to fix it and remove these classes since they are imported somewhere and are used
        'line',
        'hive-focus',
        'hive-focus-within',
        '@container', // Tailwind ESLint Plugin doesn't see the Container Queries classes but it does see prefixes like @sm:
      ],
    },
  },
  overrides: [
    {
      files: ['*.cjs'],
      rules: {
        '@typescript-eslint/consistent-type-imports': [
          'warn',
          // back to the default settings. we need type imports in .storybook/main.ts because it's stripped, not compiled
        ],
      },
    },
    {
      files: ['**/*.stories.{ts,tsx}'],
      rules: {
        'no-console': 'off',
        'import/no-default-export': 'off',
      },
    },
    {
      files: ['packages/**'],
      rules: {
        'import/extensions': ['error', { js: 'never', json: 'always' }],
      },
    },
  ],
};
