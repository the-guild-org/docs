module.exports = {
  root: true,
  extends: [
    '@theguild',
    '@theguild/eslint-config/react',
    'plugin:tailwindcss/recommended',
    'plugin:storybook/recommended',
  ],
  rules: {
    'tailwindcss/classnames-order': 'off', // conflicts with official prettier-plugin-tailwindcss and tailwind v3
    // set more strict to highlight in editor
    'tailwindcss/enforces-shorthand': 'error',
    'tailwindcss/migration-from-tailwind-2': 'error',
    'tailwindcss/no-custom-classname': 'warn',
    'no-unused-expressions': 'error',
    'no-var': 'error',
    'prefer-destructuring': ['error', { object: true }],
    'prefer-template': 'error',
    'react/prop-types': 'off',
    'react/jsx-boolean-value': ['error', 'never'],
    '@typescript-eslint/array-type': ['error', { readonly: 'generic' }],
    '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'no-type-imports' }],
  },
  settings: {
    tailwindcss: {
      config: 'tailwind.config.cjs',
      whitelist: [
        'aa-ItemLink',
        'aa-ItemContent',
        'aa-ItemContentBody',
        'aa-ItemContentTitle',
        'aa-ItemContentSubtitle',
        'aa-SourceHeader',
        'aa-SourceHeaderTitle',
      ],
    },
  },
  overrides: [
    {
      files: ['postcss.config.cjs', 'rollup.config.js'],
      env: {
        node: true,
      },
    },
    {
      files: ['**/*.stories.tsx', 'tsup.config.ts', '.storybook/main.ts'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
    {
      files: ['**/*.stories.tsx'],
      rules: {
        'no-console': 'off',
      },
    },
    {
      files: ['packages/**'],
      excludedFiles: ['packages/algolia/**'],
      rules: {
        'import/extensions': ['error', 'never'],
      },
    },
  ],
};
